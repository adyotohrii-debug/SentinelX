# SentinelX — Project Workflow

## End-to-End Assessment Workflow

```text
  [ User Initiates Assessment ]
               │
               ▼
   Enter Target Website / URL
               │
               ▼
┌──────────────────────────────┐
│  FastAPI Security Scan API   │
└──────────────┬───────────────┘
               │
      Concurrent Execution
   ┌───────────┼───────────┐
   ▼           ▼           ▼
Security      DNS /       Nmap /
 Headers      WHOIS     Tech Stack
   │           │           │
   └───────────┼───────────┘
               │
               ▼
┌──────────────────────────────┐
│     SentinelX Risk Engine    │
│  (Score & Recommendations)   │
└──────────────┬───────────────┘
               │
               ▼
┌──────────────────────────────┐
│   Database Persistence       │
│  (Assessment & Findings)     │
└──────────────┬───────────────┘
               │
       ┌───────┴───────┐
       ▼               ▼
  Dashboard UI    PDF Report
  & History       Generation
```

1. **Initiation**: User submits a website target URL on the Assessment page or uploads an XML report.
2. **Reconnaissance & Scan**: FastAPI dispatches asynchronous security checks for headers, SSL, open ports, WHOIS, DNS, tech stack, and Nmap.
3. **Evaluation**: Risk Engine evaluates collected data and OWASP findings, calculating the overall security score and risk classification.
4. **Storage**: The complete assessment and individual findings are committed to `sentinelx.db`.
5. **Presentation**: Results populate the Dashboard posture score, populate History, and allow downloading full ReportLab PDF reports.
