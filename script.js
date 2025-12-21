// simple fade-in on scroll (starter)
const sections = document.querySelectorAll('.section');

window.addEventListener('scroll', () => {
  const trigger = window.innerHeight * 0.85;

  sections.forEach(section => {
    const top = section.getBoundingClientRect().top;
    if (top < trigger) {
      section.style.opacity = 1;
      section.style.transform = 'translateY(0)';
    }
  });
});
