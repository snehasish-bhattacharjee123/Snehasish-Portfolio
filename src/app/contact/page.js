'use client';
import { useState, useRef } from 'react';
import Navbar from '../../components/Navbar';
import Footer from '../../components/Footer';
import RevealWrapper from '../../hooks/useScrollReveal';
import { PERSONAL } from '../../data/portfolio';

/* ─── EmailJS config: replace with your own IDs ─────────────────
   Sign up free at https://www.emailjs.com/
   SERVICE_ID  → Dashboard > Email Services
   TEMPLATE_ID → Dashboard > Email Templates
   PUBLIC_KEY  → Dashboard > Account > Public Key
──────────────────────────────────────────────────────────────── */
const EMAILJS_SERVICE  = 'YOUR_SERVICE_ID';
const EMAILJS_TEMPLATE = 'YOUR_TEMPLATE_ID';
const EMAILJS_KEY      = 'YOUR_PUBLIC_KEY';

const CONTACT_ITEMS = [
  { icon: '📧', label: 'Email',    value: PERSONAL.email,    href: `mailto:${PERSONAL.email}`,    accent: 'var(--cyan)' },
  { icon: '⌥',  label: 'GitHub',  value: 'alex-neural',     href: PERSONAL.github,               accent: 'var(--text2)' },
  { icon: '💼', label: 'LinkedIn', value: 'alex-neural',     href: PERSONAL.linkedin,             accent: 'var(--cyan)' },
  { icon: '✍️', label: 'Blog',    value: 'Hashnode',        href: PERSONAL.hashnode,             accent: 'var(--pink)' },
];

const FAQ = [
  { q: 'Are you open to internships?',           a: 'Yes! I actively seek ML/AI internships, research assistant roles, and part-time positions.' },
  { q: 'Do you take freelance ML projects?',     a: 'Absolutely. I enjoy working on well-scoped ML problems — data pipelines, model training, API deployment.' },
  { q: 'Can we collaborate on open-source?',     a: 'Always! Reach out with the project and what you need — I love meaningful OSS contributions.' },
  { q: 'How fast do you typically respond?',     a: 'Usually within 24 hours. For urgent matters, email is fastest.' },
];

function FAQItem({ q, a }) {
  const [open, setOpen] = useState(false);
  return (
    <div
      style={{
        border: '1px solid var(--border)',
        borderRadius: 'var(--radius)',
        overflow: 'hidden',
        transition: 'border-color 0.2s',
        borderColor: open ? 'var(--border2)' : 'var(--border)',
      }}
    >
      <button
        onClick={() => setOpen(o => !o)}
        style={{
          width: '100%',
          display: 'flex',
          justifyContent: 'space-between',
          alignItems: 'center',
          padding: '1rem 1.25rem',
          background: open ? 'var(--cyan-dim)' : 'transparent',
          border: 'none',
          color: 'var(--text)',
          fontFamily: 'var(--font-ui)',
          fontSize: '0.95rem',
          cursor: 'pointer',
          textAlign: 'left',
          transition: 'background 0.2s',
        }}
      >
        <span>{q}</span>
        <span style={{
          fontFamily: 'var(--font-display)',
          fontSize: '1.2rem',
          color: 'var(--cyan)',
          transition: 'transform 0.25s',
          transform: open ? 'rotate(45deg)' : 'none',
          flexShrink: 0,
          marginLeft: '1rem',
        }}>+</span>
      </button>
      {open && (
        <div style={{
          padding: '0 1.25rem 1rem',
          color: 'var(--text2)',
          fontFamily: 'var(--font-ui)',
          fontSize: '0.9rem',
          lineHeight: 1.7,
          borderTop: '1px solid var(--border)',
          paddingTop: '0.85rem',
        }}>{a}</div>
      )}
    </div>
  );
}

export default function ContactPage() {
  const [form, setForm]       = useState({ name: '', email: '', subject: '', message: '' });
  const [errors, setErrors]   = useState({});
  const [status, setStatus]   = useState('idle'); // idle | loading | success | error
  const [charCount, setCharCount] = useState(0);
  const formRef = useRef(null);

  const validate = () => {
    const e = {};
    if (!form.name.trim())           e.name    = 'Name is required';
    if (!form.email.trim())          e.email   = 'Email is required';
    else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(form.email)) e.email = 'Enter a valid email';
    if (!form.subject.trim())        e.subject = 'Subject is required';
    if (form.message.trim().length < 20) e.message = 'Message must be at least 20 characters';
    setErrors(e);
    return Object.keys(e).length === 0;
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setForm(f => ({ ...f, [name]: value }));
    if (name === 'message') setCharCount(value.length);
    if (errors[name]) setErrors(er => ({ ...er, [name]: '' }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!validate()) return;
    setStatus('loading');

    try {
      /* EmailJS send ─ uncomment & add your IDs to activate */
      // const emailjs = await import('@emailjs/browser');
      // await emailjs.send(EMAILJS_SERVICE, EMAILJS_TEMPLATE, {
      //   from_name:    form.name,
      //   from_email:   form.email,
      //   subject:      form.subject,
      //   message:      form.message,
      // }, EMAILJS_KEY);

      /* Simulated success for demo */
      await new Promise(r => setTimeout(r, 1500));
      setStatus('success');
      setForm({ name: '', email: '', subject: '', message: '' });
      setCharCount(0);
    } catch {
      setStatus('error');
    }
  };

  const InputField = ({ name, label, type = 'text', placeholder, multiline }) => {
    const hasError = !!errors[name];
    const Tag = multiline ? 'textarea' : 'input';
    return (
      <div style={{ display: 'flex', flexDirection: 'column', gap: '0.35rem' }}>
        <label style={{
          fontFamily: 'var(--font-display)',
          fontSize: '0.62rem',
          letterSpacing: '0.12em',
          color: hasError ? 'var(--pink)' : 'var(--text2)',
          textTransform: 'uppercase',
        }}>{label}</label>
        <Tag
          name={name}
          type={type}
          value={form[name]}
          onChange={handleChange}
          placeholder={placeholder}
          rows={multiline ? 5 : undefined}
          className="input-cyber"
          style={{
            resize: multiline ? 'vertical' : undefined,
            minHeight: multiline ? 130 : undefined,
            borderColor: hasError ? 'var(--pink)' : undefined,
            boxShadow: hasError ? '0 0 12px rgba(255,0,170,0.15)' : undefined,
          }}
        />
        {hasError && (
          <span style={{ fontFamily: 'var(--font-display)', fontSize: '0.6rem', color: 'var(--pink)' }}>
            ⚠ {errors[name]}
          </span>
        )}
        {name === 'message' && (
          <span style={{
            fontFamily: 'var(--font-display)',
            fontSize: '0.58rem',
            color: charCount > 500 ? 'var(--yellow)' : 'var(--text3)',
            textAlign: 'right',
          }}>{charCount}/1000</span>
        )}
      </div>
    );
  };

  return (
    <div className="page-wrapper circuit-bg">
      <Navbar />

      {/* Hero */}
      <div style={{
        borderBottom: '1px solid var(--border)',
        background: 'linear-gradient(180deg, rgba(0,255,200,0.03) 0%, transparent 100%)',
        padding: '5rem 2rem 3.5rem',
        textAlign: 'center',
      }}>
        <RevealWrapper>
          <span className="sec-badge" style={{ display: 'inline-flex', marginBottom: '1.25rem' }}>// 08 — Contact</span>
          <h1 className="sec-title">Let's Build Together</h1>
          <p style={{ fontFamily: 'var(--font-ui)', fontSize: '1.05rem', color: 'var(--text2)', maxWidth: 560, margin: '0 auto' }}>
            Open to research collaboration, internships, freelance ML projects, and interesting conversations about AI.
          </p>
        </RevealWrapper>

        {/* Availability status */}
        <RevealWrapper delay={150}>
          <div style={{
            display: 'inline-flex',
            alignItems: 'center',
            gap: '0.6rem',
            marginTop: '2rem',
            padding: '0.5rem 1.25rem',
            border: '1px solid rgba(0,255,136,0.3)',
            borderRadius: 100,
            background: 'rgba(0,255,136,0.05)',
          }}>
            <span className="status-dot green" />
            <span style={{ fontFamily: 'var(--font-display)', fontSize: '0.65rem', color: 'var(--text2)', letterSpacing: '0.08em' }}>
              AVAILABLE FOR OPPORTUNITIES
            </span>
          </div>
        </RevealWrapper>
      </div>

      <div className="section">
        <div style={{ display: 'grid', gridTemplateColumns: '1fr 1.25fr', gap: '4rem', alignItems: 'start' }}>

          {/* LEFT — Info */}
          <div>
            <RevealWrapper>
              <h2 style={{
                fontFamily: 'var(--font-display)',
                fontWeight: 800,
                fontSize: 'clamp(1.6rem, 3vw, 2.2rem)',
                letterSpacing: '-0.03em',
                marginBottom: '1rem',
                lineHeight: 1.2,
              }}>
                Say hello,<br />
                <span style={{ color: 'var(--cyan)', textShadow: '0 0 30px var(--cyan-glow)' }}>let's connect.</span>
              </h2>
              <p style={{ color: 'var(--text2)', lineHeight: 1.8, marginBottom: '2rem', fontSize: '0.95rem' }}>
                Whether it's a groundbreaking ML idea, a research collaboration, or just a great conversation
                about AI — I'm all ears. Drop me a message and I'll respond within 24 hours.
              </p>
            </RevealWrapper>

            {/* Contact links */}
            <div style={{ display: 'flex', flexDirection: 'column', gap: '0.6rem', marginBottom: '2.5rem' }}>
              {CONTACT_ITEMS.map((item, i) => (
                <RevealWrapper key={item.label} delay={i * 60}>
                  <a
                    href={item.href}
                    target={item.href.startsWith('mailto') ? undefined : '_blank'}
                    rel="noopener noreferrer"
                    className="glass"
                    style={{
                      display: 'flex',
                      alignItems: 'center',
                      gap: '1rem',
                      padding: '0.9rem 1.1rem',
                      textDecoration: 'none',
                      color: 'var(--text)',
                      transition: 'all 0.22s',
                    }}
                    onMouseEnter={e => {
                      e.currentTarget.style.transform = 'translateX(8px)';
                      e.currentTarget.style.borderColor = item.accent;
                      e.currentTarget.style.background = `${item.accent}08`;
                    }}
                    onMouseLeave={e => {
                      e.currentTarget.style.transform = '';
                      e.currentTarget.style.borderColor = '';
                      e.currentTarget.style.background = '';
                    }}
                  >
                    <span style={{
                      width: 38, height: 38,
                      display: 'flex', alignItems: 'center', justifyContent: 'center',
                      fontSize: '1.1rem',
                      background: 'var(--cyan-dim)',
                      border: '1px solid var(--border)',
                      borderRadius: 8,
                      flexShrink: 0,
                    }}>{item.icon}</span>
                    <div>
                      <div style={{ fontFamily: 'var(--font-display)', fontSize: '0.58rem', color: 'var(--text3)', letterSpacing: '0.1em', marginBottom: '0.15rem' }}>
                        {item.label}
                      </div>
                      <div style={{ fontFamily: 'var(--font-ui)', fontSize: '0.88rem', color: 'var(--text)' }}>
                        {item.value}
                      </div>
                    </div>
                    <span style={{ marginLeft: 'auto', color: 'var(--text3)', fontSize: '0.8rem' }}>→</span>
                  </a>
                </RevealWrapper>
              ))}
            </div>

            {/* FAQ */}
            <RevealWrapper>
              <div style={{
                fontFamily: 'var(--font-display)',
                fontSize: '0.65rem',
                letterSpacing: '0.18em',
                color: 'var(--cyan)',
                marginBottom: '1rem',
                borderBottom: '1px solid var(--border)',
                paddingBottom: '0.5rem',
              }}>FAQ</div>
              <div style={{ display: 'flex', flexDirection: 'column', gap: '0.5rem' }}>
                {FAQ.map(f => <FAQItem key={f.q} {...f} />)}
              </div>
            </RevealWrapper>
          </div>

          {/* RIGHT — Form */}
          <RevealWrapper delay={100}>
            <div className="glass" style={{ padding: '2.5rem' }}>
              {/* Header */}
              <div style={{ marginBottom: '2rem' }}>
                <div style={{ fontFamily: 'var(--font-display)', fontWeight: 800, fontSize: '1.1rem', marginBottom: '0.3rem' }}>
                  Send a Message
                </div>
                <div style={{ fontFamily: 'var(--font-display)', fontSize: '0.6rem', color: 'var(--text3)', letterSpacing: '0.08em' }}>
                  ALL FIELDS REQUIRED · ENCRYPTED TRANSIT
                </div>
              </div>

              {status === 'success' ? (
                /* Success state */
                <div style={{
                  textAlign: 'center',
                  padding: '3rem 1.5rem',
                  border: '1px solid rgba(0,255,136,0.3)',
                  borderRadius: 'var(--radius)',
                  background: 'rgba(0,255,136,0.05)',
                }}>
                  <div style={{ fontSize: '3rem', marginBottom: '1rem' }}>✅</div>
                  <div style={{
                    fontFamily: 'var(--font-display)',
                    fontWeight: 800,
                    fontSize: '1.1rem',
                    color: '#00ff88',
                    marginBottom: '0.5rem',
                  }}>MESSAGE TRANSMITTED</div>
                  <p style={{ color: 'var(--text2)', fontSize: '0.88rem', marginBottom: '1.5rem' }}>
                    Thanks for reaching out! I'll get back to you within 24 hours.
                  </p>
                  <button
                    className="btn btn-outline"
                    onClick={() => setStatus('idle')}
                  >Send Another →</button>
                </div>
              ) : (
                <form ref={formRef} onSubmit={handleSubmit} noValidate>
                  <div style={{ display: 'flex', flexDirection: 'column', gap: '1.25rem' }}>
                    {/* Name + Email row */}
                    <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '1rem' }}>
                      <InputField name="name" label="Full Name" placeholder="Alex Neural" />
                      <InputField name="email" label="Email" type="email" placeholder="you@example.com" />
                    </div>
                    <InputField name="subject" label="Subject" placeholder="Collaboration Opportunity" />
                    <InputField name="message" label="Message" placeholder="Tell me about your project, idea, or question..." multiline />

                    {/* Error global */}
                    {status === 'error' && (
                      <div style={{
                        padding: '0.75rem 1rem',
                        background: 'rgba(255,0,170,0.08)',
                        border: '1px solid rgba(255,0,170,0.3)',
                        borderRadius: 8,
                        fontFamily: 'var(--font-display)',
                        fontSize: '0.65rem',
                        color: 'var(--pink)',
                        letterSpacing: '0.05em',
                      }}>
                        ⚠ TRANSMISSION FAILED — try emailing directly at {PERSONAL.email}
                      </div>
                    )}

                    <button
                      type="submit"
                      className="btn btn-cyan"
                      disabled={status === 'loading'}
                      style={{
                        width: '100%',
                        justifyContent: 'center',
                        padding: '1rem',
                        fontSize: '0.75rem',
                        opacity: status === 'loading' ? 0.7 : 1,
                        cursor: status === 'loading' ? 'wait' : 'pointer',
                      }}
                    >
                      {status === 'loading' ? (
                        <>
                          <span style={{
                            display: 'inline-block',
                            width: 14, height: 14,
                            border: '2px solid #000',
                            borderTopColor: 'transparent',
                            borderRadius: '50%',
                            animation: 'spin-slow 0.7s linear infinite',
                          }} />
                          TRANSMITTING...
                        </>
                      ) : 'SEND MESSAGE →'}
                    </button>

                    <p style={{
                      fontFamily: 'var(--font-display)',
                      fontSize: '0.58rem',
                      color: 'var(--text3)',
                      textAlign: 'center',
                      letterSpacing: '0.05em',
                    }}>
                      🔒 YOUR DATA IS NEVER SHARED WITH THIRD PARTIES
                    </p>
                  </div>
                </form>
              )}
            </div>
          </RevealWrapper>
        </div>
      </div>

      <Footer />

      <style>{`
        @media (max-width: 768px) {
          .contact-grid { grid-template-columns: 1fr !important; }
        }
      `}</style>
    </div>
  );
}
