
import { useEffect, useState } from "react";
import "./MoonMatch.css";

const cardPairs = [
  { pair: "moon", symbol: "🌙" },
  { pair: "star", symbol: "⭐" },
  { pair: "cloud", symbol: "☁️" },
  { pair: "planet", symbol: "🪐" },
  { pair: "comet", symbol: "☄️" },
  { pair: "heart", symbol: "💜" },
  { pair: "flower", symbol: "🌸" },
  { pair: "sparkle", symbol: "✨" },
];

function shuffleCards() {
  const allCards = cardPairs.flatMap((card, index) => [
    { ...card, id: index * 2 + 1 },
    { ...card, id: index * 2 + 2 },
  ]);

  return allCards.sort(() => Math.random() - 0.5);
}

export default function MoonMatch() {
  const [deck, setDeck] = useState(() => shuffleCards());
  const [flipped, setFlipped] = useState([]);
  const [matched, setMatched] = useState([]);
  const [moves, setMoves] = useState(0);
  const [seconds, setSeconds] = useState(0);
  const [started, setStarted] = useState(false);
  const [bestMoves, setBestMoves] = useState(
    () => Number(localStorage.getItem("pips-moon-match-best")) || 0
  );

  const won = matched.length === deck.length;

  useEffect(() => {
    if (!started || won) return;

    const timer = setInterval(() => {
      setSeconds((time) => time + 1);
    }, 1000);

    return () => clearInterval(timer);
  }, [started, won]);

  useEffect(() => {
    if (flipped.length !== 2) return;

    const firstCard = deck.find((card) => card.id === flipped[0]);
    const secondCard = deck.find((card) => card.id === flipped[1]);

    const timer = setTimeout(() => {
      if (firstCard.pair === secondCard.pair) {
        setMatched((previous) => [...previous, flipped[0], flipped[1]]);
      }

      setFlipped([]);
    }, firstCard.pair === secondCard.pair ? 350 : 850);

    return () => clearTimeout(timer);
  }, [flipped, deck]);

  useEffect(() => {
    if (!won) return;

    if (!bestMoves || moves < bestMoves) {
      localStorage.setItem("pips-moon-match-best", String(moves));
      setBestMoves(moves);
    }
  }, [won, moves, bestMoves]);

  function flipCard(id) {
    if (
      won ||
      flipped.length === 2 ||
      flipped.includes(id) ||
      matched.includes(id)
    ) {
      return;
    }

    setStarted(true);
    setMoves((count) => count + 1);
    setFlipped((previous) => [...previous, id]);
  }

function restartGame() {
  setStarted(false);
  setDeck(shuffleCards());
  setFlipped([]);
  setMatched([]);
  setMoves(0);
  setSeconds(0);
}

  
  return (
    <section className="moon-match section">
      <div className="section-label">✦ MOONLIGHT MEMORY GAME ✦</div>

      <h2>Moon &amp; Stars Match</h2>
      <p>Flip the cards and find all 8 matching pairs!</p>

      <div className="moon-match-stats">
        <span>🎯 Moves: {moves}</span>
        <span>
          ⏱️ Time: {Math.floor(seconds / 60)}:
          {String(seconds % 60).padStart(2, "0")}
        </span>
        <span>🏆 Best: {bestMoves || "—"}</span>
      </div>

      <div className="moon-match-grid">
        {deck.map((card) => {
          const visible =
            flipped.includes(card.id) || matched.includes(card.id);

          return (
            <button
              key={card.id}
              type="button"
              className={`moon-match-card ${visible ? "revealed" : ""} ${
                matched.includes(card.id) ? "matched" : ""
              }`}
              onClick={() => flipCard(card.id)}
              disabled={visible || won}
              aria-label={visible ? card.symbol : "Reveal hidden card"}
            >
              {visible ? card.symbol : "✦"}
            </button>
          );
        })}
      </div>

      {won && (
        <div className="moon-match-win">
          <h3>🌟 You found every pair!</h3>
          <p>
            You did it in {moves} moves and{" "}
            {Math.floor(seconds / 60)}:
            {String(seconds % 60).padStart(2, "0")}!
          </p>
        </div>
      )}

      <button
        type="button"
        className="primary-button moon-match-restart"
        onClick={restartGame}
      >
        ↻ {won ? "Play Again" : "Restart Game"}
      </button>
    </section>
  );
}
