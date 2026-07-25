# SentinelX — Folder Structure

```text
SentinelX/
├── backend/
│   ├── app/
│   │   ├── api/
│   │   │   ├── assessment.py       # Assessment CRUD & retrieval endpoints
│   │   │   ├── dashboard.py        # Dashboard stats endpoint
│   │   │   ├── reports.py          # Report data & PDF generation endpoints
│   │   │   ├── security.py         # Website security scan & tool status endpoints
│   │   │   └── upload.py           # XML/CSV file upload endpoint
│   │   ├── core/
│   │   │   ├── config.py           # Core app settings
│   │   │   └── database.py         # SQLAlchemy engine & session factory
│   │   ├── models/
│   │   │   ├── assessment.py       # Assessment database model
│   │   │   └── finding.py          # Finding database model
│   │   ├── schemas/
│   │   │   ├── assessment.py       # Assessment Pydantic schemas
│   │   │   └── upload.py           # Upload Pydantic schemas
│   │   ├── services/
│   │   │   ├── dashboard_service.py # Dashboard metrics aggregator
│   │   │   ├── intelligence_service.py # WHOIS, DNS, tech stack intelligence
│   │   │   ├── pdf_service.py       # ReportLab PDF document generator
│   │   │   ├── report_service.py    # Report data generator
│   │   │   ├── risk_engine.py       # Security score & recommendations engine
│   │   │   ├── security_service.py  # Headers, SSL, ports, Nmap, ZAP status
│   │   │   ├── upload_service.py    # File upload processor
│   │   │   └── xml_parser.py        # Nmap & ZAP XML parsers
│   │   └── main.py                 # FastAPI app entrypoint & middleware
│   ├── Dockerfile                  # Backend container configuration
│   ├── requirements.txt            # Python dependencies
│   ├── sentinelx.db                # SQLite database file
│   └── uploads/                    # Uploaded file buffer directory
├── frontend/
│   ├── public/                     # Static web assets
│   ├── src/
│   │   ├── components/             # Reusable UI elements (ToolStatusCard, Sidebar, Topbar, PDFReport)
│   │   ├── layouts/                # MainLayout wrapper
│   │   ├── pages/                  # Application pages (Dashboard, Assessment, Reports, History, OwaspSetup, About)
│   │   ├── services/               # Axios API client setup
│   │   ├── styles/                 # Modular CSS design system files
│   │   ├── App.jsx                 # React Router routing setup
│   │   └── main.jsx                # React app entrypoint
│   ├── Dockerfile                  # Frontend container configuration
│   ├── package.json                # Frontend Node dependencies
│   └── vite.config.js              # Vite bundler configuration
├── docs/                           # Documentation markdown files
├── docker-compose.yml              # Docker compose service definition
├── README.md                       # Main project documentation
└── CHANGELOG.md                    # Project change history
```
