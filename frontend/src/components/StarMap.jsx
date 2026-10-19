
import { useEffect, useState } from "react";
import "../styles/StarMap.css";

const STORAGE_KEY = "pips-midnight-star-map";

const stars = [
  {
    id: "first-yawn",
    name: "The First Yawn",
    symbol: "🌙",
    x: 16,
    y: 25,
    message:
      "Pip woke up inside a forgotten lullaby. The universe was quiet, and his very first yawn switched on a tiny star.",
  },
  {
    id: "friendship",
    name: "The Friendship Star",
    symbol: "💗",
    x: 43,
    y: 15,
    message:
      "Pip believes friendship is a little light that grows brighter whenever it is shared. This star is glowing just for you.",
  },
  {
    id: "cloud-train",
    name: "The Cloud Train",
    symbol: "☁️",
    x: 76,
    y: 28,
    message:
      "Somewhere above the moon, a cloud train travels slowly through the sky. There is always room for one more sleepy passenger.",
  },
  {
    id: "tiny-dragon",
    name: "The Tiny Dragon",
    symbol: "🐉",
    x: 26,
    y: 59,
    message:
      "A tiny dragon guards the nursery's dreams. It breathes warm sparkles, gives excellent hugs, and snores louder than Pip.",
  },
  {
    id: "wish-garden",
    name: "The Wish Garden",
    symbol: "🌷",
    x: 58,
    y: 48,
    message:
      "Every kind wish becomes a flower here. Even the smallest act of kindness can make an entire garden bloom.",
  },
  {
    id: "tomorrow",
    name: "Tomorrow's Light",
    symbol: "☀️",
    x: 81,
    y: 70,
    message:
      "Whatever today was like, tomorrow is another little beginning. You don't have to be perfect to deserve a beautiful sunrise.",
  },
];

const constellationLines = [
  [16, 25, 43, 15],
  [43, 15, 76, 28],
  [16, 25, 26, 59],
  [26, 59, 58, 48],
  [58, 48, 76, 28],
  [58, 48, 81, 70],
];

function readDiscoveredStars() {
  try {
    const saved = localStorage.getItem(STORAGE_KEY);
    const parsed = saved ? JSON.parse(saved) : [];
    return Array.isArray(parsed)
      ? parsed.filter((id) => stars.some((star) => star.id === id))
      : [];
  } catch {
    return [];
  }
}

export default function StarMap({ onDiscoveryChange }) {
  const [discovered, setDiscovered] = useState(readDiscoveredStars);
  const [selectedStar, setSelectedStar] = useState(null);
  const [saveWarning, setSaveWarning] = useState(false);

  useEffect(() => {
    try {
      localStorage.setItem(STORAGE_KEY, JSON.stringify(discovered));
      setSaveWarning(false);
    } catch {
      setSaveWarning(true);
    }

    onDiscoveryChange?.(discovered.length);
  }, [discovered, onDiscoveryChange]);

  function discoverStar(star) {
    setSelectedStar(star);

    if (!discovered.includes(star.id)) {
      setDiscovered((current) => [...current, star.id]);
    }
  }

  const allFound = discovered.length === stars.length;

  return (
    <section className="starmap-section section" id="star-map">
      <div className="section-label">
        ✦ 06 — PIP'S SECRET SKY ✦
      </div>

      <h2>
        A universe of little
        <br />
        <span>things to discover.</span>
      </h2>

      <p className="starmap-intro">
        Every star holds a tiny piece of Pip's story.
        Pick one, make a wish, and see what the night is keeping for you.
      </p>

      <div className="starmap-card">
        <div className="starmap-topline">
          <span>✧ THE MIDNIGHT CONSTELLATION</span>
          <span>{discovered.length} / {stars.length} found</span>
        </div>

        <div
          className="starmap-sky"
          aria-label="Interactive star map. Select a star to discover its story."
        >
          <div className="sky-moon" aria-hidden="true">☾</div>
          <span className="sky-dust dust-one" aria-hidden="true">✦</span>
          <span className="sky-dust dust-two" aria-hidden="true">✧</span>
          <span className="sky-dust dust-three" aria-hidden="true">·</span>
          <span className="sky-dust dust-four" aria-hidden="true">✦</span>

          <svg
            className="constellation-lines"
            viewBox="0 0 100 100"
            preserveAspectRatio="none"
            aria-hidden="true"
          >
            {constellationLines.map(([x1, y1, x2, y2], index) => (
              <line
                key={index}
                x1={x1}
                y1={y1}
                x2={x2}
                y2={y2}
              />
            ))}
          </svg>

          {stars.map((star, index) => {
            const isFound = discovered.includes(star.id);

            return (
              <button
                key={star.id}
                type="button"
                className={`map-star ${isFound ? "is-found" : ""} ${
                  selectedStar?.id === star.id ? "is-selected" : ""
                }`}
                style={{ left: `${star.x}%`, top: `${star.y}%` }}
                onClick={() => discoverStar(star)}
                aria-label={`${star.name}${isFound ? ", discovered" : ", undiscovered"}`}
                aria-pressed={selectedStar?.id === star.id}
                title={star.name}
              >
                <span aria-hidden="true">
                  {isFound ? star.symbol : "✦"}
                </span>
                <span className="map-star-number">{index + 1}</span>
              </button>
            );
          })}
        </div>

        <div className="starmap-progress-track">
          <div
            className="starmap-progress-fill"
            style={{ width: `${(discovered.length / stars.length) * 100}%` }}
          />
        </div>

        <p className="starmap-progress-label">
          {allFound
            ? "Every little light has found its way home. ✨"
            : "Keep exploring. The sky has more secrets for you."}
        </p>

        {selectedStar ? (
          <article className="star-memory" aria-live="polite">
            <div className="memory-symbol" aria-hidden="true">
              {selectedStar.symbol}
            </div>

            <div className="memory-copy">
              <span className="memory-label">
                {discovered.includes(selectedStar.id)
                  ? "✦ STAR DISCOVERED"
                  : "✦ A SECRET FROM PIP"}
              </span>
              <h3>{selectedStar.name}</h3>
              <p>{selectedStar.message}</p>
            </div>

            <button
              className="memory-close"
              type="button"
              onClick={() => setSelectedStar(null)}
              aria-label="Close star story"
            >
              ×
            </button>
          </article>
        ) : (
          <p className="star-hint">
            ✧ Tap any glowing star to uncover its story.
          </p>
        )}

        {allFound && (
          <div className="starmap-completion" role="status">
            <span aria-hidden="true">🏆</span>
            <div>
              <h3>Keeper of the Midnight Sky!</h3>
              <p>
                You found all six stars. Pip is saving a little extra
                sparkle just for you.
              </p>
            </div>
          </div>
        )}

        {saveWarning && (
          <p className="starmap-save-warning" role="status">
            Your discoveries may not persist after this visit because
            browser storage is unavailable.
          </p>
        )}
      </div>
    </section>
  );
}
