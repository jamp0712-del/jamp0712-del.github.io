// 제품 상세: 브리프, 디자인 포인트, 도면, 분해도, CMF, 프로세스, 스펙, 부품
// ※ 멀티라이팅은 실제 시방서(2026.09.02)의 부품·치수·마감을 그대로 썼어요.
//   나머지 프로젝트의 수치는 포트폴리오용으로 설정한 값이라, 실제 값이 있으면 여기서 바꿔주세요.
// parts 번호 = 도면 콜아웃 번호(①②③…). parts: [이름, 재질·마감, 사이즈(선택), 수량(선택)]
// cmf: [이름, 설명, 스와치 CSS background]
const SW = {
  clear: "linear-gradient(135deg,#f4f6f5 0%,#dfe7e6 38%,#fafbfa 52%,#cfdcdb 100%)",
  opal: "radial-gradient(circle at 35% 30%,#ffffff 0%,#f3f1ec 60%,#e6e3dc 100%)",
  frost: "linear-gradient(160deg,#f7f6f2 0%,#e9e8e3 100%)",
  alu: "repeating-linear-gradient(90deg,rgba(255,255,255,.35) 0 1px,transparent 1px 3px),linear-gradient(135deg,#cfd1d2 0%,#b3b6b8 45%,#dcdedf 70%,#a9acae 100%)",
  graphite: "repeating-linear-gradient(90deg,rgba(255,255,255,.06) 0 1px,transparent 1px 3px),linear-gradient(135deg,#4a4b4d,#2c2d2f)",
  steel: "repeating-linear-gradient(90deg,rgba(255,255,255,.4) 0 1px,transparent 1px 2px),linear-gradient(135deg,#d8d9da,#a7a9ab)"
};

window.DETAILS = {
  flos: {
    brief: "Raemian needed a main ceiling light for new residences that feels premium without looking heavy. Most flush mounts read as a flat white box stuck to the ceiling.",
    approach: "Make the edge the design. A three-step clear acrylic rim wraps an edge-lit panel and catches its stray light, so the outline glows and the body seems to float off the ceiling.",
    points: [
      ["Stepped acrylic rim", "Three ribbed tiers of clear PMMA pick up light from the panel edge and turn the outline into a soft line of light."],
      ["82 mm slim body", "Edge-lit LEDs and a 4 mm light guide keep the fixture thin while the whole face glows evenly, with no hot spots."],
      ["One family, three shapes", "Double, square and round versions share the rim section and trim, so a whole home can be lit in one language."]
    ],
    dwg: "FL-01", scale: "1:5 / 1:1",
    figs: [
      ["plan", "Plan", 7],
      ["elev", "Elevation", 5],
      ["detail", "Section A — rim detail, 1:1", 12]
    ],
    asm: "exploded",
    cmf: [
      ["Clear PMMA", "Ribbed rim, polished", SW.clear],
      ["Opal PS", "Matte diffuser, 1.5t", SW.opal],
      ["Champagne", "Anodized aluminum trim", "linear-gradient(135deg,#d9c7a3,#b89c6c 55%,#d6c39d)"],
      ["Warm white", "Powder coat, RAL 9010", "#f1efe8"]
    ],
    process: [
      ["Direction", "Mood and form studies for edge-lit, floating ceiling lights.", "Midjourney · Sketch"],
      ["Modeling", "Surface model with a 3-tier rim section, built for three sizes.", "Rhino"],
      ["Engineering", "LED / light-guide stack, part split and ceiling bracket.", "Rhino"],
      ["Visualization", "Bedroom and living-room scenes for the client review.", "KeyShot · Photoshop"]
    ],
    specs: [
      ["Dimensions", "620 × 420 × 82 mm (single) · 2-lamp set"],
      ["Variants", "Square 520 × 520 mm · Round Ø 520 mm"],
      ["Light source", "LED module, 60 W, SMD 2835"],
      ["Output", "6,000 lm"],
      ["Color temperature", "3000 K / 4000 K / 5700 K, selectable"],
      ["CRI", "Ra 90+"],
      ["Control", "Wall switch 3-step · app dimming"],
      ["Mounting", "Surface, ceiling bracket"],
      ["Weight", "3.2 kg"]
    ],
    parts: [
      ["Steel base plate", "SPCC 0.8t, white powder coat"],
      ["Mounting bracket", "Galvanized steel"],
      ["LED module", "60 W, edge-lit, SMD 2835"],
      ["Light guide plate", "PMMA 4t, laser-dotted"],
      ["Opal diffuser", "PS 1.5t"],
      ["Stepped acrylic rim", "Clear PMMA, 3-tier ribbed, injection"],
      ["Trim ring", "Aluminum, champagne anodized"]
    ]
  },

  "clear-sconce": {
    brief: "A wall light for corridors and bedside walls that should read as a small sculpture when off, and as a soft wash on the wall when on.",
    approach: "Let the material carry the light. Two heat-bent acrylic blades guide LED light through their thickness and release it at the curved tips.",
    points: [
      ["Bent, not framed", "Each 5 mm blade is heat-bent from a single sheet — no frames or screws in view, only a clean edge of light."],
      ["Up and down", "Two 4 W strips light the wall above and below, so one fixture can frame a doorway or a bed."],
      ["Quiet body", "A finely grooved, brushed aluminum body holds the blades and hides the driver."]
    ],
    dwg: "CS-01", scale: "1:2",
    figs: [
      ["front", "Front elevation", 6],
      ["side", "Side section", 6]
    ],
    cmf: [
      ["Clear PMMA", "5t, heat-bent, flame-polished edge", SW.clear],
      ["Aluminum", "Brushed, clear anodized", SW.alu],
      ["Wall plate", "Steel, matte white", "#f1f0ec"]
    ],
    process: [
      ["Direction", "Light-guide studies — how far light travels in a bent sheet.", "Sketch · Midjourney"],
      ["Modeling", "Bend radius and blade length tuned in 3D.", "Rhino"],
      ["Visualization", "Caustics and wall wash on a dark plaster wall.", "KeyShot"]
    ],
    specs: [
      ["Dimensions", "120 × 260 × 90 mm"],
      ["Light source", "LED 2 × 4 W, up / down"],
      ["Output", "640 lm"],
      ["Color temperature", "2700 K"],
      ["CRI", "Ra 90+"],
      ["Mounting", "Wall plate over junction box"],
      ["Protection", "IP20, indoor"],
      ["Weight", "0.9 kg"]
    ],
    parts: [
      ["Wall plate", "Steel, white"],
      ["Body", "Aluminum extrusion, brushed"],
      ["LED strip", "4 W, 2700 K", "", 2],
      ["Upper blade", "Clear PMMA 5t, heat-bent"],
      ["Lower blade", "Clear PMMA 5t, heat-bent"],
      ["End caps", "Aluminum, brushed", "", 2]
    ]
  },

  "multi-lighting": {
    brief: "Mockup project No. 4 for the product development team: a lighting family that works across rooms with as few unique parts as possible.",
    approach: "One aluminum extrusion carries everything. Snap-on wings, layered end caps and a translucent diffuser turn the same 27.6 × 70.4 mm body into a 312 mm wall light or a 1.1 m pendant.",
    points: [
      ["One extrusion, two products", "The body section is shared; only the cut length changes — 230 mm for the wall light, 1,000 mm for the pendant."],
      ["Hook-on wings", "Painted wings hook into T-slots on the body. No visible screws, and every part can be finished separately."],
      ["Light both ways", "A 1.8 mm translucent acrylic strip on top washes the wall or ceiling, while the open bottom gives direct light."]
    ],
    dwg: "ML-04", scale: "2:1 / 1:10",
    figs: [
      ["profile", "Pendant profile, 2:1", 4],
      ["wall", "Wall light section, 2:1", 4],
      ["flange", "Canopy flange, 2:1", 4],
      ["elev", "Pendant elevation, 1:10", 12]
    ],
    asm: "exploded",
    cmf: [
      ["Matte white", "PANTONE 11-4800 TPX, wings · caps · bracket", "#ebeae5"],
      ["Raw aluminum", "Extruded body, unpainted", SW.alu],
      ["Translucent acrylic", "1.8t upper diffuser", SW.frost]
    ],
    process: [
      ["Research", "Reference board and fast form directions.", "Midjourney · ChatGPT"],
      ["Modeling", "One profile, developed into a wall light and a pendant.", "Rhino"],
      ["Engineering", "10 parts split for production, extrusion drawing, STEP / IGES.", "Rhino · DWG"],
      ["Prototype", "FDM and TPU test prints to check fit, snap and assembly.", "3D printing"],
      ["Spec sheet", "Part-by-part sheet with size, qty and finish for the mockup vendor.", "PowerPoint · Claude"],
      ["Visualization", "Assembled renders of both fixtures.", "KeyShot"]
    ],
    specs: [
      ["Family", "Wall light · pendant, one shared extrusion"],
      ["Pendant", "1,100 × 96 × 39 mm, body L 1,000 mm"],
      ["Wall light", "312 × 96 × 46 mm, body L 230 mm"],
      ["Body section", "70.4 × 27.6 mm aluminum extrusion"],
      ["Emission", "Up through translucent diffuser + direct down"],
      ["Finish", "PANTONE 11-4800 TPX matte white · raw aluminum"],
      ["Mockup", "10 parts, 1:1 · spec sheet issued 2026.09.02"]
    ],
    parts: [
      ["Pendant end cap", "White matte paint", "50 × 96 × 39", 2],
      ["Pendant upper diffuser", "Translucent acrylic", "995.6 × 27.2 × 1.8", 1],
      ["Pendant canopy flange", "White matte paint", "50 × 50 × 9", 1],
      ["Pendant wing", "White matte paint", "969.6 × 95", 2],
      ["Pendant body", "Aluminum extrusion, unpainted", "1000 × 70.4 × 27.6", 1],
      ["Wall end cap L / R", "White matte paint", "41 × 96 × 39", 2],
      ["Wall upper diffuser", "Translucent acrylic", "225.6 × 27.2 × 1.8", 1],
      ["Wall wing", "White matte paint", "199.6 × 95", 1],
      ["Wall body", "Aluminum extrusion, unpainted", "230 × 70.4 × 27.6", 1],
      ["Wall bracket", "White matte paint", "200 × 74.6 × 7", 1]
    ]
  },

  "linear-desk": {
    brief: "Long communal tables need even light along their whole length — without a lamp head standing between the people sitting across from each other.",
    approach: "Reduce the lamp to a line. An 18 × 12 mm bar on two 10 mm legs runs the length of the table and puts glare-controlled light straight down.",
    points: [
      ["A line, not a lamp", "Bar, legs and desk fixing read as one continuous stroke, from a home desk to a 1.6 m bar."],
      ["Low glare", "A micro-prism lens keeps UGR under 19, so the light stays on the table, not in your eyes."],
      ["Through-desk fixing", "Legs pass through 12 mm holes and lock from below; the cable runs inside a leg."]
    ],
    dwg: "LT-02", scale: "1:10 / 1:1",
    figs: [
      ["elev", "Elevation, 1:10", 8],
      ["bar", "Bar section, 1:1", 4]
    ],
    cmf: [
      ["Graphite", "Anodized aluminum bar", SW.graphite],
      ["Stainless", "Brushed steel legs", SW.steel],
      ["Prism lens", "PMMA, micro-prism", SW.frost]
    ],
    process: [
      ["Concept", "Line studies — how thin a table light can get.", "Sketch"],
      ["Modeling", "Bar section, lens and leg joint.", "Rhino"],
      ["Visualization", "Dark interior scenes from desk to long bar.", "KeyShot"]
    ],
    specs: [
      ["Dimensions", "L 1600 × H 450 mm, bar 18 × 12 mm"],
      ["Light source", "LED 24 W, linear"],
      ["Output", "2,200 lm"],
      ["Color temperature", "3000 K"],
      ["CRI / Glare", "Ra 95 · UGR < 19"],
      ["Control", "Touch dimmer on leg"],
      ["Mounting", "Through-desk, Ø 12 mm"]
    ],
    parts: [
      ["Light bar", "Aluminum extrusion, anodized"],
      ["LED strip", "24 W, 3000 K"],
      ["Micro-prism lens", "PMMA, glare control"],
      ["Leg", "Stainless steel Ø 10 mm", "", 2],
      ["Desk fixing", "Threaded sleeve + nut", "", 2]
    ]
  },

  "cove-studies": {
    brief: "Residents rarely know how indirect light will feel until the ceiling is built — and by then it is too late to change the cove.",
    approach: "Model each room once, then render it under many lighting setups so cove depth, color temperature and fixtures can be chosen from images.",
    points: [
      ["Same room, many lights", "Cove only, cove with ceiling fixtures, day and night — compared side by side."],
      ["Warm vs neutral", "2700 K and 4000 K tested in the same scene to show how scale and mood change."],
      ["With the product", "Coves combined with the Raemian FLOS ceiling light to check balance and glare."]
    ],
    dwg: "CV-03", scale: "NTS",
    figs: [
      ["cove", "Cove section", 6],
      ["rcp", "Reflected ceiling plan", 6]
    ],
    cmf: [
      ["2700 K", "Warm white, evening", "radial-gradient(circle at 50% 0%,#ffe2b4,#f6dcb6 60%,#efe3cf)"],
      ["3000 K", "Soft white, living", "radial-gradient(circle at 50% 0%,#ffebcc,#f6e8d3 60%,#f1ebe1)"],
      ["4000 K", "Neutral white, day", "radial-gradient(circle at 50% 0%,#fbf8f0,#f2f1ec 60%,#eceeee)"]
    ],
    cmfTitle: "Light palette",
    process: [
      ["Planning", "Cove positions and depths per room.", "Sketch"],
      ["Modeling", "Living room, kitchen and bedroom built once.", "Rhino"],
      ["Lighting", "Setups for cove, fixtures, CCT and time of day.", "KeyShot"],
      ["Retouch", "Final grading for side-by-side comparison.", "Photoshop"]
    ],
    specs: [
      ["Scope", "Living room, kitchen, bedroom scenes"],
      ["Cove light", "LED strip 14.4 W/m"],
      ["Color temperature", "2700 K · 4000 K compared"],
      ["Cove pocket", "150 × 120 mm, 600 mm from wall"],
      ["Combinations", "Cove only · cove + ceiling light · day / night"]
    ],
    parts: [
      ["Ceiling slab", "Existing"],
      ["Gypsum board drop", "9.5t, painted"],
      ["Fascia", "Gypsum, hides the source"],
      ["LED strip", "14.4 W/m, in aluminum channel"],
      ["Ceiling light", "Raemian FLOS, 2-lamp"]
    ]
  }
};
