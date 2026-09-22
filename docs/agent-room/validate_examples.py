#!/usr/bin/env python3
"""Validate the Agent Room spec pack without third-party dependencies."""

from __future__ import annotations

import json
import re
import sys
from pathlib import Path
from typing import Any

ROOT = Path(__file__).resolve().parent
SCHEMAS = ROOT / "schemas"
EXAMPLES = ROOT / "examples"


def load_json(path: Path) -> dict[str, Any]:
    with path.open("r", encoding="utf-8") as handle:
        value = json.load(handle)
    if not isinstance(value, dict):
        raise AssertionError(f"{path}: expected top-level object")
    return value


def type_matches(value: Any, expected: str) -> bool:
    checks = {
        "object": lambda v: isinstance(v, dict),
        "array": lambda v: isinstance(v, list),
        "string": lambda v: isinstance(v, str),
        "integer": lambda v: isinstance(v, int) and not isinstance(v, bool),
        "number": lambda v: isinstance(v, (int, float)) and not isinstance(v, bool),
        "boolean": lambda v: isinstance(v, bool),
        "null": lambda v: v is None,
    }
    return checks[expected](value)


def validate(value: Any, schema: dict[str, Any], path: str = "$") -> list[str]:
    errors: list[str] = []
    expected_type = schema.get("type")
    if expected_type is not None:
        allowed = expected_type if isinstance(expected_type, list) else [expected_type]
        if not any(type_matches(value, item) for item in allowed):
            return [f"{path}: expected {allowed}, got {type(value).__name__}"]

    if "const" in schema and value != schema["const"]:
        errors.append(f"{path}: expected constant {schema['const']!r}")
    if "enum" in schema and value not in schema["enum"]:
        errors.append(f"{path}: value {value!r} not in enum")
    if isinstance(value, str):
        if "minLength" in schema and len(value) < schema["minLength"]:
            errors.append(f"{path}: string shorter than minLength")
        if "maxLength" in schema and len(value) > schema["maxLength"]:
            errors.append(f"{path}: string longer than maxLength")
        if "pattern" in schema and re.search(schema["pattern"], value) is None:
            errors.append(f"{path}: does not match {schema['pattern']!r}")
        if schema.get("format") == "date-time" and "T" not in value:
            errors.append(f"{path}: invalid date-time")
    if isinstance(value, (int, float)) and not isinstance(value, bool):
        if "minimum" in schema and value < schema["minimum"]:
            errors.append(f"{path}: below minimum")
        if "maximum" in schema and value > schema["maximum"]:
            errors.append(f"{path}: above maximum")
    if isinstance(value, list):
        if "minItems" in schema and len(value) < schema["minItems"]:
            errors.append(f"{path}: too few items")
        if schema.get("uniqueItems"):
            serialized = [json.dumps(item, sort_keys=True) for item in value]
            if len(serialized) != len(set(serialized)):
                errors.append(f"{path}: duplicate items")
        item_schema = schema.get("items")
        if item_schema:
            for index, item in enumerate(value):
                errors.extend(validate(item, item_schema, f"{path}[{index}]"))
    if isinstance(value, dict):
        for required in schema.get("required", []):
            if required not in value:
                errors.append(f"{path}: missing required property {required!r}")
        properties = schema.get("properties", {})
        if schema.get("additionalProperties") is False:
            for key in value:
                if key not in properties:
                    errors.append(f"{path}: unexpected property {key!r}")
        for key, child in value.items():
            if key in properties:
                errors.extend(validate(child, properties[key], f"{path}.{key}"))
    return errors


def check_pair(example_name: str, schema_name: str) -> list[str]:
    instance = load_json(EXAMPLES / example_name)
    schema = load_json(SCHEMAS / schema_name)
    return validate(instance, schema)


def main() -> int:
    pairs = [
        ("task-assignment.json", "task-2.0.schema.json"),
        ("tool-failure-event.json", "event-2.0.schema.json"),
        ("narrative-entry.json", "narrative-entry-2.0.schema.json"),
    ]
    failures: list[str] = []
    for example, schema in pairs:
        errors = check_pair(example, schema)
        if errors:
            failures.extend(f"{example}: {error}" for error in errors)
        else:
            print(f"PASS {example} against {schema}")

    event = load_json(EXAMPLES / "tool-failure-event.json")
    narrative = load_json(EXAMPLES / "narrative-entry.json")
    task = load_json(EXAMPLES / "task-assignment.json")

    if event["event_id"] not in narrative["derived_from_event_ids"]:
        failures.append("narrative entry does not reference the example source event")
    if len({item["criterion_id"] for item in task["acceptance_criteria"]}) != len(task["acceptance_criteria"]):
        failures.append("task has duplicate criterion IDs")
    if task["delegation_chain"][-1] != task["assignee"]:
        failures.append("delegation chain must end with current assignee")
    if task["status"] == "completed":
        missing = [item["criterion_id"] for item in task["acceptance_criteria"] if item["required"] and item["status"] not in {"passing", "waived"}]
        if missing:
            failures.append(f"completed task has unsatisfied criteria: {missing}")

    docs = [
        ROOT / "HAIP-2.0-PROTOCOL.md",
        ROOT / "EVENTS-AND-TASK-STATE.md",
        ROOT / "NARRATIVE-RENDERING.md",
    ]
    required_terms = {
        "HAIP-2.0-PROTOCOL.md": ["Fact layer", "Narrative layer", "Completion contract"],
        "EVENTS-AND-TASK-STATE.md": ["Allowed transitions", "Transition guards", "Acceptance criteria and evidence"],
        "NARRATIVE-RENDERING.md": ["derived_from_event_ids", "No chain-of-thought policy", "Audit mode"],
    }
    for doc in docs:
        text = doc.read_text(encoding="utf-8")
        for term in required_terms[doc.name]:
            if term not in text:
                failures.append(f"{doc.name}: missing required term {term!r}")

    if failures:
        print("\nVALIDATION FAILED", file=sys.stderr)
        for failure in failures:
            print(f"- {failure}", file=sys.stderr)
        return 1

    print("PASS protocol cross-file invariants")
    print("VALIDATION OK")
    return 0


if __name__ == "__main__":
    raise SystemExit(main())
