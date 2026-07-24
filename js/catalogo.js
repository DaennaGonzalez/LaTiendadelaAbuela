(() => {
  "use strict";

  const catalogo = window.CATALOGO_PRODUCTOS || [];
  const numeroWhatsApp = "522761104552";
  const allProducts = catalogo.flatMap((categoria) => categoria.productos);
  const categoryMap = new Map(catalogo.map((categoria) => [categoria.id, categoria]));
  const productMap = new Map(allProducts.map((product) => [product.id, product]));
  const failedProducts = new Set();
  let selectedCategoryId = catalogo[0]?.id || "";
  let currentQuery = "";
  let lastModalTrigger = null;

  const elements = {};

  const normalize = (value) => value
    .normalize("NFD")
    .replace(/[\u0300-\u036f]/g, "")
    .toLocaleLowerCase("es-MX")
    .trim();

  allProducts.forEach((product) => {
    product.searchIndex = normalize(product.nombre);
  });

  const waLink = (message) => `https://wa.me/${numeroWhatsApp}?text=${encodeURIComponent(message)}`;

  const productMessage = (name) => `Hola, me gustaría consultar la disponibilidad de: ${name}.`;

  const categoryCardTemplate = (category) => {
    const seedsClass = ["granos-y-frijoles", "cereales"].includes(category.id) ? " category-card--seeds" : "";
    return `
      <button class="category-card${seedsClass}" type="button" data-category-id="${category.id}" aria-pressed="false">
        <span class="category-card__image">
          <img src="${category.imagenCategoria}" width="500" height="500" loading="lazy" decoding="async" alt="Categoría ${category.nombre}">
        </span>
        <span class="category-card__body">
          <h3>${category.nombre}</h3>
          <p>${category.productos.length} ${category.productos.length === 1 ? "producto" : "productos"}</p>
          <span class="category-card__action">Ver productos <span class="category-card__arrow" aria-hidden="true">→</span></span>
        </span>
      </button>
    `;
  };

  const productCardTemplate = (product, index) => `
    <article class="product-card" data-product-card="${product.id}" style="animation-delay:${Math.min(index * 42, 330)}ms">
      <div class="product-card__image">
        <img src="${product.imagen}" width="500" height="500" loading="lazy" decoding="async" alt="${product.nombre}">
      </div>
      <div class="product-card__body">
        <span class="product-card__category">${product.categoria}</span>
        <h3>${product.nombre}</h3>
        <div class="product-card__actions">
          <button class="button product-card__view" type="button" data-open-product="${product.id}">Ver producto</button>
          <a class="button product-card__whatsapp" href="${waLink(productMessage(product.nombre))}" target="_blank" rel="noopener noreferrer" aria-label="Consultar disponibilidad de ${product.nombre}">Consultar disponibilidad</a>
        </div>
      </div>
    </article>
  `;

  const getVisibleProducts = () => {
    const source = currentQuery
      ? allProducts.filter((product) => product.searchIndex.includes(normalize(currentQuery)))
      : (categoryMap.get(selectedCategoryId)?.productos || []);

    return source.filter((product) => !failedProducts.has(product.id));
  };

  const updateCount = (products) => {
    const selected = categoryMap.get(selectedCategoryId);
    const count = products.length;
    if (currentQuery) {
      elements.count.textContent = `${count} ${count === 1 ? "resultado" : "resultados"} para “${currentQuery.trim()}”`;
      elements.title.textContent = "Resultados de búsqueda";
      elements.searchStatus.textContent = `Se encontraron ${count} ${count === 1 ? "producto" : "productos"}.`;
    } else {
      elements.count.textContent = `${count} ${count === 1 ? "producto" : "productos"} en esta categoría`;
      elements.title.textContent = selected?.nombre || "Productos disponibles";
      elements.searchStatus.textContent = `${count} ${count === 1 ? "producto mostrado" : "productos mostrados"} en ${selected?.nombre || "el catálogo"}.`;
    }
  };

  const bindProductImageErrors = () => {
    elements.productsGrid.querySelectorAll(".product-card img").forEach((image) => {
      image.addEventListener("error", () => {
        const card = image.closest("[data-product-card]");
        const productId = card?.dataset.productCard;
        if (!productId) return;
        console.error(`No se pudo cargar la imagen del producto: ${image.getAttribute("src")}`);
        failedProducts.add(productId);
        card.remove();
        updateCount(getVisibleProducts());
        elements.empty.hidden = elements.productsGrid.childElementCount > 0;
      }, { once: true });
    });
  };

  const renderProducts = () => {
    const products = getVisibleProducts();
    elements.productsGrid.innerHTML = products.map(productCardTemplate).join("");
    updateCount(products);
    elements.empty.hidden = products.length > 0;
    bindProductImageErrors();
  };

  const updateCategoryState = () => {
    elements.categoriesGrid.querySelectorAll("[data-category-id]").forEach((card) => {
      const active = card.dataset.categoryId === selectedCategoryId;
      card.classList.toggle("is-active", active);
      card.setAttribute("aria-pressed", String(active));
    });
  };

  const selectCategory = (categoryId, { updateHash = true, scroll = false } = {}) => {
    if (!categoryMap.has(categoryId)) return;
    selectedCategoryId = categoryId;
    currentQuery = "";
    elements.search.value = "";
    elements.clearSearch.hidden = true;
    updateCategoryState();
    renderProducts();

    const activeCard = elements.categoriesGrid.querySelector(`[data-category-id="${categoryId}"]`);
    if (activeCard) {
      activeCard.classList.remove("is-popping");
      void activeCard.offsetWidth;
      activeCard.classList.add("is-popping");
    }

    if (updateHash) {
      history.pushState(null, "", `#${categoryId}`);
    }

    if (scroll) {
      elements.productsSection.scrollIntoView({ behavior: "smooth", block: "start" });
    }
  };

  const clearSearch = () => {
    currentQuery = "";
    elements.search.value = "";
    elements.clearSearch.hidden = true;
    renderProducts();
    elements.search.focus();
  };

  const runSearch = () => {
    currentQuery = elements.search.value;
    elements.clearSearch.hidden = currentQuery.length === 0;
    renderProducts();
  };

  const openModal = (productId, trigger) => {
    const product = productMap.get(productId);
    if (!product || failedProducts.has(productId)) return;
    lastModalTrigger = trigger;
    elements.modalImage.src = product.imagen;
    elements.modalImage.alt = product.nombre;
    elements.modalName.textContent = product.nombre;
    elements.modalCategory.textContent = product.categoria;
    elements.modalWhatsapp.href = waLink(productMessage(product.nombre));
    document.body.classList.add("modal-open");
    elements.modal.showModal();
    elements.modalClose.focus();
  };

  const closeModal = () => {
    if (!elements.modal.open) return;
    elements.modal.close();
  };

  const renderFooterCategories = () => {
    const footer = document.getElementById("footer-categories");
    if (!footer) return;
    footer.innerHTML = catalogo
      .map((category) => `<a href="#${category.id}" data-footer-category="${category.id}">${category.nombre}</a>`)
      .join("");
  };

  const init = () => {
    elements.categoriesGrid = document.getElementById("categories-grid");
    elements.productsGrid = document.getElementById("products-grid");
    elements.productsSection = document.getElementById("productos");
    elements.title = document.getElementById("products-title");
    elements.count = document.getElementById("products-count");
    elements.search = document.getElementById("product-search");
    elements.searchStatus = document.getElementById("search-status");
    elements.clearSearch = document.getElementById("clear-search");
    elements.empty = document.getElementById("empty-state");
    elements.emptyClear = document.getElementById("empty-clear");
    elements.modal = document.getElementById("product-modal");
    elements.modalClose = document.getElementById("modal-close");
    elements.modalImage = document.getElementById("modal-product-image");
    elements.modalName = document.getElementById("modal-product-name");
    elements.modalCategory = document.getElementById("modal-product-category");
    elements.modalWhatsapp = document.getElementById("modal-whatsapp");

    if (!catalogo.length || !elements.categoriesGrid || !elements.productsGrid) return;

    elements.categoriesGrid.innerHTML = catalogo.map(categoryCardTemplate).join("");
    renderFooterCategories();

    const hashCategory = location.hash.slice(1);
    if (categoryMap.has(hashCategory)) {
      selectedCategoryId = hashCategory;
    }

    updateCategoryState();
    renderProducts();

    elements.categoriesGrid.addEventListener("click", (event) => {
      const card = event.target.closest("[data-category-id]");
      if (!card) return;
      selectCategory(card.dataset.categoryId, { updateHash: true, scroll: true });
    });

    elements.productsGrid.addEventListener("click", (event) => {
      const trigger = event.target.closest("[data-open-product]");
      if (trigger) openModal(trigger.dataset.openProduct, trigger);
    });

    elements.search.addEventListener("input", runSearch);
    elements.clearSearch.addEventListener("click", clearSearch);
    elements.emptyClear.addEventListener("click", clearSearch);
    document.getElementById("search-form")?.addEventListener("submit", (event) => event.preventDefault());

    elements.modalClose.addEventListener("click", closeModal);
    elements.modal.addEventListener("click", (event) => {
      if (event.target !== elements.modal) return;
      const rect = elements.modal.getBoundingClientRect();
      const inside = event.clientX >= rect.left && event.clientX <= rect.right && event.clientY >= rect.top && event.clientY <= rect.bottom;
      if (!inside) closeModal();
    });
    elements.modal.addEventListener("close", () => {
      document.body.classList.remove("modal-open");
      lastModalTrigger?.focus();
    });
    elements.modalImage.addEventListener("error", () => {
      console.error(`No se pudo cargar la imagen del modal: ${elements.modalImage.getAttribute("src")}`);
      closeModal();
    });

    document.addEventListener("click", (event) => {
      const footerCategory = event.target.closest("[data-footer-category]");
      if (!footerCategory) return;
      event.preventDefault();
      selectCategory(footerCategory.dataset.footerCategory, { updateHash: true, scroll: true });
    });

    window.addEventListener("hashchange", () => {
      const id = location.hash.slice(1);
      if (categoryMap.has(id) && id !== selectedCategoryId) {
        selectCategory(id, { updateHash: false });
      }
    });

    if (categoryMap.has(hashCategory)) {
      requestAnimationFrame(() => elements.productsSection.scrollIntoView({ block: "start" }));
    }
  };

  window.addEventListener("DOMContentLoaded", init);
})();
