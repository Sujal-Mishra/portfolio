document.addEventListener("DOMContentLoaded", () => {

  /* =========================================
     EMOJI MAP (FOR MODAL TITLES)
  ========================================= */

  const emojiMap = {
    "SilentVoice": "🖐️",
    "GreenPrint": "🌱",
    "Hotel Management System": "🏨",
    "Carbon Footprint Tracker": "📊",
    "Quantum Computing & Cybersecurity": "🧠"
  };

  /* =========================================
     PROJECT MODAL LOGIC
  ========================================= */

  const modal = document.getElementById("projectModal");
  const modalTitle = document.getElementById("modalTitle");
  const modalDesc = document.getElementById("modalDesc");
  const modalImg = document.getElementById("modalImg");
  const modalList = document.getElementById("modalList");
  const closeBtn = document.querySelector(".close");

  window.openModal = function (title, desc, img, points) {
    // Title with emoji
    modalTitle.innerText = `${emojiMap[title] || ""} ${title}`;
    modalDesc.innerText = desc;

    // Load SVG (confirmed working)
    modalImg.innerHTML = "";
    const object = document.createElement("object");
    object.type = "image/svg+xml";
    object.data = img;
    object.style.width = "100%";
    object.style.minHeight = "260px";
    modalImg.appendChild(object);

    // Bullet points
    modalList.innerHTML = "";
    points.forEach(point => {
      const li = document.createElement("li");
      li.innerText = point;
      modalList.appendChild(li);
    });

    modal.style.display = "flex";
  };

  closeBtn.addEventListener("click", () => {
    modal.style.display = "none";
  });

  window.addEventListener("click", (e) => {
    if (e.target === modal) {
      modal.style.display = "none";
    }
  });

  /* =========================================
     INTERACTIVE BACKGROUND ORBS (SMOOTH)
  ========================================= */

  const orbs = document.querySelectorAll(".bg-orbs span");

  let mouseX = 0, mouseY = 0;
  let orbX = 0, orbY = 0;

  document.addEventListener("mousemove", (e) => {
    mouseX = e.clientX;
    mouseY = e.clientY;
  });

  function animateOrbs() {
    orbX += (mouseX - orbX) * 0.05;
    orbY += (mouseY - orbY) * 0.05;

    orbs.forEach((orb, index) => {
      const speed = (index + 1) * 0.015;
      const x = (window.innerWidth / 2 - orbX) * speed;
      const y = (window.innerHeight / 2 - orbY) * speed;
      orb.style.transform = `translate(${x}px, ${y}px)`;
    });

    requestAnimationFrame(animateOrbs);
  }

  animateOrbs();

  /* =========================================
     ORB COLOR CHANGE BASED ON SCROLL
  ========================================= */

  const sections = document.querySelectorAll("[data-orb]");

  function hexToRgb(hex) {
    const bigint = parseInt(hex.replace("#", ""), 16);
    return {
      r: (bigint >> 16) & 255,
      g: (bigint >> 8) & 255,
      b: bigint & 255
    };
  }

  function updateOrbColor() {
    let activeColor = "#7f5af0";
    const mid = window.innerHeight * 0.5;

    sections.forEach(section => {
      const rect = section.getBoundingClientRect();
      if (rect.top <= mid && rect.bottom >= mid) {
        activeColor = section.dataset.orb;
      }
    });

    const { r, g, b } = hexToRgb(activeColor);

    orbs.forEach(orb => {
      orb.style.setProperty(
        "--orb-color",
        `rgba(${r}, ${g}, ${b}, 0.25)`
      );
    });
  }

  window.addEventListener("scroll", updateOrbColor);
  updateOrbColor();

});
