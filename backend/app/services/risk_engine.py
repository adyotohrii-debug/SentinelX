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

        if headers.get(header) == "Missing":

            score -= penalty

            recommendations.append(advice)

    # -------------------------
    # SSL
    # -------------------------

    if ssl.get("status") != "Valid":

        score -= 20

        recommendations.append(
            "SSL Certificate is invalid."
        )

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

            recommendations.append(advice)

    # -------------------------
    # robots.txt
    # -------------------------

    if not robots.get("found"):

        score -= 3

        recommendations.append(
            "robots.txt not found."
        )

    # -------------------------
    # sitemap.xml
    # -------------------------

    if not sitemap.get("found"):

        score -= 3

        recommendations.append(
            "sitemap.xml not found."
        )

    # -------------------------
    # Server Exposure
    # -------------------------

    server_name = str(
        server.get("server", "")
    ).lower()

    if server_name in [
        "apache",
        "apache/2.2",
        "iis/7",
    ]:

        score -= 5

        recommendations.append(
            "Server software appears outdated."
        )

    # -------------------------
    # Technology Detection
    # -------------------------

    if technology:

        score += 2

    else:

        score -= 5

    # -------------------------
    # Clamp
    # -------------------------

    score = max(0, min(score, 100))

    # -------------------------
    # Risk Level
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

        recommendations.append(
            "No major security issues detected."
        )

    return {

        "score": score,

        "risk": risk,

        "recommendations": recommendations

    }