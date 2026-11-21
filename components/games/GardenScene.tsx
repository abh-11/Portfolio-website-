import { useId } from "react";
import styles from "./garden.module.css";

function Fern({ x, y, scale, mirror = false }: { x: number; y: number; scale: number; mirror?: boolean }) {
  return (
    <g transform={`translate(${x} ${y}) scale(${mirror ? -scale : scale} ${scale})`}>
      <path d="M0 0Q-6-42 30-95" fill="none" stroke="currentColor" strokeWidth="1.8" />
      <path d="M1-10Q-18-16-22-35Q-5-35 1-15M3-27Q13-49 29-50Q28-35 3-27M6-37Q-11-45-12-61Q4-57 6-37M12-53Q27-70 40-69Q33-56 12-53M18-65Q4-74 7-87Q18-82 18-65M25-80Q24-92 36-104Q38-88 25-80" fill="currentColor" />
    </g>
  );
}

function Plant({ stage }: { stage: number }) {
  return (
    <g transform="translate(301 192)">
      <ellipse rx="40" ry="7.5" fill="#516244" opacity=".22" />
      <path d="M-38 0Q-27-5-18-4Q-8-11 5-7Q18-12 27-4L40 0Q4 6-38 0" fill="#64543d" />
      {stage === 1 && <path d="M-4-6Q-8-17 6-19Q9-8-4-6" fill="#bbc379" stroke="#657548" strokeWidth="1.5" />}
      {stage >= 2 && (
        <g className={styles.plant} key={stage}>
          <path d={stage > 2 ? "M0-5Q4-25-1-47Q-3-59 0-75" : "M0-5Q2-15 0-25"} fill="none" stroke="#455433" strokeWidth="3" strokeLinecap="round" />
          <path d="M0-21Q-20-20-22-39Q-5-40 0-21" fill="#628047" />
          <path d="M1-15Q4-32 23-33Q20-19 1-15" fill="#829a53" />
          {stage >= 3 && <>
            <path d="M0-43Q-19-44-33-68Q-9-68 0-43" fill="#778d3e" />
            <path d="M-1-46Q9-68 34-70Q29-50-1-46" fill="#526f3a" />
          </>}
          {stage === 3 && <path d="M0-68Q-6-78 5-89Q11-78 0-68" fill="#809545" />}
          {stage === 4 && <path d="M0-72Q-20-86-7-98Q-5-103 0-105Q19-95 11-81Z" fill="#c38968" />}
          {stage === 5 && <g transform="translate(0 -83)">
            {[0, 60, 120, 180, 240, 300].map(angle => <ellipse key={angle} cy="-13" rx="7.5" ry="14" fill={angle % 120 === 0 ? "#f2b59b" : "#e9a186"} transform={`rotate(${angle})`} />)}
            <circle r="8" fill="#b48238" /><circle r="4" fill="#eed58d" />
          </g>}
        </g>
      )}
    </g>
  );
}

export default function GardenScene({ night = false, stage = 0 }: { night?: boolean; stage?: number }) {
  const id = useId();
  return (
    <svg className={styles.sceneSvg} viewBox="0 0 600 216" preserveAspectRatio="xMidYMax slice" aria-hidden="true" focusable="false">
      <defs>
        <linearGradient id={id} x2=".92" y2="1" gradientUnits="objectBoundingBox">
          <stop stopColor={night ? "#263e3e" : "#d3deba"} />
          <stop offset="1" stopColor={night ? "#567163" : "#f1e6be"} />
        </linearGradient>
      </defs>
      <rect width="600" height="216" fill={`url(#${id})`} />
      <circle cx={night ? 442 : 450} cy="50" r={night ? 14 : 29} fill={night ? "#e7e7c0" : "#f9edbb"} />
      {night && <g fill="#dae0be"><circle cx="120" cy="46" r="1.5" /><circle cx="161" cy="77" r="1" /><circle cx="367" cy="59" r="1" /><circle cx="541" cy="29" r="1.5" /><circle cx="61" cy="63" r="1" /><circle cx="286" cy="24" r="1" /></g>}
      <path d="M0 110Q48 76 88 83T165 80Q217 51 273 80T405 102Q477 65 542 80L600 77V216H0Z" fill={night ? "#465d54" : "#b4c39a"} />
      <path d="M0 121Q78 131 143 104T272 111Q347 152 433 102T600 84V216H0Z" fill={night ? "#364f46" : "#93a57d"} />
      <path d="M0 152Q97 123 183 141T354 132Q443 98 600 132V216H0Z" fill={night ? "#2e493f" : "#809670"} />
      <path d="M0 162Q74 131 187 164T409 151Q521 116 600 140V216H0Z" fill={night ? "#213f36" : "#a5b082"} />
      <path d="M0 181Q108 156 209 174T400 171Q486 153 600 179V216H0Z" fill={night ? "#284237" : "#c2c696"} />
      <g color={night ? "#426449" : "#718560"} opacity=".9">
        <Fern x={18} y={218} scale={1.26} /><Fern x={118} y={217} scale={0.58} mirror />
        <Fern x={511} y={221} scale={0.72} /><Fern x={577} y={224} scale={1.13} mirror />
      </g>
      {!night && <Plant stage={stage} />}
      <g color={night ? "#152f29" : "#587351"}>
        <Fern x={54} y={230} scale={0.95} /><Fern x={-1} y={220} scale={1.55} />
        <Fern x={543} y={230} scale={0.73} mirror /><Fern x={602} y={226} scale={1.65} mirror />
      </g>
    </svg>
  );
}
