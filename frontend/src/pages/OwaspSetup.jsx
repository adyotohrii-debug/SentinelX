import { Download, ExternalLink, GitBranch, Shield, Terminal, CheckCircle2, AlertCircle, PlayCircle, FileUp, Globe, Laptop, Cpu, FileText } from "lucide-react";
import MainLayout from "../layouts/MainLayout";
import ToolStatusCard from "../components/ToolStatusCard";

export default function OwaspSetup() {
  return (
    <MainLayout>
      <div style={{ animation: "fadeIn 0.5s ease", maxWidth: "1000px" }}>
        <div style={{ marginBottom: "25px" }}>
          <span className="eyebrow" style={{ display: "inline-flex", alignItems: "center", gap: "6px" }}>
            <Shield size={14} color="var(--neon-purple)" /> Security Integration & Local Execution Setup
          </span>
          <h1
            style={{
              fontFamily: "var(--font-display)",
              fontSize: "2.3rem",
              fontWeight: "800",
              letterSpacing: "-0.03em",
              background: "var(--grad-cyber)",
              WebkitBackgroundClip: "text",
              WebkitTextFillColor: "transparent",
              margin: "8px 0 10px 0",
            }}
          >
            OWASP ZAP & Local Environment Setup Guide
          </h1>
          <p style={{ color: "var(--text-muted)", fontSize: "0.98rem", lineHeight: "1.6" }}>
            Complete step-by-step guide to installing local security tools (Nmap & OWASP ZAP), downloading SentinelX, running the project locally, and connecting scanner integrations.
          </p>
        </div>

        {/* Live Backend Tool Status */}
        <div style={{ marginBottom: "30px" }}>
          <ToolStatusCard />
        </div>

        {/* Action Buttons */}
        <div
          style={{
            display: "flex",
            flexWrap: "wrap",
            gap: "16px",
            marginBottom: "35px",
          }}
        >
          <a
            href="https://www.zaproxy.org/download/"
            target="_blank"
            rel="noopener noreferrer"
            className="primary-button"
            style={{
              display: "inline-flex",
              alignItems: "center",
              gap: "8px",
              padding: "14px 24px",
              borderRadius: "12px",
              fontWeight: "700",
              fontSize: "0.95rem",
              textDecoration: "none",
            }}
          >
            <Download size={18} /> Download OWASP ZAP <ExternalLink size={14} />
          </a>

          <a
            href="https://github.com/adyotohrii-debug/SentinelX/archive/refs/heads/main.zip"
            target="_blank"
            rel="noopener noreferrer"
            className="secondary-button"
            style={{
              display: "inline-flex",
              alignItems: "center",
              gap: "8px",
              padding: "14px 24px",
              borderRadius: "12px",
              fontWeight: "600",
              fontSize: "0.95rem",
              textDecoration: "none",
              background: "var(--panel-glass)",
              border: "1px solid var(--border-glass)",
              color: "var(--text-main)",
            }}
          >
            <Download size={18} /> Download SentinelX (.zip)
          </a>

          <a
            href="https://github.com/adyotohrii-debug/SentinelX"
            target="_blank"
            rel="noopener noreferrer"
            className="secondary-button"
            style={{
              display: "inline-flex",
              alignItems: "center",
              gap: "8px",
              padding: "14px 24px",
              borderRadius: "12px",
              fontWeight: "600",
              fontSize: "0.95rem",
              textDecoration: "none",
              background: "var(--panel-glass)",
              border: "1px solid var(--border-glass)",
              color: "var(--text-main)",
            }}
          >
            <GitBranch size={18} /> View GitHub Repo <ExternalLink size={14} />
          </a>
        </div>

        {/* Local Tool Requirement Note */}
        <div
          style={{
            background: "var(--panel-glass)",
            border: "1px solid var(--border-glass)",
            backdropFilter: "blur(16px)",
            padding: "26px",
            borderRadius: "16px",
            marginBottom: "35px",
          }}
        >
          <h2
            style={{
              fontFamily: "var(--font-display)",
              fontSize: "1.25rem",
              fontWeight: "700",
              marginBottom: "16px",
              color: "var(--text-highlight)",
              display: "flex",
              alignItems: "center",
              gap: "10px",
            }}
          >
            <Cpu size={22} color="var(--neon-purple)" /> Local Prerequisites (Nmap & OWASP ZAP)
          </h2>
          <p style={{ color: "var(--text-muted)", fontSize: "0.93rem", lineHeight: "1.6", margin: "0 0 16px 0" }}>
            When running SentinelX <strong>locally on your computer</strong>, both <strong>Nmap</strong> (for CLI port scanning) and <strong>OWASP ZAP</strong> (for vulnerability scanning) should be installed on your system for full local tool detection.
          </p>

          <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(280px, 1fr))", gap: "20px" }}>
            <div style={{ background: "rgba(148, 163, 184, 0.05)", border: "1px solid rgba(148, 163, 184, 0.15)", borderRadius: "12px", padding: "18px" }}>
              <strong style={{ color: "var(--neon-blue)", fontSize: "0.98rem", display: "block", marginBottom: "8px" }}>
                1. Nmap (Port Scanner)
              </strong>
              <p style={{ color: "var(--text-muted)", fontSize: "0.85rem", margin: "0 0 8px 0", lineHeight: "1.4" }}>
                Required for CLI port scanning on local backend:
              </p>
              <ul style={{ margin: 0, paddingLeft: "18px", color: "var(--text-main)", fontSize: "0.83rem", lineHeight: "1.5" }}>
                <li><b>Windows:</b> Download installer from <a href="https://nmap.org/download.html" target="_blank" rel="noreferrer" style={{ color: "var(--neon-teal)" }}>nmap.org</a> and check "Add Nmap to PATH".</li>
                <li><b>macOS:</b> <code style={{ color: "var(--neon-purple)" }}>brew install nmap</code></li>
                <li><b>Linux:</b> <code style={{ color: "var(--neon-purple)" }}>sudo apt install nmap</code></li>
              </ul>
            </div>

            <div style={{ background: "rgba(80, 203, 147, 0.05)", border: "1px solid rgba(80, 203, 147, 0.2)", borderRadius: "12px", padding: "18px" }}>
              <strong style={{ color: "#50cb93", fontSize: "0.98rem", display: "block", marginBottom: "8px" }}>
                2. OWASP ZAP (Desktop / Daemon)
              </strong>
              <p style={{ color: "var(--text-muted)", fontSize: "0.85rem", margin: "0 0 8px 0", lineHeight: "1.4" }}>
                Required for REST API connection on port 8080:
              </p>
              <ul style={{ margin: 0, paddingLeft: "18px", color: "var(--text-main)", fontSize: "0.83rem", lineHeight: "1.5" }}>
                <li><b>All OS:</b> Download installer from <a href="https://www.zaproxy.org/download/" target="_blank" rel="noreferrer" style={{ color: "var(--neon-teal)" }}>zaproxy.org</a>.</li>
                <li><b>Launch:</b> Start ZAP on your PC (listens on <code style={{ color: "#50cb93" }}>http://127.0.0.1:8080</code>).</li>
              </ul>
            </div>
          </div>
        </div>

        {/* Step-by-Step Local Setup Instructions */}
        <div
          style={{
            background: "var(--panel-glass)",
            border: "1px solid var(--border-glass)",
            padding: "28px",
            borderRadius: "16px",
            marginBottom: "35px",
          }}
        >
          <h2
            style={{
              fontFamily: "var(--font-display)",
              fontSize: "1.35rem",
              fontWeight: "700",
              marginBottom: "20px",
              color: "var(--text-highlight)",
              display: "flex",
              alignItems: "center",
              gap: "10px",
            }}
          >
            <PlayCircle size={22} color="var(--neon-purple)" /> Complete Step-by-Step Setup Guide
          </h2>

          <div style={{ display: "grid", gap: "24px" }}>

            {/* Step 1 */}
            <div style={{ display: "flex", gap: "16px", alignItems: "flex-start" }}>
              <span style={{ width: "32px", height: "32px", borderRadius: "50%", background: "var(--neon-purple)", color: "#fff", display: "grid", placeItems: "center", fontWeight: "700", flexShrink: 0 }}>
                1
              </span>
              <div>
                <strong style={{ fontSize: "1.02rem", color: "var(--text-main)" }}>Step 1: Install Nmap & OWASP ZAP on your PC</strong>
                <p style={{ color: "var(--text-muted)", fontSize: "0.9rem", margin: "4px 0 8px 0", lineHeight: "1.5" }}>
                  Download and install <b>Nmap</b> and <b>OWASP ZAP</b> on your computer using the links above. Launch OWASP ZAP so it runs locally on default port <code style={{ color: "var(--neon-blue)" }}>8080</code>.
                </p>
              </div>
            </div>

            {/* Step 2 */}
            <div style={{ display: "flex", gap: "16px", alignItems: "flex-start" }}>
              <span style={{ width: "32px", height: "32px", borderRadius: "50%", background: "var(--neon-purple)", color: "#fff", display: "grid", placeItems: "center", fontWeight: "700", flexShrink: 0 }}>
                2
              </span>
              <div>
                <strong style={{ fontSize: "1.02rem", color: "var(--text-main)" }}>Step 2: Download & Extract SentinelX Project</strong>
                <p style={{ color: "var(--text-muted)", fontSize: "0.9rem", margin: "4px 0 8px 0", lineHeight: "1.5" }}>
                  Download the SentinelX ZIP file or clone the project repository from GitHub:
                </p>
                <div style={{ background: "rgba(0,0,0,0.4)", padding: "10px 14px", borderRadius: "8px", border: "1px solid var(--border-glass)", fontFamily: "monospace", fontSize: "0.85rem", color: "var(--neon-teal)" }}>
                  git clone https://github.com/adyotohrii-debug/SentinelX.git
                </div>
                <p style={{ color: "var(--text-muted)", fontSize: "0.85rem", margin: "6px 0 0 0" }}>
                  Extract the zip file into a folder on your computer.
                </p>
              </div>
            </div>

            {/* Step 3 */}
            <div style={{ display: "flex", gap: "16px", alignItems: "flex-start" }}>
              <span style={{ width: "32px", height: "32px", borderRadius: "50%", background: "var(--neon-purple)", color: "#fff", display: "grid", placeItems: "center", fontWeight: "700", flexShrink: 0 }}>
                3
              </span>
              <div>
                <strong style={{ fontSize: "1.02rem", color: "var(--text-main)" }}>Step 3: Run Backend Server (Python FastAPI)</strong>
                <p style={{ color: "var(--text-muted)", fontSize: "0.9rem", margin: "4px 0 8px 0", lineHeight: "1.5" }}>
                  Open Terminal / PowerShell inside <code style={{ color: "var(--neon-blue)" }}>SentinelX/backend</code> and run:
                </p>
                <div style={{ background: "rgba(0,0,0,0.4)", padding: "12px 14px", borderRadius: "8px", border: "1px solid var(--border-glass)", fontFamily: "monospace", fontSize: "0.85rem", color: "var(--neon-teal)", lineHeight: "1.6" }}>
                  cd SentinelX/backend<br />
                  python -m venv venv<br />
                  # Windows:<br />
                  .\venv\Scripts\activate<br />
                  # Linux / macOS:<br />
                  source venv/bin/activate<br /><br />
                  pip install -r requirements.txt<br />
                  uvicorn app.main:app --reload --host 127.0.0.1 --port 8000
                </div>
              </div>
            </div>

            {/* Step 4 */}
            <div style={{ display: "flex", gap: "16px", alignItems: "flex-start" }}>
              <span style={{ width: "32px", height: "32px", borderRadius: "50%", background: "var(--neon-purple)", color: "#fff", display: "grid", placeItems: "center", fontWeight: "700", flexShrink: 0 }}>
                4
              </span>
              <div>
                <strong style={{ fontSize: "1.02rem", color: "var(--text-main)" }}>Step 4: Run Frontend UI (React Vite)</strong>
                <p style={{ color: "var(--text-muted)", fontSize: "0.9rem", margin: "4px 0 8px 0", lineHeight: "1.5" }}>
                  Open a second Terminal window inside <code style={{ color: "var(--neon-blue)" }}>SentinelX/frontend</code> and run:
                </p>
                <div style={{ background: "rgba(0,0,0,0.4)", padding: "12px 14px", borderRadius: "8px", border: "1px solid var(--border-glass)", fontFamily: "monospace", fontSize: "0.85rem", color: "var(--neon-teal)", lineHeight: "1.6" }}>
                  cd SentinelX/frontend<br />
                  npm install<br />
                  npm run dev
                </div>
                <p style={{ color: "var(--text-muted)", fontSize: "0.85rem", margin: "6px 0 0 0" }}>
                  Navigate to <code style={{ color: "var(--neon-blue)" }}>http://localhost:5173</code> in your browser.
                </p>
              </div>
            </div>

            {/* Step 5 */}
            <div style={{ display: "flex", gap: "16px", alignItems: "flex-start" }}>
              <span style={{ width: "32px", height: "32px", borderRadius: "50%", background: "var(--neon-purple)", color: "#fff", display: "grid", placeItems: "center", fontWeight: "700", flexShrink: 0 }}>
                5
              </span>
              <div>
                <strong style={{ fontSize: "1.02rem", color: "var(--text-main)" }}>Step 5: Automatic API Connection & XML Import</strong>
                <p style={{ color: "var(--text-muted)", fontSize: "0.9rem", margin: "4px 0 0 0", lineHeight: "1.5" }}>
                  SentinelX running locally automatically detects your running Nmap and OWASP ZAP instances (<strong style={{ color: "#50cb93" }}>✓ Nmap Installed</strong> & <strong style={{ color: "#50cb93" }}>✓ OWASP Running</strong>). You can also export scan XML reports from OWASP ZAP (<i>Report → Generate XML Report</i>) and upload them under <i>New Assessment → Import Existing Scan</i>.
                </p>
              </div>
            </div>
          </div>
        </div>

        {/* PDF Report Comparison Card */}
        <div
          style={{
            background: "var(--panel-glass)",
            border: "1px solid var(--border-glass)",
            padding: "24px",
            borderRadius: "16px",
            marginBottom: "35px",
          }}
        >
          <h2
            style={{
              fontFamily: "var(--font-display)",
              fontSize: "1.25rem",
              fontWeight: "700",
              marginBottom: "16px",
              color: "var(--text-highlight)",
              display: "flex",
              alignItems: "center",
              gap: "10px",
            }}
          >
            <FileText size={22} color="var(--neon-blue)" /> PDF Report Generation: Web Browser vs Local PC Mode
          </h2>

          <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(280px, 1fr))", gap: "20px" }}>
            <div style={{ background: "rgba(15, 23, 42, 0.6)", padding: "18px", borderRadius: "12px", border: "1px solid var(--border-glass)" }}>
              <strong style={{ color: "var(--neon-blue)", fontSize: "0.95rem", display: "block", marginBottom: "8px" }}>
                🌐 Web Browser / Hosted Mode PDF Report
              </strong>
              <p style={{ color: "var(--text-muted)", fontSize: "0.88rem", margin: 0, lineHeight: "1.5" }}>
                Generates a complete security report including Executive Summary, Security Score, HTTP Headers, SSL Analysis, Nmap Ports, DNS, WHOIS, Tech Stack, and uploaded XML findings. Tool status reflects hosted environment health (<code style={{ color: "var(--neon-blue)" }}>OWASP: Offline</code>).
              </p>
            </div>

            <div style={{ background: "rgba(15, 23, 42, 0.6)", padding: "18px", borderRadius: "12px", border: "1px solid var(--border-glass)" }}>
              <strong style={{ color: "#50cb93", fontSize: "0.95rem", display: "block", marginBottom: "8px" }}>
                💻 Local PC Mode PDF Report (ZAP / Nmap Active)
              </strong>
              <p style={{ color: "var(--text-muted)", fontSize: "0.88rem", margin: 0, lineHeight: "1.5" }}>
                Generates a PDF displaying live local backend tool status matrix (<code style={{ color: "#50cb93" }}>✓ Nmap Installed</code> & <code style={{ color: "#50cb93" }}>✓ OWASP Running</code>), automatically factoring local OWASP ZAP API findings and recommendations into the Executive Summary.
              </p>
            </div>
          </div>
        </div>

        {/* Feature Overview */}
        <div
          style={{
            display: "grid",
            gridTemplateColumns: "repeat(auto-fit, minmax(280px, 1fr))",
            gap: "20px",
          }}
        >
          <div
            style={{
              background: "var(--panel-glass)",
              border: "1px solid var(--border-glass)",
              padding: "20px",
              borderRadius: "14px",
            }}
          >
            <div style={{ display: "flex", alignItems: "center", gap: "10px", marginBottom: "12px" }}>
              <FileUp size={18} color="#50cb93" />
              <strong style={{ fontSize: "0.98rem" }}>XML Report Import</strong>
            </div>
            <p style={{ color: "var(--text-muted)", fontSize: "0.88rem", margin: 0, lineHeight: "1.5" }}>
              OWASP ZAP XML reports can be uploaded anytime to store vulnerabilities, severity levels, and descriptions in the SentinelX database.
            </p>
          </div>

          <div
            style={{
              background: "var(--panel-glass)",
              border: "1px solid var(--border-glass)",
              padding: "20px",
              borderRadius: "14px",
            }}
          >
            <div style={{ display: "flex", alignItems: "center", gap: "10px", marginBottom: "12px" }}>
              <Terminal size={18} color="var(--neon-purple)" />
              <strong style={{ fontSize: "0.98rem" }}>Local API Bridge</strong>
            </div>
            <p style={{ color: "var(--text-muted)", fontSize: "0.88rem", margin: 0, lineHeight: "1.5" }}>
              SentinelX performs health checks against the local ZAP REST API to display real-time connection status across the UI.
            </p>
          </div>
        </div>
      </div>
    </MainLayout>
  );
}
