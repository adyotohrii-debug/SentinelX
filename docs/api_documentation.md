# SentinelX — API Documentation

## Table of Endpoints

1. [POST /security/scan](#1-post-securityscan)
2. [GET /security/tools-status](#2-get-securitytools-status)
3. [POST /upload/file](#3-post-uploadfile)
4. [POST /upload/website](#4-post-uploadwebsite)
5. [POST /upload/ip](#5-post-uploadip)
6. [GET /assessments/](#6-get-assessments)
7. [GET /assessments/{assessment_id}](#7-get-assessmentsassessment_id)
8. [DELETE /assessments/{assessment_id}](#8-delete-assessmentsassessment_id)
9. [GET /dashboard/stats](#9-get-dashboardstats)
10. [GET /reports/](#10-get-reports)
11. [GET /reports/pdf](#11-get-reportspdf)

---

## 1. POST `/security/scan`

### Description
Performs full automated security assessment on a target website including HTTP headers, SSL status, open ports, Nmap check, WHOIS, DNS, tech detection, and risk scoring. Saves the result to the database.

### Request Headers
- `x-user-id` *(optional, string)*: User session identification header.

### Request Body
```json
{
  "target": "example.com"
}
```

### Response Example (200 OK)
```json
{
  "success": true,
  "target": "example.com",
  "security_score": 85,
  "risk_level": "Low",
  "assessment_id": 42,
  "recommendations": [
    "Enable Content Security Policy (CSP).",
    "Enable HTTP Strict Transport Security (HSTS)."
  ],
  "headers": {
    "Content-Security-Policy": "Missing",
    "Strict-Transport-Security": "Missing",
    "X-Frame-Options": "SAMEORIGIN"
  },
  "ssl": {
    "status": "Valid",
    "issuer": {"organizationName": "Let's Encrypt"},
    "expires": "May 15 2026"
  },
  "open_ports": [80, 443],
  "nmap": {"installed": true, "output": "PORT STATE SERVICE..."},
  "whois": {"domain": "example.com", "registrar": "RESERVED-Internet Assigned Numbers Authority"},
  "dns": {"A": ["93.184.216.34"], "MX": [], "NS": ["a.iana-servers.net"]},
  "technology": {"web-servers": ["Nginx"]},
  "robots": {"found": true, "status_code": 200},
  "sitemap": {"found": false},
  "server": {"server": "Nginx", "powered_by": "Unknown"}
}
```

### Error Responses
- **400 Bad Request**: Target cannot be empty.

---

## 2. GET `/security/tools-status`

### Description
Returns backend environment status for security tools (Nmap installation, OWASP ZAP binary presence, and OWASP ZAP REST API reachability).

### Response Example (200 OK)
```json
{
  "nmap_installed": true,
  "zap_installed": false,
  "zap_running": false,
  "zap_available": false,
  "message": "OWASP ZAP is not installed or not running. Advanced vulnerability scanning is unavailable. All other SentinelX security assessment features remain fully functional."
}
```

---

## 3. POST `/upload/file`

### Description
Uploads and parses an Nmap XML, OWASP ZAP XML, CSV, or JSON scan file. Persists findings in the database.

### Request Parameters
- `file` *(multipart/form-data, file)*: File to parse.

### Response Example (200 OK)
```json
{
  "success": true,
  "scanner": "OWASP ZAP",
  "records": 5,
  "findings": [
    {
      "site": "https://example.com",
      "risk": "High",
      "title": "SQL Injection",
      "description": "Possible SQL injection detected.",
      "scanner": "OWASP ZAP"
    }
  ],
  "message": "OWASP ZAP XML parsed successfully.",
  "assessment_id": 43
}
```

---

## 4. POST `/upload/website`

### Description
Queues website processing task.

### Request Body
```json
{
  "target": "example.com"
}
```

---

## 5. POST `/upload/ip`

### Description
Queues IP address processing task.

### Request Body
```json
{
  "target": "192.168.1.1"
}
```

---

## 6. GET `/assessments/`

### Description
Retrieves list of all saved assessments.

### Request Headers
- `x-user-id` *(optional, string)*: User session filter.

### Response Example (200 OK)
```json
[
  {
    "id": 42,
    "name": "Website scan — example.com",
    "target": "example.com",
    "input_type": "Website",
    "status": "Completed",
    "created_at": "2026-07-25T23:00:00"
  }
]
```

---

## 7. GET `/assessments/{assessment_id}`

### Description
Retrieves full details and findings list for a specific assessment.

### Response Example (200 OK)
```json
{
  "id": 42,
  "name": "Website scan — example.com",
  "target": "example.com",
  "input_type": "Website",
  "status": "Completed",
  "created_at": "2026-07-25T23:00:00",
  "raw_results": { ... },
  "findings": [
    {
      "id": 101,
      "scanner": "SentinelX Risk Engine",
      "severity": "Low",
      "status": "Open",
      "description": "Enable Content Security Policy (CSP)."
    }
  ]
}
```

---

## 8. DELETE `/assessments/{assessment_id}`

### Description
Deletes an assessment and its associated findings from the database.

---

## 9. GET `/dashboard/stats`

### Description
Returns aggregated dashboard statistics including assessment counts, severity breakdown, OWASP count, and tool status.

---

## 10. GET `/reports/`

### Description
Generates aggregated live platform analytics report data.

---

## 11. GET `/reports/pdf`

### Description
Generates and downloads a formatted ReportLab PDF document (`SentinelX_Report.pdf`).
