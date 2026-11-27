// 포트폴리오 내용은 전부 여기서 수정.
// gallery: 한 줄에 이미지 1장(크게) 또는 2장(반반)
window.SITE = {
  name: "HOJUN YU",
  role: "Industrial Designer",
  statement: "One designer, the whole process — from the first sketch to engineered parts, 3D-printed mockups and the final image.",
  statementKr: "스케치, 설계, 3D 프린팅 목업, 렌더링. 제품이 태어나는 모든 단계를 한 사람이 끝까지 쥐고 간다.",
  email: "jamp0712@naver.com",
  instagram: "",
  behance: "",
  about: [
    "Industrial designer in Seoul who works as a multi-player: concept and form design, production-ready 3D engineering, 3D printing and mockup assembly, and photoreal rendering — all in one hand.",
    "I use AI as a real part of the toolkit — Midjourney for fast direction and mood, Claude and ChatGPT for research, specs and documentation — so ideas move from concept to tested prototype faster."
  ],
  // 역량 (Info 섹션)
  capabilities: [
    { t: "Product Design", d: "Form, proportion and detail — from the first sketch to a finished object." },
    { t: "3D Engineering", d: "Production-ready parts modeled in Rhino, down to brackets and end caps." },
    { t: "3D Printing & Mockup", d: "Printed, assembled and tested at full scale before tooling." },
    { t: "Rendering", d: "Photoreal scenes in KeyShot that sell the idea before it exists." },
    { t: "AI-assisted Design", d: "Midjourney for direction, Claude and ChatGPT for research and specs." }
  ],
  skills: ["Rhino", "KeyShot", "Illustrator", "Photoshop", "Midjourney", "Claude", "ChatGPT", "Sketching"]
};

window.PROJECTS = [
  {
    slug: "flos",
    theme: "light",
    tagline: "Light, right to the edge.",
    title: "Raemian FLOS",
    kr: "래미안 플로스",
    category: "Ceiling Light",
    year: "2026",
    role: "Product Design · 3D Modeling · Rendering",
    client: "Raemian — design proposal",
    summary: "A flush-mount main light for Raemian residences. Stacked tiers of clear PC wrap an edge-lit panel, so the outline glows like layered glass — a premium object on the ceiling, only 45 mm thin.",
    body: [
      "FLOS started from one question: how can a flat ceiling light feel lighter than the ceiling it sits on? The answer was a layered, transparent rim that wraps a warm diffuser and turns its edge into a soft line of light.",
      "The same rim and trim were developed into three sizes — living room, master bedroom and bedroom — and tested in room scenes to check how each one holds its space."
    ],
    chip: "flos-08.webp",
    cover: "flos-24.webp",
    gallery: [
      ["flos-01.webp"],
            ["flos-07.webp", "flos-08.webp"],
      ["flos-16.webp"],
      ["flos-10.webp"],
      ["flos-14.webp"],
      ["flos-22.webp"]
    ]
  },
  {
    slug: "clear-sconce",
    theme: "dark",
    tagline: "Glass that carries light.",
    title: "Clear Wall Sconce",
    kr: "아크릴 벽등",
    category: "Wall Light",
    year: "2026",
    role: "Product Design · Rendering",
    client: "In-house",
    summary: "A brushed aluminum band between two curled blades of clear acrylic — light runs through the blades, glows at their edges and washes the wall above and below.",
    body: [
      "The acrylic is bent rather than framed, so each edge becomes a light guide. The metal body stays simple to let the glow on the wall do the work."
    ],
    chip: "sconce-d1.webp",
    cover: "multi-03.webp",
    gallery: [
      ["multi-02.webp"]
    ]
  },
  {
    slug: "multi-lighting",
    theme: "light",
    tagline: "One profile. Two lights.",
    title: "Multi Lighting",
    kr: "멀티라이팅 벽등 · 펜던트",
    category: "Wall & Pendant",
    year: "2026",
    role: "Design · Engineering · Mockup · Rendering",
    client: "Product Development Team",
    summary: "One extrusion, a whole family of lights. A wall light and a pendant built from the same aluminum body, hook-on painted wings, layered end caps and a translucent acrylic diffuser — designed so one die can cover many rooms.",
    body: [
      "The family shares one 27.6 × 70.4 mm extrusion. Only the cut length changes, so the wall light and the pendant sit together in one space and in one production line.",
      "All ten parts were engineered in Rhino, 3D-printed and test-fitted in FDM and TPU, then issued to the mockup vendor with a part-by-part spec sheet — size, quantity and finish for every piece."
    ],
    chip: "multi-d1.webp",
    cover: "multi-01.webp",
    gallery: [
      ["multi-05.webp"],
      ["multi-08.webp"]
    ]
  },
  {
    slug: "industrial-pendant",
    theme: "light",
    tagline: "An architectural line, lit both ways.",
    title: "Industrial Pendant",
    kr: "인더스트리얼 라인 펜던트 · Lumen Line",
    category: "Pendant Light",
    year: "2025",
    role: "Design · Engineering · Mockup · Rendering",
    client: "Product Development Team — mockup project 02",
    summary: "Lumen Line — a straight dining pendant with an architectural edge. A slim aluminum body lights the table and washes the ceiling at the same time, held by satin-plated end caps, flange and wire adjuster.",
    body: [
      "The brief was a simple straight pendant that still reads as architecture in the room. The answer was a 55 × 70 mm body with light on both faces: 21 W down onto the table, 11 W of warm indirect light up to the ceiling.",
      "The first version was white; the final one moved to satin-plated metal with a horizontal hairline and an engraved wordmark on the end caps, so the hardware carries the industrial character."
    ],
    chip: "ind-04.webp",
    cover: "ind-01.webp",
    gallery: [
      ["ind-03.webp", "ind-04.webp"],
      ["ind-02.webp"],
      ["ind-07.webp"],
      ["ind-05.webp", "ind-06.webp"],
      ["multi-06.webp"]
    ]
  },
  {
    slug: "linear-desk",
    theme: "dark",
    tagline: "A single line of light.",
    title: "Linear Table Light",
    kr: "리니어 테이블 조명",
    category: "Table Light",
    year: "2026",
    role: "Concept · 3D Modeling · Rendering",
    client: "Concept",
    summary: "A single thin line of light for long tables — the bar bends into its legs in one stroke, and stands on discs or clamps to a desk.",
    body: [
      "Designed to disappear into the table: the light source, arm and legs read as one continuous line, from a home desk to a long communal bar."
    ],
    chip: "linear-d1.webp",
    cover: "linear-11.webp",
    gallery: [
      ["linear-01.webp", "linear-02.webp"],
      ["linear-09.webp"]
    ]
  }
];
