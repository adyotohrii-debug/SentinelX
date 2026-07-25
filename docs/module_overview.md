# SentinelX — Module Overview

## 1. Intelligence Service (`intelligence_service.py`)
Provides domain reconnaissance functions including WHOIS metadata extraction, DNS record resolution (A, MX, NS), tech stack fingerprinting, `robots.txt` verification, `sitemap.xml` presence checking, HTTP allowed methods, and server header parsing.

## 2. Security Service (`security_service.py`)
Handles target normalization, HTTP security header auditing, SSL/TLS certificate verification, socket port scanning, Nmap binary detection/execution, and OWASP ZAP binary/REST API status checking (`get_tools_status`).

## 3. Risk Engine (`risk_engine.py`)
Implements the core scoring algorithm. Evaluates penalties across missing headers, invalid SSL, dangerous exposed ports, outdated server versions, and OWASP findings to return a 0-100 score, risk classification, and tailored recommendations.

## 4. Upload & XML Parser Service (`upload_service.py` & `xml_parser.py`)
Parses uploaded Nmap XML and OWASP ZAP XML reports, extracting findings, host addresses, severity levels, and vulnerability titles into database models.

## 5. Report & PDF Service (`report_service.py` & `pdf_service.py`)
Aggregates live platform analytics and compiles formatted ReportLab PDF documents with executive summaries, risk metrics, tool status matrices, and remediation steps.

## 6. Frontend UI Components
- **Dashboard**: High-level platform health, posture ring, tool status card, findings breakdown, charts, and scan activity.
- **Assessment**: Target URL entry, multi-step progress UI, and scan results display.
- **History**: Full assessment archive table with search, view details modal, JSON download, and PDF export buttons.
- **OWASP Setup**: Dedicated guide and setup page with download buttons, live tool status, and integration instructions.
