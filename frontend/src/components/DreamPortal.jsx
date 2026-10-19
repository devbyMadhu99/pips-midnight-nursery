
import "../styles/DreamPortal.css";

export default function DreamPortal() {
  return (
    <section className="dream-portal section" id="dream-portal">
      <div className="portal-label">
        ✦ A GATEWAY TO YOUR IMAGINATION ✦
      </div>

      <h2>
        Every little wish
        <br />
        <span>opens a new world.</span>
      </h2>

      <p className="portal-description">
        Step through the stardust and discover
        a dream made just for you.
      </p>

      <div className="portal-scene">
        <div className="portal-orbit portal-orbit-one" />
        <div className="portal-orbit portal-orbit-two" />

        <div className="portal-ring">
          <div className="portal-core">
            <span>☁️</span>
            <span className="portal-moon">☾</span>
          </div>
        </div>

        <span className="portal-star portal-star-one">✦</span>
        <span className="portal-star portal-star-two">✧</span>
        <span className="portal-star portal-star-three">✦</span>
        <span className="portal-star portal-star-four">⋆</span>
      </div>
<a className="portal-button" href="/journal#dream-workshop">
  Open the Dream Portal ✨
</a>
      <div className="portal-footnote">
        ✧ no passwords, just a little imagination ✧
      </div>
    </section>
  );
}
