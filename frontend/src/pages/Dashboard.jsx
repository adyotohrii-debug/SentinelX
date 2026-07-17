import { useEffect, useMemo, useState } from "react";
import { Link } from "react-router-dom";
import {
  Activity,
  ArrowRight,
  BarChart3,
  CheckCircle2,
  ClipboardList,
  FileText,
  Gauge,
  RefreshCw,
  ScanSearch,
  ShieldAlert,
  ShieldCheck,
  TriangleAlert,
} from "lucide-react";
import { Bar, BarChart, Cell, Pie, PieChart, ResponsiveContainer, Tooltip, XAxis, YAxis } from "recharts";
import MainLayout from "../layouts/MainLayout";
import api from "../services/api";
import "../styles/dashboard.css";

const formatScanDate = (dateStr) => {
  if (!dateStr) return "—";
  const hasTimezone = dateStr.endsWith("Z") || dateStr.match(/[+-]\d{2}:?\d{2}$/);
  const date = new Date(hasTimezone ? dateStr : `${dateStr}Z`);
  return date.toLocaleDateString() + " " + date.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });
};

const initialStats = {
  total_assessments: 0,
  total_findings: 0,
  critical: 0,
  high: 0,
  medium: 0,
  low: 0,
};

const toolkit = [
  "SSL scanner", "Security headers", "DNS intelligence", "WHOIS lookup",
  "Technology detection", "Port scanner", "Risk engine",
];

export default function Dashboard() {
  const [stats, setStats] = useState(initialStats);
  const [loading, setLoading] = useState(true);
  const [refreshing, setRefreshing] = useState(false);
  const [error, setError] = useState(false);
  const [assessments, setAssessments] = useState([]);

  async function loadDashboard(isRefresh = false) {
    if (isRefresh) setRefreshing(true);
    else setLoading(true);
    setError(false);
    try {
      const [statsResponse, historyResponse] = await Promise.all([
        api.get("/dashboard/stats"), api.get("/assessments/"),
      ]);
      setStats({ ...initialStats, ...statsResponse.data });
      setAssessments(historyResponse.data);
    } catch (err) {
      console.error("Unable to load dashboard statistics", err);
      setError(true);
    } finally {
      setLoading(false);
      setRefreshing(false);
    }
  }

  useEffect(() => { loadDashboard(); }, []);

  const securityScore = useMemo(() => {
    if (!stats.total_findings) return 100;
    const weightedRisk = stats.critical * 12 + stats.high * 7 + stats.medium * 3 + stats.low;
    return Math.max(0, Math.round(100 - weightedRisk / Math.max(stats.total_assessments, 1)));
  }, [stats]);

  const riskLabel = stats.critical ? "Critical" : stats.high ? "High" : stats.medium ? "Moderate" : "Low";
  const metricCards = [
    { label: "Total assessments", value: stats.total_assessments, note: "All time coverage", icon: ClipboardList, tone: "blue" },
    { label: "Open findings", value: stats.total_findings, note: "Across scanned targets", icon: ShieldAlert, tone: "violet" },
    { label: "Critical exposure", value: stats.critical, note: stats.critical ? "Requires immediate action" : "No critical findings", icon: TriangleAlert, tone: "red" },
    { label: "High severity", value: stats.high, note: stats.high ? "Prioritize remediation" : "No high findings", icon: Gauge, tone: "orange" },
  ];
  const severityRows = [
    { label: "Critical", value: stats.critical, tone: "critical" },
    { label: "High", value: stats.high, tone: "high" },
    { label: "Medium", value: stats.medium, tone: "medium" },
    { label: "Low", value: stats.low, tone: "low" },
  ];
  const maxSeverity = Math.max(...severityRows.map((row) => row.value), 1);
  const chartData = severityRows.map((row) => ({ name: row.label, value: row.value, color: ({ critical: "#ee5c69", high: "#ff994f", medium: "#e5bb4c", low: "#50cb93" })[row.tone] }));

  return (
    <MainLayout>
      <main className="dashboard-container">
        <section className="dashboard-hero">
          <div>
            <div className="eyebrow"><span className="status-dot" /> Security operations center</div>
            <h1>Security overview</h1>
            <p>Monitor your attack surface, prioritize exposure, and keep your organization protected.</p>
          </div>
          <div className="dashboard-hero-actions">
            <button className="secondary-button" onClick={() => loadDashboard(true)} disabled={refreshing}>
              <RefreshCw size={17} className={refreshing ? "spin" : ""} /> Refresh data
            </button>
            <Link className="primary-button" to="/assessment"><ScanSearch size={18} /> New assessment</Link>
          </div>
        </section>

        {error && <div className="dashboard-notice"><TriangleAlert size={18} /> Live data is temporarily unavailable. Showing the latest available values.</div>}

        {loading ? <DashboardSkeleton /> : <>
          <section className="metrics-grid" aria-label="Security metrics">
            {metricCards.map(({ label, value, note, icon: Icon, tone }) => (
              <article className={`metric-card ${tone}`} key={label}>
                <div className="metric-icon"><Icon size={20} /></div>
                <span>{label}</span><strong>{value}</strong><small>{note}</small>
              </article>
            ))}
          </section>

          <section className="dashboard-main-grid">
            <article className="dashboard-panel posture-panel">
              <div className="panel-heading"><div><span className="eyebrow">Platform posture</span><h2>Security health</h2></div><ShieldCheck size={22} /></div>
              <div className="posture-content">
                <div className="score-ring" style={{ "--score": `${securityScore * 3.6}deg` }}><div><strong>{securityScore}</strong><span>/ 100</span></div></div>
                <div className="posture-copy"><span className={`risk-badge ${riskLabel.toLowerCase()}`}>{riskLabel} risk</span><h3>{securityScore >= 85 ? "Your posture is strong" : "Your posture needs attention"}</h3><p>Security score reflects the number and severity of identified findings.</p><Link to="/reports">View detailed reports <ArrowRight size={15} /></Link></div>
              </div>
            </article>

            <article className="dashboard-panel quick-actions-panel">
              <div className="panel-heading"><div><span className="eyebrow">Workspace</span><h2>Quick actions</h2></div><Activity size={21} /></div>
              <Link to="/assessment" className="quick-action"><span className="quick-action-icon"><ScanSearch size={18} /></span><span><strong>Run a scan</strong><small>Assess a new target</small></span><ArrowRight size={17} /></Link>
              <Link to="/reports" className="quick-action"><span className="quick-action-icon"><FileText size={18} /></span><span><strong>Review reports</strong><small>Explore security insights</small></span><ArrowRight size={17} /></Link>
              <Link to="/history" className="quick-action"><span className="quick-action-icon"><BarChart3 size={18} /></span><span><strong>Assessment history</strong><small>Track past results</small></span><ArrowRight size={17} /></Link>
            </article>
          </section>

          <section className="dashboard-bottom-grid">
            <article className="dashboard-panel findings-panel">
              <div className="panel-heading"><div><span className="eyebrow">Exposure analytics</span><h2>Findings by severity</h2></div><span className="total-findings">{stats.total_findings} total</span></div>
              <div className="severity-list">
                {severityRows.map((row) => <div className="severity-row" key={row.label}><span className={`severity-dot ${row.tone}`} /><span className="severity-label">{row.label}</span><div className="severity-track"><i className={row.tone} style={{ width: `${(row.value / maxSeverity) * 100}%` }} /></div><strong>{row.value}</strong></div>)}
              </div>
              <div className="findings-footnote"><span><CheckCircle2 size={16} /> Scan coverage active</span><span>{stats.total_assessments} assessments completed</span></div>
            </article>

            <article className="dashboard-panel activity-panel">
              <div className="panel-heading"><div><span className="eyebrow">Live operations</span><h2>System activity</h2></div><span className="live-label"><i /> Live</span></div>
              <ul className="activity-list">
                <ActivityItem title="Security engine" description="All detection services are operational" />
                <ActivityItem title="Risk analysis" description={stats.total_findings ? `${stats.total_findings} findings are being tracked` : "Ready for the next assessment"} />
                <ActivityItem title="Report generation" description="Export services are ready" />
              </ul>
            </article>

            <article className="dashboard-panel toolkit-panel">
              <div className="panel-heading"><div><span className="eyebrow">Capabilities</span><h2>Security toolkit</h2></div><span className="toolkit-count">{toolkit.length} modules</span></div>
              <div className="toolkit-list">{toolkit.map((tool) => <span key={tool}><CheckCircle2 size={15} /> {tool}</span>)}</div>
              <Link className="toolkit-link" to="/assessment">Explore assessment tools <ArrowRight size={15} /></Link>
            </article>
          </section>

          <section className="dashboard-insights-grid">
            <article className="dashboard-panel chart-panel">
              <div className="panel-heading"><div><span className="eyebrow">Risk distribution</span><h2>Exposure profile</h2></div><span className="total-findings">Live finding data</span></div>
              <div className="chart-wrap"><ResponsiveContainer width="100%" height={210}><BarChart data={chartData} margin={{ top: 4, right: 0, left: -25, bottom: 0 }}><XAxis dataKey="name" tick={{ fill: "#90a1bd", fontSize: 11 }} axisLine={false} tickLine={false} /><YAxis allowDecimals={false} tick={{ fill: "#71829e", fontSize: 11 }} axisLine={false} tickLine={false} /><Tooltip cursor={{ fill: "rgba(121,174,255,.07)" }} contentStyle={{ background: "#111f38", border: "1px solid rgba(148,163,184,.18)", borderRadius: 10 }} /><Bar dataKey="value" radius={[5, 5, 0, 0]}>{chartData.map((entry) => <Cell key={entry.name} fill={entry.color} />)}</Bar></BarChart></ResponsiveContainer></div>
            </article>
            <article className="dashboard-panel chart-panel severity-pie-panel">
              <div className="panel-heading"><div><span className="eyebrow">Findings</span><h2>Severity mix</h2></div></div>
              <div className="pie-wrap"><ResponsiveContainer width="100%" height={210}><PieChart><Pie data={chartData} dataKey="value" nameKey="name" innerRadius={55} outerRadius={78} paddingAngle={4}>{chartData.map((entry) => <Cell key={entry.name} fill={entry.color} />)}</Pie><Tooltip contentStyle={{ background: "#111f38", border: "1px solid rgba(148,163,184,.18)", borderRadius: 10 }} /></PieChart></ResponsiveContainer><div className="pie-total"><strong>{stats.total_findings}</strong><span>findings</span></div></div>
            </article>
          </section>

          <section className="dashboard-panel scan-history-panel">
            <div className="panel-heading"><div><span className="eyebrow">Your activity</span><h2>Recently scanned websites</h2></div><Link to="/history" className="history-link">View all history <ArrowRight size={15} /></Link></div>
            {assessments.length ? <div className="recent-table-wrap"><table className="recent-table"><thead><tr><th>Website</th><th>Scan type</th><th>Status</th><th>Completed</th><th /></tr></thead><tbody>{assessments.slice().reverse().slice(0, 5).map((item) => <tr key={item.id}><td><strong>{item.target}</strong><small>{item.name}</small></td><td>{item.input_type}</td><td><span className="completed-badge">{item.status || "Completed"}</span></td><td>{item.created_at ? formatScanDate(item.created_at) : "—"}</td><td><Link to="/history" aria-label={`View ${item.target}`}><ArrowRight size={17} /></Link></td></tr>)}</tbody></table></div> : <div className="empty-history"><ScanSearch size={22} /><div><strong>No websites scanned yet</strong><p>Run your first security assessment to build your activity history.</p></div><Link to="/assessment" className="primary-button">Start assessment</Link></div>}
          </section>
        </>}
      </main>
    </MainLayout>
  );
}

function ActivityItem({ title, description }) {
  return <li><span className="activity-pulse" /><div><strong>{title}</strong><p>{description}</p></div><CheckCircle2 size={17} /></li>;
}

function DashboardSkeleton() {
  return <div className="dashboard-skeleton" aria-label="Loading dashboard"><div className="skeleton-metrics">{Array.from({ length: 4 }, (_, index) => <div className="skeleton-card" key={index} />)}</div><div className="skeleton-panels"><div /><div /></div></div>;
}
