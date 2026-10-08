import { useState, useEffect } from 'react'
import { createPortal } from 'react-dom'
import './App.css'
import WGUPSDemo from './WGUPSDemo.jsx'
import { SiPython, SiReact, SiJavascript, SiHtml5, SiGit, SiLinux, SiVite, SiCplusplus, SiNodedotjs, SiDocker, SiTerraform } from 'react-icons/si'
import { FaDatabase, FaJava, FaAws, FaTerminal } from 'react-icons/fa'

// ── EMAIL LINK ────────────────────────────────────────────────────────────────
const EMAIL = 'elliottph2772@gmail.com'

function EmailLink({ className, children = 'Email', onAfterClick, toastPosition = 'bottom' }) {
  const [toast, setToast] = useState(false)

  async function handleClick() {
    try {
      await navigator.clipboard.writeText(EMAIL)
    } catch { /* clipboard unavailable */ }
    onAfterClick?.()

    let mailClientOpened = false
    const onBlur = () => { mailClientOpened = true }
    const onHide = () => { if (document.visibilityState === 'hidden') mailClientOpened = true }

    window.addEventListener('blur', onBlur)
    document.addEventListener('visibilitychange', onHide)

    setTimeout(() => {
      window.removeEventListener('blur', onBlur)
      document.removeEventListener('visibilitychange', onHide)
      if (!mailClientOpened) {
        setToast(true)
        setTimeout(() => setToast(false), 5500)
      }
    }, 500)
  }

  return (
    <>
      <a href={`mailto:${EMAIL}`} className={className} onClick={handleClick}>
        {children}
      </a>
      {toast && createPortal(
        <div className={`email-toast${toastPosition === 'top' ? ' email-toast--top' : ''}`}>
          <div className="email-toast-title">Email Copied</div>
          <p className="email-toast-body">Go to your email service of choice and paste it.</p>
        </div>,
        document.body
      )}
    </>
  )
}

// ── DATA ──────────────────────────────────────────────────────────────────────

const WGU_TOTAL_CUS = 122

const courses = [
  // ── General Education
  { name: 'Natural Science Lab',                                   cus: 2,  grade: 'Pass', term: 'Gen Ed'      },
  { name: 'Introduction to Physical and Human Geography',          cus: 3,  grade: 'Pass', term: 'Gen Ed'      },
  { name: 'Global Arts and Humanities',                            cus: 3,  grade: 'Pass', term: 'Gen Ed'      },
  { name: 'Health, Fitness, and Wellness',                         cus: 4,  grade: 'Pass', term: 'Gen Ed'      },
  { name: 'Composition: Successful Self-Expression',               cus: 3,  grade: 'Pass', term: 'Gen Ed'      },
  { name: 'Introduction to Communication: Connecting with Others', cus: 3,  grade: 'Pass', term: 'Gen Ed'      },
  { name: 'American Politics and the US Constitution',             cus: 3,  grade: 'Pass', term: 'Gen Ed'      },
  // ── Core IT / CS
  { name: 'IT Leadership Foundations',                             cus: 3,  grade: 'Pass', term: 'Core'        },
  { name: 'Introduction to IT',                                    cus: 4,  grade: 'Pass', term: 'Core'        },
  { name: 'Network and Security – Foundations',                    cus: 3,  grade: 'Pass', term: 'Core'        },
  { name: 'Web Development Foundations',                           cus: 3,  grade: 'Pass', term: 'Core'        },
  { name: 'Version Control',                                       cus: 1,  grade: 'Pass', term: 'Core'        },
  { name: 'Linux Foundations',                                     cus: 3,  grade: 'Pass', term: 'Core'        },
  { name: 'Fundamentals of Information Security',                  cus: 3,  grade: 'Pass', term: 'Core'        },
  { name: 'Computer Architecture',                                 cus: 3,  grade: 'Pass', term: 'Core'        },
  { name: 'Operating Systems for Computer Scientists',             cus: 3,  grade: 'Pass', term: 'Core'        },
  { name: 'Introduction to Computer Science',                      cus: 4,  grade: 'Pass', term: 'Core'        },
  { name: 'Software Engineering',                                  cus: 4,  grade: 'Pass', term: 'Core'        },
  { name: 'Software Design and Quality Assurance',                 cus: 4,  grade: 'Pass', term: 'Core'        },
  { name: 'Introduction to AI for Computer Scientists',            cus: 2,  grade: 'Pass', term: 'Core'        },
  { name: 'Business of IT – Applications',                         cus: 4,  grade: 'Pass', term: 'Core'        },
  // ── Math
  { name: 'Applied Probability and Statistics',                    cus: 3,  grade: 'Pass', term: 'Math'        },
  { name: 'Calculus I',                                            cus: 4,  grade: 'Pass', term: 'Math'        },
  { name: 'Discrete Mathematics I',                                cus: 4,  grade: 'Pass', term: 'Math'        },
  { name: 'Discrete Mathematics II',                               cus: 4,  grade: 'Pass', term: 'Math'        },
  // ── Programming
  { name: 'Scripting and Programming – Foundations',               cus: 3,  grade: 'Pass', term: 'Programming' },
  { name: 'Scripting and Programming – Applications',              cus: 4,  grade: 'Pass', term: 'Programming' },
  { name: 'Java Fundamentals',                                     cus: 3,  grade: 'Pass', term: 'Programming' },
  { name: 'Java Frameworks',                                       cus: 3,  grade: 'Pass', term: 'Programming' },
  { name: 'Back-End Programming',                                  cus: 3,  grade: 'Pass', term: 'Programming' },
  { name: 'Advanced Java',                                         cus: 3,  grade: 'Pass', term: 'Programming' },
  // ── Data
  { name: 'Data Management – Foundations',                         cus: 3,  grade: 'Pass', term: 'Data'        },
  { name: 'Data Management – Applications',                        cus: 4,  grade: 'Pass', term: 'Data'        },
  { name: 'Data Structures and Algorithms I',                      cus: 4,  grade: 'Pass', term: 'Data'        },
  { name: 'Data Structures and Algorithms II',                     cus: 4,  grade: 'Pass', term: 'Data'        },
]

const completedCUs = courses.reduce((sum, c) => sum + c.cus, 0)

const projects = [
  {
  id: 1,
  title: 'WGUPS Routing System',
  tag: 'Python · Algorithms',
  description: 'A parcel delivery simulation for Salt Lake City using a nearest-neighbor routing algorithm, a custom chained hash table keyed by package ID, and a singly linked list per-truck route. Includes a supervisor UI with time-windowed status queries.',
  highlights: [
    'Hash Tables & Linked Lists',
    'Nearest-neighbor O(n²) optimizer',
    'Package Filtering logic',
    'Time-windowed delivery status',
  ],
  color: '#7fffb2',
  details: [
    {
      label: 'Simulation',
      component: <WGUPSDemo />,
    },
    {
      label: 'The Problem',
      content: 'Design a routing algorithm for three trucks delivering 40 packages across Salt Lake City under a set of constraints — package deadlines, truck capacity limits, delayed arrivals, and a wrong address that corrects itself mid-day. Total mileage had to stay under 140 miles.',
    },
    {
      label: 'Data Structures',
      content: 'Built a chained hash table from scratch keyed by package ID for O(1) average lookup. Each truck route is stored as a singly linked list, allowing efficient insertion and traversal without relying on any standard library containers.',
    },
    {
      label: 'Routing Algorithm',
      content: 'Implemented a nearest-neighbor greedy algorithm that at each step selects the closest undelivered package. Consistently produced routes under the 140 mile requirement, running in O(n²) time.',
    },
    {
      label: 'Supervisor UI',
      content: 'A command line interface lets the user enter any time during the day and see the exact status of every package at that moment — at the hub, en route, or delivered — along with total mileage across all trucks.',
    },
  ],
},
  {
    id: 2,
    title: 'Nocturne — D&D Game Master Console',
    tag: 'Claude AI · JavaScript · Supabase',
    description:
      'A real-time virtual tabletop for running Dungeons & Dragons sessions, with an AI-assisted game master powered by Claude for live narration and world-building. The GM drives a shared campaign while up to four players claim character slots from their own devices — HP, dice rolls, inventory, initiative, and notes all sync live.',
    highlights: [
      'AI-assisted GM narration (Claude)',
      'Real-time multiplayer sync via Supabase',
      'Claimable player character sheets',
      'HP, dice, initiative & inventory tracking',
    ],
    color: '#b47cff',
  },
  {
    id: 3,
    title: 'ScrimCoach',
    tag: 'React · Supabase · Tailwind',
    description:
      'A full-stack team-management and coaching platform for competitive esports teams — roster management, scheduling, and review tools in one place. Built with React and Supabase. (Details kept light while in active development.)',
    highlights: [
      'Full-stack React + Supabase',
      'Discord OAuth sign-in',
      'Real-time team & roster data',
      'Multi-game support',
    ],
    color: '#ff8a3d',
  },
  {
    id: 4,
    title: 'Secure Serverless File Vault',
    tag: 'AWS · React · Terraform',
    description:
      'An encrypted file-storage web app built on AWS — a self-directed learning project to develop cloud architecture and security fundamentals alongside planned AWS certification study.',
    highlights: [
      'Encrypted file storage',
      'Serverless AWS architecture',
      'Infrastructure as Code (Terraform)',
      'In progress',
    ],
    color: '#ff5c8a',
  },
  {
    id: 5,
    title: 'Portfolio Website',
    tag: 'React · Vite',
    description:
      'This site — built with React & Vite. Reactive graduation progress tracker, multi-tab routing, and Deployment.',
    highlights: [
      'Reactive CU progress bar',
      'Tab-based SPA routing',
      'Deployed via Vercel',
    ],
    color: '#5b8fff',
  },
]

const techStack = [
  { name: 'React',       Icon: SiReact,       color: '#61dafb' },
  { name: 'Java',        Icon: FaJava,        color: '#f89820' },
  { name: 'Docker',      Icon: SiDocker,      color: '#2496ed' },
  { name: 'Python',      Icon: SiPython,      color: '#3776ab' },
  { name: 'JavaScript',  Icon: SiJavascript,  color: '#f7df1e' },
  { name: 'HTML & CSS',  Icon: SiHtml5,       color: '#e34f26' },
  { name: 'SQL',         Icon: FaDatabase,    color: '#4479a1' },
  { name: 'Git',         Icon: SiGit,         color: '#f05032' },
  { name: 'Linux',       Icon: SiLinux,       color: '#fcc624' },
  { name: 'Vite',        Icon: SiVite,        color: '#646cff' },
  { name: 'C++',         Icon: SiCplusplus,   color: '#00599c' },
  { name: 'Node.js',     Icon: SiNodedotjs,   color: '#339933' },
  { name: 'AWS',         Icon: FaAws,         color: '#ff9900' },
  { name: 'Terraform',   Icon: SiTerraform,   color: '#7b42bc' },
  { name: 'PowerShell',  Icon: FaTerminal,    color: '#5391fe' },
]

const certifications = [
  { name: 'Linux Foundations',                   issuer: 'WGU · Linux Foundation', status: 'earned'  },
  { name: 'ITIL 4 Foundation',                   issuer: 'WGU · Axelos',           status: 'earned'  },
  { name: 'AWS Certified Cloud Practitioner',    issuer: 'Amazon Web Services',    status: 'planned' },
  { name: 'CompTIA Security+',                   issuer: 'CompTIA',                status: 'planned' },
  { name: 'AWS Solutions Architect – Associate', issuer: 'Amazon Web Services',    status: 'planned' },
]

// ── PAGES ─────────────────────────────────────────────────────────────────────

function HomePage() {
  const pct = Math.round((completedCUs / WGU_TOTAL_CUS) * 100)
  const [displayPct, setDisplayPct] = useState(0)
  const [labelPos, setLabelPos] = useState(0)

  useEffect(() => {
    let frame
    let startTime = null
    const duration = 4000
    function easeOut(t) { return t === 1 ? 1 : 1 - Math.pow(2, -10 * t) }
    const tick = (timestamp) => {
      if (!startTime) startTime = timestamp
      const t = Math.min((timestamp - startTime) / duration, 1)
      setDisplayPct(Math.round(easeOut(t) * pct))
      if (t < 1) frame = requestAnimationFrame(tick)
    }
    const timeout = setTimeout(() => { frame = requestAnimationFrame(tick) }, 300)
    return () => { clearTimeout(timeout); cancelAnimationFrame(frame) }
  }, [pct])

  useEffect(() => {
    const t = setTimeout(() => setLabelPos(pct), 50)
    return () => clearTimeout(t)
  }, [pct])

  useEffect(() => {
    const els = document.querySelectorAll('.reveal')
    const observer = new IntersectionObserver(
      entries => entries.forEach(e => { if (e.isIntersecting) e.target.classList.add('visible') }),
      { threshold: 0.12 }
    )
    els.forEach(el => observer.observe(el))
    return () => observer.disconnect()
  }, [])

  return (
    <div className="page home-page">
      <div className="hero">
        <div className="hero-tag">B.S. Computer Science · WGU · IT Technician @ Nemsys</div>
        <h1 className="hero-name">Elliott Hudson</h1>
      </div>

      <div className="progress-section">
        <div className="progress-header">
          <span className="progress-label">Graduation Progress — {completedCUs} of {WGU_TOTAL_CUS} CREDITS COMPLETED</span>
        </div>
        <div className="progress-track">
          <div className="progress-fill" style={{ width: `${labelPos}%` }}>
            <span className="progress-glow" />
          </div>
          <span className="progress-pct-follow" style={{ left: `${labelPos}%` }}>{displayPct}%</span>
        </div>
      </div>

      <div className="tech-section">
        <p className="tech-section-sub">
          Tech Stack I am familiar with:
        </p>
        <div className="tech-grid">
          {techStack.map(({ name, Icon, color }, i) => (
            <div className="tech-card" key={name} style={{ animationDelay: `${i * 60}ms`, '--icon-color': color }}>
              <Icon size={52} color={color} />
              <div className="tech-name">{name}</div>
            </div>
          ))}
        </div>
      </div>

      <div className="home-about">
        {[
          { label: 'Currently',      text: 'B.S. Computer Science student at WGU, graduating December 2026. Focused full-time on finishing my degree after a 4-month IT support internship at Nemsys, a managed service provider.' },
          { label: 'Interests',      text: 'Coding, Gaming, PC hardware, AI Integration and Cloud Services.' },
          { label: 'Looking For',    text: 'Junior software engineering or cloud roles where I can contribute real work while finishing my degree. Long-term focus on cloud engineering, security, DevOps & Software Development.' },
        ].map((b, i) => (
          <div className="about-block reveal" key={i} style={{ transitionDelay: `${i * 0.13}s` }}>
            <div className="about-block-label">{b.labelNode ?? b.label}</div>
            <p>{b.text}</p>
          </div>
        ))}
      </div>

      <div className="certs-section reveal" style={{ transitionDelay: '0.3s' }}>
        <p className="tech-section-sub">Certifications</p>
        <div className="certs-grid">
          {certifications.map((c) => (
            <div className={`cert-card cert-card--${c.status}`} key={c.name}>
              <div className="cert-status">{c.status === 'earned' ? 'Earned' : 'Planned'}</div>
              <div className="cert-name">{c.name}</div>
              <div className="cert-issuer">{c.issuer}</div>
            </div>
          ))}
        </div>
      </div>

      <footer className="home-footer reveal" style={{ transitionDelay: '0.52s' }}>
        <EmailLink className="about-link" />
        <a href="https://github.com/elliottph2772" className="about-link" target="_blank" rel="noreferrer">GitHub</a>
        <a href="https://linkedin.com/in/elliotthudson" className="about-link" target="_blank" rel="noreferrer">LinkedIn</a>
      </footer>
    </div>
  )
}

function ProjectDetail({ project, onBack }) {
  return (
    <div className="page project-detail-page" style={/** @type {React.CSSProperties} */({ '--accent': project.color })}>
      <button className="back-btn" onClick={onBack}>← Projects</button>
      <div className="detail-header">
        <div className="detail-tag">{project.tag}</div>
        <h2 className="detail-title">{project.title}</h2>
      </div>
      <div className="detail-body">
        <div className="detail-section">
          <div className="detail-section-label">Overview</div>
          <p>{project.description}</p>
        </div>
        <div className="detail-section">
          <div className="detail-section-label">Key Features</div>
          <ul className="detail-highlights">
            {project.highlights.map((h, i) => <li key={i}>{h}</li>)}
          </ul>
        </div>
        {project.details && project.details.map((block, i) => (
          <div className="detail-section" key={i}>
            <div className="detail-section-label">{block.label}</div>
            {block.component
              ? <div style={{ gridColumn: '1 / -1' }}>{block.component}</div>
              : <p>{block.content}</p>
            }
          </div>
        ))}
      </div>
    </div>
  )
}

function ProjectsPage({ selected, setSelected }) {
  if (selected) {
    return <ProjectDetail project={selected} onBack={() => setSelected(null)} />
  }

  return (
    <div className="page projects-page">
      <div className="page-header">
        <h2>Projects</h2>
        <p>Click on a project for an expanded demonstration.</p>
      </div>
      <div className="projects-list">
        {projects.map((p) => (
          <div
            className="project-card"
            key={p.id}
            style={/** @type {React.CSSProperties} */({ '--accent': p.color, cursor: 'pointer' })}
            onClick={() => setSelected(p)}
          >
            <div className="project-top">
              <div>
                <div className="project-tag">{p.tag}</div>
                <h3 className="project-title">{p.title}</h3>
              </div>
              <div className="project-num">0{p.id}</div>
            </div>
            <p className="project-desc">{p.description}</p>
            <ul className="project-highlights">
              {p.highlights.map((h, i) => <li key={i}>{h}</li>)}
            </ul>
          </div>
        ))}
      </div>
    </div>
  )
}

const CAT_COLORS = {
  'Gen Ed':      '#ffd97f',
  'Core':        '#7fffb2',
  'Math':        '#ff9f7f',
  'Programming': '#5b8fff',
  'Data':        '#d97fff',
}

function CoursesPage() {
  return (
    <div className="page courses-page">
      <div className="page-header">
        <h2>Courses</h2>
        <p>{completedCUs} of {WGU_TOTAL_CUS} CUs completed</p>
      </div>
      <div className="courses-grid">
        {courses.map((c, i) => (
          <div className="course-card" key={i} style={/** @type {React.CSSProperties} */({ animationDelay: `${i * 60}ms`, '--cat-color': CAT_COLORS[c.term] })}>
            <div className="course-term" data-cat={c.term}>{c.term}</div>
            <div className="course-name">{c.name}</div>
            <div className="course-footer">
              <span className="course-cus">{c.cus} CUs</span>
              <span className="badge pass">{c.grade}</span>
            </div>
          </div>
        ))}
        <div className="course-card course-remaining">
          <div className="course-term">Remaining</div>
          <div className="course-name">{WGU_TOTAL_CUS - completedCUs} CUs to graduation</div>
          <div className="course-footer">
            <span className="course-cus">{WGU_TOTAL_CUS} total</span>
            <span className="badge upcoming">In Progress</span>
          </div>
        </div>
      </div>
    </div>
  )
}

function ResumePage() {
  return (
    <div className="page resume-page">
      <div className="page-header">
        <h2>Resume</h2>
      </div>
      <div className="resume-body">
        <section className="resume-section">
          <h3 className="resume-section-title">Work Experience</h3>
          <div className="resume-entry">
            <div className="resume-entry-header">
              <span className="resume-entry-title">Technician Intern — Nemsys (Managed Service Provider)</span>
              <span className="resume-entry-date">June 2026 – October 2026</span>
            </div>
            <div className="resume-entry-sub">4-month internship · left on good terms to focus on school full-time and finish my degree faster</div>
            <ul className="resume-bullets">
              <li>Advanced from a three-month internship track to Tier 1 technician responsibilities in under one month, independently handling the majority of the Tier 1 queue after two months.</li>
              <li>Used ConnectWise Automate (RMM) and ScreenConnect for remote monitoring, patch management, scripted remediation, and remote session support across managed endpoints.</li>
              <li>Documented all work in ConnectWise PSA, maintained client environments in IT Glue, and managed credentials through Passportal following least-privilege and audit-trail practices.</li>
              <li>Balanced a part-time technician workload alongside full-time coursework at a compliance-focused MSP.</li>
            </ul>
          </div>
        </section>

        <section className="resume-section">
          <h3 className="resume-section-title">Projects</h3>
          <div className="resume-entry">
            <div className="resume-entry-header">
              <span className="resume-entry-title">WGUPS Routing System</span>
              <span className="resume-entry-date">2025</span>
            </div>
            <div className="resume-entry-tags">Python · Data Structures</div>
            <p className="resume-entry-detail">A parcel-delivery simulation handling daily package intake for a delivery warehouse. Imports package and address data from CSV, stores packages in a custom hash table and per-truck linked lists, and generates routes using a distance matrix and nearest-neighbor algorithm under tight deadline and mileage constraints. Includes an interactive in-browser demo.</p>
          </div>
          <div className="resume-entry">
            <div className="resume-entry-header">
              <span className="resume-entry-title">Nocturne — D&amp;D Game Master Console</span>
              <span className="resume-entry-date">In Progress</span>
            </div>
            <div className="resume-entry-tags">Claude AI · JavaScript · Supabase</div>
            <p className="resume-entry-detail">A real-time virtual tabletop for running Dungeons &amp; Dragons sessions, with an AI-assisted game master powered by Claude for live narration and world-building. The game master drives a shared campaign while up to four players claim character slots from their own devices — HP, dice rolls, inventory, initiative, and notes stay in sync live through Supabase realtime, with campaign-code access control.</p>
          </div>
          <div className="resume-entry">
            <div className="resume-entry-header">
              <span className="resume-entry-title">ScrimCoach</span>
              <span className="resume-entry-date">In Progress</span>
            </div>
            <div className="resume-entry-tags">React · Supabase · Tailwind</div>
            <p className="resume-entry-detail">A full-stack team-management and coaching platform for competitive esports teams — roster management, scheduling, and review tools with Discord OAuth sign-in and real-time data via Supabase. (Details kept light while in active development.)</p>
          </div>
          <div className="resume-entry">
            <div className="resume-entry-header">
              <span className="resume-entry-title">Secure Serverless File Vault</span>
              <span className="resume-entry-date">In Progress</span>
            </div>
            <div className="resume-entry-tags">AWS · React · Terraform</div>
            <p className="resume-entry-detail">Building an encrypted file-storage web app on AWS as a self-directed learning project to develop cloud architecture and security fundamentals alongside planned AWS certification study.</p>
          </div>
          <div className="resume-entry">
            <div className="resume-entry-header">
              <span className="resume-entry-title">Personal Portfolio — eternalhalflife.dev</span>
              <span className="resume-entry-date">2025</span>
            </div>
            <div className="resume-entry-tags">React · Vite · Three.js · Vercel</div>
            <p className="resume-entry-detail">Designed, built, and deployed a personal portfolio site featuring a Three.js 3D scene, an animated degree-progress tracker, an interactive routing terminal simulation, and a project grid. Managed the full deployment pipeline end to end: domain registration, DNS, hosting, and security header configuration.</p>
          </div>
        </section>

        <section className="resume-section">
          <h3 className="resume-section-title">Technical Skills</h3>
          <div className="resume-skills">
            <div><strong>IT Support &amp; Administration:</strong> Windows desktop/server support, Microsoft 365 administration, Active Directory, endpoint troubleshooting, hardware/software deployment, network diagnostics</div>
            <div><strong>MSP Tooling:</strong> ConnectWise Automate (RMM), ScreenConnect, ConnectWise PSA, IT Glue, Passportal, remote support &amp; ticketing workflows</div>
            <div><strong>Development:</strong> Python, Java, JavaScript, C++, React, Vite, Node.js, Express, SQL, PostgreSQL, HTML/CSS</div>
            <div><strong>Tools &amp; Platforms:</strong> Git, GitHub, Linux/Unix, Docker, AWS, Terraform, VS Code, WebStorm, Vercel, PowerShell scripting</div>
            <div><strong>Concepts:</strong> Data structures &amp; algorithms, object-oriented design, REST APIs, relational database design, software testing, version control workflows</div>
          </div>
        </section>

        <section className="resume-section">
          <h3 className="resume-section-title">Education</h3>
          <div className="resume-entry">
            <div className="resume-entry-header">
              <span className="resume-entry-title">Western Governors University</span>
              <span className="resume-entry-location">Remote</span>
            </div>
            <div className="resume-entry-sub">B.S. Computer Science · Expected Graduation: December 2026 · Final-semester focus: Artificial Intelligence &amp; Machine Learning</div>
            <p className="resume-entry-detail"><strong>Core Coursework:</strong> Data Structures &amp; Algorithms, Operating Systems, Computer Networks, Database Systems, Software Engineering, Discrete Mathematics, Linear Algebra</p>
            <p className="resume-entry-detail"><strong>Applied Coursework:</strong> Software Design &amp; Testing, Scripting &amp; Automation, Version Control, Computer Architecture, Business of IT</p>
            <p className="resume-entry-detail"><strong>Certifications:</strong> Linux Foundations and ITIL 4 Foundation earned through coursework; AWS Certified Cloud Practitioner and CompTIA Security+ planned.</p>
          </div>
        </section>

        <section className="resume-section">
          <h3 className="resume-section-title">Activities &amp; Honors</h3>
          <div className="resume-entry">
            <div className="resume-entry-header">
              <span className="resume-entry-title">WGU's Chapter of the National Society of Leadership &amp; Success</span>
              <span className="resume-entry-date">Feb 2025 – Present</span>
            </div>
            <p className="resume-entry-detail">Award received for academic accomplishments at WGU.</p>
          </div>
        </section>
      </div>
    </div>
  )
}

// ── ROOT ──────────────────────────────────────────────────────────────────────

const TABS = [
  { id: 'home',     label: 'Home',     Page: HomePage     },
  { id: 'resume',   label: 'Resume',   Page: ResumePage   },
  { id: 'projects', label: 'Projects', Page: ProjectsPage },
  { id: 'courses',  label: 'Courses',  Page: CoursesPage  },
]

export default function App() {
  const [active, setActive] = useState('home')
  const [selectedProject, setSelectedProject] = useState(null)
  const [menuOpen, setMenuOpen] = useState(false)

  function handleTabClick(id) {
    setMenuOpen(false)
    window.scrollTo({ top: 0, behavior: 'instant' })
    if (id === 'projects' && active === 'projects' && selectedProject) {
      setSelectedProject(null)
    } else {
      setActive(id)
      if (id !== 'projects') setSelectedProject(null)
    }
  }

  function renderPage() {
    if (active === 'projects') {
      return <ProjectsPage selected={selectedProject} setSelected={setSelectedProject} />
    }
    const { Page } = TABS.find((t) => t.id === active)
    return <Page />
  }

  return (
      <>
        <nav>
          <div className="nav-logo" onClick={() => handleTabClick('home')} style={{cursor: 'pointer'}}>
            Eternal<span>Halflife</span>
          </div>
          <div className="nav-links">
            <EmailLink key={active} className="nav-link nav-link--email" toastPosition="top" />
            <a href="https://github.com/elliottph2772" className="nav-link nav-link--github" target="_blank" rel="noreferrer">GitHub</a>
            <a href="https://linkedin.com/in/elliotthudson" className="nav-link nav-link--linkedin" target="_blank" rel="noreferrer">LinkedIn</a>
          </div>
          <ul className="nav-tabs">
            {TABS.map((t) => (
                <li key={t.id}>
                  <button
                      className={`nav-btn nav-btn--${t.id} ${active === t.id ? 'active' : ''}`}
                      onClick={() => handleTabClick(t.id)}
                  >
                    {t.label}
                  </button>
                </li>
            ))}
          </ul>
          <button
            className={`hamburger${menuOpen ? ' open' : ''}`}
            onClick={() => setMenuOpen(o => !o)}
            aria-label="Toggle menu"
          >
            <span /><span /><span />
          </button>
        </nav>

        {menuOpen && (
          <>
            <div className="mobile-menu-backdrop" onClick={() => setMenuOpen(false)} />
            <div className="mobile-menu">
              {TABS.filter(t => t.id !== 'home').map(t => (
                <button
                  key={t.id}
                  className={`mobile-menu-btn${active === t.id ? ' active' : ''}`}
                  onClick={() => handleTabClick(t.id)}
                >
                  {t.label}
                </button>
              ))}
              <div className="mobile-menu-divider" />
              <div className="mobile-menu-socials">
                <EmailLink className="mobile-menu-link" onAfterClick={() => setMenuOpen(false)} toastPosition="top" />
                <a href="https://github.com/elliottph2772" className="mobile-menu-link" target="_blank" rel="noreferrer" onClick={() => setMenuOpen(false)}>GitHub</a>
                <a href="https://linkedin.com/in/elliotthudson" className="mobile-menu-link" target="_blank" rel="noreferrer" onClick={() => setMenuOpen(false)}>LinkedIn</a>
              </div>
            </div>
          </>
        )}

        <main>{renderPage()}</main>
      </>
  )
}