'use client';
import Navbar from '../../components/Navbar';
import Footer from '../../components/Footer';
import RevealWrapper from '../../hooks/useScrollReveal';
import { PERSONAL, SKILLS } from '../../data/portfolio';

const SKILL_LEVELS = {
  'Python': 95, 'TensorFlow': 88, 'PyTorch': 85, 'Scikit-learn': 90, 'XGBoost': 80, 'LightGBM': 75,
  'Transformers (HuggingFace)': 85, 'LangChain': 78, 'NLTK': 82, 'spaCy': 78, 'OpenAI API': 88, 'RAG Pipelines': 80,
  'OpenCV': 88, 'YOLO': 85, 'Detectron2': 72, 'PIL / Pillow': 90, 'MediaPipe': 80,
  'JavaScript': 80, 'TypeScript': 72, 'Java': 70, 'C++': 65, 'SQL': 78,
  'React': 82, 'Next.js': 78, 'Node.js': 75, 'FastAPI': 85, 'Flask': 82, 'REST APIs': 90,
  'Pandas': 92, 'NumPy': 92, 'Matplotlib': 88, 'MongoDB': 75, 'PostgreSQL': 70, 'AWS': 68, 'GCP': 65,
  'Git': 92, 'Docker': 72, 'Linux': 80, 'Jupyter': 95, 'VS Code': 95, 'Weights & Biases': 80,
};

const ACCENT_COLORS = ['var(--cyan)', 'var(--pink)', 'var(--yellow)', 'var(--purple)', '#00ff88', '#ff6600'];

export default function AboutPage() {
  return (
    <div className="page-wrapper circuit-bg">
      <Navbar />

      {/* Hero banner */}
      <div style={{
        borderBottom: '1px solid var(--border)',
        background: 'linear-gradient(180deg, rgba(0,255,200,0.04) 0%, transparent 100%)',
        padding: '5rem 2rem 3rem',
        textAlign: 'center',
      }}>
        <span className="sec-badge" style={{ marginBottom: '1.25rem', display: 'inline-flex' }}>// 01 — About</span>
        <h1 className="sec-title" style={{ marginBottom: '1rem' }}>Who I Am</h1>
        <p style={{
          fontFamily: 'var(--font-ui)', fontSize: '1.1rem',
          color: 'var(--text2)', maxWidth: 580, margin: '0 auto',
        }}>
          Student · Researcher · Builder · Open-Source Contributor
        </p>
      </div>

      {/* Bio + Avatar section */}
      <div className="section">
        <div style={{
          display: 'grid',
          gridTemplateColumns: 'auto 1fr',
          gap: '4rem',
          alignItems: 'start',
        }}
        className="about-bio-grid">
          {/* Avatar */}
          <RevealWrapper>
            <div style={{ textAlign: 'center' }}>
              {/* Placeholder avatar with robot icon */}
              <div style={{
                width: 200, height: 200,
                borderRadius: '50%',
                border: '3px solid var(--cyan)',
                boxShadow: '0 0 40px var(--cyan-glow), 0 0 80px rgba(0,255,200,0.08)',
                background: 'linear-gradient(135deg, rgba(0,255,200,0.1), rgba(255,0,170,0.08))',
                display: 'flex', alignItems: 'center', justifyContent: 'center',
                fontSize: '5rem',
                margin: '0 auto 1.5rem',
                position: 'relative',
                overflow: 'hidden',
              }}>
                🤖
                {/* Rotating ring */}
                <div style={{
                  position: 'absolute', inset: -6,
                  borderRadius: '50%',
                  border: '2px dashed rgba(0,255,200,0.3)',
                  animation: 'spin-slow 10s linear infinite',
                }} />
              </div>

              <div style={{
                fontFamily: 'var(--font-display)',
                fontSize: '1.1rem', fontWeight: 800,
                color: 'var(--text)',
                marginBottom: '0.25rem',
              }}>{PERSONAL.name}</div>
              <div style={{
                fontFamily: 'var(--font-ui)',
                fontSize: '0.85rem',
                color: 'var(--cyan)',
                marginBottom: '1.25rem',
              }}>{PERSONAL.subtitle}</div>

              {/* Social links */}
              <div style={{ display: 'flex', flexDirection: 'column', gap: '0.5rem' }}>
                {[
                  { label: 'Email', icon: '📧', href: `mailto:${PERSONAL.email}` },
                  { label: 'GitHub', icon: '⌥', href: PERSONAL.github },
                  { label: 'LinkedIn', icon: '🔗', href: PERSONAL.linkedin },
                  { label: 'Blog', icon: '✍️', href: PERSONAL.hashnode },
                ].map(s => (
                  <a key={s.label} href={s.href} target="_blank" rel="noopener noreferrer"
                    style={{
                      display: 'flex', alignItems: 'center', gap: '0.6rem',
                      padding: '0.6rem 1rem',
                      borderRadius: 8,
                      border: '1px solid var(--border)',
                      background: 'rgba(0,255,200,0.03)',
                      fontFamily: 'var(--font-ui)',
                      fontSize: '0.8rem',
                      color: 'var(--text2)',
                      textDecoration: 'none',
                      transition: 'all 0.2s',
                    }}
                    onMouseEnter={e => {
                      e.currentTarget.style.borderColor = 'var(--cyan)';
                      e.currentTarget.style.color = 'var(--cyan)';
                      e.currentTarget.style.transform = 'translateX(6px)';
                    }}
                    onMouseLeave={e => {
                      e.currentTarget.style.borderColor = 'var(--border)';
                      e.currentTarget.style.color = 'var(--text2)';
                      e.currentTarget.style.transform = '';
                    }}>
                    <span>{s.icon}</span>
                    <span>{s.label}</span>
                    <span style={{ marginLeft: 'auto', color: 'var(--text3)' }}>↗</span>
                  </a>
                ))}
              </div>
            </div>
          </RevealWrapper>

          {/* Bio text */}
          <RevealWrapper delay={100}>
            <div style={{ paddingTop: '0.5rem' }}>
              {PERSONAL.bio.map((para, i) => (
                <p key={i} style={{
                  fontFamily: 'var(--font-ui)',
                  fontSize: '1rem',
                  color: 'var(--text2)',
                  lineHeight: 1.85,
                  marginBottom: '1.25rem',
                }}>{para}</p>
              ))}

              {/* Key facts */}
              <div style={{
                display: 'grid',
                gridTemplateColumns: 'repeat(2, 1fr)',
                gap: '1rem',
                marginTop: '2rem',
              }}>
                {[
                  { label: 'Location',       value: PERSONAL.location },
                  { label: 'Status',         value: 'Open to Opportunities' },
                  { label: 'Specialization', value: 'AI/ML + Full-Stack' },
                  { label: 'Focus Areas',    value: 'CV, NLP, RL, LLMs' },
                ].map(f => (
                  <div key={f.label} style={{
                    padding: '1rem',
                    borderRadius: 10,
                    border: '1px solid var(--border)',
                    background: 'rgba(0,255,200,0.02)',
                  }}>
                    <div style={{
                      fontFamily: 'var(--font-display)',
                      fontSize: '0.58rem',
                      letterSpacing: '0.14em',
                      color: 'var(--text3)',
                      textTransform: 'uppercase',
                      marginBottom: '0.3rem',
                    }}>{f.label}</div>
                    <div style={{
                      fontFamily: 'var(--font-ui)',
                      fontSize: '0.88rem',
                      color: 'var(--cyan)',
                    }}>{f.value}</div>
                  </div>
                ))}
              </div>
            </div>
          </RevealWrapper>
        </div>
      </div>

      <hr className="hr" />

      {/* ── TECHNICAL SKILLS ── */}
      <div className="section">
        <RevealWrapper>
          <span className="sec-badge">Technical Skills</span>
          <h2 className="sec-title">Technology Arsenal</h2>
          <p className="sec-sub">Proficiency levels based on real project experience and continuous learning.</p>
        </RevealWrapper>

        {SKILLS.technical.map((group, gi) => (
          <RevealWrapper key={group.category} delay={gi * 80} style={{ marginBottom: '2.5rem' }}>
            <div className="glass" style={{ padding: '2rem' }}>
              {/* Group header */}
              <div style={{
                display: 'flex', alignItems: 'center', gap: '0.75rem',
                marginBottom: '1.5rem',
                paddingBottom: '0.75rem',
                borderBottom: '1px solid var(--border)',
              }}>
                <div style={{
                  width: 8, height: 8, borderRadius: '50%',
                  background: ACCENT_COLORS[gi % ACCENT_COLORS.length],
                  boxShadow: `0 0 8px ${ACCENT_COLORS[gi % ACCENT_COLORS.length]}`,
                }} />
                <span style={{
                  fontFamily: 'var(--font-display)',
                  fontSize: '0.7rem',
                  letterSpacing: '0.18em',
                  textTransform: 'uppercase',
                  color: ACCENT_COLORS[gi % ACCENT_COLORS.length],
                }}>{group.category}</span>
              </div>

              <div style={{
                display: 'grid',
                gridTemplateColumns: 'repeat(auto-fill, minmax(240px, 1fr))',
                gap: '1rem',
              }}>
                {group.items.map((skill) => {
                  const level = SKILL_LEVELS[skill] || 70;
                  const color = ACCENT_COLORS[gi % ACCENT_COLORS.length];
                  return (
                    <div key={skill}>
                      <div style={{
                        display: 'flex',
                        justifyContent: 'space-between',
                        alignItems: 'center',
                        marginBottom: '0.4rem',
                      }}>
                        <span style={{
                          fontFamily: 'var(--font-ui)',
                          fontSize: '0.85rem',
                          color: 'var(--text)',
                        }}>{skill}</span>
                        <span style={{
                          fontFamily: 'var(--font-display)',
                          fontSize: '0.6rem',
                          color: color,
                        }}>{level}%</span>
                      </div>
                      <div className="progress-bar">
                        <div className="progress-fill" style={{
                          width: `${level}%`,
                          background: `linear-gradient(90deg, ${color}, ${color}88)`,
                          boxShadow: `0 0 8px ${color}66`,
                        }} />
                      </div>
                    </div>
                  );
                })}
              </div>
            </div>
          </RevealWrapper>
        ))}
      </div>

      <hr className="hr" />

      {/* ── NON-TECHNICAL SKILLS ── */}
      <div className="section" style={{ paddingTop: '3rem' }}>
        <RevealWrapper>
          <span className="sec-badge">Soft Skills</span>
          <h2 className="sec-title">Beyond the Code</h2>
          <p className="sec-sub">The non-technical skills that make collaboration effective and ideas come to life.</p>
        </RevealWrapper>

        <div style={{
          display: 'grid',
          gridTemplateColumns: 'repeat(auto-fill, minmax(200px, 1fr))',
          gap: '1rem',
        }}>
          {SKILLS.nonTechnical.map((skill, i) => (
            <RevealWrapper key={skill} delay={i * 60}>
              <div style={{
                padding: '1.25rem 1.5rem',
                borderRadius: 12,
                border: '1px solid var(--border)',
                background: 'rgba(0,255,200,0.02)',
                display: 'flex', alignItems: 'center', gap: '0.75rem',
                transition: 'all 0.2s',
                cursor: 'default',
              }}
              onMouseEnter={e => {
                e.currentTarget.style.borderColor = 'var(--border2)';
                e.currentTarget.style.transform = 'translateY(-4px)';
                e.currentTarget.style.background = 'rgba(0,255,200,0.05)';
              }}
              onMouseLeave={e => {
                e.currentTarget.style.borderColor = 'var(--border)';
                e.currentTarget.style.transform = '';
                e.currentTarget.style.background = 'rgba(0,255,200,0.02)';
              }}>
                <div style={{
                  width: 8, height: 8, borderRadius: '50%',
                  background: ACCENT_COLORS[i % ACCENT_COLORS.length],
                  flexShrink: 0,
                }} />
                <span style={{
                  fontFamily: 'var(--font-ui)',
                  fontSize: '0.88rem',
                  color: 'var(--text2)',
                }}>{skill}</span>
              </div>
            </RevealWrapper>
          ))}
        </div>
      </div>

      <style>{`
        @media (max-width: 800px) {
          .about-bio-grid { grid-template-columns: 1fr !important; }
        }
      `}</style>

      <Footer />
    </div>
  );
}
