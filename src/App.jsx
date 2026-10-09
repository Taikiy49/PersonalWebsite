import React, { useEffect, useRef, useState } from "react";
import {
  FiArrowUpRight,
  FiArrowDown,
  FiGithub,
  FiLinkedin,
  FiMail,
  FiMenu,
  FiX,
  FiPause,
  FiPlay,
  FiArrowRight,
  FiMapPin,
  FiCpu,
} from "react-icons/fi";
import "./styles/PortfolioSite.css";

const experience = [
  {
    company: "Raft",
    role: "Forward Deployed Software Engineer",
    date: "Jul 2026 — Present",
    text: "Building mission-focused software, working at the intersection of modern engineering, AI, and real-world user needs.",
    current: true,
  },
  {
    company: "Geolabs, Inc.",
    role: "Software Engineer",
    date: "Jun 2024 — Present",
    text: "From intern to full-time Software Engineer & IT Associate, now continuing part time. Architected an enterprise platform bringing AI search, OCR, file management, and inventory into one system.",
    detail:
      "Software Engineer · Part time · Jul 2026–present\nSoftware Engineer & IT Associate · Sep 2024–Jul 2026\nSoftware Engineer Intern · Jun–Sep 2024",
    current: true,
  },
  {
    company: "DataAnnotation",
    role: "AI Prompt Engineer",
    date: "Sep 2025 — Apr 2026",
    text: "Designed coding and reasoning evaluations, developed 200+ structured test cases, and analyzed model outputs for correctness, hallucinations, and recurring failures.",
  },
  {
    company: "UC Irvine",
    role: "Programming Grader & Learning Assistant",
    date: "Jan 2024 — Jun 2025",
    text: "Supported Python programming coursework for 1,000+ students. Built automation for submission review and helped students work through algorithms, testing, and debugging.",
  },
  {
    company: "National Science Foundation",
    role: "Data Science Research Intern",
    date: "Jun — Aug 2024",
    text: "Built reproducible data pipelines and evaluated predictive models using NIH health datasets, Python, SQL, and R.",
  },
];
const projects = [
  {
    title: "Turning archives into answers.",
    name: "Geolabs Software Platform",
    kind: "Enterprise software / Applied AI",
    text: "One platform for the knowledge engineers need. I brought AI-powered search, OCR pipelines, S3 file management, and inventory together, then built retrieval-augmented Q&A across 8,000+ geotechnical reports and internal handbooks.",
    tags: ["React", "Flask", "Gemini", "AWS", "SQLite"],
    type: "search",
    detail:
      "Built with React.js and Flask, deployed with AWS EC2 and Vercel. Tesseract, PyMuPDF, and regex turn scanned documents into searchable text; retrieval-augmented generation makes the archive useful in everyday workflows.",
  },
  {
    title: "Less searching. More engineering.",
    name: "Document Retrieval & OCR",
    kind: "Data engineering / Search",
    text: "Decades of scanned reports, made searchable. I built OCR and Elasticsearch pipelines for 8,000+ digitized reports and optimized indexing and queries to reduce search latency by approximately 40%.",
    tags: ["Python", "Elasticsearch", "Tesseract", "CI/CD"],
    type: "pipeline",
    detail:
      "Designed indexing strategies across 100K+ keywords and phrases. Collaborated on GitHub Actions workflows, role-based environments, and production interfaces for non-technical staff.",
  },
  {
    title: "Finding the signal in health data.",
    name: "NSF Data Science Research",
    kind: "Research / Machine learning",
    text: "Reproducible analysis at scale: NIH datasets spanning 400K+ participants and 10M+ records. I built ETL pipelines, evaluated predictive models, and communicated the results through interactive visualizations.",
    tags: ["Python", "SQL", "R", "Random Forest", "Lasso"],
    type: "research",
    detail:
      "Research explored sleep stages and women’s cardiometabolic chronic diseases. Work included data cleaning, feature extraction, cross-validation, hyperparameter tuning, and a SoCal Data Science poster presentation.",
  },
];
function Terrain({ paused }) {
  const ref = useRef(null);
  useEffect(() => {
    const canvas = ref.current;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;
    const motion = window.matchMedia("(prefers-reduced-motion: reduce)");
    let frame,
      time = 0,
      last = 0,
      visible = true,
      width = 0,
      height = 0;
    const pointer = { x: 0, y: 0 },
      smooth = { x: 0, y: 0 };
    const resize = () => {
      const rect = canvas.getBoundingClientRect();
      width = rect.width;
      height = rect.height;
      const dpr = Math.min(window.devicePixelRatio || 1, 2);
      canvas.width = width * dpr;
      canvas.height = height * dpr;
      ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
      draw();
    };
    function draw() {
      ctx.clearRect(0, 0, width, height);
      smooth.x += (pointer.x - smooth.x) * 0.04;
      smooth.y += (pointer.y - smooth.y) * 0.04;
      const scale = width / 690;
      for (let row = 0; row < 52; row++) {
        ctx.beginPath();
        for (let col = 0; col <= 95; col++) {
          const x = (col / 95 - 0.5) * 680;
          const z = (row / 51 - 0.5) * 480;
          const peak =
            135 * Math.exp(-((x - 45) ** 2 / 21000 + (z + 15) ** 2 / 15000));
          const ridge =
            58 * Math.exp(-((x + 140) ** 2 / 12000 + (z - 70) ** 2 / 24000));
          const ripple = Math.sin(x * 0.016 + z * 0.024 + time) * 8;
          const y = peak + ridge + ripple;
          const px = width * 0.53 + (x + z * 0.42) * scale + smooth.x * 12;
          const py = height * 0.58 + (z * 0.59 - y) * scale + smooth.y * 9;
          if (col === 0) ctx.moveTo(px, py);
          else ctx.lineTo(px, py);
        }
        ctx.strokeStyle = `rgba(${row % 6 === 0 ? "170,196,255" : "101,142,255"},${0.2 + (row / 51) * 0.5})`;
        ctx.lineWidth = row % 6 === 0 ? 1.3 : 0.7;
        ctx.stroke();
      }
      const nodes = [
        [-0.18, 0.05],
        [0.12, -0.12],
        [0.31, 0.15],
      ];
      nodes.forEach(([x, z], i) => {
        const px = width * (0.53 + x * 0.8 + z * 0.34) + smooth.x * 12;
        const py = height * 0.58 + z * height * 0.4 - 55;
        ctx.beginPath();
        ctx.arc(px, py, 3, 0, Math.PI * 2);
        ctx.fillStyle = "#d7e4ff";
        ctx.fill();
        ctx.beginPath();
        ctx.arc(px, py, 9 + Math.sin(time * 1.5 + i) * 2, 0, Math.PI * 2);
        ctx.strokeStyle = "rgba(153,185,255,.35)";
        ctx.stroke();
      });
    }
    function tick(now) {
      if (visible && !document.hidden && now - last > 32) {
        time += 0.008;
        draw();
        last = now;
      }
      frame = requestAnimationFrame(tick);
    }
    const onMove = (e) => {
      const r = canvas.getBoundingClientRect();
      pointer.x = (e.clientX - r.left) / r.width - 0.5;
      pointer.y = (e.clientY - r.top) / r.height - 0.5;
    };
    const onLeave = () => {
      pointer.x = 0;
      pointer.y = 0;
    };
    const observer = new IntersectionObserver(([entry]) => {
      visible = entry.isIntersecting;
    });
    observer.observe(canvas);
    const onMotionChange = () => {
      cancelAnimationFrame(frame);
      draw();
      if (!paused && !motion.matches) frame = requestAnimationFrame(tick);
    };
    motion.addEventListener("change", onMotionChange);
    const ro = new ResizeObserver(resize);
    ro.observe(canvas);
    canvas.addEventListener("pointermove", onMove);
    canvas.addEventListener("pointerleave", onLeave);
    resize();
    if (!paused && !motion.matches) frame = requestAnimationFrame(tick);
    return () => {
      cancelAnimationFrame(frame);
      motion.removeEventListener("change", onMotionChange);
      ro.disconnect();
      observer.disconnect();
      canvas.removeEventListener("pointermove", onMove);
      canvas.removeEventListener("pointerleave", onLeave);
    };
  }, [paused]);
  return <canvas ref={ref} className="terrain" aria-hidden="true" />;
}
function ProjectVisual({ type }) {
  if (type === "search")
    return (
      <div
        role="img"
        className="visual search-visual"
        aria-label="Conceptual illustration of the document search workflow"
      >
        <div className="mini-app">
          <div className="mini-title">
            <span className="mini-logo">g.</span> Geolabs{" "}
            <span className="mini-dots">•••</span>
          </div>
          <div className="mini-body">
            <div className="mini-sidebar">
              <span>Workspace</span>
              <b>Knowledge</b>
              <span>Documents</span>
              <span>Inventory</span>
            </div>
            <div className="mini-main">
              <span className="mini-caption">Your knowledge, connected.</span>
              <div className="search-query">
                Search across your engineering archive <FiArrowRight />
              </div>
              <div className="doc-lines">
                <i />
                <i />
                <i />
              </div>
              <div className="search-answer">
                <span className="answer-mark">
                  <FiCpu aria-hidden="true" />
                </span>
                <div>
                  <b>From documents to decisions</b>
                  <p>Search. Retrieve. Understand.</p>
                  <div className="source-pills">
                    <span>Reports</span>
                    <span>Handbooks</span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
        <span className="visual-note">Concept visualization</span>
      </div>
    );
  if (type === "pipeline")
    return (
      <div
        role="img"
        className="visual pipeline-visual"
        aria-label="Conceptual OCR pipeline from scanned reports to searchable knowledge"
      >
        <div className="pipeline">
          <div className="paper-stack">
            <div />
            <div />
            <div>
              <span />
              <span />
              <span />
              <span />
            </div>
          </div>
          <div className="signal-line">
            <i />
          </div>
          <div className="process-node">
            OCR<span>Text extraction</span>
          </div>
          <div className="signal-line">
            <i />
          </div>
          <div className="result-node">
            <svg viewBox="0 0 60 60" aria-hidden="true">
              <circle cx="25" cy="25" r="14" />
              <path d="m36 36 14 14" />
            </svg>
            <span>Searchable knowledge</span>
          </div>
        </div>
        <div className="pipeline-meta">
          <span>Scanned reports</span>
          <span>Structured text</span>
          <span>Indexed & ready</span>
        </div>
        <span className="visual-note">Concept visualization</span>
      </div>
    );
  return (
    <div
      role="img"
      className="visual research-visual"
      aria-label="Conceptual visualization of research data"
    >
      <svg className="research-chart" viewBox="0 0 560 280" aria-hidden="true">
        {[50, 100, 150, 200, 250].map((y) => (
          <path key={y} d={`M30 ${y} H530`} className="chart-grid" />
        ))}
        {Array.from({ length: 55 }, (_, i) => (
          <circle
            key={i}
            cx={40 + i * 9}
            cy={210 - i * 2.3 + Math.sin(i * 2.7) * 46}
            r={i % 4 === 0 ? 4 : 2}
            className="chart-point"
            style={{ animationDelay: `${i * 0.035}s` }}
          />
        ))}
        <path
          d="M35 212 C120 214 150 165 240 159 S350 103 420 98 S480 67 530 55"
          className="chart-curve"
        />
      </svg>
      <div className="research-caption">
        <span>Data. Patterns. Understanding.</span>
        <span>Python / SQL / R</span>
      </div>
      <span className="visual-note">
        Concept visualization · not research results
      </span>
    </div>
  );
}
function App() {
  const [menu, setMenu] = useState(false);
  const menuRef = useRef(null);
  const [paused, setPaused] = useState(false);
  const [active, setActive] = useState("");
  useEffect(() => {
    const reveals = new IntersectionObserver(
      (entries) =>
        entries.forEach((e) => {
          if (e.isIntersecting) {
            e.target.classList.add("in-view");
            reveals.unobserve(e.target);
          }
        }),
      { threshold: 0.12 },
    );
    document
      .querySelectorAll("[data-reveal]")
      .forEach((el) => reveals.observe(el));
    const sections = new IntersectionObserver(
      (entries) =>
        entries.forEach((e) => {
          if (e.isIntersecting) setActive(e.target.id);
        }),
      { rootMargin: "-20% 0px -50% 0px" },
    );
    document
      .querySelectorAll("main > section[id]")
      .forEach((el) => sections.observe(el));
    const escape = (e) => {
      if (e.key === "Escape") {
        setMenu(false);
        menuRef.current?.focus();
      }
    };
    window.addEventListener("keydown", escape);
    return () => {
      reveals.disconnect();
      sections.disconnect();
      window.removeEventListener("keydown", escape);
    };
  }, []);
  const navClick = () => setMenu(false);
  return (
    <div className={`site ${paused ? "motion-paused" : ""}`}>
      <a className="skip-link" href="#main">
        Skip to content
      </a>
      <header className="header">
        <a href="#home" className="wordmark" aria-label="Taiki Yamashita home">
          taiki<span>.</span>
        </a>
        <nav
          className={menu ? "nav is-open" : "nav"}
          id="primary-nav"
          aria-label="Main navigation"
        >
          {[
            ["work", "Work"],
            ["experience", "Experience"],
            ["about", "About"],
          ].map(([id, label]) => (
            <a
              key={id}
              href={`#${id}`}
              onClick={navClick}
              aria-current={active === id ? "location" : undefined}
            >
              {label}
            </a>
          ))}
          <a href="mailto:taikiy49@gmail.com" className="nav-contact">
            Let’s talk <FiArrowUpRight />
          </a>
        </nav>
        <button
          ref={menuRef}
          className="menu-toggle"
          aria-expanded={menu}
          aria-controls="primary-nav"
          aria-label={menu ? "Close navigation" : "Open navigation"}
          onClick={() => setMenu(!menu)}
        >
          {menu ? <FiX /> : <FiMenu />}
        </button>
      </header>
      <main id="main">
        <section className="hero" id="home">
          <div className="hero-copy">
            <div className="hero-intro">
              <img
                className="profile-avatar"
                src="/images/profile-small.webp"
                width="64"
                height="64"
                alt="Taiki Yamashita"
                fetchPriority="high"
              />{" "}
              Taiki Yamashita <span className="intro-rule" /> Software engineer
            </div>
            <h1>
              <span>From complexity.</span>
              <span>To clarity.</span>
            </h1>
            <p className="hero-description">
              I build software that makes the complicated useful. Full-stack
              products, applied AI, and tools that solve problems in the real
              world.
            </p>
            <div className="hero-actions">
              <a className="button button-primary" href="#work">
                Explore my work <FiArrowDown />
              </a>
              <a
                className="text-link"
                href="https://github.com/Taikiy49"
                target="_blank"
                rel="noreferrer"
              >
                GitHub <FiArrowUpRight />
              </a>
            </div>
            <div className="current-role">
              <span>Currently</span>
              <p>
                Forward Deployed Software Engineer at <b>Raft</b>
                <br />
                Software Engineer at <b>Geolabs</b>
              </p>
            </div>
          </div>
          <div className="hero-art">
            <div className="art-halo" />
            <Terrain paused={paused} />
            <div className="art-label">
              <span className="art-cross" aria-hidden="true">
                +
              </span>
              <span>
                Unstructured world.
                <br />
                Engineered into clarity.
              </span>
            </div>
            <button
              className="art-motion"
              onClick={() => setPaused(!paused)}
              aria-label={paused ? "Resume animations" : "Pause animations"}
              aria-pressed={paused}
            >
              {paused ? <FiPlay /> : <FiPause />}
            </button>
            <div className="art-coordinate">
              21.3099° N<br />
              157.8581° W
            </div>
          </div>
          <div className="hero-bottom">
            <span>
              <FiMapPin /> Based in Honolulu, Hawaiʻi
            </span>
            <span>
              Scroll to explore <FiArrowDown />
            </span>
          </div>
        </section>
        <div className="credentials">
          <span>Building across disciplines</span>
          <div>
            <b>Raft</b>
            <b>
              Geolabs<span>, Inc.</span>
            </b>
            <b>UC Irvine</b>
            <b>
              NSF<span> Research</span>
            </b>
          </div>
        </div>
        <section id="work" className="work-section section-wrap">
          <div className="section-heading" data-reveal>
            <h2>
              Built for the
              <br />
              real world.
            </h2>
            <p>
              Software is only as good as the problem it solves. Here’s where
              I’ve put that into practice.
            </p>
          </div>
          {projects.map((project, i) => (
            <article
              className={`project project-${project.type}`}
              key={project.name}
              data-reveal
            >
              <div className="project-art">
                <ProjectVisual type={project.type} />
              </div>
              <div className="project-copy">
                <p className="project-kind">{project.kind}</p>
                <h3>{project.title}</h3>
                <p className="project-name">{project.name}</p>
                <p className="project-description">{project.text}</p>
                <ul className="tags" aria-label="Technologies">
                  {project.tags.map((tag) => (
                    <li key={tag}>{tag}</li>
                  ))}
                </ul>
                <details>
                  <summary>
                    Behind the build <FiArrowUpRight />
                  </summary>
                  <p>{project.detail}</p>
                </details>
              </div>
            </article>
          ))}
          <a
            className="text-link more-work"
            href="https://github.com/Taikiy49?tab=repositories"
            target="_blank"
            rel="noreferrer"
          >
            More experiments on GitHub <FiArrowUpRight />
          </a>
        </section>
        <section id="experience" className="experience-section section-wrap">
          <div className="section-heading" data-reveal>
            <h2>
              Always building.
              <br />
              Always learning.
            </h2>
            <p>
              From teaching Python to deploying mission-focused software. Each
              chapter adds a new way to solve a problem.
            </p>
          </div>
          <div className="experience-list">
            {experience.map((job) => (
              <article className="experience-row" key={job.company} data-reveal>
                <div className="job-date">
                  {job.date}
                  {job.current && <span className="current-pill">Current</span>}
                </div>
                <div className="job-body">
                  <h3>
                    {job.company}
                    <span>{job.role}</span>
                  </h3>
                  <p>{job.text}</p>
                  {job.detail && (
                    <details>
                      <summary>
                        Role progression <FiArrowUpRight />
                      </summary>
                      <p className="role-detail">{job.detail}</p>
                    </details>
                  )}
                </div>
              </article>
            ))}
          </div>
        </section>
        <section id="about" className="about-section section-wrap">
          <div className="about-photo" data-reveal>
            <img
              src="/images/about.webp"
              width="1000"
              height="1000"
              loading="lazy"
              alt="Taiki Yamashita wearing a black kimono at a shrine"
            />
            <span>Outside the editor.</span>
          </div>
          <div className="about-copy" data-reveal>
            <h2>
              Engineer by trade.
              <br />
              Curious by default.
            </h2>
            <p>
              I’m Taiki, a software engineer based in Honolulu and a UC Irvine
              Computer Science graduate. I like taking an idea all the way from
              the first conversation to something people can actually use.
            </p>
            <p>
              My work spans full-stack development, cloud infrastructure, data
              engineering, and AI. What ties it together is working closely with
              people, understanding the problem, and making their day a little
              easier.
            </p>
            <p>
              Beyond the screen: golf, pickleball, time at the gym, travel, and
              a soundtrack that usually includes Ado.
            </p>
            <div className="skills-block">
              <h3>My working toolkit</h3>
              <p>
                React & JavaScript / Python & Flask / SQL / AWS /
                Retrieval-augmented generation / OCR / GitHub Actions
              </p>
            </div>
            <a
              className="text-link"
              href="https://www.linkedin.com/in/taikiyamashita"
              target="_blank"
              rel="noreferrer"
            >
              The full story on LinkedIn <FiArrowUpRight />
            </a>
          </div>
        </section>
        <section id="contact" className="contact-section section-wrap">
          <div className="contact-top" data-reveal>
            <span className="contact-orbit" aria-hidden="true">
              <FiArrowUpRight />
            </span>
            <h2>
              Good things start
              <br />
              with a conversation.
            </h2>
          </div>
          <div className="contact-bottom">
            <p>
              Have a problem worth solving,
              <br />
              an idea to explore, or just want to say hello?
            </p>
            <a className="contact-email" href="mailto:taikiy49@gmail.com">
              taikiy49@gmail.com <FiArrowUpRight />
            </a>
          </div>
        </section>
      </main>
      <footer className="footer">
        <a className="wordmark" href="#home">
          taiki<span>.</span>
        </a>
        <span>© {new Date().getFullYear()} Taiki Yamashita</span>
        <div className="footer-social">
          <a
            href="https://github.com/Taikiy49"
            target="_blank"
            rel="noreferrer"
            aria-label="GitHub"
          >
            <FiGithub />
          </a>
          <a
            href="https://www.linkedin.com/in/taikiyamashita"
            target="_blank"
            rel="noreferrer"
            aria-label="LinkedIn"
          >
            <FiLinkedin />
          </a>
          <a href="mailto:taikiy49@gmail.com" aria-label="Email Taiki">
            <FiMail />
          </a>
          <button
            onClick={() => setPaused(!paused)}
            aria-label={paused ? "Resume animations" : "Pause animations"}
            aria-pressed={paused}
          >
            {paused ? <FiPlay /> : <FiPause />}
          </button>
        </div>
      </footer>
    </div>
  );
}
export default App;
