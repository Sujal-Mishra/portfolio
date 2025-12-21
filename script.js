document.addEventListener("DOMContentLoaded", () => {

  /* =====================================================
     EMOJI MAP (PROJECT IDENTITY)
  ===================================================== */

  const emojiMap = {
    "SilentVoice": "🖐️",
    "GreenPrint": "🌱",
    "Hotel Management System": "🏨",
    "Carbon Footprint Tracker": "📊",
    "Quantum Computing & Cybersecurity": "🧠"
  };

  /* =====================================================
     PROJECT MODAL
  ===================================================== */

  const modal = document.getElementById("projectModal");
  const modalTitle = document.getElementById("modalTitle");
  const modalDesc = document.getElementById("modalDesc");
  const modalImg = document.getElementById("modalImg");
  const modalList = document.getElementById("modalList");
  const closeBtn = document.querySelector(".close");

  window.openModal = function (title, desc, img, points) {
    modalTitle.innerText = `${emojiMap[title] || ""} ${title}`;
    modalDesc.innerText = desc;

    // SVG architecture
    modalImg.innerHTML = "";
    const object = document.createElement("object");
    object.type = "image/svg+xml";
    object.data = img;
    object.style.width = "100%";
    object.style.minHeight = "260px";
    modalImg.appendChild(object);

    // Tech list
    modalList.innerHTML = "";
    points.forEach(p => {
      const li = document.createElement("li");
      li.innerText = p;
      modalList.appendChild(li);
    });

    modal.style.display = "flex";
  };

  closeBtn?.addEventListener("click", () => {
    modal.style.display = "none";
  });

  window.addEventListener("click", (e) => {
    if (e.target === modal) modal.style.display = "none";
  });

  /* =====================================================
     BACKGROUND ORBS (MOUSE + SCROLL)
  ===================================================== */

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

  /* =====================================================
     ORB COLOR BY SECTION
  ===================================================== */

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

  /* =====================================================
     THREE.JS — 3D SYSTEM CORE (HERO)
  ===================================================== */

  const canvas = document.getElementById("system3d");
  if (canvas && window.THREE) {

    const scene = new THREE.Scene();

    const camera = new THREE.PerspectiveCamera(
      45,
      canvas.clientWidth / canvas.clientHeight,
      0.1,
      100
    );
    camera.position.z = 6;

    const renderer = new THREE.WebGLRenderer({
      canvas,
      alpha: true,
      antialias: true
    });

    renderer.setSize(canvas.clientWidth, canvas.clientHeight);
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));

    // Geometry: abstract system core
    const geometry = new THREE.IcosahedronGeometry(1.8, 1);

    const material = new THREE.MeshPhysicalMaterial({
      color: 0x7f5af0,
      roughness: 0.15,
      metalness: 0.6,
      transmission: 0.6,
      thickness: 1.2,
      clearcoat: 0.5,
      clearcoatRoughness: 0.1
    });

    const core = new THREE.Mesh(geometry, material);
    scene.add(core);

    // Lights
    scene.add(new THREE.AmbientLight(0xffffff, 0.6));
    const light = new THREE.DirectionalLight(0xffffff, 1.2);
    light.position.set(5, 5, 5);
    scene.add(light);

    // Mouse + scroll interaction
    let mX = 0, mY = 0, sY = 0;

    document.addEventListener("mousemove", e => {
      mX = (e.clientX / window.innerWidth - 0.5) * 2;
      mY = (e.clientY / window.innerHeight - 0.5) * 2;
    });

    window.addEventListener("scroll", () => {
      sY = window.scrollY;
    });

    function animate3D() {
      core.rotation.y += 0.002;
      core.rotation.x += 0.001;

      core.rotation.x += mY * 0.03;
      core.rotation.y += mX * 0.03;

      core.scale.setScalar(1 + Math.sin(sY * 0.002) * 0.05);

      renderer.render(scene, camera);
      requestAnimationFrame(animate3D);
    }
    animate3D();

    window.addEventListener("resize", () => {
      const size = canvas.clientWidth;
      renderer.setSize(size, size);
      camera.aspect = 1;
      camera.updateProjectionMatrix();
    });
  }

});
