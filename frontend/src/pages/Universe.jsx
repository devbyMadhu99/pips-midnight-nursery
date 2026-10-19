import DreamPortal from "../components/DreamPortal";
import DreamConstellation from "../components/DreamConstellation";
import MoonPhase from "../components/MoonPhase";
import StarMap from "../components/StarMap";

export default function Universe() {
  return (
    <div className="page-content">
      <section className="section page-heading">
        <div className="section-label">✦ BEYOND THE MIDNIGHT SKY ✦</div>
        <h1>
          Welcome to the
          <br />
          <span>Dream Universe.</span>
        </h1>
        <p>Follow the stars and discover a little cosmic magic.</p>
      </section>

      <DreamPortal />
      <DreamConstellation />
      <MoonPhase />
      <StarMap />
    </div>
  );
}