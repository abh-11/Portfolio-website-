"use client";

import Image from "next/image";
import { useRef, useState } from "react";
import type { GalleryImage } from "@/data/portfolio";
import { withBasePath } from "@/lib/site";
import { Icon } from "./Icon";

export default function Gallery({ images }: { images: GalleryImage[] }) {
  const dialog = useRef<HTMLDialogElement>(null);
  const [current, setCurrent] = useState(0);
  const selected = images[current];

  function advance(by: number) {
    setCurrent((index) => (index + by + images.length) % images.length);
  }

  if (!selected) return <p>Gallery images will appear here when published.</p>;

  return (
    <>
      <div className="journal-photos">
        {images.map((image, index) => (
          <a
            className="journal-photo"
            key={image.src}
            href={withBasePath(image.src)}
            aria-label={`View ${image.title}`}
            onClick={(event) => {
              if (!dialog.current?.showModal || event.metaKey || event.ctrlKey || event.shiftKey || event.altKey) return;
              event.preventDefault();
              setCurrent(index);
              dialog.current.showModal();
            }}
          >
            <span className="journal-photo-frame">
              <Image src={withBasePath(image.src)} alt={image.alt} fill sizes="(max-width: 580px) 88vw, 30vw" />
            </span>
            <span className="journal-photo-caption">
              {image.title}
              <Icon name="arrow-up-right" size={16} />
            </span>
          </a>
        ))}
      </div>
      <dialog
        ref={dialog}
        className="journal-lightbox"
        aria-labelledby="photo-viewer-title"
        onKeyDown={(event) => {
          if (event.key === "ArrowLeft" || event.key === "ArrowRight") {
            event.preventDefault();
            advance(event.key === "ArrowLeft" ? -1 : 1);
          }
        }}
        onClick={(event) => {
          if (event.target === event.currentTarget) dialog.current?.close();
        }}
      >
        <div className="journal-viewer">
          <button className="journal-close" type="button" onClick={() => dialog.current?.close()} aria-label="Close gallery viewer">
            <Icon name="x" />
          </button>
          <div className="journal-large-photo">
            <Image src={withBasePath(selected.src)} alt={selected.alt} fill sizes="(max-width: 900px) 94vw, 900px" />
          </div>
          <div className="journal-viewer-controls">
            <p aria-live="polite" aria-atomic="true">
              <span id="photo-viewer-title">{selected.title}</span>
              <span className="journal-position">{current + 1} / {images.length}</span>
            </p>
            {images.length > 1 && (
              <div className="journal-arrows">
                <button type="button" onClick={() => advance(-1)} aria-label="Previous image"><Icon name="arrow-right" className="journal-back" /></button>
                <button type="button" onClick={() => advance(1)} aria-label="Next image"><Icon name="arrow-right" /></button>
              </div>
            )}
          </div>
        </div>
      </dialog>
    </>
  );
}
