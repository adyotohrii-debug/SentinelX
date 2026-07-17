import { Link } from "react-router-dom";
import {
  ArrowRight,
  Code2,
  FileSearch,
  ShieldCheck,
  Sparkles,
} from "lucide-react";
import MainLayout from "../layouts/MainLayout";
import "../styles/about.css";

export default function About() {
  return (
    <MainLayout>
      <main className="about-page">

        <section className="about-intro">
          <span>
            <Sparkles size={15} /> The SentinelX story
          </span>

          <h1>Built to make website security understandable.</h1>

          <p>
            SentinelX began as an assessment platform for turning complex
            security checks into clear, actionable website reports.
          </p>

          <Link to="/assessment">
            Run a website assessment <ArrowRight size={17} />
          </Link>
        </section>

        <section className="about-timeline">

          <article>
            <i>
              <Code2 size={19} />
            </i>

            <div>
              <span>01 · Foundation</span>

              <h2>One workflow, not scattered tools</h2>

              <p>
                The project combines SSL, headers, DNS, WHOIS, technology
                detection and port intelligence in one guided assessment flow.
              </p>
            </div>
          </article>

          <article>
            <i>
              <FileSearch size={19} />
            </i>

            <div>
              <span>02 · Reporting</span>

              <h2>From raw results to useful decisions</h2>

              <p>
                Every scan produces understandable findings, a risk score and
                downloadable report data so remediation can start immediately.
              </p>
            </div>
          </article>

          <article>
            <i>
              <ShieldCheck size={19} />
            </i>

            <div>
              <span>03 · Today</span>

              <h2>A growing security workspace</h2>

              <p>
                SentinelX continues to evolve with a vision of making website
                security more accessible, practical and reliable for everyone.
              </p>
            </div>
          </article>

        </section>

        <section className="about-team">

          <div>

            <span>Project Team</span>

            <h2>Built with a vision for a safer web.</h2>

            <p>
              Meet the creators behind SentinelX and connect with us on
              LinkedIn.
            </p>

          </div>

          <div className="team-card">

            <strong>SentinelX Builders</strong>

            <small>Connect with the development team</small>

            <div className="team-links">

              <a
                href="https://www.linkedin.com/in/adyot-ohri-8799a2271/"
                target="_blank"
                rel="noopener noreferrer"
              >
                Adyot Ohri
                <ArrowRight size={15} />
              </a>

              <a
                href="https://www.linkedin.com/in/akshit-sukhija-/"
                target="_blank"
                rel="noopener noreferrer"
              >
                Akshit Sukhija
                <ArrowRight size={15} />
              </a>

            </div>

          </div>

        </section>

      </main>
    </MainLayout>
  );
}