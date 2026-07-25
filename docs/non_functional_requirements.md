# SentinelX — Non-Functional Requirements

## 1. Performance & Asynchronous Execution
- **Non-Blocking Architecture**: Execute backend security checks concurrently using thread pool executors to avoid UI blocking.
- **Fast Response Time**: Complete core website security reconnaissance within 3-10 seconds.
- **Fast PDF Rendering**: Generate and stream PDF reports in under 1 second.

## 2. Reliability & Fault Tolerance
- **Graceful Tool Fallbacks**: If external tools like Nmap or OWASP ZAP are unavailable, the application must operate cleanly using built-in Python socket and intelligence modules without throwing unhandled exceptions.
- **Self-Healing Schema**: Automatically verify and apply necessary database column migrations upon startup.

## 3. Usability & UI/UX Standards
- **Modern Dark Cyber Aesthetic**: Maintain high-contrast, visually appealing glassmorphism design system.
- **Responsive Layout**: Support full functionality across desktop, tablet, and mobile viewports.
- **Clear Status Feedback**: Display real-time progress indicators during assessments.

## 4. Security & Compatibility
- **100% Backward Compatibility**: Preserve all existing API endpoints, data formats, and UI workflows.
- **Safe Evaluation**: Operate exclusively in an assessment and reporting capacity without generating unauthorized attack payloads.
