(() => {
  "use strict";

  const init = () => {
    const revealElements = document.querySelectorAll(".reveal");
    const reducedMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    const floatingSeeds = [...document.querySelectorAll(".floating-seed")].map((element, index) => ({
      element,
      dx: Number(element.dataset.dx || 0),
      dy: Number(element.dataset.dy || 0),
      mobileInset: Number(element.dataset.mobileInset || 0),
      rotation: Number(element.dataset.rotate || 0),
      spin: Number(element.dataset.spin || 0),
      phase: index * 1.17
    }));

    if (!reducedMotion && floatingSeeds.length) {
      let ticking = false;

      const updateFloatingSeeds = () => {
        const isMobile = window.innerWidth <= 680;
        const distance = isMobile
          ? Math.max(window.innerHeight * 2, 1320)
          : Math.max(window.innerHeight * 1.15, 680);
        const progress = Math.min(Math.max(window.scrollY / distance, 0), 1);
        const eased = progress * (2 - progress);
        const fadeProgress = Math.max(0, (progress - .12) / .88);
        const movementScale = window.innerWidth <= 900 ? .7 : 1;
        const mobileOutwardProgress = Math.min(Math.max((progress - .28) / .72, 0), 1);
        const mobileOutwardEased = mobileOutwardProgress * (2 - mobileOutwardProgress);
        const mobileInwardWave = Math.sin(Math.min(progress / .56, 1) * Math.PI);

        floatingSeeds.forEach(({ element, dx, dy, mobileInset, rotation, spin, phase }) => {
          const mobilePathEnvelope = Math.sin(progress * Math.PI);
          const mobileCurveX = Math.sin((progress * Math.PI * 2.4) + phase) * 14 * mobilePathEnvelope;
          const mobileCurveY = Math.cos((progress * Math.PI * 2) + phase) * 11 * mobilePathEnvelope;
          const translateX = isMobile
            ? (mobileInset * mobileInwardWave * 1.25) + (dx * mobileOutwardEased * .98) + mobileCurveX
            : dx * eased * movementScale;
          const translateY = isMobile
            ? (dy * mobileOutwardEased * .72) + mobileCurveY - (12 * mobileInwardWave)
            : dy * eased * movementScale;
          const motionProgress = isMobile ? mobileOutwardEased : eased;
          const mobileWobble = Math.sin((progress * Math.PI * 3) + phase) * 5 * mobilePathEnvelope;
          const rotate = rotation + spin * motionProgress + (isMobile ? mobileWobble : 0);
          const scale = isMobile
            ? 1 + (.055 * Math.sin((progress * Math.PI * 2) + phase) * mobilePathEnvelope) - (.06 * motionProgress)
            : 1 - (.2 * eased);
          const opacity = isMobile ? .94 : .88 * (1 - Math.pow(fadeProgress, 1.12));

          element.style.visibility = isMobile && progress >= .98 ? "hidden" : "visible";
          element.style.opacity = String(Math.max(0, opacity));
          element.style.transform = `translate3d(${translateX}px, ${translateY}px, 0) rotate(${rotate}deg) scale(${scale})`;
        });

        ticking = false;
      };

      const requestSeedUpdate = () => {
        if (ticking) return;
        ticking = true;
        requestAnimationFrame(updateFloatingSeeds);
      };

      updateFloatingSeeds();
      window.addEventListener("scroll", requestSeedUpdate, { passive: true });
      window.addEventListener("resize", requestSeedUpdate);
    }

    if (reducedMotion || !("IntersectionObserver" in window)) {
      revealElements.forEach((element) => element.classList.add("is-visible"));
      return;
    }

    const observer = new IntersectionObserver((entries) => {
      entries.forEach((entry) => {
        if (!entry.isIntersecting) return;
        entry.target.classList.add("is-visible");
        observer.unobserve(entry.target);
      });
    }, { rootMargin: "0px 0px -9% 0px", threshold: .08 });

    revealElements.forEach((element) => observer.observe(element));
  };

  window.addEventListener("DOMContentLoaded", init);
})();
