import { motion } from "framer-motion";
import { Link } from "react-router-dom";
import {
  FiShield,
  FiGlobe,
  FiLock,
  FiDatabase,
  FiActivity,
  FiArrowRight,
  FiTerminal,
  FiSearch,
  FiFileText,
  FiMap,
} from "react-icons/fi";
import "../styles/home.css";

// Stagger Animation Variants
const containerVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.12,
      delayChildren: 0.05
    }
  }
};

const itemVariants = {
  hidden: { opacity: 0, y: 30 },
  visible: {
    opacity: 1,
    y: 0,
    transition: {
      type: "spring",
      stiffness: 90,
      damping: 14
    }
  }
};

const cardHoverEffect = {
  hover: {
    y: -12,
    scale: 1.03,
    boxShadow: "0 20px 40px rgba(157, 78, 221, 0.22)",
    borderColor: "var(--border-glass-glow)",
    transition: {
      type: "spring",
      stiffness: 300,
      damping: 15
    }
  }
};

const workflowHoverEffect = {
  hover: {
    y: -8,
    scale: 1.02,
    boxShadow: "0 15px 30px rgba(0, 180, 216, 0.18)",
    borderColor: "var(--border-glass-glow)",
    transition: {
      type: "spring",
      stiffness: 300,
      damping: 15
    }
  }
};

export default function Home() {
  const features = [
    {
      icon: <FiShield />,
      title: "Security Headers",
      desc: "Analyze HTTP security headers and identify missing protections."
    },
    {
      icon: <FiLock />,
      title: "SSL Scanner",
      desc: "Validate SSL certificate, issuer, protocol and expiry details."
    },
    {
      icon: <FiGlobe />,
      title: "DNS Intelligence",
      desc: "Collect A, MX, NS records with advanced DNS analysis."
    },
    {
      icon: <FiDatabase />,
      title: "Technology Detection",
      desc: "Detect frameworks, CMS, servers and web technologies."
    },
    {
      icon: <FiTerminal />,
      title: "Port Scanner",
      desc: "Verify open network ports and public service exposures."
    },
    {
      icon: <FiSearch />,
      title: "WHOIS Intelligence",
      desc: "Lookup domain registry data, registrar details and timestamps."
    },
    {
      icon: <FiFileText />,
      title: "robots.txt Auditor",
      desc: "Audit robots.txt directives to uncover potential crawl risks."
    },
    {
      icon: <FiMap />,
      title: "Sitemap Parser",
      desc: "Evaluate XML sitemap indexing configurations and structures."
    },
    {
      icon: <FiActivity />,
      title: "Risk Rating Engine",
      desc: "Aggregate all security signatures to compute an overall risk score."
    }
  ];

  return (
    <div className="home-page">
      <div className="hero-bg"></div>

      {/* HERO SECTION */}
      <motion.section
        className="hero-section"
        variants={containerVariants}
        initial="hidden"
        animate="visible"
      >
        <motion.h1 variants={itemVariants}>
          Sentinel<span>X</span>
        </motion.h1>

        <motion.h2 variants={itemVariants}>
          Intelligent Website Security Assessment & Vulnerability Reporting Platform
        </motion.h2>

        <motion.p variants={itemVariants}>
          Scan websites, detect vulnerabilities, analyse SSL, DNS, WHOIS, Technologies, Security Headers and generate professional assessment reports in seconds.
        </motion.p>

        <motion.div variants={itemVariants} className="hero-buttons">
          <Link to="/assessment" className="primary-btn">
            Start Assessment
            <FiArrowRight />
          </Link>
          <Link to="/about" className="secondary-btn">
            Learn More
          </Link>
        </motion.div>
      </motion.section>

      {/* STATS SECTION */}
      <motion.section
        className="stats-section"
        variants={containerVariants}
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, margin: "-100px" }}
      >
        <motion.div variants={itemVariants} className="stat-card">
          <h3>99.9%</h3>
          <p>Detection Accuracy</p>
        </motion.div>

        <motion.div variants={itemVariants} className="stat-card">
          <h3>8+</h3>
          <p>Security Modules</p>
        </motion.div>
      </motion.section>

      {/* FEATURES SECTION */}
      <section className="features-section">
        <motion.div 
          className="section-title"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
        >
          <span>PLATFORM FEATURES</span>
          <h2>Everything Required For Professional Security Assessment</h2>
        </motion.div>

        <motion.div 
          className="features-grid"
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-100px" }}
        >
          {features.map((item, index) => (
            <motion.div
              key={index}
              className="feature-card"
              variants={itemVariants}
              whileHover="hover"
              custom={index}
              variants={{
                ...itemVariants,
                ...cardHoverEffect
              }}
            >
              <div className="feature-icon">{item.icon}</div>
              <h3>{item.title}</h3>
              <p>{item.desc}</p>
            </motion.div>
          ))}
        </motion.div>
      </section>

      {/* WORKFLOW SECTION */}
      <section className="workflow-section">
        <motion.div 
          className="section-title"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
        >
          <span>HOW IT WORKS</span>
          <h2>Complete Security Assessment In Four Simple Steps</h2>
        </motion.div>

        <motion.div 
          className="workflow-grid"
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-100px" }}
        >
          {[
            { step: "01", title: "Enter Website", desc: "Enter any website URL you want to analyse." },
            { step: "02", title: "Security Scan", desc: "SentinelX performs SSL, DNS, WHOIS, Header and Port Analysis." },
            { step: "03", title: "Risk Analysis", desc: "Intelligent Risk Engine calculates overall security posture." },
            { step: "04", title: "Generate Report", desc: "Download a professional report with findings and recommendations." }
          ].map((item, index) => (
            <motion.div
              key={index}
              className="workflow-card"
              variants={itemVariants}
              whileHover="hover"
              variants={{
                ...itemVariants,
                ...workflowHoverEffect
              }}
            >
              <div className="step-number">{item.step}</div>
              <h3>{item.title}</h3>
              <p>{item.desc}</p>
            </motion.div>
          ))}
        </motion.div>
      </section>

      {/* CTA SECTION */}
      <motion.section
        className="cta-section"
        initial={{ opacity: 0, scale: 0.95 }}
        whileInView={{ opacity: 1, scale: 1 }}
        viewport={{ once: true }}
        transition={{ duration: 0.6, type: "spring" }}
      >
        <h2>Ready To Secure Your Website?</h2>
        <p>Start your first assessment and receive a complete security report within seconds.</p>
        <Link to="/assessment" className="cta-button">
          Launch Assessment
          <FiArrowRight />
        </Link>
      </motion.section>

      {/* FOOTER */}
      <footer className="home-footer">
        <div className="footer-logo">
          <h2>Sentinel<span>X</span></h2>
          <p>Enterprise Cybersecurity Assessment Platform</p>
        </div>

        <div className="footer-links">
          <Link to="/about">About</Link>
        </div>

        <div className="footer-bottom">
          © {new Date().getFullYear()} SentinelX
        </div>
      </footer>
    </div>
  );
}
