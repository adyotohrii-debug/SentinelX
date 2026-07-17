from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware
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