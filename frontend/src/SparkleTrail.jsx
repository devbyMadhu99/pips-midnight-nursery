
import { useEffect, useState } from "react";

export default function SparkleTrail() {
  const [sparkles, setSparkles] = useState([]);
  
  useEffect(() => {
    let lastTime = 0;
    let nextId = 0;

    function handleMove(event) {
      if (event.pointerType !== "mouse") return;

      const now = Date.now();
      if (now - lastTime < 55) return;
      lastTime = now;

      const sparkle = {
        id: nextId++,
        x: event.clientX,
        y: event.clientY,
        symbol: Math.random() > 0.5 ? "✦" : "✧",
        size: 10 + Math.random() * 12,
      };

      setSparkles((previous) => [...previous.slice(-14), sparkle]);

      setTimeout(() => {
        setSparkles((previous) =>
          previous.filter((item) => item.id !== sparkle.id)
        );
      }, 750);
    }

    window.addEventListener("pointermove", handleMove);
    return () => window.removeEventListener("pointermove", handleMove);
  }, []);

  return (
    <div className="sparkle-layer" aria-hidden="true">
      {sparkles.map((sparkle) => (
        <span
          key={sparkle.id}
          className="cursor-sparkle"
          style={{
            left: sparkle.x,
            top: sparkle.y,
            fontSize: sparkle.size,
          }}
        >
          {sparkle.symbol}
        </span>
      ))}
    </div>
  );
}
