// Shared content for the Olé & Obrigado marketplace implementation.
// Nav/footer structure mirrors oleobrigado.com. The product catalog below blends
// the original design's sample bottles with real producer/wine names pulled from
// oleobrigado.com/wines (site search index — the live site doesn't publish prices,
// so prices/case pricing here are illustrative, same as the rest of this cart/
// pricing layer, which the design notes as a proposal rather than something the
// live site has).

const OO = "https://oleobrigado.com";

// Shop nav: Wine/Spirits/Bundles/Seasonal now route to the working local catalog
// instead of the live site — Producers still points out, since there's no
// producer-profile page in this build.
const SHOP_NAV = [
  { label: "Wine", href: "browse.html" },
  { label: "Spirits", href: "browse.html?style=" + encodeURIComponent("Gin & spirits") },
  { label: "Bundles", href: "browse.html" },
  { label: "Producers", href: OO + "/winemakers", external: true },
  { label: "Seasonal", href: "browse.html?seasonal=1" }
];

const TOP_NAV = [
  { label: "About", href: OO + "/?about", items: [] },
  { label: "Trade portal", href: OO + "/trade-portal", items: [
    { label: "Distributor access", href: OO + "/trade-portal" },
    { label: "Sales rep access", href: OO + "/sales-rep-access" },
    { label: "Account access", href: OO + "/account-access" }
  ] },
  { label: "Store locator", href: OO + "/store", items: [] },
  { label: "Press", href: OO + "/press/ratings/", items: [
    { label: "Ratings", href: OO + "/press/ratings/" },
    { label: "In the news", href: OO + "/press/in-the-news/" },
    { label: "Company accolades", href: OO + "/press/company-accolades/" }
  ] },
  { label: "Resources", href: "#", items: [
    { label: "Restaurant locator", href: OO + "/restaurantlocator" },
    { label: "Sale-sheet app", href: OO + "/sale-sheet-app" },
    { label: "Producer profiles", href: OO + "/winemakers" },
    { label: "Map of Spain & Portugal", href: OO + "/?seccion&id=map" },
    { label: "Winery photos", href: OO + "/?galleries" },
    { label: "Shelf talkers", href: OO + "/shelftalkers" },
    { label: "Olé & Obrigado catalog", href: OO + "/files/ole-obrigado-catalog-2022.pdf" },
    { label: "Olé & Obrigado logo", href: OO + "/files/Ole_&_Obrigado_Logo.png" },
    { label: "COLA", href: OO + "/?cola" }
  ] },
  { label: "El Camino del Albariño", href: OO + "/elcaminodelalbarino", items: [
    { label: "El Camino del Albariño", href: OO + "/elcaminodelalbarino" },
    { label: "El Camino in the Kitchen", href: OO + "/elcaminodelalbarinocookbook" },
    { label: "Giving", href: OO + "/?seccion&id=social-resp" },
    { label: "Carbon Neutral Certified", href: OO + "/carbon-neutral-certified" },
    { label: "Experiences", href: OO + "/experiences" }
  ] },
  { label: "Contact", href: OO + "/?contact", items: [] }
];

// Footer: every link from the nav/drawer above, laid out so nothing that exists
// site-wide is missing from the footer (previously Restaurant locator, the logo
// download, COLA, and El Camino in the Kitchen were only reachable via dropdown).
const FOOTER_COLS = [
  { title: "Explore", links: [
    { label: "About us", href: OO + "/?about" },
    { label: "Store locator", href: OO + "/store" },
    { label: "Contact", href: OO + "/?contact" }
  ] },
  { title: "Trade", links: [
    { label: "Distributor access", href: OO + "/trade-portal" },
    { label: "Sales rep access", href: OO + "/sales-rep-access" },
    { label: "Account access", href: OO + "/account-access" }
  ] },
  { title: "Resources", links: [
    { label: "Restaurant locator", href: OO + "/restaurantlocator" },
    { label: "Sale-sheet app", href: OO + "/sale-sheet-app" },
    { label: "Map of Spain & Portugal", href: OO + "/?seccion&id=map" },
    { label: "Winery photos", href: OO + "/?galleries" },
    { label: "Shelf talkers", href: OO + "/shelftalkers" }
  ] },
  { title: "Press & materials", links: [
    { label: "Ratings", href: OO + "/press/ratings/" },
    { label: "In the news", href: OO + "/press/in-the-news/" },
    { label: "Company accolades", href: OO + "/press/company-accolades/" },
    { label: "Olé & Obrigado catalog", href: OO + "/files/ole-obrigado-catalog-2022.pdf" },
    { label: "Olé & Obrigado logo", href: OO + "/files/Ole_&_Obrigado_Logo.png" },
    { label: "COLA", href: OO + "/?cola" }
  ] },
  { title: "El Camino", links: [
    { label: "El Camino del Albariño", href: OO + "/elcaminodelalbarino" },
    { label: "El Camino in the Kitchen", href: OO + "/elcaminodelalbarinocookbook" },
    { label: "Giving", href: OO + "/?seccion&id=social-resp" },
    { label: "Carbon Neutral Certified", href: OO + "/carbon-neutral-certified" },
    { label: "Experiences", href: OO + "/experiences" }
  ] }
];

const CATEGORIES = [
  { name: "Spanish reds", count: 42, fill: "#8C2F2A", ring: "none" },
  { name: "Spanish whites", count: 38, fill: "#D8C98A", ring: "none" },
  { name: "Portuguese reds", count: 27, fill: "#6D2430", ring: "none" },
  { name: "Portuguese whites", count: 19, fill: "#CBD6A8", ring: "none" },
  { name: "Sparkling", count: 14, fill: "#E8DFC0", ring: "none" },
  { name: "Gin & spirits", count: 9, fill: "#B9C3CC", ring: "none" },
  { name: "Bundles", count: 11, fill: "transparent", ring: "1.5px solid #C4BAA8" },
  { name: "Seasonal", count: 12, fill: "transparent", ring: "1.5px solid #C4BAA8" }
];

const TRUST = [
  { h: "Sold by licensed retailers", p: "Your order is fulfilled by a partner store in your state." },
  { h: "Case pricing, always shown", p: "Mix any twelve bottles and the per-bottle price drops." },
  { h: "Imported by us, start to finish", p: "Every producer in the book is one we visit." }
];

// Full catalog — every product on the browse page is drawn from this one list,
// so filter/sort/search all operate on real (shared) data instead of a fixed
// decorative 6-item grid.
function bottle(o) {
  const caseSize = o.price >= 30 ? 6 : 12;
  const casePrice = Math.round(o.price * 0.95 * 100) / 100;
  return Object.assign({
    price: `$${o.price.toFixed(2)}`,
    priceNum: o.price,
    casePrice: `$${casePrice.toFixed(2)} at ${caseSize}`
  }, o);
}

const PRODUCTS = [
  bottle({ id: "sacristia-ab-sombrajo", producer: "Antonio Barbadillo Mateos", title: "Sacristía AB Sombrajo Viña La Rosa 2021", note: "Flor-aged and bone dry; almond, salt and chalk.", badge: "94 PTS", price: 42.00, country: "Spain", style: "White", region: "Cádiz", grape: "Palomino Fino", seasonal: true }),
  bottle({ id: "sombrajo-palomino-fino", producer: "Antonio Barbadillo Mateos", title: "Sombrajo Palomino Fino 2022", note: "Younger, brighter sibling; green apple and brine.", badge: "NEW", price: 28.00, country: "Spain", style: "White", region: "Cádiz", grape: "Palomino Fino" }),
  bottle({ id: "sacristia-ab-manzanilla", producer: "Antonio Barbadillo Mateos", title: "Sacristía AB Manzanilla en Rama", note: "Drawn from the solera twice a year; sharp and yeasty.", badge: "", price: 38.00, country: "Spain", style: "White", region: "Cádiz", grape: "Palomino Fino" }),
  bottle({ id: "sacristia-ab-amontillado", producer: "Antonio Barbadillo Mateos", title: "Sacristía AB Amontillado 12 Años", note: "Twelve years oxidative; hazelnut, orange peel, salt.", badge: "95 PTS", price: 64.00, country: "Spain", style: "White", region: "Cádiz", grape: "Palomino Fino" }),
  bottle({ id: "vina-la-rosa-palomino", producer: "Antonio Barbadillo Mateos", title: "Viña La Rosa Palomino 2022", note: "The unfortified cut of the same vineyard, no flor.", badge: "", price: 34.00, country: "Spain", style: "White", region: "Cádiz", grape: "Palomino Fino" }),

  bottle({ id: "adega-sanmarco-albarino", producer: "Adega Sanmarco", title: "Adega Sanmarco Albariño 2023", note: "Rías Baixas classic: grapefruit, wet stone, a long finish.", badge: "BEST VALUE", price: 22.90, country: "Spain", style: "White", region: "Rías Baixas", grape: "Albariño", seasonal: true }),
  bottle({ id: "pazo-de-senorans-albarino", producer: "Pazo de Señorans", title: "Pazo de Señorans Albariño 2022", note: "Waxy citrus and bay leaf; Salnés at its most precise.", badge: "", price: 29.00, country: "Spain", style: "White", region: "Rías Baixas", grape: "Albariño" }),
  bottle({ id: "do-ferreiro-albarino", producer: "Do Ferreiro", title: "Do Ferreiro Albariño 2023", note: "Old-vine Salnés — white peach, sea salt, real grip.", badge: "93 PTS", price: 27.50, country: "Spain", style: "White", region: "Rías Baixas", grape: "Albariño" }),
  bottle({ id: "leirana-albarino", producer: "Bodegas Forjas del Salnés", title: "Leirana Albariño", note: "Power and salinity from Salnés old vines, on the lees.", badge: "", price: 26.00, country: "Spain", style: "White", region: "Rías Baixas", grape: "Albariño" }),
  bottle({ id: "leirana-finca-genoveva", producer: "Bodegas Forjas del Salnés", title: "Leirana Finca Genoveva Albariño", note: "Skin contact and foudre ageing; textured, saline, deep.", badge: "STAFF PICK", price: 36.00, country: "Spain", style: "White", region: "Rías Baixas", grape: "Albariño" }),
  bottle({ id: "goliardo-a-telleira", producer: "Goliardo (Bodegas do Ferreiro)", title: "Goliardo A Telleira Albariño", note: "1973 vines, fermented and aged in old 750L barrels.", badge: "", price: 39.00, country: "Spain", style: "White", region: "Rías Baixas", grape: "Albariño" }),
  bottle({ id: "lagar-de-pintos-albarino", producer: "Lagar de Pintos", title: "Lagar de Pintos Albariño", note: "Organic, Atlantic-coast fruit; citrus peel and iodine.", badge: "", price: 24.00, country: "Spain", style: "White", region: "Rías Baixas", grape: "Albariño" }),
  bottle({ id: "cies-albarino", producer: "Coto de Gomariz", title: "Cíes Albariño", note: "Old vines from 1954, wild-fermented; racy and mineral.", badge: "", price: 25.00, country: "Spain", style: "White", region: "Rías Baixas", grape: "Albariño" }),
  bottle({ id: "columna-albarino", producer: "Bodegas Fillaboa", title: "Columna Albariño", note: "Single-vineyard, barrel-fermented; broad and savory.", badge: "", price: 32.00, country: "Spain", style: "White", region: "Rías Baixas", grape: "Albariño" }),

  bottle({ id: "menade-verdejo", producer: "Menade", title: "Menade Verdejo 2023", note: "Organic Rueda; fennel, grapefruit pith, bracing finish.", badge: "", price: 21.00, country: "Spain", style: "White", region: "Rueda", grape: "Verdejo" }),
  bottle({ id: "vinatigo-marmajuelo", producer: "Viñátigo", title: "Viñátigo Marmajuelo 2022", note: "Volcanic Tenerife white — quince, smoke, sea air.", badge: "STAFF PICK", price: 26.00, country: "Spain", style: "White", region: "Canary Islands", grape: "Marmajuelo" }),

  bottle({ id: "44-bronzeville-alvarinho", producer: "Quinta de Bronzeville", title: "44 by Bronzeville Alvarinho 2024", note: "Peach skin and sea spray from the granite terraces of Vinho Verde.", badge: "NEW", price: 22.50, country: "Portugal", style: "White", region: "Vinho Verde", grape: "Alvarinho", seasonal: true }),
  bottle({ id: "quinta-do-ameal-loureiro", producer: "Quinta do Ameal", title: "Quinta do Ameal Loureiro 2023", note: "Lime leaf and white flowers from the Lima valley.", badge: "91 PTS", price: 24.00, country: "Portugal", style: "White", region: "Vinho Verde", grape: "Loureiro", seasonal: true }),
  bottle({ id: "nortico-alvarinho", producer: "Nortico", title: "Nortico Alvarinho Vinho Verde", note: "Border-country Monção e Melgaço fruit; citrus and salt.", badge: "", price: 19.00, country: "Portugal", style: "White", region: "Vinho Verde", grape: "Alvarinho" }),
  bottle({ id: "vera-vinho-verde-branco", producer: "Vera", title: "Vera Vinho Verde Branco", note: "Estate-grown, light frizzante lift; easy and bright.", badge: "BEST VALUE", price: 16.00, country: "Portugal", style: "White", region: "Vinho Verde", grape: "Blend" }),
  bottle({ id: "patio-pounder-vinho-verde", producer: "Aphros / Vinigalicia", title: "Patio Pounder Vinho Verde 1L", note: "Fruit-forward, low-alcohol, 1-liter format for the porch.", badge: "NEW", price: 18.00, country: "Portugal", style: "White", region: "Vinho Verde", grape: "Blend" }),

  bottle({ id: "vera-vinho-verde-rose", producer: "Vera", title: "Vera Vinho Verde Rosé", note: "Estate-grown, low residual sugar; strawberry and spritz.", badge: "", price: 16.00, country: "Portugal", style: "Rosé", region: "Vinho Verde", grape: "Blend" }),
  bottle({ id: "vizcarra-rosado", producer: "Vizcarra", title: "Vizcarra Rosado", note: "Tinto Fino and Garnacha, saignée-style; dry and savory.", badge: "", price: 20.00, country: "Spain", style: "Rosé", region: "Ribera del Duero", grape: "Tempranillo" }),
  bottle({ id: "liquid-geography-garnacha-rose", producer: "Liquid Geography", title: "Liquid Geography Garnacha Rosé", note: "Pale, dry, high-elevation Garnacha; watermelon rind.", badge: "NEW", price: 18.00, country: "Spain", style: "Rosé", region: "Rioja", grape: "Garnacha" }),

  bottle({ id: "cortijo-tinto", producer: "Alberto Orte", title: "Cortijo Tinto", note: "Bright estate fruit; red fruit, pepper, a mocha edge.", badge: "", price: 19.00, country: "Spain", style: "Red", region: "Rioja", grape: "Tempranillo" }),
  bottle({ id: "la-antigua-clasico-crianza", producer: "La Antigua", title: "La Antigua Clásico Crianza", note: "Old-school Rioja farming; fresh, elegant, silky texture.", badge: "", price: 23.00, country: "Spain", style: "Red", region: "Rioja", grape: "Tempranillo" }),
  bottle({ id: "la-antigua-clasico-reserva", producer: "La Antigua", title: "La Antigua Clásico Reserva", note: "High-elevation Sierra de la Demanda; 1940s Garnacha vines.", badge: "92 PTS", price: 31.00, country: "Spain", style: "Red", region: "Rioja", grape: "Garnacha" }),
  bottle({ id: "calma-crianza", producer: "Calma", title: "Calma Crianza", note: "Single-vineyard, high-altitude limestone; 100% Tempranillo.", badge: "STAFF PICK", price: 27.00, country: "Spain", style: "Red", region: "Rioja", grape: "Tempranillo" }),
  bottle({ id: "la-nevera-tinto", producer: "La Nevera", title: "La Nevera Tinto", note: "Raspberry and cherry, easy-drinking but not simple.", badge: "", price: 17.00, country: "Spain", style: "Red", region: "Rioja", grape: "Tempranillo" }),
  bottle({ id: "sierra-de-la-demanda-gran-reserva", producer: "Sierra de la Demanda", title: "Sierra de la Demanda Gran Reserva Tinto", note: "Top-vintage-only bottling; structure built for the cellar.", badge: "94 PTS", price: 45.00, country: "Spain", style: "Red", region: "Rioja", grape: "Tempranillo" }),

  bottle({ id: "torremoron-tinto", producer: "Torremorón", title: "Torremorón Tinto", note: "Tinto Fino from the Duero terraces; dark fruit, firm tannin.", badge: "", price: 25.00, country: "Spain", style: "Red", region: "Ribera del Duero", grape: "Tempranillo" }),
  bottle({ id: "ines", producer: "Ismael Gozalo", title: "Inés", note: "849-meter elevation fruit; cool, structured, precise.", badge: "93 PTS", price: 33.00, country: "Spain", style: "Red", region: "Ribera del Duero", grape: "Tempranillo" }),
  bottle({ id: "torralvo-gran-reserva", producer: "Torralvo", title: "Torralvo Gran Reserva", note: "Extended-ageing Ribera del Duero; leather, fig, cedar.", badge: "", price: 48.00, country: "Spain", style: "Red", region: "Ribera del Duero", grape: "Tempranillo" }),
  bottle({ id: "o-raio-da-vella-tinto", producer: "O Raio da Vella", title: "O Raio da Vella Tinto", note: "Atlantic-Galicia red — bright acid, savory herb, light grip.", badge: "", price: 29.00, country: "Spain", style: "Red", region: "Ribeira Sacra", grape: "Mencía" }),

  bottle({ id: "totus-tuus-cava-reserva", producer: "Totus Tuus", title: "Totus Tuus Cava Reserva", note: "Five-grape traditional-method Penedès; toast and citrus.", badge: "BEST VALUE", price: 20.00, country: "Spain", style: "Sparkling", region: "Penedès", grape: "Blend" }),

  bottle({ id: "nordes-atlantic-gin", producer: "Nordés", title: "Nordés Atlantic Gin", note: "Albariño-wine base, 11 botanicals, 6 native to Galicia.", badge: "NEW", price: 34.00, country: "Spain", style: "Gin & spirits", region: "Galicia", grape: "" })
];

// --- Derived views over PRODUCTS ---

const SEASONAL_PRODUCTS = PRODUCTS.filter(p => p.seasonal);

// "More from this producer" on the product-detail page (Sacristía AB Sombrajo).
const RELATED_PRODUCTS = PRODUCTS.filter(p => p.producer === "Antonio Barbadillo Mateos" && p.id !== "sacristia-ab-sombrajo");

const PRODUCT_SPECS = [
  { k: "Vintage", v: "2021" },
  { k: "Grape", v: "Palomino Fino" },
  { k: "Region", v: "Vino de la Tierra de Cádiz" },
  { k: "ABV", v: "15.0%" },
  { k: "Size", v: "750 ml" },
  { k: "Farming", v: "Organic, unfined" }
];

const PRODUCT_SCORES = [
  { source: "Wine Enthusiast", score: "94" },
  { source: "Decanter", score: "92" },
  { source: "Tim Atkin", score: "93" }
];
