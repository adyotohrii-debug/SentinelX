import os
import io
import zipfile
from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware
from fastapi.responses import StreamingResponse
from app.api.security import router as security_router

from app.core.database import Base, engine

# Database Models
from app.models.assessment import Assessment
from app.models.finding import Finding

# Routers
from app.api.assessment import router as assessment_router
from app.api.upload import router as upload_router
from app.api.dashboard import router as dashboard_router
from app.api.reports import router as reports_router

# Create Tables
Base.metadata.create_all(bind=engine)

# Self-healing alteration to ensure raw_results column exists
from sqlalchemy import inspect, text
inspector = inspect(engine)
if "assessments" in inspector.get_table_names():
    columns = [col["name"] for col in inspector.get_columns("assessments")]
    if "raw_results" not in columns:
        with engine.begin() as conn:
            conn.execute(text("ALTER TABLE assessments ADD COLUMN raw_results TEXT"))
    if "user_id" not in columns:
        with engine.begin() as conn:
            conn.execute(text("ALTER TABLE assessments ADD COLUMN user_id TEXT"))

app = FastAPI(
    title="SentinelX API",
    description="Intelligent Security Assessment & Reporting Platform",
    version="1.0.0"
)

# CORS
app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],
    allow_credentials=False,
    allow_methods=["*"],
    allow_headers=["*"],
)

# API Routers
app.include_router(assessment_router)
app.include_router(upload_router)
app.include_router(dashboard_router)
app.include_router(reports_router)
app.include_router(security_router)

@app.get("/")
def home():
    return {
        "message": "Welcome to SentinelX API 🚀",
        "status": "Running",
        "version": "1.0.0"
    }


@app.get("/health")
def health():
    return {
        "status": "healthy",
        "database": "connected"
    }


@app.get("/download-zip")
def download_project_zip():
    """Dynamically zip and serve the SentinelX project source code for direct download."""
    project_root = os.path.abspath(os.path.join(os.path.dirname(__file__), "..", ".."))
    zip_buffer = io.BytesIO()

    with zipfile.ZipFile(zip_buffer, "w", zipfile.ZIP_DEFLATED) as zip_file:
        for root, dirs, files in os.walk(project_root):
            dirs[:] = [d for d in dirs if d not in ("venv", "node_modules", ".git", "__pycache__", ".pytest_cache", "dist", "build", ".brain")]
            for file in files:
                if file.endswith((".pyc", ".pyo", ".log", ".tmp")):
                    continue
                file_path = os.path.join(root, file)
                arcname = os.path.relpath(file_path, project_root)
                zip_file.write(file_path, os.path.join("SentinelX-main", arcname))

    zip_buffer.seek(0)
    return StreamingResponse(
        zip_buffer,
        media_type="application/zip",
        headers={"Content-Disposition": 'attachment; filename="SentinelX-main.zip"'}
    )