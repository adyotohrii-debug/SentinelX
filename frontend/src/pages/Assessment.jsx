import { useState, useEffect } from "react";
import api from "../services/api";
import html2pdf from "html2pdf.js";

import PDFReport from "../components/PDFReport";
import MainLayout from "../layouts/MainLayout";
import "../styles/assessment.css";

export default function Assessment() {
    const API = import.meta.env.VITE_API_URL || "http://127.0.0.1:8000";

    const [website, setWebsite] = useState("");
    const [selectedFile, setSelectedFile] = useState(null);
    const [loading, setLoading] = useState(false);
    const [loadingText, setLoadingText] = useState("");
    const [result, setResult] = useState(null);


    const scanSteps = [
        "Initializing Scan...",
        "Checking Security Headers...",
        "Checking SSL Certificate...",
        "Running DNS Lookup...",
        "Collecting WHOIS Information...",
        "Detecting Technologies...",
        "Checking robots.txt...",
        "Checking sitemap.xml...",
        "Scanning Open Ports...",
        "Calculating Risk Score..."
    ];

    useEffect(() => {
        if (window.__sentinelx_active_scan) {
            const saved = window.__sentinelx_active_scan;
            setWebsite(saved.website || "");
            if (saved.promise) {
                setLoading(true);
                setLoadingText(saved.loadingText || "Resuming Scan...");
                saved.promise.then(response => {
                    setResult(response.data);
                    setLoading(false);
                    setLoadingText("");
                    window.__sentinelx_active_scan = {
                        loading: false,
                        website: saved.website,
                        loadingText: "",
                        result: response.data,
                        promise: null
                    };
                }).catch(err => {
                    setLoading(false);
                    setLoadingText("");
                    window.__sentinelx_active_scan = null;
                });
            } else {
                setLoading(saved.loading || false);
                setLoadingText(saved.loadingText || "");
                setResult(saved.result || null);
            }
        }
    }, []);

    async function startAssessment() {
        if (!website.trim()) {
            alert("Please enter a website URL.");
            return;
        }

        try {
            setLoading(true);
            setResult(null);

            window.__sentinelx_active_scan = {
                loading: true,
                website: website,
                loadingText: "Initializing Scan...",
                result: null,
                promise: null
            };

            for (const step of scanSteps) {
                setLoadingText(step);
                if (window.__sentinelx_active_scan) {
                    window.__sentinelx_active_scan.loadingText = step;
                }
                await new Promise(resolve => setTimeout(resolve, 350));
            }

            if (window.__sentinelx_active_scan) {
                window.__sentinelx_active_scan.loadingText = "Running assessment modules...";
            }
            setLoadingText("Running assessment modules...");

            const promise = api.post(
                `/security/scan`,
                { target: website }
            );

            if (window.__sentinelx_active_scan) {
                window.__sentinelx_active_scan.promise = promise;
            }

            const response = await promise;
            setResult(response.data);

            window.__sentinelx_active_scan = {
                loading: false,
                website: website,
                loadingText: "",
                result: response.data,
                promise: null
            };
        }
        catch (err) {
            console.error(err);
            alert("Assessment Failed.");
            window.__sentinelx_active_scan = null;
        }
        finally {
            setLoading(false);
            setLoadingText("");
        }
    }    async function importScan() {

        if (!selectedFile) {

            alert("Please select an XML, CSV or JSON file.");

            return;

        }

        try {

            setLoading(true);

            setLoadingText("Importing Security Report...");

            const formData = new FormData();

            formData.append("file", selectedFile);

            const response = await api.post(

                `/upload/file`,

                formData,

                {

                    headers: {

                        "Content-Type": "multipart/form-data"

                    }

                }

            );

            const imported = response.data;

            setResult({

                security_score:

                    imported.security_score ?? 0,

                risk_level:

                    imported.risk_level ?? "Imported",

                recommendations:

                    imported.recommendations ??

                    [imported.message ?? "Scan Imported"],

                headers:

                    imported.headers ?? {},

                ssl:

                    imported.ssl ?? {},

                dns:

                    imported.dns ?? {},

                whois:

                    imported.whois ?? {},

                technology:

                    imported.technology ?? {},

                open_ports:

                    imported.open_ports ??

                    imported.findings ??

                    [],

                server:

                    imported.server ??

                    { server: imported.scanner ?? "Imported Scan" }

            });

        }

        catch (err) {

            console.error(err);

            alert("Import Failed.");

        }

        finally {

            setLoading(false);

            setLoadingText("");

        }

    }

    function resetAssessment() {

        setWebsite("");

        setSelectedFile(null);

        setResult(null);

        setLoading(false);

        setLoadingText("");

    }

    function downloadJSON() {

        if (!result) return;

        const blob = new Blob(

            [

                JSON.stringify(

                    result,

                    null,

                    2

                )

            ],

            {

                type: "application/json"

            }

        );

        const url = URL.createObjectURL(blob);

        const link = document.createElement("a");

        link.href = url;

        link.download = "SentinelX_Report.json";

        link.click();

        URL.revokeObjectURL(url);

    }

function downloadPDF() {
    const element = document.getElementById("pdf-report");

    if (!element) {
        alert("PDF Report not found");
        return;
    }

    html2pdf(element, {
        margin: 0,
        filename: "SentinelX_Report.pdf",
        image: {
            type: "jpeg",
            quality: 1
        },
        html2canvas: {
            scale: 2,
            useCORS: true
        },
        jsPDF: {
            unit: "mm",
            format: "a4",
            orientation: "portrait"
        },
        pagebreak: { mode: ['css', 'legacy'] }
    });
}
return (

        <MainLayout>

            <div className="assessment-page">

                <section className="assessment-hero">

                    <div className="hero-badge">

                        Enterprise Cybersecurity Assessment Platform

                    </div>

                    <h1>

                        🛡 SentinelX Assessment Engine

                    </h1>

                    <p>

                        Perform a complete security assessment using
                        Security Headers, SSL Inspection, DNS Intelligence,
                        WHOIS Lookup, Technology Detection,
                        Port Scanning and our integrated
                        Risk Engine.

                    </p>

                </section>

                <div className="assessment-grid">

                    <div className="assessment-card">

                        <h2>

                            🌐 Website Assessment

                        </h2>

                        <p>

                            Enter a website URL to launch
                            a complete SentinelX assessment.

                        </p>

                        <input

                            type="text"

                            className="assessment-input"

                            placeholder="https://example.com"

                            value={website}

                            onChange={(e)=>

                                setWebsite(e.target.value)

                            }

                        />

                        <button

                            className="primary-btn"

                            disabled={loading}

                            onClick={startAssessment}

                        >

                            {

                                loading

                                    ?

                                    "Running Assessment..."

                                    :

                                    "Start Assessment"

                            }

                        </button>

                    </div>

                    <div className="assessment-card">

                        <h2>

                            📂 Import Existing Scan

                        </h2>

                        <p>

                            Import Nmap XML,
                            OWASP ZAP XML,
                            CSV or JSON reports.

                        </p>

                        <input

                            type="file"

                            accept=".xml,.csv,.json"

                            onChange={(e)=>

                                setSelectedFile(

                                    e.target.files[0]

                                )

                            }

                        />

                        {

                            selectedFile && (

                                <p
                                    style={{

                                        marginTop:"12px",

                                        color:"#94a3b8"

                                    }}

                                >

                                    Selected :

                                    <strong>

                                        {" "}

                                        {selectedFile.name}

                                    </strong>

                                </p>

                            )

                        }

                        <button

                            className="secondary-btn"

                            disabled={loading}

                            onClick={importScan}

                        >

                            Import Scan

                        </button>

                    </div>

                </div>

                {


                    loading && (

                        <div className="loading-card">

                            <div className="loading-spinner"></div>

                            <h2>

                                Security Assessment Running

                            </h2>

                            <p>

                                {loadingText}

                            </p>

                            <div className="scan-progress">

                                {

                                    scanSteps.map(

                                        (step,index)=>(

                                            <div

                                                key={index}

                                                className="scan-item"

                                            >

                                                <span>

                                                    ✔

                                                </span>

                                                <span>

                                                    {step}

                                                </span>

                                            </div>

                                        )

                                    )

                                }

                            </div>

                        </div>

                    )

                }

                {

                    result && (

                        <>

                            <section className="summary-section">

                                <div className="summary-card score-card">

                                    <h3>

                                        Security Score

                                    </h3>

                                    <div className="score-value">

                                        {

                                            result.security_score ?? 0

                                        }

                                    </div>

                                    <span>

                                        out of 100

                                    </span>

                                </div>

                                <div className="summary-card risk-card">

                                    <h3>

                                        Risk Level

                                    </h3>

                                    <div className="risk-value">

                                        {

                                            result.risk_level ??

                                            "Unknown"

                                        }

                                    </div>

                                </div>

                                <div className="summary-card ssl-card">

                                    <h3>

                                        SSL Status

                                    </h3>

                                    <div className="status-value">

                                        {

                                            result.ssl?.valid

                                                ?

                                                "Secure"

                                                :

                                                "Not Secure"

                                        }

                                    </div>

                                </div>

                                <div className="summary-card port-card">

                                    <h3>

                                        Open Ports

                                    </h3>

                                    <div className="port-value">

                                        {

                                            result.open_ports?.length ?? 0

                                        }

                                    </div>

                                </div>

                            </section>                            <section className="details-grid">

                                <div className="detail-card">

                                    <h2>

                                        🛡 Security Headers

                                    </h2>

                                    {

                                        result.headers &&
                                        Object.keys(result.headers).length > 0

                                            ? (

                                                <pre>

                                                    {

                                                        JSON.stringify(

                                                            result.headers,

                                                            null,

                                                            2

                                                        )

                                                    }

                                                </pre>

                                            )

                                            : (

                                                <p>

                                                    No security header information available.

                                                </p>

                                            )

                                    }

                                </div>

                                <div className="detail-card">

                                    <h2>

                                        🌍 DNS Information

                                    </h2>

                                    {

                                        result.dns &&
                                        Object.keys(result.dns).length > 0

                                            ? (

                                                <pre>

                                                    {

                                                        JSON.stringify(

                                                            result.dns,

                                                            null,

                                                            2

                                                        )

                                                    }

                                                </pre>

                                            )

                                            : (

                                                <p>

                                                    DNS information unavailable.

                                                </p>

                                            )

                                    }

                                </div>

                                <div className="detail-card">

                                    <h2>

                                        👤 WHOIS Information

                                    </h2>

                                    {

                                        result.whois &&
                                        Object.keys(result.whois).length > 0

                                            ? (

                                                <pre>

                                                    {

                                                        JSON.stringify(

                                                            result.whois,

                                                            null,

                                                            2

                                                        )

                                                    }

                                                </pre>

                                            )

                                            : (

                                                <p>

                                                    WHOIS information unavailable.

                                                </p>

                                            )

                                    }

                                </div>

                                <div className="detail-card">

                                    <h2>

                                        💻 Technology Detection

                                    </h2>

                                    {

                                        result.technology &&
                                        Object.keys(result.technology).length > 0

                                            ? (

                                                <pre>

                                                    {

                                                        JSON.stringify(

                                                            result.technology,

                                                            null,

                                                            2

                                                        )

                                                    }

                                                </pre>

                                            )

                                            : (

                                                <p>

                                                    No technology information available.

                                                </p>

                                            )

                                    }

                                </div>

                            </section>

                            <section className="details-grid">

                                <div className="detail-card">

                                    <h2>

                                        🚪 Open Ports

                                    </h2>

                                    {

                                        result.open_ports &&
                                        result.open_ports.length > 0

                                            ? (

                                                <pre>

                                                    {

                                                        JSON.stringify(

                                                            result.open_ports,

                                                            null,

                                                            2

                                                        )

                                                    }

                                                </pre>

                                            )

                                            : (

                                                <p>

                                                    No open ports detected.

                                                </p>

                                            )

                                    }

                                </div>

                                <div className="detail-card">

                                    <h2>

                                        🖥 Server Information

                                    </h2>

                                    {

                                        result.server &&
                                        Object.keys(result.server).length > 0

                                            ? (

                                                <pre>

                                                    {

                                                        JSON.stringify(

                                                            result.server,

                                                            null,

                                                            2

                                                        )

                                                    }

                                                </pre>

                                            )

                                            : (

                                                <p>

                                                    Server information unavailable.

                                                </p>

                                            )

                                    }

                                </div>

                            </section>                            <section className="recommendation-card">

                                <h2>

                                    📋 Security Recommendations

                                </h2>

                                {

                                    result.recommendations &&
                                    result.recommendations.length > 0

                                        ? (

                                            result.recommendations.map(

                                                (item, index) => (

                                                    <div

                                                        key={index}

                                                        className="recommendation-item"

                                                    >

                                                        <span>

                                                            ✔

                                                        </span>

                                                        <span>

                                                            {

                                                                typeof item === "string"

                                                                    ? item

                                                                    : JSON.stringify(item)

                                                            }

                                                        </span>

                                                    </div>

                                                )

                                            )

                                        )

                                        : (

                                            <p>

                                                No recommendations available.

                                            </p>

                                        )

                                }

                            </section>

                            <div className="action-buttons">

                                <button

                                    className="primary-btn"

                                    onClick={downloadPDF}

                                >

                                    📄 Download PDF Report

                                </button>

                                <button

                                    className="secondary-btn"

                                    onClick={downloadJSON}

                                >

                                    📥 Download JSON Report

                                </button>

                                <button

                                    className="secondary-btn"

                                    onClick={resetAssessment}

                                >

                                    🔄 Reset Assessment

                                </button>

                            </div>

                        </>

                    )

                }

            </div>
<div
    id="pdf-container"
    style={{
        position: "absolute",
        top: "0",
        left: "0",
        width: "210mm",
        background: "#fff",
        zIndex: "-1",
        opacity: "0.01",
        pointerEvents: "none"
    }}
>
    <PDFReport
        result={result}
        website={website}
    />
</div>
        </MainLayout>

    );

}