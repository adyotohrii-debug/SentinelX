def calculate_risk(scan_result):

    score = 100
    recommendations = []

    headers = scan_result.get("headers", {})
    ssl = scan_result.get("ssl", {})
    ports = scan_result.get("open_ports", [])
    server = scan_result.get("server", {})
    technology = scan_result.get("technology", {})
    robots = scan_result.get("robots", {})
    sitemap = scan_result.get("sitemap", {})

    penalties = {
        "Content-Security-Policy": (
            15,
            "Enable Content Security Policy (CSP).",
        ),
        "Strict-Transport-Security": (
            15,
            "Enable HTTP Strict Transport Security (HSTS).",
        ),
        "X-Content-Type-Options": (
            10,
            "Enable X-Content-Type-Options.",
        ),
        "Referrer-Policy": (
            5,
            "Configure Referrer Policy.",
        ),
        "Permissions-Policy": (
            5,
            "Configure Permissions Policy.",
        ),
    }

    # -------------------------
    # Security Headers
    # -------------------------
    for header, (penalty, advice) in penalties.items():
        val = headers.get(header)
        if val == "Missing" or val is None or val == "" or "error" in headers:
            score -= penalty
            if advice not in recommendations:
                recommendations.append(advice)

    # -------------------------
    # SSL
    # -------------------------
    if ssl.get("status") != "Valid":
        score -= 20
        ssl_advice = "SSL Certificate is invalid or missing."
        if ssl_advice not in recommendations:
            recommendations.append(ssl_advice)

    # -------------------------
    # Dangerous Ports
    # -------------------------
    dangerous_ports = {
        21: ("FTP port exposed.", 10),
        22: ("SSH port exposed.", 10),
        23: ("Telnet port exposed.", 20),
        25: ("SMTP port exposed.", 10),
        3306: ("MySQL exposed.", 15),
        3389: ("RDP exposed.", 20),
    }

    for port in ports:
        if port in dangerous_ports:
            advice, penalty = dangerous_ports[port]
            score -= penalty
            if advice not in recommendations:
                recommendations.append(advice)

    # -------------------------
    # robots.txt & sitemap.xml
    # -------------------------
    if not robots.get("found"):
        score -= 3
        r_advice = "robots.txt not found."
        if r_advice not in recommendations:
            recommendations.append(r_advice)

    if not sitemap.get("found"):
        score -= 3
        s_advice = "sitemap.xml not found."
        if s_advice not in recommendations:
            recommendations.append(s_advice)

    # -------------------------
    # Server Exposure
    # -------------------------
    server_name = str(server.get("server", "")).lower()
    if any(s in server_name for s in ["apache/2.2", "iis/7"]):
        score -= 5
        srv_advice = "Server software appears outdated."
        if srv_advice not in recommendations:
            recommendations.append(srv_advice)

    # -------------------------
    # Technology Detection
    # -------------------------
    if technology and not technology.get("error"):
        score += 2
    else:
        score -= 5

    # -------------------------
    # OWASP Findings (if present)
    # -------------------------
    owasp_findings = scan_result.get("owasp_findings", [])
    for finding in owasp_findings:
        risk_str = str(finding.get("risk", "")).lower()
        title = finding.get("title", "Vulnerability detected")
        if "critical" in risk_str:
            score -= 15
            recommendations.append(f"OWASP Critical Risk: {title}")
        elif "high" in risk_str:
            score -= 10
            recommendations.append(f"OWASP High Risk: {title}")
        elif "medium" in risk_str:
            score -= 5
            recommendations.append(f"OWASP Medium Risk: {title}")
        elif "low" in risk_str:
            score -= 2
            recommendations.append(f"OWASP Low Risk: {title}")

    # -------------------------
    # Score Clamping
    # -------------------------
    score = max(0, min(score, 100))

    # -------------------------
    # Risk Level Determination
    # -------------------------
    if score >= 90:
        risk = "Low"
    elif score >= 70:
        risk = "Medium"
    elif score >= 40:
        risk = "High"
    else:
        risk = "Critical"

    if len(recommendations) == 0:
        recommendations.append("No major security issues detected.")

    return {
        "score": score,
        "risk": risk,
        "recommendations": recommendations
    }