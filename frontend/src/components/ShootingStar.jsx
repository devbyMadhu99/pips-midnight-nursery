
import { useState } from "react";
import "../styles/ShootingStar.css";

export default function ShootingStar() {
  const [wishSent, setWishSent] = useState(false);

  function sendWish() {
    setWishSent(false);
    requestAnimationFrame(() => setWishSent(true));
  }

  return (
    <section className="shooting-wish section">
      <div className="section-label">✦ A LITTLE WISH UPON A STAR ✦</div>

      <h2>
        Send a wish
        <br />
        <span>into the universe.</span>
      </h2>

      <p>Some little hopes deserve their own moment of magic.</p>

      <div className={`shooting-sky ${wishSent ? "wish-launched" : ""}`}>
        <span className="wish-moon">☾</span>
        <span className="wish-star wish-star-one">✦</span>
        <span className="wish-star wish-star-two">✧</span>
        <span className="wish-star wish-star-three">✦</span>
        <span className="shooting-comet">✦</span>
        {wishSent && <span className="wish-message">wish sent ♡</span>}
      </div>

      <button className="shooting-button" onClick={sendWish}>
        {wishSent ? "Send another wish ✨" : "Launch a shooting star ✨"}
      </button>
    </section>
  );
}
