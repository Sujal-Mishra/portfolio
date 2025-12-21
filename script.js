/* ===============================
   MODAL LOGIC (PROJECT POPUPS)
================================ */

const modal = document.getElementById("projectModal");
const modalTitle = document.getElementById("modalTitle");
const modalDesc = document.getElementById("modalDesc");
const modalImg = document.getElementById("modalImg");
const modalList = document.getElementById("modalList");
const closeBtn = document.querySelector(".close");

function openModal(title, desc, img, points) {
  modalTitle.innerText = title;
  modalDesc.innerText = desc;

  // For SVGs embedded via <object>
  modalImg.setAttribute("data", img);

  modalList.innerHTML = "";
  points.forEach(point => {
    const li = document.createElement("li");
    li.innerText = point;
    modalList.appendChild(li);
  });

  modal.style.display = "flex";
}

closeBtn.onclick = () => {
  modal.style.display = "none";
};

window.onclick = e => {
  if (e.target === modal) {
    modal.style.display = "none";
  }
};

/* ===============================
   INTERACTIVE BACKGROUND (ORBS)
================================ */

document.addEventListener("mousemove", (e) => {
  const orbs = document.querySelectorAll(".bg-orbs span");

  orbs.forEach((orb, index) => {
    const speed = (index + 1) * 0.015;
    const x = (window.innerWidth / 2 - e.clientX) * speed;
    const y = (window.innerHeight / 2 - e.clientY) * speed;

    orb.style.transform = `translate(${x}px, ${y}px)`;
  });
});

