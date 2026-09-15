'use client';
import { useState } from 'react';
import { ArrowUpRight, CheckCircle, LoaderCircle } from 'lucide-react';

const admissionsFields = [
  ['parent', 'Parent or guardian’s name', 'text'],
  ['phone', 'Telephone number', 'tel'],
  ['email', 'Email address', 'email'],
  ['child', 'Child’s name', 'text'],
  ['programme', 'Programme or class of interest', 'select'],
  ['age', 'Child’s current age', 'number'],
  ['contact', 'Preferred contact method', 'select'],
  ['message', 'Message', 'textarea'],
];

const contactFields = [
  ['parent', 'Your name', 'text'],
  ['phone', 'Telephone number', 'tel'],
  ['email', 'Email address', 'email'],
  ['message', 'Message', 'textarea'],
];

export function EnquiryForm({ admissions = false }) {
  const [errors, setErrors] = useState({});
  const [status, setStatus] = useState('idle');
  const fields = admissions ? admissionsFields : contactFields;

  async function submit(event) {
    event.preventDefault();
    const form = event.currentTarget;
    const data = Object.fromEntries(new FormData(form));
    const next = {};

    for (const [name, label, type] of fields) {
      const value = String(data[name] || '').trim();

      if (!value) {
        next[name] = `Please enter ${label.toLowerCase()}.`;
      } else if (type === 'email' && !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(value)) {
        next[name] = 'Please enter a valid email address.';
      } else if (type === 'tel' && !/^\+?[\d\s()-]{9,20}$/.test(value)) {
        next[name] = 'Please enter a valid telephone number.';
      } else if (type === 'number' && (!Number.isFinite(Number(value)) || Number(value) < 0 || Number(value) > 25)) {
        next[name] = 'Please enter an age between 0 and 25.';
      }
    }

    if (!data.consent) {
      next.consent = 'Please provide consent to continue.';
    }

    setErrors(next);

    if (Object.keys(next).length) {
      setStatus('idle');
      const firstErrorField = form.elements.namedItem(Object.keys(next)[0]);
      firstErrorField?.focus();
      return;
    }

    setStatus('loading');
    await new Promise((resolve) => setTimeout(resolve, 700));
    setStatus('success');
    form.reset();
  }

  return (
    <form className="enquiry-form" onSubmit={submit} noValidate>
      <div className="form-heading">
        <span className="eyebrow">Let’s start a conversation</span>
        <h2>{admissions ? 'Admissions enquiry' : 'Send us a message'}</h2>
        <p className="notice">Demo form — messages are not sent. Please call, email or WhatsApp the school for a response.</p>
      </div>

      <div className="form-grid">
        {fields.map(([name, label, type]) => (
          <div key={name} className={type === 'textarea' ? 'full' : ''}>
            <label htmlFor={`${admissions ? 'admissions' : 'contact'}-${name}`}>
              {label} <span aria-hidden="true">*</span>
            </label>

            {type === 'select' ? (
              <select
                id={`${admissions ? 'admissions' : 'contact'}-${name}`}
                name={name}
                required
                aria-label={label}
                aria-invalid={!!errors[name]}
                aria-describedby={errors[name] ? `${name}-error` : undefined}
                defaultValue=""
              >
                <option value="" disabled>Select an option</option>
                {(name === 'programme'
                  ? ['Creche', 'Kindergarten', 'Primary — Class 1', 'Primary — Class 2', 'Primary — Class 3', 'Primary — Class 4', 'Primary — Class 5', 'Primary — Class 6', 'JHS 1', 'JHS 2', 'JHS 3']
                  : ['Telephone', 'Email', 'WhatsApp']
                ).map((option) => (
                  <option key={option} value={option}>{option}</option>
                ))}
              </select>
            ) : type === 'textarea' ? (
              <textarea
                id={`${admissions ? 'admissions' : 'contact'}-${name}`}
                name={name}
                rows={4}
                required
                aria-label={label}
                maxLength={3000}
                aria-invalid={!!errors[name]}
                aria-describedby={errors[name] ? `${name}-error` : undefined}
              />
            ) : (
              <input
                id={`${admissions ? 'admissions' : 'contact'}-${name}`}
                name={name}
                type={type}
                required
                aria-label={label}
                min={type === 'number' ? 0 : undefined}
                max={type === 'number' ? 25 : undefined}
                step={type === 'number' ? '1' : undefined}
                autoComplete={name === 'parent' ? 'name' : name === 'phone' ? 'tel' : name === 'email' ? 'email' : 'off'}
                aria-invalid={!!errors[name]}
                aria-describedby={errors[name] ? `${name}-error` : undefined}
              />
            )}

            {errors[name] && <p id={`${name}-error`} className="error">{errors[name]}</p>}
          </div>
        ))}
      </div>

      <label className="checkbox">
        <input type="checkbox" name="consent" required aria-invalid={!!errors.consent} aria-describedby={errors.consent ? 'consent-error' : undefined} />
        <span>I consent to the school using these details to respond to my enquiry. This demo does not send or store my information.</span>
      </label>
      {errors.consent && <p id="consent-error" className="error">{errors.consent}</p>}

      <button className="button purple-button" disabled={status === 'loading'} type="submit">
        {status === 'loading' ? (
          <>
            <LoaderCircle className="spin" size={18} />
            Checking enquiry…
          </>
        ) : (
          <>
            Preview enquiry submission <ArrowUpRight size={18} />
          </>
        )}
      </button>

      <div role="status" aria-live="polite">
        {status === 'success' && (
          <p className="success">
            <CheckCircle size={20} />
            Your enquiry passed validation. This is a demo: nothing was sent. Please contact the school directly.
          </p>
        )}
      </div>
    </form>
  );
}

export function AdmissionsForm() {
  return <EnquiryForm admissions />;
}

export function ContactForm() {
  return <EnquiryForm />;
}
