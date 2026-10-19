
import "../styles/MoonPhase.css";

function getMoonPhase() {
  const knownNewMoon = new Date(Date.UTC(2000, 0, 6, 18, 14));
  const today = new Date();

  const daysSinceNewMoon =
    (today.getTime() - knownNewMoon.getTime()) / 86400000;

  const age = ((daysSinceNewMoon % 29.53059) + 29.53059) % 29.53059;

  if (age < 1.85) {
    return {
      name: "New Moon",
      emoji: "🌑",
      message: "A quiet beginning. Make space for a brand-new dream.",
    };
  }

  if (age < 7.38) {
    return {
      name: "Waxing Crescent",
      emoji: "🌒",
      message: "Your little hopes are beginning to grow.",
    };
  }

  if (age < 9.23) {
    return {
      name: "First Quarter",
      emoji: "🌓",
      message: "Take one small step toward something you love.",
    };
  }

  if (age < 14.77) {
    return {
      name: "Waxing Gibbous",
      emoji: "🌔",
      message: "Keep growing, even if you're not there yet.",
    };
  }

  if (age < 16.61) {
    return {
      name: "Full Moon",
      emoji: "🌕",
      message: "Let your little light shine tonight.",
    };
  }

  if (age < 22.15) {
    return {
      name: "Waning Gibbous",
      emoji: "🌖",
      message: "Pause and appreciate how far you've come.",
    };
  }

  if (age < 24) {
    return {
      name: "Last Quarter",
      emoji: "🌗",
      message: "It's okay to let go of what you no longer need.",
    };
  }

  return {
    name: "Waning Crescent",
    emoji: "🌘",
    message: "Rest gently. A new beginning is on its way.",
  };
}

export default function MoonPhase() {
  const moon = getMoonPhase();

  return (
    <section className="moon-phase section" id="moon-phase">
      <div className="section-label">✦ PIP'S LITTLE MOON WATCH ✦</div>

      <h2>
        The Moon Tonight
        <br />
        <span>a little light for your dreams.</span>
      </h2>

      <div className="moon-card">
        <div className="moon-illustration" aria-hidden="true">
          {moon.emoji}
        </div>

        <h3>{moon.name}</h3>

        <p>{moon.message}</p>

        <span className="moon-date">
          {new Date().toLocaleDateString("en-IN", {
            day: "numeric",
            month: "long",
            year: "numeric",
          })}
        </span>
      </div>
    </section>
  );
}
