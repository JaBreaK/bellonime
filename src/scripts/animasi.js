/*
Generalized Turbo animation handler

Usage: Add the class `turbo-animate` for vertical animations or `animasi-samping` for side animations.
Ensure each element has a unique ID so the old and new can be matched.
*/

document.addEventListener("turbo:before-render", (event) => {
  // Collect new elements marked for animation
  const newElements = Array.from(event.detail.newBody.querySelectorAll('.turbo-animate, .animasi-samping'));
  if (newElements.length === 0) return;

  // Prevent Turbo from rendering immediately
  event.preventDefault();

  // Animate out each matching old element
  newElements.forEach((newEl) => {
    const id = newEl.id;
    if (!id) return;

    const oldEl = document.getElementById(id);
    if (!oldEl) return;

    if (newEl.classList.contains('animasi-samping')) {
      // Side exit animation
      oldEl.classList.add('opacity-0', 'translate-x-4', 'transition-all', 'duration-1000', 'ease-in');
    } else {
      // Default vertical exit animation
      oldEl.classList.add('opacity-0', 'translate-y-2', 'transition-all', 'duration-1000', 'ease-in');
    }
  });

  // Wait for exit animations to complete
  setTimeout(() => {
    // Prepare entry animations for new elements
    newElements.forEach((newEl) => {
      if (newEl.classList.contains('animasi-samping')) {
        // Side entry initial state
        newEl.classList.add('opacity-0', '-translate-x-4', 'transition-all', 'duration-1000', 'ease-out');
      } else {
        // Default vertical entry initial state
        newEl.classList.add('opacity-0', 'translate-y-4', 'transition-all', 'duration-1000', 'ease-out');
      }
    });

    // Resume Turbo rendering
    event.detail.resume();

    // Trigger entry animations after DOM update
    requestAnimationFrame(() => {
      requestAnimationFrame(() => {
        newElements.forEach((newEl) => {
          newEl.classList.remove('opacity-0', 'translate-y-4', '-translate-x-4');
        });
      });
    });
  }, 300); // matches duration-300
});

// Di script Astro
if (typeof window !== 'undefined') {
  const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.classList.add('animate-in');
      }
    });
  });

  document.querySelectorAll('[data-animate]').forEach(el => {
    observer.observe(el);
  });
}