import { Download, ExternalLink, GitBranch, Shield, Terminal, CheckCircle2, AlertCircle, PlayCircle, FileUp, Globe, Laptop, Cpu } from "lucide-react";
import MainLayout from "../layouts/MainLayout";
import ToolStatusCard from "../components/ToolStatusCard";

export default function OwaspSetup() {
  return (
    <MainLayout>
      <div style={{ animation: "fadeIn 0.5s ease", maxWidth: "1000px" }}>
        <div style={{ marginBottom: "25px" }}>
          <span className="eyebrow" style={{ display: "inline-flex", alignItems: "center", gap: "6px" }}>
            <Shield size={14} color="var(--neon-purple)" /> Security Integration Setup
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
            OWASP ZAP Integration & Local Execution Guide
          </h1>
          <p style={{ color: "var(--text-muted)", fontSize: "0.98rem", lineHeight: "1.6" }}>
            Complete guide on how browser execution works, why local installation is required for OWASP ZAP / Nmap API connection, and step-by-step local setup instructions.
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
            href="https://github.com/adyotohrii-debug/SentinelX/archive/refs/heads/main.zip"
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
            <Download size={18} /> Download SentinelX (.zip)
          </a>

          <a
            href="https://www.zaproxy.org/download/"
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
            <Download size={18} /> Download OWASP ZAP <ExternalLink size={14} />
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

        {/* Web Browser vs Local Environment Explanation Card */}
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
            <AlertCircle size={22} color="var(--neon-blue)" /> Understanding Web Browser vs Local Backend Execution
          </h2>

          <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(280px, 1fr))", gap: "20px" }}>
            <div style={{ background: "rgba(148, 163, 184, 0.05)", border: "1px solid rgba(148, 163, 184, 0.15)", borderRadius: "12px", padding: "18px" }}>
              <div style={{ display: "flex", alignItems: "center", gap: "8px", color: "var(--neon-blue)", fontWeight: "700", marginBottom: "8px" }}>
                <Globe size={18} /> Web Browser / Hosted Mode
              </div>
              <p style={{ color: "var(--text-muted)", fontSize: "0.88rem", margin: 0, lineHeight: "1.5" }}>
                When accessing SentinelX via a remote Web Browser URL (cloud server), the browser environment cannot access local software (OWASP ZAP or Nmap) installed on your personal PC due to browser security sandboxing.
              </p>
              <p style={{ color: "var(--text-muted)", fontSize: "0.85rem", margin: "8px 0 0 0", lineHeight: "1.4" }}>
                In this mode, online modules (Security Headers, SSL, DNS, WHOIS, Tech Stack, XML File Import) work out of the box.
              </p>
            </div>

            <div style={{ background: "rgba(80, 203, 147, 0.05)", border: "1px solid rgba(80, 203, 147, 0.2)", borderRadius: "12px", padding: "18px" }}>
              <div style={{ display: "flex", alignItems: "center", gap: "8px", color: "#50cb93", fontWeight: "700", marginBottom: "8px" }}>
                <Laptop size={18} /> Local Machine Execution Mode
              </div>
              <p style={{ color: "var(--text-muted)", fontSize: "0.88rem", margin: 0, lineHeight: "1.5" }}>
                By downloading SentinelX locally and running both backend & frontend on your computer, SentinelX automatically detects your local OWASP ZAP REST API on <code style={{ color: "#50cb93" }}>http://127.0.0.1:8080</code> and Nmap natively.
              </p>
              <p style={{ color: "var(--text-muted)", fontSize: "0.85rem", margin: "8px 0 0 0", lineHeight: "1.4" }}>
                This enables full integration with local scanner instances.
              </p>
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
            <PlayCircle size={22} color="var(--neon-purple)" /> Complete Guide to Download & Run SentinelX Locally
          </h2>

          <div style={{ display: "grid", gap: "24px" }}>
            {/* Step 1 */}
            <div style={{ display: "flex", gap: "16px", alignItems: "flex-start" }}>
              <span style={{ width: "32px", height: "32px", borderRadius: "50%", background: "var(--neon-purple)", color: "#fff", display: "grid", placeItems: "center", fontWeight: "700", flexShrink: 0 }}>
                1
              </span>
              <div>
                <strong style={{ fontSize: "1.02rem", color: "var(--text-main)" }}>Step 1: Download & Extract SentinelX ZIP</strong>
                <p style={{ color: "var(--text-muted)", fontSize: "0.9rem", margin: "4px 0 8px 0", lineHeight: "1.5" }}>
                  Download the project zip file using the button above or clone from GitHub:
                </p>
                <div style={{ background: "rgba(0,0,0,0.4)", padding: "10px 14px", borderRadius: "8px", border: "1px solid var(--border-glass)", fontFamily: "monospace", fontSize: "0.85rem", color: "var(--neon-teal)" }}>
                  git clone https://github.com/adyotohrii-debug/SentinelX.git
                </div>
                <p style={{ color: "var(--text-muted)", fontSize: "0.85rem", margin: "6px 0 0 0" }}>
                  Extract the downloaded zip file into a folder on your PC.
                </p>
              </div>
            </div>

            {/* Step 2 */}
            <div style={{ display: "flex", gap: "16px", alignItems: "flex-start" }}>
              <span style={{ width: "32px", height: "32px", borderRadius: "50%", background: "var(--neon-purple)", color: "#fff", display: "grid", placeItems: "center", fontWeight: "700", flexShrink: 0 }}>
                2
              </span>
              <div>
                <strong style={{ fontSize: "1.02rem", color: "var(--text-main)" }}>Step 2: Start Python Backend Server</strong>
                <p style={{ color: "var(--text-muted)", fontSize: "0.9rem", margin: "4px 0 8px 0", lineHeight: "1.5" }}>
                  Open PowerShell / Terminal, navigate into the <code style={{ color: "var(--neon-blue)" }}>backend</code> folder, and run:
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

            {/* Step 3 */}
            <div style={{ display: "flex", gap: "16px", alignItems: "flex-start" }}>
              <span style={{ width: "32px", height: "32px", borderRadius: "50%", background: "var(--neon-purple)", color: "#fff", display: "grid", placeItems: "center", fontWeight: "700", flexShrink: 0 }}>
                3
              </span>
              <div>
                <strong style={{ fontSize: "1.02rem", color: "var(--text-main)" }}>Step 3: Start React Frontend UI</strong>
                <p style={{ color: "var(--text-muted)", fontSize: "0.9rem", margin: "4px 0 8px 0", lineHeight: "1.5" }}>
                  Open a second terminal window, navigate into the <code style={{ color: "var(--neon-blue)" }}>frontend</code> folder, and run:
                </p>
                <div style={{ background: "rgba(0,0,0,0.4)", padding: "12px 14px", borderRadius: "8px", border: "1px solid var(--border-glass)", fontFamily: "monospace", fontSize: "0.85rem", color: "var(--neon-teal)", lineHeight: "1.6" }}>
                  cd SentinelX/frontend<br />
                  npm install<br />
                  npm run dev
                </div>
                <p style={{ color: "var(--text-muted)", fontSize: "0.85rem", margin: "6px 0 0 0" }}>
                  Open your browser and navigate to <code style={{ color: "var(--neon-blue)" }}>http://localhost:5173</code>.
                </p>
              </div>
            </div>

            {/* Step 4 */}
            <div style={{ display: "flex", gap: "16px", alignItems: "flex-start" }}>
              <span style={{ width: "32px", height: "32px", borderRadius: "50%", background: "var(--neon-purple)", color: "#fff", display: "grid", placeItems: "center", fontWeight: "700", flexShrink: 0 }}>
                4
              </span>
              <div>
                <strong style={{ fontSize: "1.02rem", color: "var(--text-main)" }}>Step 4: Install & Launch OWASP ZAP</strong>
                <p style={{ color: "var(--text-muted)", fontSize: "0.9rem", margin: "4px 0 8px 0", lineHeight: "1.5" }}>
                  Download and install OWASP ZAP desktop app from <a href="https://www.zaproxy.org/download/" target="_blank" rel="noopener noreferrer" style={{ color: "var(--neon-blue)", textDecoration: "underline" }}>zaproxy.org/download</a>. Launch ZAP on your computer (it runs on default API port <code style={{ color: "var(--neon-blue)" }}>8080</code>).
                </p>
                <p style={{ color: "var(--text-muted)", fontSize: "0.85rem", margin: "0" }}>
                  SentinelX running locally will instantly detect ZAP as <strong style={{ color: "#50cb93" }}>✓ OWASP Running</strong>!
                </p>
              </div>
            </div>

            {/* Step 5 */}
            <div style={{ display: "flex", gap: "16px", alignItems: "flex-start" }}>
              <span style={{ width: "32px", height: "32px", borderRadius: "50%", background: "var(--neon-purple)", color: "#fff", display: "grid", placeItems: "center", fontWeight: "700", flexShrink: 0 }}>
                5
              </span>
              <div>
                <strong style={{ fontSize: "1.02rem", color: "var(--text-main)" }}>Step 5: XML Scan Report Import (Fallback)</strong>
                <p style={{ color: "var(--text-muted)", fontSize: "0.9rem", margin: "4px 0 0 0", lineHeight: "1.5" }}>
                  You can also perform scans inside OWASP ZAP GUI, export the XML report (<code style={{ color: "var(--neon-blue)" }}>Report → Generate XML Report</code>), and upload it anytime on SentinelX under <i>New Assessment → Import Existing Scan</i>.
                </p>
              </div>
            </div>
          </div>
        </div>

        {/* Feature Cards */}
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
