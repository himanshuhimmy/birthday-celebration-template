import { useEffect, useState } from "react";
import "./Countdown.css";

function Countdown({ onBirthdayReached, birthdayReached }) {
  const [time, setTime] = useState({ hours: 0, minutes: 0, seconds: 0 });
  const [prevTime, setPrevTime] = useState({
    hours: null,
    minutes: null,
    seconds: null,
  });

  useEffect(() => {
    // If birthday already reached, don't start the countdown
    if (birthdayReached) {
      return;
    }

    // ═══════════════════════════════════════════════════════════════
    // 🎂 SET YOUR BIRTHDAY DATE & TIME HERE 🎂
    // ═══════════════════════════════════════════════════════════════

    // Create target date in local timezone to avoid timezone issues
    // Format: Year, Month (0-indexed), Day, Hours, Minutes, Seconds
    const targetDate = new Date(2025, 11, 27, 16, 25, 0); // December 27, 2025 at 4:25 PM

    // Alternative format if you prefer ISO string (uncomment to use):
    // const targetDate = new Date("2025-12-27T16:25:00");

    // 📝 HOW TO USE:
    // Replace the date above with your actual birthday
    //
    // For new Date(year, month, day, hours, minutes, seconds):
    // - Month is 0-indexed (0 = January, 11 = December)
    // - Example: December 27, 2025 at 4:25 PM = new Date(2025, 11, 27, 16, 25, 0)
    // - Example: January 15, 2026 at midnight = new Date(2026, 0, 15, 0, 0, 0)
    //
    // For ISO string format (use new Date("YYYY-MM-DDTHH:MM:SS")):
    // - Example: '2026-01-15T00:00:00' (midnight)
    // - Example: '2025-06-10T15:30:00' (3:30 PM)
    // ⏰ Time format is 24-hour (00:00 = midnight, 12:00 = noon, 23:59 = 11:59 PM)
    // ═══════════════════════════════════════════════════════════════

    const updateCountdown = () => {
      const now = new Date();
      const diff = targetDate.getTime() - now.getTime();

      if (diff <= 0) {
        setTime({ hours: 0, minutes: 0, seconds: 0 });
        if (!birthdayReached) {
          onBirthdayReached();
        }
        return;
      }

      const hours = Math.floor(diff / (1000 * 60 * 60));
      const minutes = Math.floor((diff / (1000 * 60)) % 60);
      const seconds = Math.floor((diff / 1000) % 60);

      setTime({ hours, minutes, seconds });
    };

    // Initial update
    updateCountdown();

    // Set up interval
    const interval = setInterval(updateCountdown, 1000);

    return () => clearInterval(interval);
  }, [onBirthdayReached, birthdayReached]);

  useEffect(() => {
    setPrevTime(time);
  }, [time]);

  const Digit = ({ value, label, prevValue }) => {
    const shouldFlip = prevValue !== null && prevValue !== value;

    return (
      <div className="digit">
        <div className={`card ${shouldFlip ? "flip" : ""}`}>
          <div className="text">{String(value).padStart(2, "0")}</div>
        </div>
        <div className="label">{label}</div>
      </div>
    );
  };

  if (birthdayReached) {
    return (
      <section className="countdown">
        <div className="flip-timer">
          <span className="birthday-celebration">
            🎉 It's Your Birthday! 🎉
          </span>
        </div>
      </section>
    );
  }

  return (
    <section className="countdown">
      <div className="flip-timer">
        <Digit value={time.hours} label="Hours" prevValue={prevTime.hours} />
        <Digit
          value={time.minutes}
          label="Minutes"
          prevValue={prevTime.minutes}
        />
        <Digit
          value={time.seconds}
          label="Seconds"
          prevValue={prevTime.seconds}
        />
      </div>

      {/* ⚠️ TEST BUTTON - delete it from here⚠️ */}
      <button
        className="test-button"
        onClick={onBirthdayReached}
        title="Skip countdown and see celebration"
      >
        🎉 Test Celebration
      </button>
      {/* ⚠️ END TEST BUTTON - DELETE UP TO HERE ⚠️ */}
    </section>
  );
}

export default Countdown;
