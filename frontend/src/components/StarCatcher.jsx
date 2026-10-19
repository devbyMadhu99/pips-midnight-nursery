
import { useEffect, useRef, useState } from "react";
import "./StarCatcher.css";

const GAME_TIME = 30;
const BEST_SCORE_KEY = "pips-star-catcher-best";

export default function StarCatcher() {
  const [playing, setPlaying] = useState(false);
  const [score, setScore] = useState(0);
  const [timeLeft, setTimeLeft] = useState(GAME_TIME);
  const [bestScore, setBestScore] = useState(
    () => Number(localStorage.getItem(BEST_SCORE_KEY)) || 0
  );
  const [stars, setStars] = useState([]);
  const [basket, setBasket] = useState(50);
  const gameRef = useRef(null);
  const basketRef = useRef(50);
  const scoreRef = useRef(0);

  function moveBasket(event) {
    if (!gameRef.current) return;

    const rect = gameRef.current.getBoundingClientRect();
    const position =
      ((event.clientX - rect.left) / rect.width) * 100;

    const nextPosition = Math.max(7, Math.min(93, position));
    basketRef.current = nextPosition;
    setBasket(nextPosition);
  }

  function startGame() {
    scoreRef.current = 0;
    basketRef.current = 50;
    setScore(0);
    setBasket(50);
    setStars([]);
    setTimeLeft(GAME_TIME);
    setPlaying(true);
  }

  useEffect(() => {
    if (!playing) return;

    const timer = setInterval(() => {
      setTimeLeft((time) => {
        if (time <= 1) {
          setPlaying(false);
          return 0;
        }
        return time - 1;
      });
    }, 1000);

    return () => clearInterval(timer);
  }, [playing]);

  useEffect(() => {
    if (!playing) return;

    let animationId;
    let lastSpawn = 0;
    let lastFrame = 0;
    let currentStars = [];
    let previousTime = 0;

    function animate(timestamp) {
      if (timestamp - previousTime < 30) {
        animationId = requestAnimationFrame(animate);
        return;
      }

      previousTime = timestamp;

      if (timestamp - lastSpawn > 650) {
        currentStars.push({
          id: `${timestamp}-${Math.random()}`,
          x: 5 + Math.random() * 90,
          y: -5,
          speed: 0.16 + Math.random() * 0.12,
        });
        lastSpawn = timestamp;
      }

      currentStars = currentStars.filter((star) => {
        star.y += star.speed * 3;

        if (
          star.y >= 84 &&
          star.y <= 96 &&
          Math.abs(star.x - basketRef.current) < 10
        ) {
          scoreRef.current += 1;
          setScore(scoreRef.current);
          return false;
        }

        return star.y < 105;
      });

      setStars([...currentStars]);
      lastFrame = timestamp;
      animationId = requestAnimationFrame(animate);
    }

    animationId = requestAnimationFrame(animate);

    return () => cancelAnimationFrame(animationId);
  }, [playing]);

  useEffect(() => {
    if (playing || timeLeft !== 0) return;

    if (score > bestScore) {
      setBestScore(score);
      localStorage.setItem(BEST_SCORE_KEY, String(score));
    }
  }, [playing, timeLeft, score, bestScore]);

  return (
    <section className="star-catcher section">
      <div className="section-label">✦ A LITTLE STAR GAME ✦</div>
      <h2>Catch the Falling Stars</h2>
      <p>Move your basket and catch as many stars as you can!</p>

      <div className="star-game-stats">
        <span>⭐ Score: {score}</span>
        <span>⏱️ Time: {timeLeft}s</span>
        <span>🏆 Best: {bestScore}</span>
      </div>

      <div
        className="star-game-board"
        ref={gameRef}
        onPointerMove={(event) => {
          if (playing && event.buttons !== 0) moveBasket(event);
        }}
        onPointerDown={(event) => {
          if (playing) {
            event.currentTarget.setPointerCapture(event.pointerId);
            moveBasket(event);
          }
        }}
      >
        <div className="star-game-moon">🌙</div>

        {stars.map((star) => (
          <span
            key={star.id}
            className="falling-star"
            style={{
              left: `${star.x}%`,
              top: `${star.y}%`,
            }}
          >
            ⭐
          </span>
        ))}

        <div
          className="star-basket"
          style={{ left: `${basket}%` }}
        >
          🧺
        </div>

        {!playing && (
          <div className="star-game-overlay">
            <h3>{timeLeft === 0 ? "Lovely catching! ✨" : "Ready, little star?"}</h3>
            <p>
              {timeLeft === 0
                ? `You caught ${score} stars!`
                : "You have 30 seconds. Let's play!"}
            </p>
            <button className="primary-button" onClick={startGame}>
              {timeLeft === 0 ? "Play Again ↻" : "Start Game ⭐"}
            </button>
          </div>
        )}
      </div>

      <p className="star-game-hint">
        ✨ Touch or drag across the sky to move your basket.
      </p>
    </section>
  );
}
