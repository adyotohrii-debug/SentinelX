import Sidebar from "../components/Sidebar";
import Topbar from "../components/Topbar";
import "../styles/layout.css";

export default function MainLayout({ children }) {
  return <div className="app-shell"><Sidebar /><div className="app-content"><Topbar /><div className="page-content">{children}</div></div></div>;
}
