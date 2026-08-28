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

// Counts and hrefs are computed live from PRODUCTS (see components.js) instead
// of being hand-typed here — with a real, changing catalog, a hardcoded number
// drifts out of sync immediately (the original mockup's tiles never matched
// the real 122-bottle catalog once it replaced the fictional one). "Bundles"
// is dropped since it never had any real products or filter behind it; "Rosé"
// is added since 9 real bottles had no category tile at all.
const CATEGORIES = [
  { name: "Spanish reds", fill: "#8C2F2A", ring: "none", filter: { country: "Spain", style: "Red" } },
  { name: "Spanish whites", fill: "#D8C98A", ring: "none", filter: { country: "Spain", style: "White" } },
  { name: "Portuguese reds", fill: "#6D2430", ring: "none", filter: { country: "Portugal", style: "Red" } },
  { name: "Portuguese whites", fill: "#CBD6A8", ring: "none", filter: { country: "Portugal", style: "White" } },
  { name: "Rosé", fill: "#E3A6A0", ring: "none", filter: { style: "Rosé" } },
  { name: "Sparkling", fill: "#E8DFC0", ring: "none", filter: { style: "Sparkling" } },
  { name: "Gin & spirits", fill: "#B9C3CC", ring: "none", filter: { style: "Gin & spirits" } },
  { name: "Seasonal", fill: "transparent", ring: "1.5px solid #C4BAA8", filter: { seasonal: true } }
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

// Featured product-detail bottle (the design brief's original hero item — kept
// alongside the real catalog below so the product-detail page still has
// its subject; it has no real photo, so it falls back to the placeholder).
const PRODUCTS = [
  bottle({ id: "3000-cepas-albarino", producer: "Lagar de Pintos", title: "3000 Cepas Albariño", note: "Albariño from Rías Baixas.", badge: "", price: 31.9, country: "Spain", style: "White", region: "Rías Baixas", grape: "Albariño", image: "https://oleobrigado.com/files/bt_66eaf6e13686a.jpg" }),
  bottle({ id: "a-portela-mencia", producer: "Alberto Orte", title: "A Portela Mencía", note: "Mencía from Valdeorras.", badge: "", price: 30.9, country: "Spain", style: "Red", region: "Valdeorras", grape: "Mencía", image: "https://oleobrigado.com/files/bt_692dc4bbf3388.jpg" }),
  bottle({ id: "a-touriga-vai-nua", producer: "Fitapreta", title: "A Touriga Vai Nua", note: "Touriga Naçional from Vinho Regional Alentejano.", badge: "", price: 29.9, country: "Portugal", style: "Red", region: "Vinho Regional Alentejano", grape: "Touriga Naçional", image: "https://oleobrigado.com/files/bottle_679_a-touriga-vai-nuajpg.jpg" }),
  bottle({ id: "aplanta", producer: "Vinos Atlántico", title: "Aplanta", note: "Aragonez, Alicante from Vinho Regional Alentejano.", badge: "", price: 25.9, country: "Portugal", style: "Red", region: "Vinho Regional Alentejano", grape: "Aragonez, Alicante", image: "https://oleobrigado.com/files/bt_64f8c5f58fb33.jpg" }),
  bottle({ id: "arinto-dos-acores", producer: "Azores Wine Company", title: "Arinto dos Açores", note: "Arinto dos Açores from Azores.", badge: "", price: 17.9, country: "Portugal", style: "White", region: "Azores", grape: "Arinto dos Açores", image: "https://oleobrigado.com/files/bottle_642_arinto-dos-acores-non-sur-lies-bottle-1000pixelsjpg.jpg" }),
  bottle({ id: "armas-de-guerra-rosado", producer: "Vinos Guerra", title: "Armas de Guerra Rosado", note: "Mencia from Bierzo.", badge: "", price: 20.9, country: "Spain", style: "Rosé", region: "Bierzo", grape: "Mencia", image: "https://oleobrigado.com/files/bottle_283_armas-de-guerra-rosado-2019-bottle-1000pixelsjpg.jpg" }),
  bottle({ id: "asnella-vinho-verde", producer: "Vinos Atlántico", title: "Asnella Vinho Verde", note: "Arinto, Loureiro from Vinho Verde.", badge: "", price: 30.9, country: "Portugal", style: "White", region: "Vinho Verde", grape: "Arinto, Loureiro", image: "https://oleobrigado.com/files/bt_694063d750dfe.jpg" }),
  bottle({ id: "atlantida-blanco", producer: "Alberto Orte", title: "Atlántida Blanco", note: "Vigiriega Blanca from Alberto Orte.", badge: "", price: 24.9, country: "Spain", style: "White", region: "", grape: "Vigiriega Blanca", image: "https://oleobrigado.com/files/bt_6841db584de2f.jpg" }),
  bottle({ id: "atlantida-tintilla", producer: "Alberto Orte", title: "Atlántida Tintilla", note: "Tintilla from Alberto Orte.", badge: "", price: 16.9, country: "Spain", style: "Red", region: "", grape: "Tintilla", image: "https://oleobrigado.com/files/bt_68b829ba5b4cc.jpg" }),
  bottle({ id: "barahonda-barrica", producer: "Barahonda", title: "Barahonda Barrica", note: "Monastrell, Syrah from Yecla.", badge: "", price: 25.9, country: "Spain", style: "Red", region: "Yecla", grape: "Monastrell, Syrah", image: "https://oleobrigado.com/files/bt_63769549ec68b.jpg" }),
  bottle({ id: "barahonda-carro", producer: "Barahonda", title: "Barahonda Carro", note: "Monastrell, Syrah, Merlot from Yecla.", badge: "", price: 32.9, country: "Spain", style: "Red", region: "Yecla", grape: "Monastrell, Syrah, Merlot", image: "https://oleobrigado.com/files/bt_6841f7cbc308c.jpg" }),
  bottle({ id: "barahonda-heredad-candela", producer: "Barahonda", title: "Barahonda Heredad Candela", note: "Monastrell from Yecla.", badge: "", price: 25.9, country: "Spain", style: "Red", region: "Yecla", grape: "Monastrell", image: "https://oleobrigado.com/files/wn_137110718075618a.jpg" }),
  bottle({ id: "barahonda-monastrell", producer: "Barahonda", title: "Barahonda Monastrell", note: "Monastrell from Yecla.", badge: "", price: 27.9, country: "Spain", style: "Red", region: "Yecla", grape: "Monastrell", image: "https://oleobrigado.com/files/bt_6841f1675b2d3.jpg" }),
  bottle({ id: "barcino-cava-belle-epoque", producer: "Vinos Atlántico", title: "Barcino Cava Belle Epoque", note: "Xarello, Macabeo, Parellada from Penedès.", badge: "", price: 20.9, country: "Spain", style: "Sparkling", region: "Penedès", grape: "Xarello, Macabeo, Parellada", image: "https://oleobrigado.com/files/bottle_385_barcino-cava-brut-rp90-mockup-copy-2jpg.jpg" }),
  bottle({ id: "barcino-cava-classic", producer: "Vinos Atlántico", title: "Barcino Cava Classic", note: "Xarello, Macabeo, Parellada from Penedès.", badge: "", price: 20.9, country: "Spain", style: "Sparkling", region: "Penedès", grape: "Xarello, Macabeo, Parellada", image: "https://oleobrigado.com/files/bt_63b8387c8885c.jpg" }),
  bottle({ id: "begonia-sangria-tinta-can", producer: "Begonia", title: "Begonia Sangria Tinta (Can)", note: "Monastrell, Bobal from Cuenca.", badge: "", price: 31.9, country: "Spain", style: "Red", region: "Cuenca", grape: "Monastrell, Bobal", image: "https://oleobrigado.com/files/bottle_700_begonia-can-2jpg.jpg" }),
  bottle({ id: "begonia-sangria-blanca", producer: "Begonia", title: "Begonia Sangria Blanca", note: "From Murcia.", badge: "", price: 29.9, country: "Spain", style: "White", region: "Murcia", grape: "", image: "https://oleobrigado.com/files/wn_693170622091333.jpg" }),
  bottle({ id: "begonia-sangria-rosada", producer: "Begonia", title: "Begonia Sangria Rosada", note: "Monastrell from Murcia.", badge: "", price: 16.9, country: "Spain", style: "Red", region: "Murcia", grape: "Monastrell", image: "https://oleobrigado.com/files/wn_692170622094502.jpg" }),
  bottle({ id: "begonia-sangria-tinta", producer: "Begonia", title: "Begonia Sangria Tinta", note: "From Murcia.", badge: "", price: 23.9, country: "Spain", style: "Red", region: "Murcia", grape: "", image: "https://oleobrigado.com/files/wn_343160428093139.jpg" }),
  bottle({ id: "bellum", producer: "Vinos Atlántico", title: "Bellum", note: "Monastrell from Yecla.", badge: "", price: 28.9, country: "Spain", style: "Red", region: "Yecla", grape: "Monastrell", image: "https://oleobrigado.com/files/wn_111160602071321.jpg" }),
  bottle({ id: "bodegas-poniente-amontillado", producer: "Bodegas Poniente", title: "Bodegas Poniente Amontillado", note: "Palomino from Jerez-Xérès-Sherry.", badge: "", price: 66.9, country: "Spain", style: "White", region: "Jerez-Xérès-Sherry", grape: "Palomino", image: "https://oleobrigado.com/files/bottle_738_poniente-amontillado-bottlejpg.jpg" }),
  bottle({ id: "bodegas-poniente-fino", producer: "Bodegas Poniente", title: "Bodegas Poniente Fino", note: "Palomino from Jerez-Xérès-Sherry.", badge: "", price: 64.9, country: "Spain", style: "White", region: "Jerez-Xérès-Sherry", grape: "Palomino", image: "https://oleobrigado.com/files/bottle_736_poniente-fino-bottle-1000pixelsjpg.jpg" }),
  bottle({ id: "bodegas-poniente-oloroso", producer: "Bodegas Poniente", title: "Bodegas Poniente Oloroso", note: "Palomino from Jerez-Xérès-Sherry.", badge: "", price: 65.9, country: "Spain", style: "White", region: "Jerez-Xérès-Sherry", grape: "Palomino", image: "https://oleobrigado.com/files/bottle_737_poniente-oloroso-bottle-1000pixelsjpg.jpg" }),
  bottle({ id: "bodegas-poniente-palo-cortado", producer: "Bodegas Poniente", title: "Bodegas Poniente Palo Cortado", note: "Palomino from Jerez-Xérès-Sherry.", badge: "", price: 34.9, country: "Spain", style: "White", region: "Jerez-Xérès-Sherry", grape: "Palomino", image: "https://oleobrigado.com/files/bottle_739_poniente-palo-cortado-bottle-1000pixelsjpg.jpg" }),
  bottle({ id: "branco-vulcanico", producer: "Azores Wine Company", title: "Branco Vulcânico", note: "Arinto dos Açores and Verdelho from Azores.", badge: "", price: 19.9, country: "Portugal", style: "White", region: "Azores", grape: "Arinto dos Açores and Verdelho", image: "https://oleobrigado.com/files/bottle_785_branco-vulcanico-2018-bottle-1000pixelsjpg.jpg" }),
  bottle({ id: "calma", producer: "Vinos Atlántico", title: "Calma", note: "Tempranillo from Rioja.", badge: "", price: 26.9, country: "Spain", style: "Red", region: "Rioja", grape: "Tempranillo", image: "https://oleobrigado.com/files/bt_6556391d04932.jpg" }),
  bottle({ id: "casteller-cava-brut", producer: "Casteller", title: "Casteller Cava Brut", note: "Macabeo, Xarello, Parellada from Penedès.", badge: "", price: 29.9, country: "Spain", style: "Sparkling", region: "Penedès", grape: "Macabeo, Xarello, Parellada", image: "https://oleobrigado.com/files/bottle_121_casteller-brutjpg.jpg" }),
  bottle({ id: "casteller-cava-rose", producer: "Casteller", title: "Casteller Cava Rosé", note: "Trepat from Penedès.", badge: "", price: 31.9, country: "Spain", style: "Sparkling", region: "Penedès", grape: "Trepat", image: "https://oleobrigado.com/files/bottle_122_casteller-rosejpg.jpg" }),
  bottle({ id: "celia", producer: "Vizcarra", title: "Celia", note: "Tinto Fino (Tempranillo), Garnacha from Ribera del Duero.", badge: "", price: 30.9, country: "Spain", style: "Red", region: "Ribera del Duero", grape: "Tinto Fino (Tempranillo), Garnacha", image: "https://oleobrigado.com/files/wn_123130517171556.jpg" }),
  bottle({ id: "cies-albarino", producer: "Rodrigo Méndez", title: "Cíes Albariño", note: "Albariño from Rías Baixas.", badge: "", price: 20.9, country: "Spain", style: "White", region: "Rías Baixas", grape: "Albariño", image: "https://oleobrigado.com/files/wn_339160602075106.jpg" }),
  bottle({ id: "columna-albarino", producer: "Vinos Atlántico", title: "Columna Albariño", note: "Albariño from Rías Baixas.", badge: "", price: 24.9, country: "Spain", style: "White", region: "Rías Baixas", grape: "Albariño", image: "https://oleobrigado.com/files/bt_68308909664f2.jpg" }),
  bottle({ id: "cortijo-tinto", producer: "Vinos Atlántico", title: "Cortijo Tinto", note: "Tempranillo from Rioja.", badge: "", price: 19.9, country: "Spain", style: "Red", region: "Rioja", grape: "Tempranillo", image: "https://oleobrigado.com/files/bt_6a01f0b65e1ee.jpeg" }),
  bottle({ id: "cos-pes-albarino", producer: "Forjas del Salnés", title: "Cos Pés Albariño", note: "Albariño from Rías Baixas.", badge: "", price: 26.9, country: "Spain", style: "White", region: "Rías Baixas", grape: "Albariño", image: "https://oleobrigado.com/files/wn_675170522104536.jpg" }),
  bottle({ id: "edicion-los-nietos-albarino", producer: "Lagar de Pintos", title: "Edición Los Nietos Albariño", note: "Albariño from Rías Baixas.", badge: "", price: 30.9, country: "Spain", style: "White", region: "Rías Baixas", grape: "Albariño", image: "https://oleobrigado.com/files/bt_66eaf84ba8157.jpg" }),
  bottle({ id: "elo-monastrell", producer: "Alberto Orte", title: "Elo Monastrell", note: "Monastrell from Yecla.", badge: "", price: 23.9, country: "Spain", style: "Red", region: "Yecla", grape: "Monastrell", image: "https://oleobrigado.com/files/bt_63f505a7bf3f4.jpg" }),
  bottle({ id: "escalada-do-bibei", producer: "Alberto Orte", title: "Escalada Do Bibei", note: "Mencia, Merenzao, Garnacha and Graonegro from Valdeorras.", badge: "", price: 18.9, country: "Spain", style: "Red", region: "Valdeorras", grape: "Mencia, Merenzao, Garnacha and Graonegro", image: "https://oleobrigado.com/files/bt_692dc4dc5f5f9.jpg" }),
  bottle({ id: "escalada-do-sil-blanco", producer: "Alberto Orte", title: "Escalada do Sil Blanco", note: "Godello from Valdeorras.", badge: "", price: 18.9, country: "Spain", style: "White", region: "Valdeorras", grape: "Godello", image: "https://oleobrigado.com/files/bt_692dc4f6d037f.jpg" }),
  bottle({ id: "escalada-do-sil-tinto", producer: "Alberto Orte", title: "Escalada do Sil Tinto", note: "Merenzao, Mencia, Garnacha Tintorera from Valdeorras.", badge: "", price: 20.9, country: "Spain", style: "Red", region: "Valdeorras", grape: "Merenzao, Mencia, Garnacha Tintorera", image: "https://oleobrigado.com/files/bt_692dc5110d2ab.jpg" }),
  bottle({ id: "flaco-tempranillo", producer: "Vinos Atlántico", title: "Flaco Tempranillo", note: "Tempranillo from Vinos de Madrid.", badge: "", price: 30.9, country: "Spain", style: "Red", region: "Vinos de Madrid", grape: "Tempranillo", image: "https://oleobrigado.com/files/bt_6421b1c50a6c3.jpg" }),
  bottle({ id: "gaintza-aitako", producer: "Gaintza", title: "Gaintza Aitako", note: "Hondarrabi Zuri, Chardonnay from Getariako Txakolina.", badge: "", price: 15.9, country: "Spain", style: "White", region: "Getariako Txakolina", grape: "Hondarrabi Zuri, Chardonnay", image: "https://oleobrigado.com/files/bt_6a04a83eeabb0.jpg" }),
  bottle({ id: "gaintza-roses", producer: "Gaintza", title: "Gaintza Roses", note: "Hondarrabi Beltza , Hondarrabi Zuri from Getariako Txakolina.", badge: "", price: 17.9, country: "Spain", style: "Rosé", region: "Getariako Txakolina", grape: "Hondarrabi Beltza , Hondarrabi Zuri", image: "https://oleobrigado.com/files/bottle_730_gaintza-rosesjpg.jpg" }),
  bottle({ id: "gaintza-txakolina-blanco", producer: "Gaintza", title: "Gaintza Txakolina Blanco", note: "Hondarrabi Zuri from Getariako Txakolina.", badge: "", price: 23.9, country: "Spain", style: "White", region: "Getariako Txakolina", grape: "Hondarrabi Zuri", image: "https://oleobrigado.com/files/bottle_731_gaintza-txakolina-bottle-1000pixelsjpg.jpg" }),
  bottle({ id: "goliardo-a-telleira-albarino", producer: "Forjas del Salnés", title: "Goliardo A Telleira Albariño", note: "Albariño from Rías Baixas.", badge: "", price: 25.9, country: "Spain", style: "White", region: "Rías Baixas", grape: "Albariño", image: "https://oleobrigado.com/files/wn_297140304133848.jpg" }),
  bottle({ id: "gordo", producer: "Vinos Atlántico", title: "Gordo", note: "Monastrell from Yecla.", badge: "", price: 18.9, country: "Spain", style: "Red", region: "Yecla", grape: "Monastrell", image: "https://oleobrigado.com/files/bt_6539496ef40f2.jpg" }),
  bottle({ id: "granito-cru-alvarinho", producer: "Luis Seabra Vinhos", title: "Granito Cru Alvarinho", note: "Alvarinho (Albariño ) from Vinho Verde.", badge: "", price: 27.9, country: "Portugal", style: "White", region: "Vinho Verde", grape: "Alvarinho (Albariño )", image: "https://oleobrigado.com/files/bottle_483_granito-cru-alvarinho-2015-mockupjpg.jpg" }),
  bottle({ id: "granito-cru-dao-branco", producer: "Luis Seabra Vinhos", title: "Granito Cru Dão Branco", note: "Encruzado, Bical, Cercial from Dão.", badge: "", price: 27.9, country: "Portugal", style: "White", region: "Dão", grape: "Encruzado, Bical, Cercial", image: "https://oleobrigado.com/files/bt_628d46fbd092c.jpg" }),
  bottle({ id: "indie-xisto", producer: "Luis Seabra Vinhos", title: "Indie Xisto", note: "Tinta Roriz, Touriga Franca, Tinta Amarela, Rufete, Tinta Barroca from Douro.", badge: "", price: 27.9, country: "Portugal", style: "Red", region: "Douro", grape: "Tinta Roriz, Touriga Franca, Tinta Amarela, Rufete, Tinta Barroca", image: "https://oleobrigado.com/files/bottle_677_indie-xistojpg.jpg" }),
  bottle({ id: "ines", producer: "Vizcarra", title: "Inés", note: "Tinto Fino (Tempranillo), Merlot, Albillo Mayor from Ribera del Duero.", badge: "", price: 19.9, country: "Spain", style: "Red", region: "Ribera del Duero", grape: "Tinto Fino (Tempranillo), Merlot, Albillo Mayor", image: "https://oleobrigado.com/files/wn_139130517115554.jpg" }),
  bottle({ id: "isabella-a-proibida", producer: "Azores Wine Company", title: "Isabella a Proibida", note: "Isabella from Azores.", badge: "", price: 29.9, country: "Portugal", style: "White", region: "Azores", grape: "Isabella", image: "https://oleobrigado.com/files/wn_663170111083021.jpg" }),
  bottle({ id: "jc-vizcarra", producer: "Vizcarra", title: "JC Vizcarra", note: "Tinto Fino (Tempranillo) from Ribera del Duero.", badge: "", price: 29.9, country: "Spain", style: "Red", region: "Ribera del Duero", grape: "Tinto Fino (Tempranillo)", image: "https://oleobrigado.com/files/wn_141150626111143.jpg" }),
  bottle({ id: "josefina-pinol-blanco", producer: "Celler Piñol", title: "Josefina Piñol Blanco", note: "Garnacha Blanca (Late Harvest) from Terra Alta.", badge: "", price: 22.9, country: "Spain", style: "White", region: "Terra Alta", grape: "Garnacha Blanca (Late Harvest)", image: "https://oleobrigado.com/files/wn_143160602081903.jpg" }),
  bottle({ id: "l-avi-arrufi-blanc", producer: "Celler Piñol", title: "L'Avi Arrufí Blanc", note: "Garnacha Blanca from Terra Alta.", badge: "", price: 29.9, country: "Spain", style: "White", region: "Terra Alta", grape: "Garnacha Blanca", image: "https://oleobrigado.com/files/bt_68406f31def7a.jpg" }),
  bottle({ id: "l-avi-arrufi-tinto", producer: "Celler Piñol", title: "L'Avi Arrufí Tinto", note: "Cariñena, Garnacha, Syrah from Terra Alta.", badge: "", price: 20.9, country: "Spain", style: "Red", region: "Terra Alta", grape: "Cariñena, Garnacha, Syrah", image: "https://oleobrigado.com/files/wn_150160801065810.jpg" }),
  bottle({ id: "la-antigua-clasico-blanco", producer: "Alberto Orte", title: "La Antigua Clásico Blanco", note: "Viura, Garnacha Blanca, Tempranillo Blanco from Rioja.", badge: "", price: 28.9, country: "Spain", style: "White", region: "Rioja", grape: "Viura, Garnacha Blanca, Tempranillo Blanco", image: "https://oleobrigado.com/files/bottle_526_antigua-blanco-bjpg.jpg" }),
  bottle({ id: "la-antigua-clasico-crianza", producer: "Alberto Orte", title: "La Antigua Clásico Crianza", note: "Tempranillo, Graciano, Garnacha from Rioja.", badge: "", price: 27.9, country: "Spain", style: "Red", region: "Rioja", grape: "Tempranillo, Graciano, Garnacha", image: "https://oleobrigado.com/files/bt_65550228868f3.jpg" }),
  bottle({ id: "la-antigua-clasico-gran-reserva", producer: "Alberto Orte", title: "La Antigua Clásico Gran Reserva", note: "Garnacha, Tempranillo, Graciano from Rioja.", badge: "", price: 38.9, country: "Spain", style: "Red", region: "Rioja", grape: "Garnacha, Tempranillo, Graciano", image: "https://oleobrigado.com/files/bottle_702_la-antigua-clasico-gran-reserva-for-webjpg.jpg" }),
  bottle({ id: "la-antigua-clasico-reserva", producer: "Alberto Orte", title: "La Antigua Clásico Reserva", note: "Garnacha, Tempranillo, Graciano from Rioja.", badge: "", price: 52.9, country: "Spain", style: "Red", region: "Rioja", grape: "Garnacha, Tempranillo, Graciano", image: "https://oleobrigado.com/files/bottle_279_antigua-bottlejpg.jpg" }),
  bottle({ id: "la-cartuja", producer: "Vinos Atlántico", title: "La Cartuja", note: "Garnacha, Mazuelo (Cariñena) from Priorat.", badge: "", price: 33.9, country: "Spain", style: "Red", region: "Priorat", grape: "Garnacha, Mazuelo (Cariñena)", image: "https://oleobrigado.com/files/bt_654264d2f0e7b.jpg" }),
  bottle({ id: "la-nevera-blanco", producer: "La Nevera", title: "La Nevera Blanco", note: "Viura from Vino de Mesa.", badge: "", price: 20.9, country: "Spain", style: "White", region: "Vino de Mesa", grape: "Viura", image: "https://oleobrigado.com/files/bottle_596_blank-1000pixelsjpg.jpg" }),
  bottle({ id: "la-nevera-rosado", producer: "La Nevera", title: "La Nevera Rosado", note: "Garnacha from Vino de Mesa.", badge: "", price: 22.9, country: "Spain", style: "Rosé", region: "Vino de Mesa", grape: "Garnacha", image: "https://oleobrigado.com/files/bottle_595_blank-1000pixelsjpg.jpg" }),
  bottle({ id: "la-nevera-tinto", producer: "La Nevera", title: "La Nevera Tinto", note: "Tempranillo, Garnacha, Graciano, Viura from Vino de Mesa.", badge: "", price: 17.9, country: "Spain", style: "Red", region: "Vino de Mesa", grape: "Tempranillo, Garnacha, Graciano, Viura", image: "https://oleobrigado.com/files/bottle_487_blank-1000pixelsjpg.jpg" }),
  bottle({ id: "lagar-de-pintos-albarino", producer: "Lagar de Pintos", title: "Lagar de Pintos Albariño", note: "Albariño from Rías Baixas.", badge: "", price: 22.9, country: "Spain", style: "White", region: "Rías Baixas", grape: "Albariño", image: "https://oleobrigado.com/files/bt_63878f123ce35.jpg" }),
  bottle({ id: "leirana-albarino", producer: "Forjas del Salnés", title: "Leirana Albariño", note: "Albariño from Rías Baixas.", badge: "", price: 18.9, country: "Spain", style: "White", region: "Rías Baixas", grape: "Albariño", image: "https://oleobrigado.com/files/bottle_280_leirana-albarinojpg.jpg" }),
  bottle({ id: "leirana-finca-genoveva-albarino", producer: "Forjas del Salnés", title: "Leirana Finca Genoveva Albariño", note: "Albariño from Rías Baixas.", badge: "", price: 29.9, country: "Spain", style: "White", region: "Rías Baixas", grape: "Albariño", image: "https://oleobrigado.com/files/bt_69825a466e370.jpg" }),
  bottle({ id: "liquid-geography-mencia-rose", producer: "Vinos Atlántico", title: "Liquid Geography Mencía Rosé", note: "Mencía from Bierzo.", badge: "", price: 15.9, country: "Spain", style: "Rosé", region: "Bierzo", grape: "Mencía", image: "https://oleobrigado.com/files/bt_62eada7e63b4a.jpg" }),
  bottle({ id: "ludovicus-tinto", producer: "Vinos Atlántico", title: "Ludovicus Tinto", note: "Garnacha from Terra Alta.", badge: "", price: 30.9, country: "Spain", style: "Red", region: "Terra Alta", grape: "Garnacha", image: "https://oleobrigado.com/files/bt_64d10ec7725f3.jpg" }),
  bottle({ id: "macanita-branco", producer: "Maçanita Vinhos", title: "Maçanita Branco", note: "Viosinho, Codega do Larinho, Goveio from Douro.", badge: "", price: 31.9, country: "Portugal", style: "White", region: "Douro", grape: "Viosinho, Codega do Larinho, Goveio", image: "https://oleobrigado.com/files/bottle_723_macanita-brancojpg.jpg" }),
  bottle({ id: "macanita-sousao-letra-a", producer: "Maçanita Vinhos", title: "Maçanita Sousão Letra A", note: "Sousão from Douro.", badge: "", price: 28.9, country: "Portugal", style: "Red", region: "Douro", grape: "Sousão", image: "https://oleobrigado.com/files/bt_6a2ac398416dc.jpg" }),
  bottle({ id: "macanita-tinto", producer: "Maçanita Vinhos", title: "Maçanita Tinto", note: "Touriga Naçional, Sousão, Field Blend from Douro.", badge: "", price: 23.9, country: "Portugal", style: "Red", region: "Douro", grape: "Touriga Naçional, Sousão, Field Blend", image: "https://oleobrigado.com/files/bottle_724_macanita-tintojpg.jpg" }),
  bottle({ id: "mata-cream-sherry", producer: "Mata", title: "Mata Cream Sherry", note: "Palomino Fino from Jerez-Xérès-Sherry.", badge: "", price: 29.9, country: "Spain", style: "White", region: "Jerez-Xérès-Sherry", grape: "Palomino Fino", image: "https://oleobrigado.com/files/bt_622a647e47640.jpg" }),
  bottle({ id: "mata-vermouth-blanco", producer: "Mata", title: "Mata Vermouth Blanco", note: "Godello from Bierzo.", badge: "", price: 21.9, country: "Spain", style: "White", region: "Bierzo", grape: "Godello", image: "https://oleobrigado.com/files/bottle_697_mata-vermouth-blanco-bottle-1000pixels-v2jpg.jpg" }),
  bottle({ id: "mata-vermouth-tinto", producer: "Mata", title: "Mata Vermouth Tinto", note: "Mencia and Godello from Bierzo.", badge: "", price: 30.9, country: "Spain", style: "Red", region: "Bierzo", grape: "Mencia and Godello", image: "https://oleobrigado.com/files/bt_68938468d1748.jpg" }),
  bottle({ id: "mather-teresina", producer: "Celler Piñol", title: "Mather Teresina", note: "Garnacha, Cariñena, Morenillo from Terra Alta.", badge: "", price: 21.9, country: "Spain", style: "Red", region: "Terra Alta", grape: "Garnacha, Cariñena, Morenillo", image: "https://oleobrigado.com/files/wn_154110815075513.jpg" }),
  bottle({ id: "mono-c-castelao", producer: "Luis Seabra Vinhos", title: "Mono C - Castelão", note: "Castelão from Douro.", badge: "", price: 27.9, country: "Portugal", style: "Red", region: "Douro", grape: "Castelão", image: "https://oleobrigado.com/files/bottle_787_mono-c-bottle-1000pixelsjpg.jpg" }),
  bottle({ id: "muti-albarino", producer: "Alberto Orte", title: "Muti Albariño", note: "Albariño from Rías Baixas.", badge: "", price: 24.9, country: "Spain", style: "White", region: "Rías Baixas", grape: "Albariño", image: "https://oleobrigado.com/files/bottle_158_muti-albarinojpg.jpg" }),
  bottle({ id: "naveran-brut-nature", producer: "Naveran", title: "Naveran Brut Nature", note: "Macabeo, Parellada, Chardonnay, Xarello from Penedès.", badge: "", price: 19.9, country: "Spain", style: "Sparkling", region: "Penedès", grape: "Macabeo, Parellada, Chardonnay, Xarello", image: "https://oleobrigado.com/files/wn_260131015083039.jpg" }),
  bottle({ id: "naveran-brut-vintage", producer: "Naveran", title: "Naveran Brut Vintage", note: "Xarello, Macabeo, Parellada from Penedès.", badge: "", price: 21.9, country: "Spain", style: "Sparkling", region: "Penedès", grape: "Xarello, Macabeo, Parellada", image: "https://oleobrigado.com/files/wn_161110711135715 .jpg" }),
  bottle({ id: "naveran-brut-vintage-rosado", producer: "Naveran", title: "Naveran Brut Vintage Rosado", note: "Pinot Noir & Parellada from Penedès.", badge: "", price: 22.9, country: "Spain", style: "Sparkling", region: "Penedès", grape: "Pinot Noir & Parellada", image: "https://oleobrigado.com/files/bt_6a04db40c697a.jpg" }),
  bottle({ id: "naveran-dama", producer: "Naveran", title: "Naveran Dama", note: "Chardonnay, Parellada from Penedès.", badge: "", price: 18.9, country: "Spain", style: "White", region: "Penedès", grape: "Chardonnay, Parellada", image: "https://oleobrigado.com/files/wn_162110706090857a.jpg" }),
  bottle({ id: "nordes-atlantic-gin", producer: "Nordés", title: "Nordés Atlantic Gin", note: "Albariño from Galicia.", badge: "", price: 34.9, country: "Spain", style: "Gin & spirits", region: "Galicia", grape: "Albariño", image: "https://oleobrigado.com/files/bt_64f8916f86954.jpg" }),
  bottle({ id: "nortico-alvarinho", producer: "Vinos Atlántico", title: "Nortico Alvarinho", note: "Alvarinho (Albariño) from Vinho Regional Minho.", badge: "", price: 30.9, country: "Portugal", style: "White", region: "Vinho Regional Minho", grape: "Alvarinho (Albariño)", image: "https://oleobrigado.com/files/bt_6984f063d7bbd.jpg" }),
  bottle({ id: "o-ancestral-branco", producer: "Fitapreta", title: "O Ancestral Branco", note: "Roupeiro, Rabo de Ovelha, Antão Vaz, Tamarez, Alicante Branco, Arinto. from Vinho Regional Alentejano.", badge: "", price: 23.9, country: "Portugal", style: "White", region: "Vinho Regional Alentejano", grape: "Roupeiro, Rabo de Ovelha, Antão Vaz, Tamarez, Alicante Branco, Arinto.", image: "https://oleobrigado.com/files/bt_66f1abf469519.jpg" }),
  bottle({ id: "o-raio-da-vella-albarino", producer: "Rodrigo Méndez", title: "O Raio da Vella Albariño", note: "Albariño from Rías Baixas.", badge: "", price: 28.9, country: "Spain", style: "White", region: "Rías Baixas", grape: "Albariño", image: "https://oleobrigado.com/files/bottle_795_o-raio-da-vella-albarino-bottle-1000pixelsjpg.jpg" }),
  bottle({ id: "oro-de-castilla-verdejo", producer: "Bodega Hermanos del Villar", title: "Oro de Castilla Verdejo", note: "Verdejo from Rueda.", badge: "", price: 21.9, country: "Spain", style: "White", region: "Rueda", grape: "Verdejo", image: "https://oleobrigado.com/files/bt_671ba0363443a.jpg" }),
  bottle({ id: "osborne-amontillado-51-1a-1830-vors", producer: "Bodegas Osborne", title: "Osborne Amontillado 51-1A (1830) VORS", note: "Palomino from Jerez-Xérès-Sherry.", badge: "", price: 53.9, country: "Spain", style: "White", region: "Jerez-Xérès-Sherry", grape: "Palomino", image: "https://oleobrigado.com/files/bottle_264_vors-amontillado-bottlejpg.jpg" }),
  bottle({ id: "osborne-capuchino-palo-cortado-1790-vors", producer: "Bodegas Osborne", title: "Osborne Capuchino Palo Cortado (1790) VORS", note: "Palomino from Jerez-Xérès-Sherry.", badge: "", price: 49.9, country: "Spain", style: "White", region: "Jerez-Xérès-Sherry", grape: "Palomino", image: "https://oleobrigado.com/files/bottle_266_osborne-vors-capuchino-bottle-1000pixelsjpg.jpg" }),
  bottle({ id: "osborne-sibarita-oloroso-1792-vors", producer: "Bodegas Osborne", title: "Osborne Sibarita Oloroso (1792) VORS", note: "Palomino, Pedro Ximénez from Jerez-Xérès-Sherry.", badge: "", price: 57.9, country: "Spain", style: "White", region: "Jerez-Xérès-Sherry", grape: "Palomino, Pedro Ximénez", image: "https://oleobrigado.com/files/bottle_532_osborne-vors-sibarita-bottle-1000pixelsjpg.jpg" }),
  bottle({ id: "osborne-venerable-px-1902-vors", producer: "Bodegas Osborne", title: "Osborne Venerable PX (1902) VORS", note: "Pedro Ximenez from Jerez-Xérès-Sherry.", badge: "", price: 66.9, country: "Spain", style: "White", region: "Jerez-Xérès-Sherry", grape: "Pedro Ximenez", image: "https://oleobrigado.com/files/bottle_381_vors-venerable-bottlejpg.jpg" }),
  bottle({ id: "perles-roses-cuvee-antonia", producer: "Naveran", title: "Perles Roses Cuvée Antonia", note: "Pinot Noir from Penedès.", badge: "", price: 31.9, country: "Spain", style: "Sparkling", region: "Penedès", grape: "Pinot Noir", image: "https://oleobrigado.com/files/wn_170110815080149.jpg" }),
  bottle({ id: "pie-franco-albarino", producer: "Lagar de Pintos", title: "Pie Franco Albariño", note: "Albariño from Rías Baixas.", badge: "", price: 23.9, country: "Spain", style: "White", region: "Rías Baixas", grape: "Albariño", image: "https://oleobrigado.com/files/bt_63e553aa270c7.jpg" }),
  bottle({ id: "poco-do-lobo-cabernet", producer: "Caves São João", title: "Poço do Lobo Cabernet", note: "Cabernet Sauvignon from Vinho Regional Beiras.", badge: "", price: 33.9, country: "Portugal", style: "Red", region: "Vinho Regional Beiras", grape: "Cabernet Sauvignon", image: "https://oleobrigado.com/files/bt_62f2d3c57d435.jpg" }),
  bottle({ id: "porta-dos-cavaleiros-reserva-branco", producer: "Caves São João", title: "Porta Dos Cavaleiros Reserva Branco", note: "Bical, Malvasia, Encruzado from Dão.", badge: "", price: 15.9, country: "Portugal", style: "White", region: "Dão", grape: "Bical, Malvasia, Encruzado", image: "https://oleobrigado.com/files/wn_464150624064703.jpg" }),
  bottle({ id: "portal-blanco", producer: "Celler Piñol", title: "Portal Blanco", note: "Garnacha Blanca, Sauvignon Blanc, Viognier from Terra Alta.", badge: "", price: 30.9, country: "Spain", style: "White", region: "Terra Alta", grape: "Garnacha Blanca, Sauvignon Blanc, Viognier", image: "https://oleobrigado.com/files/bottle_707_portal-blanco-bottlejpg.jpg" }),
  bottle({ id: "portal-tinto", producer: "Celler Piñol", title: "Portal Tinto", note: "Garnacha, Cariñena, Syrah from Terra Alta.", badge: "", price: 30.0, country: "Spain", style: "Red", region: "Terra Alta", grape: "Garnacha, Cariñena, Syrah", image: "https://oleobrigado.com/files/bottle_171_portal-tinto-2015-bottle-1000pixelsjpg.jpg" }),
  bottle({ id: "quinta-da-pellada-alto-tinto", producer: "Pellada & Saes", title: "Quinta da Pellada Alto Tinto", note: "Field Blend from Dão.", badge: "", price: 28.9, country: "Portugal", style: "Red", region: "Dão", grape: "Field Blend", image: "https://oleobrigado.com/files/bt_69b30b9e23a96.jpg" }),
  bottle({ id: "quinta-de-saes-estagio-prolongado-reserva", producer: "Pellada & Saes", title: "Quinta de Saes Estágio Prolongado Reserva", note: "Touriga Naçional, Alfrocheiro, Jaen, Red Blend from Dão.", badge: "", price: 32.9, country: "Portugal", style: "Red", region: "Dão", grape: "Touriga Naçional, Alfrocheiro, Jaen, Red Blend", image: "https://oleobrigado.com/files/bottle_701_qds-rsva-esta-prolongadojpg.jpg" }),
  bottle({ id: "quinta-de-saes-tinto", producer: "Pellada & Saes", title: "Quinta de Saes Tinto", note: "Touriga Naçional, Alfrocheiro, Jaen, Tinta Pinheira. from Dão.", badge: "", price: 19.9, country: "Portugal", style: "Red", region: "Dão", grape: "Touriga Naçional, Alfrocheiro, Jaen, Tinta Pinheira.", image: "https://oleobrigado.com/files/bt_68d2ab518df7a.jpg" }),
  bottle({ id: "quinta-de-saes-touriga-nacional", producer: "Pellada & Saes", title: "Quinta de Saes Touriga Nacional", note: "Touriga Naçional from Dão.", badge: "", price: 28.9, country: "Portugal", style: "Red", region: "Dão", grape: "Touriga Naçional", image: "https://oleobrigado.com/files/bottle_760_quinta-de-saes-touriga-nacional-bottle-1000-pixelsjpg.jpg" }),
  bottle({ id: "raig-de-raim-blanc", producer: "Celler Piñol", title: "Raig de Raïm Blanc", note: "Garnacha Blanca from Terra Alta.", badge: "", price: 26.9, country: "Spain", style: "White", region: "Terra Alta", grape: "Garnacha Blanca", image: "https://oleobrigado.com/files/bottle_833_raig-de-raim-pinot-garnacha-blanca-2019-bottle-sans-vintage-1000pixelsjpg.jpg" }),
  bottle({ id: "raig-de-raim-tinto", producer: "Celler Piñol", title: "Raig de Raïm Tinto", note: "Garnacha, Cariñena & Syrah from Terra Alta.", badge: "", price: 17.9, country: "Spain", style: "Red", region: "Terra Alta", grape: "Garnacha, Cariñena & Syrah", image: "https://oleobrigado.com/files/bottle_834_raig-de-raim-pinot-garnacha-negra-2017-bottle-sans-vintage-1000pixelsjpg.jpg" }),
  bottle({ id: "rose-vulcanico", producer: "Azores Wine Company", title: "Rosé Vulcânico", note: "Saborinho, Agronomica, Aragones, Touriga Nacional from Azores.", badge: "", price: 16.9, country: "Portugal", style: "Rosé", region: "Azores", grape: "Saborinho, Agronomica, Aragones, Touriga Nacional", image: "https://oleobrigado.com/files/bottle_664_rose-vulcanicojpg.jpg" }),
  bottle({ id: "sacristia-ab-manzanilla", producer: "Antonio Barbadillo Mateos", title: "Sacristía AB Manzanilla", note: "Palomino Fino from Jerez-Xérès-Sherry.", badge: "", price: 44.9, country: "Spain", style: "White", region: "Jerez-Xérès-Sherry", grape: "Palomino Fino", image: "https://oleobrigado.com/files/wn_329140403210813.jpg" }),
  bottle({ id: "salvora-albarino", producer: "Rodrigo Méndez", title: "Sálvora Albariño", note: "Albariño from Rías Baixas.", badge: "", price: 30.9, country: "Spain", style: "White", region: "Rías Baixas", grape: "Albariño", image: "https://oleobrigado.com/files/wn_340160504103704.jpg" }),
  bottle({ id: "senda-del-oro", producer: "Vizcarra", title: "Senda del Oro", note: "Tinto Fino (Tempranillo) from Ribera del Duero.", badge: "", price: 27.9, country: "Spain", style: "Red", region: "Ribera del Duero", grape: "Tinto Fino (Tempranillo)", image: "https://oleobrigado.com/files/wn_222160801104414.jpg" }),
  bottle({ id: "sierra-de-la-demanda-blanco", producer: "Alberto Orte", title: "Sierra de la Demanda Blanco", note: "Viura, Garnacha Blanca from Rioja.", badge: "", price: 25.9, country: "Spain", style: "White", region: "Rioja", grape: "Viura, Garnacha Blanca", image: "https://oleobrigado.com/files/bt_63f505e9c6cee.jpg" }),
  bottle({ id: "sierra-de-la-demanda-tinto", producer: "Alberto Orte", title: "Sierra de la Demanda Tinto", note: "Garnacha, Tempranillo, Viura from Rioja.", badge: "", price: 28.9, country: "Spain", style: "Red", region: "Rioja", grape: "Garnacha, Tempranillo, Viura", image: "https://oleobrigado.com/files/bottle_521_sierra-de-la-demanda-tinto-2015-bottle-1000pixelsjpg.jpg" }),
  bottle({ id: "tinto-vulcanico", producer: "Azores Wine Company", title: "Tinto Vulcânico", note: "Field Blend from Azores.", badge: "", price: 18.9, country: "Portugal", style: "Red", region: "Azores", grape: "Field Blend", image: "https://oleobrigado.com/files/bottle_786_tinto-vulcanico-2017-bottle-1000pixelsjpg.jpg" }),
  bottle({ id: "torremoron-tinto", producer: "Torremorón", title: "Torremorón Tinto", note: "Tempranillo (Tinto Fino) from Ribera del Duero.", badge: "", price: 19.9, country: "Spain", style: "Red", region: "Ribera del Duero", grape: "Tempranillo (Tinto Fino)", image: "https://oleobrigado.com/files/wn_184160714114125.jpg" }),
  bottle({ id: "totus-tuus-cava-reserva", producer: "Vinos Atlántico", title: "Totus Tuus Cava Reserva", note: "Chardonnay, Xarello, Macabeu, Parellada, Pinot Noir from Penedès.", badge: "", price: 23.9, country: "Spain", style: "Sparkling", region: "Penedès", grape: "Chardonnay, Xarello, Macabeu, Parellada, Pinot Noir", image: "https://oleobrigado.com/files/bt_651197187f52a.jpg" }),
  bottle({ id: "touriga-nacional-em-rose", producer: "Maçanita Vinhos", title: "Touriga Nacional Em Rosé", note: "Touriga Naçional from Douro.", badge: "", price: 18.9, country: "Portugal", style: "Rosé", region: "Douro", grape: "Touriga Naçional", image: "https://oleobrigado.com/files/bt_645ba3ed4cfa9.jpg" }),
  bottle({ id: "vara-y-pulgar-tinto", producer: "Alberto Orte", title: "Vara y Pulgar Tinto", note: "Tintilla from Vino de la Tierra de Cádiz.", badge: "", price: 28.9, country: "Spain", style: "Red", region: "Vino de la Tierra de Cádiz", grape: "Tintilla", image: "https://oleobrigado.com/files/bt_68b829a680ebc.jpg" }),
  bottle({ id: "vera-vinho-verde-branco", producer: "Vinos Atlántico", title: "Vera Vinho Verde Branco", note: "Arinto, Azal, Loureiro from Vinho Verde.", badge: "", price: 31.9, country: "Portugal", style: "White", region: "Vinho Verde", grape: "Arinto, Azal, Loureiro", image: "https://oleobrigado.com/files/bt_62ea8272f21e2.jpg" }),
  bottle({ id: "vera-vinho-verde-rose", producer: "Vinos Atlántico", title: "Vera Vinho Verde Rosé", note: "Vinhao, Rabo de Anho from Vinho Verde.", badge: "", price: 14.9, country: "Portugal", style: "Rosé", region: "Vinho Verde", grape: "Vinhao, Rabo de Anho", image: "https://oleobrigado.com/files/bottle_270_vera-rose-2020jpg.jpg" }),
  bottle({ id: "verdelho-o-original", producer: "Azores Wine Company", title: "Verdelho o Original", note: "Verdelho from Azores.", badge: "", price: 25.9, country: "Portugal", style: "White", region: "Azores", grape: "Verdelho", image: "https://oleobrigado.com/files/bottle_537_verdelho-o-originaljpg.jpg" }),
  bottle({ id: "vizcarra-rosado", producer: "Vizcarra", title: "Vizcarra Rosado", note: "Tinto Fino (Tempranillo), Garnacha from Ribera del Duero.", badge: "", price: 23.9, country: "Spain", style: "Rosé", region: "Ribera del Duero", grape: "Tinto Fino (Tempranillo), Garnacha", image: "https://oleobrigado.com/files/bt_628d4c135700b.jpg" }),
  bottle({ id: "xisto-cru-branco", producer: "Luis Seabra Vinhos", title: "Xisto Cru Branco", note: "Rabigato, Codega, Gouveio, Viosinho from Douro.", badge: "", price: 18.9, country: "Portugal", style: "White", region: "Douro", grape: "Rabigato, Codega, Gouveio, Viosinho", image: "https://oleobrigado.com/files/bottle_485_xisto-cru-brancojpg.jpg" }),
  bottle({ id: "xisto-cru-tinto", producer: "Luis Seabra Vinhos", title: "Xisto Cru Tinto", note: "Rufete, Touriga Franca, Tinta Carvalha, Alicante Bouchet, Tinta Roriz, Donzelinho Tinto, Malvasia Preta from Douro.", badge: "", price: 22.9, country: "Portugal", style: "Red", region: "Douro", grape: "Rufete, Touriga Franca, Tinta Carvalha, Alicante Bouchet, Tinta Roriz, Donzelinho Tinto, Malvasia Preta", image: "https://oleobrigado.com/files/bottle_486_xisto-cru-tinto-bottlejpg.jpg" }),
  bottle({ id: "xisto-ilimitado-branco", producer: "Luis Seabra Vinhos", title: "Xisto Ilimitado Branco", note: "Rabigato, Gouveio, Códega, Viosinho from Douro.", badge: "", price: 16.9, country: "Portugal", style: "White", region: "Douro", grape: "Rabigato, Gouveio, Códega, Viosinho", image: "https://oleobrigado.com/files/bt_696fd07f73d98.jpg" }),
  bottle({ id: "xisto-ilimitado-tinto", producer: "Luis Seabra Vinhos", title: "Xisto Ilimitado Tinto", note: "Touriga Franca, Tinta Amarella, Tinta Roriz, Rufete, Tinta Barroca, Malvasia Petra, Dozelinho Tinto. from Douro.", badge: "", price: 28.9, country: "Portugal", style: "Red", region: "Douro", grape: "Touriga Franca, Tinta Amarella, Tinta Roriz, Rufete, Tinta Barroca, Malvasia Petra, Dozelinho Tinto.", image: "https://oleobrigado.com/files/bottle_616_xisto-ilimitado-tintojpg.jpg" }),
  bottle({ id: "zestos-blanco", producer: "Vinos Atlántico", title: "Zestos Blanco", note: "Malvar from Vinos de Madrid.", badge: "", price: 23.9, country: "Spain", style: "White", region: "Vinos de Madrid", grape: "Malvar", image: "https://oleobrigado.com/files/bt_658051e95def7.jpg" }),
  bottle({ id: "zestos-old-vine-garnacha", producer: "Vinos Atlántico", title: "Zestos Old Vine Garnacha", note: "Garnacha from Vinos de Madrid.", badge: "", price: 25.9, country: "Spain", style: "Red", region: "Vinos de Madrid", grape: "Garnacha", image: "https://oleobrigado.com/files/bt_6491e2e54bd3e.jpg" }),
  bottle({ id: "zestos-rosado", producer: "Vinos Atlántico", title: "Zestos Rosado", note: "Garnacha from Vinos de Madrid.", badge: "", price: 19.9, country: "Spain", style: "Rosé", region: "Vinos de Madrid", grape: "Garnacha", image: "https://oleobrigado.com/files/bt_69e141a3a8f28.jpg" }),
];

// --- Derived views over PRODUCTS ---

const SEASONAL_IDS = ["leirana-albarino", "nortico-alvarinho", "oro-de-castilla-verdejo", "granito-cru-dao-branco"];
const SEASONAL_PRODUCTS = SEASONAL_IDS.map(id => PRODUCTS.find(p => p.id === id)).filter(Boolean);

// Product detail is per-product (product.html?id=...) — see product.js for how
// it looks up the current bottle, its specs (built only from real fields we
// actually have), and its related list. No fixed "the" featured product here.
