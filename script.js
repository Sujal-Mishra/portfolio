/* =================================================
   PROJECT MODAL LOGIC (SVG-SAFE)
================================================= */

const modal = document.getElementById("projectModal");
const modalTitle = document.getElementById("modalTitle");
const modalDesc = document.getElementById("modalDesc");
const modalImg = document.getElementById("modalImg");
const modalList = document.getElementById("modalList");
const closeBtn = document.querySelector(".close");

function openModal(title, desc, img, points) {
  modalTitle.innerText = title;
  modalDesc.innerText = desc;

  // SVG-safe loading via <object>
  modalImg.setAttribute("data", img);

  modalList.innerHTML = "";
  points.forEach(point => {
    const li = document.createElement("li");
    li.innerText = point;
    modalList.appendChild(li);
  });

  modal.style.display = "flex";
}

closeBtn.addEventListener("click", () => {
  modal.style.display = "none";
});

window.addEventListener("click", (e) => {
  if (e.target === modal) {
    modal.style.display = "none";
  }
});

/* =================================================
   INTERACTIVE BACKGROUND – MOUSE REACTION
================================================= */

document.addEventListener("mousemove", (e) => {
  const orbs = document.querySelectorAll(".bg-orbs span");

  orbs.forEach((orb, index) => {
    const speed = (index + 1) * 0.015;
    const x = (window.innerWidth / 2 - e.clientX) * speed;
    const y = (window.innerHeight / 2 - e.clientY) * speed;

    orb.style.transform = `translate(${x}px, ${y}px)`;
  });
});

/* =================================================
   ORB COLOR CHANGE BASED ON SCROLL SECTION
================================================= */

const sections = document.querySelectorAll("[data-orb]");
const orbs = document.querySelectorAll(".bg-orbs span");

function hexToRgb(hex) {
  const bigint = parseInt(hex.replace("#", ""), 16);
  const r = (bigint >> 16) & 255;
  const g = (bigint >> 8) & 255;
  const b = bigint & 255;
  return `${r}, ${g}, ${b}`;
}

function updateOrbColor() {
  let activeColor = "#7f5af0";

  sections.forEach(section => {
    const rect = section.getBoundingClientRect();
    const midPoint = window.innerHeight * 0.5;

    if (rect.top <= midPoint && rect.bottom >= midPoint) {
      activeColor = section.getAttribute("data-orb");
    }
  });

  orbs.forEach(orb => {
    orb.style.setProperty(
      "--orb-color",
      `rgba(${hexToRgb(activeColor)}, 0.25)`
    );
  });
}

window.addEventListener("scroll", updateOrbColor);
updateOrbColor();


