// Shared content for the Olé & Obrigado marketplace implementation.
// Mirrors the dataset defined in "Ole Obrigado Marketplace.dc.html" / SiteHeader.dc.html / SiteFooter.dc.html.

const OO = "https://oleobrigado.com";

const SHOP_NAV = [
  { label: "Wine", href: OO + "/wines" },
  { label: "Spirits", href: OO + "/wines" },
  { label: "Bundles", href: "#" },
  { label: "Producers", href: OO + "/winemakers" },
  { label: "Seasonal", href: "#" }
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

const FOOTER_COLS = [
  { title: "Explore", links: [
    { label: "About us", href: OO + "/?about" },
    { label: "Wine & spirits", href: OO + "/wines" },
    { label: "Producer profiles", href: OO + "/winemakers" },
    { label: "Map of Spain & Portugal", href: OO + "/?seccion&id=map" },
    { label: "Winery photos", href: OO + "/?galleries" }
  ] },
  { title: "Trade", links: [
    { label: "Distributor access", href: OO + "/trade-portal" },
    { label: "Sales rep access", href: OO + "/sales-rep-access" },
    { label: "Account access", href: OO + "/account-access" },
    { label: "Sale-sheet app", href: OO + "/sale-sheet-app" },
    { label: "Shelf talkers", href: OO + "/shelftalkers" }
  ] },
  { title: "Press", links: [
    { label: "Ratings", href: OO + "/press/ratings/" },
    { label: "In the news", href: OO + "/press/in-the-news/" },
    { label: "Company accolades", href: OO + "/press/company-accolades/" },
    { label: "Catalog (PDF)", href: OO + "/files/ole-obrigado-catalog-2022.pdf" }
  ] },
  { title: "More", links: [
    { label: "El Camino del Albariño", href: OO + "/elcaminodelalbarino" },
    { label: "Giving", href: OO + "/?seccion&id=social-resp" },
    { label: "Carbon Neutral Certified", href: OO + "/carbon-neutral-certified" },
    { label: "Experiences", href: OO + "/experiences" },
    { label: "Store locator", href: OO + "/store" },
    { label: "Contact", href: OO + "/?contact" }
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

const SEASONAL_PRODUCTS = [
  { producer: "Quinta de Bronzeville", title: "44 by Bronzeville Alvarinho 2024", note: "Peach skin and sea spray from the granite terraces of Vinho Verde.", badge: "NEW", price: "$22.50", casePrice: "$21.38 at 12" },
  { producer: "Antonio Barbadillo Mateos", title: "Sacristía AB Sombrajo Viña La Rosa 2021", note: "Flor-aged and bone dry; almond, salt and chalk.", badge: "94 PTS", price: "$42.00", casePrice: "$39.90 at 6" },
  { producer: "Adega Sanmarco", title: "Adega Sanmarco Albariño 2023", note: "Rías Baixas classic: grapefruit, wet stone, a long finish.", badge: "BEST VALUE", price: "$22.90", casePrice: "$21.76 at 12" },
  { producer: "Quinta do Ameal", title: "Quinta do Ameal Loureiro 2023", note: "Lime leaf and white flowers from the Lima valley.", badge: "91 PTS", price: "$24.00", casePrice: "$22.80 at 12" }
];

const BROWSE_PRODUCTS = [
  { producer: "Adega Sanmarco", title: "Adega Sanmarco Albariño 2023", note: "Rías Baixas classic: grapefruit, wet stone, a long finish.", badge: "BEST VALUE", price: "$22.90", casePrice: "$21.76 at 12" },
  { producer: "Antonio Barbadillo Mateos", title: "Sombrajo Palomino Fino 2022", note: "Younger, brighter sibling; green apple and brine.", badge: "NEW", price: "$28.00", casePrice: "$26.60 at 6" },
  { producer: "Pazo de Señorans", title: "Pazo de Señorans Albariño 2022", note: "Waxy citrus and bay leaf; Salnés at its most precise.", badge: "", price: "$29.00", casePrice: "$27.55 at 12" },
  { producer: "Do Ferreiro", title: "Do Ferreiro Albariño 2023", note: "Old-vine Salnés — white peach, sea salt, real grip.", badge: "93 PTS", price: "$27.50", casePrice: "$26.13 at 12" },
  { producer: "Menade", title: "Menade Verdejo 2023", note: "Organic Rueda; fennel, grapefruit pith, bracing finish.", badge: "", price: "$21.00", casePrice: "$19.95 at 12" },
  { producer: "Viñátigo", title: "Viñátigo Marmajuelo 2022", note: "Volcanic Tenerife white — quince, smoke, sea air.", badge: "STAFF PICK", price: "$26.00", casePrice: "$24.70 at 6" }
];

const RELATED_PRODUCTS = [
  { producer: "Antonio Barbadillo Mateos", title: "Sombrajo Palomino Fino 2022", note: "Younger, brighter sibling; green apple and brine.", badge: "NEW", price: "$28.00", casePrice: "$26.60 at 6" },
  { producer: "Antonio Barbadillo Mateos", title: "Sacristía AB Manzanilla en Rama", note: "Drawn from the solera twice a year; sharp and yeasty.", badge: "", price: "$38.00", casePrice: "$36.10 at 6" },
  { producer: "Antonio Barbadillo Mateos", title: "Sacristía AB Amontillado 12 Años", note: "Twelve years oxidative; hazelnut, orange peel, salt.", badge: "95 PTS", price: "$64.00", casePrice: "$60.80 at 6" },
  { producer: "Antonio Barbadillo Mateos", title: "Viña La Rosa Palomino 2022", note: "The unfortified cut of the same vineyard, no flor.", badge: "", price: "$34.00", casePrice: "$32.30 at 6" }
];

function filterBox(on) {
  return { boxOn: on };
}
function filterRow(name, count, on) {
  return { name, count, on };
}

const FILTER_GROUPS = [
  { label: "Country", key: "country", rows: [filterRow("Spain", 89, true), filterRow("Portugal", 59, false)] },
  { label: "Style", key: "style", rows: [filterRow("White", 57, true), filterRow("Red", 68, false), filterRow("Sparkling", 14, false), filterRow("Gin & spirits", 9, false)] },
  { label: "Region", key: "region", rows: [filterRow("Rías Baixas", 18, false), filterRow("Rioja", 21, false), filterRow("Cádiz", 11, false), filterRow("Rueda", 9, false), filterRow("Vinho Verde", 16, false), filterRow("Alentejo", 14, false)] },
  { label: "Price", key: "price", rows: [filterRow("Under $20", 34, false), filterRow("$20 – $30", 46, true), filterRow("$30 – $50", 39, false), filterRow("$50+", 29, false)] },
  { label: "Grape", key: "grape", rows: [filterRow("Albariño", 22, false), filterRow("Palomino Fino", 8, false), filterRow("Verdejo", 12, false), filterRow("Tempranillo", 25, false), filterRow("Touriga Nacional", 17, false)] }
];

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
