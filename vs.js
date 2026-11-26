// SUCTION식 구성용 데이터: 기존 방식 → 새 방식 비교(vs), 디테일 클로즈업(close)
// 비교 그림은 단순한 선 다이어그램 (viewBox 360×220)
(() => {
  const S = (inner) => `<svg viewBox="0 0 360 220" class="vsg" xmlns="http://www.w3.org/2000/svg">${inner}</svg>`;
  const ceil = `<line x1="20" y1="40" x2="340" y2="40" class="k"/><path d="M20 40 l-8 -8 M60 40 l-8 -8 M100 40 l-8 -8 M140 40 l-8 -8 M180 40 l-8 -8 M220 40 l-8 -8 M260 40 l-8 -8 M300 40 l-8 -8 M340 40 l-8 -8" class="t"/>`;
  const rays = (x1, x2, y, n, len, cls = "r") => Array.from({ length: n }, (_, i) => { const x = x1 + (x2 - x1) * i / (n - 1); return `<line x1="${x}" y1="${y}" x2="${x}" y2="${y + len}" class="${cls}"/>`; }).join("");
  const person = (x, y, f = 1) => `<circle cx="${x}" cy="${y}" r="11" class="k"/><path d="M${x - 18 * f} ${y + 46} q${18 * f} -34 ${36 * f} 0" class="k"/>`;
  const table = `<line x1="30" y1="170" x2="330" y2="170" class="k"/><line x1="40" y1="170" x2="40" y2="205" class="k"/><line x1="320" y1="170" x2="320" y2="205" class="k"/>`;

  const G = {
    flos: [
      S(`${ceil}<rect x="110" y="40" width="140" height="14" class="k f"/>${rays(118, 242, 62, 7, 70)}<text x="180" y="200" class="tx1">flat edge, light only below</text>`),
      S(`${ceil}<path d="M98 40 v8 h10 v8 h10 v8 h124 v-8 h10 v-8 h10 v-8" class="k f"/><path d="M98 48 h10 M108 56 h10 M242 56 h10 M252 48 h10" class="a"/>${rays(126, 234, 72, 6, 60)}<path d="M92 50 q-14 10 -20 26 M268 50 q14 10 20 26" class="r"/><text x="180" y="200" class="tx1">each tier carries a line of light</text>`)
    ],
    "multi-lighting": [
      S(`${[0, 1, 2, 3].map(i => { const x = 40 + i * 78; const shp = ["M0 0 h40 v26 h-40z", "M0 0 h40 l-8 26 h-24z", "M20 0 a20 13 0 1 1 0 26 a20 13 0 1 1 0 -26", "M0 8 h40 v18 h-40z M8 0 h24 v8"][i]; return `<path transform="translate(${x} 50)" d="${shp}" class="k"/><rect x="${x + 6}" y="120" width="28" height="22" class="t"/><line x1="${x + 20}" y1="82" x2="${x + 20}" y2="114" class="t"/>`; }).join("")}<text x="180" y="170" class="tx2">4 lights · 4 dies</text><text x="180" y="200" class="tx1">a new tool for every room</text>`),
      S(`<rect x="60" y="86" width="44" height="30" class="k f"/><rect x="70" y="124" width="24" height="18" class="t"/><path d="M110 100 h40 M142 94 l8 6 -8 6" class="k"/><rect x="170" y="56" width="22" height="58" class="k f"/><path d="M181 50 v-8 M181 120 v8" class="a"/><line x1="230" y1="40" x2="230" y2="92" class="t"/><line x1="320" y1="40" x2="320" y2="92" class="t"/><rect x="214" y="92" width="122" height="14" class="k f"/>${rays(222, 328, 112, 6, 36)}<text x="180" y="170" class="tx2">1 die · wall + pendant</text><text x="180" y="200" class="tx1">cut to length, combine parts</text>`)
    ],
    "linear-desk": [
      S(`${table}${person(70, 110)}${person(290, 110)}<path d="M180 170 v-70 l26 -16" class="k"/><path d="M196 78 l26 -2 4 14 -24 6z" class="k f"/><path d="M212 96 l-14 60" class="r"/><text x="180" y="40" class="tx2">a lamp head in between</text>`),
      S(`${table}${person(70, 110)}${person(290, 110)}<path d="M110 170 v-76 q0 -6 6 -6 h128 q6 0 6 6 v76" class="k"/><line x1="118" y1="90" x2="242" y2="90" class="a"/>${rays(124, 236, 96, 7, 60)}<text x="180" y="40" class="tx2">one line, even along the table</text>`)
    ],
    "clear-sconce": [
      S(`<line x1="70" y1="20" x2="70" y2="200" class="k"/><path d="M70 20 l-8 8 M70 60 l-8 8 M70 100 l-8 8 M70 140 l-8 8 M70 180 l-8 8" class="t"/><rect x="70" y="80" width="70" height="60" class="k f"/><path d="M150 110 h40" class="r"/><text x="230" y="114" class="tx3">a closed box</text>`),
      S(`<line x1="70" y1="20" x2="70" y2="200" class="k"/><path d="M70 20 l-8 8 M70 60 l-8 8 M70 100 l-8 8 M70 140 l-8 8 M70 180 l-8 8" class="t"/><rect x="70" y="96" width="44" height="28" class="k f"/><path d="M78 96 v-26 q0 -16 18 -22 M78 124 v26 q0 16 18 22" class="a"/><path d="M76 66 q-2 -30 -2 -40 M76 154 q-2 30 -2 40" class="r"/><text x="230" y="114" class="tx3">light runs the acrylic</text>`)
    ],
    "cove-studies": [
      S(`${ceil}<path d="M60 40 v30 h60 v-14 h120 v14 h60 v-30" class="k"/><text x="180" y="130" class="big">?</text><text x="180" y="200" class="tx1">decided after it is built</text>`),
      S(`${[0, 1, 2].map(i => `<rect x="${44 + i * 96}" y="56" width="80" height="56" class="k f"/><path d="M${52 + i * 96} 70 h64" class="${i === 1 ? "a" : "r"}"/>`).join("")}<path d="M172 128 l8 8 16 -18" class="k"/><text x="180" y="200" class="tx1">chosen from renders first</text>`)
    ]
  };

  const V = {
    flos: { head: ["Let the edge", "carry the light."], a: ["Conventional panel", "A flat white panel stuck to the ceiling. The edge is dead; all the light goes straight down."], b: ["FLOS", "Clear PC tiers step around an edge-lit panel. Every tier catches a little stray light, so the outline glows like layered glass."], from: "Flat panel", to: "Layered edge",
      close: ["flos-d2.webp"] },
    "multi-lighting": { head: ["Let one die", "make the whole family."], a: ["One light, one tool", "Every room needs its own light, and every light its own extrusion and injection tools. Small volumes never pay them back."], b: ["Multi Lighting", "One 27.6 × 70.4 mm extrusion is cut to length and combined with wings, end caps and a diffuser — a wall light and a pendant from the same die."], from: "Tool per product", to: "One die, many products",
      close: ["multi-d1.webp"] },
    "linear-desk": { head: ["Take the lamp head", "off the table."], a: ["Desk lamp", "A lamp head stands between the people across the table and lights only one spot."], b: ["Linear Table Light", "A slim bar bends into its legs in one stroke and spreads light evenly along the whole table."], from: "Point light", to: "Line of light",
      close: ["linear-d1.webp", "linear-d2.webp"] },
    "clear-sconce": { head: ["Let the material", "carry the light."], a: ["Shaded box", "A closed shade hides the source; the wall around it stays flat."], b: ["Clear Wall Sconce", "Two curled acrylic blades guide light through their thickness, glow at the edge and wash the wall above and below."], from: "Shade", to: "Light guide",
      close: ["sconce-d1.webp", "sconce-d2.webp"] }
  };
  V["industrial-pendant"] = { head: ["Light the table", "and the ceiling."], a: ["Plain linear pendant", "A bar that lights only the table. The ceiling above goes dark and the room feels lower."], b: ["Lumen Line", "21 W down onto the table, 11 W warm indirect light up to the ceiling, finished with satin-plated metal hardware."], from: "Down only", to: "Up + down",
    close: ["multi-d2.webp"] };
  G["industrial-pendant"] = [
    S(`${ceil}<line x1="180" y1="40" x2="180" y2="96" class="t"/><rect x="90" y="96" width="180" height="12" class="k f"/>${rays(100, 260, 114, 7, 56)}<text x="180" y="200" class="tx1">ceiling left in the dark</text>`),
    S(`${ceil}<line x1="160" y1="40" x2="110" y2="96" class="t"/><line x1="200" y1="40" x2="250" y2="96" class="t"/><rect x="90" y="96" width="180" height="12" class="k f"/><rect x="84" y="96" width="8" height="12" class="k f"/><rect x="268" y="96" width="8" height="12" class="k f"/><line x1="96" y1="96" x2="264" y2="96" class="a"/><line x1="96" y1="108" x2="264" y2="108" class="a"/>${rays(100, 260, 114, 7, 56)}<path d="M110 92 q-20 -30 -40 -44 M250 92 q20 -30 40 -44 M180 92 v-40" class="r"/><text x="180" y="200" class="tx1">21 W down · 11 W up</text>`)
  ];
  for (const k in V) V[k].svg = G[k];
  window.VS = V;
})();
