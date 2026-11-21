"use client";

import { useEffect, useRef, useState } from "react";
import GardenScene from "./GardenScene";
import styles from "./garden.module.css";

const stages = ["Bare soil", "Seed planted", "First sprout", "Young leaves", "Flower bud", "In bloom"] as const;

export default function SeedGarden() {
  const [stage, setStage] = useState(1);
  const actionRef = useRef<HTMLButtonElement>(null);

  useEffect(() => { actionRef.current?.focus({ preventScroll: true }); }, []);

  const action = stage === 5 ? "Plant another seed" : "Water seed";
  return (
    <>
      <div className={styles.scene}><GardenScene stage={stage} /></div>
      <div className={styles.controls}>
        <button ref={actionRef} className={styles.action} type="button" onClick={() => setStage(current => current >= 5 ? 1 : current + 1)}>{action} <span aria-hidden="true">→</span></button>
        <span role="status" className={styles.score}>{stages[stage]} · {stage}/5</span>
      </div>
    </>
  );
}
