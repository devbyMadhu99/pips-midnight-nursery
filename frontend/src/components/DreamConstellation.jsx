
import { useEffect, useState } from "react";
import "../styles/DreamConstellation.css";

const STORAGE_KEY = "pips-midnight-dream-journal";

export default function DreamConstellation() {
  const [dreams, setDreams] = useState([]);
  const [selected, setSelected] = useState(null);

  useEffect(() => {
    function loadDreams() {
      try {
        const saved = JSON.parse(
          localStorage.getItem(STORAGE_KEY) || "[]"
        );
        setDreams(Array.isArray(saved) ? saved : []);
      } catch {
        setDreams([]);
      }
    }

   
loadDreams();
window.addEventListener("focus", loadDreams);
window.addEventListener("storage", loadDreams);
window.addEventListener("dreams-updated", loadDreams);

return () => {
  window.removeEventListener("focus", loadDreams);
  window.removeEventListener("storage", loadDreams);
  window.removeEventListener("dreams-updated", loadDreams);
};

  }, []);

  const positions = [
    [15, 25], [38, 15], [65, 24], [83, 42],
    [68, 60], [43, 48], [20, 66], [37, 82],
    [75, 83], [51, 30], [9, 48], [90, 17],
  ];

  return (
    <section className="dream-constellation section" id="dream-constellation">
      <div className="section-label">✦ YOUR DREAM UNIVERSE ✦</div>

      <h2>
        A sky full of
        <br />
        <span>little memories.</span>
      </h2>

      <p className="constellation-intro">
        Every saved dream becomes a tiny star in your universe.
        Tap a star to revisit its magic.
      </p>

      {dreams.length === 0 ? (
        <p className="constellation-empty">
          🌙 Save your first dream to light up this sky.
        </p>
      ) : (
        <>
          <div className="constellation-sky">
            <svg className="constellation-lines" viewBox="0 0 100 100" preserveAspectRatio="none">
              {dreams.slice(0, 12).map((dream, index) => {
                if (index === 0) return null;
                const from = positions[(index - 1) % positions.length];
                const to = positions[index % positions.length];

                return (
                  <line
                    key={`line-${dream.id ?? index}`}
                    x1={from[0]}
                    y1={from[1]}
                    x2={to[0]}
                    y2={to[1]}
                  />
                );
              })}
            </svg>

            {dreams.slice(0, 12).map((dream, index) => {
              const [left, top] = positions[index % positions.length];

              return (
                <button
                  key={dream.id ?? index}
                  className={`constellation-star ${
                    selected === index ? "selected" : ""
                  }`}
                  style={{ left: `${left}%`, top: `${top}%` }}
                  onClick={() => setSelected(index)}
                  aria-label={`Open dream: ${dream.title}`}
                  title={dream.title}
                >
                  ✦
                </button>
              );
            })}
          </div>

          <p className="constellation-count">
            ✨ {dreams.length} dreams in your universe
          </p>

          {selected !== null && dreams[selected] && (
            <article className="constellation-dream">
              <span>{dreams[selected].symbol || "🌙"}</span>
              <h3>{dreams[selected].title}</h3>
              <p>{dreams[selected].text}</p>
              <button onClick={() => setSelected(null)}>
                Close ✕
              </button>
            </article>
          )}
        </>
      )}
    </section>
  );
}
