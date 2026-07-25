# SentinelX — Functional Requirements

## 1. Security Assessment Engine
- **Target Normalization**: Accept domain names or full URLs and normalize them for scanning.
- **HTTP Security Header Audit**: Check for missing security headers including CSP, HSTS, X-Frame-Options, X-Content-Type-Options, Referrer-Policy, and Permissions-Policy.
- **SSL/TLS Analysis**: Validate certificate validity, issuer information, and expiration dates over HTTPS.
- **Open Port Identification**: Perform fast socket checks across common administrative and database ports (21, 22, 23, 25, 53, 80, 110, 143, 443, 3306, 3389, 8080).
- **Nmap CLI Execution**: Detect system Nmap installation and execute fast scan flags when available.
- **DNS Intelligence & WHOIS Lookup**: Query domain A, MX, NS records and WHOIS registrar metadata.
- **Technology Detection**: Detect web servers (Nginx, Apache, IIS, Cloudflare), programming frameworks (PHP, ASP.NET, Express, Next.js), CMS (WordPress, Drupal, Joomla), and JavaScript libraries.

## 2. OWASP ZAP Integration & File Import
- **Backend Environment Detection**: Dynamically verify if OWASP ZAP binary is installed and whether the local ZAP REST API endpoint is reachable on localhost port 8080.
- **OWASP XML Report Import**: Parse standard OWASP ZAP XML reports, extracting sites, alerts, severity levels, and vulnerability descriptions into the database.
- **Tool Status Monitoring**: Render real-time Tool Status indicators across the application without hardcoded values.

## 3. Risk Engine & Scoring
- **Risk Score Calculation**: Compute an overall security score (0-100) and risk tier (Low, Medium, High, Critical) using penalty deductions for header gaps, invalid SSL, open ports, outdated server software, and OWASP findings.
- **Remediation Advice Generation**: Provide actionable recommendations based on detected vulnerabilities.

## 4. Reporting & Archive
- **PDF Report Generation**: Generate ReportLab PDF reports containing Executive Summaries, Risk Breakdown, Tool Status Matrix, and Recommendations.
- **Scan History Management**: Persist all completed scans and uploaded files into SQLite and provide search, details view, JSON export, and PDF download capabilities.
