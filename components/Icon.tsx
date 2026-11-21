import type { ReactNode, SVGProps } from "react";

const drawings = {
  sprout: <><path d="M12 21v-5c0-6 3-11 8-12 .5 5-2.2 9-7.2 9.5M12 17C7 17.2 3.8 14.4 3 9c5-.2 8.3 2.5 9 7.5" /></>,
  leaf: <><path d="M19.5 3.5c-1.2 2.8-4.1 2.1-8.1 2.7C5.8 7 3.3 11.2 4.9 15.7c1.4 3.7 5.5 4.8 9.4 3.2 5.1-2.2 7-8.4 5.2-15.4Z"/><path d="M3.5 21c2.8-5.2 6.2-8.7 11.5-11.8"/></>,
  "arrow-up-right": <path d="M6 18 18 6M6.5 6H18v11.5"/>,
  "arrow-right": <path d="M4 12h15m-6-6 6 6-6 6"/>,
  "arrow-down": <path d="M12 4v15m-6-6 6 6 6-6"/>,
  github: <path d="M8.5 20.5c-4.5 1.3-4.5-2-6.3-2.6M15.5 22v-3.7c0-1 .1-1.7-.5-2.4 3.1-.4 6-1.6 6-7 0-1.5-.5-2.7-1.4-3.7.1-.4.6-1.8-.2-3.3 0 0-1.2-.4-3.9 1.4a13.8 13.8 0 0 0-7 0C5.8 1.5 4.6 1.9 4.6 1.9c-.8 1.5-.3 2.9-.2 3.3A5.3 5.3 0 0 0 3 8.9c0 5.4 2.9 6.6 6 7-.6.6-.7 1.3-.6 2.2V22"/>,
  linkedin: <><rect x="3" y="3" width="18" height="18" rx="2.2"/><path d="M7.5 10.5v6.9m4-6.9v6.9m0-3.9c0-3.6 5-3.7 5-.1v4"/><circle cx="7.5" cy="7.5" r=".95" fill="currentColor" stroke="none"/></>,
  mail: <><rect x="2.7" y="5" width="18.6" height="14" rx="2"/><path d="m4 7 8 6 8-6"/></>,
  "book-open": <><path d="M12 6C9 4.5 6 4 2.5 4.5v14c3.5-.5 6.5 0 9.5 1.5 3-1.5 6-2 9.5-1.5v-14C18 4 15 4.5 12 6Zm0 0v14"/></>,
  notebook: <><rect x="5" y="3" width="14" height="18" rx="2"/><path d="M8.5 3v18M3 7h4M3 12h4M3 17h4m4-9h4"/></>,
  gamepad: <><path d="M7.8 6.5h8.4c2 0 3.2 1.5 3.8 3.5l1.5 5.7c.8 3.3-2 4.6-4.2 2.4L15 15.7H9l-2.3 2.4C4.5 20.3 1.7 19 2.5 15.7L4 10c.6-2 1.8-3.5 3.8-3.5Z"/><path d="M6 11h4m-2-2v4m7.4-2h.2m2.2 1.8h.2"/></>,
  layers: <><path d="m3 8 9-5 9 5-9 5-9-5Zm0 5 9 5 9-5M3 18l9 4 9-4"/></>,
  camera: <><path d="M3 8h4l2-3h6l2 3h4v12H3Z"/><circle cx="12" cy="13.5" r="3.5"/></>,
  "graduation-cap": <><path d="m2 8.4 10-5 10 5-10 5-10-5ZM6 10.5v6.1c3.7 3 8.3 3 12 0v-6.1M22 8.4v7.3"/></>,
  award: <><circle cx="12" cy="9" r="5.5"/><path d="m7.8 13-1.3 8 5.5-2 5.5 2-1.3-8"/></>,
  code: <path d="m7 6-5 6 5 6m10-12 5 6-5 6m-3-15-4 18"/>,
  sun: <><circle cx="12" cy="12" r="3.6"/><path d="M12 2v2m0 16v2m10-10h-2M4 12H2m17-7-1.5 1.5m-11 11L5 19m14 0-1.5-1.5m-11-11L5 5"/></>,
  moon: <path d="M20.8 14.5A9 9 0 0 1 9.5 3.2a9 9 0 1 0 11.3 11.3Z"/>,
  music: <><path d="M9 17V6l11-2v11M9 9l11-2"/><ellipse cx="6.5" cy="17.5" rx="2.5" ry="2"/><ellipse cx="17.5" cy="15.5" rx="2.5" ry="2"/></>,
  menu: <path d="M4 6h16M4 12h16M4 18h16"/>, x: <path d="m6 6 12 12M18 6 6 18"/>,
  globe: <><circle cx="12" cy="12" r="9"/><ellipse cx="12" cy="12" rx="4" ry="9"/><path d="M3 12h18"/></>,
  mountain: <><path d="m2 20 8.5-15L16 14l2.5-4L23 20H2Z"/><path d="m7.5 10.5 2.1 2.1 2.2-1.7 2.2.6"/></>,
  compass: <><circle cx="12" cy="12" r="9"/><path d="m16.5 7.5-3 6-6 3 3-6Z"/></>,
  flower: <><path d="M9 8c-2-5 5-7.4 6-2.5.2.9.2 1.7 0 2.5 5.2-2 8.1 4.4 3.5 6.2-.8.2-1.8.5-2.7.3 4 4.8-1.5 8.4-3.8 3.3-2.4 5.1-7.8 1.5-3.8-3.3-5.7.6-6.8-5.5-1.8-6.6C7.4 7.6 8.1 7.7 9 8Z"/><circle cx="12" cy="11.5" r="2"/></>,
  "map-pin": <><path d="M19 9.5c0 5-7 11-7 11s-7-6-7-11a7 7 0 1 1 14 0Z"/><circle cx="12" cy="9.5" r="2"/></>,
  "volume-2": <><path d="M3 9h4l5-4v14l-5-4H3Zm12-.5a5 5 0 0 1 0 7m2-10a9 9 0 0 1 0 13"/></>,
  "volume-x": <path d="M3 9h4l5-4v14l-5-4H3Zm13 .5 5 5m0-5-5 5"/>,
  "chevron-down": <path d="m6 9 6 6 6-6"/>,
} satisfies Record<string, ReactNode>;

export type IconName = keyof typeof drawings;
type Props = SVGProps<SVGSVGElement> & { name: IconName; size?: number };

export function Icon({ name, size = 20, ...props }: Props) {
  return <svg aria-hidden="true" width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.65" strokeLinecap="round" strokeLinejoin="round" {...props}>{drawings[name]}</svg>;
}
export default Icon;
