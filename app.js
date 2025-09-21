// Support Gaza JavaScript
// This script handles smooth count‑up animations for stats and lazy
// fade‑in effects for cards and sections. It runs after the DOM
// content has loaded and uses the IntersectionObserver API when
// available for efficiency.

document.addEventListener('DOMContentLoaded', () => {
  // Count up stats when the stats section enters the viewport
  const statElements = document.querySelectorAll('.stat h3');
  let statsAnimated = false;
  function animateStats() {
    if (statsAnimated) return;
    statElements.forEach(el => {
      const target = parseInt(el.dataset.target);
      const isCurrency = el.textContent.trim().startsWith('$');
      const duration = 2000; // ms
      let start = 0;
      const stepTime = Math.abs(Math.floor(duration / target));
      const timer = setInterval(() => {
        start += Math.max(1, Math.floor(target / (duration / stepTime)));
        if (start >= target) {
          start = target;
          clearInterval(timer);
        }
        el.textContent = isCurrency ? '$' + start.toLocaleString() : start.toLocaleString();
      }, stepTime);
    });
    statsAnimated = true;
  }

  // IntersectionObserver to trigger stats and fade‑in animations
  const observerOptions = {
    threshold: 0.1
  };
  const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        // reveal fade‑in elements
        entry.target.classList.add('visible');
        // start stats when stats section enters view
        if (entry.target.classList.contains('stats')) {
          animateStats();
        }
        observer.unobserve(entry.target);
      }
    });
  }, observerOptions);

  // Observe all elements with fade‑in class and the stats container
  document.querySelectorAll('.fade-in, .stats').forEach(el => {
    observer.observe(el);
  });
});