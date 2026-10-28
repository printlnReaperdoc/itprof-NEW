# Application Security Architecture & Controls

## 1. Authentication & Session Security
- **Bcrypt Password Hashing**: Passwords are salted with 12 rounds of bcrypt before persistent database storage. Password hashes are never returned via JSON responses (`userSchema.methods.toJSON` excludes `passwordHash`).
- **Session Management**: Configured with `connect-mongo` storing sessions in MongoDB. Cookies are tagged with:
  * `httpOnly: true` (prevents malicious client-side JavaScript access / XSS token theft).
  * `secure: true` in production (enforces HTTPS transmission).
  * `sameSite: 'lax'` (prevents cross-site request forgery attacks).
- **Session Fixation Prevention**: `req.session.regenerate()` is executed upon successful login and registration.
- **Brute-Force Rate Limiting**: Express rate limiting restricts authentication endpoints (`/api/auth/login`, `/api/auth/register`) to 30 requests per 15-minute window per IP.

## 2. Authorization & Privilege Escalation Prevention
- **Role-Based Access Control (RBAC)**: Defined roles: `student`, `faculty`, `admin`.
- **Public Registration Isolation**: Public registration endpoint (`/api/auth/register`) explicitly hardcodes `role: 'student'`. Any attempt to supply `role: 'faculty'` in request bodies is discarded.
- **Resource Scope Validation**: Students can only access their own quiz attempts and personal progress records. Faculty can view master gradebooks and review all student attempts.
- **Sequential Unlocking Enforcement**: The backend verifies chapter access via `canAccessChapter` and database progress records. Bypassing frontend route guards will yield a `403 Forbidden (CHAPTER_LOCKED)`.

## 3. Assessment & Anti-Cheating Integrity
- **Hidden Answer Keys**: Correct answer indicators (`isCorrect: true`) are stripped by backend query projections before student quiz payloads are returned.
- **Server-Enforced Timing**: Deadlines (`deadlineAt = startedAt + 600s`) are authoritative and recorded on the server. Answer updates or submissions received after the deadline are handled by automated timeout finalization.
- **Atomic Scoring & Unlocking**: Grading is executed via MongoDB multi-document transactions to guarantee atomicity across `QuizAttempt`, `AttemptAnswer`, `ChapterProgress`, and `AuditLog`.

## 4. Input Sanitization & Attack Mitigation
- **Spreadsheet Formula Injection**: Cell values in exported XLSX and CSV files beginning with dangerous symbols (`=`, `+`, `-`, `@`) are prepended with `'` to prevent execution in Excel/Calc.
- **NoSQL Injection**: Queries use Mongoose strongly-typed schema models rather than raw user-supplied query-object merging.
- **Multer Upload Sanitization**: Files are validated against allowed MIME types and extensions. Files are saved with random UUID filenames outside executable paths.
- **Centralized Audit Logging**: All mutations, logins, failed attempts, and exports are recorded in the `AuditLog` collection with passwords, tokens, and hashes redacted.

