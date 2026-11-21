"use client";

import { useEffect, useRef, useState } from "react";
import GardenScene from "./GardenScene";
import styles from "./garden.module.css";

const restingSpots = [
  [23, 32], [52, 64], [78, 34], [19, 65], [48, 28], [82, 67],
  [22, 49], [51, 27], [80, 48], [17, 24], [53, 53], [84, 48],
] as const;
const initialCatches = [0, 0, 0];

export default function FireflyCatch() {
  const [catches, setCatches] = useState(initialCatches);
  const [paused, setPaused] = useState(false);
  const firstTarget = useRef<HTMLButtonElement>(null);
  const score = catches.reduce((sum, count) => sum + count, 0);

  useEffect(() => {
    if (!paused) firstTarget.current?.focus({ preventScroll: true });
  }, [paused]);

  function reset() {
    setCatches(initialCatches);
    setPaused(false);
    if (!paused) firstTarget.current?.focus({ preventScroll: true });
  }

  return (
    <>
      <div className={styles.scene} role="group" aria-label="Firefly meadow">
        <GardenScene night />
        {catches.map((count, target) => {
          const [left, top] = restingSpots[target + 3 * (count % 4)];
          return (
            <button
              type="button"
              key={target}
              ref={target === 0 ? firstTarget : undefined}
              className={styles.firefly}
              style={{ left: `${left}%`, top: `${top}%`, animationDelay: `-${target * 1.3}s` }}
              aria-label={`Catch firefly ${target + 1}`}
              disabled={paused}
              onClick={() => setCatches(previous => previous.map((value, index) => index === target ? value + 1 : value))}
            ><span aria-hidden="true" /></button>
          );
        })}
      </div>
      <div className={styles.controls}>
        <button className={styles.action} type="button" onClick={() => setPaused(value => !value)}>{paused ? "Resume" : "Pause"}</button>
        <button className={styles.reset} type="button" onClick={reset}>Reset</button>
        <span className={styles.score} role="status">{paused ? "Paused · " : ""}Score: {score}</span>
      </div>
    </>
  );
}
