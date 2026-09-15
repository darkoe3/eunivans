'use client';
import { useState, useRef, useEffect } from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { Menu, X, ArrowUpRight, Phone, MessageCircle, ArrowUp } from 'lucide-react';
import { Brand } from './ui';
import { links, school } from '../lib/content';

export function AnnouncementBar(){return <div className="announcement"><div className="container"><span>Admissions enquiries are welcome for Creche, Kindergarten, Primary and Junior High School.</span><a href={`tel:${school.phoneHref}`}><Phone size={13}/> Let’s talk <ArrowUpRight size={13}/></a></div></div>}

export function Navbar(){
  const [open, setOpen] = useState(false);
  const pathname = usePathname();
  const toggle = useRef(null);

  useEffect(() => {
    if (!open) return;

    const handleEscape = (event) => {
      if (event.key === 'Escape') {
        event.preventDefault();
        setOpen(false);
        requestAnimationFrame(() => toggle.current?.focus());
      }
    };

    window.addEventListener('keydown', handleEscape);
    return () => window.removeEventListener('keydown', handleEscape);
  }, [open]);

  return (
    <header className="site-header">
      <div className="container nav-inner">
        <Brand />
        <nav aria-label="Main navigation" className="desktop-nav">
          {links.map(([label, href]) => (
            <Link key={href} href={href} aria-current={pathname === href ? 'page' : undefined}>
              {label}
            </Link>
          ))}
        </nav>
        <Link className="button gold-button nav-apply" href="/admissions">
          Apply for Admission <ArrowUpRight size={16} />
        </Link>
        <a className="button purple-button nav-app" href="https://app.velttech.org/login" target="_blank" rel="noopener noreferrer">
          School App <ArrowUpRight size={16} />
        </a>
        <button
          ref={toggle}
          className="menu-toggle"
          onClick={() => setOpen(!open)}
          aria-expanded={open}
          aria-controls="mobile-menu"
          aria-label={open ? 'Close menu' : 'Open menu'}
        >
          {open ? <X /> : <Menu />}
        </button>
      </div>

      {open && (
        <nav
          id="mobile-menu"
          aria-label="Mobile navigation"
          className="mobile-menu"
        >
          {links.map(([label, href]) => (
            <Link key={href} href={href} aria-current={pathname === href ? 'page' : undefined} onClick={() => setOpen(false)}>
              {label}
              <ArrowUpRight size={17} />
            </Link>
          ))}
          <Link className="button gold-button" href="/admissions" onClick={() => setOpen(false)}>
            Apply for Admission
          </Link>
          <a className="button purple-button" href="https://app.velttech.org/login" target="_blank" rel="noopener noreferrer" onClick={() => setOpen(false)}>
            School App <ArrowUpRight size={16} />
          </a>
        </nav>
      )}
    </header>
  );
}

export function FloatingActions() {
  return (
    <div className="floating-actions">
      <button
        aria-label="Back to top"
        onClick={() => window.scrollTo({
          top: 0,
          behavior: window.matchMedia('(prefers-reduced-motion: reduce)').matches ? 'instant' : 'smooth',
        })}
      >
        <ArrowUp size={19} />
      </button>
      <a className="whatsapp" href={school.whatsapp} aria-label="Chat with Eunivans on WhatsApp">
        <MessageCircle size={25} />
      </a>
    </div>
  );
}

