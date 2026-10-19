
import { useEffect, useState } from "react";
import "../styles/DreamStreak.css";

const STORAGE_KEY = "pips-dream-streak";
function getToday() {
  const date = new Date();
  const year = date.getFullYear();
  const month = String(date.getMonth() + 1).padStart(2, "0");
  const day = String(date.getDate()).padStart(2, "0");

  return `${year}-${month}-${day}`;
}

function getSavedStreak() {
  try {
    const saved = JSON.parse(localStorage.getItem(STORAGE_KEY));

    if (
      saved &&
      typeof saved.streak === "number" &&
      typeof saved.bestStreak === "number"
    ) {
      return saved;
    }
  } catch {
    // Use the default streak if saved data is invalid.
  }

  return { lastDate: "", streak: 0, bestStreak: 0 };
}

export default function DreamStreak({ latestDream }) {
  const [streakData, setStreakData] = useState(getSavedStreak);

  useEffect(() => {
    if (!latestDream) return;

    const today = getToday();
let savedDates = [];

try {
  savedDates = JSON.parse(
    localStorage.getItem("pips-dream-dates") || "[]"
  );

  if (!Array.isArray(savedDates)) {
    savedDates = [];
  }
} catch {
  savedDates = [];
}
if (!savedDates.includes(today)) {
  savedDates.push(today);
  localStorage.setItem(
    "pips-dream-dates",
    JSON.stringify(savedDates)
  );
}
    const saved = getSavedStreak();

    // Multiple dreams on the same day count as one streak day.
    if (saved.lastDate === today) {
      setStreakData(saved);
      return;
    }

    const yesterday = new Date();
    yesterday.setDate(yesterday.getDate() - 1);

    const yesterdayKey = [
      yesterday.getFullYear(),
      String(yesterday.getMonth() + 1).padStart(2, "0"),
      String(yesterday.getDate()).padStart(2, "0"),
    ].join("-");

    const streak =
      saved.lastDate === yesterdayKey ? saved.streak + 1 : 1;

    const updated = {
      lastDate: today,
      streak,
      bestStreak: Math.max(saved.bestStreak, streak),
    };

    localStorage.setItem(STORAGE_KEY, JSON.stringify(updated));
    setStreakData(updated);
  }, [latestDream]);

  return (
    <section className="dream-streak section">
      <div className="section-label">✦ YOUR LITTLE DAILY MAGIC ✦</div>

      <div className="streak-card">
        <div className="streak-icon" aria-hidden="true">
          🔥
        </div>

        <h2>
          Your Dream Streak
          <br />
          <span>one little dream at a time.</span>
        </h2>

        <div className="streak-number">
          {streakData.streak} <span>day{streakData.streak === 1 ? "" : "s"}</span>
        </div>

        <p>
          {streakData.streak === 0
            ? "Generate a dream today to start your magical streak!"
            : "Your imagination visited the nursery today. Keep the magic going! ✨"}
        </p>

        <div className="best-streak">
          🌟 Personal best: {streakData.bestStreak} day
          {streakData.bestStreak === 1 ? "" : "s"}
        </div>
      </div>
    </section>
  );
}
