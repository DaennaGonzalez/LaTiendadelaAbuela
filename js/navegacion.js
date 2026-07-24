(() => {
  "use strict";

  const focusableSelector = [
    "a[href]",
    "button:not([disabled])",
    "input:not([disabled])",
    "[tabindex]:not([tabindex='-1'])"
  ].join(",");

  const init = () => {
    const header = document.getElementById("site-header");
    const menu = document.getElementById("mobile-menu");
    const toggle = document.getElementById("menu-toggle");
    const close = document.getElementById("menu-close");
    const backToTop = document.getElementById("back-to-top");
    const desktopLinks = [...document.querySelectorAll(".desktop-nav a")];
    let previousFocus = null;

    const openMenu = () => {
      previousFocus = document.activeElement;
      menu.hidden = false;
      requestAnimationFrame(() => menu.classList.add("is-open"));
      toggle.setAttribute("aria-expanded", "true");
      toggle.setAttribute("aria-label", "Cerrar menú");
      document.body.classList.add("menu-open");
      close.focus();
    };

    const closeMenu = () => {
      if (menu.hidden) return;
      menu.classList.remove("is-open");
      menu.hidden = true;
      toggle.setAttribute("aria-expanded", "false");
      toggle.setAttribute("aria-label", "Abrir menú");
      document.body.classList.remove("menu-open");
      previousFocus?.focus();
    };

    toggle?.addEventListener("click", () => menu.hidden ? openMenu() : closeMenu());
    close?.addEventListener("click", closeMenu);
    menu?.addEventListener("click", (event) => {
      if (event.target === menu || event.target.closest("a")) closeMenu();
    });

    document.addEventListener("keydown", (event) => {
      if (event.key === "Escape" && !menu.hidden) {
        event.preventDefault();
        closeMenu();
      }

      if (event.key !== "Tab" || menu.hidden) return;
      const focusable = [...menu.querySelectorAll(focusableSelector)].filter((node) => node.offsetParent !== null);
      const first = focusable[0];
      const last = focusable.at(-1);
      if (!first || !last) return;
      if (event.shiftKey && document.activeElement === first) {
        event.preventDefault();
        last.focus();
      } else if (!event.shiftKey && document.activeElement === last) {
        event.preventDefault();
        first.focus();
      }
    });

    const updateScrollState = () => {
      const scrolled = window.scrollY > 40;
      header?.classList.toggle("is-scrolled", scrolled);
      backToTop?.classList.toggle("is-visible", window.scrollY > 650);
    };

    updateScrollState();
    window.addEventListener("scroll", updateScrollState, { passive: true });

    backToTop?.addEventListener("click", () => {
      window.scrollTo({ top: 0, behavior: "smooth" });
    });

    const sections = ["inicio", "categorias", "productos", "mayoreo", "nosotros", "ubicacion"]
      .map((id) => document.getElementById(id))
      .filter(Boolean);

    if ("IntersectionObserver" in window) {
      const sectionObserver = new IntersectionObserver((entries) => {
        const visible = entries
          .filter((entry) => entry.isIntersecting)
          .sort((a, b) => b.intersectionRatio - a.intersectionRatio)[0];
        if (!visible) return;
        desktopLinks.forEach((link) => {
          if (link.getAttribute("href") === `#${visible.target.id}`) {
            link.setAttribute("aria-current", "true");
          } else {
            link.removeAttribute("aria-current");
          }
        });
      }, { rootMargin: "-25% 0px -65% 0px", threshold: [0, .15, .35] });
      sections.forEach((section) => sectionObserver.observe(section));
    }
  };

  window.addEventListener("DOMContentLoaded", init);
})();
