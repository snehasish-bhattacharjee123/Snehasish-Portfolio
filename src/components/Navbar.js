'use client';
import { useState, useEffect } from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';

const NAV_LINKS = [
  { href: '/',             label: 'Home',         code: '00' },
  { href: '/about',        label: 'About',        code: '01' },
  { href: '/academics',    label: 'Academics',    code: '02' },
  { href: '/projects',     label: 'Projects',     code: '03' },
  { href: '/research',     label: 'Research',     code: '04' },
  { href: '/achievements', label: 'Achievements', code: '05' },
  { href: '/feedbacks',    label: 'Feedbacks',    code: '06' },
  { href: '/blogs',        label: 'Blogs',        code: '07' },
  { href: '/contact',      label: 'Contact',      code: '08' },
];

export default function Navbar() {
  const [scrolled,   setScrolled]   = useState(false);
  const [menuOpen,   setMenuOpen]   = useState(false);
  const [glitchIdx,  setGlitchIdx]  = useState(null);
  const pathname = usePathname();

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 30);
    window.addEventListener('scroll', onScroll, { passive: true });
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  // Random glitch on logo
  useEffect(() => {
    const id = setInterval(() => {
      setGlitchIdx(Math.floor(Math.random() * NAV_LINKS.length));
      setTimeout(() => setGlitchIdx(null), 300);
    }, 4000);
    return () => clearInterval(id);
  }, []);

  return (
    <>
      <nav style={{
        position: 'fixed', top: 0, left: 0, right: 0,
        zIndex: 1000,
        height: 'var(--nav-h)',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'space-between',
        padding: '0 2rem',
        background: scrolled
          ? 'rgba(4,4,15,0.92)'
          : 'rgba(4,4,15,0.6)',
        backdropFilter: 'blur(24px)',
        borderBottom: scrolled ? '1px solid var(--border)' : '1px solid transparent',
        transition: 'all 0.3s ease',
        boxShadow: scrolled ? '0 4px 30px rgba(0,0,0,0.5)' : 'none',
      }}>

        {/* Logo */}
        <Link href="/" style={{ textDecoration: 'none' }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: '0.6rem' }}>
            {/* Animated logo icon */}
            <div style={{
              width: 32, height: 32,
              border: '2px solid var(--cyan)',
              borderRadius: 6,
              display: 'flex', alignItems: 'center', justifyContent: 'center',
              position: 'relative',
              boxShadow: '0 0 14px var(--cyan-glow)',
              overflow: 'hidden',
            }}>
              <div style={{
                width: '100%', height: '100%',
                background: 'linear-gradient(135deg, var(--cyan-dim), transparent)',
                display: 'flex', alignItems: 'center', justifyContent: 'center',
                fontSize: '0.75rem',
                fontFamily: 'var(--font-display)',
                fontWeight: 900,
                color: 'var(--cyan)',
              }}>AI</div>
              {/* Scan line on logo */}
              <div style={{
                position: 'absolute', top: 0, left: 0, right: 0,
                height: '2px',
                background: 'linear-gradient(90deg, transparent, var(--cyan), transparent)',
                animation: 'scanline 2s linear infinite',
              }} />
            </div>
            <span style={{
              fontFamily: 'var(--font-display)',
              fontWeight: 800,
              fontSize: '1rem',
              color: 'var(--cyan)',
              letterSpacing: '0.04em',
              textShadow: '0 0 18px var(--cyan-glow)',
            }}>
              NEURAL<span style={{ color: 'var(--pink)' }}>.DEV</span>
            </span>
          </div>
        </Link>

        {/* Desktop Nav Links */}
        <div style={{
          display: 'flex', gap: '0.15rem', alignItems: 'center',
        }} className="hide-mobile">
          {NAV_LINKS.map((link, i) => {
            const active = pathname === link.href;
            const glitch = glitchIdx === i;
            return (
              <Link key={link.href} href={link.href} style={{
                display: 'flex', alignItems: 'center', gap: '0.3rem',
                padding: '0.4rem 0.7rem',
                borderRadius: 6,
                fontFamily: 'var(--font-display)',
                fontSize: '0.6rem',
                fontWeight: 600,
                letterSpacing: '0.08em',
                color: active ? 'var(--cyan)' : 'var(--text2)',
                background: active ? 'var(--cyan-dim)' : 'transparent',
                border: active ? '1px solid var(--border2)' : '1px solid transparent',
                transition: 'all 0.2s',
                textDecoration: 'none',
                position: 'relative',
                filter: glitch ? 'drop-shadow(0 0 6px var(--pink))' : 'none',
              }}
              onMouseEnter={e => {
                if (!active) {
                  e.currentTarget.style.color = 'var(--cyan)';
                  e.currentTarget.style.background = 'rgba(0,255,200,0.05)';
                }
              }}
              onMouseLeave={e => {
                if (!active) {
                  e.currentTarget.style.color = 'var(--text2)';
                  e.currentTarget.style.background = 'transparent';
                }
              }}>
                <span style={{ color: 'var(--text3)', fontSize: '0.55rem' }}>{link.code}</span>
                {link.label}
                {active && (
                  <div style={{
                    position: 'absolute', bottom: 0, left: '50%',
                    transform: 'translateX(-50%)',
                    width: '60%', height: '2px',
                    background: 'var(--cyan)',
                    borderRadius: 1,
                    boxShadow: '0 0 6px var(--cyan)',
                  }} />
                )}
              </Link>
            );
          })}
        </div>

        {/* Right: Status + Hamburger */}
        <div style={{ display: 'flex', alignItems: 'center', gap: '1rem' }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }} className="hide-mobile">
            <span className="status-dot green" />
            <span style={{ fontFamily: 'var(--font-display)', fontSize: '0.6rem', color: 'var(--text3)' }}>
              ONLINE
            </span>
          </div>

          {/* Hamburger (mobile) */}
          <button
            onClick={() => setMenuOpen(!menuOpen)}
            style={{
              display: 'none',
              background: 'none', border: '1px solid var(--border2)',
              color: 'var(--cyan)', padding: '0.4rem',
              borderRadius: 6, cursor: 'pointer',
            }}
            className="mobile-hamburger"
            aria-label="Toggle menu">
            <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
              {menuOpen
                ? <><line x1="18" y1="6" x2="6" y2="18"/><line x1="6" y1="6" x2="18" y2="18"/></>
                : <><line x1="3" y1="6" x2="21" y2="6"/><line x1="3" y1="12" x2="21" y2="12"/><line x1="3" y1="18" x2="21" y2="18"/></>
              }
            </svg>
          </button>
        </div>
      </nav>

      {/* Mobile Menu Overlay */}
      {menuOpen && (
        <div style={{
          position: 'fixed', inset: 0, zIndex: 999,
          background: 'rgba(4,4,15,0.97)',
          backdropFilter: 'blur(20px)',
          display: 'flex', flexDirection: 'column',
          alignItems: 'center', justifyContent: 'center',
          gap: '0.5rem',
          animation: 'fadeIn 0.2s ease',
        }}>
          {NAV_LINKS.map((link) => (
            <Link key={link.href} href={link.href}
              onClick={() => setMenuOpen(false)}
              style={{
                fontFamily: 'var(--font-display)',
                fontSize: '1.2rem',
                fontWeight: 700,
                color: pathname === link.href ? 'var(--cyan)' : 'var(--text)',
                textDecoration: 'none',
                padding: '0.75rem 2rem',
                width: '100%',
                textAlign: 'center',
                borderBottom: '1px solid var(--border)',
                letterSpacing: '0.1em',
              }}>
              <span style={{ color: 'var(--text3)', fontSize: '0.75rem', marginRight: '0.75rem' }}>
                {link.code}
              </span>
              {link.label}
            </Link>
          ))}
        </div>
      )}

      <style>{`
        @media (max-width: 768px) {
          .mobile-hamburger { display: flex !important; }
          .hide-mobile { display: none !important; }
        }
      `}</style>
    </>
  );
}
