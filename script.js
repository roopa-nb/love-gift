/* ========= PAGE FADE NAVIGATION ========= */
document.addEventListener("DOMContentLoaded", () => {
  document.body.classList.add("fade-in");

  document.querySelectorAll("a[href]").forEach(link => {
    link.addEventListener("click", e => {
      const href = link.getAttribute("href");
      if (!href || href.startsWith("#") || href.startsWith("javascript")) return;
      e.preventDefault();
      document.body.classList.add("fade-out");
      setTimeout(() => window.location = href, 450);
    });
  });
});


/* ========= CINEMATIC STAR FIELD ========= */
for (let i = 0; i < 100; i++) {
  const s = document.createElement("div");
  s.style.position = "fixed";
  s.style.width = "2px";
  s.style.height = "2px";
  s.style.background = "white";
  s.style.borderRadius = "50%";
  s.style.left = Math.random() * 100 + "vw";
  s.style.top = Math.random() * 100 + "vh";
  s.style.opacity = Math.random();
  s.style.boxShadow = "0 0 6px white";
  s.style.animation = "twinkle 3s infinite alternate";
  document.body.appendChild(s);
}


/* ========= FLOATING HEARTS ========= */
function heart() {
  const h = document.createElement("div");
  h.innerHTML = "💖";
  h.style.position = "fixed";
  h.style.left = Math.random() * 100 + "vw";
  h.style.bottom = "-20px";
  h.style.fontSize = (12 + Math.random() * 16) + "px";
  h.style.opacity = 0.8;
  h.style.pointerEvents = "none";
  h.style.transition = "7s linear";
  document.body.appendChild(h);

  setTimeout(() => {
    h.style.transform = "translateY(-120vh) scale(0.6)";
    h.style.opacity = 0;
  }, 50);

  setTimeout(() => h.remove(), 7000);
}
setInterval(heart, 900);


/* ========= FALLING ROSE PETALS ========= */
function rose() {
  const r = document.createElement("div");
  r.innerHTML = "🌹";
  r.style.position = "fixed";
  r.style.top = "-20px";
  r.style.left = Math.random() * 100 + "vw";
  r.style.fontSize = "18px";
  r.style.opacity = 0.8;
  r.style.pointerEvents = "none";
  r.style.transition = "9s linear";
  document.body.appendChild(r);

  setTimeout(() => {
    r.style.transform = "translateY(110vh) rotate(360deg)";
    r.style.opacity = 0;
  }, 50);

  setTimeout(() => r.remove(), 9000);
}
setInterval(rose, 1400);


/* ========= HEART EXPLOSION ========= */
function explode() {
  for (let i = 0; i < 40; i++) {
    const h = document.createElement("div");
    h.innerHTML = "💖";
    h.style.position = "fixed";
    h.style.left = "50%";
    h.style.top = "50%";
    h.style.fontSize = "22px";
    h.style.pointerEvents = "none";
    h.style.transition = "1.2s ease";
    document.body.appendChild(h);

    const x = (Math.random() - 0.5) * 700;
    const y = (Math.random() - 0.5) * 700;

    setTimeout(() => {
      h.style.transform = `translate(${x}px,${y}px) scale(0.4)`;
      h.style.opacity = 0;
    }, 50);

    setTimeout(() => h.remove(), 1200);
  }
}


/* ========= RING DROP ========= */
function dropRing() {
  const ring = document.createElement("div");
  ring.innerHTML = "💍";
  ring.style.position = "fixed";
  ring.style.left = "50%";
  ring.style.top = "-40px";
  ring.style.fontSize = "38px";
  ring.style.transform = "translateX(-50%)";
  ring.style.transition = "1s cubic-bezier(.2,.7,.2,1)";
  document.body.appendChild(ring);

  setTimeout(() => { ring.style.top = "48%"; }, 50);
  setTimeout(() => { ring.remove(); explode(); }, 1200);
}


/* ========= FINAL MOVIE ========= */
function finalMovie() {
  dropRing();

  /* Start slow cinematic fade AFTER ring moment */
  setTimeout(() => {
    fadeMusicOut(5000);
  }, 1400);

  setTimeout(() => {
    const scene = document.getElementById("finalScene");
    if (scene) scene.classList.add("show");
  }, 1600);
}


/* =========================================================
   🎵 GLOBAL MUSIC CONTROLLER
========================================================= */

let audioEl = null;

window.addEventListener("DOMContentLoaded", () => {

  audioEl = document.querySelector("#music");
  if (!audioEl) return;

  if (sessionStorage.getItem("musicStarted") === "true") {
    const savedTime = sessionStorage.getItem("musicTime");
    if (savedTime) audioEl.currentTime = parseFloat(savedTime);
    audioEl.volume = 0.6;
    audioEl.play().catch(()=>{});
    return;
  }

  function startMusicOnce() {
    if (sessionStorage.getItem("musicStarted") === "true") return;

    audioEl.volume = 0;

    audioEl.play().then(() => {
      sessionStorage.setItem("musicStarted","true");

      let v = 0;
      const fade = setInterval(() => {
        v = Math.min(0.6, v + 0.02);
        audioEl.volume = v;
        if (v >= 0.6) clearInterval(fade);
      }, 200);

    }).catch(()=>{});
  }

  document.addEventListener("click", startMusicOnce, { once:true });
  document.addEventListener("touchstart", startMusicOnce, { once:true });
});


/* Save music time in same tab */
setInterval(() => {
  if (audioEl && !audioEl.paused && sessionStorage.getItem("musicStarted") === "true") {
    sessionStorage.setItem("musicTime", audioEl.currentTime);
  }
}, 500);


/* ========= CINEMATIC MUSIC FADE OUT ========= */
function fadeMusicOut(duration = 4000) {
  if (!audioEl) return;

  const startVolume = audioEl.volume;
  const startTime = Date.now();

  const fade = setInterval(() => {
    const elapsed = Date.now() - startTime;
    const progress = Math.min(elapsed / duration, 1);

    audioEl.volume = startVolume * (1 - progress);

    if (progress >= 1) {
      clearInterval(fade);
      audioEl.pause();
      audioEl.currentTime = 0;
      sessionStorage.removeItem("musicStarted");
      sessionStorage.removeItem("musicTime");
    }
  }, 50);
}
