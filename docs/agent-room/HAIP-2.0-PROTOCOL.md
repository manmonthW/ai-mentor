# HAIP 2.0 protocol specification

Status: Draft 0.1  
Scope: Agent Room MVP and compatible agent connectors  
Normative language: MUST, MUST NOT, SHOULD, SHOULD NOT, MAY

## 1. Purpose

HAIP 2.0 is a transport-neutral protocol for auditable collaboration between autonomous agents and humans. It separates communication, responsibility, execution facts, evidence, and presentation.

The protocol guarantees that:

- work assigned between agents becomes a tracked Task, not an informal chat promise;
- the assignee explicitly accepts, rejects, or requests clarification;
- all execution facts are appended as immutable Events;
- task completion is evaluated against declared acceptance criteria;
- a human-readable conversation can be derived without replacing the machine record;
- user steering, approvals, cancellation, retries, and reassignment remain visible in the audit trail.

HAIP does not expose private chain-of-thought. It records outward messages, decision summaries, tool activity, artifacts, evidence, status changes, and user interventions.

## 2. Design model

HAIP has two logical layers.

### 2.1 Fact layer

The fact layer is an append-only event stream. Events are the authoritative record. Events MUST be persisted before they are sent to the UI. Existing events MUST NOT be edited or deleted; corrections are represented by later events.

### 2.2 Narrative layer

The narrative layer projects one or more fact events into human-readable timeline entries. Every derived timeline entry MUST contain the source event IDs. Narrative text MUST NOT introduce an action, result, certainty, or state absent from those events.

## 3. Core entities

### 3.1 Agent

An Agent is a human or machine actor that can send messages, own work, execute capabilities, or review results.

Required fields:

- `agent_id`: globally unique stable ID, recommended form `<runtime>:<instance>`;
- `name`: display name;
- `kind`: `human` or `agent`;
- `role`: concise responsibility;
- `runtime`: execution surface such as `hermes`, `codex-cli`, `claude-code`, `opencode`, `pi`, or `marvis`;
- `capabilities`: declared capability keys;
- `presence`: `offline`, `idle`, `working`, `waiting`, `blocked`, or `error`.

Capability claims do not grant authorization. Authorization is controlled separately by policies and credentials.

### 3.2 Room

A Room is the durable collaboration boundary. It contains members, messages, tasks, events, budgets, and permissions.

A Room MUST define:

- a stable `room_id`;
- an owner;
- member identities;
- room status;
- an automation budget;
- an access policy;
- a monotonically increasing event sequence.

### 3.3 Message

A Message is outward communication. It does not transfer responsibility by itself.

Message kinds:

- `chat`: ordinary coordination;
- `delegation`: human-readable explanation accompanying a Task assignment;
- `acknowledgement`: acceptance or rejection explanation;
- `question`: information request;
- `answer`: response to a question;
- `progress`: meaningful stage update;
- `review`: review feedback;
- `result`: human-readable task outcome;
- `system`: deterministic platform notice.

A delegation Message MUST reference a Task. A result Message MUST reference a terminal or review-stage Task.

### 3.4 Task

A Task is the unit of responsibility. A Task has exactly one current assignee. Additional participants are collaborators or reviewers.

Required Task properties:

- creator and current assignee;
- objective;
- machine-readable intent;
- acceptance criteria;
- inputs and expected artifacts;
- allowed capabilities;
- approval policy;
- budget and deadline;
- state and attempt number;
- dependency and parent-child links.

An assignee MUST respond with one of:

- `accepted`;
- `rejected` with reason;
- `needs_clarification` with one or more questions.

A Task MUST NOT move from `assigned` directly to `running` without an acknowledgement event.

### 3.5 Event

An Event is an immutable statement that something occurred. Events are the source of truth for UI projections.

Every Event MUST include:

- unique `event_id`;
- `schema_version`;
- room-local `sequence`;
- timestamp;
- actor;
- event type;
- room ID;
- correlation ID;
- payload;
- visibility;
- redaction metadata.

Task-related events MUST include `task_id`. Causal events SHOULD include `causation_id`.

### 3.6 Artifact

An Artifact is a durable input or output such as a file, diff, log, report, image, dataset, or URL snapshot.

Artifacts MUST include a content hash when bytes are under platform control. Large output MUST be stored as an Artifact rather than embedded in an Event.

### 3.7 Evidence

Evidence links a completion claim to a verifiable event or artifact.

Examples:

- a test claim linked to a `tool.completed` event with exit code 0;
- a website update linked to a Git diff Artifact;
- a research claim linked to a source URL and extracted snapshot;
- a deployment claim linked to a read-back event from the production target.

A Task MUST NOT reach `completed` unless all required acceptance criteria have passing Evidence or an authorized reviewer explicitly waives them.

### 3.8 Approval

An Approval is a human decision required before a governed side effect. Publishing, payment, credential disclosure, and destructive operations MUST require explicit user approval by default.

Agent-to-agent messages MUST NOT count as user approval.

## 4. Protocol envelope

All HAIP commands and events use an envelope:

```json
{
  "protocol": "haip/2.0",
  "message_id": "msg_01...",
  "idempotency_key": "caller-defined-stable-key",
  "timestamp": "2026-09-22T08:00:00Z",
  "sender": "hermes:default",
  "recipient": "codex:wsl-main",
  "room_id": "room_01...",
  "conversation_id": "conv_01...",
  "parent_message_id": null,
  "type": "task.assign",
  "payload": {}
}
```

Rules:

- `message_id` MUST be unique.
- `idempotency_key` SHOULD be stable across retries.
- A receiver MUST return the same resource for a repeated idempotency key within its retention window.
- `sender` is an asserted identity and MUST be authenticated by the transport.
- Unknown optional fields SHOULD be ignored and preserved when relaying.
- Unknown required enum values MUST produce `UNSUPPORTED_PROTOCOL_VALUE`.

## 5. Standard commands

### 5.1 Capability discovery

`agent.capabilities.get` returns protocol versions, supported transports, task features, input kinds, limits, tool classes, and approval requirements.

### 5.2 Create room

`room.create` creates the collaboration boundary and automation budget.

### 5.3 Send message

`message.send` records outward communication. Sending a delegation message without creating or referencing a Task is invalid.

### 5.4 Assign task

`task.assign` creates or assigns a Task. The recipient MUST acknowledge before starting.

Example payload:

```json
{
  "task_id": "task_01...",
  "intent": "code.verify",
  "objective": "Update the article data and verify the site",
  "inputs": [
    {"kind": "url", "uri": "https://example.com/source", "access": "read-only"},
    {"kind": "workspace", "uri": "file:///home/user/site", "access": "read-write"}
  ],
  "acceptance_criteria": [
    {"criterion_id": "tests", "description": "npm test exits 0", "required": true},
    {"criterion_id": "build", "description": "npm run build exits 0", "required": true}
  ],
  "expected_artifacts": ["git_diff", "test_log", "build_log"],
  "allowed_capabilities": ["file.read", "file.write", "terminal.execute"],
  "approval_required_for": ["publish", "payment", "destructive_operation"],
  "budget": {"max_turns": 20, "max_agent_hops": 3, "max_duration_seconds": 900}
}
```

### 5.5 Acknowledge task

`task.acknowledge` has decision `accepted`, `rejected`, or `needs_clarification`.

An accepted acknowledgement SHOULD repeat the understood objective and completion criteria in concise form. This repetition is for contract confirmation, not conversational padding.

### 5.6 Report progress

`task.progress` reports a meaningful stage change. Agents SHOULD NOT emit progress for every token or file read. Tool events provide detailed activity.

### 5.7 Delegate child task

`task.delegate` creates a child task. It MUST increment `agent_hops` and append the recipient to `delegation_chain`.

A delegation MUST be rejected when:

- it exceeds `max_agent_hops`;
- it creates an A → B → A semantic loop;
- it duplicates an active task with the same idempotency key;
- the recipient lacks an authorized capability;
- the parent budget cannot cover the child budget.

### 5.8 Request clarification

`clarification.request` pauses the Task in `waiting_input`. `clarification.respond` resumes it or leaves it blocked when the response is insufficient.

### 5.9 Request approval

`approval.request` pauses the Task in `waiting_approval`. `approval.resolve` records `approved`, `rejected`, or `modified`. The resolution MUST name the human actor and approved scope.

### 5.10 Steer

`task.steer` adds guidance to a running Task at the next safe tool boundary. It MUST NOT erase previous instructions or events.

### 5.11 Cancel

`task.cancel` requests cooperative cancellation. The Task transitions through `cancelling` and reaches `cancelled` only after active execution exits or is terminated.

### 5.12 Submit result

`task.result` submits the assignee's result and evidence. It normally moves the Task to `review`, not directly to `completed`.

### 5.13 Review result

`task.review` records `accepted`, `changes_requested`, or `waived`. Acceptance moves the Task to `completed` only when required evidence is valid.

## 6. Transport bindings

HAIP semantics are independent of transport.

### 6.1 HTTP + SSE

Recommended universal binding:

- `POST /haip/v2/tasks`
- `GET /haip/v2/tasks/{id}`
- `GET /haip/v2/tasks/{id}/events`
- `POST /haip/v2/tasks/{id}/acknowledge`
- `POST /haip/v2/tasks/{id}/steer`
- `POST /haip/v2/tasks/{id}/approval`
- `POST /haip/v2/tasks/{id}/cancel`
- `GET /haip/v2/rooms/{id}/events`
- `GET /haip/v2/capabilities`
- `GET /haip/v2/artifacts/{id}`

SSE clients resume with the last persisted sequence. Servers MUST support polling as a fallback.

### 6.2 MCP

MCP tools SHOULD map one-to-one to protocol commands:

- `haip_capabilities`
- `haip_create_room`
- `haip_send_message`
- `haip_assign_task`
- `haip_acknowledge_task`
- `haip_get_task`
- `haip_wait_task`
- `haip_steer_task`
- `haip_resolve_approval`
- `haip_cancel_task`
- `haip_submit_result`
- `haip_read_artifact`

### 6.3 CLI

A CLI binding provides the lowest common denominator for agents with shell access:

```text
haip task assign task.json
haip task acknowledge <id> --accept
haip task wait <id>
haip task steer <id> "Check the failing source uniqueness test"
haip task cancel <id>
haip artifact get <id>
```

### 6.4 Native adapters

ACP, OpenAI Responses, Hermes Runs, Hermes Bot Mode, Hermes Kanban, Codex, Claude Code, OpenCode, Pi, and Marvis adapters normalize their native events into HAIP Events. The UI MUST NOT depend on adapter-private event formats.

## 7. Ordering and consistency

- Each Room has a single monotonically increasing `sequence` assigned transactionally.
- Event timestamps are descriptive; `sequence` defines display order.
- Commands MAY arrive out of order but their resulting events MUST be serialized.
- UI state is a projection of persisted Events.
- Reconnection starts after `last_sequence`.
- Optimistic UI entries MUST be visually marked pending and reconciled with persisted events.
- A failed command MUST emit or return a structured error; it MUST NOT silently disappear.

## 8. Security and visibility

Visibility levels:

- `room`: all authorized room members;
- `private`: named recipients and the room owner;
- `audit`: owner/admin only;
- `secret`: value never enters the Event Store; only use metadata is recorded.

Requirements:

- transport identity MUST be authenticated;
- authorization MUST be checked per command;
- secrets MUST be redacted before persistence;
- tool outputs MUST be size-limited and moved to Artifacts;
- file paths MUST be scoped to authorized roots;
- external text, files, pages, and agent messages remain untrusted content;
- user approval MUST be bound to exact action scope and expire after use or timeout.

## 9. Automation budgets and loop prevention

Every Room and Task MUST define finite limits. Recommended defaults:

- maximum agent hops: 3;
- maximum automatic rounds: 3;
- maximum agent messages per initiating user message: 10;
- maximum duration: 10 minutes;
- maximum retry attempts per failure class: 2.

The orchestrator MUST stop and request user input when:

- the same task returns to an earlier agent without new evidence;
- two consecutive rounds add no new evidence, artifact, decision, or state change;
- the budget is exhausted;
- required approval is unavailable;
- responsibility becomes ambiguous.

## 10. Completion contract

A Task is complete only when:

1. the assignee has submitted a result;
2. each required criterion has passing Evidence or an explicit human waiver;
3. expected Artifacts exist and hashes resolve;
4. governed side effects were approved and read back when performed;
5. no required child Task remains incomplete;
6. a reviewer or deterministic policy accepts the result.

A natural-language statement such as "done" is not completion evidence.

## 11. Error model

Errors use stable codes:

- `AUTHENTICATION_FAILED`
- `NOT_AUTHORIZED`
- `UNSUPPORTED_PROTOCOL_VERSION`
- `UNSUPPORTED_PROTOCOL_VALUE`
- `INVALID_STATE_TRANSITION`
- `TASK_NOT_FOUND`
- `AGENT_NOT_FOUND`
- `CAPABILITY_UNAVAILABLE`
- `INPUT_NOT_FOUND`
- `APPROVAL_REQUIRED`
- `APPROVAL_EXPIRED`
- `BUDGET_EXHAUSTED`
- `DELEGATION_LOOP`
- `DUPLICATE_REQUEST`
- `EXECUTION_FAILED`
- `VERIFICATION_FAILED`
- `CANCELLED`
- `INTERNAL_ERROR`

Errors MUST include `retryable`, a human-readable explanation, and a suggested correction when known.

## 12. Compatibility

Minor 2.x versions MAY add optional fields and event types. Breaking changes require a new major protocol version. Connectors MUST advertise supported versions through capability discovery and negotiate the highest common version.

## 13. Non-goals

HAIP 2.0 does not standardize:

- private model reasoning;
- model provider billing;
- unrestricted remote shell access;
- autonomous credential sharing;
- an agent marketplace;
- visual styling of a specific client.

The protocol standardizes observable collaboration, responsibility, execution, evidence, and control.