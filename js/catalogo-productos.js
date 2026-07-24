(() => {
  "use strict";

  const producto = (id, nombre, archivo) => ({
    id,
    nombre,
    imagen: `imgs/${archivo}`
  });

  window.CATALOGO_PRODUCTOS = [
    {
      id: "chiles-secos",
      nombre: "Chiles secos",
      descripcion: "Una selección de chiles para distintas recetas y preparaciones.",
      imagenCategoria: "imgs/categoria-chiles-secos.webp",
      productos: [
        producto("chipotle-con-cola", "Chile chipotle con cola", "chipotle-con-cola.webp"),
        producto("chipotle-descolado", "Chile chipotle descolado", "chipotle-descolado.webp"),
        producto("guajillo-primera", "Chile guajillo de primera", "guajillo-primera.webp"),
        producto("guajillo-segunda", "Chile guajillo de segunda", "guajillo-segunda.webp"),
        producto("chile-costeno", "Chile costeño", "chile-costeno.webp"),
        producto("chile-puya", "Chile puya", "chile-puya.webp"),
        producto("ancho-primera", "Chile ancho de primera", "ancho-primera.webp"),
        producto("ancho-segunda", "Chile ancho de segunda", "ancho-segunda.webp"),
        producto("mulato-primera", "Chile mulato de primera", "mulato-primera.webp"),
        producto("mulato-segunda", "Chile mulato de segunda", "mulato-segunda.webp"),
        producto("chile-morita", "Chile morita", "chile-morita.webp"),
        producto("chile-de-arbol-con-cola", "Chile de árbol con cola", "chile-de-arbol-con-cola.webp"),
        producto("chile-de-arbol-sin-cola", "Chile de árbol sin cola", "chile-de-arbol-sin-cola.webp")
      ]
    },
    {
      id: "abarrotes",
      nombre: "Abarrotes",
      descripcion: "Productos básicos para la cocina, la despensa y el día a día.",
      imagenCategoria: "imgs/categoria-abarrotes.webp",
      productos: [
        producto("aceite-patrona", "Aceite Patrona", "aceite-patrona.webp"),
        producto("aceite-nutrioli", "Aceite Nutrioli", "aceite-nutrioli.webp"),
        producto("aceite-123", "Aceite 1-2-3", "aceite-123.webp"),
        producto("chocolate-abuelita", "Chocolate Abuelita", "chocolate-abuelita.webp"),
        producto("galleta-de-animalito", "Galletas de animalito", "galleta-de-animalito.webp"),
        producto("galleta-ovalada", "Galleta ovalada", "galleta-ovalada.webp"),
        producto("papel-mixiote", "Papel para mixiote", "papel-mixiote.webp"),
        producto("sal", "Sal", "sal.webp"),
        producto("azucar", "Azúcar", "azucar.webp"),
        producto("jalapenos", "Chiles jalapeños", "jalapenos.webp"),
        producto("nescafe", "Nescafé", "nescafe.webp"),
        producto("dulces", "Dulces", "dulces.webp")
      ]
    },
    {
      id: "botanas-fridukys",
      nombre: "Botanas Fridukys",
      descripcion: "Cacahuates, semillas, habas y botanas para compartir.",
      imagenCategoria: "imgs/categoria-botanas-fridukys.webp",
      productos: [
        producto("cacahuate-espanol-salado", "Cacahuate español salado", "cacahuate-espanol-salado.webp"),
        producto("cacahuate-espanol-enchilado", "Cacahuate español enchilado", "cacahuate-espanol-enchilado.webp"),
        producto("cacahuate-espanol-enchilado-con-ajo", "Cacahuate español enchilado con ajo", "cacahuate-espanol-enchilado-con-ajo.webp"),
        producto("cacahuate-hot-nuts-adobo", "Cacahuate Hot Nuts adobo", "cacahuate-hot-nuts-adobo.webp"),
        producto("cacahuate-hot-nuts-habanero", "Cacahuate Hot Nuts habanero", "cacahuate-hot-nuts-habanero.webp"),
        producto("cacahuate-hot-nuts-chipotle", "Cacahuate Hot Nuts chipotle", "cacahuate-hot-nuts-chipotle.webp"),
        producto("botana-surtida", "Botana surtida", "botana-surtida.webp"),
        producto("cacahuate-garapinado-con-ajonjoli", "Cacahuate garapiñado con ajonjolí", "cacahuate-garapinado-con-ajonjoli.webp"),
        producto("cacahuate-garapinado-rojo", "Cacahuate garapiñado rojo", "cacahuate-garapinado-rojo.webp"),
        producto("girasol-tostado", "Girasol tostado", "girasol-tostado.webp"),
        producto("girasol-enchilado", "Girasol enchilado", "girasol-enchilado.webp"),
        producto("semilla-criolla-tostada", "Semilla criolla tostada", "semilla-criolla-tostada.webp"),
        producto("haba-enchilada", "Haba enchilada", "haba-enchilada.webp"),
        producto("haba-pelada-enchilada", "Haba pelada enchilada", "haba-pelada-enchilada.webp"),
        producto("cacahuate-japones", "Cacahuate japonés", "cacahuate-japones.webp")
      ]
    },
    {
      id: "gomas",
      nombre: "Gomas",
      descripcion: "Gomas frutales, clásicas y enchiladas para todos los antojos.",
      imagenCategoria: "imgs/categoria-gomas.webp",
      productos: [
        producto("panda", "Goma Panda", "panda.webp"),
        producto("oso-lucky", "Oso Lucky", "oso-lucky.webp"),
        producto("lombriz-lucky", "Lombriz Lucky", "lombriz-lucky.webp"),
        producto("frutita-lucky", "Frutita Lucky", "frutita-lucky.webp"),
        producto("tiburon-lucky", "Tiburón Lucky", "tiburon-lucky.webp"),
        producto("tira-enchilada", "Tira enchilada", "tira-enchilada.webp"),
        producto("aro-durazno", "Aro de durazno", "aro-durazno.webp"),
        producto("aro-manzan", "Aro de manzana", "aro-manzan.webp"),
        producto("oso-enchilado", "Oso enchilado", "oso-enchilado.webp"),
        producto("mangomita-mr", "Mangomita MR", "mangomita-mr.webp")
      ]
    },
    {
      id: "pastas-chicharrines",
      nombre: "Pastas y chicharrines",
      descripcion: "Formas variadas para preparar botanas crujientes.",
      imagenCategoria: "imgs/categoria-pastas-chicharrines.webp",
      productos: [
        producto("pasta-palillo", "Pasta palillo", "pasta-palillo.webp"),
        producto("pasta-zarape", "Pasta zarape", "pasta-zarape.webp"),
        producto("pasta-4x4", "Pasta 4x4", "pasta 4x4.webp"),
        producto("pasta-dona", "Pasta dona", "pasta-dona.webp"),
        producto("pasta-lagrima", "Pasta lágrima", "pasta-lagrima.webp")
      ]
    },
    {
      id: "granos-y-frijoles",
      nombre: "Granos y frijoles",
      descripcion: "Granos, semillas y frijoles para la despensa y la cocina.",
      imagenCategoria: "imgs/categoria-granos-y-frijoles.webp",
      productos: [
        producto("arroz", "Arroz", "arroz.webp"),
        producto("girasol-crudo", "Girasol crudo", "girasol-crudo.webp"),
        producto("pimienta-chica", "Pimienta chica", "pimienta-chica.webp"),
        producto("arroz-quebrado", "Arroz quebrado", "arroz-quebrado.webp"),
        producto("trigo", "Trigo", "trigo.webp"),
        producto("alpiste", "Alpiste", "alpiste.webp"),
        producto("alpiste-compuesto", "Alpiste compuesto", "alpiste-compuesto.webp"),
        producto("alverjon-oro", "Alverjón oro", "alverjon-oro.webp"),
        producto("alverjon-vereda", "Alverjón vereda", "alverjon-vereda.webp"),
        producto("frijol-negro-bola", "Frijol negro bola", "frijol-negro-bola.webp"),
        producto("frijol-negro-cooperativa", "Frijol negro cooperativa", "frijol-negro-cooperativa.webp"),
        producto("frijol-peruano", "Frijol peruano", "frijol-peruano.webp"),
        producto("frijol-pinto", "Frijol pinto", "frijol-pinto.webp"),
        producto("frijol-bayo", "Frijol bayo", "frijol-bayo.webp"),
        producto("frijol-flor-de-mayo", "Frijol flor de mayo", "frijol-flor-de-mayo.webp")
      ]
    },
    {
      id: "cereales",
      nombre: "Cereales",
      descripcion: "Cereales, avena y amaranto para diferentes momentos del día.",
      imagenCategoria: "imgs/categoria-cereales.webp",
      productos: [
        producto("choco-crispi", "Choco Crispi", "choco-crispi.webp"),
        producto("hojuela-de-chocolate", "Hojuela de chocolate", "hojuela-de-chocolate.webp"),
        producto("fruti-rueda", "Fruti Rueda", "fruti-rueda.webp"),
        producto("hojuela-azucarada", "Hojuela azucarada", "hojuela-azucarada.webp"),
        producto("hojuela-natural", "Hojuela natural", "hojuela-natural.webp"),
        producto("avena", "Avena", "avena.webp"),
        producto("amaranto", "Amaranto", "amaranto.webp")
      ]
    },
    {
      id: "jarcerias",
      nombre: "Jarcerías",
      descripcion: "Artículos prácticos para la limpieza y el cuidado del hogar.",
      imagenCategoria: "imgs/categoria-jarcerias.webp",
      productos: [
        producto("escoba", "Escoba", "escoba.webp"),
        producto("cepillo", "Cepillo", "cepillo.webp"),
        producto("tendederos", "Tendederos", "tendederos.webp"),
        producto("trapos", "Trapos", "trapos.webp"),
        producto("mechudos", "Mechudos", "mechudos.webp")
      ]
    },
    {
      id: "encantos-como-botanas",
      nombre: "Botanas",
      descripcion: "Botanas crujientes con diferentes sabores.",
      imagenCategoria: "imgs/categoria-encantos-como-botanas.webp",
      productos: [
        producto("tostileo", "Tostileo", "tostileo.webp"),
        producto("ruffles", "Ruffles", "ruffles.webp"),
        producto("piccas", "Piccas", "piccas.webp"),
        producto("kechido-queso", "Kechido queso", "kechido-queso.webp"),
        producto("kechido-pizza", "Kechido pizza", "kechido-pizza.webp"),
        producto("kechido-extremo", "Kechido extremo", "kechido-extremo.webp")
      ]
    },
    {
      id: "alimentos-para-gatos-y-perros",
      nombre: "Alimentos para gatos y perros",
      descripcion: "Opciones de alimento para consentir a perros y gatos.",
      imagenCategoria: "imgs/categoria-alimentos-para-gatos-y-perros.webp",
      productos: [
        producto("beriscan-pro-adulto", "Beriscan Pro adulto", "beriscan-pro-adulto.webp"),
        producto("beriscan-pro-cachorro", "Beriscan Pro cachorro", "beriscan-pro-cachorro.webp"),
        producto("gladiadog", "Gladia-Dog Xtra adulto", "gladiadog.webp"),
        producto("pedigree-adulto", "Pedigree adulto", "pedigree-adulto.webp"),
        producto("pedigree-cachorro", "Pedigree cachorro", "pedigree-cachorro.webp"),
        producto("beriscat", "Beriscat", "beriscat.webp"),
        producto("minino", "Minino", "minino.webp"),
        producto("whiskas", "Whiskas", "whiskas.webp"),
        producto("gatina", "Gatina", "gatina.webp")
      ]
    }
  ].map((categoria) => ({
    ...categoria,
    productos: categoria.productos.map((item) => ({
      ...item,
      categoria: categoria.nombre,
      categoriaId: categoria.id
    }))
  }));
})();
