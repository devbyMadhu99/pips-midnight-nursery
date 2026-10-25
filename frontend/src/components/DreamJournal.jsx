
import "../styles/DreamJournal.css";
import { useEffect, useState } from "react";

const API_URL = "https://pips-midnight-nursery-1.onrender.com/api/dreams";

const STORAGE_KEY = "pips-midnight-dream-journal";
const MIGRATION_KEY = "pips-dreams-migrated";


async function copyDream(entry) {
  try {
    await navigator.clipboard.writeText(
      `${entry.title}\n\n${entry.text}`
    );
    alert("Dream copied! ✨");
  } catch {
    alert("Dream copy nahi ho paya.");
  }
}

async function migrateOldDreams() {
  if (localStorage.getItem(MIGRATION_KEY)) return;

  const saved = localStorage.getItem(STORAGE_KEY);
  if (!saved) return;

  let oldDreams;

  try {
    oldDreams = JSON.parse(saved);
  } catch {
    console.error("Old dream journal data is invalid.");
    return;
  }

  if (!Array.isArray(oldDreams) || oldDreams.length === 0) {
    localStorage.setItem(MIGRATION_KEY, "true");
    return;
  }

  const response = await fetch(API_URL);

  if (!response.ok) {
    throw new Error("Could not check existing dreams.");
  }

  const existingDreams = await response.json();
  const existingTitles = new Set(
    existingDreams.map((dream) => dream.title)
  );

  for (const dream of oldDreams) {
    if (
      !dream ||
      typeof dream.title !== "string" ||
      typeof dream.text !== "string" ||
      !dream.title.trim() ||
      !dream.text.trim() ||
      existingTitles.has(dream.title)
    ) {
      continue;
    }

    const saveResponse = await fetch(API_URL, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        title: dream.title,
        text: dream.text,
        symbol: dream.symbol || "🌙",
        favourite: Boolean(dream.favourite),
        savedAt: dream.savedAt || new Date().toISOString(),
      }),
    });

    if (!saveResponse.ok) {
      throw new Error(`Could not migrate dream: ${dream.title}`);
    }

    existingTitles.add(dream.title);
  }

  localStorage.setItem(MIGRATION_KEY, "true");
}


const DAILY_DREAMS = [
  {
    title: "The Moon's Little Library",
    text: "Tonight, a tiny moonbeam saves your place in a library where every book contains a happy memory.",
    symbol: "🌙",
  },
  {
    title: "A Pocketful of Stars",
    text: "You discover three little stars in your pocket. One for courage, one for kindness, and one just for you.",
    symbol: "⭐",
  },
  {
    title: "The Cloud Train",
    text: "A fluffy cloud train takes you somewhere peaceful, where nobody is in a hurry and every cup of tea is warm.",
    symbol: "☁️",
  },
  {
    title: "The Garden of Wishes",
    text: "Every kind thing you did today grows into a glowing flower in a secret garden above the sky.",
    symbol: "🌷",
  },
  {
    title: "The Tiny Dragon",
    text: "A sleepy little dragon chooses you as its best friend. Its fire is warm, its hugs are soft, and it snores like a kitten.",
    symbol: "🐉",
  },
  {
    title: "Tomorrow's Sunrise",
    text: "Tomorrow doesn't need you to be perfect. It only asks you to arrive with a little hope and try again.",
    symbol: "🌅",
  },
];

function getDailyDream() {
  const today = new Date();
  const dateKey = `${today.getFullYear()}-${today.getMonth()}-${today.getDate()}`;
  const dayNumber = Math.floor(
    new Date(
      today.getFullYear(),
      today.getMonth(),
      today.getDate()
    ).getTime() / 86400000
  );

  return {
    ...DAILY_DREAMS[
      ((dayNumber % DAILY_DREAMS.length) + DAILY_DREAMS.length) %
        DAILY_DREAMS.length
    ],
    dateKey,
  };
}

export default function DreamJournal({ dreamToSave }) {
  const [entries, setEntries] = useState([]);
  const [showFavourites, setShowFavourites] = useState(false);
  const [dailyDream] = useState(getDailyDream);
  const [searchQuery, setSearchQuery] = useState("");
  const [loading, setLoading] = useState(true);

  // Load dreams from MongoDB
  useEffect(() => {
    async function loadDreams() {
      try {
        const response = await fetch(API_URL);

        if (!response.ok) {
          throw new Error("Failed to load dreams");
        }

        const dreams = await response.json();

        setEntries(
          dreams.map((dream) => ({
            ...dream,
            id: dream._id,
          }))
        );
      } catch (error) {
        console.error("Error loading dreams:", error);
        alert("Dreams load nahi ho paaye. Backend check karo.");
      } finally {
        setLoading(false);
      }
    }

    loadDreams();
  }, []);

  // Save a newly generated dream to MongoDB
  useEffect(() => {
    if (!dreamToSave) return;

    let cancelled = false;

    async function saveDream() {
      try {
        const response = await fetch(API_URL, {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            title: dreamToSave.title,
            text: dreamToSave.text,
            symbol: dreamToSave.symbol || "🌙",
            favourite: false,
          }),
        });

        if (!response.ok) {
          throw new Error("Failed to save dream");
        }

        const dream = await response.json();

        if (!cancelled) {
          setEntries((current) => [
            { ...dream, id: dream._id },
            ...current,
          ]);
        }
      } catch (error) {
        console.error("Error saving dream:", error);
        alert("Dream save nahi hua. Backend check karo.");
      }
    }

    saveDream();

    return () => {
      cancelled = true;
    };
  }, [dreamToSave]);

  const query = searchQuery.toLowerCase().trim();

  const visibleEntries = entries.filter((entry) => {
    const matchesFavourite = !showFavourites || entry.favourite;
    const matchesSearch =
      entry.title.toLowerCase().includes(query) ||
      entry.text.toLowerCase().includes(query);

    return matchesFavourite && matchesSearch;
  });

  async function toggleFavourite(id) {
    const entry = entries.find((item) => item.id === id);
    if (!entry) return;

    try {
      const response = await fetch(`${API_URL}/${id}`, {
        method: "PATCH",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          favourite: !entry.favourite,
        }),
      });

      if (!response.ok) {
        throw new Error("Failed to update favourite");
      }

      const updatedDream = await response.json();

      setEntries((current) =>
        current.map((item) =>
          item.id === id
            ? { ...updatedDream, id: updatedDream._id }
            : item
        )
      );
    } catch (error) {
      console.error("Error updating favourite:", error);
      alert("Favourite update nahi hua.");
    }
  }

  async function deleteDream(id) {
    try {
      const response = await fetch(`${API_URL}/${id}`, {
        method: "DELETE",
      });

      if (!response.ok) {
        throw new Error("Failed to delete dream");
      }

      setEntries((current) =>
        current.filter((entry) => entry.id !== id)
      );
    } catch (error) {
      console.error("Error deleting dream:", error);
      alert("Dream delete nahi hua.");
    }
  }

  async function saveDailyDream() {
    const existing = entries.find(
      (entry) => entry.title === dailyDream.title
    );

    if (existing) {
      if (!existing.favourite) {
        await toggleFavourite(existing.id);
      }
      return;
    }

    try {
      const response = await fetch(API_URL, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          title: dailyDream.title,
          text: dailyDream.text,
          symbol: dailyDream.symbol,
          favourite: true,
        }),
      });

      if (!response.ok) {
        throw new Error("Failed to save daily dream");
      }

      const dream = await response.json();

      setEntries((current) => [
        { ...dream, id: dream._id },
        ...current,
      ]);
    } catch (error) {
      console.error("Error saving daily dream:", error);
      alert("Dream save nahi hua.");
    }
  }

  const dailyDreamSaved = entries.some(
    (entry) =>
      entry.title === dailyDream.title && entry.favourite
  );

  return (
    <section
      className="journal-section section"
      id="dream-journal"
    >
      <div className="section-label">
        ✦ PIP'S LITTLE DREAM JOURNAL ✦
      </div>

      <h2>
        Dreams worth
        <br />
        <span>keeping close.</span>
      </h2>

      <p className="journal-intro">
        Every dream is a tiny piece of magic. Save your favourites
        and revisit them whenever you need a little stardust.
      </p>

      <div className="journal-search">
        <input
          type="search"
          placeholder="Search your dreams..."
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
          aria-label="Search saved dreams"
        />
      </div>

      <div className="journal-toolbar">
        <p>
          {entries.length}{" "}
          {entries.length === 1 ? "dream" : "dreams"} saved ♡
        </p>

        <button
          type="button"
          className="journal-filter"
          aria-pressed={showFavourites}
          onClick={() => setShowFavourites((value) => !value)}
        >
          {showFavourites
            ? "♡ Show all dreams"
            : "♥ Favourites only"}
        </button>
      </div>

      <article className="daily-dream-card">
        <span className="daily-dream-label">
          🌙 DREAM OF THE DAY
        </span>

        <div className="daily-dream-symbol" aria-hidden="true">
          {dailyDream.symbol}
        </div>

        <h3>{dailyDream.title}</h3>
        <p>{dailyDream.text}</p>

        <button
          type="button"
          className="journal-filter"
          onClick={saveDailyDream}
        >
          {dailyDreamSaved
            ? "♥ Saved to favourites"
            : "♡ Save as favourite"}
        </button>
      </article>

      {loading ? (
        <div className="journal-empty">
          <p>Loading your dreams... 🌙</p>
        </div>
      ) : visibleEntries.length === 0 ? (
        <div className="journal-empty">
          <span aria-hidden="true">📖</span>
          <h3>
            {searchQuery.trim()
              ? "No matching dreams."
              : showFavourites
                ? "No favourites yet."
                : "Your journal is waiting."}
          </h3>
          <p>
            {searchQuery.trim()
              ? "Try another search word."
              : showFavourites
                ? "Tap the heart on a dream to keep it close."
                : "Generate a dream in Pip's Dream Workshop and it will appear here."}
          </p>
        </div>
      ) : (
        <div className="journal-grid">
          {visibleEntries.map((entry) => (
            <article className="journal-card" key={entry.id}>
              <div className="journal-card-top">
                <span className="journal-symbol" aria-hidden="true">
                  {entry.symbol}
                </span>

                <button
                  type="button"
                  className={`journal-heart ${
                    entry.favourite ? "is-favourite" : ""
                  }`}
                  aria-label={
                    entry.favourite
                      ? "Remove from favourites"
                      : "Add to favourites"
                  }
                  aria-pressed={Boolean(entry.favourite)}
                  onClick={() => toggleFavourite(entry.id)}
                >
                  {entry.favourite ? "♥" : "♡"}
                </button>
              </div>

              <h3>{entry.title}</h3>
              <p>{entry.text}</p>

              <div className="journal-card-bottom">
                <span>
                  {entry.savedAt
                    ? new Date(entry.savedAt).toLocaleDateString()
                    : ""}
                </span>

                <button
                  type="button"
                  className="journal-delete"
                  onClick={() => deleteDream(entry.id)}
                >
                  Remove
                </button>

                <button
                  type="button"
                  onClick={() => copyDream(entry)}
                >
                  ✨ Copy Dream
                </button>
              </div>
            </article>
          ))}
        </div>
      )}

      <p className="journal-footnote">
        Your dream journal is saved in the database. ✧
      </p>
    </section>
  );
}
