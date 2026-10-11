import { useEffect, useState } from "react";
import {
  ArrowRight,
  ChevronLeft,
  ChevronRight,
  Gift,
  Heart,
  Mail,
  Sparkles,
  Star,
} from "lucide-react";

type Scene =
  | "intro"
  | "envelope"
  | "letter-opening"
  | "letter-open"
  | "letter-closing"
  | "reasons"
  | "gift-falling"
  | "gift-ready"
  | "gift-opening"
  | "second-letter"
  | "second-letter-closing"
  | "ending";

/* Edit personal content here. Keep exactly 11 entries in reasons. */
const CONFIG = {
  recipientName: "[Recipient Name]",
  milestoneTitle: "11 MONTHS",
  milestoneSubtitle: "Eleven months of little moments",
  firstLetter: {
    title: "[First Letter Title]",
    body: "[First Letter Body]",
  },
  reasons: [
    "[Reason 1]",
    "[Reason 2]",
    "[Reason 3]",
    "[Reason 4]",
    "[Reason 5]",
    "[Reason 6]",
    "[Reason 7]",
    "[Reason 8]",
    "[Reason 9]",
    "[Reason 10]",
    "[Reason 11]",
  ],
  secondLetter: {
    title: "[Second Letter Title]",
    body: "[Second Letter Body]",
  },
  finalMessage: "[Final Message]",
};

export default function App() {
  const [scene, setScene] = useState<Scene>("intro");
  const [reasonIndex, setReasonIndex] = useState(0);

  // Every timed transition belongs to the active scene and is cancelled on change/unmount.
  useEffect(() => {
    let timer: number | undefined;

    if (scene === "letter-opening") {
      timer = window.setTimeout(() => setScene("letter-open"), 1050);
    } else if (scene === "letter-closing") {
      timer = window.setTimeout(() => {
        setReasonIndex(0);
        setScene("reasons");
      }, 850);
    } else if (scene === "gift-falling") {
      timer = window.setTimeout(() => setScene("gift-ready"), 1150);
    } else if (scene === "gift-opening") {
      timer = window.setTimeout(() => setScene("second-letter"), 950);
    } else if (scene === "second-letter-closing") {
      timer = window.setTimeout(() => setScene("ending"), 850);
    }

    return () => {
      if (timer !== undefined) window.clearTimeout(timer);
    };
  }, [scene]);

  const replay = () => {
    setReasonIndex(0);
    setScene("intro");
  };

  const openGift = () => {
    if (scene === "gift-ready") setScene("gift-opening");
  };

  const isFirstLetterScene = [
    "envelope",
    "letter-opening",
    "letter-open",
    "letter-closing",
  ].includes(scene);

  return (
    <main className="app-shell">
      <div className="ambient ambient-one" aria-hidden="true" />
      <div className="ambient ambient-two" aria-hidden="true" />
      <div className="grain" aria-hidden="true" />

      <header className="topline">
        <span className="brand-mark"><Heart size={13} fill="currentColor" /></span>
        <span>OBSIDIAN HEART</span>
        <span className="topline-rule" />
        <span className="topline-edition">A PRIVATE LITTLE UNIVERSE</span>
      </header>

      <div className="scene-stage">
        <div key={scene} className="scene-enter">
          {scene === "intro" && (
            <section className="intro" aria-labelledby="intro-heading">
              <div className="eyebrow"><Sparkles size={14} /> MADE OF LITTLE MOMENTS</div>
              <div className="intro-orbit" aria-hidden="true">
                <span className="orbit orbit-a" />
                <span className="orbit orbit-b" />
                <span className="orbit-core"><Heart size={30} strokeWidth={1.2} /></span>
                <span className="orbit-dot dot-a" />
                <span className="orbit-dot dot-b" />
              </div>
              <p className="overline">FOR {CONFIG.recipientName.toUpperCase()}</p>
              <h1 id="intro-heading">A story written<br /><em>one moment at a time.</em></h1>
              <p className="intro-copy">
                A small place to keep a few memories, a few reasons, and one very special milestone.
              </p>
              <button className="button button-primary" onClick={() => setScene("envelope")}>
                Begin the experience <ArrowRight size={17} />
              </button>
              <div className="intro-foot"><span /> CHAPTER 11 <span /></div>
            </section>
          )}

          {isFirstLetterScene && (
            <section className="letter-layout" aria-label="First letter and milestone">
              <div className="envelope-column">
                <div className="section-kicker">CHAPTER ONE <span>—</span> A NOTE FOR YOU</div>
                <div
                  className={`envelope-scene ${scene === "letter-opening" ? "is-opening" : ""} ${scene === "letter-closing" ? "is-closing" : ""} ${scene === "letter-open" ? "is-open" : ""}`}
                  aria-label="Decorative envelope and letter"
                >
                  <div className="envelope-shadow" />
                  <div className="envelope-back" />
                  <article className="paper">
                    <div className="paper-topline"><span>PRIVATE LETTER</span><Heart size={13} /></div>
                    <h2>{CONFIG.firstLetter.title}</h2>
                    <p>{CONFIG.firstLetter.body}</p>
                    <div className="paper-signoff">with all my heart <span>♡</span></div>
                  </article>
                  <div className="envelope-front" aria-hidden="true">
                    <div className="envelope-fold fold-left" />
                    <div className="envelope-fold fold-right" />
                    <div className="envelope-fold fold-bottom" />
                  </div>
                  <div className="envelope-flap" aria-hidden="true" />
                  <div className="wax-seal" aria-hidden="true"><Heart size={19} fill="currentColor" /></div>
                </div>

                {scene === "envelope" && (
                  <button className="button button-primary" onClick={() => setScene("letter-opening")}>
                    <Mail size={17} /> Open your letter
                  </button>
                )}
                {scene === "letter-opening" && <p className="micro-status" role="status">UNSEALING A LITTLE SOMETHING…</p>}
                {scene === "letter-open" && (
                  <button className="button button-primary" onClick={() => setScene("letter-closing")}>
                    Fold this letter away <ArrowRight size={17} />
                  </button>
                )}
                {scene === "letter-closing" && <p className="micro-status" role="status">KEEP THIS MOMENT CLOSE…</p>}
              </div>

              <aside className="milestone-panel">
                <div className="milestone-orbit" aria-hidden="true">
                  <span className="milestone-ring" />
                  <span className="milestone-center"><Heart size={19} /></span>
                </div>
                <p className="overline">A MILESTONE TO KEEP</p>
                <div className="milestone-number">{CONFIG.milestoneTitle}</div>
                <p className="milestone-subtitle">{CONFIG.milestoneSubtitle}</p>
                <div className="milestone-divider"><span /><Star size={11} /><span /></div>
                <p className="milestone-note">And still, so much left to discover.</p>
              </aside>
            </section>
          )}

          {scene === "reasons" && (
            <section className="reasons-section" aria-labelledby="reasons-heading">
              <div className="section-kicker">CHAPTER TWO <span>—</span> THE LITTLE THINGS</div>
              <div className="reasons-heading">
                <p className="overline">A LIST THAT COULD GO ON</p>
                <h2 id="reasons-heading">Eleven reasons.<br /><em>And then some.</em></h2>
                <p className="subtle-copy">One for each month, even though eleven could never be enough.</p>
              </div>
              <div className="reason-progress" aria-label={`Reason ${reasonIndex + 1} of ${CONFIG.reasons.length}`}>
                <span className="reason-progress-label">NO. {String(reasonIndex + 1).padStart(2, "0")}</span>
                <div className="progress-track"><span style={{ width: `${((reasonIndex + 1) / CONFIG.reasons.length) * 100}%` }} /></div>
                <span className="reason-progress-total">11</span>
              </div>
              <article className="reason-card" key={reasonIndex} aria-live="polite">
                <div className="reason-watermark" aria-hidden="true">{String(reasonIndex + 1).padStart(2, "0")}</div>
                <Heart size={22} className="reason-heart" />
                <p>{CONFIG.reasons[reasonIndex]}</p>
                <span className="reason-card-caption">ONE OF THE MANY THINGS I LOVE</span>
              </article>
              <div className="reason-actions">
                <button className="button button-quiet" onClick={() => setReasonIndex((n) => Math.max(0, n - 1))} disabled={reasonIndex === 0}>
                  <ChevronLeft size={16} /> Previous
                </button>
                {reasonIndex < CONFIG.reasons.length - 1 ? (
                  <button className="button button-primary" onClick={() => setReasonIndex((n) => Math.min(CONFIG.reasons.length - 1, n + 1))}>
                    Next reason <ChevronRight size={16} />
                  </button>
                ) : (
                  <button className="button button-primary" onClick={() => setScene("gift-falling")}>
                    There's one more thing <Gift size={16} />
                  </button>
                )}
              </div>
            </section>
          )}

          {(scene === "gift-falling" || scene === "gift-ready" || scene === "gift-opening") && (
            <section className="gift-section" aria-labelledby="gift-heading">
              <div className="section-kicker">CHAPTER THREE <span>—</span> SOMETHING FOR YOU</div>
              <p className="overline">WRAPPED WITH CARE</p>
              <h2 id="gift-heading">A little surprise.</h2>
              <p className="subtle-copy">Some things are better when you take your time opening them.</p>
              <div className={`gift-stage ${scene === "gift-falling" ? "gift-incoming" : ""} ${scene === "gift-opening" ? "gift-is-opening" : ""}`}>
                <div className="gift-spotlight" />
                <div className="gift-shadow" />
                <div className="gift-box" aria-label="Animated gift box">
                  <div className="gift-body">
                    <span className="gift-ribbon-vertical" />
                    <span className="gift-ribbon-horizontal" />
                    <span className="gift-front-glint" />
                  </div>
                  <div className="gift-lid">
                    <span className="lid-ribbon" />
                    <span className="gift-bow bow-left" />
                    <span className="gift-bow bow-right" />
                    <span className="gift-bow-center" />
                  </div>
                </div>
                <span className="gift-spark spark-one" aria-hidden="true">✦</span>
                <span className="gift-spark spark-two" aria-hidden="true">✧</span>
                <span className="gift-spark spark-three" aria-hidden="true">✦</span>
              </div>
              {scene === "gift-falling" && <p className="micro-status" role="status">A SURPRISE IS ARRIVING…</p>}
              {scene === "gift-ready" && (
                <button className="button button-primary" onClick={openGift}>
                  Open the gift <Gift size={17} />
                </button>
              )}
              {scene === "gift-opening" && <p className="micro-status" role="status">SOMETHING SPECIAL INSIDE…</p>}
            </section>
          )}

          {(scene === "second-letter" || scene === "second-letter-closing") && (
            <section className={`second-letter-section ${scene === "second-letter-closing" ? "closing-second-letter" : ""}`} aria-label="Second letter">
              <div className="section-kicker">CHAPTER FOUR <span>—</span> ONE MORE THING</div>
              <article className="second-letter-card">
                <div className="letter-card-top">
                  <span className="letter-card-icon"><Star size={18} /></span>
                  <span className="overline">A NOTE FOR THE ROAD AHEAD</span>
                </div>
                <div className="letter-rule" />
                <h2>{CONFIG.secondLetter.title}</h2>
                <p>{CONFIG.secondLetter.body}</p>
                <div className="letter-card-signoff">always, <span>♡</span></div>
                {scene === "second-letter" ? (
                  <button className="button button-primary" onClick={() => setScene("second-letter-closing")}>
                    Close the letter <ArrowRight size={17} />
                  </button>
                ) : (
                  <p className="micro-status" role="status">FOLDING THIS MOMENT AWAY…</p>
                )}
              </article>
            </section>
          )}

          {scene === "ending" && (
            <section className="ending-section" aria-labelledby="ending-heading">
              <div className="ending-symbol"><Heart size={29} fill="currentColor" /></div>
              <p className="overline">END OF THIS CHAPTER</p>
              <h2 id="ending-heading">Eleven months.<br /><em>A thousand little memories.</em></h2>
              <p className="ending-message">{CONFIG.finalMessage}</p>
              <div className="ending-rule"><span /><Sparkles size={14} /><span /></div>
              <button className="button button-primary" onClick={replay}>Experience it again <ArrowRight size={17} /></button>
            </section>
          )}
        </div>
      </div>

      <footer className="site-footer">
        <span>MADE WITH INTENTION</span><span className="footer-heart">♡</span><span>CHAPTER 11 / ∞</span>
      </footer>
    </main>
  );
}
