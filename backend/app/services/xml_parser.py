import xml.etree.ElementTree as ET


def parse_nmap_xml(file_path):
    tree = ET.parse(file_path)
    root = tree.getroot()

    results = []

    for host in root.findall("host"):

        address = host.find("address")

        ip = address.attrib.get("addr") if address is not None else "Unknown"

        ports = host.find("ports")

        if ports is None:
            continue

        for port in ports.findall("port"):

            port_id = port.attrib.get("portid")

            service = port.find("service")

            service_name = (
                service.attrib.get("name")
                if service is not None
                else "Unknown"
            )

            state = port.find("state")

            status = (
                state.attrib.get("state")
                if state is not None
                else "Unknown"
            )

            results.append(
                {
                    "ip": ip,
                    "port": port_id,
                    "service": service_name,
                    "status": status,
                    "scanner": "Nmap",
                }
            )

    return results


def parse_zap_xml(file_path):
    tree = ET.parse(file_path)
    root = tree.getroot()

    findings = []

    for site in root.findall("site"):

        site_name = site.attrib.get("name")

        alerts = site.find("alerts")

        if alerts is None:
            continue

        for alert in alerts.findall("alertitem"):

            findings.append(
                {
                    "site": site_name,
                    "risk": alert.findtext("riskdesc"),
                    "title": alert.findtext("alert"),
                    "description": alert.findtext("desc"),
                    "scanner": "OWASP ZAP",
                }
            )

    return findings