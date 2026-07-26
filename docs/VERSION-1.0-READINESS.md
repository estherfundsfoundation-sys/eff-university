# EFF University Version 1.0 Readiness Report

Date: July 26, 2026  
Release state: Pilot candidate; public-launch authorization pending  
Feature scope: Frozen after this pass

## Completed in the codebase

- Persistent Educational Simulation identifier across the shared layout.
- Complete non-accreditation/non-degree language in shared policy surfaces, registration, dashboard, acceptance experience, student IDs, financial-aid simulation, schedules, certificates, and print output.
- Site-wide print watermark: “EDUCATIONAL SIMULATION — NOT AN OFFICIAL COLLEGE DOCUMENT.”
- Under-13, ages 13–17, and adult registration paths. Under-13 learners are routed to supervised Guest Practice Mode.
- Children’s Privacy Notice, Parent/Guardian Notice, draft retention policy, device export/deletion, account-request workflow, and versioned consent metadata.
- Accessibility Statement, global help controls, read-aloud option, visible focus, skip link, reduced motion, and accessibility issue reporting.
- Visible outdated/confusing-information reporting control.
- First Day guided experience, Tour MyEFFU, first-step help, continue state, not-sure path, and Guest Practice Mode.
- Public manual System Status page and Support page.
- Explicit user-controlled consent before leaving EFFU for the separate EFF Help Desk.
- Written and product-level boundaries separating simulation records from Help Desk cases.
- Version 1.0 brand-variation page with required motto, establishment year, and campaign line.
- Pilot feature flags and explicit public-launch false state in `lib/launch-readiness.ts`.
- Production build dependency approvals limited to reviewed required packages.

## Remaining launch blockers

- The four existing downloadable PDF toolkits have not yet been regenerated with the new Version 1.0 watermark and full disclaimer.
- Email acceptance templates and provider-rendered messages require a real inbox test after the final content is configured.
- Account deletion is a verified request workflow, not automated self-service deletion.
- Account export covers device data and Supabase user metadata available to the client, not every provider log, backup, community record, or Help Desk record.
- No production-grade content-management workflow exists for per-claim source, reviewer, verification status, and next-review metadata.
- A qualified attorney must approve the Children’s Privacy Notice, guardian-consent model, retention schedule, terms, email consent, and deletion obligations.
- A qualified privacy/security lead must verify that production data stores, analytics, logs, backups, and email systems match the public notices.

## Known accessibility limitations

- WCAG 2.2 AA conformance has not been certified.
- Manual testing remains necessary with NVDA, JAWS, VoiceOver, TalkBack, keyboard-only navigation, 200–400% zoom, high contrast, reduced motion, speech input, and mobile reflow.
- Canvas-generated graphics and legacy PDFs may not expose sufficient structure or text alternatives.
- Browser speech synthesis availability and voice quality vary.
- Color-contrast and focus-order review is incomplete across every interactive state.

## Known security and administrator limitations

- Administrator multifactor authentication has not been evidenced in this repository.
- Role-based administrator permissions and least-privilege roles are not implemented in the application.
- Immutable administrator audit logs are not implemented.
- Emergency feature-disable controls are declared but not connected to an authenticated administrator console.
- Backup completion, encryption, retention, and restoration have not been independently verified.
- No successful production restore drill has been evidenced.
- Incident-response ownership, escalation contacts, severity definitions, communication templates, and tabletop exercise require organizational approval.
- Community moderation, abuse response, rate limiting, and minor-safety operations need a formal human operating procedure.

## Content requiring professional review

- Federal student-aid, veterans’ benefits, TRIO, disability accommodation, admissions, transfer, and institutional-account language.
- Financial scenarios, FAFSA guidance, sample award language, and student-loan explanations.
- Emergency, homelessness, mental-health, medical, legal, and benefits-related resource language.
- All claims about EFF programs, response times, scholarships, grants, advocacy, and service availability.

## Legal determinations still needed

- Whether and how EFFU may create accounts for minors ages 13–17.
- Whether supervised under-13 Guest Practice Mode avoids collection of personal information in actual production telemetry and vendor systems.
- Applicable COPPA, FERPA, state student-privacy, consumer-protection, accessibility, email-marketing, records-retention, and international privacy obligations.
- Final terms of use, privacy policy, consent record, data-processing agreements, deletion timelines, and records-hold exceptions.
- Review of “University,” admissions, acceptance, student ID, financial aid, grade, transcript, certificate, and athletics presentation for consumer-confusion risk.

## Pilot-testing instructions

1. Use a non-production pilot cohort and test accounts that contain no real sensitive student data.
2. Test all three age paths and verify under-13 learners cannot create an independent account or access community features.
3. Test registration, confirmation email, sign-in, password reset, sign-out, data export, deletion request, and consent history.
4. Complete the First Day tour and every major EFFU simulation path on desktop and mobile.
5. Verify all official-looking materials show the simulation identifier, watermark, and complete disclaimer in screen, print, download, and email formats.
6. Conduct keyboard, screen-reader, zoom/reflow, contrast, reduced-motion, and mobile accessibility sessions with disabled testers.
7. Verify no Help Desk record is created until the learner affirmatively consents and submits information in the separate portal.
8. Complete administrator MFA, RBAC, audit-log, incident-response, emergency-disable, backup, and restore drills with written evidence.
9. Obtain legal, privacy, accessibility, financial-aid, veteran-services, and education-content sign-off.
10. Record every defect, owner, severity, fix version, retest result, and launch decision.

## Scope freeze

EFF University Version 1.0 academic feature scope is frozen. Only defects, safety corrections, accessibility fixes, privacy/security fixes, legal changes, and verified content corrections may enter Version 1.0. All new ideas belong in `docs/VERSION-1.1-BACKLOG.md`.
