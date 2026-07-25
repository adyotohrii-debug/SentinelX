import { Download, ExternalLink, GitBranch, Shield, Terminal, CheckCircle2, AlertCircle, PlayCircle, FileUp, Globe, Laptop } from "lucide-react";
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
            OWASP ZAP & SentinelX Local Setup Guide
          </h1>
          <p style={{ color: "var(--text-muted)", fontSize: "0.98rem", lineHeight: "1.6" }}>
            Step-by-step guide to installing OWASP ZAP, downloading SentinelX, running the project locally, and connecting scanner integrations.
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
            <Download size={18} /> 1. Download OWASP ZAP <ExternalLink size={14} />
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
            <Download size={18} /> 2. Download SentinelX (.zip)
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

        {/* Web Browser vs Local Backend Execution Note */}
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
            <AlertCircle size={22} color="var(--neon-blue)" /> Web Browser Mode vs Local Machine Execution
          </h2>

          <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(280px, 1fr))", gap: "20px" }}>
            <div style={{ background: "rgba(148, 163, 184, 0.05)", border: "1px solid rgba(148, 163, 184, 0.15)", borderRadius: "12px", padding: "18px" }}>
              <div style={{ display: "flex", alignItems: "center", gap: "8px", color: "var(--neon-blue)", fontWeight: "700", marginBottom: "8px" }}>
                <Globe size={18} /> Web Browser / Hosted Mode
              </div>
              <p style={{ color: "var(--text-muted)", fontSize: "0.88rem", margin: 0, lineHeight: "1.5" }}>
                When accessing SentinelX through a web browser on a cloud demo or Vercel, the browser cannot access tools (OWASP ZAP / Nmap) installed on your PC. Online modules (Headers, SSL, DNS, WHOIS, Tech Stack, XML File Import) run automatically in backend scans.
              </p>
            </div>

            <div style={{ background: "rgba(80, 203, 147, 0.05)", border: "1px solid rgba(80, 203, 147, 0.2)", borderRadius: "12px", padding: "18px" }}>
              <div style={{ display: "flex", alignItems: "center", gap: "8px", color: "#50cb93", fontWeight: "700", marginBottom: "8px" }}>
                <Laptop size={18} /> Local Machine Execution Mode
              </div>
              <p style={{ color: "var(--text-muted)", fontSize: "0.88rem", margin: 0, lineHeight: "1.5" }}>
                When you download SentinelX locally and run it on your machine, the backend server detects your local OWASP ZAP instance on <code style={{ color: "#50cb93" }}>http://127.0.0.1:8080</code> automatically!
              </p>
            </div>
          </div>
        </div>

        {/* Ordered Step-by-Step Instructions */}
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
            <PlayCircle size={22} color="var(--neon-purple)" /> Step-by-Step Setup Guide
          </h2>

          <div style={{ display: "grid", gap: "24px" }}>

            {/* Step 1: Install OWASP ZAP First */}
            <div style={{ display: "flex", gap: "16px", alignItems: "flex-start" }}>
              <span style={{ width: "32px", height: "32px", borderRadius: "50%", background: "var(--neon-purple)", color: "#fff", display: "grid", placeItems: "center", fontWeight: "700", flexShrink: 0 }}>
                1
              </span>
              <div>
                <strong style={{ fontSize: "1.02rem", color: "var(--text-main)" }}>Step 1: Install & Launch OWASP ZAP First</strong>
                <p style={{ color: "var(--text-muted)", fontSize: "0.9rem", margin: "4px 0 8px 0", lineHeight: "1.5" }}>
                  Download OWASP ZAP from <a href="https://www.zaproxy.org/download/" target="_blank" rel="noopener noreferrer" style={{ color: "var(--neon-blue)", textDecoration: "underline" }}>zaproxy.org/download</a> and install it on your computer. Launch the OWASP ZAP desktop application so it runs locally (default API port <code style={{ color: "var(--neon-blue)" }}>8080</code>).
                </p>
              </div>
            </div>

            {/* Step 2: Download SentinelX Project */}
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
                  Extract the zip file to your local computer.
                </p>
              </div>
            </div>

            {/* Step 3: Start Python Backend */}
            <div style={{ display: "flex", gap: "16px", alignItems: "flex-start" }}>
              <span style={{ width: "32px", height: "32px", borderRadius: "50%", background: "var(--neon-purple)", color: "#fff", display: "grid", placeItems: "center", fontWeight: "700", flexShrink: 0 }}>
                3
              </span>
              <div>
                <strong style={{ fontSize: "1.02rem", color: "var(--text-main)" }}>Step 3: Run Backend Server (Python FastAPI)</strong>
                <p style={{ color: "var(--text-muted)", fontSize: "0.9rem", margin: "4px 0 8px 0", lineHeight: "1.5" }}>
                  Open PowerShell or Terminal inside the <code style={{ color: "var(--neon-blue)" }}>SentinelX/backend</code> directory:
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

            {/* Step 4: Start React Frontend */}
            <div style={{ display: "flex", gap: "16px", alignItems: "flex-start" }}>
              <span style={{ width: "32px", height: "32px", borderRadius: "50%", background: "var(--neon-purple)", color: "#fff", display: "grid", placeItems: "center", fontWeight: "700", flexShrink: 0 }}>
                4
              </span>
              <div>
                <strong style={{ fontSize: "1.02rem", color: "var(--text-main)" }}>Step 4: Run Frontend UI (React Vite)</strong>
                <p style={{ color: "var(--text-muted)", fontSize: "0.9rem", margin: "4px 0 8px 0", lineHeight: "1.5" }}>
                  Open a second terminal window inside the <code style={{ color: "var(--neon-blue)" }}>SentinelX/frontend</code> directory:
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

            {/* Step 5: Full Local Connection & XML Import */}
            <div style={{ display: "flex", gap: "16px", alignItems: "flex-start" }}>
              <span style={{ width: "32px", height: "32px", borderRadius: "50%", background: "var(--neon-purple)", color: "#fff", display: "grid", placeItems: "center", fontWeight: "700", flexShrink: 0 }}>
                5
              </span>
              <div>
                <strong style={{ fontSize: "1.02rem", color: "var(--text-main)" }}>Step 5: Automatic API Connection & XML Import</strong>
                <p style={{ color: "var(--text-muted)", fontSize: "0.9rem", margin: "4px 0 0 0", lineHeight: "1.5" }}>
                  SentinelX running locally automatically detects your running OWASP ZAP instance on <code style={{ color: "#50cb93" }}>http://127.0.0.1:8080</code> (<strong style={{ color: "#50cb93" }}>✓ OWASP Running</strong>). You can also export scan XML reports from OWASP ZAP (<i>Report → Generate XML Report</i>) and upload them under <i>New Assessment → Import Existing Scan</i>.
                </p>
              </div>
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
