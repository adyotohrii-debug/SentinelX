import { Activity, FileText, History, LayoutDashboard, ScanSearch, Settings2, ShieldCheck, Shield } from "lucide-react";
import { NavLink } from "react-router-dom";
import "../styles/layout.css";
const menu = [
  { name: "Overview", path: "/dashboard", icon: LayoutDashboard },
  { name: "New assessment", path: "/assessment", icon: ScanSearch },
  { name: "Reports", path: "/reports", icon: FileText },
  { name: "Scan history", path: "/history", icon: History },
  { name: "OWASP ZAP Setup", path: "/owasp-setup", icon: Shield },
  { name: "About SentinelX", path: "/about", icon: Settings2 }
];
export default function Sidebar() { return <aside className="app-sidebar"><NavLink to="/dashboard" className="brand"><span><ShieldCheck size={21} /></span><div><strong>SentinelX</strong><small>Security workspace</small></div></NavLink><nav>{menu.map(({ name, path, icon: Icon }) => <NavLink key={path} to={path} className={({ isActive }) => `nav-item ${isActive ? "active" : ""}`}><Icon size={18} /><span>{name}</span></NavLink>)}</nav><div className="sidebar-health"><span><Activity size={15} /> Platform status</span><strong><i /> Operational</strong><small>8 security modules online</small></div></aside>; }

