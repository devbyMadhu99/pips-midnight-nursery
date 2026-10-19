
import DreamGenerator from "../components/DreamGenerator";
import DreamJournal from "../components/DreamJournal";
import DreamGallery from "../components/DreamGallery";
import DreamStreak from "../components/DreamStreak";
import { useState } from "react";

export default function Journal() {
  const [latestDream, setLatestDream] = useState(null);
  const [dreamToSave, setDreamToSave] = useState(null);

  return (
    <div className="page-content">
      <section className="section page-heading">
        <div className="section-label">✦ PIP'S DREAM DIARY ✦</div>
        <h1>
          A little book of
          <br />
          <span>big dreams.</span>
        </h1>
        <p>Make a dream, save a memory, and keep a little magic.</p>
      </section>

      <DreamGenerator
        onDreamGenerated={(dream) => {
          setLatestDream(dream);
        }}
        onSaveDream={(dream) => {
          setDreamToSave({
            ...dream,
            journalToken: `${Date.now()}-${Math.random()}`,
          });
        }}
      />

      <DreamStreak latestDream={latestDream} />
      <DreamJournal dreamToSave={dreamToSave} />
      <DreamGallery />
    </div>
  );
}
