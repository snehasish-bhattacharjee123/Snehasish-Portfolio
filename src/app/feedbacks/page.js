'use client';
import { useMemo } from 'react';
import Navbar from '../../components/Navbar';
import Footer from '../../components/Footer';
import RevealWrapper from '../../hooks/useScrollReveal';
import { FEEDBACKS } from '../../data/portfolio';

function Stars({ rating, size = '1rem' }) {
  return (
    <div className="stars">
      {[1,2,3,4,5].map(s => (
        <span key={s} className={`star ${s <= rating ? 'filled' : ''}`} style={{ fontSize: size }}>★</span>
      ))}
    </div>
  );
}

function CircleProgress({ value, label, color, size = 100 }) {
  const r = 40;
  const circumference = 2 * Math.PI * r;
  const dash = (value / 100) * circumference;
  return (
    <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: '0.5rem' }}>
      <svg width={size} height={size} viewBox="0 0 100 100">
        <circle cx="50" cy="50" r={r} fill="none" stroke="rgba(255,255,255,0.05)" strokeWidth="8"/>
        <circle
          cx="50" cy="50" r={r} fill="none"
          stroke={color} strokeWidth="8"
          strokeDasharray={`${dash} ${circumference}`}
          strokeDashoffset={circumference * 0.25}
          strokeLinecap="round"
          style={{ filter: `drop-shadow(0 0 6px ${color})` }}
        />
        <text x="50" y="55" textAnchor="middle" fill={color}
          fontSize="16" fontFamily="var(--font-display)" fontWeight="900">
          {value}%
        </text>
      </svg>
      <span style={{
        fontFamily: 'var(--font-display)',
        fontSize: '0.58rem',
        letterSpacing: '0.1em',
        color: 'var(--text3)',
        textTransform: 'uppercase',
        textAlign: 'center',
        maxWidth: size,
      }}>{label}</span>
    </div>
  );
}

export default function FeedbacksPage() {
  const avgRating  = useMemo(() => (FEEDBACKS.reduce((s, f) => s + f.rating, 0) / FEEDBACKS.length).toFixed(1), []);
  const avgBoost   = useMemo(() => Math.round(FEEDBACKS.reduce((s, f) => s + f.productivity_boost, 0) / FEEDBACKS.length), []);

  return (
    <div className="page-wrapper circuit-bg">
      <Navbar />

      <div style={{
        borderBottom: '1px solid var(--border)',
        background: 'linear-gradient(180deg, rgba(255,0,170,0.03) 0%, transparent 100%)',
        padding: '5rem 2rem 3rem',
        textAlign: 'center',
      }}>
        <span className="sec-badge" style={{ display: 'inline-flex', marginBottom: '1.25rem', borderColor: 'rgba(255,0,170,0.3)', color: 'var(--pink)', background: 'rgba(255,0,170,0.06)' }}>// 06 — Feedbacks</span>
        <h1 className="sec-title">What People Say</h1>
        <p style={{ fontFamily: 'var(--font-ui)', fontSize: '1.05rem', color: 'var(--text2)', maxWidth: 560, margin: '0 auto' }}>
          Real feedback from professors, collaborators, and clients.
        </p>
      </div>

      {/* ── STATS SUMMARY ── */}
      <div className="section" style={{ paddingBottom: '2rem' }}>
        <RevealWrapper>
          <div className="glass" style={{
            padding: '2.5rem',
            background: 'linear-gradient(135deg, rgba(0,255,200,0.04), rgba(255,0,170,0.03))',
            marginBottom: '3rem',
          }}>
            <div style={{
              display: 'flex',
              justifyContent: 'space-around',
              alignItems: 'center',
              flexWrap: 'wrap',
              gap: '2rem',
            }}>
              <CircleProgress value={96} label="Client Satisfaction"   color="var(--cyan)"   />
              <CircleProgress value={94} label="On-Time Delivery"      color="var(--pink)"   />
              <CircleProgress value={avgBoost} label="Avg Productivity Boost" color="var(--yellow)" />
              <div style={{ textAlign: 'center' }}>
                <div style={{
                  fontFamily: 'var(--font-display)',
                  fontSize: '3.5rem',
                  fontWeight: 900,
                  color: 'var(--yellow)',
                  textShadow: '0 0 30px rgba(255,230,0,0.4)',
                  lineHeight: 1,
                  marginBottom: '0.3rem',
                }}>{avgRating}</div>
                <Stars rating={Math.round(Number(avgRating))} size="1.2rem" />
                <div style={{
                  fontFamily: 'var(--font-display)',
                  fontSize: '0.58rem',
                  letterSpacing: '0.1em',
                  color: 'var(--text3)',
                  textTransform: 'uppercase',
                  marginTop: '0.5rem',
                }}>Average Rating</div>
              </div>
              <div style={{ textAlign: 'center' }}>
                <div style={{
                  fontFamily: 'var(--font-display)',
                  fontSize: '3.5rem',
                  fontWeight: 900,
                  color: 'var(--pink)',
                  textShadow: '0 0 30px rgba(255,0,170,0.4)',
                  lineHeight: 1,
                  marginBottom: '0.3rem',
                }}>{FEEDBACKS.length}</div>
                <div style={{
                  fontFamily: 'var(--font-display)',
                  fontSize: '0.58rem',
                  letterSpacing: '0.1em',
                  color: 'var(--text3)',
                  textTransform: 'uppercase',
                  marginTop: '0.35rem',
                }}>Happy Clients</div>
              </div>
            </div>
          </div>
        </RevealWrapper>

        {/* ── TESTIMONIAL CARDS ── */}
        <div style={{
          display: 'grid',
          gridTemplateColumns: 'repeat(auto-fill, minmax(320px, 1fr))',
          gap: '1.5rem',
        }}>
          {FEEDBACKS.map((f, i) => (
            <RevealWrapper key={f.id} delay={i * 80}>
              <div className="glass" style={{
                padding: '1.75rem',
                height: '100%',
                display: 'flex',
                flexDirection: 'column',
                transition: 'all 0.3s',
                position: 'relative',
                overflow: 'hidden',
              }}
              onMouseEnter={e => {
                e.currentTarget.style.transform = 'translateY(-8px)';
                e.currentTarget.style.borderColor = 'var(--border2)';
                e.currentTarget.style.boxShadow = '0 30px 80px rgba(0,0,0,0.6), 0 0 50px rgba(255,0,170,0.06)';
              }}
              onMouseLeave={e => {
                e.currentTarget.style.transform = '';
                e.currentTarget.style.borderColor = '';
                e.currentTarget.style.boxShadow = '';
              }}>

                {/* Quote mark */}
                <div style={{
                  position: 'absolute',
                  top: '1rem', right: '1.25rem',
                  fontSize: '4rem',
                  lineHeight: 1,
                  color: 'var(--border)',
                  fontFamily: 'Georgia, serif',
                  userSelect: 'none',
                }}>"</div>

                {/* Rating + skill tag */}
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '1rem' }}>
                  <Stars rating={f.rating} />
                  <span className="tag tag-pink" style={{ fontSize: '0.6rem' }}>{f.skill_tag}</span>
                </div>

                {/* Review text */}
                <p style={{
                  fontFamily: 'var(--font-ui)',
                  fontSize: '0.88rem',
                  color: 'var(--text2)',
                  lineHeight: 1.75,
                  flex: 1,
                  marginBottom: '1.5rem',
                  fontStyle: 'italic',
                }}>"{f.review}"</p>

                {/* Productivity bar */}
                <div style={{ marginBottom: '1.25rem' }}>
                  <div style={{
                    display: 'flex',
                    justifyContent: 'space-between',
                    alignItems: 'center',
                    marginBottom: '0.4rem',
                  }}>
                    <span style={{ fontFamily: 'var(--font-display)', fontSize: '0.58rem', color: 'var(--text3)', letterSpacing: '0.1em', textTransform: 'uppercase' }}>Productivity Boost</span>
                    <span style={{ fontFamily: 'var(--font-display)', fontSize: '0.65rem', color: 'var(--cyan)' }}>+{f.productivity_boost}%</span>
                  </div>
                  <div className="progress-bar">
                    <div className="progress-fill" style={{ width: `${f.productivity_boost}%` }} />
                  </div>
                </div>

                {/* Author */}
                <div style={{
                  display: 'flex',
                  alignItems: 'center',
                  gap: '0.75rem',
                  paddingTop: '1rem',
                  borderTop: '1px solid var(--border)',
                }}>
                  {/* Avatar placeholder */}
                  <div style={{
                    width: 42, height: 42,
                    borderRadius: '50%',
                    background: `linear-gradient(135deg, rgba(0,255,200,0.2), rgba(255,0,170,0.2))`,
                    border: '2px solid var(--border2)',
                    display: 'flex', alignItems: 'center', justifyContent: 'center',
                    fontSize: '1.1rem',
                    flexShrink: 0,
                  }}>
                    {f.name.charAt(0)}
                  </div>
                  <div>
                    <div style={{
                      fontFamily: 'var(--font-display)',
                      fontSize: '0.82rem',
                      fontWeight: 700,
                      color: 'var(--text)',
                    }}>{f.name}</div>
                    <div style={{
                      fontFamily: 'var(--font-ui)',
                      fontSize: '0.72rem',
                      color: 'var(--text3)',
                    }}>{f.role}</div>
                  </div>
                </div>
              </div>
            </RevealWrapper>
          ))}
        </div>
      </div>

      <Footer />
    </div>
  );
}
