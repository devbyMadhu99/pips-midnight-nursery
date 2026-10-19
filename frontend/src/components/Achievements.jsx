
import "../styles/MagicFeatures.css";

export default function Achievements({
  boops = 0,
  dreamsGenerated = 0,
  secretFound = false,
  starsDiscovered = 0,
}) {

  const badges = [
    {
      id: "hello",
      icon: "👋",
      title: "Hello, Pip!",
      description: "Give Pip your first boop.",
      unlocked: boops >= 1,
    },
    {
      id: "bestie",
      icon: "💗",
      title: "Official Pip Bestie",
      description: "Give Pip five boops.",
      unlocked: boops >= 5,
    },
    {
      id: "dreamer",
      icon: "🌙",
      title: "Little Dreamer",
      description: "Generate your first dream.",
      unlocked: dreamsGenerated >= 1,
    },
    {
      id: "collector",
      icon: "✨",
      title: "Dream Collector",
      description: "Discover three dreams.",
      unlocked: dreamsGenerated >= 3,
    },
    {
      id: "secret",
      icon: "⭐",
      title: "Keeper of Secrets",
      description: "Discover Pip's hidden secret.",
      unlocked: secretFound,
    },
    {
  id: "star-keeper",
  icon: "🌌",
  title: "Keeper of the Midnight Sky",
  description: "Discover all six stars in Pip's Star Map.",
  unlocked: starsDiscovered >= 6,
},
{
  id: "dream-explorer",
  icon: "🔭",
  title: "Dream Explorer",
  description: "Generate ten dreams.",
  unlocked: dreamsGenerated >= 10,
},
{
  id: "pip-superfan",
  icon: "💖",
  title: "Pip's Superfan",
  description: "Give Pip ten boops.",
  unlocked: boops >= 10,
},
{
  id: "star-collector",
  icon: "🌠",
  title: "Little Star Collector",
  description: "Discover three stars in Pip's Star Map.",
  unlocked: starsDiscovered >= 3,
},

  ];

  const unlockedCount = badges.filter(
    (badge) => badge.unlocked
  ).length;

  return (
    <section className="magic-section section" id="achievements">
      <div className="section-label">
        ✦ YOUR LITTLE TROPHY SHELF ✦
      </div>

      <h2>
        Tiny achievements,
        <br />
        <span>big happy feelings.</span>
      </h2>

      <p className="magic-intro">
        Every little interaction brings you closer to becoming
        Pip's favourite human.
      </p>

      <p className="achievement-progress">
        {unlockedCount} of {badges.length} badges unlocked ⭐
      </p>

      <div className="achievement-grid">
        {badges.map((badge) => (
          <article
            className={`achievement-card ${
              badge.unlocked ? "is-unlocked" : "is-locked"
            }`}
            key={badge.id}
          >
            <span className="achievement-icon" aria-hidden="true">
              {badge.unlocked ? badge.icon : "🔒"}
            </span>

            <h3>{badge.title}</h3>
            <p>{badge.description}</p>

            <span className="achievement-status">
              {badge.unlocked ? "✦ UNLOCKED" : "NOT YET"}
            </span>
          </article>
        ))}
      </div>
    </section>
  );
}
