
import "../styles/MagicFeatures.css";

const moods = {
  sleepy: {
    face: "😴",
    name: "Sleepy",
    message: "Pip is dreaming with his eyes open. Probably.",
  },
  happy: {
    face: "🥰",
    name: "Happy",
    message: "Pip feels extra loved. Someone gave him a boop!",
  },
  dreamy: {
    face: "🌙",
    name: "Dreamy",
    message: "Pip is floating through a little cloud of ideas.",
  },
  curious: {
    face: "👀",
    name: "Curious",
    message: "Pip thinks you might have discovered something magical.",
  },
};

export default function PipMood({ mood = "sleepy", boops = 0 }) {
  const currentMood = moods[mood] || moods.sleepy;

  return (
    <div className="pip-mood" aria-live="polite">
      <div className="mood-face" aria-hidden="true">
        {currentMood.face}
      </div>

      <div className="mood-copy">
        <span className="mood-label">PIP'S CURRENT MOOD</span>
        <h3>{currentMood.name}</h3>
        <p>{currentMood.message}</p>
        <small>{boops} friendly boops received ♡</small>
      </div>
    </div>
  );
}
