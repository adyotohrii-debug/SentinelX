import { Command, Search } from "lucide-react";
import { useLocation, useNavigate } from "react-router-dom";
import { useState, useEffect, useRef } from "react";
import "../styles/layout.css";

const pageTitles = {
  "/dashboard": ["Overview", "Security workspace"],
  "/assessment": ["New assessment", "Assess a website or import a report"],
  "/reports": ["Reports", "Security posture and exports"],
  "/history": ["Assessment history", "Your saved assessment archive"],
  "/owasp-setup": ["OWASP ZAP Setup", "Integration & local execution guide"],
  "/about": ["About SentinelX", "Project story and platform information"]
};

export default function Topbar() {
  const location = useLocation();
  const navigate = useNavigate();
  const [query, setQuery] = useState("");
  const inputRef = useRef(null);
  const [title, subtitle] = pageTitles[location.pathname] || ["SentinelX", "Security workspace"];

  useEffect(() => {
    const handleKeyDown = (e) => {
      if ((e.metaKey || e.ctrlKey) && e.key.toLowerCase() === "k") {
        e.preventDefault();
        inputRef.current?.focus();
      }
    };
    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, []);

  const submitSearch = (event) => {
    event.preventDefault();
    if (query.trim()) navigate(`/history?search=${encodeURIComponent(query.trim())}`);
  };

  return (
    <header className="app-topbar">
      <div>
        <div className="breadcrumb">Workspace <span>/</span> {title}</div>
        <h2>{title}</h2>
        <p>{subtitle}</p>
      </div>
      <div className="topbar-actions">
        <form className="topbar-search" onSubmit={submitSearch}>
          <Search size={16} />
          <input
            ref={inputRef}
            value={query}
            onChange={(event) => setQuery(event.target.value)}
            placeholder="Find an assessed website"
          />
          <kbd title="Press Ctrl+K to search"><Command size={11} /> K</kbd>
        </form>
        <button className="profile-button">
          <span>S</span>
          <div>
            <strong>Sentinel User</strong>
            <small>Security analyst</small>
          </div>
        </button>
      </div>
    </header>
  );
}
