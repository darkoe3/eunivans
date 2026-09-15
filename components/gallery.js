'use client';
import Image from 'next/image';
import { useState, useRef, useEffect, useCallback } from 'react';
import { X, ArrowLeft, ArrowRight, Expand } from 'lucide-react';
import { gallery } from '../lib/content';

export function GalleryLightbox({ items, index, onClose, onChange }) {
  const dialog = useRef(null);
  const item = items[index];

  useEffect(() => {
    const d = dialog.current;
    if (!d) return;

    const handleCancel = (event) => {
      event.preventDefault();
      onClose();
    };

    const handleKeydown = (event) => {
      if (event.key === 'ArrowRight') {
        event.preventDefault();
        onChange((index + 1) % items.length);
      }
      if (event.key === 'ArrowLeft') {
        event.preventDefault();
        onChange((index - 1 + items.length) % items.length);
      }
    };

    d.addEventListener('cancel', handleCancel);
    d.addEventListener('keydown', handleKeydown);
    if (!d.open) d.showModal();

    const originalOverflow = document.body.style.overflow;
    document.body.style.overflow = 'hidden';

    return () => {
      d.removeEventListener('cancel', handleCancel);
      d.removeEventListener('keydown', handleKeydown);
      if (d.open) d.close();
      document.body.style.overflow = originalOverflow;
      requestAnimationFrame(() => {
        const trigger = document.querySelector('.gallery-item:focus, .gallery-item:focus-visible');
        if (trigger instanceof HTMLElement) trigger.focus();
      });
    };
  }, [index, items, onClose, onChange]);

  return (
    <dialog ref={dialog} className="lightbox" aria-label="School gallery image viewer" onClick={(event) => {
      if (event.target === event.currentTarget) onClose();
    }}>
      <div className="lightbox-inner">
        <button className="lightbox-close" onClick={onClose} aria-label="Close image viewer" autoFocus>
          <X />
        </button>
        <Image src={item.src} alt={item.alt} width={1200} height={850} sizes="90vw" />
        <div className="lightbox-caption">
          <button aria-label="Previous image" onClick={() => onChange((index - 1 + items.length) % items.length)}>
            <ArrowLeft />
          </button>
          <div>
            <h2>{item.title}</h2>
            <p>Photo {index + 1} of {items.length}</p>
          </div>
          <button aria-label="Next image" onClick={() => onChange((index + 1) % items.length)}>
            <ArrowRight />
          </button>
        </div>
      </div>
    </dialog>
  );
}

export default function GalleryGrid() {
  const [category, setCategory] = useState('All');
  const [index, setIndex] = useState(null);
  const opener = useRef(null);
  const items = category === 'All' ? gallery : gallery.filter((item) => item.category === category);

  const close = useCallback(() => {
    setIndex(null);
    requestAnimationFrame(() => {
      opener.current?.focus();
    });
  }, []);

  return (
    <>
      <div className="gallery-filters" role="group" aria-label="Filter school gallery">
        {['All', 'Events', 'Academics', 'Achievements', 'School Life'].map((item) => (
          <button key={item} aria-pressed={category === item} onClick={() => setCategory(item)}>
            {item}
          </button>
        ))}
      </div>
      <p className="gallery-status" role="status">
        {items.length} {items.length === 1 ? 'photo' : 'photos'}
      </p>
      <div className="gallery-grid">
        {items.map((item, i) => (
          <button
            className="gallery-item"
            key={item.id}
            onClick={(event) => {
              opener.current = event.currentTarget;
              setIndex(i);
            }}
            aria-label={`View ${item.title}`}
          >
            <div className="image-wrap">
              <Image src={item.src} alt={item.alt} width={1200} height={850} sizes="(max-width: 640px) 100vw, (max-width: 1000px) 50vw, 33vw" />
              <span className="expand-icon"><Expand size={19} /></span>
            </div>
            <span className="mini-label">{item.category}</span>
            <h2>{item.title}</h2>
            <p>School photograph</p>
          </button>
        ))}
      </div>
      {index !== null && <GalleryLightbox items={items} index={index} onClose={close} onChange={setIndex} />}
    </>
  );
}
