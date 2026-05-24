'use client';
import { useState, useMemo } from 'react';
import Navbar from '../../components/Navbar';
import Footer from '../../components/Footer';
import RevealWrapper from '../../hooks/useScrollReveal';
import { BLOGS } from '../../data/portfolio';

const ALL_TAGS = ['All', ...Array.from(new Set(BLOGS.flatMap(b => b.tags)))];

function BlogCard({ blog, index }) {
  const [hovered, setHovered] = useState(false);
  const date = new Date(blog.date).toLocaleDateString('en-US', { year: 'numeric', month: 'short', day: 'numeric' });
  const accent = ['var(--cyan)', 'var(--pink)', 'var(--yellow)', 'var(--purple)', '#00ff88', '#ff6600'][index % 6];
  const emoji = blog.tags.includes('LLM') || blog.tags.includes('RAG') ? '🤖'
    : blog.tags.includes('Computer Vision') || blog.tags.includes('YOLO') ? '👁️'
    : blog.tags.includes('NLP') || blog.tags.includes('Transformers') ? '🧠'
    : blog.tags.includes('Federated') ? '🔒'
    : blog.tags.includes('MLOps') ? '🚀'
    : blog.tags.includes('XAI') ? '🔍' : '✍️';

  return (
    <RevealWrapper delay={index * 90}>
      <a href={blog.link} target="_blank" rel="noopener noreferrer"
        style={{ display: 'block', textDecoration: 'none', height: '100%' }}>
        <div className="glass" style={{
          height: '100%', display: 'flex', flexDirection: 'column', overflow: 'hidden',
          transition: 'all 0.3s cubic-bezier(0.4,0,0.2,1)',
          transform: hovered ? 'translateY(-8px)' : 'none',
          boxShadow: hovered ? `0 30px 80px rgba(0,0,0,0.6), 0 0 60px ${accent}22` : '0 8px 40px rgba(0,0,0,0.5)',
          borderColor: hovered ? accent : 'var(--border)',
        }} onMouseEnter={() => setHovered(true)} onMouseLeave={() => setHovered(false)}>

          <div style={{ height: 3, background: `linear-gradient(90deg, ${accent}, transparent)`, flexShrink: 0 }} />

          {/* Thumbnail */}
          <div style={{
            height: 160, flexShrink: 0,
            background: `linear-gradient(135deg, var(--bg3) 0%, ${accent}18 100%)`,
            display: 'flex', alignItems: 'center', justifyContent: 'center',
            position: 'relative', overflow: 'hidden',
          }}>
            <div style={{
              position: 'absolute', inset: 0,
              backgroundImage: 'linear-gradient(var(--border) 1px, transparent 1px), linear-gradient(90deg, var(--border) 1px, transparent 1px)',
              backgroundSize: '30px 30px', opacity: 0.4,
            }} />
            <div style={{
              width: 56, height: 56,
              border: `2px solid ${accent}`, borderRadius: 12,
              display: 'flex', alignItems: 'center', justifyContent: 'center',
              fontSize: '1.6rem', background: `${accent}11`,
              boxShadow: `0 0 25px ${accent}33`, position: 'relative',
              transition: 'transform 0.3s',
              transform: hovered ? 'scale(1.12) rotate(5deg)' : 'none',
            }}>{emoji}</div>
            <div style={{
              position: 'absolute', top: 10, right: 10,
              padding: '0.25rem 0.55rem',
              background: 'rgba(4,4,15,0.85)', border: '1px solid var(--border)',
              borderRadius: 6, fontFamily: 'var(--font-display)', fontSize: '0.58rem', color: 'var(--text2)',
            }}>👁 {blog.views >= 1000 ? `${(blog.views/1000).toFixed(1)}k` : blog.views}</div>
          </div>

          {/* Content */}
          <div style={{ padding: '1.25rem', display: 'flex', flexDirection: 'column', flex: 1 }}>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '0.6rem' }}>
              <span style={{ fontFamily: 'var(--font-display)', fontSize: '0.58rem', color: 'var(--text3)' }}>{date}</span>
              <span style={{
                padding: '0.18rem 0.55rem', borderRadius: 100, fontFamily: 'var(--font-display)', fontSize: '0.56rem',
                background: `${accent}15`, border: `1px solid ${accent}44`, color: accent,
              }}>⏱ {blog.readMin} min</span>
            </div>

            <h3 style={{
              fontFamily: 'var(--font-display)', fontSize: '0.95rem', fontWeight: 700,
              color: hovered ? accent : 'var(--text)', marginBottom: '0.5rem',
              lineHeight: 1.35, letterSpacing: '-0.02em', transition: 'color 0.2s', flex: '0 0 auto',
            }}>{blog.title}</h3>

            <p style={{ fontSize: '0.82rem', color: 'var(--text2)', lineHeight: 1.65, marginBottom: '1rem', flex: 1 }}>
              {blog.excerpt}
            </p>

            <div style={{ display: 'flex', flexWrap: 'wrap', gap: '0.3rem', marginBottom: '0.85rem' }}>
              {blog.tags.map(t => (
                <span key={t} className="tag" style={{ fontSize: '0.56rem', padding: '0.18rem 0.5rem' }}>{t}</span>
              ))}
            </div>

            <div style={{
              display: 'flex', alignItems: 'center', gap: '0.4rem',
              fontFamily: 'var(--font-display)', fontSize: '0.62rem', color: accent,
              letterSpacing: '0.08em', borderTop: '1px solid var(--border)', paddingTop: '0.75rem',
            }}>
              READ ARTICLE
              <span style={{ transition: 'transform 0.2s', transform: hovered ? 'translateX(5px)' : 'none' }}>→</span>
            </div>
          </div>
        </div>
      </a>
    </RevealWrapper>
  );
}

export default function BlogsPage() {
  const [activeTag, setActiveTag] = useState('All');
  const [sort, setSort] = useState('latest');

  const filtered = useMemo(() => {
    let list = activeTag === 'All' ? [...BLOGS] : BLOGS.filter(b => b.tags.includes(activeTag));
    if (sort === 'popular') list.sort((a, b) => b.views - a.views);
    else list.sort((a, b) => new Date(b.date) - new Date(a.date));
    return list;
  }, [activeTag, sort]);

  const totalReads = BLOGS.reduce((a, b) => a + b.views, 0);
  const totalReadsLabel = totalReads >= 1000 ? `${(totalReads/1000).toFixed(1)}k` : String(totalReads);
  const totalMins = BLOGS.reduce((a, b) => a + b.readMin, 0);

  return (
    <div className="page-wrapper circuit-bg">
      <Navbar />

      {/* Hero */}
      <div style={{
        borderBottom: '1px solid var(--border)',
        background: 'linear-gradient(180deg, rgba(0,255,200,0.03) 0%, transparent 100%)',
        padding: '5rem 2rem 3.5rem', textAlign: 'center',
      }}>
        <RevealWrapper>
          <span className="sec-badge" style={{ display: 'inline-flex', marginBottom: '1.25rem' }}>// 07 — Blogs</span>
          <h1 className="sec-title">Technical Blog</h1>
          <p style={{ fontFamily: 'var(--font-ui)', fontSize: '1.05rem', color: 'var(--text2)', maxWidth: 560, margin: '0 auto' }}>
            Deep dives, tutorials, and insights on ML, AI systems, and the craft of building intelligent software.
          </p>
        </RevealWrapper>
        <RevealWrapper delay={150}>
          <div style={{ display: 'flex', justifyContent: 'center', gap: '2.5rem', marginTop: '2.5rem', flexWrap: 'wrap' }}>
            {[
              { val: BLOGS.length, lbl: 'Articles' },
              { val: totalReadsLabel, lbl: 'Total Reads' },
              { val: totalMins + ' min', lbl: 'Total Reading Time' },
            ].map(s => (
              <div key={s.lbl} style={{ textAlign: 'center' }}>
                <div style={{ fontFamily: 'var(--font-display)', fontSize: '1.8rem', fontWeight: 900, color: 'var(--cyan)', textShadow: '0 0 20px var(--cyan-glow)' }}>{s.val}</div>
                <div style={{ fontFamily: 'var(--font-display)', fontSize: '0.58rem', color: 'var(--text3)', letterSpacing: '0.12em' }}>{s.lbl}</div>
              </div>
            ))}
          </div>
        </RevealWrapper>
      </div>

      <div className="section">
        <RevealWrapper>
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', flexWrap: 'wrap', gap: '1rem', marginBottom: '2.5rem' }}>
            <div style={{ display: 'flex', flexWrap: 'wrap', gap: '0.45rem' }}>
              {ALL_TAGS.map(tag => (
                <button key={tag} onClick={() => setActiveTag(tag)} className="btn" style={{
                  padding: '0.38rem 0.85rem', fontSize: '0.62rem', borderRadius: 100,
                  background: activeTag === tag ? 'var(--cyan)' : 'transparent',
                  color: activeTag === tag ? '#000' : 'var(--text2)',
                  border: `1px solid ${activeTag === tag ? 'var(--cyan)' : 'var(--border)'}`,
                  boxShadow: activeTag === tag ? '0 0 16px var(--cyan-glow)' : 'none',
                }}>{tag}</button>
              ))}
            </div>
            <div style={{ display: 'flex', gap: '0.45rem' }}>
              {[{ val: 'latest', lbl: 'Latest' }, { val: 'popular', lbl: 'Popular' }].map(s => (
                <button key={s.val} onClick={() => setSort(s.val)} className="btn" style={{
                  padding: '0.38rem 0.85rem', fontSize: '0.62rem', borderRadius: 100,
                  background: sort === s.val ? 'var(--pink-dim)' : 'transparent',
                  color: sort === s.val ? 'var(--pink)' : 'var(--text2)',
                  border: `1px solid ${sort === s.val ? 'var(--pink)' : 'var(--border)'}`,
                }}>{s.lbl}</button>
              ))}
            </div>
          </div>
        </RevealWrapper>

        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(310px, 1fr))', gap: '1.5rem' }}>
          {filtered.map((blog, i) => <BlogCard key={blog.id} blog={blog} index={i} />)}
        </div>

        <RevealWrapper delay={200}>
          <div style={{
            marginTop: '4rem', padding: '2.5rem', textAlign: 'center',
            border: '1px dashed var(--border2)', borderRadius: 'var(--radius-lg)',
            background: 'var(--cyan-dim)',
          }}>
            <div style={{ fontFamily: 'var(--font-display)', fontSize: '1.15rem', fontWeight: 700, color: 'var(--text)', marginBottom: '0.5rem' }}>
              More articles coming soon ✍️
            </div>
            <p style={{ color: 'var(--text2)', fontSize: '0.88rem', marginBottom: '1.5rem' }}>
              Follow for in-depth ML tutorials, paper breakdowns, and project write-ups.
            </p>
            <a href="https://hashnode.com" target="_blank" rel="noopener noreferrer" className="btn btn-cyan">
              Follow on Hashnode →
            </a>
          </div>
        </RevealWrapper>
      </div>
      <Footer />
    </div>
  );
}
