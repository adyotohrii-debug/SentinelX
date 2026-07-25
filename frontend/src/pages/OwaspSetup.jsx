import { Download, ExternalLink, GitBranch, Shield, Terminal, CheckCircle2, AlertCircle, PlayCircle, FileUp } from "lucide-react";
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
            OWASP ZAP Integration & Setup
          </h1>
          <p style={{ color: "var(--text-muted)", fontSize: "0.98rem", lineHeight: "1.6" }}>
            SentinelX integrates with OWASP ZAP (Zed Attack Proxy) to support advanced web application vulnerability analysis and XML report imports.
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
            <Download size={18} /> Install OWASP ZAP <ExternalLink size={14} />
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
            <GitBranch size={18} /> View Project on GitHub <ExternalLink size={14} />
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
        </div>

        {/* Mandatory Note */}
        <div
          style={{
            background: "var(--panel-glass)",
            border: "1px solid var(--border-glass)",
            backdropFilter: "blur(16px)",
            padding: "24px",
            borderRadius: "16px",
            marginBottom: "35px",
          }}
        >
          <div style={{ display: "flex", alignItems: "flex-start", gap: "14px" }}>
            <AlertCircle size={22} color="var(--neon-blue)" style={{ flexShrink: 0, marginTop: "2px" }} />
            <div>
              <h3 style={{ margin: "0 0 8px 0", fontSize: "1.05rem", fontWeight: "700" }}>
                Important OWASP ZAP Operating Note
              </h3>
              <p style={{ margin: 0, color: "var(--text-muted)", fontSize: "0.92rem", lineHeight: "1.6" }}>
                Users who download SentinelX locally can install OWASP ZAP and use advanced web vulnerability scanning. If OWASP ZAP is unavailable, SentinelX will continue working normally using all other available security assessment modules.
              </p>
            </div>
          </div>
        </div>

        {/* Clear Instructions Section */}
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
            <PlayCircle size={22} color="var(--neon-purple)" /> Step-by-Step OWASP ZAP Setup Guide
          </h2>

          <div style={{ display: "grid", gap: "20px" }}>
            <div style={{ display: "flex", gap: "16px", alignItems: "flex-start" }}>
              <span style={{ width: "32px", height: "32px", borderRadius: "50%", background: "var(--neon-purple)", color: "#fff", display: "grid", placeItems: "center", fontWeight: "700", flexShrink: 0 }}>
                1
              </span>
              <div>
                <strong style={{ fontSize: "1.02rem", color: "var(--text-main)" }}>Download & Install OWASP ZAP</strong>
                <p style={{ color: "var(--text-muted)", fontSize: "0.9rem", margin: "4px 0 0 0", lineHeight: "1.5" }}>
                  Visit <a href="https://www.zaproxy.org/download/" target="_blank" rel="noopener noreferrer" style={{ color: "var(--neon-blue)", textDecoration: "underline" }}>zaproxy.org/download</a> and install the latest version of OWASP ZAP for Windows, Linux, or macOS.
                </p>
              </div>
            </div>

            <div style={{ display: "flex", gap: "16px", alignItems: "flex-start" }}>
              <span style={{ width: "32px", height: "32px", borderRadius: "50%", background: "var(--neon-purple)", color: "#fff", display: "grid", placeItems: "center", fontWeight: "700", flexShrink: 0 }}>
                2
              </span>
              <div>
                <strong style={{ fontSize: "1.02rem", color: "var(--text-main)" }}>Launch OWASP ZAP Local Daemon</strong>
                <p style={{ color: "var(--text-muted)", fontSize: "0.9rem", margin: "4px 0 0 0", lineHeight: "1.5" }}>
                  Start OWASP ZAP on the machine running SentinelX backend. By default, ZAP listens on port <code style={{ background: "rgba(255,255,255,0.08)", padding: "2px 6px", borderRadius: "4px" }}>8080</code>.
                </p>
              </div>
            </div>

            <div style={{ display: "flex", gap: "16px", alignItems: "flex-start" }}>
              <span style={{ width: "32px", height: "32px", borderRadius: "50%", background: "var(--neon-purple)", color: "#fff", display: "grid", placeItems: "center", fontWeight: "700", flexShrink: 0 }}>
                3
              </span>
              <div>
                <strong style={{ fontSize: "1.02rem", color: "var(--text-main)" }}>Automatic API Detection</strong>
                <p style={{ color: "var(--text-muted)", fontSize: "0.9rem", margin: "4px 0 0 0", lineHeight: "1.5" }}>
                  SentinelX automatically probes <code style={{ background: "rgba(255,255,255,0.08)", padding: "2px 6px", borderRadius: "4px" }}>http://127.0.0.1:8080</code> and updates the backend Tool Status matrix in real-time.
                </p>
              </div>
            </div>

            <div style={{ display: "flex", gap: "16px", alignItems: "flex-start" }}>
              <span style={{ width: "32px", height: "32px", borderRadius: "50%", background: "var(--neon-purple)", color: "#fff", display: "grid", placeItems: "center", fontWeight: "700", flexShrink: 0 }}>
                4
              </span>
              <div>
                <strong style={{ fontSize: "1.02rem", color: "var(--text-main)" }}>Import OWASP XML Scan Reports</strong>
                <p style={{ color: "var(--text-muted)", fontSize: "0.9rem", margin: "4px 0 0 0", lineHeight: "1.5" }}>
                  Generate an XML scan report from OWASP ZAP (Report → Generate XML Report) and upload it under New Assessment → File Upload. SentinelX parses and displays all vulnerability findings on the dashboard and reports.
                </p>
              </div>
            </div>
          </div>
        </div>

        {/* Feature Highlights */}
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
              SentinelX performs non-offensive health checks against the local ZAP REST API to display real-time connection status across the UI.
            </p>
          </div>
        </div>
      </div>
    </MainLayout>
  );
}
