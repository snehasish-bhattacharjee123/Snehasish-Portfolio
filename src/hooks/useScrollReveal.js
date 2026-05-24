'use client';
import { useEffect, useRef } from 'react';

/**
 * useScrollReveal — attaches IntersectionObserver to a ref
 * and adds class "in" when element enters viewport.
 * The element should already have className="reveal".
 */
export function useScrollReveal(options = {}) {
  const ref = useRef(null);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;

    const obs = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          el.classList.add('in');
          obs.unobserve(el);
        }
      },
      { threshold: options.threshold ?? 0.12, ...options }
    );

    obs.observe(el);
    return () => obs.disconnect();
  }, []);

  return ref;
}

/**
 * RevealWrapper — wraps children in a reveal div
 */
export default function RevealWrapper({ children, delay = 0, className = '', style = {} }) {
  const ref = useScrollReveal();
  return (
    <div
      ref={ref}
      className={`reveal ${className}`}
      style={{ transitionDelay: `${delay}ms`, ...style }}
    >
      {children}
    </div>
  );
}
