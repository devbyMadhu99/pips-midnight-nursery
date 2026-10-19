
import { useEffect, useState } from "react";
import "../styles/WishJar.css";

const STORAGE_KEY = "pips-midnight-wishes";

function readWishes() {
  try {
    const saved = localStorage.getItem(STORAGE_KEY);
    return saved ? JSON.parse(saved) : [];
  } catch {
    return [];
  }
}

export default function WishJar() {
  const [wish, setWish] = useState("");
  const [wishes, setWishes] = useState(readWishes);
  const [message, setMessage] = useState("");
  const [showWishes, setShowWishes] = useState(false);

  useEffect(() => {
    try {
      localStorage.setItem(STORAGE_KEY, JSON.stringify(wishes));
    } catch {
      setMessage("Your wishes can't be saved in this browser right now.");
    }
  }, [wishes]);

  function sendWish(event) {
    event.preventDefault();

    const text = wish.trim();

    if (!text) {
      setMessage("Pip needs a little wish first! ✨");
      return;
    }

    if (text.length > 180) {
      setMessage("Keep your wish under 180 characters. 💗");
      return;
    }

    const newWish = {
      id: `${Date.now()}-${Math.random().toString(36).slice(2, 8)}`,
      text,
      date: new Date().toLocaleDateString(),
    };

    setWishes((current) => [newWish, ...current]);
    setWish("");
    setMessage("Your wish is safe in Pip's star jar! 🌟");
  }

  function releaseWish(id) {
    setWishes((current) => current.filter((item) => item.id !== id));
    setMessage("Pip released your wish into the night sky. ✨");
  }

  return (
<section
  className="wish-section section"
  id="wish-jar"
  style={{ display: "block", minHeight: "400px", padding: "60px 24px", position: "relative", zIndex: 5 }}
>

      <div className="section-label">05 — A LITTLE BIT OF MAGIC</div>

      <h2>
        Make a little wish,
        <br />
        <span>leave a little stardust.</span>
      </h2>

      <p className="wish-intro">
        Tell Pip something you dream of. He'll keep your wishes safe
        in his tiny jar, right beneath the stars.
      </p>

      <div className="wish-jar-card">
        <div className="wish-jar-art" aria-hidden="true">
          <span className="wish-orbit">✧</span>
          <span className="wish-star star-one">✦</span>
          <span className="wish-star star-two">✧</span>
          <span className="wish-star star-three">✦</span>
          <div className="jar-lid" />
          <div className="jar">
            <span>✦</span>
            <span>✧</span>
            <span>✦</span>
            <span>♡</span>
          </div>
        </div>

        <form className="wish-form" onSubmit={sendWish}>
          <label htmlFor="pip-wish">What's your little wish?</label>

          <textarea
            id="pip-wish"
            value={wish}
            onChange={(event) => setWish(event.target.value)}
            placeholder="I wish for more happy days..."
            maxLength={180}
            rows={3}
            aria-describedby="wish-counter wish-message"
          />

          <div className="wish-form-meta">
            <span id="wish-counter">{wish.length}/180</span>
            <span>Make it kind. Make it yours. ♡</span>
          </div>

          <button className="primary-button wish-submit" type="submit">
            Send my wish ✨
          </button>

          <p className="wish-message" id="wish-message" aria-live="polite">
            {message || "Pip is listening, little human. 🌙"}
          </p>
        </form>

        <div className="wish-saved-heading">
          <div>
            <h3>Your star collection</h3>
            <p>{wishes.length} {wishes.length === 1 ? "wish" : "wishes"} tucked away</p>
          </div>

          <button
            className="wish-toggle"
            type="button"
            onClick={() => setShowWishes((visible) => !visible)}
            aria-expanded={showWishes}
          >
            {showWishes ? "Hide wishes ↑" : "View wishes ↓"}
          </button>
        </div>

        {showWishes && (
          <div className="wish-list">
            {wishes.length === 0 ? (
              <p className="wish-empty">
                Your jar is waiting for its first little star. 🌟
              </p>
            ) : (
              wishes.map((item) => (
                <article className="wish-item" key={item.id}>
                  <span className="wish-item-star" aria-hidden="true">✦</span>

                  <div className="wish-item-content">
                    <p>{item.text}</p>
                    <small>Added {item.date}</small>
                  </div>

                  <button
                    type="button"
                    className="wish-release"
                    onClick={() => releaseWish(item.id)}
                    aria-label={`Release wish: ${item.text}`}
                    title="Release this wish"
                  >
                    ✧
                  </button>
                </article>
              ))
            )}
          </div>
        )}
      </div>

      <p className="wish-footnote">
        Your wishes stay in this browser on this device. They aren't sent
        to a server or shared with other visitors.
      </p>
    </section>
  );
}
