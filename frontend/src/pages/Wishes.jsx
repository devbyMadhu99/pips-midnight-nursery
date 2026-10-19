import WishJar from "../components/WishJar";
import ShootingStar from "../components/ShootingStar";
import DreamCalendar from "../components/DreamCalendar";
import DreamTimeCapsule from "../components/DreamTimeCapsule";

export default function Wishes() {
  return (
    <div className="page-content">
      <section className="section page-heading">
        <div className="section-label">✦ LITTLE HOPES, BIG MAGIC ✦</div>
        <h1>
          A pocket full
          <br />
          <span>of wishes.</span>
        </h1>
        <p>Save a wish, send it to the stars, or leave a letter for your future self.</p>
      </section>

      <WishJar />
      <ShootingStar />
      <DreamCalendar />
      <DreamTimeCapsule />
    </div>
  );
}