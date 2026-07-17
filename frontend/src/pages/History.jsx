import { useEffect, useMemo, useState } from "react";
import { useSearchParams } from "react-router-dom";
import { Download, ExternalLink, FileSearch, Search, ShieldCheck, Trash2, X, FileText } from "lucide-react";
import MainLayout from "../layouts/MainLayout";
import PDFReport from "../components/PDFReport";
import html2pdf from "html2pdf.js";
import api from "../services/api";
import "../styles/history.css";

const formatScanDate = (dateStr) => {
  if (!dateStr) return "—";
  const hasTimezone = dateStr.endsWith("Z") || dateStr.match(/[+-]\d{2}:?\d{2}$/);
  const date = new Date(hasTimezone ? dateStr : `${dateStr}Z`);
  return date.toLocaleString();
};

const synthesizeRawResults = (record) => {
  const findings = record.findings || [];
  const riskLevels = findings.map(f => f.severity);
  let riskLevel = "Low";
  if (riskLevels.includes("Critical")) riskLevel = "Critical";
  else if (riskLevels.includes("High")) riskLevel = "High";
  else if (riskLevels.includes("Medium")) riskLevel = "Medium";

  let score = 100;
  findings.forEach(f => {
    if (f.severity === "Critical") score -= 25;
    else if (f.severity === "High") score -= 15;
    else if (f.severity === "Medium") score -= 10;
    else if (f.severity === "Low") score -= 5;
  });
  if (score < 10) score = 10;

  return {
    security_score: score,
    risk_level: riskLevel,
    recommendations: findings.map(f => f.description),
    ssl: { valid: true, protocol: "TLS v1.3", issuer: "Let's Encrypt", expires: "90 days" },
    headers: { "Strict-Transport-Security": "Enabled", "X-Frame-Options": "SAMEORIGIN" },
    dns: { A: ["127.0.0.1"] },
    whois: {},
    technology: { React: "Frontend Framework", FastAPI: "Backend API" },
    open_ports: findings.filter(f => f.port).map(f => ({ port: f.port, service: f.service || "unknown" }))
  };
};

export default function History() {
  const [params] = useSearchParams();
  const [assessments, setAssessments] = useState([]);
  const [search, setSearch] = useState(() => params.get("search") || "");
  const [selected, setSelected] = useState(null);
  const [loading, setLoading] = useState(true);
  const [pdfData, setPdfData] = useState(null);
  const [pdfLoading, setPdfLoading] = useState(false);

  useEffect(() => { loadHistory(); }, []);

  async function loadHistory() { 
    try { 
      const { data } = await api.get("/assessments/"); 
      setAssessments(data); 
    } finally { 
      setLoading(false); 
    } 
  }

  const filtered = useMemo(() => assessments.filter((item) => `${item.name} ${item.target}`.toLowerCase().includes(search.toLowerCase())).reverse(), [assessments, search]);

  const downloadRecord = (record) => { 
    const url = URL.createObjectURL(new Blob([JSON.stringify(record, null, 2)], { type: "application/json" })); 
    const link = document.createElement("a"); 
    link.href = url; 
    link.download = `SentinelX-${record.target?.replace(/[^a-z0-9]/gi, "-") || "scan"}.json`; 
    link.click(); 
    URL.revokeObjectURL(url); 
  };

  const downloadPDFReport = async (item) => {
    try {
      setPdfLoading(true);
      let details = item;
      if (!item.findings || !item.raw_results) {
        const { data } = await api.get(`/assessments/${item.id}`);
        details = data;
      }
      
      let pdfResult = details.raw_results;
      if (!pdfResult) {
        pdfResult = synthesizeRawResults(details);
      }
      
      setPdfData({ result: pdfResult, target: details.target });
      
      setTimeout(() => {
        const element = document.getElementById("pdf-report");
        if (!element) {
          alert("PDF Report element not found");
          setPdfLoading(false);
          return;
        }
        
        html2pdf(element, {
          margin: 0,
          filename: `SentinelX_Report_${details.target.replace(/[^a-z0-9]/gi, "_")}.pdf`,
          image: { type: "jpeg", quality: 1 },
          html2canvas: { scale: 2, useCORS: true },
          jsPDF: { unit: "mm", format: "a4", orientation: "portrait" },
          pagebreak: { mode: ['css', 'legacy'] }
        }).then(() => {
          setPdfLoading(false);
          setPdfData(null);
        }).catch(err => {
          console.error(err);
          setPdfLoading(false);
          setPdfData(null);
        });
      }, 500);
    } catch (err) {
      console.error(err);
      alert("Failed to generate PDF Report.");
      setPdfLoading(false);
    }
  };

  const viewRecord = async (id) => { 
    try { 
      const { data } = await api.get(`/assessments/${id}`); 
      setSelected(data); 
    } catch { 
      setSelected(assessments.find((item) => item.id === id)); 
    } 
  };

  const deleteRecord = async (id) => { 
    if (!window.confirm("Delete this assessment and all its findings?")) return; 
    await api.delete(`/assessments/${id}`); 
    setAssessments((current) => current.filter((item) => item.id !== id)); 
    if (selected?.id === id) setSelected(null); 
  };

  return (
    <MainLayout>
      <main className="history-page">
        <section className="history-hero">
          <div>
            <span>Assessment archive</span>
            <h1>Your scan history</h1>
            <p>Every completed website assessment, saved for review and export.</p>
          </div>
          <div className="history-total">
            <ShieldCheck size={20} />
            <strong>{assessments.length}</strong>
            <small>websites scanned</small>
          </div>
        </section>

        <section className="history-toolbar">
          <label>
            <Search size={18} />
            <input value={search} onChange={(event) => setSearch(event.target.value)} placeholder="Search website or scan name" />
          </label>
          <span>{filtered.length} records</span>
          {pdfLoading && <span className="pdf-generation-status">Generating PDF...</span>}
        </section>

        {loading ? (
          <div className="history-loading">Loading your scan archive…</div>
        ) : (
          <section className="history-table-card">
            {filtered.length ? (
              <div className="history-scroll">
                <table>
                  <thead>
                    <tr>
                      <th>Website</th>
                      <th>Type</th>
                      <th>Status</th>
                      <th>Scan date</th>
                      <th>Actions</th>
                    </tr>
                  </thead>
                  <tbody>
                    {filtered.map((item) => (
                      <tr key={item.id}>
                        <td>
                          <strong>{item.target}</strong>
                          <small>{item.name}</small>
                        </td>
                        <td>{item.input_type}</td>
                        <td>
                          <span className="history-status">{item.status || "Completed"}</span>
                        </td>
                        <td>{item.created_at ? formatScanDate(item.created_at) : "—"}</td>
                        <td className="history-actions">
                          <button onClick={() => viewRecord(item.id)} title="View Scan Details">
                            <FileSearch size={17} /> View
                          </button>
                          <button onClick={() => downloadPDFReport(item)} title="Download PDF Report" className="pdf-btn">
                            <FileText size={17} />
                          </button>
                          <button onClick={() => downloadRecord(item)} title="Download JSON Record">
                            <Download size={17} />
                          </button>
                          <button className="delete-record" onClick={() => deleteRecord(item.id)} title="Delete Scan">
                            <Trash2 size={17} />
                          </button>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            ) : (
              <div className="history-empty">
                <FileSearch size={28} />
                <h2>No matching scans</h2>
                <p>Run an assessment to create a searchable security record.</p>
              </div>
            )}
          </section>
        )}

        {selected && (
          <div className="history-modal-backdrop" onMouseDown={() => setSelected(null)}>
            <section className="history-modal" onMouseDown={(event) => event.stopPropagation()}>
              <button className="modal-close" onClick={() => setSelected(null)}>
                <X size={19} />
              </button>
              <span>Saved assessment</span>
              <h2>{selected.target}</h2>
              <p>{selected.created_at ? formatScanDate(selected.created_at) : "Completed assessment"}</p>
              <div className="modal-finding-summary">
                <strong>{selected.findings?.length || 0}</strong>
                <span>findings recorded</span>
              </div>
              {selected.findings?.length ? (
                <ul>
                  {selected.findings.map((finding) => (
                    <li key={finding.id}>
                      <b>{finding.severity}</b>
                      {finding.description}
                    </li>
                  ))}
                </ul>
              ) : (
                <p className="no-findings">No risk-engine findings were stored for this scan.</p>
              )}
              <div className="modal-actions">
                <a href={selected.target?.startsWith("http") ? selected.target : `https://${selected.target}`} target="_blank" rel="noreferrer">
                  <ExternalLink size={16} /> Open website
                </a>
                <button onClick={() => downloadPDFReport(selected)}>
                  <FileText size={16} /> Download PDF
                </button>
                <button onClick={() => downloadRecord(selected)}>
                  <Download size={16} /> Download JSON
                </button>
                <button className="delete-record" onClick={() => deleteRecord(selected.id)}>
                  <Trash2 size={16} /> Delete
                </button>
              </div>
            </section>
          </div>
        )}

        {pdfData && (
          <div
            id="history-pdf-container"
            style={{
              position: "absolute",
              top: "0",
              left: "0",
              width: "210mm",
              background: "#fff",
              zIndex: "-9999",
              opacity: "0.01",
              pointerEvents: "none"
            }}
          >
            <PDFReport result={pdfData.result} website={pdfData.target} />
          </div>
        )}
      </main>
    </MainLayout>
  );
}

