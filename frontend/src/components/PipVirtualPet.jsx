
import { useState } from "react";
import "./PipVirtualPet.css";

const defaultStats = {
  hunger: 50,
  fun: 70,
  energy: 80,
};

function loadStats() {
  try {
    const saved = localStorage.getItem("pips-virtual-pet");
    return saved ? { ...defaultStats, ...JSON.parse(saved) } : defaultStats;
  } catch {
    return defaultStats;
  }
}

export default function PipVirtualPet() {
  const [stats, setStats] = useState(loadStats);

  const mood =
    stats.hunger >= 80
      ? "Hungry"
      : stats.energy <= 20
      ? "Sleepy"
      : stats.fun <= 20
      ? "Bored"
      : stats.hunger <= 20 && stats.fun >= 70
      ? "Very Happy"
      : "Happy";

  function updatePet(action) {
    setStats((current) => {
      let next = { ...current };

      if (action === "feed") {
        next.hunger = Math.max(0, current.hunger - 25);
        next.fun = Math.min(100, current.fun + 5);
      }

      if (action === "play") {
        next.fun = Math.min(100, current.fun + 20);
        next.hunger = Math.min(100, current.hunger + 10);
        next.energy = Math.max(0, current.energy - 15);
      }

      if (action === "sleep") {
        next.energy = Math.min(100, current.energy + 30);
      }

      localStorage.setItem("pips-virtual-pet", JSON.stringify(next));
      return next;
    });
  }

  return (
    <section className="pip-pet section">
      <div className="section-label">✦ YOUR LITTLE COMPANION ✦</div>

      <h2>Take Care of Pip</h2>
      <p>Feed Pip, play together, and help Pip rest.</p>

      <div className="pip-pet-avatar" aria-label={`Pip is ${mood}`}>
        {mood === "Sleepy" ? "😴" : mood === "Hungry" ? "🥺" : "🐱"}
      </div>

      <h3>Pip is {mood}!</h3>

      <div className="pip-pet-stats">
        <PetStat label="Hunger" value={stats.hunger} />
        <PetStat label="Fun" value={stats.fun} />
        <PetStat label="Energy" value={stats.energy} />
      </div>

      <div className="pip-pet-actions">
        <button type="button" onClick={() => updatePet("feed")}>
          🍓 Feed
        </button>
        <button type="button" onClick={() => updatePet("play")}>
          🎾 Play
        </button>
        <button type="button" onClick={() => updatePet("sleep")}>
          🌙 Sleep
        </button>
      </div>
    </section>
  );
}

function PetStat({ label, value }) {
  return (
    <div className="pip-pet-stat">
      <div className="pip-pet-stat-label">
        <span>{label}</span>
        <span>{value}%</span>
      </div>
      <div
        className="pip-pet-bar"
        role="progressbar"
        aria-label={label}
        aria-valuenow={value}
        aria-valuemin={0}
        aria-valuemax={100}
      >
        <div className="pip-pet-bar-fill" style={{ width: `${value}%` }} />
      </div>
    </div>
  );
}
