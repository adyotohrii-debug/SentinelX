import { useEffect, useState } from "react";
import { CheckCircle2, XCircle, Shield, Cpu, RefreshCw, AlertTriangle } from "lucide-react";
import api from "../services/api";

export default function ToolStatusCard({ compact = false }) {
  const [status, setStatus] = useState(null);
  const [loading, setLoading] = useState(true);
  const [refreshing, setRefreshing] = useState(false);

  async function fetchStatus(isRefresh = false) {
    if (isRefresh) setRefreshing(true);
    else setLoading(true);

    try {
      const response = await api.get("/security/tools-status");
      setStatus(response.data);
    } catch (err) {
      console.error("Failed to fetch tool status", err);
      setStatus({
        nmap_installed: false,
        zap_installed: false,
        zap_running: false,
        zap_available: false,
        message: "OWASP ZAP is not installed or not running. Advanced vulnerability scanning is unavailable. All other SentinelX security assessment features remain fully functional."
      });
    } finally {
      setLoading(false);
      setRefreshing(false);
    }
  }

  useEffect(() => {
    fetchStatus();
  }, []);

  if (loading) {
    return (
      <div className="dashboard-panel" style={{ padding: compact ? "16px" : "24px" }}>
        <div style={{ display: "flex", alignItems: "center", gap: "10px", color: "var(--text-muted)" }}>
          <RefreshCw size={16} className="spin" />
          <span>Detecting backend tool status...</span>
        </div>
      </div>
    );
  }

  const items = [
    { label: "Nmap Installed", active: status?.nmap_installed },
    { label: "OWASP ZAP Installed", active: status?.zap_installed },
    { label: "OWASP Running", active: status?.zap_running },
  ];

  return (
    <div
      className="dashboard-panel tool-status-card"
      style={{
        background: "var(--panel-glass)",
        border: "1px solid var(--border-glass)",
        borderRadius: "16px",
        padding: compact ? "18px" : "24px",
        position: "relative",
      }}
    >
      <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: "16px" }}>
        <div style={{ display: "flex", alignItems: "center", gap: "10px" }}>
          <Cpu size={20} color="var(--neon-blue)" />
          <h3 style={{ margin: 0, fontSize: "1.05rem", fontWeight: "700", fontFamily: "var(--font-display)" }}>
            Backend Security Tool Status
          </h3>
        </div>
        <button
          onClick={() => fetchStatus(true)}
          disabled={refreshing}
          style={{
            background: "transparent",
            border: "1px solid var(--border-glass)",
            color: "var(--text-muted)",
            borderRadius: "8px",
            padding: "4px 8px",
            cursor: "pointer",
            display: "inline-flex",
            alignItems: "center",
            gap: "6px",
            fontSize: "0.8rem",
          }}
          title="Refresh tool status"
        >
          <RefreshCw size={14} className={refreshing ? "spin" : ""} /> Refresh
        </button>
      </div>

      <div
        style={{
          display: "grid",
          gridTemplateColumns: "repeat(auto-fit, minmax(180px, 1fr))",
          gap: "12px",
          marginBottom: status?.zap_running ? "0px" : "16px",
        }}
      >
        {items.map((item) => (
          <div
            key={item.label}
            style={{
              display: "flex",
              alignItems: "center",
              gap: "8px",
              padding: "10px 14px",
              background: item.active ? "rgba(80, 203, 147, 0.08)" : "rgba(238, 92, 105, 0.08)",
              border: `1px solid ${item.active ? "rgba(80, 203, 147, 0.25)" : "rgba(238, 92, 105, 0.25)"}`,
              borderRadius: "10px",
            }}
          >
            {item.active ? (
              <CheckCircle2 size={18} color="#50cb93" />
            ) : (
              <XCircle size={18} color="#ee5c69" />
            )}
            <span
              style={{
                fontSize: "0.88rem",
                fontWeight: "600",
                color: item.active ? "#50cb93" : "var(--text-muted)",
              }}
            >
              {item.active ? `✓ ${item.label}` : `✕ ${item.label}`}
            </span>
          </div>
        ))}
      </div>

      {!status?.zap_running && (
        <div
          style={{
            marginTop: "14px",
            padding: "12px 16px",
            background: "rgba(245, 158, 11, 0.08)",
            border: "1px solid rgba(245, 158, 11, 0.25)",
            borderRadius: "10px",
            fontSize: "0.85rem",
            color: "#fbbf24",
            display: "flex",
            alignItems: "flex-start",
            gap: "10px",
            lineHeight: "1.4",
          }}
        >
          <AlertTriangle size={18} style={{ flexShrink: 0, marginTop: "2px" }} />
          <div>
            <strong>OWASP ZAP is not installed or not running.</strong> Advanced vulnerability scanning is unavailable. All other SentinelX security assessment features remain fully functional.
          </div>
        </div>
      )}
    </div>
  );
}
