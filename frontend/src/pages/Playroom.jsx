
import PipVirtualPet from "../components/PipVirtualPet";
import { useState } from "react";
import PipMood from "../components/PipMood";
import Achievements from "../components/Achievements";
import StarCatcher from "../components/StarCatcher";
import MoonMatch from "../components/MoonMatch";

export default function Playroom() {
  const [boops, setBoops] = useState(0);
  const [secret, setSecret] = useState(false);
  const [secretFound, setSecretFound] = useState(false);
  const [pipMood, setPipMood] = useState("sleepy");
  const [pipClicks, setPipClicks] = useState(0);

  const handlePipClick = () => {
    const nextClicks = pipClicks + 1;
    setPipClicks(nextClicks);
    setPipMood("curious");

    if (nextClicks >= 5) {
      setSecret(true);
      setSecretFound(true);
      setPipMood("happy");
    }
  };

  return (
    <div className="page-content">
      <section className="section page-heading">
        <div className="section-label">✦ THE NURSERY PLAYROOM ✦</div>
        <h1>
          Let's be a little
          <br />
          <span>mischievous.</span>
        </h1>
        <p>Boop Pip, find a secret, and collect little achievements.</p>
      </section>

      <section className="play section" id="play">
        <div className="play-card">
          <button
            type="button"
            className="pip-secret-trigger"
            onClick={handlePipClick}
            aria-label="Click Pip to discover a secret"
          >
            <span role="img" aria-label="Pip">👶🏻</span>
          </button>

          <p className="tiny-note">
            {secret
              ? "Psst... you discovered Pip's secret! ✨"
              : `Pip is hiding something... ${pipClicks}/5`}
          </p>

          <h2>Boop-o-meter 3000</h2>
          <p>
            You've booped Pip <strong>{boops}</strong>{" "}
            {boops === 1 ? "time" : "times"}. He is being very brave about it.
          </p>

          <button
            className="primary-button"
            onClick={() => {
              setBoops((count) => count + 1);
              setPipMood("happy");
            }}
          >
            Give Pip a boop ♡
          </button>

          <div className="tiny-note">
            <PipMood mood={pipMood} boops={boops} />
          </div>
          <p>Side effects may include tiny giggles.</p>
        </div>

        {secret && (
          <div className="secret-message">
            <span>🌟</span>
            <h3>You found the secret!</h3>
            <p>
              Pip keeps a star under his pillow for you. Shhh... it's our little secret.
            </p>
            <small>SECRET #001 — THE FRIENDSHIP STAR</small>
          </div>
        )}
      </section>

      <Achievements
        boops={boops}
        dreamsGenerated={0}
        secretFound={secretFound}
        starsDiscovered={0}
      />
      <StarCatcher />
      <MoonMatch />
      <PipVirtualPet />
    </div>
  );
}
