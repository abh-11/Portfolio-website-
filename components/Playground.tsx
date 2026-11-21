"use client";

import { Component, lazy, Suspense, useState, type ReactNode } from "react";
import GardenScene from "./games/GardenScene";
import styles from "./games/garden.module.css";

const SeedGarden = lazy(() => import("./games/SeedGarden"));
const FireflyCatch = lazy(() => import("./games/FireflyCatch"));

class GameBoundary extends Component<{ children: ReactNode }, { failed: boolean }> {
  state = { failed: false };

  static getDerivedStateFromError() {
    return { failed: true };
  }

  render() {
    return this.state.failed
      ? <p className={styles.feedback} role="status">This game couldn’t load. Refresh the page to try again.</p>
      : this.props.children;
  }
}

function GameCard({ night = false }: { night?: boolean }) {
  const [started, setStarted] = useState(false);
  const startView = (loading: boolean) => (
    <>
      <div className={styles.scene}>
        <GardenScene night={night} />
        {night && <div className={styles.scenicLights} aria-hidden="true"><i /><i /><i /></div>}
      </div>
      <div className={styles.controls}>
        {loading
          ? <span className={styles.feedback} role="status">Opening the garden…</span>
          : <button type="button" className={styles.action} onClick={() => setStarted(true)}>
              {night ? "Start catching" : "Plant a seed"} <span aria-hidden="true">→</span>
            </button>}
      </div>
    </>
  );

  return (
    <article className={styles.card}>
      <div className={styles.copy}>
        <h3>{night ? "Firefly Catch" : "Seed Garden"}</h3>
        <p>{night ? "Collect lights in a twilight meadow. Tap a firefly, or use Tab and Enter to catch it." : "Tend a little patch of earth. Plant a seed and water it until the first flower opens."}</p>
      </div>
      {started
        ? <GameBoundary><Suspense fallback={startView(true)}>{night ? <FireflyCatch /> : <SeedGarden />}</Suspense></GameBoundary>
        : startView(false)}
    </article>
  );
}

export default function Playground() {
  return <div className={styles.grid}><GameCard /><GameCard night /></div>;
}
