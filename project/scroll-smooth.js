// === Smooth scroll: same feel for mouse wheel and trackpad ===
// A real trackpad tracks your finger 1:1 while you're actively scrolling and
// only glides/decelerates AFTER you let go (native momentum). A notched mouse
// wheel has no such momentum — each click is a single abrupt jump with
// nothing after it. So instead of smoothing every frame (which just adds a
// constant lag that feels disconnected from the input), this tracks wheel
// input directly while events keep arriving, and only kicks off a decaying
// glide once input actually stops — giving a mouse wheel the same
// "ease in, glide, ease out" feel a trackpad already has naturally.
//
// Clicking an in-page menu/anchor link is intentionally left untouched —
// it keeps the site's original native `scroll-behavior: smooth` jump.
(function () {
  var reduceMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;

  function maxScroll() {
    return Math.max(0, document.documentElement.scrollHeight - window.innerHeight);
  }

  // Bypass the page's native scroll-behavior/scroll-snap just for these
  // programmatic writes, so our own frame-by-frame glide isn't re-animated
  // or fought by the browser; native/menu-click scrolling is untouched.
  function setScroll(y) {
    var html = document.documentElement;
    html.style.scrollBehavior = 'auto';
    html.style.scrollSnapType = 'none';
    window.scrollTo(0, y);
    html.style.scrollBehavior = '';
    html.style.scrollSnapType = '';
  }

  // ---- Wheel / trackpad: 1:1 while scrolling, momentum glide once it stops ----
  var position = window.scrollY;
  var velocity = 0;
  var lastEventTime = 0;
  var glideRaf = null;
  var IDLE_MS = 50;
  var FRICTION = 0.92;

  function normalizeDelta(e) {
    if (e.deltaMode === 1) return e.deltaY * 20;                     // line mode
    if (e.deltaMode === 2) return e.deltaY * window.innerHeight;     // page mode
    return e.deltaY;                                                  // pixel mode
  }

  function onWheel(e) {
    if (e.ctrlKey) return; // let pinch-zoom through untouched
    e.preventDefault();

    var now = performance.now();
    var dt = Math.min(50, Math.max(8, now - lastEventTime));
    lastEventTime = now;

    var delta = normalizeDelta(e);
    velocity = delta * (16 / dt); // estimate px/frame, used only if input stops right after

    position = Math.min(maxScroll(), Math.max(0, position + delta));
    setScroll(position);

    if (!glideRaf) glideRaf = requestAnimationFrame(glideStep);
  }

  function glideStep() {
    var idle = performance.now() - lastEventTime > IDLE_MS;

    if (!idle) {
      // fresh wheel events are still arriving; onWheel is driving position directly
      glideRaf = requestAnimationFrame(glideStep);
      return;
    }

    if (Math.abs(velocity) < 0.4) {
      velocity = 0;
      glideRaf = null;
      return;
    }

    position = Math.min(maxScroll(), Math.max(0, position + velocity));
    velocity *= FRICTION;
    setScroll(position);
    glideRaf = requestAnimationFrame(glideStep);
  }

  if (!reduceMotion) {
    window.addEventListener('wheel', onWheel, { passive: false });
  }

  window.addEventListener('touchstart', function () {
    if (glideRaf) { cancelAnimationFrame(glideRaf); glideRaf = null; }
    velocity = 0;
    position = window.scrollY;
  }, { passive: true });

  window.addEventListener('resize', function () {
    position = Math.min(position, maxScroll());
  });
})();
