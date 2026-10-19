
import { useState } from "react";
import "../styles/DreamCalendar.css";

function getDateKey(date) {
  const year = date.getFullYear();
  const month = String(date.getMonth() + 1).padStart(2, "0");
  const day = String(date.getDate()).padStart(2, "0");

  return `${year}-${month}-${day}`;
}

export default function DreamCalendar() {
  const [monthDate, setMonthDate] = useState(new Date());

  const [dreamDates] = useState(() => {
    try {
      return JSON.parse(
        localStorage.getItem("pips-dream-dates") || "[]"
      );
    } catch {
      return [];
    }
  });

  const year = monthDate.getFullYear();
  const month = monthDate.getMonth();
  const firstDay = new Date(year, month, 1).getDay();
  const daysInMonth = new Date(year, month + 1, 0).getDate();
  const today = getDateKey(new Date());

  function changeMonth(amount) {
    setMonthDate(new Date(year, month + amount, 1));
  }

  return (
    <section className="dream-calendar section" id="dream-calendar">
      <div className="section-label">✦ A LITTLE HISTORY OF DREAMS ✦</div>

      <h2>
        Your Dream Calendar
        <br />
        <span>every dream leaves a little sparkle.</span>
      </h2>

      <div className="calendar-card">
        <div className="calendar-header">
          <button onClick={() => changeMonth(-1)} aria-label="Previous month">
            ←
          </button>

          <h3>
            {monthDate.toLocaleDateString("en-US", {
              month: "long",
              year: "numeric",
            })}
          </h3>

          <button onClick={() => changeMonth(1)} aria-label="Next month">
            →
          </button>
        </div>

        <div className="calendar-grid">
          {["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"].map(
            (day) => (
              <div className="calendar-weekday" key={day}>
                {day}
              </div>
            )
          )}

          {Array.from({ length: firstDay }, (_, index) => (
            <div className="calendar-day empty" key={`empty-${index}`} />
          ))}

          {Array.from({ length: daysInMonth }, (_, index) => {
            const day = index + 1;
            const date = new Date(year, month, day);
            const dateKey = getDateKey(date);
            const hasDream = dreamDates.includes(dateKey);
            const isToday = dateKey === today;

            return (
              <div
                className={`calendar-day ${
                  hasDream ? "has-dream" : ""
                } ${isToday ? "is-today" : ""}`}
                key={dateKey}
                title={hasDream ? "A dream was generated on this day" : ""}
              >
                <span>{day}</span>
                {hasDream && <span className="calendar-sparkle">✦</span>}
              </div>
            );
          })}
        </div>

        <p className="calendar-legend">
          <span>✦</span> Dream created
          <span className="today-dot" /> Today
        </p>
      </div>
    </section>
  );
}
