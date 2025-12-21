document.addEventListener("DOMContentLoaded", () => {

  /* ================================================
     PROJECT MODAL LOGIC
  ================================================ */

  const modal = document.getElementById("projectModal");
  const modalTitle = document.getElementById("modalTitle");
  const modalDesc = document.getElementById("modalDesc");
  const modalImg = document.getElementById("modalImg");
  const modalList = document.getElementById("modalList");
  const closeBtn = document.querySelector(".close");

  window.openModal = function(title, desc, img, points) {
    modalTitle.innerText = title;
    modalDesc.innerText = desc;
    fetch(img)
  .then(res => res.text())
  .then(svg => {
    modalImg.innerHTML = svg;
  })
  .catch(() => {
    modalImg.innerHTML = "<p>Diagram failed to load</p>";
  });


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
    if (e.target === modal) modal.style.display = "none";
  });

  /* ================================================
     INTERACTIVE BACKGROUND (MOUSE MOVE)
  ================================================ */

  const orbs = document.querySelectorAll(".bg-orbs span");

  document.addEventListener("mousemove", (e) => {
    orbs.forEach((orb, index) => {
      const speed = (index + 1) * 0.02;
      const x = (window.innerWidth / 2 - e.clientX) * speed;
      const y = (window.innerHeight / 2 - e.clientY) * speed;
      orb.style.transform = `translate(${x}px, ${y}px)`;
    });
  });

  /* ================================================
     ORB COLOR CHANGE ON SCROLL
  ================================================ */

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



