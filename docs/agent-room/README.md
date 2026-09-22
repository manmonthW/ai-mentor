# Agent Room specification pack

This directory contains the first implementation-ready planning artifacts for the multi-agent collaboration interface.

## Documents

- `HAIP-2.0-PROTOCOL.md`: transport-neutral collaboration protocol.
- `EVENTS-AND-TASK-STATE.md`: append-only event model and guarded Task state machine.
- `NARRATIVE-RENDERING.md`: rules for converting machine events into traceable, human-readable conversation.

## Machine-readable schemas

- `schemas/event-2.0.schema.json`
- `schemas/task-2.0.schema.json`
- `schemas/narrative-entry-2.0.schema.json`

## Examples

- `examples/task-assignment.json`
- `examples/tool-failure-event.json`
- `examples/narrative-entry.json`

## Decision summary

- Events are authoritative and append-only.
- Messages communicate but do not transfer responsibility by themselves.
- Agent-to-agent work is represented by Tasks with acknowledgement and acceptance criteria.
- Completion requires passing Evidence, not a natural-language claim.
- Narrative entries always reference their source Event IDs.
- The UI offers Conversation, Work, and Audit views over the same data.
- Private chain-of-thought is never rendered.

## Next implementation milestone

Build an event-replay prototype that imports one existing Hermes webhook run, projects Task state, and renders the same source data in Conversation, Work, and Audit modes. Do this before building live connectors so the projection and narrative rules can be tested deterministically.

## Validation

Run:

```bash
python3 docs/agent-room/validate_examples.py
```

The validator checks JSON syntax, schemas, example/schema compatibility, required cross-file references, and selected protocol invariants.