# Use official Python runtime as base image
FROM python:3.10-slim

# Set environment variables
ENV PYTHONDONTWRITEBYTECODE=1
ENV PYTHONUNBUFFERED=1

# Set working directory
WORKDIR /app

# Install system dependencies including Nmap
RUN apt-get update && \
    apt-get install -y --no-install-recommends nmap curl && \
    rm -rf /var/lib/apt/lists/*

# Copy requirements file and install Python packages
COPY requirements.txt /app/
RUN pip install --no-cache-dir -r requirements.txt

# Copy backend source code
COPY . /app/

# Expose backend port
EXPOSE 8000

# Start backend using uvicorn
CMD ["uvicorn", "app.main:app", "--host", "0.0.0.0", "--port", "8000"]
