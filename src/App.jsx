import { useState, useEffect, useRef } from "react";

// ═══════════════════════════════════════════════════════════════
//  EDIT YOUR PORTFOLIO HERE — All content in one place
// ═══════════════════════════════════════════════════════════════

const PROFILE = {
  name: "Josh Moses",
  tagline: "Biostatistics · Machine Learning · Radiopharmaceutical Development",
  about:
    "Senior at Northeastern University conducting peptide engineering research at Massachusetts General Hospital and Harvard Medical School. My work focuses on radiopharmaceutical development for targeted cancer therapy. I am interested in pursuing biomedical research that integrates computational and experimental approaches.",
};

const NAV_LINKS = ["About", "Research", "Projects", "Skills", "Contact"];

const RESEARCH = [
  {
    title: "Radiopharmaceutical Development",
    description:
      "Engineering peptides for tumor targeting and drug delivery in gastric, ovarian, and pancreatic cancers using solid-phase peptide synthesis, LC-MS/HPLC analysis, and cell culture techniques.",
  },
  {
    title: "Computational Biology & Biostatistics",
    description:
      "Applying machine learning, survival analysis, and computational modeling using Python (Biopython, PyRosetta, TensorFlow) and R (survival, tidyverse) for peptide analysis, cancer genomics, and statistical inference.",
  },
  {
    title: "Analytical Chemistry",
    description:
      "Expertise in LC-MS, HPLC, flow cytometry, and various analytical techniques for evaluating therapeutic efficacy of biomolecules.",
  },
];

const PROJECTS = [
  {
    title: "Fetal Health Classification using Machine Learning",
    description:
      "Developed a Random Forest classifier achieving 92.72% accuracy in predicting fetal health status from cardiotocography data. Applied feature engineering, hyperparameter tuning, and model evaluation techniques to assist in early identification of at-risk pregnancies.",
    tech: "Python, scikit-learn, TensorFlow, pandas, NumPy, matplotlib",
    methods: "Random Forest, neural networks, cross-validation, ROC analysis",
    link: "https://github.com/josh-moses/josh-moses.github.io/tree/main/projects/fetal-health",
  },
  {
    title: "TCGA Breast Cancer Survival Analysis",
    description:
      "Performed comprehensive survival analysis on 1,050+ breast cancer patients using Kaplan-Meier curves and Cox proportional hazards regression in R. Identified significant associations between TP53/BRCA1/2 mutations and patient mortality after age adjustment (p < 0.05).",
    tech: "R, survival, survminer, tidyverse, ggplot2",
    methods: "Cox regression, Kaplan-Meier curves, log-rank tests, hazard ratio estimation",
    link: "https://github.com/josh-moses/josh-moses.github.io/tree/main/projects/tcga-survival-analysis",
  },
  {
    title: "Structural Variant Breakpoint Analysis",
    description:
      "Developed a Random Forest analysis pipeline to identify structural variant types—deletions, duplications, inversions, and translocations—by analyzing DNA breakpoint sequences. Engineered genomic features including GC-content signatures and repeat element enrichment.",
    tech: "Python, scikit-learn, Biopython, pandas, matplotlib, seaborn",
    methods: "Random Forest, DNA sequence simulation, feature extraction, multi-class ROC analysis",
    link: "https://github.com/josh-moses/josh-moses.github.io/tree/main/projects/structural-variant-analysis",
  },
];

const SKILLS = [
  { category: "Languages", items: ["Python", "R"] },
  { category: "Wet Lab", items: ["LC-MS/HPLC", "Flow Cytometry", "Cell Culture", "Peptide Synthesis", "ELISA"] },
  { category: "Computational", items: ["Biostatistics", "Data Visualization", "Biopython", "PyRosetta", "NVivo"] },
];

const CONTACT = {
  email: "josh.7.moses@gmail.com",
  institution: "Massachusetts General Hospital",
  university: "Northeastern University",
  github: { label: "github.com/josh-moses", url: "https://github.com/josh-moses" },
  linkedin: { label: "linkedin.com/in/joshmos", url: "https://linkedin.com/in/joshmos" },
};

// ═══════════════════════════════════════════════════════════════
//  COMPONENTS — Edit these to change layout & style
// ═══════════════════════════════════════════════════════════════

function useInView(threshold = 0.15) {
  const ref = useRef(null);
  const [visible, setVisible] = useState(false);
  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const obs = new IntersectionObserver(([e]) => { if (e.isIntersecting) { setVisible(true); obs.disconnect(); } }, { threshold });
    obs.observe(el);
    return () => obs.disconnect();
  }, [threshold]);
  return [ref, visible];
}

function FadeIn({ children, delay = 0, className = "" }) {
  const [ref, visible] = useInView(0.1);
  return (
    <div
      ref={ref}
      className={className}
      style={{
        opacity: visible ? 1 : 0,
        transform: visible ? "translateY(0)" : "translateY(28px)",
        transition: `opacity 0.7s cubic-bezier(.16,1,.3,1) ${delay}s, transform 0.7s cubic-bezier(.16,1,.3,1) ${delay}s`,
      }}
    >
      {children}
    </div>
  );
}

function Header() {
  const [loaded, setLoaded] = useState(false);
  useEffect(() => { requestAnimationFrame(() => setLoaded(true)); }, []);

  return (
    <header style={styles.header}>
      <h1
        style={{
          ...styles.heroName,
          opacity: loaded ? 1 : 0,
          transform: loaded ? "translateY(0)" : "translateY(20px)",
          transition: "all 0.9s cubic-bezier(.16,1,.3,1) 0.1s",
        }}
      >
        {PROFILE.name}
      </h1>
      <p
        style={{
          ...styles.heroTagline,
          opacity: loaded ? 1 : 0,
          transform: loaded ? "translateY(0)" : "translateY(16px)",
          transition: "all 0.9s cubic-bezier(.16,1,.3,1) 0.35s",
        }}
      >
        {PROFILE.tagline}
      </p>
    </header>
  );
}

function Nav() {
  const [active, setActive] = useState("");
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 20);
    window.addEventListener("scroll", onScroll);
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  const handleClick = (label) => {
    setActive(label);
    document.getElementById(label.toLowerCase())?.scrollIntoView({ behavior: "smooth" });
  };

  return (
    <nav style={{ ...styles.nav, boxShadow: scrolled ? "0 4px 24px rgba(0,0,0,0.08)" : "none" }}>
      <div style={styles.navInner}>
        {NAV_LINKS.map((label) => (
          <button
            key={label}
            onClick={() => handleClick(label)}
            style={{
              ...styles.navLink,
              color: active === label ? "#0f1923" : "#6b7280",
              borderBottom: active === label ? "2px solid #0f1923" : "2px solid transparent",
            }}
            onMouseEnter={(e) => { e.target.style.color = "#0f1923"; }}
            onMouseLeave={(e) => { if (active !== label) e.target.style.color = "#6b7280"; }}
          >
            {label}
          </button>
        ))}
      </div>
    </nav>
  );
}

function About() {
  return (
    <section id="about" style={styles.section}>
      <FadeIn>
        <SectionTitle>About Me</SectionTitle>
        <p style={styles.bodyText}>{PROFILE.about}</p>
      </FadeIn>
    </section>
  );
}

function Research() {
  return (
    <section id="research" style={styles.section}>
      <FadeIn>
        <SectionTitle>Research Focus</SectionTitle>
      </FadeIn>
      <div style={styles.researchGrid}>
        {RESEARCH.map((r, i) => (
          <FadeIn key={r.title} delay={i * 0.12}>
            <div
              style={styles.researchCard}
              onMouseEnter={(e) => {
                e.currentTarget.style.borderColor = "#0f1923";
              }}
              onMouseLeave={(e) => {
                e.currentTarget.style.borderColor = "#e5e7eb";
              }}
            >
              <h3 style={styles.cardTitle}>{r.title}</h3>
              <p style={styles.cardDesc}>{r.description}</p>
            </div>
          </FadeIn>
        ))}
      </div>
    </section>
  );
}

function Projects() {
  const [hovered, setHovered] = useState(null);

  return (
    <section id="projects" style={styles.section}>
      <FadeIn>
        <SectionTitle>Featured Projects</SectionTitle>
      </FadeIn>
      <div style={{ display: "flex", flexDirection: "column", gap: "1.5rem" }}>
        {PROJECTS.map((p, i) => (
          <FadeIn key={p.title} delay={i * 0.1}>
            <div
              style={{
                ...styles.projectCard,
                borderLeftColor: hovered === i ? "#0f1923" : "#d1d5db",
              }}
              onMouseEnter={() => setHovered(i)}
              onMouseLeave={() => setHovered(null)}
            >
              <div style={{ display: "flex", justifyContent: "space-between", alignItems: "flex-start", flexWrap: "wrap", gap: "0.5rem" }}>
                <h3 style={styles.projectTitle}>{p.title}</h3>
                <a
                  href={p.link}
                  target="_blank"
                  rel="noopener noreferrer"
                  style={styles.projectLink}
                  onMouseEnter={(e) => { e.target.style.background = "#0f1923"; e.target.style.color = "#fff"; }}
                  onMouseLeave={(e) => { e.target.style.background = "transparent"; e.target.style.color = "#0f1923"; }}
                >
                  View →
                </a>
              </div>
              <p style={styles.projectDesc}>{p.description}</p>
              <div style={styles.projectMeta}>
                <span style={styles.metaLabel}>Tech</span>
                <span style={styles.metaValue}>{p.tech}</span>
              </div>
              <div style={styles.projectMeta}>
                <span style={styles.metaLabel}>Methods</span>
                <span style={styles.metaValue}>{p.methods}</span>
              </div>
            </div>
          </FadeIn>
        ))}
      </div>
    </section>
  );
}

function Skills() {
  return (
    <section id="skills" style={styles.section}>
      <FadeIn>
        <SectionTitle>Technical Skills</SectionTitle>
      </FadeIn>
      <div style={{ display: "flex", flexDirection: "column", gap: "1.75rem" }}>
        {SKILLS.map((group, gi) => (
          <FadeIn key={group.category} delay={gi * 0.1}>
            <div>
              <p style={styles.skillCategory}>{group.category}</p>
              <div style={styles.skillRow}>
                {group.items.map((s) => (
                  <span key={s} style={styles.skillPill}>
                    {s}
                  </span>
                ))}
              </div>
            </div>
          </FadeIn>
        ))}
      </div>
    </section>
  );
}

function Contact() {
  return (
    <section id="contact" style={styles.section}>
      <FadeIn>
        <SectionTitle>Contact</SectionTitle>
        <div style={styles.contactGrid}>
          <ContactRow label="Email" value={CONTACT.email} href={`mailto:${CONTACT.email}`} />
          <ContactRow label="Institution" value={CONTACT.institution} />
          <ContactRow label="University" value={CONTACT.university} />
          <ContactRow label="GitHub" value={CONTACT.github.label} href={CONTACT.github.url} />
          <ContactRow label="LinkedIn" value={CONTACT.linkedin.label} href={CONTACT.linkedin.url} />
        </div>
      </FadeIn>
    </section>
  );
}

function ContactRow({ label, value, href }) {
  const inner = href ? (
    <a
      href={href}
      target={href.startsWith("mailto") ? undefined : "_blank"}
      rel="noopener noreferrer"
      style={styles.contactLink}
      onMouseEnter={(e) => { e.target.style.color = "#0f1923"; }}
      onMouseLeave={(e) => { e.target.style.color = "#4b5563"; }}
    >
      {value}
    </a>
  ) : (
    <span style={{ color: "#4b5563" }}>{value}</span>
  );

  return (
    <div style={styles.contactRow}>
      <span style={styles.contactLabel}>{label}</span>
      {inner}
    </div>
  );
}

function SectionTitle({ children }) {
  return (
    <h2 style={styles.sectionTitle}>
      <span>{children}</span>
      <span style={styles.titleLine} />
    </h2>
  );
}

function Footer() {
  return (
    <footer style={styles.footer}>
      <p style={{ fontSize: "0.85rem", letterSpacing: "0.03em" }}>© 2026 {PROFILE.name}</p>
    </footer>
  );
}

// ═══════════════════════════════════════════════════════════════
//  MAIN APP
// ═══════════════════════════════════════════════════════════════

export default function Portfolio() {
  return (
    <div style={styles.page}>
      
      <Header />
      <Nav />
      <main style={styles.main}>
        <About />
        <Research />
        <Projects />
        <Skills />
        <Contact />
      </main>
      <Footer />
    </div>
  );
}

// ═══════════════════════════════════════════════════════════════
//  STYLES
// ═══════════════════════════════════════════════════════════════

const styles = {
  page: {
    fontFamily: "Helvetica, 'Helvetica Neue', Arial, sans-serif",
    fontWeight: 400,
    color: "#1f2937",
    background: "#fff",
    minHeight: "100vh",
  },

  // Header
  header: {
    background: "#0f1923",
    color: "#fff",
    padding: "6rem 2rem 5rem",
    textAlign: "center",
  },
  heroName: {
    fontFamily: "Helvetica, 'Helvetica Neue', Arial, sans-serif",
    fontSize: "clamp(2.5rem, 5vw, 4rem)",
    fontWeight: 600,
    marginBottom: "0.75rem",
  },
  heroTagline: {
    fontSize: "clamp(0.95rem, 1.8vw, 1.15rem)",
    fontWeight: 300,
    letterSpacing: "0.04em",
    opacity: 0.7,
  },

  // Nav
  nav: {
    position: "sticky",
    top: 0,
    zIndex: 100,
    background: "rgba(255,255,255,0.92)",
    backdropFilter: "blur(12px)",
    WebkitBackdropFilter: "blur(12px)",
    borderBottom: "1px solid rgba(0,0,0,0.06)",
    transition: "box-shadow 0.3s",
  },
  navInner: {
    maxWidth: "900px",
    margin: "0 auto",
    display: "flex",
    justifyContent: "center",
    gap: "2.5rem",
    padding: "0.9rem 1rem",
    flexWrap: "wrap",
  },
  navLink: {
    background: "none",
    border: "none",
    cursor: "pointer",
    fontFamily: "Helvetica, 'Helvetica Neue', Arial, sans-serif",
    fontSize: "0.9rem",
    fontWeight: 500,
    letterSpacing: "0.02em",
    padding: "0.25rem 0",
    transition: "all 0.25s",
  },

  // Main
  main: {
    maxWidth: "900px",
    margin: "0 auto",
    padding: "1rem 1.5rem 3rem",
  },

  // Sections
  section: {
    marginTop: "3rem",
    paddingTop: "2rem",
    borderTop: "1px solid #e5e7eb",
  },
  sectionTitle: {
    fontFamily: "Helvetica, 'Helvetica Neue', Arial, sans-serif",
    fontSize: "1.85rem",
    fontWeight: 600,
    color: "#0f1923",
    marginBottom: "1.75rem",
    display: "flex",
    alignItems: "center",
    gap: "1rem",
  },
  titleLine: {
    flex: 1,
    height: "1px",
    background: "linear-gradient(90deg, #d1d5db, transparent)",
  },

  // Body text
  bodyText: {
    fontSize: "1.05rem",
    lineHeight: 1.75,
    color: "#4b5563",
    maxWidth: "680px",
  },

  // Research
  researchGrid: {
    display: "grid",
    gridTemplateColumns: "repeat(auto-fit, minmax(260px, 1fr))",
    gap: "1.25rem",
    marginTop: "0.5rem",
  },
  researchCard: {
    background: "#fff",
    borderRadius: "2px",
    padding: "1.5rem",
    border: "1px solid #e5e7eb",
    transition: "border-color 0.3s",
    cursor: "default",
  },
  cardTitle: {
    fontFamily: "Helvetica, 'Helvetica Neue', Arial, sans-serif",
    fontSize: "1.15rem",
    fontWeight: 600,
    color: "#0f1923",
    marginBottom: "0.6rem",
  },
  cardDesc: {
    fontSize: "0.92rem",
    lineHeight: 1.65,
    color: "#6b7280",
  },

  // Projects
  projectCard: {
    background: "#fff",
    borderRadius: "2px",
    padding: "1.5rem",
    borderLeft: "3px solid #d1d5db",
    transition: "border-color 0.3s",
  },
  projectTitle: {
    fontFamily: "Helvetica, 'Helvetica Neue', Arial, sans-serif",
    fontSize: "1.15rem",
    fontWeight: 600,
    color: "#0f1923",
  },
  projectLink: {
    fontSize: "0.85rem",
    fontWeight: 500,
    letterSpacing: "0.03em",
    color: "#0f1923",
    textDecoration: "none",
    border: "1px solid #0f1923",
    borderRadius: "2px",
    padding: "0.3rem 0.85rem",
    transition: "all 0.25s",
    whiteSpace: "nowrap",
  },
  projectDesc: {
    fontSize: "0.95rem",
    lineHeight: 1.7,
    color: "#6b7280",
    margin: "0.75rem 0",
  },
  projectMeta: {
    display: "flex",
    gap: "0.6rem",
    alignItems: "baseline",
    marginTop: "0.4rem",
    flexWrap: "wrap",
  },
  metaLabel: {
    fontSize: "0.75rem",
    fontWeight: 600,
    textTransform: "uppercase",
    letterSpacing: "0.06em",
    color: "#9ca3af",
    minWidth: "60px",
  },
  metaValue: {
    fontSize: "0.88rem",
    color: "#6b7280",
  },

  // Skills
  skillCategory: {
    fontSize: "0.8rem",
    fontWeight: 600,
    textTransform: "uppercase",
    letterSpacing: "0.08em",
    color: "#9ca3af",
    marginBottom: "0.65rem",
  },
  skillRow: {
    display: "flex",
    flexWrap: "wrap",
    gap: "0.55rem",
  },
  skillPill: {
    background: "transparent",
    color: "#1f2937",
    padding: "0.35rem 0.85rem",
    borderRadius: "2px",
    border: "1px solid #d1d5db",
    fontSize: "0.85rem",
    fontWeight: 400,
    letterSpacing: "0.02em",
  },

  // Contact
  contactGrid: {
    display: "flex",
    flexDirection: "column",
    gap: "0.85rem",
  },
  contactRow: {
    display: "flex",
    gap: "1rem",
    alignItems: "baseline",
  },
  contactLabel: {
    fontSize: "0.8rem",
    fontWeight: 600,
    textTransform: "uppercase",
    letterSpacing: "0.06em",
    color: "#9ca3af",
    minWidth: "90px",
  },
  contactLink: {
    color: "#4b5563",
    textDecoration: "none",
    transition: "color 0.2s",
    borderBottom: "1px solid transparent",
  },

  // Footer
  footer: {
    textAlign: "center",
    padding: "2.5rem 1rem",
    background: "#0f1923",
    color: "rgba(255,255,255,0.5)",
    marginTop: "4rem",
  },
};
