'use client';
import dynamic from 'next/dynamic';
import Link from 'next/link';
import Navbar from '../components/Navbar';
import Footer from '../components/Footer';
import RevealWrapper from '../hooks/useScrollReveal';
import { PERSONAL, PROJECTS, SKILLS } from '../data/portfolio';
import { useState, useEffect } from 'react';

const RobotScene = dynamic(() => import('../components/RobotScene'), { ssr: false });

/* ── Typewriter ── */
function Typewriter({ words, speed = 90, pause = 2000 }) {
  const [displayed, setDisplayed] = useState('');
  const [wIdx, setWIdx] = useState(0);
  const [charIdx, setCharIdx] = useState(0);
  const [deleting, setDeleting] = useState(false);

  useEffect(() => {
    const word = words[wIdx];
    const delay = deleting ? speed / 2 : charIdx === word.length ? pause : speed;
    const t = setTimeout(() => {
      if (!deleting && charIdx < word.length) { setDisplayed(word.slice(0, charIdx + 1)); setCharIdx(c => c + 1); }
      else if (!deleting && charIdx === word.length) { setDeleting(true); }
      else if (deleting && charIdx > 0) { setDisplayed(word.slice(0, charIdx - 1)); setCharIdx(c => c - 1); }
      else { setDeleting(false); setWIdx(i => (i + 1) % words.length); }
    }, delay);
    return () => clearTimeout(t);
  }, [charIdx, deleting, wIdx, words, speed, pause]);

  return (
    <span style={{ color: 'var(--cyan)' }}>
      {displayed}
      <span style={{ display: 'inline-block', width: 2, height: '1em', background: 'var(--cyan)', marginLeft: 3, animation: 'pulse 0.8s infinite', verticalAlign: 'middle' }} />
    </span>
  );
}

const STATS = [
  { val: '9+',  lbl: 'Projects Built' },
  { val: '2+',  lbl: 'Years Coding' },
  { val: 'MERN',lbl: 'Core Stack' },
  { val: 'KOL', lbl: 'Based In' },
];

export default function HomePage() {
  return (
    <>
      <RobotScene />
      <div className="page-wrapper" style={{ position: 'relative', zIndex: 10 }}>
        <Navbar />

        {/* ════ HERO ════ */}
        <section style={{
          minHeight: '100vh',
          display: 'flex',
          flexDirection: 'column',
          justifyContent: 'center',
          maxWidth: 1200,
          margin: '0 auto',
          padding: '0 2rem',
          paddingTop: 'calc(var(--nav-h) + 2rem)',
        }}>
          <div style={{ display: 'inline-flex', alignItems: 'center', gap: '0.6rem', marginBottom: '1.5rem', animation: 'fadeUp 0.6s 0.1s both' }}>
            <span className="sec-badge">// Full-Stack · React · Node.js · MongoDB</span>
          </div>

          <h1 style={{
            fontFamily: 'var(--font-display)',
            fontWeight: 900,
            fontSize: 'clamp(2.8rem, 8vw, 6.5rem)',
            lineHeight: 0.95,
            letterSpacing: '-0.04em',
            marginBottom: '0.75rem',
            animation: 'fadeUp 0.6s 0.2s both',
          }}>
            <span style={{ color: 'var(--text)' }}>{PERSONAL.name.split(' ')[0]}</span>
            <br />
            <span
              className="glitch"
              data-text={PERSONAL.name.split(' ')[1]}
              style={{ WebkitTextStroke: '2px var(--cyan)', color: 'transparent' }}
            >
              {PERSONAL.name.split(' ')[1]}
            </span>
          </h1>

          <div style={{
            fontFamily: 'var(--font-display)',
            fontSize: 'clamp(0.9rem, 2.2vw, 1.4rem)',
            color: 'var(--text2)',
            marginBottom: '1.5rem',
            animation: 'fadeUp 0.6s 0.35s both',
          }}>
            I build{' '}
            <Typewriter words={[
              'full-stack web apps.',
              'React frontends.',
              'Node.js backends.',
              'real-time apps.',
              'clean UX.',
              'ideas into products.',
            ]} />
          </div>

          <p style={{
            fontFamily: 'var(--font-ui)',
            fontSize: '1.05rem',
            color: 'var(--text2)',
            maxWidth: 500,
            lineHeight: 1.75,
            marginBottom: '2.5rem',
            animation: 'fadeUp 0.6s 0.5s both',
          }}>
            {PERSONAL.subtitle} — turning ideas into real, working products.
            Passionate about <span style={{ color: 'var(--text)' }}>clean code</span>,{' '}
            <span style={{ color: 'var(--cyan)' }}>great UX</span>, and{' '}
            <span style={{ color: 'var(--pink)' }}>shipping things</span>.
          </p>

          <div style={{ display: 'flex', gap: '1rem', flexWrap: 'wrap', animation: 'fadeUp 0.6s 0.65s both' }}>
            <Link href="/projects" className="btn btn-cyan">View Projects →</Link>
            <a href={PERSONAL.github} target="_blank" rel="noopener noreferrer" className="btn btn-outline">GitHub ↗</a>
            <Link href="/contact" className="btn btn-pink">Hire Me</Link>
          </div>

          <div style={{ marginTop: '4rem', display: 'flex', alignItems: 'center', gap: '0.75rem', animation: 'fadeUp 0.6s 0.9s both' }}>
            <div style={{ width: 22, height: 36, border: '2px solid var(--border2)', borderRadius: 11, display: 'flex', justifyContent: 'center', paddingTop: 5 }}>
              <div style={{ width: 3, height: 7, background: 'var(--cyan)', borderRadius: 2, animation: 'float 1.4s ease-in-out infinite' }} />
            </div>
            <span style={{ fontFamily: 'var(--font-display)', fontSize: '0.58rem', letterSpacing: '0.18em', color: 'var(--text3)', textTransform: 'uppercase' }}>Scroll to Explore</span>
          </div>
        </section>

        {/* ════ STATS ════ */}
        <section style={{ background: 'rgba(3,3,13,0.8)', borderTop: '1px solid var(--border)', borderBottom: '1px solid var(--border)' }}>
          <div style={{ maxWidth: 1200, margin: '0 auto', padding: '1.5rem 2rem', display: 'grid', gridTemplateColumns: 'repeat(4, 1fr)', gap: '1rem' }}>
            {STATS.map((s, i) => (
              <RevealWrapper key={s.lbl} delay={i * 80}>
                <div style={{ textAlign: 'center', padding: '1.25rem 0.5rem', borderRight: i < STATS.length - 1 ? '1px solid var(--border)' : 'none' }}>
                  <div style={{ fontFamily: 'var(--font-display)', fontWeight: 900, fontSize: 'clamp(1.6rem, 3.5vw, 2.4rem)', color: i % 2 === 0 ? 'var(--cyan)' : 'var(--pink)', lineHeight: 1, marginBottom: '0.35rem' }}>{s.val}</div>
                  <div style={{ fontFamily: 'var(--font-display)', fontSize: '0.58rem', letterSpacing: '0.12em', color: 'var(--text3)', textTransform: 'uppercase' }}>{s.lbl}</div>
                </div>
              </RevealWrapper>
            ))}
          </div>
        </section>

        {/* ════ FEATURED PROJECTS ════ */}
        <div className="section">
          <RevealWrapper>
            <span className="sec-badge">Featured Work</span>
            <h2 className="sec-title">Things I've Built</h2>
            <p className="sec-sub">A selection of full-stack web projects shipped and deployed — from cinema platforms to healthcare apps.</p>
          </RevealWrapper>

          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))', gap: '1.5rem' }}>
            {PROJECTS.filter(p => p.featured).map((p, i) => (
              <RevealWrapper key={p.id} delay={i * 100}>
                <ProjectCard project={p} />
              </RevealWrapper>
            ))}
          </div>

          <RevealWrapper style={{ textAlign: 'center', marginTop: '3rem' }}>
            <Link href="/projects" className="btn btn-outline">View All Projects →</Link>
          </RevealWrapper>
        </div>

        {/* ════ SKILLS ════ */}
        <div style={{ background: 'var(--bg2)', borderTop: '1px solid var(--border)', borderBottom: '1px solid var(--border)' }}>
          <div className="section" style={{ paddingTop: '3.5rem', paddingBottom: '3.5rem' }}>
            <RevealWrapper>
              <span className="sec-badge">Tech Stack</span>
              <h2 className="sec-title" style={{ marginBottom: '2rem' }}>What I Work With</h2>
            </RevealWrapper>
            <RevealWrapper>
              <div style={{ display: 'flex', flexWrap: 'wrap', gap: '0.5rem' }}>
                {SKILLS.technical.flatMap(g => g.items).map((skill, i) => (
                  <span key={skill} className="tag" style={{
                    borderColor: i % 5 === 0 ? 'var(--cyan)' : i % 5 === 1 ? 'var(--pink)' : 'var(--border)',
                    color: i % 5 === 0 ? 'var(--cyan)' : i % 5 === 1 ? 'var(--pink)' : 'var(--text2)',
                  }}>{skill}</span>
                ))}
              </div>
            </RevealWrapper>
            <RevealWrapper style={{ marginTop: '2rem' }}>
              <Link href="/about" className="btn btn-outline" style={{ marginTop: '0.5rem' }}>Full Skill Set →</Link>
            </RevealWrapper>
          </div>
        </div>

        {/* ════ QUICK LINKS ════ */}
        <div className="section">
          <RevealWrapper>
            <span className="sec-badge">Explore</span>
            <h2 className="sec-title">Navigate the Portfolio</h2>
          </RevealWrapper>
          <div className="grid-3">
            {[
              { href: '/projects',     icon: '💻', title: 'Projects',    desc: 'Full-stack web apps, platforms, and tools.' },
              { href: '/achievements', icon: '🏆', title: 'Achievements', desc: 'GitHub achievements and milestones.' },
              { href: '/academics',    icon: '🎓', title: 'Academics',    desc: 'Education history and certifications.' },
              { href: '/about',        icon: '👨‍💻', title: 'About',        desc: 'Who I am, skills, and what drives me.' },
              { href: '/feedbacks',    icon: '💬', title: 'Feedbacks',    desc: 'What collaborators and peers say.' },
              { href: '/contact',      icon: '📡', title: 'Contact',      desc: 'Reach out for projects or collaboration.' },
            ].map((item, i) => (
              <RevealWrapper key={item.href} delay={i * 80}>
                <Link href={item.href} style={{ display: 'block', textDecoration: 'none', height: '100%' }}>
                  <div className="glass" style={{ padding: '1.5rem', height: '100%', cursor: 'pointer', transition: 'all 0.2s' }}
                    onMouseEnter={e => { e.currentTarget.style.transform = 'translateY(-4px)'; e.currentTarget.style.borderColor = 'var(--border2)'; }}
                    onMouseLeave={e => { e.currentTarget.style.transform = ''; e.currentTarget.style.borderColor = ''; }}>
                    <div style={{ fontSize: '1.8rem', marginBottom: '0.65rem' }}>{item.icon}</div>
                    <div style={{ fontFamily: 'var(--font-display)', fontSize: '0.88rem', fontWeight: 700, color: 'var(--text)', marginBottom: '0.35rem' }}>{item.title}</div>
                    <p style={{ fontSize: '0.82rem', color: 'var(--text2)', lineHeight: 1.55 }}>{item.desc}</p>
                    <div style={{ marginTop: '0.85rem', fontFamily: 'var(--font-display)', fontSize: '0.58rem', color: 'var(--cyan)', letterSpacing: '0.1em' }}>EXPLORE →</div>
                  </div>
                </Link>
              </RevealWrapper>
            ))}
          </div>
        </div>

        <Footer />
      </div>
    </>
  );
}

function ProjectCard({ project: p }) {
  const statusColor = p.status === 'completed' ? 'var(--cyan)' : 'var(--yellow)';
  return (
    <div className="glass" style={{ padding: '1.5rem', height: '100%', transition: 'all 0.2s', cursor: 'default' }}
      onMouseEnter={e => { e.currentTarget.style.transform = 'translateY(-5px)'; e.currentTarget.style.borderColor = 'var(--border2)'; }}
      onMouseLeave={e => { e.currentTarget.style.transform = ''; e.currentTarget.style.borderColor = ''; }}>
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '1rem' }}>
        <div style={{ display: 'flex', gap: '0.35rem', flexWrap: 'wrap' }}>
          {p.tags.slice(0, 2).map(t => <span key={t} className="tag tag-cyan" style={{ fontSize: '0.56rem' }}>{t}</span>)}
        </div>
        <div style={{ display: 'flex', alignItems: 'center', gap: '0.4rem' }}>
          <span className="status-dot" style={{ background: statusColor }} />
          <span style={{ fontFamily: 'var(--font-display)', fontSize: '0.53rem', color: statusColor, textTransform: 'uppercase' }}>{p.status === 'completed' ? 'Done' : 'Active'}</span>
        </div>
      </div>

      <h3 style={{ fontFamily: 'var(--font-display)', fontSize: '1rem', fontWeight: 700, color: 'var(--text)', marginBottom: '0.55rem', letterSpacing: '-0.02em' }}>{p.title}</h3>
      <p style={{ fontSize: '0.82rem', color: 'var(--text2)', lineHeight: 1.6, marginBottom: '1.1rem' }}>{p.description.slice(0, 110)}…</p>

      <div style={{ display: 'flex', flexWrap: 'wrap', gap: '0.3rem', marginBottom: '1.1rem' }}>
        {p.langs.map(l => (
          <span key={l} style={{ padding: '0.18rem 0.5rem', borderRadius: 3, fontSize: '0.58rem', fontFamily: 'var(--font-display)', background: 'rgba(0,212,255,0.06)', border: '1px solid var(--border)', color: 'var(--cyan)' }}>{l}</span>
        ))}
      </div>

      <div style={{ display: 'flex', gap: '0.5rem' }}>
        <a href={p.github} target="_blank" rel="noopener noreferrer" className="btn btn-outline" style={{ padding: '0.45rem 0.9rem', fontSize: '0.62rem' }}>GitHub ↗</a>
        {p.demo
          ? <a href={p.demo} target="_blank" rel="noopener noreferrer" className="btn btn-cyan" style={{ padding: '0.45rem 0.9rem', fontSize: '0.62rem' }}>Live ↗</a>
          : <span className="btn" style={{ padding: '0.45rem 0.9rem', fontSize: '0.62rem', background: 'rgba(255,255,255,0.02)', border: '1px solid var(--border)', color: 'var(--text3)', cursor: 'not-allowed' }}>No Demo</span>
        }
      </div>
    </div>
  );
}
