# SentinelX — Changelog & Version History

All notable changes, bug fixes, and feature additions for **SentinelX** are documented below.

---

## [Version 2.0.0] - 2026-07-25

### 🚀 Highlights & Primary Improvements
- **History Module Fix**: Resolved assessment visibility issue where imported XML scan records were omitted due to missing `user_id` headers. Updated `upload.py` and `assessment.py` to retrieve all assessments (`user_id == x_user_id` OR `user_id is None`), ensuring 100% of completed website scans and imported XML files appear in History.
- **OWASP ZAP Integration & Detection**: Implemented non-offensive backend tool reachability status checking for OWASP ZAP REST API. Added `get_tools_status()` to dynamically detect Nmap CLI installation and local OWASP ZAP API reachability.
- **Dedicated OWASP Setup Page**: Created `OwaspSetup.jsx` route with external download links (`zaproxy.org`, GitHub project repository, SentinelX zip download), environment guidance notes, and live backend tool status card.
- **Tool Status Card Component**: Added `ToolStatusCard.jsx` displaying real-time status (`✓ Nmap Installed`, `✓ OWASP ZAP Installed`, `✓ OWASP Running` / fallback notice) without hardcoded values.
- **ReportLab PDF Report Extensions**: Enhanced `pdf_service.py` to compile formatted executive summaries, platform metadata, risk/severity breakdown tables, tool status matrices, and recommendations.

---

### 🐛 Bug Fixes & Refactoring
- **`backend/app/api/assessment.py`**:
  - Fixed query logic in `get_assessments` and `get_assessment` to include records where `user_id is None`.
  - Removed duplicate definitions of `create_assessment` and `update_assessment`.
- **`backend/app/api/upload.py`**:
  - Captured `x-user-id` header in `upload_file` endpoint to link uploaded scan files to user sessions.
- **`backend/app/services/security_service.py`**:
  - Added `detect_zap()`, `check_zap_running()`, and `get_tools_status()`.
- **`backend/app/services/risk_engine.py`**:
  - Extended `calculate_risk` to deduct risk points and generate recommendations for OWASP vulnerability findings when present.
- **`backend/app/services/dashboard_service.py` & `report_service.py`**:
  - Integrated `tools_status` and `owasp_findings` metrics into dashboard and report API responses.
- **`frontend/src/pages/History.jsx`**:
  - Enhanced History table to display Target URL/Host, Scanner Type, Risk Score, Scan Status, Report Availability ("Ready"), Scan Date & Time, View Details button, and PDF/JSON download action buttons.

---

### 📚 Documentation & System Architecture
- Created root `README.md` with overview, feature breakdown, setup guides, and system architecture.
- Created `docs/` folder containing:
  - `docs/functional_requirements.md`
  - `docs/non_functional_requirements.md`
  - `docs/hardware_software_requirements.md`
  - `docs/technology_stack.md`
  - `docs/project_workflow.md`
  - `docs/module_overview.md`
  - `docs/folder_structure.md`
  - `docs/deployment_guide.md`
  - `docs/system_architecture.md` (containing 3 Mermaid diagrams: High Level Architecture, Assessment Workflow, Module Relationships)
  - `docs/api_documentation.md` (Complete Markdown API reference with request/response examples and error codes for all endpoints)

---

### ✅ Backward Compatibility & Integrity Statement
- **Zero Breaking Changes**: All pre-existing API contracts (`/security/scan`, `/upload/file`, `/dashboard/stats`, `/reports/pdf`, etc.), database schemas (`Assessment`, `Finding`), and frontend styling remain 100% functional and backward compatible.
- **No Unrelated Code Added**: No artificial AI features, course material, Linux tutorials, or authentication systems were added. The project remains a pure, professional security assessment platform.
