'use client';
import Link from 'next/link';

const LINKS = [
  { href: '/about',        label: 'About'        },
  { href: '/projects',     label: 'Projects'     },
  { href: '/research',     label: 'Research'     },
  { href: '/achievements', label: 'Achievements' },
  { href: '/blogs',        label: 'Blogs'        },
  { href: '/contact',      label: 'Contact'      },
];

export default function Footer() {
  const year = new Date().getFullYear();
  return (
    <footer style={{
      borderTop: '1px solid var(--border)',
      background: 'rgba(4,4,15,0.95)',
      backdropFilter: 'blur(20px)',
    }}>
      <div style={{ maxWidth: 1200, margin: '0 auto', padding: '3rem 2rem 1.5rem' }}>
        {/* Top row */}
        <div style={{
          display: 'grid',
          gridTemplateColumns: 'repeat(auto-fit, minmax(220px, 1fr))',
          gap: '2.5rem',
          marginBottom: '2.5rem',
        }}>
          {/* Brand */}
          <div>
            <div style={{
              fontFamily: 'var(--font-display)',
              fontWeight: 900,
              fontSize: '1.3rem',
              color: 'var(--cyan)',
              textShadow: '0 0 20px var(--cyan-glow)',
              marginBottom: '0.75rem',
            }}>
              NEURAL<span style={{ color: 'var(--pink)' }}>.DEV</span>
            </div>
            <p style={{
              fontFamily: 'var(--font-ui)',
              fontSize: '0.85rem',
              color: 'var(--text2)',
              lineHeight: 1.7,
              maxWidth: 260,
            }}>
              Building intelligent systems at the intersection of AI, ML, and elegant engineering.
            </p>
            {/* Status */}
            <div style={{
              display: 'flex', alignItems: 'center', gap: '0.5rem',
              marginTop: '1rem',
            }}>
              <span className="status-dot green" />
              <span style={{ fontFamily: 'var(--font-display)', fontSize: '0.6rem', color: 'var(--text3)' }}>
                AVAILABLE FOR OPPORTUNITIES
              </span>
            </div>
          </div>

          {/* Nav Links */}
          <div>
            <div style={{
              fontFamily: 'var(--font-display)',
              fontSize: '0.65rem',
              letterSpacing: '0.18em',
              color: 'var(--cyan)',
              marginBottom: '1rem',
              textTransform: 'uppercase',
            }}>Navigation</div>
            <div style={{ display: 'flex', flexDirection: 'column', gap: '0.55rem' }}>
              {LINKS.map(l => (
                <Link key={l.href} href={l.href} style={{
                  fontFamily: 'var(--font-ui)',
                  fontSize: '0.9rem',
                  color: 'var(--text2)',
                  textDecoration: 'none',
                  transition: 'color 0.2s',
                }}
                onMouseEnter={e => e.currentTarget.style.color = 'var(--cyan)'}
                onMouseLeave={e => e.currentTarget.style.color = 'var(--text2)'}>
                  <span style={{ color: 'var(--border2)', marginRight: '0.4rem' }}>›</span>
                  {l.label}
                </Link>
              ))}
            </div>
          </div>

          {/* Contact */}
          <div>
            <div style={{
              fontFamily: 'var(--font-display)',
              fontSize: '0.65rem',
              letterSpacing: '0.18em',
              color: 'var(--cyan)',
              marginBottom: '1rem',
              textTransform: 'uppercase',
            }}>Get In Touch</div>
            {[
              { icon: '📧', label: 'student@neural.dev' },
              { icon: '🐙', label: 'github.com/neural-dev' },
              { icon: '🔗', label: 'linkedin.com/in/neural-dev' },
              { icon: '📍', label: 'Jalandhar, Punjab, India' },
            ].map(item => (
              <div key={item.label} style={{
                display: 'flex', alignItems: 'center', gap: '0.6rem',
                marginBottom: '0.55rem',
                fontFamily: 'var(--font-ui)',
                fontSize: '0.85rem',
                color: 'var(--text2)',
              }}>
                <span>{item.icon}</span>
                <span>{item.label}</span>
              </div>
            ))}
          </div>

          {/* Tech stack badges */}
          <div>
            <div style={{
              fontFamily: 'var(--font-display)',
              fontSize: '0.65rem',
              letterSpacing: '0.18em',
              color: 'var(--cyan)',
              marginBottom: '1rem',
              textTransform: 'uppercase',
            }}>Tech Focus</div>
            <div style={{ display: 'flex', flexWrap: 'wrap', gap: '0.4rem' }}>
              {['Python','TensorFlow','PyTorch','React','Next.js','Node.js','OpenCV','Scikit-learn','LLMs','FastAPI'].map(t => (
                <span key={t} className="tag" style={{ fontSize: '0.6rem' }}>{t}</span>
              ))}
            </div>
          </div>
        </div>

        {/* Divider */}
        <hr className="hr" />

        {/* Bottom row */}
        <div style={{
          display: 'flex',
          justifyContent: 'space-between',
          alignItems: 'center',
          paddingTop: '1.25rem',
          flexWrap: 'wrap',
          gap: '0.75rem',
        }}>
          <span style={{
            fontFamily: 'var(--font-display)',
            fontSize: '0.6rem',
            color: 'var(--text3)',
            letterSpacing: '0.08em',
          }}>
            © {year} NEURAL.DEV — ALL RIGHTS RESERVED
          </span>
          <span style={{
            fontFamily: 'var(--font-body)',
            fontSize: '0.72rem',
            color: 'var(--text3)',
          }}>
            Built with <span style={{ color: 'var(--cyan)' }}>Next.js</span> · <span style={{ color: 'var(--pink)' }}>Three.js</span> · <span style={{ color: 'var(--yellow)' }}>Framer Motion</span>
          </span>
        </div>
      </div>
    </footer>
  );
}
