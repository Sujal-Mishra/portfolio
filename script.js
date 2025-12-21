document.addEventListener("DOMContentLoaded", () => {

  /* ===============================
     EMOJI MAP
  =============================== */

  const emojiMap = {
    "SilentVoice": "🖐️",
    "GreenPrint": "🌱",
    "Hotel Management System": "🏨",
    "Carbon Footprint Tracker": "📊",
    "Quantum Computing & Cybersecurity": "🧠"
  };
/* =========================================
   SCROLL-BASED STORYTELLING
========================================= */

const storySections = document.querySelectorAll(".section");

function updateStoryFocus() {
  const mid = window.innerHeight * 0.55;

  storySections.forEach(section => {
    const story = section.querySelector("[data-story]");
    if (!story) return;

    const rect = section.getBoundingClientRect();
    const active = rect.top <= mid && rect.bottom >= mid;

    story.style.opacity = active ? "1" : "0.4";
    story.style.transform = active ? "translateY(0)" : "translateY(6px)";
  });
}

window.addEventListener("scroll", updateStoryFocus);
updateStoryFocus();

  /* ===============================
     PROJECT MODAL
  =============================== */

  const modal = document.getElementById("projectModal");
  const modalTitle = document.getElementById("modalTitle");
  const modalDesc = document.getElementById("modalDesc");
  const modalImg = document.getElementById("modalImg");
  const modalList = document.getElementById("modalList");
  const closeBtn = document.querySelector(".close");

  window.openModal = function (title, desc, img, points) {
    modalTitle.innerText = `${emojiMap[title] || ""} ${title}`;
    modalDesc.innerText = desc;

    modalImg.innerHTML = "";
    const object = document.createElement("object");
    object.type = "image/svg+xml";
    object.data = img;
    object.style.width = "100%";
    object.style.minHeight = "260px";
    modalImg.appendChild(object);

    modalList.innerHTML = "";
    points.forEach(p => {
      const li = document.createElement("li");
      li.innerText = p;
      modalList.appendChild(li);
    });

    modal.style.display = "flex";
  };

  closeBtn.addEventListener("click", () => {
    modal.style.display = "none";
  });

  window.addEventListener("click", (e) => {
    if (e.target === modal) modal.style.display = "none";
  });

  /* ===============================
     BACKGROUND ORBS (MOUSE)
  =============================== */

  const orbs = document.querySelectorAll(".bg-orbs span");
  let mouseX = 0, mouseY = 0;
  let orbX = 0, orbY = 0;

  document.addEventListener("mousemove", (e) => {
    mouseX = e.clientX;
    mouseY = e.clientY;
  });

  function animateOrbs() {
    orbX += (mouseX - orbX) * 0.04;
    orbY += (mouseY - orbY) * 0.04;

    orbs.forEach((orb, i) => {
      const speed = (i + 1) * 0.012;
      orb.style.transform = `translate(
        ${(window.innerWidth / 2 - orbX) * speed}px,
        ${(window.innerHeight / 2 - orbY) * speed}px
      )`;
    });

    requestAnimationFrame(animateOrbs);
  }
  animateOrbs();

  /* ===============================
   HERO BG WORD FADE ON SCROLL
================================ */

const heroWord = document.querySelector(".hero-bg-word");

if (heroWord) {
  window.addEventListener("scroll", () => {
    const scrollY = window.scrollY;
    const heroHeight = document.querySelector(".hero").offsetHeight;

    // progress from 0 → 1
    const progress = Math.min(scrollY / heroHeight, 1);

    // fade out
    heroWord.style.opacity = `${1 - progress * 3}`;

    // subtle upward drift (editorial feel)
    heroWord.style.transform = `
      translate(-50%, calc(-50% - ${progress * 40}px))
    `;
  });
}


  /* ===============================
     ORB COLOR ON SCROLL
  =============================== */

  const sections = document.querySelectorAll("[data-orb]");

  function hexToRgb(hex) {
    const v = parseInt(hex.replace("#", ""), 16);
    return {
      r: (v >> 16) & 255,
      g: (v >> 8) & 255,
      b: v & 255
    };
  }

  function updateOrbColor() {
    let color = "#7f5af0";
    const mid = window.innerHeight * 0.5;

    sections.forEach(sec => {
      const r = sec.getBoundingClientRect();
      if (r.top <= mid && r.bottom >= mid) {
        color = sec.dataset.orb;
      }
    });

    const { r, g, b } = hexToRgb(color);
    orbs.forEach(orb =>
      orb.style.setProperty("--orb-color", `rgba(${r},${g},${b},0.25)`)
    );
  }

  window.addEventListener("scroll", updateOrbColor);
  updateOrbColor();

  /* =========================================
   OTHER INTERESTS INTERACTION
========================================= */

const interestButtons = document.querySelectorAll(".interests-list button");
const interestDisplay = document.getElementById("interestDisplay");

interestButtons.forEach(btn => {
  btn.addEventListener("click", () => {
    const icon = btn.getAttribute("data-icon");
    const text = btn.getAttribute("data-text");

    interestDisplay.innerHTML = `
      <span class="interest-icon">${icon}</span>
      <p class="interest-text">${text}</p>
    `;

    interestDisplay.classList.add("active");

    interestButtons.forEach(b => b.classList.remove("active"));
    btn.classList.add("active");
  });
});



});

