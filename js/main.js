(() => {
  "use strict";

  const init = () => {
    const whatsappNumber = "522761104552";
    document.querySelectorAll("[data-whatsapp-message]").forEach((link) => {
      const message = link.dataset.whatsappMessage || "";
      link.href = `https://wa.me/${whatsappNumber}?text=${encodeURIComponent(message)}`;
    });

    const year = document.getElementById("current-year");
    if (year) year.textContent = new Date().getFullYear();

    document.querySelectorAll("img:not([data-product-image])").forEach((image) => {
      image.addEventListener("error", () => {
        console.error(`No se pudo cargar la imagen: ${image.getAttribute("src")}`);
        const decorative = image.getAttribute("alt") === "";
        if (decorative) image.hidden = true;
      }, { once: true });
    });
  };

  window.addEventListener("DOMContentLoaded", init);
})();
