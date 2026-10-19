
import { useState, useEffect, useRef } from "react";
import { NavLink, Routes, Route } from "react-router-dom";

import Home from "./pages/Home";
import Journal from "./pages/Journal";
import Universe from "./pages/Universe";
import Wishes from "./pages/Wishes";
import Playroom from "./pages/Playroom";

import SparkleTrail from "./SparkleTrail";
import "./App.css";

export default function App() {
  const [night, setNight] = useState(true);
  const [soundOn, setSoundOn] = useState(false);
  const audioRef = useRef(null);
  const timerRef = useRef(null);

  useEffect(() => {
    return () => {
      clearInterval(timerRef.current);
      if (audioRef.current) {
        audioRef.current.close();
      }
    };
  }, []);

  const toggleLullaby = async () => {
    if (soundOn) {
      clearInterval(timerRef.current);
      timerRef.current = null;

      if (audioRef.current) {
        await audioRef.current.close();
        audioRef.current = null;
      }

      setSoundOn(false);
      return;
    }

    const AudioContextClass =
      window.AudioContext || window.webkitAudioContext;

    if (!AudioContextClass) {
      alert("Sorry, your browser does not support audio.");
      return;
    }

    const audio = new AudioContextClass();
    await audio.resume();
    audioRef.current = audio;

    const notes = [261.63, 329.63, 392, 329.63, 293.66, 349.23];
    let index = 0;

    const playNote = () => {
      if (audio.state !== "running") return;

      const oscillator = audio.createOscillator();
      const volume = audio.createGain();

      oscillator.type = "sine";
      oscillator.frequency.value = notes[index % notes.length];

      volume.gain.setValueAtTime(0.0001, audio.currentTime);
      volume.gain.exponentialRampToValueAtTime(
        0.035,
        audio.currentTime + 0.15
      );
      volume.gain.exponentialRampToValueAtTime(
        0.0001,
        audio.currentTime + 1.1
      );

      oscillator.connect(volume);
      volume.connect(audio.destination);

      oscillator.start();
      oscillator.stop(audio.currentTime + 1.15);

      index++;
    };

    playNote();
    timerRef.current = setInterval(playNote, 1200);
    setSoundOn(true);
  };

  return (
    <main className={night ? "nursery night" : "nursery day"}>
      <SparkleTrail />

      <nav className="nav">
        <NavLink className="logo" to="/">
          ☾ pip's nursery
        </NavLink>

        <div className="nav-links">
          <NavLink to="/">Home</NavLink>
          <NavLink to="/journal">Journal</NavLink>
          <NavLink to="/universe">Universe</NavLink>
          <NavLink to="/wishes">Wishes</NavLink>
          <NavLink to="/playroom">Playroom</NavLink>
        </div>

        <div className="nav-controls">
          <button
            className="mode-button"
            onClick={() => setNight((current) => !current)}
          >
            {night ? "☀️ Day mode" : "🌙 Night mode"}
          </button>

          <button
            className="mode-button"
            onClick={toggleLullaby}
            aria-pressed={soundOn}
          >
            {soundOn ? "🔇 Mute Lullaby" : "🎵 Play Lullaby"}
          </button>
        </div>
      </nav>

      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/journal" element={<Journal />} />
        <Route path="/universe" element={<Universe />} />
        <Route path="/wishes" element={<Wishes />} />
        <Route path="/playroom" element={<Playroom />} />
        <Route path="*" element={<Home />} />
      </Routes>

      <footer className="footer">
        <div className="footer-star">✦</div>
        <h2>
          Sweet dreams,
          <br />
          <span>little human.</span>
        </h2>
        <p>
          Built with love, stardust, and absolutely no bedtime discipline.
        </p>
        <span className="footer-sign">
          © Pip's Midnight Nursery · 2026
        </span>
      </footer>
    </main>
  );
}
