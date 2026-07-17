import os
import shutil
from pathlib import Path

from app.services.xml_parser import (
    parse_nmap_xml,
    parse_zap_xml,
)

UPLOAD_DIR = "uploads"

Path(UPLOAD_DIR).mkdir(exist_ok=True)


def save_uploaded_file(file):
    filename = file.filename
    extension = Path(filename).suffix.lower()

    file_path = os.path.join(UPLOAD_DIR, filename)

    with open(file_path, "wb") as buffer:
        shutil.copyfileobj(file.file, buffer)

    if extension == ".xml":

        try:
            findings = parse_nmap_xml(file_path)

            if findings:
                return {
                    "success": True,
                    "scanner": "Nmap",
                    "records": len(findings),
                    "findings": findings,
                    "message": "Nmap XML parsed successfully."
                }

        except Exception:
            pass

        try:
            findings = parse_zap_xml(file_path)

            if findings:
                return {
                    "success": True,
                    "scanner": "OWASP ZAP",
                    "records": len(findings),
                    "findings": findings,
                    "message": "OWASP ZAP XML parsed successfully."
                }

        except Exception:
            pass

        return {
            "success": False,
            "message": "Unsupported XML format."
        }

    elif extension == ".csv":

        return {
            "success": True,
            "type": "CSV",
            "filename": filename,
            "message": "CSV uploaded successfully."
        }

    elif extension == ".json":

        return {
            "success": True,
            "type": "JSON",
            "filename": filename,
            "message": "JSON uploaded successfully."
        }

    return {
        "success": False,
        "message": "Unsupported file type."
    }


def process_website(target: str):

    return {
        "success": True,
        "target": target,
        "type": "Website",
        "status": "Queued"
    }


def process_ip(target: str):

    return {
        "success": True,
        "target": target,
        "type": "IP Address",
        "status": "Queued"
    }