'use client';
import { useState, useMemo } from 'react';
import Navbar from '../../components/Navbar';
import Footer from '../../components/Footer';
import RevealWrapper from '../../hooks/useScrollReveal';
import { PROJECTS } from '../../data/portfolio';

const ALL_TAGS  = ['All', ...Array.from(new Set(PROJECTS.flatMap(p => p.tags)))];
const ALL_TYPES = ['All', ...Array.from(new Set(PROJECTS.map(p => p.type)))];

export default function ProjectsPage() {
  const [query,      setQuery]      = useState('');
  const [activeTag,  setActiveTag]  = useState('All');
  const [activeType, setActiveType] = useState('All');
  const [statusFlt,  setStatusFlt]  = useState('All');

  const filtered = useMemo(() => {
    const q = query.toLowerCase();
    return PROJECTS.filter(p => {
      const matchQ      = !q || p.title.toLowerCase().includes(q) || p.description.toLowerCase().includes(q) || p.langs.some(l => l.toLowerCase().includes(q));
      const matchTag    = activeTag  === 'All' || p.tags.includes(activeTag);
      const matchType   = activeType === 'All' || p.type === activeType;
      const matchStatus = statusFlt  === 'All' || p.status === statusFlt;
      return matchQ && matchTag && matchType && matchStatus;
    });
  }, [query, activeTag, activeType, statusFlt]);

  return (
    <div className="page-wrapper circuit-bg">
      <Navbar />

      {/* Header */}
      <div style={{
        borderBottom: '1px solid var(--border)',
        background: 'linear-gradient(180deg, rgba(0,255,200,0.03) 0%, transparent 100%)',
        padding: '5rem 2rem 3rem',
        textAlign: 'center',
      }}>
        <span className="sec-badge" style={{ display: 'inline-flex', marginBottom: '1.25rem' }}>// 03 — Projects</span>
        <h1 className="sec-title">Things I've Built</h1>
        <p style={{ fontFamily: 'var(--font-ui)', fontSize: '1.05rem', color: 'var(--text2)', maxWidth: 560, margin: '0 auto' }}>
          {PROJECTS.length} projects across AI, ML, web, bots and APIs — each solving a real problem.
        </p>
      </div>

      <div className="section">
        {/* ── SEARCH + FILTERS ── */}
        <RevealWrapper style={{ marginBottom: '2.5rem' }}>
          <div style={{
            display: 'flex', flexDirection: 'column', gap: '1rem',
            padding: '1.75rem',
            borderRadius: 14,
            border: '1px solid var(--border)',
            background: 'var(--surface)',
            backdropFilter: 'blur(20px)',
          }}>
            {/* Search bar */}
            <div style={{ position: 'relative' }}>
              <span style={{
                position: 'absolute', left: '1rem', top: '50%',
                transform: 'translateY(-50%)',
                color: 'var(--text3)', fontSize: '0.9rem',
              }}>🔍</span>
              <input
                className="input-cyber"
                placeholder="Search by title, description, or language..."
                value={query}
                onChange={e => setQuery(e.target.value)}
                style={{ paddingLeft: '2.5rem' }}
              />
            </div>

            {/* Filter rows */}
            <FilterRow label="Tag" options={ALL_TAGS} active={activeTag} onChange={setActiveTag} />
            <FilterRow label="Type" options={ALL_TYPES} active={activeType} onChange={setActiveType} />
            <FilterRow
              label="Status"
              options={['All', 'completed', 'in-progress']}
              active={statusFlt}
              onChange={setStatusFlt}
            />
          </div>
        </RevealWrapper>

        {/* Result count */}
        <div style={{
          fontFamily: 'var(--font-display)',
          fontSize: '0.65rem',
          letterSpacing: '0.12em',
          color: 'var(--text3)',
          marginBottom: '1.5rem',
          textTransform: 'uppercase',
        }}>
          Showing <span style={{ color: 'var(--cyan)' }}>{filtered.length}</span> / {PROJECTS.length} projects
          {query && <> · Query: <span style={{ color: 'var(--pink)' }}>"{query}"</span></>}
        </div>

        {/* Grid */}
        {filtered.length === 0 ? (
          <div style={{ textAlign: 'center', padding: '5rem 2rem' }}>
            <div style={{ fontSize: '3rem', marginBottom: '1rem' }}>🤖</div>
            <div style={{ fontFamily: 'var(--font-display)', color: 'var(--text2)' }}>No projects match your filters.</div>
          </div>
        ) : (
          <div style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(auto-fill, minmax(320px, 1fr))',
            gap: '1.5rem',
          }}>
            {filtered.map((p, i) => (
              <RevealWrapper key={p.id} delay={i * 70}>
                <FullProjectCard project={p} />
              </RevealWrapper>
            ))}
          </div>
        )}
      </div>

      <Footer />
    </div>
  );
}

/* ── Filter row ── */
function FilterRow({ label, options, active, onChange }) {
  return (
    <div style={{ display: 'flex', alignItems: 'center', gap: '0.6rem', flexWrap: 'wrap' }}>
      <span style={{
        fontFamily: 'var(--font-display)',
        fontSize: '0.58rem',
        letterSpacing: '0.14em',
        color: 'var(--text3)',
        textTransform: 'uppercase',
        minWidth: 44,
      }}>{label}:</span>
      {options.map(opt => (
        <button
          key={opt}
          onClick={() => onChange(opt)}
          style={{
            padding: '0.3rem 0.75rem',
            borderRadius: 100,
            border: `1px solid ${active === opt ? 'var(--cyan)' : 'var(--border)'}`,
            background: active === opt ? 'var(--cyan-dim)' : 'transparent',
            color: active === opt ? 'var(--cyan)' : 'var(--text3)',
            fontFamily: 'var(--font-display)',
            fontSize: '0.62rem',
            cursor: 'pointer',
            transition: 'all 0.15s',
            textTransform: 'capitalize',
          }}>
          {opt}
        </button>
      ))}
    </div>
  );
}

/* ── Full project card ── */
const TYPE_ICONS = { web: '🌐', application: '📱', bot: '🤖', game: '🎮', api: '⚡', ml: '🧠' };

function FullProjectCard({ project: p }) {
  const statusColor = p.status === 'completed' ? 'var(--cyan)' : 'var(--yellow)';
  return (
    <div className="glass" style={{
      padding: 0,
      height: '100%',
      display: 'flex',
      flexDirection: 'column',
      transition: 'all 0.3s',
      overflow: 'hidden',
    }}
    onMouseEnter={e => {
      e.currentTarget.style.transform = 'translateY(-8px)';
      e.currentTarget.style.boxShadow = '0 30px 80px rgba(0,0,0,0.6), 0 0 60px rgba(0,255,200,0.08)';
      e.currentTarget.style.borderColor = 'var(--border2)';
    }}
    onMouseLeave={e => {
      e.currentTarget.style.transform = '';
      e.currentTarget.style.boxShadow = '';
      e.currentTarget.style.borderColor = '';
    }}>
      {/* Card top stripe */}
      <div style={{
        height: 3,
        background: p.featured
          ? 'linear-gradient(90deg, var(--cyan), var(--pink))'
          : 'linear-gradient(90deg, var(--border2), transparent)',
      }} />

      <div style={{ padding: '1.5rem', flex: 1, display: 'flex', flexDirection: 'column' }}>
        {/* Header row */}
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', marginBottom: '1rem' }}>
          <div style={{ display: 'flex', gap: '0.4rem', flexWrap: 'wrap' }}>
            <span style={{
              padding: '0.25rem 0.65rem',
              borderRadius: 100,
              background: 'rgba(0,255,200,0.06)',
              border: '1px solid var(--border2)',
              fontFamily: 'var(--font-display)',
              fontSize: '0.6rem',
              color: 'var(--cyan)',
              textTransform: 'capitalize',
            }}>
              {TYPE_ICONS[p.type] || '📦'} {p.type}
            </span>
            {p.featured && (
              <span style={{
                padding: '0.25rem 0.65rem',
                borderRadius: 100,
                background: 'rgba(255,0,170,0.08)',
                border: '1px solid rgba(255,0,170,0.3)',
                fontFamily: 'var(--font-display)',
                fontSize: '0.6rem',
                color: 'var(--pink)',
              }}>★ Featured</span>
            )}
          </div>
          <div style={{ display: 'flex', alignItems: 'center', gap: '0.35rem', flexShrink: 0 }}>
            <span className="status-dot" style={{ background: statusColor, boxShadow: `0 0 5px ${statusColor}` }} />
            <span style={{
              fontFamily: 'var(--font-display)',
              fontSize: '0.55rem',
              color: statusColor,
              textTransform: 'uppercase',
              letterSpacing: '0.06em',
            }}>
              {p.status === 'completed' ? 'Completed' : 'In Progress'}
            </span>
          </div>
        </div>

        {/* Title */}
        <h3 style={{
          fontFamily: 'var(--font-display)',
          fontSize: '1rem',
          fontWeight: 700,
          color: 'var(--text)',
          marginBottom: '0.65rem',
          letterSpacing: '-0.02em',
          lineHeight: 1.3,
        }}>{p.title}</h3>

        {/* Description */}
        <p style={{
          fontFamily: 'var(--font-ui)',
          fontSize: '0.82rem',
          color: 'var(--text2)',
          lineHeight: 1.7,
          marginBottom: '1.25rem',
          flex: 1,
        }}>{p.description}</p>

        {/* Topic tags */}
        <div style={{ display: 'flex', flexWrap: 'wrap', gap: '0.35rem', marginBottom: '1rem' }}>
          {p.tags.map(t => (
            <span key={t} className="tag" style={{ fontSize: '0.58rem' }}>{t}</span>
          ))}
        </div>

        {/* Language pills */}
        <div style={{ display: 'flex', flexWrap: 'wrap', gap: '0.3rem', marginBottom: '1.25rem' }}>
          {p.langs.map(l => (
            <span key={l} style={{
              padding: '0.2rem 0.5rem',
              borderRadius: 4,
              fontSize: '0.6rem',
              fontFamily: 'var(--font-display)',
              background: 'rgba(0,255,200,0.05)',
              border: '1px solid var(--border)',
              color: 'var(--cyan)',
            }}>{l}</span>
          ))}
        </div>

        {/* Links */}
        <div style={{ display: 'flex', gap: '0.5rem' }}>
          <a href={p.github} target="_blank" rel="noopener noreferrer"
            className="btn btn-outline"
            style={{ flex: 1, justifyContent: 'center', padding: '0.55rem', fontSize: '0.65rem' }}>
            ⌥ GitHub
          </a>
          {p.demo ? (
            <a href={p.demo} target="_blank" rel="noopener noreferrer"
              className="btn btn-cyan"
              style={{ flex: 1, justifyContent: 'center', padding: '0.55rem', fontSize: '0.65rem' }}>
              🚀 Live Demo
            </a>
          ) : (
            <span className="btn" style={{
              flex: 1, justifyContent: 'center', padding: '0.55rem', fontSize: '0.65rem',
              background: 'rgba(255,255,255,0.02)',
              border: '1px solid var(--border)',
              color: 'var(--text3)',
              cursor: 'not-allowed',
              display: 'flex', alignItems: 'center',
              borderRadius: 'var(--radius)',
              fontFamily: 'var(--font-display)',
            }}>No Demo</span>
          )}
        </div>
      </div>
    </div>
  );
}
