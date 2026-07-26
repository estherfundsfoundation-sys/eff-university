# Administrator and Security Control Gate

These controls are required before public launch and must not be represented as complete without operational evidence.

| Control | Version 1.0 state | Required evidence |
|---|---|---|
| Administrator MFA | Blocked | Identity-provider policy, enrolled administrators, recovery procedure, test evidence |
| Role-based permissions | Blocked | Role matrix, least-privilege implementation, permission tests |
| Audit logs | Blocked | Immutable event schema, retention, access controls, test events |
| Backup verification | Blocked | Backup inventory, encryption, completion alerts, sampled verification |
| Restore testing | Blocked | Successful isolated restore, timestamps, data-integrity checks, owner sign-off |
| Incident response | Blocked | Severity matrix, contacts, playbooks, notification decisions, tabletop results |
| Emergency feature disable | Partially designed | Authenticated kill switches, dual control, audit event, rollback test |
| Record separation | Product boundary present | Architecture/data-flow review proving EFFU and Help Desk separation |

`lib/launch-readiness.ts` keeps public launch disabled and marks emergency-disable support false until these controls are evidenced.
