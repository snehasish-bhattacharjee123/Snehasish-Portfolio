'use client';
import Navbar from '../../components/Navbar';
import Footer from '../../components/Footer';
import RevealWrapper from '../../hooks/useScrollReveal';
import { RESEARCH } from '../../data/portfolio';

const STATUS_COLORS = {
  'Published':    'var(--cyan)',
  'Under Review': 'var(--yellow)',
  'Working Paper':'var(--pink)',
};

export default function ResearchPage() {
  return (
    <div className="page-wrapper circuit-bg">
      <Navbar />

      <div style={{
        borderBottom: '1px solid var(--border)',
        background: 'linear-gradient(180deg, rgba(0,255,200,0.03) 0%, transparent 100%)',
        padding: '5rem 2rem 3rem',
        textAlign: 'center',
      }}>
        <span className="sec-badge" style={{ display: 'inline-flex', marginBottom: '1.25rem' }}>// 04 — Research</span>
        <h1 className="sec-title">Research Work</h1>
        <p style={{ fontFamily: 'var(--font-ui)', fontSize: '1.05rem', color: 'var(--text2)', maxWidth: 560, margin: '0 auto' }}>
          Peer-reviewed papers, preprints, and ongoing research at the frontier of machine learning.
        </p>
      </div>

      <div className="section">
        {/* Research interest tags */}
        <RevealWrapper style={{ marginBottom: '3rem' }}>
          <div style={{ display: 'flex', flexWrap: 'wrap', gap: '0.6rem' }}>
            {['Natural Language Processing', 'Federated Learning', 'Computer Vision',
              'Explainable AI', 'Transformer Architectures', 'Privacy-Preserving ML',
              'Low-Resource NLP', 'Medical Imaging'].map(t => (
              <span key={t} className="tag" style={{ fontSize: '0.7rem' }}>{t}</span>
            ))}
          </div>
        </RevealWrapper>

        {/* Papers */}
        <div style={{ display: 'flex', flexDirection: 'column', gap: '2rem' }}>
          {RESEARCH.map((paper, i) => (
            <RevealWrapper key={paper.id} delay={i * 100}>
              <div className="glass" style={{ padding: '2rem', transition: 'all 0.25s' }}
                onMouseEnter={e => {
                  e.currentTarget.style.borderColor = 'var(--border2)';
                  e.currentTarget.style.transform = 'translateY(-4px)';
                }}
                onMouseLeave={e => {
                  e.currentTarget.style.borderColor = '';
                  e.currentTarget.style.transform = '';
                }}>

                {/* Top row */}
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', marginBottom: '1.25rem', flexWrap: 'wrap', gap: '1rem' }}>
                  <div style={{ display: 'flex', gap: '0.5rem', flexWrap: 'wrap' }}>
                    {paper.tags.map(t => (
                      <span key={t} className="tag tag-cyan" style={{ fontSize: '0.6rem' }}>{t}</span>
                    ))}
                  </div>
                  <div style={{ display: 'flex', alignItems: 'center', gap: '0.6rem', flexWrap: 'wrap' }}>
                    <span style={{
                      padding: '0.3rem 0.85rem',
                      borderRadius: 100,
                      border: `1px solid ${STATUS_COLORS[paper.status] || 'var(--border)'}`,
                      background: `${STATUS_COLORS[paper.status] || 'var(--border)'}18`,
                      fontFamily: 'var(--font-display)',
                      fontSize: '0.62rem',
                      color: STATUS_COLORS[paper.status] || 'var(--text3)',
                    }}>{paper.status}</span>
                    <span style={{ fontFamily: 'var(--font-body)', fontSize: '0.7rem', color: 'var(--text3)' }}>{paper.date}</span>
                    {paper.venue && (
                      <span style={{
                        padding: '0.3rem 0.85rem',
                        borderRadius: 100,
                        border: '1px solid var(--border)',
                        background: 'rgba(255,255,255,0.03)',
                        fontFamily: 'var(--font-display)',
                        fontSize: '0.62rem',
                        color: 'var(--text2)',
                      }}>{paper.venue}</span>
                    )}
                  </div>
                </div>

                {/* Number + Title */}
                <div style={{ display: 'flex', gap: '1.25rem', alignItems: 'flex-start', marginBottom: '1rem' }}>
                  <span style={{
                    fontFamily: 'var(--font-display)',
                    fontSize: '2.5rem',
                    fontWeight: 900,
                    color: 'var(--border)',
                    lineHeight: 1,
                    flexShrink: 0,
                    letterSpacing: '-0.04em',
                    userSelect: 'none',
                  }}>0{paper.id}</span>
                  <h3 style={{
                    fontFamily: 'var(--font-display)',
                    fontSize: 'clamp(1rem, 2vw, 1.3rem)',
                    fontWeight: 700,
                    color: 'var(--text)',
                    letterSpacing: '-0.02em',
                    lineHeight: 1.3,
                  }}>{paper.title}</h3>
                </div>

                {/* Abstract */}
                <p style={{
                  fontFamily: 'var(--font-ui)',
                  fontSize: '0.92rem',
                  color: 'var(--text2)',
                  lineHeight: 1.8,
                  marginBottom: '1.5rem',
                  paddingLeft: '3.75rem',
                }}>{paper.description}</p>

                {/* CTA */}
                <div style={{ paddingLeft: '3.75rem' }}>
                  {paper.link ? (
                    <a href={paper.link} target="_blank" rel="noopener noreferrer" className="btn btn-cyan"
                      style={{ padding: '0.6rem 1.4rem', fontSize: '0.68rem' }}>
                      Read Paper ↗
                    </a>
                  ) : (
                    <span className="btn" style={{
                      padding: '0.6rem 1.4rem', fontSize: '0.68rem',
                      background: 'rgba(255,255,255,0.02)',
                      border: '1px solid var(--border)',
                      color: 'var(--text3)',
                      cursor: 'not-allowed',
                      borderRadius: 'var(--radius)',
                      fontFamily: 'var(--font-display)',
                    }}>Not Available Yet</span>
                  )}
                </div>
              </div>
            </RevealWrapper>
          ))}
        </div>

        {/* Research philosophy */}
        <RevealWrapper style={{ marginTop: '4rem' }}>
          <div className="glass" style={{
            padding: '3rem',
            textAlign: 'center',
            background: 'linear-gradient(135deg, rgba(0,255,200,0.04), rgba(255,0,170,0.04))',
          }}>
            <div style={{ fontSize: '2rem', marginBottom: '1rem' }}>🔬</div>
            <h3 style={{
              fontFamily: 'var(--font-display)',
              fontSize: '1.3rem',
              fontWeight: 700,
              color: 'var(--text)',
              marginBottom: '0.75rem',
            }}>Research Philosophy</h3>
            <p style={{
              fontFamily: 'var(--font-ui)',
              fontSize: '1rem',
              color: 'var(--text2)',
              maxWidth: 640,
              margin: '0 auto 2rem',
              lineHeight: 1.8,
            }}>
              I believe the best research bridges rigorous mathematics with engineering pragmatism.
              Every paper I write aims to produce insights that can be implemented, measured, and improved.
              Science should be reproducible, accessible, and — above all — useful.
            </p>
            <a href={`mailto:${process.env.NEXT_PUBLIC_EMAIL || 'research@neural.dev'}`} className="btn btn-outline">
              Collaborate on Research →
            </a>
          </div>
        </RevealWrapper>
      </div>

      <Footer />
    </div>
  );
}
