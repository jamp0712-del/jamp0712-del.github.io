// 제품 상세: 브리프, 디자인 포인트, 도면, 분해도, CMF, 프로세스, 스펙, 부품
// 실제 자료 기준: FLOS(래미안 제안서 사이즈·와트·재질), 멀티라이팅(시방서 부품·치수·마감, 팝업 스펙, 중간보고 컨셉)
// 그 외 수치(색온도 옵션, 무게 등)와 Clear Wall Sconce · Linear Table Light · Cove 스펙은 설정값입니다.
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
    brief: "Part of a lighting-differentiation proposal for Raemian residences. Main ceiling lights are the most visible fixture in a home, yet most are a flat white panel stuck to the ceiling — nothing that says premium.",
    approach: "Layered glass. Stacked tiers of clear, ribbed PC wrap an edge-lit panel; each tier catches a little stray light, so the outline glows like stacked glass while the whole fixture stays 45 mm thin. The result reads as an object on the ceiling, not a box.",
    points: [
      ["Layered-glass rim", "Three tiers of clear PC, each ribbed and stepped back from the one above. Light leaking from the LED edge is caught tier by tier and turned into a soft glowing outline."],
      ["45 mm, every size", "Edge-lit LEDs feed a laser-dotted light guide, so the LEDs sit at the edge instead of behind the face. All three sizes keep the same 45 mm profile."],
      ["One family, three rooms", "650 × 450 for the living room, 650 × 650 for the master bedroom, 600 × 600 for bedrooms — the same rim section and trim, so a whole home reads as one family."]
    ],
    dwg: "FL-01", scale: "1:8 / 4:1",
    figs: [
      ["plan", "Plan — living room, 650 × 450", 5],
      ["section", "Section A–A", 7],
      ["detail", "Detail B — layered rim, 4:1", 12],
      ["family", "Family — plan sizes to scale", 12]
    ],
    asm: "exploded",
    cmf: [
      ["Clear PC", "Layered rim, ribbed, polished", SW.clear],
      ["Opal diffuser", "Even, glare-free face", SW.opal],
      ["Champagne", "Aluminum trim line", "linear-gradient(135deg,#d9c7a3,#b89c6c 55%,#d6c39d)"],
      ["Warm white", "Steel base, powder coat", "#f1efe8"]
    ],
    process: [
      ["Research", "Raemian's current main lights and premium references — where a flush mount can feel luxurious.", "Midjourney · ChatGPT"],
      ["Concept", "‘Layered glass’: stacked clear tiers that glow at the edge.", "Sketch · Midjourney"],
      ["Modeling", "Rim section built once and swept around three plan sizes.", "Rhino"],
      ["Engineering", "Edge-lit LED / light-guide stack inside a 45 mm height, steel base and bracket.", "Rhino"],
      ["Proposal", "Room scenes and a size line-up for the Raemian design proposal.", "KeyShot · Photoshop"]
    ],
    specs: [
      ["Living room", "L 650 × W 450 × H 45 mm · LED 60 W"],
      ["Master bedroom", "L 650 × W 650 × H 45 mm · LED 40 W"],
      ["Bedroom", "L 600 × W 600 × H 45 mm · LED 40 W"],
      ["Materials", "PC · aluminum · steel"],
      ["Mounting", "Surface (flush) ceiling mount"],
      ["Light", "Edge-lit LED, light guide + opal diffuser"],
      ["Color temperature", "3000 / 4000 / 5700 K selectable"]
    ],
    parts: [
      ["Base plate", "Steel, white powder coat"],
      ["Mounting bracket", "Galvanized steel"],
      ["LED module", "Edge-lit, along the panel edge"],
      ["Light guide plate", "4t, laser-dotted"],
      ["Opal diffuser", "PC 1.5t"],
      ["Layered rim", "Clear PC, 3 tiers, ribbed"],
      ["Trim line", "Aluminum, champagne"]
    ]
  },

  "clear-sconce": {
    brief: "A wall light for corridors and bedside walls that should read as a small sculpture when off, and as a soft wash on the wall when on.",
    approach: "Let the material carry the light. A brushed aluminum band holds two LED strips; clear acrylic blades above and below guide the light along their thickness, glow at their curled edges and spill onto the wall.",
    points: [
      ["Bent, not framed", "Each 5 mm blade is heat-bent from a single sheet. No frame, no screws in view — only a clean, glowing edge."],
      ["Up and down", "Two strips light the wall above and below, so one fixture can frame a doorway or a bed."],
      ["Quiet metal band", "A brushed aluminum band with a soft convex face hides the driver and holds both blades."]
    ],
    dwg: "CS-01", scale: "1:2",
    figs: [
      ["front", "Front elevation", 6],
      ["side", "Side section", 6]
    ],
    cmf: [
      ["Clear acrylic", "5t, heat-bent, polished edge", SW.clear],
      ["Aluminum", "Brushed band, clear anodized", SW.alu],
      ["Wall plate", "Steel, matte white", "#f1f0ec"]
    ],
    process: [
      ["Concept", "How far light travels inside a bent sheet, and how it leaves the edge.", "Sketch · Midjourney"],
      ["Modeling", "Bend radius, blade length and band curvature tuned together.", "Rhino"],
      ["Visualization", "Caustics and wall wash on a dark plaster wall.", "KeyShot"]
    ],
    specs: [
      ["Dimensions", "W 180 × H 190 × D 60 mm"],
      ["Light source", "LED 2 × 4 W, up / down"],
      ["Color temperature", "2700 K"],
      ["Materials", "Brushed aluminum · clear acrylic 5t"],
      ["Mounting", "Wall plate over junction box"],
      ["Protection", "IP20, indoor"]
    ],
    parts: [
      ["Wall plate", "Steel, white"],
      ["Band body", "Aluminum, brushed"],
      ["LED strip", "4 W, 2700 K", "", 2],
      ["Upper blade", "Clear acrylic 5t, heat-bent"],
      ["Lower blade", "Clear acrylic 5t, heat-bent"],
      ["End caps", "Aluminum, brushed", "", 2]
    ]
  },

  "multi-lighting": {
    brief: "Auxiliary lights — wall, powder-room, step and corridor lights — are rarely upgraded in new apartments. Developing a separate light for every room means new extrusion and injection tools each time, and the investment never pays back.",
    approach: "One die, many products. A single aluminum extrusion is cut to length and combined with hook-on wings, end caps and a translucent diffuser; changing only the PCB and diffuser position turns it into a wall light, a pendant and more — cutting MOQ and cost while the family stays consistent.",
    points: [
      ["One extrusion, a whole family", "The 70.4 × 27.6 mm body is shared. 230 mm makes the wall light, 1,000 mm makes the pendant — same die, same parts."],
      ["Variable PCB and diffuser", "LED boards and the diffuser can sit on top, bottom or both, so one profile gives up-light, down-light or both ways."],
      ["End caps that soften the line", "Layered end caps turn a straight extrusion into a soft, curved object and give the light its depth."]
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
      ["OBLIQUE", "Jun 2026 — first direction: a multi-angle light, one extrusion with variable PCB and diffuser positions.", "Midjourney · Sketch"],
      ["MONOFORM", "Jul 2026 — one extrusion plus shades and covers: a pendant, three wall lights and a ceiling light.", "Rhino · KeyShot"],
      ["Engineering", "Final profile, 10 parts with tolerances and wall thickness, extrusion drawing, STEP / IGES.", "Rhino · DWG"],
      ["Prototype", "FDM and TPU test prints to check the hook-on wings, end caps and assembly.", "3D printing"],
      ["Spec sheet", "Sep 2026 — part-by-part sheet with size, quantity and finish for the mockup vendor.", "PowerPoint · Claude"],
      ["Visualization", "Assembled pendant and wall-light renders for the team review.", "KeyShot · Photoshop"]
    ],
    specs: [
      ["Pendant", "L 1040 × W 50 × H 95 mm · 30 W (15 + 15)"],
      ["Wall light", "L 254 × W 40 × H 95 mm · 12 W (6 + 6)"],
      ["Color temperature", "4000 K"],
      ["Body section", "70.4 × 27.6 mm aluminum extrusion, shared"],
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
    brief: "Long tables — a home desk, a communal bar — need even light along their whole length, without a lamp head standing between the people sitting across from each other.",
    approach: "Reduce the lamp to a line. A slim bar turns down into its legs through one soft bend, so bar, joint and leg read as a single stroke; the same bar stands on discs along a bar table or clamps to a desk edge.",
    points: [
      ["One continuous stroke", "The bar bends into the leg with a tapered radius — no visible joint, no head, just a line of light."],
      ["Low glare, even light", "A micro-prism lens under the LED strip spreads light along the table while keeping it out of your eyes."],
      ["Stand or clamp", "Three legs on base discs for a 1.6 m bar table; a C-clamp version for a desk, holding tops up to 40 mm."]
    ],
    dwg: "LT-02", scale: "1:10 / 3:1",
    figs: [
      ["elev", "Elevation — bar-table version, 1:10", 12],
      ["bar", "Bar section, 3:1", 6],
      ["clamp", "Desk version — clamp, side view", 6]
    ],
    cmf: [
      ["Graphite", "Anodized aluminum bar", SW.graphite],
      ["Satin aluminum", "Legs, bead-blasted", SW.steel],
      ["Prism lens", "PMMA, micro-prism", SW.frost]
    ],
    process: [
      ["Concept", "Line studies — how thin a table light can get, and where the leg meets the bar.", "Sketch"],
      ["Modeling", "Bar section, lens and the tapered corner joint.", "Rhino"],
      ["Visualization", "From a dark home desk to a long bar table at night.", "KeyShot"]
    ],
    specs: [
      ["Bar-table version", "L 1600 × H 450 mm, 3 legs on base discs"],
      ["Desk version", "Single span with C-clamp, tops ≤ 40 mm"],
      ["Bar section", "18 × 12 mm"],
      ["Light source", "LED strip, 3000 K"],
      ["Optics", "Micro-prism lens, low glare"],
      ["Materials", "Anodized aluminum · PMMA lens"]
    ],
    parts: [
      ["Light bar", "Aluminum extrusion, anodized"],
      ["LED strip", "3000 K, on aluminum PCB"],
      ["Micro-prism lens", "PMMA, glare control"],
      ["Leg", "Aluminum tube, tapered corner", "", 3],
      ["Base disc / desk clamp", "Aluminum, satin"]
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
