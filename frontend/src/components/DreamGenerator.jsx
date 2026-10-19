
import { useState } from "react";
import "../styles/MagicFeatures.css";

const moods = [
  { label: "Happy", emoji: "😊" },
  { label: "Sad", emoji: "🌧️" },
  { label: "Calm", emoji: "🌿" },
  { label: "Adventurous", emoji: "🚀" },
];

const dreams = [
  {
    title: "The Moon's Little Library",
    text: "Tonight, a tiny moonbeam saves your place in a library where every book contains a happy memory.",
    symbol: "🌙",
    mood: "Calm",
  },
  {
    title: "A Pocketful of Stars",
    text: "You discover three little stars in your pocket. One for courage, one for kindness, and one just for you.",
    symbol: "⭐",
    mood: "Adventurous",
  },
  {
    title: "The Cloud Train",
    text: "A fluffy cloud train takes you somewhere peaceful, where nobody is in a hurry and every cup of tea is warm.",
    symbol: "☁️",
    mood: "Calm",
  },
  {
    title: "The Garden of Wishes",
    text: "Every kind thing you did today grows into a glowing flower in a secret garden above the sky.",
    symbol: "🌷",
    mood: "Happy",
  },
  {
    title: "The Tiny Dragon",
    text: "A sleepy little dragon chooses you as its best friend. Its fire is warm, its hugs are soft, and it snores like a kitten.",
    symbol: "🐉",
    mood: "Adventurous",
  },
  {
    title: "Tomorrow's Sunrise",
    text: "Tomorrow doesn't need you to be perfect. It only asks you to arrive with a little hope and try again.",
    symbol: "🌅",
    mood: "Sad",
  },
];

export default function DreamGenerator({ onDreamGenerated, onSaveDream }) {
  const [dream, setDream] = useState(null);
  const [dreamCount, setDreamCount] = useState(0);
  const [selectedMood, setSelectedMood] = useState("Calm");

  function generateDream() {
    const matchingDreams = dreams.filter(
      (item) => item.mood === selectedMood
    );

    const availableDreams = matchingDreams.filter(
      (item) => item.title !== dream?.title
    );

    const dreamPool =
      availableDreams.length > 0
        ? availableDreams
        : matchingDreams;

    const nextDream =
      dreamPool[Math.floor(Math.random() * dreamPool.length)];

    if (!nextDream) return;

   setDream(nextDream);
setDreamCount((count) => count + 1);

const savedCount = Number(
  localStorage.getItem("pips-dreams-generated-count") || 0
);

localStorage.setItem(
  "pips-dreams-generated-count",
  String(savedCount + 1)
);

window.dispatchEvent(new Event("dream-count-updated"));

onDreamGenerated?.(nextDream);
  }

  return (
    <section className="magic-section section" id="dream-workshop">
      <div className="section-label">
        ✦ PIP'S DREAM WORKSHOP ✦
      </div>

      <h2>
        What shall we
        <br />
        <span>dream about tonight?</span>
      </h2>

      <p className="magic-intro">
        Pip has been collecting tiny pieces of stardust.
        Press the button and let him turn one into a dream.
      </p>

      <div className="mood-selector">
        <p>How are you feeling tonight?</p>

        <div className="mood-options">
          {moods.map((mood) => (
            <button
              key={mood.label}
              type="button"
              className={
                selectedMood === mood.label
                  ? "mood-option active"
                  : "mood-option"
              }
              onClick={() => setSelectedMood(mood.label)}
              aria-pressed={selectedMood === mood.label}
            >
              {mood.emoji} {mood.label}
            </button>
          ))}
        </div>
      </div>

      <div className="dream-card">
        <div className="dream-symbol" aria-hidden="true">
          {dream ? dream.symbol : "🔮"}
        </div>

        <h3>
          {dream ? dream.title : "A little mystery awaits..."}
        </h3>

        <p className="dream-text" aria-live="polite">
          {dream
            ? dream.text
            : "Your next little dream is just one button away."}
        </p>

        <button
          className="primary-button dream-button"
          type="button"
          onClick={generateDream}
        >
          ✨ {dream ? "Dream again" : "Generate my dream"}
        </button>
        
{dream && (
  <button
    className="primary-button dream-button"
    type="button"
    onClick={() => onSaveDream?.(dream)}
  >
    ♡ Save to Journal
  </button>
)}


        <p className="dream-count">
          Dreams discovered: {dreamCount}
        </p>
      </div>
    </section>
  );
}
