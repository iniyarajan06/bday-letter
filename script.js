// Birthday letter content that will be rendered with a typing effect
const birthdayLetter = `Happy Birthday Priya 💛

We have been friends since first year, and still I clearly remember the first day you asked me,
"You’re Iniya right?"

I don’t know why, but that small moment means a lot to me even now.
If that conversation didn’t happen, maybe my whole college life would have been different.
Even if I look back at my college memories after many years,
the first name that will come to my mind is always you.

Thank you for all the laughter, fun, random talks, and all the small moments we shared.
The way you motivate me, encourage me, and stand with me always has a special place in my heart.

I know I am not very good at friendship.
I don’t call often, I don’t text much, sometimes I disappear,
and my mood swings are too much to handle.
But still you tolerate me, understand me, and stay the same.
Honestly, I feel lucky to have you in my life.

Even in the future, when I grow up, get busy,
or tell to my child,
I will always say —
Priya is my favorite friend.

You are the person I always admire.
The way you stay strong alone,
the way you face problems,
the way you stay positive in every situation,
really inspires me a lot.

I wish you a life as beautiful as your heart.

Happy Birthday once again Priya 🤍

Always your friend,
Iniya`;

const openBtn = document.getElementById("openLetterBtn");
const overlay = document.getElementById("introOverlay");
const card = document.getElementById("birthdayCard");
const typedLetter = document.getElementById("typedLetter");
const birthdayMusic = document.getElementById("birthdayMusic");

let typingStarted = false;

// Start all reveal effects once the user clicks the intro button
openBtn.addEventListener("click", async () => {
  overlay.classList.add("hidden");
  card.classList.add("open");

  // Fire celebratory confetti burst and short rain effect
  celebrateWithConfetti();

  // Start typing once the card opens
  if (!typingStarted) {
    typingStarted = true;
    typeLetter(birthdayLetter, typedLetter, 26);
  }

  // Try to play music after user interaction (browser autoplay-safe)
  // Do not await this promise so typing never gets blocked.
  birthdayMusic.play().catch((error) => {
    // If audio cannot be played, fail silently and keep surprise running
    console.warn("Music autoplay failed:", error);
  });
});

// Typing animation utility
function typeLetter(text, targetElement, speed = 26) {
  let index = 0;
  targetElement.textContent = "";

  // Use variable timing to create a soft, human-like typing rhythm
  const typeNext = () => {
    targetElement.textContent += text.charAt(index);

    const currentChar = text.charAt(index);
    index += 1;

    if (index >= text.length) {
      targetElement.classList.add("done");
      return;
    }

    let delay = speed;

    if (currentChar === "\n") {
      delay = 220;
    } else if (",.?!—".includes(currentChar)) {
      delay = 140;
    } else if (currentChar === " ") {
      delay = 20;
    }

    setTimeout(typeNext, delay);
  };

  setTimeout(typeNext, speed);
}

// Confetti animation powered by canvas-confetti CDN library
function celebrateWithConfetti() {
  // If CDN is blocked/offline, skip confetti without breaking the rest of the surprise
  if (typeof confetti !== "function") {
    return;
  }

  const duration = 5000;
  const animationEnd = Date.now() + duration;

  // Initial symmetric blast
  confetti({
    particleCount: 120,
    spread: 90,
    origin: { y: 0.55 },
    colors: ["#ffd166", "#ff4da6", "#f8f9fa", "#7b4dff"]
  });

  // Soft continuous confetti drizzle for a few seconds
  const interval = setInterval(() => {
    const timeLeft = animationEnd - Date.now();

    if (timeLeft <= 0) {
      clearInterval(interval);
      return;
    }

    confetti({
      particleCount: 18,
      angle: 60,
      spread: 70,
      origin: { x: 0, y: 0.65 },
      colors: ["#ffd166", "#ff8dc7", "#ffffff", "#b28dff"]
    });

    confetti({
      particleCount: 18,
      angle: 120,
      spread: 70,
      origin: { x: 1, y: 0.65 },
      colors: ["#ffd166", "#ff8dc7", "#ffffff", "#b28dff"]
    });
  }, 250);
}
