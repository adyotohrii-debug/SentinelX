import { useEffect, useState } from "react";
import { FileText, ClipboardList, ShieldAlert, AlertTriangle, CheckCircle2, TrendingUp } from "lucide-react";
import MainLayout from "../layouts/MainLayout";
import api from "../services/api";

export default function Reports() {
  const [report, setReport] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    loadReport();
  }, []);

  async function loadReport() {
    try {
      const response = await api.get("/reports/");
      setReport(response.data);
    } catch (err) {
      console.log(err);
    } finally {
      setLoading(false);
    }
  }

  function downloadPDF() {
    const API = import.meta.env.VITE_API_URL || "http://127.0.0.1:8000";
    const userId = localStorage.getItem("sentinelx_user_id") || "";
    window.open(`${API}/reports/pdf?user_id=${userId}`, "_blank");
  }

  if (loading) {
    return (
      <MainLayout>
        <div style={{ display: "grid", placeItems: "center", minHeight: "60vh" }}>
          <div className="loading-spinner"></div>
          <h2 style={{ marginTop: "20px", color: "var(--text-muted)", fontFamily: "var(--font-display)" }}>Loading Live Report...</h2>
        </div>
      </MainLayout>
    );
  }

  return (
    <MainLayout>
      <div style={{ animation: "fadeIn 0.5s ease" }}>
        <h1
          style={{
            fontFamily: "var(--font-display)",
            fontSize: "2.5rem",
            fontWeight: "800",
            letterSpacing: "-0.03em",
            background: "var(--grad-cyber)",
            WebkitBackgroundClip: "text",
            WebkitTextFillColor: "transparent",
            marginBottom: "8px",
          }}
        >
          📄 Live Platform Analytics
        </h1>

        <p
          style={{
            color: "var(--text-muted)",
            fontSize: "0.95rem",
            marginBottom: "30px",
          }}
        >
          Aggregated assessment data, threat metrics, and findings from your SentinelX instance.
        </p>

        <button
          onClick={downloadPDF}
          style={{
            display: "inline-flex",
            alignItems: "center",
            gap: "10px",
            background: "linear-gradient(135deg, var(--neon-purple), var(--neon-blue))",
            color: "white",
            border: "none",
            padding: "14px 28px",
            borderRadius: "12px",
            cursor: "pointer",
            marginBottom: "35px",
            fontWeight: "700",
            fontSize: "0.95rem",
            boxShadow: "0 6px 20px rgba(157, 78, 221, 0.3)",
            transition: "all 0.25s ease",
          }}
          onMouseEnter={(e) => {
            e.currentTarget.style.transform = "translateY(-2px)";
            e.currentTarget.style.boxShadow = "0 8px 24px rgba(157, 78, 221, 0.45)";
          }}
          onMouseLeave={(e) => {
            e.currentTarget.style.transform = "translateY(0)";
            e.currentTarget.style.boxShadow = "0 6px 20px rgba(157, 78, 221, 0.3)";
          }}
        >
          <FileText size={18} /> Export Aggregated PDF Report
        </button>

        <div
          style={{
            display: "grid",
            gridTemplateColumns: "repeat(auto-fit, minmax(220px, 1fr))",
            gap: "20px",
            marginBottom: "40px",
          }}
        >
          <Card
            title="Total Assessments"
            value={report.total_assessments}
            icon={<ClipboardList size={22} color="var(--neon-blue)" />}
            glow="var(--neon-blue)"
          />

          <Card
            title="Total Findings"
            value={report.total_findings}
            icon={<TrendingUp size={22} color="var(--neon-purple)" />}
            glow="var(--neon-purple)"
          />
          <Card
            title="Critical Risk"
            value={report.critical}
            icon={<ShieldAlert size={22} color="var(--neon-pink)" />}
            glow="var(--neon-pink)"
          />
          <Card
            title="High Severity"
            value={report.high}
            icon={<AlertTriangle size={22} color="#f97316" />}
            glow="#f97316"
          />
          <Card
            title="Medium Severity"
            value={report.medium}
            icon={<AlertTriangle size={22} color="#eab308" />}
            glow="#eab308"
          />
          <Card
            title="Low Severity"
            value={report.low}
            icon={<CheckCircle2 size={22} color="var(--neon-teal)" />}
            glow="var(--neon-teal)"
          />
        </div>

        <div
          style={{
            background: "var(--panel-glass)",
            border: "1px solid var(--border-glass)",
            backdropFilter: "blur(16px)",
            padding: "30px",
            borderRadius: "16px",
            boxShadow: "0 10px 30px rgba(0, 0, 0, 0.3)",
          }}
        >
          <h2 style={{ fontFamily: "var(--font-display)", fontSize: "1.40rem", fontWeight: "700", marginBottom: "20px", color: "var(--text-highlight)" }}>
            Severity Summary Breakdown
          </h2>

          <table
            style={{
              width: "100%",
              borderCollapse: "collapse",
              textAlign: "left",
            }}
          >
            <thead>
              <tr style={{ color: "var(--text-muted)", fontSize: "0.75rem", textTransform: "uppercase", letterSpacing: "0.08em" }}>
                <th style={{ padding: "12px 16px", borderBottom: "1px solid var(--line)" }}>Metric Indicator</th>
                <th style={{ padding: "12px 16px", borderBottom: "1px solid var(--line)" }}>Count Value</th>
              </tr>
            </thead>
            <tbody style={{ color: "var(--text-main)", fontSize: "0.9rem" }}>
              <tr style={{ borderBottom: "1px solid var(--line)" }}>
                <td style={{ padding: "14px 16px", fontWeight: "600" }}>Total Assessments Conducted</td>
                <td style={{ padding: "14px 16px", color: "var(--text-highlight)", fontFamily: "var(--font-display)", fontWeight: "700" }}>{report.total_assessments}</td>
              </tr>

              <tr style={{ borderBottom: "1px solid var(--line)" }}>
                <td style={{ padding: "14px 16px", fontWeight: "600" }}>Total Vulnerability Findings</td>
                <td style={{ padding: "14px 16px", color: "var(--text-highlight)", fontFamily: "var(--font-display)", fontWeight: "700" }}>{report.total_findings}</td>
              </tr>
              <tr style={{ borderBottom: "1px solid var(--line)" }}>
                <td style={{ padding: "14px 16px", color: "var(--neon-pink)", fontWeight: "600" }}>Critical Findings</td>
                <td style={{ padding: "14px 16px", color: "var(--neon-pink)", fontFamily: "var(--font-display)", fontWeight: "700" }}>{report.critical}</td>
              </tr>
              <tr style={{ borderBottom: "1px solid var(--line)" }}>
                <td style={{ padding: "14px 16px", color: "#f97316", fontWeight: "600" }}>High Findings</td>
                <td style={{ padding: "14px 16px", color: "#f97316", fontFamily: "var(--font-display)", fontWeight: "700" }}>{report.high}</td>
              </tr>
              <tr style={{ borderBottom: "1px solid var(--line)" }}>
                <td style={{ padding: "14px 16px", color: "#eab308", fontWeight: "600" }}>Medium Findings</td>
                <td style={{ padding: "14px 16px", color: "#eab308", fontFamily: "var(--font-display)", fontWeight: "700" }}>{report.medium}</td>
              </tr>
              <tr style={{ borderBottom: "1px solid var(--line)" }}>
                <td style={{ padding: "14px 16px", color: "var(--neon-teal)", fontWeight: "600" }}>Low Findings</td>
                <td style={{ padding: "14px 16px", color: "var(--neon-teal)", fontFamily: "var(--font-display)", fontWeight: "700" }}>{report.low}</td>
              </tr>
              <tr>
                <td style={{ padding: "14px 16px", color: "var(--neon-purple)", fontWeight: "600" }}>OWASP ZAP Findings</td>
                <td style={{ padding: "14px 16px", color: "var(--neon-purple)", fontFamily: "var(--font-display)", fontWeight: "700" }}>{report.owasp_findings || 0}</td>
              </tr>
            </tbody>
          </table>
        </div>

      </div>
    </MainLayout>
  );
}

function Card({ title, value, icon, glow }) {
  const [hovered, setHovered] = useState(false);
  return (
    <div
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
      style={{
        background: "var(--panel-glass)",
        border: `1px solid ${hovered ? "var(--border-glass-glow)" : "var(--border-glass)"}`,
        padding: "24px",
        borderRadius: "16px",
        boxShadow: hovered ? `0 8px 24px rgba(157, 78, 221, 0.15)` : "0 10px 30px rgba(0, 0, 0, 0.3)",
        position: "relative",
        overflow: "hidden",
        transition: "all 0.3s ease",
        transform: hovered ? "translateY(-4px)" : "none",
      }}
    >
      <div
        style={{
          position: "absolute",
          width: "80px",
          height: "80px",
          right: "-30px",
          top: "-30px",
          borderRadius: "50%",
          background: glow,
          filter: "blur(18px)",
          opacity: "0.25",
          pointerEvents: "none",
        }}
      />
      <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: "16px" }}>
        <h3
          style={{
            color: "var(--text-muted)",
            fontSize: "0.85rem",
            fontWeight: "600",
            textTransform: "uppercase",
            letterSpacing: "0.05em",
          }}
        >
          {title}
        </h3>
        {icon}
      </div>

      <h1
        style={{
          fontFamily: "var(--font-display)",
          fontSize: "2.3rem",
          fontWeight: "800",
          color: "var(--text-highlight)",
        }}
      >
        {value}
      </h1>
    </div>
  );
}