
export default function Home() {
  return (
    <>
      <section className="hero" id="home">
        <div className="stars">✦　 ·　 ✧　　 ·　 ✦　 ·　 ✧</div>

        <div className="hero-copy">
          <span className="eyebrow">✦ JUNIOR DREAM ENGINEER ✦</span>

          <h1>
            Small skull.
            <br />
            <span>Big dreams.</span>
          </h1>

          <p className="intro">
            Hello, sleepyhead. I'm Pip. I build the dreams you fall asleep inside.
          </p>

          <a className="primary-button" href="#projects">
            Explore my little world ↗
          </a>
        </div>

        <div className="pip-wrap">
          <div className="moon"></div>
          <div className="orbit orbit-one"></div>
          <div className="orbit orbit-two"></div>

          <div className="pip">
            <span className="hat">✦</span>
            <span className="skull">
              <span className="eye eye-left"><i /></span>
              <span className="eye eye-right"><i /></span>
              <span className="cheek cheek-left"></span>
              <span className="cheek cheek-right"></span>
              <span className="smile"></span>
              <span className="teeth">▥</span>
            </span>
            <span className="bow">🎀</span>
          </div>

          <div className="speech">psst... welcome to my nursery ♡</div>
        </div>
      </section>

      <section className="about section" id="about">
        <div className="section-label">01 — A LITTLE INTRODUCTION</div>

        <h2>
          Meet your friendly
          <br />
          <span>neighborhood oddity.</span>
        </h2>

        <div className="about-card">
          <div className="about-icon">☁️</div>
          <div>
            <h3>Officially tiny. Unofficially cosmic.</h3>
            <p>
              Pip is a curious little dream engineer from the Midnight Nursery.
              Every night, he collects stray wishes and turns them into dreams.
            </p>

            <div className="traits">
              <span>☾ sleepy</span>
              <span>✧ curious</span>
              <span>♡ friendly</span>
              <span>♫ hates silence</span>
            </div>
          </div>
        </div>
      </section>

      <section className="projects section" id="projects">
        <div className="section-label">02 — THINGS FROM MY DESK</div>

        <h2>
          Little projects,
          <br />
          <span>big sleepy energy.</span>
        </h2>

        <div className="project-grid">
          <article className="project-card">
            <div className="project-icon">🌙</div>
            <span className="project-tag">SOUND & DREAMS</span>
            <h3>Lullaby Lab</h3>
            <p>Tiny dreams created from a little imagination.</p>
            <a className="project-link" href="/journal#dream-workshop">
              Explore Dream Lab ↗
            </a>
          </article>

          <article className="project-card">
            <div className="project-icon">✨</div>
            <span className="project-tag">GLOWING THINGS</span>
            <h3>Nightlight Collection</h3>
            <p>Discover stars and explore Pip's midnight universe.</p>
            <a className="project-link" href="/universe">
              Explore the Stars ↗
            </a>
          </article>

          <article className="project-card">
            <div className="project-icon">📮</div>
            <span className="project-tag">COSMIC MAIL</span>
            <h3>Dream Delivery</h3>
            <p>Send a little wish into Pip's magical world.</p>
            <a className="project-link" href="/wishes">
              Send a Wish ↗
            </a>
          </article>
        </div>
      </section>

      <section className="story section">
        <div className="section-label">03 — HOW IT ALL BEGAN</div>

        <h2>
          A very small journey
          <br />
          <span>through a very big sky.</span>
        </h2>

        <div className="timeline">
          <div className="timeline-item">
            <span>01</span>
            <div>
              <h3>The First Yawn</h3>
              <p>
                Pip woke up inside a forgotten lullaby, wearing an oversized nightcap.
              </p>
            </div>
          </div>

          <div className="timeline-item">
            <span>02</span>
            <div>
              <h3>Oops, All Stars</h3>
              <p>
                He tried to fix one little star and accidentally switched on the whole sky.
              </p>
            </div>
          </div>

          <div className="timeline-item">
            <span>03</span>
            <div>
              <h3>Junior Dream Engineer</h3>
              <p>
                Now Pip delivers dreams every night. His paperwork is mostly doodles.
              </p>
            </div>
          </div>
        </div>
      </section>
    </>
  );
}
