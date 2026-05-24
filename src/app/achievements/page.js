'use client';
import Navbar from '../../components/Navbar';
import Footer from '../../components/Footer';
import RevealWrapper from '../../hooks/useScrollReveal';
import { ACHIEVEMENTS } from '../../data/portfolio';

export default function AchievementsPage() {
  return (
    <div className="page-wrapper circuit-bg">
      <Navbar />

      <div style={{
        borderBottom: '1px solid var(--border)',
        background: 'linear-gradient(180deg, rgba(255,230,0,0.03) 0%, transparent 100%)',
        padding: '5rem 2rem 3rem',
        textAlign: 'center',
      }}>
        <span className="sec-badge" style={{ display: 'inline-flex', marginBottom: '1.25rem', borderColor: 'rgba(255,230,0,0.3)', color: 'var(--yellow)', background: 'rgba(255,230,0,0.06)' }}>// 05 — Achievements</span>
        <h1 className="sec-title">Achievements</h1>
        <p style={{ fontFamily: 'var(--font-ui)', fontSize: '1.05rem', color: 'var(--text2)', maxWidth: 560, margin: '0 auto' }}>
          Awards, certificates, and hackathon victories — milestones on the journey.
        </p>
      </div>

      {/* ── CERTIFICATES ── */}
      <div className="section">
        <RevealWrapper>
          <span className="sec-badge">Certificates & Awards</span>
          <h2 className="sec-title">Recognition</h2>
          <p className="sec-sub">Notable certifications and awards received through competitions and institutions.</p>
        </RevealWrapper>

        <div style={{
          display: 'grid',
          gridTemplateColumns: 'repeat(auto-fill, minmax(320px, 1fr))',
          gap: '1.5rem',
        }}>
          {ACHIEVEMENTS.certificates.map((cert, i) => (
            <RevealWrapper key={cert.id} delay={i * 100}>
              <div className="glass" style={{
                padding: 0,
                overflow: 'hidden',
                transition: 'all 0.3s',
              }}
              onMouseEnter={e => {
                e.currentTarget.style.transform = 'translateY(-8px) scale(1.01)';
                e.currentTarget.style.boxShadow = '0 30px 80px rgba(0,0,0,0.6), 0 0 50px rgba(255,230,0,0.1)';
                e.currentTarget.style.borderColor = 'rgba(255,230,0,0.3)';
              }}
              onMouseLeave={e => {
                e.currentTarget.style.transform = '';
                e.currentTarget.style.boxShadow = '';
                e.currentTarget.style.borderColor = '';
              }}>
                {/* Certificate image area */}
                <div style={{
                  height: 160,
                  background: `linear-gradient(135deg, rgba(255,230,0,0.08), rgba(0,255,200,0.05))`,
                  display: 'flex', alignItems: 'center', justifyContent: 'center',
                  borderBottom: '1px solid var(--border)',
                  position: 'relative',
                  overflow: 'hidden',
                }}>
                  {/* Decorative lines */}
                  {[0,1,2,3].map(n => (
                    <div key={n} style={{
                      position: 'absolute',
                      top: `${20 + n * 25}%`,
                      left: 0, right: 0,
                      height: 1,
                      background: 'linear-gradient(90deg, transparent, rgba(255,230,0,0.15), transparent)',
                    }} />
                  ))}
                  <div style={{
                    fontSize: '4rem',
                    filter: 'drop-shadow(0 0 20px rgba(255,230,0,0.5))',
                    zIndex: 1,
                  }}>🏆</div>
                  <div style={{
                    position: 'absolute',
                    top: '1rem', right: '1rem',
                    fontFamily: 'var(--font-display)',
                    fontSize: '0.55rem',
                    color: 'var(--yellow)',
                    letterSpacing: '0.12em',
                    background: 'rgba(255,230,0,0.1)',
                    border: '1px solid rgba(255,230,0,0.3)',
                    padding: '0.25rem 0.65rem',
                    borderRadius: 100,
                  }}>{cert.date}</div>
                </div>

                <div style={{ padding: '1.5rem' }}>
                  <h3 style={{
                    fontFamily: 'var(--font-display)',
                    fontSize: '0.95rem',
                    fontWeight: 700,
                    color: 'var(--text)',
                    marginBottom: '0.35rem',
                    lineHeight: 1.3,
                  }}>{cert.title}</h3>
                  <div style={{
                    fontFamily: 'var(--font-ui)',
                    fontSize: '0.8rem',
                    color: 'var(--yellow)',
                    marginBottom: '0.75rem',
                  }}>{cert.issuer}</div>
                  <p style={{
                    fontFamily: 'var(--font-ui)',
                    fontSize: '0.82rem',
                    color: 'var(--text2)',
                    lineHeight: 1.65,
                    marginBottom: '1rem',
                  }}>{cert.desc}</p>
                  <div style={{ display: 'flex', flexWrap: 'wrap', gap: '0.35rem' }}>
                    {cert.tags.map(t => (
                      <span key={t} className="tag tag-yellow" style={{ fontSize: '0.58rem' }}>{t}</span>
                    ))}
                  </div>
                </div>
              </div>
            </RevealWrapper>
          ))}
        </div>
      </div>

      <hr className="hr" />

      {/* ── HACKATHONS ── */}
      <div className="section">
        <RevealWrapper>
          <span className="sec-badge">Competitive</span>
          <h2 className="sec-title">Hackathon War Log</h2>
          <p className="sec-sub">Every battle fought, every problem cracked under pressure — building at speed.</p>
        </RevealWrapper>

        <div style={{ display: 'flex', flexDirection: 'column', gap: '1.25rem' }}>
          {ACHIEVEMENTS.hackathons.map((h, i) => (
            <RevealWrapper key={h.id} delay={i * 90}>
              <div className="glass" style={{
                padding: '1.75rem',
                display: 'grid',
                gridTemplateColumns: 'auto 1fr auto',
                gap: '1.5rem',
                alignItems: 'center',
                transition: 'all 0.25s',
              }}
              onMouseEnter={e => {
                e.currentTarget.style.transform = 'translateX(8px)';
                e.currentTarget.style.borderColor = 'var(--border2)';
              }}
              onMouseLeave={e => {
                e.currentTarget.style.transform = '';
                e.currentTarget.style.borderColor = '';
              }}>

                {/* Number */}
                <div style={{
                  fontFamily: 'var(--font-display)',
                  fontWeight: 900,
                  fontSize: '3rem',
                  color: 'var(--border)',
                  lineHeight: 1,
                  minWidth: 48,
                  userSelect: 'none',
                  letterSpacing: '-0.04em',
                }}>0{h.id}</div>

                {/* Content */}
                <div>
                  <div style={{ marginBottom: '0.5rem' }}>
                    <h3 style={{
                      fontFamily: 'var(--font-display)',
                      fontSize: '1rem',
                      fontWeight: 700,
                      color: 'var(--text)',
                      marginBottom: '0.2rem',
                    }}>{h.name}</h3>
                    <div style={{
                      fontFamily: 'var(--font-ui)',
                      fontSize: '0.9rem',
                      color: 'var(--yellow)',
                      marginBottom: '0.5rem',
                    }}>{h.result}</div>
                  </div>
                  <p style={{
                    fontFamily: 'var(--font-ui)',
                    fontSize: '0.85rem',
                    color: 'var(--text2)',
                    lineHeight: 1.65,
                    marginBottom: '0.75rem',
                  }}>{h.desc}</p>
                  <div style={{ display: 'flex', flexWrap: 'wrap', gap: '0.35rem' }}>
                    {h.tags.map(t => (
                      <span key={t} className="tag" style={{ fontSize: '0.6rem' }}>{t}</span>
                    ))}
                  </div>
                </div>

                {/* Date */}
                <div style={{
                  fontFamily: 'var(--font-display)',
                  fontSize: '0.6rem',
                  letterSpacing: '0.1em',
                  color: 'var(--text3)',
                  textAlign: 'right',
                  whiteSpace: 'nowrap',
                }}>{h.date}</div>
              </div>
            </RevealWrapper>
          ))}
        </div>

        {/* Summary row */}
        <RevealWrapper style={{ marginTop: '3.5rem' }}>
          <div style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(auto-fit, minmax(150px, 1fr))',
            gap: '1rem',
          }}>
            {[
              { val: '4+',  lbl: 'Hackathons',       color: 'var(--yellow)' },
              { val: '1',   lbl: 'Gold Medals',       color: 'var(--yellow)' },
              { val: '1',   lbl: 'Silver Medals',     color: 'var(--cyan)' },
              { val: '12k+',lbl: 'Teams Beaten',      color: 'var(--pink)' },
            ].map(s => (
              <div key={s.lbl} className="glass" style={{ padding: '1.5rem', textAlign: 'center' }}>
                <div style={{
                  fontFamily: 'var(--font-display)',
                  fontSize: '2.2rem',
                  fontWeight: 900,
                  color: s.color,
                  textShadow: `0 0 20px ${s.color}55`,
                  lineHeight: 1,
                  marginBottom: '0.35rem',
                }}>{s.val}</div>
                <div style={{
                  fontFamily: 'var(--font-display)',
                  fontSize: '0.58rem',
                  letterSpacing: '0.12em',
                  color: 'var(--text3)',
                  textTransform: 'uppercase',
                }}>{s.lbl}</div>
              </div>
            ))}
          </div>
        </RevealWrapper>
      </div>

      <Footer />
    </div>
  );
}
