'use client';
import Navbar from '../../components/Navbar';
import Footer from '../../components/Footer';
import RevealWrapper from '../../hooks/useScrollReveal';
import { ACADEMICS } from '../../data/portfolio';

export default function AcademicsPage() {
  return (
    <div className="page-wrapper circuit-bg">
      <Navbar />

      <div style={{
        borderBottom: '1px solid var(--border)',
        background: 'linear-gradient(180deg, rgba(0,255,200,0.03) 0%, transparent 100%)',
        padding: '5rem 2rem 3rem',
        textAlign: 'center',
      }}>
        <span className="sec-badge" style={{ display: 'inline-flex', marginBottom: '1.25rem' }}>// 02 — Academics</span>
        <h1 className="sec-title">Academic Journey</h1>
        <p style={{ fontFamily: 'var(--font-ui)', fontSize: '1.05rem', color: 'var(--text2)', maxWidth: 560, margin: '0 auto' }}>
          Education milestones and online credentials that shaped my technical foundation.
        </p>
      </div>

      {/* ── EDUCATION TIMELINE ── */}
      <div className="section">
        <RevealWrapper>
          <span className="sec-badge">Education</span>
          <h2 className="sec-title">Where I Studied</h2>
        </RevealWrapper>

        {/* Vertical timeline */}
        <div style={{ position: 'relative', paddingLeft: '3rem' }}>
          {/* Vertical line */}
          <div style={{
            position: 'absolute',
            left: '14px',
            top: 0, bottom: 0,
            width: 2,
            background: 'linear-gradient(180deg, var(--cyan), var(--pink), transparent)',
            borderRadius: 1,
          }} />

          {ACADEMICS.institutions.map((inst, i) => (
            <RevealWrapper key={inst.level} delay={i * 120} style={{ marginBottom: '2.5rem' }}>
              <div style={{ position: 'relative' }}>
                {/* Timeline dot */}
                <div style={{
                  position: 'absolute',
                  left: '-2.6rem',
                  top: '1.5rem',
                  width: 16, height: 16,
                  borderRadius: '50%',
                  border: `2px solid ${inst.status === 'current' ? 'var(--cyan)' : 'var(--border2)'}`,
                  background: inst.status === 'current' ? 'var(--cyan)' : 'var(--bg)',
                  boxShadow: inst.status === 'current' ? '0 0 16px var(--cyan-glow)' : 'none',
                  animation: inst.status === 'current' ? 'pulse 2s infinite' : 'none',
                  zIndex: 1,
                }} />

                <div className="glass" style={{ padding: '2rem' }}>
                  <div style={{
                    display: 'flex',
                    justifyContent: 'space-between',
                    alignItems: 'flex-start',
                    marginBottom: '1rem',
                    flexWrap: 'wrap',
                    gap: '0.75rem',
                  }}>
                    <div>
                      {inst.status === 'current' && (
                        <div style={{
                          display: 'inline-flex',
                          alignItems: 'center',
                          gap: '0.4rem',
                          padding: '0.2rem 0.65rem',
                          borderRadius: 100,
                          background: 'rgba(0,255,200,0.1)',
                          border: '1px solid var(--cyan)',
                          fontFamily: 'var(--font-display)',
                          fontSize: '0.55rem',
                          color: 'var(--cyan)',
                          marginBottom: '0.5rem',
                        }}>
                          <span className="status-dot green" style={{ width: 5, height: 5 }} />
                          CURRENTLY ENROLLED
                        </div>
                      )}
                      <h3 style={{
                        fontFamily: 'var(--font-display)',
                        fontSize: 'clamp(1rem, 2.5vw, 1.25rem)',
                        fontWeight: 800,
                        color: 'var(--text)',
                        marginBottom: '0.3rem',
                      }}>{inst.level}</h3>
                      <div style={{
                        fontFamily: 'var(--font-ui)',
                        fontSize: '1rem',
                        color: 'var(--cyan)',
                      }}>{inst.institution}</div>
                      <div style={{
                        fontFamily: 'var(--font-ui)',
                        fontSize: '0.82rem',
                        color: 'var(--text3)',
                      }}>📍 {inst.location}</div>
                    </div>
                    <div style={{ textAlign: 'right' }}>
                      <div style={{
                        fontFamily: 'var(--font-display)',
                        fontSize: '0.65rem',
                        color: 'var(--text3)',
                        marginBottom: '0.5rem',
                      }}>{inst.period}</div>
                      <div style={{
                        fontFamily: 'var(--font-display)',
                        fontSize: '1.4rem',
                        fontWeight: 900,
                        color: inst.status === 'current' ? 'var(--cyan)' : 'var(--pink)',
                        textShadow: `0 0 20px ${inst.status === 'current' ? 'var(--cyan-glow)' : 'rgba(255,0,170,0.3)'}`,
                      }}>{inst.cgpa}</div>
                      <div style={{
                        fontFamily: 'var(--font-display)',
                        fontSize: '0.55rem',
                        color: 'var(--text3)',
                        textTransform: 'uppercase',
                        letterSpacing: '0.1em',
                      }}>
                        {inst.status === 'current' ? 'Current CGPA' : 'Score'}
                      </div>
                    </div>
                  </div>

                  <p style={{
                    fontFamily: 'var(--font-ui)',
                    fontSize: '0.88rem',
                    color: 'var(--text2)',
                    lineHeight: 1.75,
                  }}>{inst.desc}</p>
                </div>
              </div>
            </RevealWrapper>
          ))}
        </div>
      </div>

      <hr className="hr" />

      {/* ── CERTIFICATIONS ── */}
      <div className="section">
        <RevealWrapper>
          <span className="sec-badge">Online Learning</span>
          <h2 className="sec-title">Certifications</h2>
          <p className="sec-sub">Industry-recognized credentials earned through platforms like Coursera, Google, and AWS.</p>
        </RevealWrapper>

        <div style={{
          display: 'grid',
          gridTemplateColumns: 'repeat(auto-fill, minmax(300px, 1fr))',
          gap: '1.25rem',
        }}>
          {ACADEMICS.certifications.map((cert, i) => (
            <RevealWrapper key={cert.title} delay={i * 80}>
              <a href={cert.link} target="_blank" rel="noopener noreferrer" style={{
                display: 'block', textDecoration: 'none',
              }}>
                <div className="glass" style={{
                  padding: '1.5rem',
                  height: '100%',
                  transition: 'all 0.25s',
                  cursor: 'pointer',
                }}
                onMouseEnter={e => {
                  e.currentTarget.style.transform = 'translateY(-6px)';
                  e.currentTarget.style.borderColor = 'var(--border2)';
                  e.currentTarget.style.boxShadow = '0 20px 60px rgba(0,0,0,0.5), 0 0 40px var(--cyan-dim)';
                }}
                onMouseLeave={e => {
                  e.currentTarget.style.transform = '';
                  e.currentTarget.style.borderColor = '';
                  e.currentTarget.style.boxShadow = '';
                }}>
                  <div style={{ display: 'flex', gap: '1rem', alignItems: 'flex-start' }}>
                    <div style={{ fontSize: '2rem', flexShrink: 0 }}>{cert.badge}</div>
                    <div>
                      <h4 style={{
                        fontFamily: 'var(--font-display)',
                        fontSize: '0.88rem',
                        fontWeight: 700,
                        color: 'var(--text)',
                        marginBottom: '0.3rem',
                        lineHeight: 1.35,
                      }}>{cert.title}</h4>
                      <div style={{
                        fontFamily: 'var(--font-ui)',
                        fontSize: '0.78rem',
                        color: 'var(--cyan)',
                        marginBottom: '0.25rem',
                      }}>{cert.issuer}</div>
                      <div style={{
                        fontFamily: 'var(--font-display)',
                        fontSize: '0.58rem',
                        color: 'var(--text3)',
                        letterSpacing: '0.08em',
                      }}>{cert.date}</div>
                    </div>
                  </div>
                  <div style={{
                    marginTop: '1rem',
                    fontFamily: 'var(--font-display)',
                    fontSize: '0.58rem',
                    color: 'var(--cyan)',
                    letterSpacing: '0.1em',
                  }}>VIEW CERTIFICATE ↗</div>
                </div>
              </a>
            </RevealWrapper>
          ))}
        </div>
      </div>

      <Footer />
    </div>
  );
}
