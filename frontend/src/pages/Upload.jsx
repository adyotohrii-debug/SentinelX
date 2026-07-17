import { useState } from "react";
import MainLayout from "../layouts/MainLayout";
import api from "../services/api";
import "./Upload.css";

export default function Upload() {

  const [website, setWebsite] = useState("");

  const [selectedFile, setSelectedFile] =
    useState(null);

  const [loading, setLoading] =
    useState(false);

  const [progress, setProgress] =
    useState("");

  const [result, setResult] =
    useState(null);

  const modules = [

    "Security Headers",

    "SSL Certificate",

    "Open Ports",

    "WHOIS Lookup",

    "DNS Lookup",

    "Technology Detection",

    "robots.txt",

    "sitemap.xml",

    "Risk Engine",

  ];

  async function runAssessment() {

    if (!website.trim()) {

      alert("Enter Website");

      return;

    }

    try {

      setLoading(true);

      setResult(null);

      for (let module of modules) {

        setProgress(
          "Running " + module + "..."
        );

        await new Promise(
          (r) =>
            setTimeout(r, 350)
        );

      }

      const response =
        await api.post(
          "/security/scan",
          {
            target: website,
          }
        );

      setResult(response.data);

      setProgress(
        "Assessment Completed ✅"
      );

    } catch (err) {

      console.log(err);

      alert(
        "Assessment Failed"
      );

    } finally {

      setLoading(false);

    }

  }

  async function uploadFile() {

    if (!selectedFile) {

      alert(
        "Select XML / CSV / JSON"
      );

      return;

    }

    const form =
      new FormData();

    form.append(
      "file",
      selectedFile
    );

    try {

      await api.post(
        "/upload/file",
        form,
        {
          headers: {
            "Content-Type":
              "multipart/form-data",
          },
        }
      );

      alert(
        "Imported Successfully"
      );

    } catch {

      alert(
        "Import Failed"
      );

    }

  }

  return (

    <MainLayout>

      <div className="assessment-header">

        <h1>
          🛡 SentinelX Assessment Engine
        </h1>

        <p>

          Scan Websites, IP Addresses,
          XML Reports and CSV Reports
          using 9 integrated
          cybersecurity modules.

        </p>

      </div>

      <div className="scan-card">

        <h2>
          🌐 Website Assessment
        </h2>

        <input
          className="scan-input"
          placeholder="https://example.com"
          value={website}
          onChange={(e)=>
            setWebsite(e.target.value)
          }
        />

        <button
          className="scan-btn"
          onClick={runAssessment}
        >

          {loading
            ? "Running..."
            : "🛡 Run Full Assessment"}

        </button>

        {loading && (

          <div
            className="progress-box"
          >

            <div className="loader"></div>

            <h3>{progress}</h3>

          </div>

        )}

      </div>      {result && (

        <>

          <div
            className="result-grid"
          >

            <div className="result-card">

              <h3>
                🛡 Security Score
              </h3>

              <h1>
                {result.security_score}/100
              </h1>

            </div>

            <div
              className="result-card"
            >

              <h3>
                ⚠ Risk Level
              </h3>

              <h1
                style={{
                  color:
                    result.risk_level ===
                    "Critical"
                      ? "#ef4444"
                      : result.risk_level ===
                        "High"
                      ? "#f97316"
                      : result.risk_level ===
                        "Medium"
                      ? "#facc15"
                      : "#22c55e",
                }}
              >
                {result.risk_level}
              </h1>

            </div>

            <div
              className="result-card"
            >

              <h3>
                🔒 SSL
              </h3>

              <h1>
                {result.ssl.status}
              </h1>

            </div>

            <div
              className="result-card"
            >

              <h3>
                🌐 Open Ports
              </h3>

              <h1>
                {result.open_ports.length}
              </h1>

            </div>

            <div
              className="result-card"
            >

              <h3>
                🖥 Server
              </h3>

              <h2>
                {result.server.server}
              </h2>

            </div>

            <div
              className="result-card"
            >

              <h3>
                ⚙ Technology
              </h3>

              <pre
                style={{
                  whiteSpace:
                    "pre-wrap",
                }}
              >
                {JSON.stringify(
                  result.technology,
                  null,
                  2
                )}
              </pre>

            </div>

          </div>

          <div
            className="details-card"
          >

            <h2>
              🛡 Security Headers
            </h2>

            <pre>
              {JSON.stringify(
                result.headers,
                null,
                2
              )}
            </pre>

          </div>

          <div
            className="details-card"
          >

            <h2>
              🌐 DNS Records
            </h2>

            <pre>
              {JSON.stringify(
                result.dns,
                null,
                2
              )}
            </pre>

          </div>

          <div
            className="details-card"
          >

            <h2>
              🌍 WHOIS Information
            </h2>

            <pre>
              {JSON.stringify(
                result.whois,
                null,
                2
              )}
            </pre>

          </div>

          <div
            className="details-card"
          >

            <h2>
              💡 Recommendations
            </h2>

            <ul>

              {result.recommendations.map(
                (
                  item,
                  index
                ) => (

                  <li
                    key={index}
                  >
                    {item}
                  </li>

                )
              )}

            </ul>

          </div>
                    <div
            className="details-card"
          >

            <h2>
              🛰 Nmap Scan
            </h2>

            <pre>
              {JSON.stringify(
                result.nmap,
                null,
                2
              )}
            </pre>

          </div>

        </>

      )}

      <div
        className="scan-card"
      >

        <h2>
          📂 Import Existing Scan
        </h2>

        <p
          style={{
            color: "#94a3b8",
            marginBottom: "15px",
          }}
        >
          Supported Formats:
          XML • CSV • JSON
        </p>

        <input
          type="file"
          accept=".xml,.csv,.json"
          onChange={(e) =>
            setSelectedFile(
              e.target.files[0]
            )
          }
        />

        <button
          className="scan-btn"
          onClick={uploadFile}
          style={{
            marginTop: "20px",
          }}
        >
          📂 Import Scan
        </button>

        {selectedFile && (

          <div
            style={{
              marginTop: "20px",
              background: "#0f172a",
              padding: "15px",
              borderRadius: "10px",
              color: "#22c55e",
            }}
          >
            Selected File:
            <br />

            <b>
              {selectedFile.name}
            </b>
          </div>

        )}

      </div>

    </MainLayout>

  );

}