
import { useState } from "react";
import "../styles/DreamTimeCapsule.css";

const STORAGE_KEY = "pips-dream-time-capsules";

const emojis = ["🌙", "💗", "⭐", "🦋", "🌷", "☁️"];

function getToday() {
  const date = new Date();
  return [
    date.getFullYear(),
    String(date.getMonth() + 1).padStart(2, "0"),
    String(date.getDate()).padStart(2, "0"),
  ].join("-");
}

function readCapsules() {
  try {
    const saved = JSON.parse(localStorage.getItem(STORAGE_KEY) || "[]");
    return Array.isArray(saved) ? saved : [];
  } catch {
    return [];
  }
}

export default function DreamTimeCapsule() {
  const [capsules, setCapsules] = useState(readCapsules);
  const [message, setMessage] = useState("");
  const [selectedEmoji, setSelectedEmoji] = useState("🌙");
  const [unlockDate, setUnlockDate] = useState("");

  function saveCapsules(updated) {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(updated));
    setCapsules(updated);
  }

  function handleSubmit(event) {
    event.preventDefault();

    if (!message.trim() || !unlockDate || unlockDate <= getToday()) {
      return;
    }

    const capsule = {
      id: `${Date.now()}-${Math.random()}`,
      message: message.trim(),
      emoji: selectedEmoji,
      unlockDate,
      createdAt: getToday(),
    };

    saveCapsules([capsule, ...capsules]);
    setMessage("");
    setSelectedEmoji("🌙");
    setUnlockDate("");
  }

  function deleteCapsule(id) {
    saveCapsules(capsules.filter((capsule) => capsule.id !== id));
  }

  const sortedCapsules = [...capsules].sort(
    (a, b) => a.unlockDate.localeCompare(b.unlockDate)
  );

  return (
    <section className="time-capsule section" id="time-capsule">
      <div className="section-label">✦ A LETTER THROUGH TIME ✦</div>

      <h2>
        Dear future me,
        <br />
        <span>a little note from today.</span>
      </h2>

      <p className="capsule-intro">
        Leave a tiny message for your future self. Pip will keep it safe
        until the day it is ready to bloom. 💌
      </p>

      <form className="capsule-form" onSubmit={handleSubmit}>
        <label htmlFor="capsule-message">
          What would you like your future self to know?
        </label>

        <textarea
          id="capsule-message"
          value={message}
          onChange={(event) => setMessage(event.target.value.slice(0, 300))}
          placeholder="I hope you remember how brave you were today..."
          maxLength={300}
          rows={4}
          required
        />

        <div className="capsule-character-count">
          {message.length}/300
        </div>

        <label>Choose your capsule's little symbol</label>

        <div className="capsule-emojis">
          {emojis.map((emoji) => (
            <button
              type="button"
              key={emoji}
              className={`capsule-emoji ${
                selectedEmoji === emoji ? "selected" : ""
              }`}
              onClick={() => setSelectedEmoji(emoji)}
              aria-label={`Choose ${emoji}`}
              aria-pressed={selectedEmoji === emoji}
            >
              {emoji}
            </button>
          ))}
        </div>

        <label htmlFor="capsule-date">When should it unlock?</label>

        <input
          id="capsule-date"
          type="date"
          value={unlockDate}
          min={(() => {
            const tomorrow = new Date();
            tomorrow.setDate(tomorrow.getDate() + 1);
            return [
              tomorrow.getFullYear(),
              String(tomorrow.getMonth() + 1).padStart(2, "0"),
              String(tomorrow.getDate()).padStart(2, "0"),
            ].join("-");
          })()}
          onChange={(event) => setUnlockDate(event.target.value)}
          required
        />

        <button className="capsule-submit" type="submit">
          Seal my time capsule 💌
        </button>
      </form>

      <div className="capsule-list">
        <h3>Your little time capsules ✨</h3>

        {sortedCapsules.length === 0 ? (
          <p className="capsule-empty">
            No time capsules yet. Write your first letter to the future. 🌷
          </p>
        ) : (
          sortedCapsules.map((capsule) => {
            const isUnlocked = capsule.unlockDate <= getToday();

            return (
              <article className="capsule-card" key={capsule.id}>
                <div className="capsule-card-icon">
                  {isUnlocked ? capsule.emoji : "🔒"}
                </div>

                <div className="capsule-card-content">
                  <h4>
                    {isUnlocked ? "Your letter has bloomed!" : "A letter from the past"}
                  </h4>

                  <p>
                    {isUnlocked
                      ? capsule.message
                      : "Pip is keeping this message safe until its special day. ✨"}
                  </p>

                  <span className="capsule-unlock-date">
                    {isUnlocked ? "✦ UNLOCKED · " : "🔒 OPENS · "}
                    {new Date(
                      `${capsule.unlockDate}T12:00:00`
                    ).toLocaleDateString("en-US", {
                      day: "numeric",
                      month: "long",
                      year: "numeric",
                    })}
                  </span>
                </div>

                <button
                  className="capsule-delete"
                  type="button"
                  onClick={() => deleteCapsule(capsule.id)}
                  aria-label="Delete time capsule"
                  title="Delete capsule"
                >
                  🗑️
                </button>
              </article>
            );
          })
        )}
      </div>

      <p className="capsule-privacy">
        Your letters stay in this browser on this device. ♡
      </p>
    </section>
  );
}
