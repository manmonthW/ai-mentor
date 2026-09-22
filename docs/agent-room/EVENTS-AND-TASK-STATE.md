# HAIP 2.0 event model and task state machine

Status: Draft 0.1  
Companion: `HAIP-2.0-PROTOCOL.md`

## 1. Authority model

The Event Store is the authoritative record. Room, Task, Agent presence, timeline, and notification data are projections rebuilt from Events.

Rules:

- append only;
- one transaction assigns a room-local sequence and persists an Event;
- events are immutable;
- corrections append new events;
- projectors are deterministic and idempotent;
- UI clients consume persisted events only;
- raw payloads are retained subject to redaction and retention policy.

## 2. Common event envelope

```json
{
  "event_id": "evt_01JZ...",
  "schema_version": "haip.event/2.0",
  "sequence": 42,
  "timestamp": "2026-09-22T08:13:05.821Z",
  "room_id": "room_01JZ...",
  "task_id": "task_01JZ...",
  "actor": {
    "actor_id": "codex:wsl-main",
    "kind": "agent"
  },
  "type": "tool.completed",
  "causation_id": "evt_01JY...",
  "correlation_id": "task_01JZ...",
  "visibility": "room",
  "payload": {},
  "redaction": {
    "applied": true,
    "fields": ["headers.authorization"]
  }
}
```

### Required invariants

- `sequence` is a positive integer unique within a Room.
- `timestamp` is UTC RFC 3339.
- `correlation_id` groups a workflow, normally a Task ID.
- `causation_id` points to the direct triggering Event when known.
- `task_id` is required for task, tool, artifact, evidence, approval, and clarification events.
- redacted values are removed before persistence, not hidden only in the UI.

## 3. Event catalog

### 3.1 Room events

| Event | Purpose | Required payload |
|---|---|---|
| `room.created` | Create room | title, owner, budget, policy |
| `room.updated` | Change mutable room metadata | patch, previous_version |
| `room.member_joined` | Add member | agent_id, role |
| `room.member_left` | Remove member | agent_id, reason |
| `room.closed` | Stop new automated work | reason |

### 3.2 Agent events

| Event | Purpose | Required payload |
|---|---|---|
| `agent.connected` | Connector became available | runtime, capabilities |
| `agent.disconnected` | Connector unavailable | reason |
| `agent.presence_changed` | Presence projection hint | previous, current |
| `agent.heartbeat` | Lease/activity evidence | current_task_id, lease_until |
| `agent.capabilities_changed` | Capability epoch changed | capabilities, epoch |

Heartbeats SHOULD be sampled or compacted in human timelines but retained according to operational policy.

### 3.3 Message events

| Event | Purpose | Required payload |
|---|---|---|
| `message.sent` | Persist outward communication | message_id, recipients, kind, content |
| `message.delivered` | Recipient connector accepted it | message_id, recipient |
| `message.delivery_failed` | Delivery failed | message_id, recipient, error |
| `message.read` | Optional read receipt | message_id, reader |

`message.delivered` does not mean the recipient accepted associated work.

### 3.4 Task events

| Event | State effect |
|---|---|
| `task.proposed` | none → proposed |
| `task.assigned` | proposed/todo/reassigned → assigned |
| `task.acknowledged` decision=accepted | assigned → acknowledged |
| `task.acknowledged` decision=needs_clarification | assigned → waiting_input |
| `task.acknowledged` decision=rejected | assigned → rejected |
| `task.started` | acknowledged → running |
| `task.progress` | state unchanged; stage/progress update |
| `task.delegated` | creates child; parent may remain running or wait |
| `task.waiting_input` | running → waiting_input |
| `task.input_received` | waiting_input → acknowledged or running |
| `task.waiting_approval` | running → waiting_approval |
| `task.approval_resolved` | waiting_approval → running, blocked, or cancelled |
| `task.blocked` | active state → blocked |
| `task.unblocked` | blocked → acknowledged or running |
| `task.result_submitted` | running → review |
| `task.review_requested` | running/review → review |
| `task.changes_requested` | review → acknowledged |
| `task.completed` | review → completed |
| `task.failed` | active state → failed |
| `task.retry_requested` | failed/blocked → assigned |
| `task.cancel_requested` | nonterminal → cancelling |
| `task.cancelled` | cancelling/nonstarted → cancelled |
| `task.reassigned` | nonterminal → assigned |
| `task.archived` | terminal → archived |

### 3.5 Tool events

| Event | Purpose |
|---|---|
| `tool.started` | Tool invocation began |
| `tool.progress` | Bounded progress update |
| `tool.completed` | Tool exited successfully or unsuccessfully with structured result |
| `tool.approval_required` | Tool cannot begin before approval |
| `tool.cancelled` | Tool stopped |

`tool.completed` payload includes:

- tool name;
- invocation ID;
- started/finished timestamps or duration;
- status: `succeeded`, `failed`, `cancelled`, `timed_out`;
- exit code when relevant;
- sanitized input summary;
- output summary;
- output Artifact reference when long;
- affected resource references.

A shell command returning exit code nonzero uses `status=failed`. Transport success does not override command failure.

### 3.6 Artifact and evidence events

| Event | Purpose |
|---|---|
| `artifact.created` | Register durable artifact |
| `artifact.updated` | Create a new artifact version |
| `artifact.verified` | Hash/media/access checks passed |
| `artifact.missing` | Declared artifact cannot be resolved |
| `evidence.recorded` | Link criterion to proof |
| `evidence.invalidated` | Proof no longer valid |
| `evidence.waived` | Human waived criterion |

Artifacts are versioned; `artifact.updated` does not mutate prior bytes.

### 3.7 Clarification, approval, and user-control events

| Event | Purpose |
|---|---|
| `clarification.requested` | Ask bounded question(s) |
| `clarification.responded` | Record answer |
| `approval.requested` | Ask human approval |
| `approval.resolved` | Approve/reject/modify exact scope |
| `user.steered` | Add live guidance |
| `user.reassigned_task` | Change assignee |
| `user.changed_acceptance` | Version acceptance criteria |
| `user.marked_incomplete` | Reopen/require changes |

## 4. Task states

### 4.1 States

- `proposed`: Task exists but has no accepted responsibility.
- `assigned`: responsibility offered to an assignee.
- `acknowledged`: assignee accepted but execution has not started.
- `running`: assignee is executing.
- `waiting_input`: bounded information is required.
- `waiting_approval`: governed action awaits human decision.
- `blocked`: work cannot proceed without external change.
- `review`: result submitted and awaiting validation.
- `cancelling`: cancellation requested while work exits.
- `rejected`: assignee declined; no active execution.
- `completed`: acceptance contract satisfied.
- `failed`: attempt ended unsuccessfully.
- `cancelled`: execution ended due to cancellation.
- `archived`: terminal Task hidden from active views.

Terminal states: `completed`, `failed`, `cancelled`, `rejected`, `archived`.

`failed` and `rejected` can produce a new attempt through retry/reassignment. The historical attempt remains immutable.

### 4.2 Allowed transitions

```text
proposed -> assigned | cancelled
assigned -> acknowledged | waiting_input | rejected | cancelled | assigned(reassignment)
acknowledged -> running | cancelled | assigned(reassignment)
running -> waiting_input | waiting_approval | blocked | review | failed | cancelling
waiting_input -> acknowledged | running | blocked | cancelling
waiting_approval -> running | blocked | cancelling
blocked -> acknowledged | running | assigned | failed | cancelling
review -> completed | acknowledged(changes requested) | failed | cancelling
cancelling -> cancelled | failed
completed -> archived | acknowledged(user marked incomplete; new attempt)
failed -> assigned(retry) | archived
cancelled -> assigned(retry) | archived
rejected -> assigned(reassignment) | archived
```

Any other transition emits `INVALID_STATE_TRANSITION` and does not alter the projection.

### 4.3 Transition guards

#### assigned → acknowledged

Requires:

- assignee identity matches authenticated actor;
- objective and criteria are readable;
- deadline and budget are not already exhausted.

#### acknowledged → running

Requires:

- no unresolved clarification;
- required input references resolve;
- assignee lease acquired.

#### running → waiting_approval

Requires an `approval.requested` event containing exact action, target, scope, expiry, and risk.

#### running → review

Requires:

- `task.result_submitted`;
- declared output Artifacts registered or explicitly absent with reason;
- assignee lease released or marked reviewing.

#### review → completed

Requires:

- every required criterion has current passing Evidence or authorized waiver;
- all required child Tasks are completed;
- all required Artifacts resolve;
- performed external writes have read-back evidence;
- reviewer or deterministic policy accepted the result.

## 5. Acceptance criteria and evidence

A criterion has:

```json
{
  "criterion_id": "tests",
  "description": "npm test exits 0",
  "required": true,
  "verification_method": "command_exit",
  "expected": {"command": "npm test", "exit_code": 0},
  "status": "pending",
  "evidence_ids": []
}
```

Criterion status is projected as:

- `pending`;
- `passing`;
- `failing`;
- `waived`;
- `stale`.

Evidence becomes stale when its source Artifact is superseded or relevant files change after verification. For example, a passing build before a later code edit is stale and cannot satisfy completion.

## 6. Task ownership and delegation

- A Task has one current assignee.
- Reassignment appends `task.reassigned`; it does not edit the original assignment.
- Child Tasks reference `parent_task_id`.
- Parent completion waits for required children.
- A child budget cannot exceed the remaining parent budget.
- Delegation chain is carried forward and checked for loops.
- Collaborators may create Artifacts and Evidence but cannot submit the assignee's final result unless explicitly promoted to assignee.

## 7. Attempts and retries

Each Task has `attempt`. A retry:

1. appends `task.retry_requested`;
2. increments attempt;
3. preserves previous attempt events;
4. may retain valid input Artifacts;
5. invalidates execution Evidence affected by new changes;
6. resets active-stage projections.

Automatic retries are limited by failure class and budget. Authentication, missing approval, invalid input, and destructive-policy failures SHOULD NOT auto-retry.

## 8. Cancellation semantics

Cancellation is cooperative first.

- `task.cancel_requested` changes state to `cancelling`.
- New child tasks and side effects are forbidden.
- Active tools are asked to stop at a safe boundary.
- `task.cancelled` is emitted only after workers exit.
- If forced termination fails, the Task remains `cancelling` or becomes `failed`; the UI MUST NOT hide the live worker.

## 9. Presence projection

Presence is not task truth. It is a convenience projection:

- `working`: active running Task or recent tool activity;
- `waiting`: waiting_input, waiting_approval, or review;
- `blocked`: active blocked Task;
- `error`: connector failure;
- `idle`: connected without active work;
- `offline`: lease expired/disconnected.

A green presence indicator MUST NOT imply task success.

## 10. Event grouping for UI

Projectors create timeline groups without rewriting events:

- consecutive low-value reads/searches in a bounded time window;
- one tool invocation from start to completion;
- one delegation exchange from assignment to acknowledgement;
- one verification cycle from command start through evidence recording;
- one approval request and resolution.

Groups store event IDs and can be expanded to raw events.

## 11. Projection tables

Recommended initial SQLite projections:

- `events(room_id, sequence, event_id, type, actor_id, task_id, timestamp, payload_json, ...)`;
- `rooms(room_id, title, status, owner_id, version, last_sequence, ...)`;
- `room_members(room_id, agent_id, role, joined_sequence, left_sequence)`;
- `messages(message_id, room_id, sender_id, kind, content, task_id, event_id, ...)`;
- `tasks(task_id, room_id, parent_task_id, assignee_id, state, attempt, version, ...)`;
- `criteria(task_id, criterion_id, status, description, ...)`;
- `artifacts(artifact_id, task_id, version, uri, sha256, media_type, ...)`;
- `evidence(evidence_id, task_id, criterion_id, source_event_id, status, ...)`;
- `approvals(approval_id, task_id, state, scope_json, expires_at, ...)`;
- `narrative_entries(entry_id, room_id, sequence_start, sequence_end, source_event_ids_json, ...)`.

Projection rows can be rebuilt. Events cannot.

## 12. Failure taxonomy

`task.failed` uses one category:

- `input_missing`;
- `permission_denied`;
- `authentication_failed`;
- `tool_failed`;
- `test_failed`;
- `build_failed`;
- `verification_failed`;
- `timeout`;
- `budget_exhausted`;
- `dependency_failed`;
- `connector_failed`;
- `model_failed`;
- `policy_blocked`;
- `internal_error`.

Payload includes retryability, concise cause, failed event ID, and suggested recovery.

## 13. Reference workflow

```text
1 room.created
2 message.sent (user request)
3 task.proposed (main task)
4 task.assigned (Hermes)
5 task.acknowledged accepted
6 task.started
7 message.sent (Hermes delegates code work)
8 task.proposed (child)
9 task.assigned (Codex)
10 task.acknowledged accepted
11 task.started
12 tool.started npm test
13 tool.completed exit 1
14 evidence.recorded criterion=tests status=failing
15 message.sent progress: test failure explanation
16 artifact.created diff
17 tool.started npm test
18 tool.completed exit 0
19 evidence.recorded criterion=tests status=passing
20 tool.started npm run build
21 tool.completed exit 0
22 evidence.recorded criterion=build status=passing
23 task.result_submitted
24 task.review_requested
25 task.completed child
26 task.result_submitted parent
27 approval.requested publish
28 approval.resolved rejected
29 evidence.recorded local-work-complete
30 task.completed parent with outcome local-complete-not-published
```

This sequence yields both a readable conversation and a complete audit trail without conflating them.