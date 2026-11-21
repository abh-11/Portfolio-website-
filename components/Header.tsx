"use client";

import { useEffect, useRef, useState, useSyncExternalStore } from "react";
import { usePathname } from "next/navigation";
import { withBasePath } from "@/lib/site";
import Icon from "./Icon";
import "./Header.css";

const sections = [
  ["home", "Home"], ["about", "About"], ["journal", "Journal"],
  ["playground", "Playground"], ["contact", "Contact"],
] as const;

function readPreference(key: string) {
  try { return localStorage.getItem(key); } catch { return null; }
}

function savePreference(key: string, value: string) {
  try { localStorage.setItem(key, value); } catch { /* Controls still work for this visit. */ }
}

function subscribeTheme(notify: () => void) {
  const root = document.documentElement;
  const media = window.matchMedia("(prefers-color-scheme: dark)");
  const sync = () => {
    const saved = readPreference("portfolio-theme");
    root.dataset.theme = saved === "light" || saved === "dark" ? saved : media.matches ? "dark" : "light";
  };
  const observer = new MutationObserver(notify);
  const syncStorage = (event: StorageEvent) => {
    if (!event.key || event.key === "portfolio-theme") sync();
  };
  observer.observe(root, { attributes: true, attributeFilter: ["data-theme"] });
  media.addEventListener("change", sync);
  window.addEventListener("storage", syncStorage);
  if (!root.dataset.theme) sync();
  return () => {
    observer.disconnect();
    media.removeEventListener("change", sync);
    window.removeEventListener("storage", syncStorage);
  };
}

const isDarkTheme = () => document.documentElement.dataset.theme === "dark";
const serverTheme = () => false;

function ThemeButton() {
  const dark = useSyncExternalStore(subscribeTheme, isDarkTheme, serverTheme);
  function toggle() {
    const theme = isDarkTheme() ? "light" : "dark";
    document.documentElement.dataset.theme = theme;
    savePreference("portfolio-theme", theme);
  }
  return (
    <button className="head-circle theme-switch" type="button" aria-label="Dark theme" title="Toggle dark theme" aria-pressed={dark} onClick={toggle}>
      <Icon className="head-sun" name="sun" size={18} /><Icon className="head-moon" name="moon" size={17} />
    </button>
  );
}

function MusicButton() {
  const audioRef = useRef<HTMLAudioElement>(null);
  const playback = useRef({ sequence: 0 });
  const [playing, setPlaying] = useState(false);
  const [message, setMessage] = useState("");
  useEffect(() => {
    const audio = audioRef.current;
    const state = playback.current;
    return () => { state.sequence++; audio?.pause(); };
  }, []);
  async function toggle() {
    const audio = audioRef.current;
    if (!audio) return;
    setMessage("");
    const token = ++playback.current.sequence;
    if (!audio.paused) {
      audio.pause();
      savePreference("portfolio-music", "off");
      setPlaying(false);
      return;
    }
    if (!audio.getAttribute("src")) audio.src = withBasePath("/audio/forest-air.mp3");
    audio.volume = 0.38;
    try {
      await audio.play();
      if (playback.current.sequence === token) {
        savePreference("portfolio-music", "on");
        setPlaying(true);
      }
    } catch {
      if (playback.current.sequence === token) {
        setPlaying(false);
        setMessage("Audio is unavailable. Try the music button again.");
      }
    }
  }
  const pref = useSyncExternalStore(subscribeStorage, musicPreference, serverPreference);
  return (
    <span className="head-audio">
      <button type="button" className="head-music" aria-pressed={playing} aria-label={`Calm music: ${playing ? "On" : "Off"}`} title={playing ? "Pause calm music" : pref === "on" ? "Resume calm music" : "Play calm music"} onClick={toggle}>
        <Icon name="music" size={16}/><span>Calm music: {playing ? "On" : "Off"}</span>
      </button>
      <audio ref={audioRef} loop preload="none" onPause={() => setPlaying(false)} onError={() => { setPlaying(false); setMessage("Audio is unavailable. Try the music button again."); }} />
      <span className={message ? "head-feedback" : "head-visually-hidden"} role="status">{message}</span>
    </span>
  );
}
const subscribeStorage = (notify: () => void) => {
  window.addEventListener("storage", notify);
  return () => window.removeEventListener("storage", notify);
};
const musicPreference = () => readPreference("portfolio-music");
const serverPreference = () => null;

export default function Header({ name }: { name: string }) {
  const pathname = usePathname();
  const home = pathname === "/" ? "" : withBasePath("/");
  const [active, setActive] = useState("home");
  const [open, setOpen] = useState(false);
  const menuButton = useRef<HTMLButtonElement>(null);
  const navigation = useRef<HTMLElement>(null);
  const header = useRef<HTMLElement>(null);
  useEffect(() => {
    let frame = 0;
    const update = () => {
      let current = "home";
      for (const [id] of sections) {
        const el = document.getElementById(id);
        if (el && el.getBoundingClientRect().top <= (header.current?.offsetHeight ?? 68) + 50) current = id;
      }
      if (window.innerHeight + window.scrollY >= document.documentElement.scrollHeight - 2 && document.getElementById("contact")) current = "contact";
      setActive(current);
      frame = 0;
    };
    const schedule = () => { if (!frame) frame = requestAnimationFrame(update); };
    schedule();
    window.addEventListener("scroll", schedule, { passive: true });
    window.addEventListener("resize", schedule);
    return () => {
      cancelAnimationFrame(frame);
      window.removeEventListener("scroll", schedule);
      window.removeEventListener("resize", schedule);
    };
  }, []);
  useEffect(() => {
    if (!open) return;
    navigation.current?.querySelector<HTMLAnchorElement>("a")?.focus({ preventScroll: true });
    const onKey = (event: KeyboardEvent) => {
      if (event.key === "Escape") { setOpen(false); menuButton.current?.focus(); }
    };
    const onOutside = (event: Event) => {
      if (event.target instanceof Node && !header.current?.contains(event.target)) setOpen(false);
    };
    const desktop = window.matchMedia("(min-width: 891px)");
    const onResize = () => { if (desktop.matches) setOpen(false); };
    document.addEventListener("keydown", onKey);
    document.addEventListener("pointerdown", onOutside);
    document.addEventListener("focusin", onOutside);
    desktop.addEventListener("change", onResize);
    return () => {
      document.removeEventListener("keydown", onKey);
      document.removeEventListener("pointerdown", onOutside);
      document.removeEventListener("focusin", onOutside);
      desktop.removeEventListener("change", onResize);
    };
  }, [open]);

  return (
    <header ref={header} className="portfolio-header">
      <div className="head-inner wrap">
        <a href={`${home}#home`} className="head-brand" onClick={() => setOpen(false)}>
          <span className="head-brand-mark"><Icon name="sprout" size={23} strokeWidth={1.45}/></span>
          <span>{name}</span>
        </a>
        <nav ref={navigation} id="portfolio-navigation" className={`head-nav${open ? " head-nav-open" : ""}`} aria-label="Primary">
          {sections.map(([id, label]) =>
            <a key={id} href={`${home}#${id}`} aria-current={!home && active === id ? "location" : undefined} onClick={() => { setActive(id); setOpen(false); }}>{label}</a>
          )}
        </nav>
        <div className="head-actions">
          <MusicButton/><ThemeButton/>
          <button type="button" ref={menuButton} aria-controls="portfolio-navigation" aria-expanded={open} aria-label={open ? "Close navigation" : "Open navigation"} className="head-menu head-circle" onClick={() => setOpen(!open)}>
            <Icon name={open ? "x" : "menu"} size={19}/>
          </button>
        </div>
      </div>
    </header>
  );
}
