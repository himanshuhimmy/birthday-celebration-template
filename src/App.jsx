import { gsap } from "gsap";
import { ScrollToPlugin } from "gsap/ScrollToPlugin";
import { useRef, useState } from "react";
import "./App.css";
import CelebrationPage from "./components/CelebrationPage";
import Countdown from "./components/Countdown";
import Effects from "./components/Effects";
import Gallery from "./components/Gallery";
import Hearts from "./components/Hearts";
import MessageCard from "./components/MessageCard";
import MusicPlayer from "./components/MusicPlayer";

gsap.registerPlugin(ScrollToPlugin);

function App() {
  const [currentPage, setCurrentPage] = useState(1); // Start at 1 for Countdown page

  // ⚠️ FOR TESTING: Comment out lines 18-21 to reset on every reload
  // Check localStorage to persist birthday reached state
  // const [birthdayReached, setBirthdayReached] = useState(() => {
  //   const saved = localStorage.getItem("birthdayReached");
  //   return saved === "true";
  // });

  // ✅ FOR TESTING: Uncomment this line to always show countdown on reload
  const [birthdayReached, setBirthdayReached] = useState(false);

  const [showEffects, setShowEffects] = useState(false);

  const page1Ref = useRef(null); // Countdown page
  const page2Ref = useRef(null); // Celebration Page
  const page3Ref = useRef(null); // MessageCard
  const page4Ref = useRef(null); // Gallery
  const musicPlayerRef = useRef(null); // Music player control

  const goToPage = (pageNumber) => {
    const refs = { 1: page1Ref, 2: page2Ref, 3: page3Ref, 4: page4Ref };
    const currentPageRef = refs[currentPage];
    const nextPageRef = refs[pageNumber];

    const isForward = pageNumber > currentPage;

    // Animate out current page
    gsap.to(currentPageRef.current, {
      x: isForward ? "-100%" : "100%",
      opacity: 0,
      duration: 0.6,
      ease: "power2.inOut",
    });

    // Prepare next page
    gsap.set(nextPageRef.current, {
      x: isForward ? "100%" : "-100%",
      opacity: 0,
      visibility: "visible",
    });

    // Animate in next page
    gsap.to(nextPageRef.current, {
      x: "0%",
      opacity: 1,
      duration: 0.6,
      ease: "power2.inOut",
      delay: 0.2,
      onComplete: () => {
        setCurrentPage(pageNumber);
        // Reset current page position
        gsap.set(currentPageRef.current, { x: "0%", visibility: "hidden" });

        // Smooth scroll to top
        gsap.to(window, { duration: 0.3, scrollTo: { y: 0 } });
      },
    });
  };

  const handleBirthdayReached = () => {
    setBirthdayReached(true);
    localStorage.setItem("birthdayReached", "true"); // Persist to localStorage
    setShowEffects(true);
    // Stop effects after some time
    setTimeout(() => setShowEffects(false), 10000);
  };

  return (
    <div className="app">
      <MusicPlayer ref={musicPlayerRef} />
      <Hearts />

      {/* PAGE 1: Countdown Timer */}
      <div
        ref={page1Ref}
        className={`page ${currentPage === 1 ? "active" : ""}`}
        style={{ visibility: currentPage === 1 ? "visible" : "hidden" }}
      >
        <section className="hero">
          <h1 id="heroTitle">
            {birthdayReached ? (
              <>
                Happy Birthday <span className="highlight">Small Fists ♥️</span>{" "}
                🎂
              </>
            ) : (
              <>
                Counting down to{" "}
                <span className="highlight">Small Fists's</span> special day 🎂
              </>
            )}
          </h1>
          <p>
            {birthdayReached ? (
              <p>Wishing the happiest birthday to my 4-feet-tall PRINCESS 💗</p>
            ) : (
              <>
                <p>Countdown to the day we celebrate YOU!</p>
                <p>Before we start, Record your reaction for me 😌</p>
              </>
            )}
          </p>
        </section>

        <Countdown
          onBirthdayReached={handleBirthdayReached}
          birthdayReached={birthdayReached}
        />

        <section className="teaser">
          <h2 id="teaserHeading">
            {birthdayReached
              ? "💖 Ready for your surprise! 💖"
              : "✨ A special celebration awaits you at midnight... ✨"}
          </h2>
          <p className="teaser-hint">Something magical is about to unfold 💫</p>
        </section>

        <button
          id="surpriseBtn"
          className="celebrate-btn"
          disabled={!birthdayReached}
          onClick={() => goToPage(2)}
        >
          🎀 Let's Celebrate
        </button>
      </div>

      {/* PAGE 2: Celebration/QNA Page */}
      <div
        ref={page2Ref}
        className={`page ${currentPage === 2 ? "active" : ""}`}
        style={{ visibility: currentPage === 2 ? "visible" : "hidden" }}
      >
        <CelebrationPage
          onComplete={() => goToPage(3)}
          musicPlayerRef={musicPlayerRef}
        />
      </div>

      {/* PAGE 3: Message Card */}
      <div
        ref={page3Ref}
        className={`page ${currentPage === 3 ? "active" : ""}`}
        style={{ visibility: currentPage === 3 ? "visible" : "hidden" }}
      >
        <button className="back-btn" onClick={() => goToPage(2)}>
          ← Back
        </button>
        <MessageCard isActive={currentPage === 3} />
        <button className="page-nav-btn" onClick={() => goToPage(4)}>
          📸 View Our Memories
        </button>
      </div>

      {/* PAGE 4: Gallery */}
      <div
        ref={page4Ref}
        className={`page ${currentPage === 4 ? "active" : ""}`}
        style={{ visibility: currentPage === 4 ? "visible" : "hidden" }}
      >
        <button className="back-btn" onClick={() => goToPage(3)}>
          ← Back
        </button>
        <Gallery isActive={currentPage === 4} />
        <section className="final">
          <h2 className="final-message">💖 Best Wishes...... 💖</h2>
          <p className="final-subtitle">
            {/* <p>You are 10/10 because you show up when it matters</p>
            <p>You are 20/10 because you care deeply</p>
            <p>You are 30/10 because you make people feel seen</p>
            <p>You are 40/10 because you are a good listener</p>
            <p>You are 50/10 because you are patient and emotionally mature</p>
            <p>
              You are 60/10 because you carry your responsibilities with
              elegance
            </p>
            <p>
              You are 70/10 because you make the world a better place just by
              being you
            </p>
            <p>You are 80/10 because you stay true to yourself</p>
            <p>You are 90/10 because you choose growth over comfort</p> */}
            {/* <p>You are ♾️/10 because you make people feel they are 100/10</p> */}
            So i wish you to have the happiest day of your life the day you
            deserve as the PRINCESS you are haha May all your wishes come true
            you may your expectations and goals are achieved and met much faster
            may your hard work is Rewarded 10000000x more than you have worked
            for hehe
            <p>
              I won't say this again so better listen to this carefully baakkkkk
              ahh you do matter to me i don't know how to show it to you but
              your existence does make a difference in my life so this day is
              muchh more SPECIAL and IMPORTANT to me then it is to YOU hehhe
            </p>
            <p>
              I'll absolutely deny it if you mentioned this to anyone i never
              said this 😂 anyways happy Birthday my 4 feet 🐾 ki princess enjoy
              your day ♥️ ✨
            </p>
          </p>
        </section>
      </div>

      {/* Effects */}
      {showEffects && <Effects />}
    </div>
  );
}

export default App;
