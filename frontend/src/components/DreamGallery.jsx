
import { useEffect, useState } from "react";
import "../styles/DreamGallery.css";

const STORAGE_KEY = "pips-midnight-dream-journal";

export default function DreamGallery() {
  const [dreams, setDreams] = useState(() => {
    try {
      const saved = JSON.parse(
        localStorage.getItem(STORAGE_KEY) || "[]"
      );
      return Array.isArray(saved) ? saved : [];
    } catch {
      return [];
    }
  });

  useEffect(() => {
    function updateDreams() {
      try {
        const saved = JSON.parse(
          localStorage.getItem(STORAGE_KEY) || "[]"
        );
        setDreams(Array.isArray(saved) ? saved : []);
      } catch {
        setDreams([]);
      }
    }

    window.addEventListener("storage", updateDreams);
    window.addEventListener("dreams-updated", updateDreams);
    window.addEventListener("focus", updateDreams);

    return () => {
      window.removeEventListener("storage", updateDreams);
      window.removeEventListener("dreams-updated", updateDreams);
      window.removeEventListener("focus", updateDreams);
    };
  }, []);

  return (
    <section className="dream-gallery section" id="dream-gallery">
      <div className="section-label">
        ✦ LITTLE MOMENTS OF MAGIC ✦
      </div>

      <h2>
        Your Dream Gallery
        <br />
        <span>memories made of stardust.</span>
      </h2>

      <p className="gallery-intro">
        Every saved dream is a little piece of your imagination. 🌙
      </p>

      <div className="gallery-count">
        ✨ {dreams.length} {dreams.length === 1 ? "dream" : "dreams"} collected
      </div>

      {dreams.length === 0 ? (
        <p className="gallery-empty">
          Your gallery is waiting! Save a dream in Pip's Dream Journal
          and it will appear here. 💗
        </p>
      ) : (
        <div className="gallery-grid">
          {dreams.map((dream, index) => (
            <article className="gallery-card" key={dream.id || index}>
              <div className="gallery-card-top">
                <span className="gallery-symbol">
                  {dream.symbol || "🌙"}
                </span>
                <span className="gallery-number">
                  DREAM {String(index + 1).padStart(2, "0")}
                </span>
              </div>

              <h3>{dream.title}</h3>
              <p>{dream.text}</p>

              <span className="gallery-date">
                {dream.savedAt
                  ? new Date(dream.savedAt).toLocaleDateString()
                  : "A little dream"}
              </span>
            </article>
          ))}
        </div>
      )}
    </section>
  );
}
