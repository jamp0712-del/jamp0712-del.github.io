// 제품 도면 (SVG). 치수 단위 mm. 원 번호는 details.js의 parts 순서와 같아요.
(() => {
  let uid = 0;
  const svg = (vb, body) => {
    const id = "h" + (++uid), m = id + "m";
    return `<svg class="dwg" viewBox="${vb}" xmlns="http://www.w3.org/2000/svg" role="img">
      <defs><pattern id="${id}" width="6" height="6" patternUnits="userSpaceOnUse" patternTransform="rotate(45)">
      <line x1="0" y1="0" x2="0" y2="6" class="hl"/></pattern>
      <pattern id="${m}" width="3.2" height="3.2" patternUnits="userSpaceOnUse" patternTransform="rotate(45)">
      <rect width="3.2" height="3.2" class="mbg"/><line x1="0" y1="0" x2="0" y2="3.2" class="hl"/></pattern></defs>
      ${body.replace(/HATCH/g, `url(#${id})`).replace(/METAL/g, `url(#${m})`)}</svg>`;
  };
  // 단면 표시(A–A), 상세 버블(B)
  const secA = (x, y, L) => `<g class="secm"><path d="M${x} ${y} v13 M${x - 4} ${y + 7} L${x} ${y + 14} L${x + 4} ${y + 7}"/><text x="${x}" y="${y - 6}" text-anchor="middle">${L}</text></g>`;
  const bub = (cx, cy, r, L, tx, ty) => `<g class="bub"><circle cx="${cx}" cy="${cy}" r="${r}"/><text x="${tx}" y="${ty}" text-anchor="middle">${L}</text></g>`;
  const note = (x, y, t, a = "start") => `<text class="note" x="${x}" y="${y}" text-anchor="${a}">${t}</text>`;
  const dimH = (x1, x2, y, t, ey) => `<g class="dim">
    ${ey != null ? `<line x1="${x1}" y1="${ey}" x2="${x1}" y2="${y + 4}"/><line x1="${x2}" y1="${ey}" x2="${x2}" y2="${y + 4}"/>` : ""}
    <line x1="${x1}" y1="${y}" x2="${x2}" y2="${y}"/>
    <line x1="${x1 - 3}" y1="${y + 3}" x2="${x1 + 3}" y2="${y - 3}"/><line x1="${x2 - 3}" y1="${y + 3}" x2="${x2 + 3}" y2="${y - 3}"/>
    <text x="${(x1 + x2) / 2}" y="${y - 5}" text-anchor="middle">${t}</text></g>`;
  const dimV = (y1, y2, x, t, ex) => `<g class="dim">
    ${ex != null ? `<line x1="${ex}" y1="${y1}" x2="${x + 4}" y2="${y1}"/><line x1="${ex}" y1="${y2}" x2="${x + 4}" y2="${y2}"/>` : ""}
    <line x1="${x}" y1="${y1}" x2="${x}" y2="${y2}"/>
    <line x1="${x - 3}" y1="${y1 + 3}" x2="${x + 3}" y2="${y1 - 3}"/><line x1="${x - 3}" y1="${y2 + 3}" x2="${x + 3}" y2="${y2 - 3}"/>
    <text x="${x + 7}" y="${(y1 + y2) / 2}" text-anchor="middle" transform="rotate(-90 ${x + 7} ${(y1 + y2) / 2})" dy="-4">${t}</text></g>`;
  const co = (px, py, lx, ly, n) => `<g class="co"><circle cx="${px}" cy="${py}" r="1.6" class="dot"/>
    <line x1="${px}" y1="${py}" x2="${lx}" y2="${ly}"/><circle cx="${lx}" cy="${ly}" r="7"/>
    <text x="${lx}" y="${ly + 2.6}" text-anchor="middle">${n}</text></g>`;
  const ray = (x1, y1, x2, y2) => `<line class="ray" x1="${x1}" y1="${y1}" x2="${x2}" y2="${y2}"/>`;


  const arr = (x1, y1, x2, y2) => { const a = Math.atan2(y2 - y1, x2 - x1), h = 5;
    const p = (q) => `${x2 - h * Math.cos(a + q)},${y2 - h * Math.sin(a + q)}`;
    return `<g class="arr"><line x1="${x1}" y1="${y1}" x2="${x2}" y2="${y2}"/><path d="M${p(.45)} L${x2},${y2} L${p(-.45)}"/></g>`; };
  // 멀티라이팅: 압출 몸체(83 × 211), 날개(판 4.5, 하단 킥)
  const mlBody = (x, y) => `<rect class="l" style="fill:METAL" x="${x}" y="${y}" width="83" height="211"/>
    <rect class="l" x="${x + 6}" y="${y + 30}" width="71" height="151" style="fill:var(--bg)"/>
    <path class="l thin" d="M${x + 6} ${y} V${y + 24} H${x + 77} V${y} M${x + 6} ${y + 211} V${y + 187} H${x + 77} V${y + 211}"/>
    <path class="l thin" d="M${x} ${y + 8} h6 v12 h-6 M${x + 83} ${y + 8} h-6 v12 h6 M${x} ${y + 191} h6 v12 h-6 M${x + 83} ${y + 191} h-6 v12 h6"/>
    <rect class="glow" x="${x + 20}" y="${y + 26}" width="43" height="4"/><rect class="glow" x="${x + 20}" y="${y + 181}" width="43" height="4"/>`;
  const wingL = (jx, t, yb) => `<path class="l wing" d="M${jx} ${t} H${jx - 4.5} V${yb - 2} L${jx - 18} ${yb + 43} H${jx - 13.5} L${jx} ${yb} Z"/>`;
  const wingR = (ix, t, yb) => `<path class="l wing" d="M${ix} ${t} H${ix + 4.5} V${yb - 2} L${ix + 18} ${yb + 43} H${ix + 13.5} L${ix} ${yb} Z"/>`;
  // 다이메트릭 판 (분해도)
  const iso = (cx, cy, w, d, r, cls, t = 0) => {
    const R = (y) => `<rect class="${cls}" x="${-w / 2}" y="${-d / 2}" width="${w}" height="${d}" rx="${r}" transform="matrix(.94 .342 -.94 .342 ${cx} ${y})"/>`;
    return (t ? R(cy + t) : "") + R(cy);
  };
  const isoCo = (cx, cy, w, d, n, lx = 480) => co(cx + .94 * (w / 2 + d / 2) - 5, cy + .342 * (w / 2 - d / 2), lx, cy + .342 * (w / 2 - d / 2), n);

  const D = {
    flos: {
      // 실제 제안서 사이즈: 거실 650×450×45, 안방 650×650×45, 침실 600×600×45
      plan: () => svg("0 0 440 330", `
        <line class="cl" x1="220" y1="28" x2="220" y2="286"/>
        <rect class="l" x="74" y="56" width="292.5" height="202.5" rx="30"/>
        <rect class="l thin" x="77" y="59" width="286.5" height="196.5" rx="27"/>
        <rect class="l" x="80" y="62" width="280.5" height="190.5" rx="24"/>
        <rect class="l thin" x="83" y="65" width="274.5" height="184.5" rx="21"/>
        <rect class="l" x="86" y="68" width="268.5" height="178.5" rx="18"/>
        <rect class="trimline" x="89" y="71" width="262.5" height="172.5" rx="15"/>
        <rect class="glow l" x="92" y="74" width="256.5" height="166.5" rx="12"/>
        ${note(220, 150, "LIGHT-EMITTING FACE", "middle")}
        ${dimH(74, 366.5, 304, "650", 258.5)}${dimV(56, 258.5, 418, "450", 366.5)}`),
      section: () => svg("0 0 640 190", `
        <rect x="20" y="20" width="600" height="14" fill="HATCH"/><line class="l" x1="20" y1="34" x2="620" y2="34"/>
        <path class="l acr" d="M92 34 H64 Q60 34 60 38 V46 H66 V58 H72 V66 Q72 70 76 70 H92 Z"/>
        <path class="l acr" d="M548 34 H576 Q580 34 580 38 V46 H574 V58 H568 V66 Q568 70 564 70 H548 Z"/>
        <path class="l" style="fill:METAL" d="M92 34 H548 V60 H546 V36.5 H94 V60 H92 Z"/>
        <rect class="l" style="fill:METAL" x="300" y="36.5" width="40" height="5"/>
        <rect class="l lgp" x="97" y="54" width="446" height="6"/>
        <rect class="glow" x="94.5" y="53" width="2.5" height="8"/><rect class="glow" x="543" y="53" width="2.5" height="8"/>
        <rect class="glow l" x="92" y="64" width="456" height="5"/>
        <rect class="trim" x="88" y="64" width="5" height="6"/><rect class="trim" x="547" y="64" width="5" height="6"/>
        ${ray(160, 74, 140, 124)}${ray(320, 74, 320, 128)}${ray(480, 74, 500, 124)}
        ${ray(94, 57, 64, 30)}${ray(546, 57, 576, 30)}
        ${bub(78, 52, 28, "B", 78, 16)}
        ${dimH(60, 580, 166, "650", 72)}${dimV(34, 70, 612, "45", 582)}`),
      detail: () => svg("0 0 680 330", `
        <rect x="20" y="20" width="620" height="18" fill="HATCH"/><line class="l" x1="20" y1="38" x2="640" y2="38"/>
        <path class="l acr" d="M200 38 H68 Q60 38 60 46 V98 H80 V158 H100 V210 Q100 218 108 218 H192 V212 H200 Z"/>
        ${[53, 68, 83].map(y => `<line class="l thin" x1="62" y1="${y}" x2="198" y2="${y}"/>`).join("")}
        ${[113, 128, 143].map(y => `<line class="l thin" x1="82" y1="${y}" x2="198" y2="${y}"/>`).join("")}
        ${[173, 188, 203].map(y => `<line class="l thin" x1="102" y1="${y}" x2="190" y2="${y}"/>`).join("")}
        <path class="l" style="fill:METAL" d="M200 38 H640 V41.5 H203.5 V190 H200 Z"/>
        <path class="l" style="fill:METAL" d="M430 41.5 H500 V52 H494 V47 H436 V52 H430 Z"/>
        <rect class="l opal" x="213" y="182" width="427" height="4"/>
        <rect class="l pcb" x="204" y="184" width="6" height="26"/><rect class="glow" x="210" y="190" width="3" height="14"/>
        <rect class="l lgp" x="213" y="186" width="427" height="16"/>
        ${Array.from({ length: 29 }, (_, i) => `<circle class="dotp" cx="${222 + i * 14.5}" cy="200" r="1.1"/>`).join("")}
        <rect class="l opal" x="200" y="206" width="440" height="6"/>
        <rect class="trim" x="192" y="212" width="12" height="6"/>
        ${ray(205, 194, 92, 120)}${ray(205, 200, 116, 196)}${ray(205, 188, 70, 60)}
        ${ray(300, 220, 286, 262)}${ray(470, 220, 470, 264)}${ray(600, 220, 612, 262)}
        ${note(632, 197, "LIGHT GUIDE 4t · LASER-DOTTED", "end")}${note(632, 180, "REFLECTOR", "end")}${note(632, 228, "OPAL DIFFUSER 1.5t", "end")}
        ${note(66, 236, "LAYERED CLEAR PC RIM")}
        ${co(560, 40, 660, 70, 1)}${co(466, 49, 660, 104, 2)}${co(207, 206, 236, 300, 3)}${co(360, 194, 360, 300, 4)}
        ${co(420, 209, 430, 300, 5)}${co(70, 120, 70, 300, 6)}${co(196, 216, 156, 300, 7)}
        ${dimV(38, 218, 30, "45", 58)}${dimH(60, 200, 262, "35", 222)}`),
      family: () => svg("0 0 640 230", `
        ${[[40, 162.5, 112.5, "LIVING ROOM", "650 × 450", "LED 60 W"], [244, 162.5, 162.5, "MASTER BEDROOM", "650 × 650", "LED 40 W"], [448, 150, 150, "BEDROOM", "600 × 600", "LED 40 W"]]
          .map(([x, w, h, n, d, wt]) => `
          <rect class="l" x="${x}" y="${190 - h}" width="${w}" height="${h}" rx="9"/>
          <rect class="l thin" x="${x + 3}" y="${193 - h}" width="${w - 6}" height="${h - 6}" rx="7"/>
          <rect class="glow l" x="${x + 7}" y="${197 - h}" width="${w - 14}" height="${h - 14}" rx="4"/>
          <text class="lab2" x="${x}" y="${178 - h}">${n}</text>
          <text x="${x}" y="208">${d} × 45 mm</text><text x="${x}" y="220">${wt} · PC / AL / STEEL</text>`).join("")}`),
      exploded: () => { const cx = 230; return svg("0 0 520 470", `
        <line class="cl" x1="${cx}" y1="30" x2="${cx}" y2="440"/>
        <line class="cl" x1="${cx - 150}" y1="100" x2="${cx - 150}" y2="380"/><line class="cl" x1="${cx + 150}" y1="100" x2="${cx + 150}" y2="380"/>
        ${iso(cx, 372, 196, 135, 30, "l acr", 10)}${iso(cx, 372, 184, 123, 24, "l thin")}${iso(cx, 372, 172, 111, 18, "l thin")}
        ${iso(cx, 312, 192, 131, 26, "trimring")}
        ${iso(cx, 258, 186, 125, 22, "l opal", 4)}
        ${iso(cx, 206, 182, 121, 20, "l lgp", 4)}${iso(cx, 206, 166, 105, 14, "l thin")}
        ${iso(cx, 156, 182, 121, 20, "ledring")}${iso(cx, 156, 170, 109, 16, "l thin")}
        ${iso(cx, 100, 186, 125, 22, "l basep", 6)}
        ${iso(cx, 44, 90, 26, 4, "l body", 5)}
        ${isoCo(cx, 44, 90, 26, 2)}${isoCo(cx, 100, 186, 125, 1)}${isoCo(cx, 156, 182, 121, 3)}${isoCo(cx, 206, 182, 121, 4)}
        ${isoCo(cx, 258, 186, 125, 5)}${isoCo(cx, 312, 192, 131, 7)}${isoCo(cx, 372, 196, 135, 6)}`); },
    },
    "clear-sconce": {
      front: () => svg("0 0 360 380", `
        <line class="cl" x1="180" y1="20" x2="180" y2="326"/>
        <path class="l acr" d="M54 131 V50 Q54 40 64 40 H296 Q306 40 306 50 V131 Z"/>
        <path class="l acr" d="M54 215 V296 Q54 306 64 306 H296 Q306 306 306 296 V215 Z"/>
        <line class="l thin" x1="60" y1="47" x2="300" y2="47"/><line class="l thin" x1="60" y1="299" x2="300" y2="299"/>
        <rect class="l body" x="54" y="131" width="252" height="84"/>
        ${Array.from({ length: 13 }, (_, i) => `<line class="l thin" x1="58" y1="${137 + i * 6}" x2="302" y2="${137 + i * 6}" opacity=".25"/>`).join("")}
        <rect class="l" style="fill:METAL" x="50" y="131" width="4" height="84"/><rect class="l" style="fill:METAL" x="306" y="131" width="4" height="84"/>
        <rect class="glow" x="56" y="127" width="248" height="3"/><rect class="glow" x="56" y="216" width="248" height="3"/>
        ${co(150, 172, 22, 186, 2)}${co(140, 86, 22, 86, 4)}${co(140, 262, 22, 262, 5)}${co(52, 140, 22, 132, 6)}
        ${dimH(54, 306, 352, "180", 310)}${dimV(40, 306, 336, "190", 306)}`),
      side: () => svg("0 0 300 380", `
        <rect x="16" y="20" width="14" height="330" fill="HATCH"/><line class="l" x1="30" y1="20" x2="30" y2="350"/>
        <rect class="l" style="fill:METAL" x="30" y="147" width="6" height="52"/>
        <path class="l" style="fill:METAL" d="M36 131 H96 Q126 173 96 215 H36 Z"/>
        <path class="l" style="fill:var(--bg)" d="M42 137 H92 Q116 173 92 209 H42 Z"/>
        <rect class="l pcb" x="44" y="137" width="30" height="3"/><rect class="l pcb" x="44" y="206" width="30" height="3"/>
        <rect class="glow" x="46" y="133" width="26" height="4"/><rect class="glow" x="46" y="209" width="26" height="4"/>
        <path class="acr-thick" d="M100 131 Q66 131 62 108 V60 Q62 40 82 34"/><path class="l" d="M100 131 Q66 131 62 108 V60 Q62 40 82 34"/>
        <path class="acr-thick" d="M100 215 Q66 215 62 238 V286 Q62 306 82 312"/><path class="l" d="M100 215 Q66 215 62 238 V286 Q62 306 82 312"/>
        ${ray(50, 128, 36, 40)}${ray(58, 128, 50, 26)}${ray(50, 218, 36, 306)}${ray(58, 218, 50, 320)}
        ${ray(70, 104, 96, 30)}${ray(70, 242, 96, 316)}
        ${note(150, 30, "UP-LIGHT WASHES THE WALL")}${note(150, 340, "DOWN-LIGHT WASHES THE WALL")}
        ${co(33, 192, 210, 222, 1)}${co(104, 176, 210, 176, 2)}${co(62, 135, 210, 136, 3)}${co(62, 84, 210, 84, 4)}${co(62, 262, 210, 262, 5)}
        ${dimH(30, 111, 364, "60", 318)}`)
    },
    "multi-lighting": {
      // 실제 시방서 치수 기준 (3 unit = 1 mm). 몸체 27.6 × 70.4, 날개 95, 앤드캡 96 × 39
      profile: () => svg("0 0 260 400", `
        <line class="cl" x1="130" y1="24" x2="130" y2="384"/>
        <rect class="hid" x="71.5" y="57" width="117" height="288" rx="4"/>
        ${mlBody(88.5, 70)}${wingL(88.5, 57, 299)}${wingR(171.5, 57, 299)}
        <rect class="l acr" x="89" y="64.6" width="82" height="5.4"/>
        ${ray(118, 58, 104, 30)}${ray(130, 58, 130, 28)}${ray(142, 58, 156, 30)}
        ${ray(118, 288, 102, 376)}${ray(130, 288, 130, 378)}${ray(142, 288, 158, 376)}
        ${co(160, 67, 212, 36, 2)}${co(174, 160, 212, 150, 4)}${co(166, 236, 212, 250, 5)}${co(188.5, 322, 212, 322, 1)}
        ${dimH(88.5, 171.5, 16, "27.6", 64)}${dimV(70, 281, 30, "70.4", 84)}
        ${dimV(57, 342, 236, "95", 189)}${dimH(70.5, 189.5, 393, "50", 346)}`),
      wall: () => svg("0 0 260 400", `
        <rect x="14" y="16" width="14" height="370" fill="HATCH"/><line class="l" x1="28" y1="16" x2="28" y2="386"/>
        <rect class="hid" x="28" y="57" width="138" height="288" rx="4"/>
        <rect class="l wing" x="28" y="63.5" width="21" height="224"/>
        ${mlBody(49, 70)}${wingR(132, 57, 299)}
        <rect class="l acr" x="49.5" y="64.6" width="82" height="5.4"/>
        ${ray(80, 58, 52, 22)}${ray(96, 58, 96, 20)}${ray(112, 58, 132, 26)}
        ${ray(80, 288, 54, 378)}${ray(96, 288, 96, 380)}${ray(112, 288, 136, 376)}
        ${co(118, 67, 206, 36, 7)}${co(134.5, 160, 206, 150, 8)}${co(124, 236, 206, 236, 9)}
        ${co(40, 270, 206, 280, 10)}${co(166, 330, 206, 330, 6)}
        ${dimV(57, 342, 236, "95", 167)}${dimH(28, 166, 393, "40", 346)}`),
      flange: () => svg("0 0 260 400", `
        <line class="cl" x1="130" y1="44" x2="130" y2="226"/><line class="cl" x1="40" y1="135" x2="220" y2="135"/>
        <rect class="l wing" x="55" y="60" width="150" height="150" rx="18"/>
        <rect class="l thin" x="61" y="66" width="138" height="138" rx="14"/>
        <circle class="l" cx="130" cy="135" r="7"/><circle class="l thin" cx="152" cy="135" r="3"/>
        <text class="lab" x="55" y="226">PLAN</text>
        <rect x="20" y="262" width="220" height="14" fill="HATCH"/><line class="l" x1="20" y1="276" x2="240" y2="276"/>
        <path class="l wing" d="M55 276 H205 V295 Q205 303 197 303 H63 Q55 303 55 295 Z"/>
        <line class="l thin" x1="130" y1="303" x2="130" y2="386"/><path class="l thin" d="M152 303 C152 330 140 352 146 386"/>
        <text class="lab" x="55" y="324">ELEVATION</text>
        ${co(196, 292, 222, 346, 3)}
        ${dimH(55, 205, 40, "50", 60)}${dimV(60, 210, 236, "50", 205)}${dimV(276, 303, 236, "9", 205)}`),
      elev: () => svg("0 0 760 290", `
        <rect x="20" y="14" width="720" height="14" fill="HATCH"/><line class="l" x1="20" y1="28" x2="740" y2="28"/>
        <rect class="l wing" x="115" y="28" width="30" height="5.4"/>
        <line class="l thin" x1="86" y1="28" x2="86" y2="150"/><line class="l thin" x1="674" y1="28" x2="674" y2="150"/>
        <path class="l thin" d="M130 33 C130 90 96 104 100 150"/>
        <rect class="glow" x="80" y="147" width="600" height="3"/>
        <rect class="l wing" x="80" y="150" width="600" height="50"/>
        <path class="l wing" d="M80 200 L76 207.6 H684 L680 200 Z"/>
        <line class="l thin" x1="92" y1="150" x2="92" y2="207"/><line class="l thin" x1="668" y1="150" x2="668" y2="207"/>
        <rect class="glow" x="80" y="207.6" width="600" height="2.6"/>
        <rect class="l wing" x="50" y="150" width="30" height="57.6" rx="3"/><rect class="l wing" x="680" y="150" width="30" height="57.6" rx="3"/>
        ${[53, 56.5, 60, 63.5].map(x => `<line class="l thin" x1="${x}" y1="153" x2="${x}" y2="205"/><line class="l thin" x1="${760 - x}" y1="153" x2="${760 - x}" y2="205"/>`).join("")}
        ${ray(220, 143, 210, 104)}${ray(540, 143, 550, 104)}
        ${ray(220, 214, 204, 252)}${ray(380, 214, 380, 254)}${ray(540, 214, 556, 252)}
        ${co(130, 31, 176, 66, 3)}${co(320, 148, 340, 104, 2)}${co(440, 176, 452, 116, 4)}${co(705, 172, 730, 112, 1)}
        ${dimH(50, 710, 278, "1040", 212)}${dimV(150, 207.6, 744, "96", 712)}${dimV(28, 150, 40, "≤ 1500", 84)}`),
      // 벽등 축측 분해도 (실제 부품 치수, mm × 1.2)
      exploded: () => {
        const cx = 300, cy = 205, k = 1.2;
        const P = (x, y, z) => [cx + .94 * (x - y) * k, cy + (.342 * (x + y) - z) * k];
        const pt = (...a) => P(...a).map(v => v.toFixed(1)).join(",");
        const box = ([x, y, z], [L, D, H], c) => {
          const x0 = x - L / 2, x1 = x + L / 2, y0 = y - D / 2, y1 = y + D / 2, z0 = z - H / 2, z1 = z + H / 2;
          return `<g class="bx ${c}">
            <polygon class="f1" points="${pt(x0, y1, z0)} ${pt(x1, y1, z0)} ${pt(x1, y1, z1)} ${pt(x0, y1, z1)}"/>
            <polygon class="f2" points="${pt(x1, y0, z0)} ${pt(x1, y1, z0)} ${pt(x1, y1, z1)} ${pt(x1, y0, z1)}"/>
            <polygon class="f0" points="${pt(x0, y0, z1)} ${pt(x1, y0, z1)} ${pt(x1, y1, z1)} ${pt(x0, y1, z1)}"/></g>`;
        };
        const ar = (p1, p2) => arr(...P(...p1), ...P(...p2));
        const cp = (p, dx, dy, n) => { const [x, y] = P(...p); return co(x, y, x + dx, y + dy, n); };
        const parts = [ // 먼 것부터
          [[0, -72, 0], [200, 7, 74.6], "paint"],      // 10 bracket
          [[-190, 0, -8], [12, 39, 96], "paint"],      // 6 end cap L
          [[0, 0, 0], [230, 27.6, 70.4], "alu"],       // 9 body
          [[0, 0, 92], [225.6, 27.2, 1.8], "acr"],     // 7 diffuser
          [[190, 0, -8], [12, 39, 96], "paint"],       // 6 end cap R
          [[0, 71, -8], [199.6, 4.5, 95], "paint"]     // 8 wing
        ];
        return svg("0 0 600 400", `
          ${ar([0, -64, 0], [0, -20, 0])}${ar([-178, 0, 0], [-122, 0, 0])}
          ${parts.slice(0, 3).map(q => box(...q)).join("")}
          ${ar([0, 0, 84], [0, 0, 40])}
          ${parts.slice(3).map(q => box(...q)).join("")}
          ${ar([178, 0, 0], [122, 0, 0])}${ar([0, 66, 0], [0, 22, 0])}
          ${cp([60, -72, 37.3], 46, -44, 10)}${cp([-190, 0, 40], -30, -34, 6)}${cp([115, 0, 10], 30, 44, 9)}
          ${cp([40, 0, 92.9], 56, -30, 7)}${cp([196, 0, -20], 26, 40, 6)}${cp([-60, 73.25, -30], -50, 40, 8)}`);
      }
    },
    "linear-desk": {
      elev: () => svg("0 0 600 230", `<g transform="translate(60 0)">
        <rect x="16" y="172" width="448" height="12" fill="HATCH"/><line class="l" x1="16" y1="172" x2="464" y2="172"/>
        <rect class="l body" x="58" y="56" width="364" height="4.5" rx="1.5"/>
        <path class="l body" d="M44.5 168 V78 Q44.5 58 62 56 V60.5 Q48.5 63 48.5 78 V168 Z"/>
        <path class="l body" d="M435.5 168 V78 Q435.5 58 418 56 V60.5 Q431.5 63 431.5 78 V168 Z"/>
        <rect class="l body" x="298.5" y="60.5" width="3" height="107.5"/>
        <rect class="l body" x="37.5" y="168" width="18" height="4" rx="1"/><rect class="l body" x="291" y="168" width="18" height="4" rx="1"/><rect class="l body" x="424.5" y="168" width="18" height="4" rx="1"/>
        <rect class="glow" x="64" y="60.5" width="230" height="1.8"/><rect class="glow" x="306" y="60.5" width="110" height="1.8"/>
        ${ray(120, 64, 104, 168)}${ray(200, 64, 200, 168)}${ray(360, 64, 376, 168)}
        ${co(250, 58, 250, 100, 1)}${co(150, 62, 150, 112, 2)}${co(301.5, 130, 330, 130, 4)}${co(433, 170, 408, 146, 5)}
        ${dimH(44.5, 435.5, 30, "1600", 56)}${dimV(56, 172, 468, "450", 438)}</g>`),
      bar: () => svg("0 0 240 240", `
        <line class="cl" x1="120" y1="40" x2="120" y2="222"/>
        <path class="l" style="fill:METAL" d="M84 70 H156 Q174 70 174 88 V142 H66 V88 Q66 70 84 70 Z"/>
        <rect class="l" x="80" y="96" width="80" height="46" style="fill:var(--bg)"/>
        <rect class="l pcb" x="84" y="100" width="72" height="5"/>
        <rect class="glow" x="96" y="105" width="8" height="3"/><rect class="glow" x="116" y="105" width="8" height="3"/><rect class="glow" x="136" y="105" width="8" height="3"/>
        <rect class="l acr" x="80" y="132" width="80" height="6"/>
        <path class="l thin" d="M80 138 ${Array.from({ length: 10 }, (_, i) => `l4 3 l4 -3`).join(" ")}"/>
        ${ray(100, 142, 72, 216)}${ray(120, 142, 120, 218)}${ray(140, 142, 168, 216)}
        ${co(170, 82, 214, 60, 1)}${co(150, 102, 214, 104, 2)}${co(152, 135, 214, 140, 3)}
        ${dimH(66, 174, 52, "18", 70)}${dimV(70, 142, 40, "12", 66)}`),
      clamp: () => svg("0 0 260 240", `
        <rect x="20" y="130" width="180" height="24" fill="HATCH"/><rect class="l" x="20" y="130" width="180" height="24"/>
        <path class="l" style="fill:METAL" d="M150 122 H226 V170 H196 V162 H218 V130 H150 Z"/>
        <path class="l body" d="M158 122 V50 Q158 32 140 30 H30 V36 H138 Q164 38 164 52 V122 Z"/>
        <rect class="glow" x="30" y="36" width="104" height="1.8"/>
        <rect class="l body" x="205" y="170" width="6" height="14"/><rect class="l body" x="199" y="184" width="18" height="5" rx="2"/>
        ${note(24, 124, "DESK")}
        ${co(161, 90, 214, 76, 4)}${co(222, 150, 244, 120, 5)}
        ${dimV(130, 154, 244, "≤ 40", 226)}`)
    },
    "industrial-pendant": {
      // 실제 스펙: 몸체 L1050 × D55 × H70, 앤드캡 H70.4 × W54.6 × D30, 후렌지 L400 × W40 × H36.8, 와이어 조절부 L300 × H12
      elev: () => svg("0 0 620 300", `
        <rect x="20" y="14" width="580" height="10" fill="HATCH"/><line class="l" x1="20" y1="24" x2="600" y2="24"/>
        <rect class="l" style="fill:METAL" x="210" y="24" width="200" height="18.4"/>
        <line class="l thin" x1="250" y1="42" x2="250" y2="120"/><line class="l thin" x1="370" y1="42" x2="370" y2="120"/>
        <rect class="l" style="fill:METAL" x="235" y="120" width="150" height="6"/>
        <line class="l thin" x1="240" y1="126" x2="62" y2="205"/><line class="l thin" x1="380" y1="126" x2="558" y2="205"/>
        <rect class="l" x="45" y="205" width="530" height="35"/>
        <rect class="l" style="fill:METAL" x="45" y="205" width="15" height="35.2"/><rect class="l" style="fill:METAL" x="560" y="205" width="15" height="35.2"/>
        <rect class="glow" x="62" y="238" width="496" height="2"/><rect class="glow" x="62" y="205" width="496" height="1.6"/>
        ${ray(150, 205, 140, 185)}${ray(310, 205, 310, 182)}${ray(470, 205, 480, 185)}
        ${ray(150, 241, 140, 272)}${ray(310, 241, 310, 278)}${ray(470, 241, 480, 272)}
        ${note(310, 198, "INDIRECT 11 W · 2700 K", "middle")}${note(310, 290, "MAIN 21 W · 2700–6500 K", "middle")}
        ${dimH(45, 575, 262, "1050", 240)}${dimH(210, 410, 58, "400 (FLANGE)", 42)}${dimH(235, 385, 110, "300", 120)}
        ${dimV(205, 240, 600, "70", 575)}
        ${co(300, 33, 300, 8, 1)}${co(330, 123, 420, 100, 2)}${co(150, 166, 120, 150, 3)}${co(52, 222, 24, 222, 6)}${co(200, 222, 200, 278, 7)}`),
      section: () => svg("0 0 300 300", `
        <line class="cl" x1="150" y1="20" x2="150" y2="280"/>
        <path class="l" style="fill:METAL" d="M68 45 H232 V255 H68 Z M78 70 V230 H222 V70 Z"/>
        <rect class="l acr" x="78" y="45" width="144" height="12"/>
        <rect class="l acr" x="78" y="243" width="144" height="12"/>
        <rect class="l pcb" x="98" y="72" width="104" height="6"/><rect class="l pcb" x="98" y="222" width="104" height="6"/>
        <rect class="glow" x="110" y="78" width="80" height="3"/><rect class="glow" x="110" y="219" width="80" height="3"/>
        <rect class="l thin" x="86" y="120" width="128" height="60" style="fill:var(--bg)"/>${note(150, 154, "DRIVER BAY", "middle")}
        ${ray(120, 45, 100, 22)}${ray(150, 45, 150, 18)}${ray(180, 45, 200, 22)}
        ${ray(120, 255, 100, 282)}${ray(150, 255, 150, 286)}${ray(180, 255, 200, 282)}
        ${dimH(68, 232, 292, "55", 255)}${dimV(45, 255, 262, "70", 232)}
        ${co(160, 50, 270, 40, 8)}${co(160, 75, 270, 80, 4)}${co(225, 140, 270, 140, 7)}${co(160, 250, 270, 252, 8)}`),
      endcap: () => svg("0 0 300 300", `
        <rect class="l" style="fill:METAL" x="40" y="60" width="109.2" height="140.8" rx="6"/>
        ${Array.from({ length: 11 }, (_, i) => `<line class="l thin" x1="46" y1="${72 + i * 12}" x2="143" y2="${72 + i * 12}"/>`).join("")}
        <text x="94.6" y="134" text-anchor="middle" class="note">LUMEN LINE</text>
        <rect class="l" style="fill:METAL" x="190" y="60" width="60" height="140.8" rx="4"/>
        <line class="l thin" x1="205" y1="60" x2="205" y2="200.8"/>
        ${dimH(40, 149.2, 228, "54.6", 200.8)}${dimV(60, 200.8, 22, "70.4", 40)}${dimH(190, 250, 228, "30", 200.8)}
        ${note(94.6, 262, "FRONT · SATIN HAIRLINE (H)", "middle")}${note(220, 262, "SIDE", "middle")}
        ${note(94.6, 278, "ENGRAVED WORDMARK", "middle")}`),
      options: () => svg("0 0 620 200", [0, 1, 2].map(i => { const x = 20 + i * 205;
        const flange = i === 0 ? `<rect class="l" style="fill:METAL" x="${x + 8}" y="30" width="24" height="8"/><rect class="l" style="fill:METAL" x="${x + 148}" y="30" width="24" height="8"/><line class="l thin" x1="${x + 20}" y1="38" x2="${x + 20}" y2="120"/><line class="l thin" x1="${x + 160}" y1="38" x2="${x + 160}" y2="120"/>`
          : `<rect class="l" style="fill:METAL" x="${x + 50}" y="30" width="80" height="8"/><line class="l thin" x1="${x + 70}" y1="38" x2="${x + 70}" y2="70"/><line class="l thin" x1="${x + 110}" y1="38" x2="${x + 110}" y2="70"/><rect class="l" x="${x + 60}" y="70" width="60" height="3"/><line class="l thin" x1="${x + 62}" y1="73" x2="${x + 12}" y2="120"/><line class="l thin" x1="${x + 118}" y1="73" x2="${x + 168}" y2="120"/>`;
        const caps = i === 2 ? `<path class="l" style="fill:METAL" d="M${x} 120 h10 v14 h-10 q-4 -7 0 -14z M${x + 180} 120 h-10 v14 h10 q4 -7 0 -14z"/>` : `<rect class="l" style="fill:METAL" x="${x}" y="120" width="8" height="14"/><rect class="l" style="fill:METAL" x="${x + 172}" y="120" width="8" height="14"/>`;
        return `<line class="l" x1="${x}" y1="24" x2="${x + 180}" y2="24"/>${flange}<rect class="l" x="${x}" y="120" width="180" height="14"/>${caps}
          <text x="${x + 90}" y="166" text-anchor="middle" class="note">${["1. BOTH ENDS", "2. CENTER", "3. CENTER + NEW END CAP"][i]}</text>
          ${i === 2 ? `<text x="${x + 90}" y="182" text-anchor="middle" class="note">SELECTED</text>` : ""}`; }).join("")),
      exploded: () => svg("0 0 520 420", `
        <rect class="l" style="fill:METAL" x="200" y="20" width="120" height="14"/>${co(320, 27, 480, 27, 1)}
        <rect class="l" style="fill:METAL" x="215" y="70" width="90" height="6"/>${co(305, 73, 480, 73, 2)}
        <line class="l thin" x1="230" y1="34" x2="230" y2="70"/><line class="l thin" x1="290" y1="34" x2="290" y2="70"/><line class="l thin" x1="220" y1="76" x2="120" y2="120"/>${co(170, 98, 480, 110, 3)}
        <rect class="l acr" x="70" y="150" width="380" height="10"/>${co(440, 155, 480, 155, 8)}
        <rect class="l pcb" x="90" y="190" width="340" height="6"/>${co(420, 193, 480, 193, 4)}
        <path class="l" style="fill:METAL" d="M60 230 H460 V290 H60 Z M70 240 V280 H450 V240 Z"/>${co(455, 260, 480, 240, 7)}
        <rect class="l thin" x="60" y="300" width="400" height="6"/>${co(440, 303, 480, 290, 5)}
        <rect class="l pcb" x="90" y="330" width="340" height="6"/>
        <rect class="l acr" x="70" y="360" width="380" height="10"/>
        <rect class="l" style="fill:METAL" x="14" y="228" width="30" height="64" rx="3"/><rect class="l" style="fill:METAL" x="476" y="228" width="30" height="64" rx="3"/>${co(29, 296, 29, 330, 6)}
        ${[150, 190, 300, 330, 360].map(y => `<line class="cl" x1="260" y1="${y - 8}" x2="260" y2="${y}"/>`).join("")}`)
    },
    "cove-studies": {
      cove: () => svg("0 0 420 240", `
        <rect x="20" y="20" width="380" height="18" fill="HATCH"/><line class="l" x1="20" y1="38" x2="400" y2="38"/>
        <rect x="6" y="38" width="14" height="190" fill="HATCH"/><line class="l" x1="20" y1="38" x2="20" y2="228"/>
        <rect class="l" x="20" y="120" width="200" height="9"/>
        <rect class="l" x="211" y="64" width="9" height="65"/>
        <rect class="l" x="180" y="110" width="26" height="10"/><rect class="glow" x="190" y="106" width="12" height="4"/>
        <path class="ray" d="M200 108 Q250 44 400 42"/><path class="ray" d="M200 108 Q290 76 400 62"/><path class="ray" d="M196 106 Q210 60 290 40"/>
        ${co(320, 28, 340, 214, 1)}${co(100, 124, 100, 180, 2)}${co(216, 96, 250, 180, 3)}${co(196, 108, 160, 180, 4)}
        ${dimV(38, 64, 236, "150", 220)}${dimV(64, 129, 236, "120", 220)}${dimH(20, 220, 152, "600", 129)}`),
      rcp: () => svg("0 0 420 310", `
        <rect class="l" x="40" y="30" width="340" height="240"/>
        <rect class="l cl" x="68" y="58" width="284" height="184"/>
        <rect class="l" x="150" y="128" width="56" height="40" rx="6"/><rect class="glow" x="156" y="134" width="44" height="28" rx="3"/>
        <rect class="l" x="214" y="128" width="56" height="40" rx="6"/><rect class="glow" x="220" y="134" width="44" height="28" rx="3"/>
        <line class="l" x1="120" y1="268" x2="300" y2="268"/><line class="l" x1="120" y1="272" x2="300" y2="272"/>
        <text class="lab" x="210" y="262" text-anchor="middle">WINDOW</text>
        ${co(270, 130, 330, 100, 5)}
        ${dimH(40, 380, 296, "5400", 274)}${dimV(30, 270, 402, "4200", 384)}`)
    }
  };
  window.drawing = (slug, key) => (D[slug] && D[slug][key] ? D[slug][key]() : "");
})();
