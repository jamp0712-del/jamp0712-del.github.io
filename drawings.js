// 제품 도면 (SVG). 치수 단위 mm. 원 번호는 details.js의 parts 순서와 같아요.
(() => {
  let uid = 0;
  const svg = (vb, body) => {
    const id = "h" + (++uid);
    return `<svg class="dwg" viewBox="${vb}" xmlns="http://www.w3.org/2000/svg" role="img">
      <defs><pattern id="${id}" width="6" height="6" patternUnits="userSpaceOnUse" patternTransform="rotate(45)">
      <line x1="0" y1="0" x2="0" y2="6" class="hl"/></pattern></defs>${body.replace(/HATCH/g, `url(#${id})`)}</svg>`;
  };
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
  const mlBody = (x, y) => `<rect class="l body" x="${x}" y="${y}" width="83" height="211"/>
    <rect class="l" x="${x + 6}" y="${y + 30}" width="71" height="151" fill="var(--bg)"/>
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
      plan: () => svg("0 0 420 320", `
        <line class="cl" x1="40" y1="152" x2="380" y2="152"/><line class="cl" x1="210" y1="32" x2="210" y2="272"/>
        <rect class="l" x="60" y="50" width="300" height="204" rx="26"/>
        <rect class="l thin" x="65" y="55" width="290" height="194" rx="21"/>
        <rect class="l thin" x="70" y="60" width="280" height="184" rx="17"/>
        <rect class="l thin" x="75" y="65" width="270" height="174" rx="13"/>
        <rect class="glow l" x="82" y="72" width="256" height="160" rx="9"/>
        <text class="lab" x="210" y="156" text-anchor="middle">A</text>
        ${dimH(60, 360, 292, "620", 254)}${dimV(50, 254, 392, "420", 360)}`),
      elev: () => svg("0 0 420 200", `
        <rect x="20" y="26" width="380" height="14" fill="HATCH"/><line class="l" x1="20" y1="40" x2="400" y2="40"/>
        <rect class="l" x="74" y="40" width="272" height="8"/>
        <path class="l acr" d="M60 48 H360 V78 Q360 90 348 90 H72 Q60 90 60 78 Z"/>
        <line class="l thin" x1="62" y1="57" x2="358" y2="57"/><line class="l thin" x1="62" y1="64" x2="358" y2="64"/>
        <line class="l thin" x1="62" y1="71" x2="358" y2="71"/><line class="l thin" x1="62" y1="78" x2="358" y2="78"/>
        <rect class="glow" x="82" y="88" width="256" height="3"/>
        ${ray(130, 94, 104, 122)}${ray(210, 94, 210, 124)}${ray(290, 94, 316, 122)}
        ${dimH(60, 360, 160, "620", 92)}${dimV(40, 90, 386, "82", 362)}`),
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
      detail: () => svg("0 0 640 260", `
        <rect x="20" y="20" width="600" height="14" fill="HATCH"/><line class="l" x1="20" y1="34" x2="620" y2="34"/>
        <rect class="l" x="190" y="34" width="56" height="9"/>
        <path class="l" d="M150 34 V50 H620"/><line class="l" x1="150" y1="52" x2="620" y2="52"/>
        <rect class="l" x="150" y="60" width="16" height="24"/><rect class="glow" x="162" y="64" width="4" height="16"/>
        <rect class="l lgp" x="166" y="64" width="454" height="10"/>
        <rect class="glow l" x="166" y="76" width="454" height="6"/>
        <path class="l acr" d="M150 50 H138 V64 H124 V78 H110 V94 Q110 104 120 104 H200 V84 H166 V60 H150 Z"/>
        <line class="l thin" x1="124" y1="86" x2="196" y2="86"/><line class="l thin" x1="124" y1="92" x2="196" y2="92"/><line class="l thin" x1="124" y1="98" x2="196" y2="98"/>
        <rect class="trim" x="136" y="46" width="64" height="4"/>
        ${ray(260, 88, 236, 150)}${ray(330, 88, 330, 154)}${ray(400, 88, 424, 150)}
        ${co(560, 51, 560, 214, 1)}${co(218, 38, 260, 214, 2)}${co(158, 72, 210, 214, 3)}
        ${co(480, 69, 460, 214, 4)}${co(420, 79, 400, 214, 5)}${co(116, 96, 110, 214, 6)}${co(170, 48, 160, 214, 7)}
        ${dimV(34, 104, 72, "82", 110)}`)
    },
    "clear-sconce": {
      front: () => svg("0 0 300 360", `
        <line class="cl" x1="150" y1="24" x2="150" y2="336"/>
        <path class="l acr" d="M100 132 V62 Q100 40 122 40 H178 Q200 40 200 62 V132"/>
        <path class="l acr" d="M100 228 V298 Q100 320 122 320 H178 Q200 320 200 298 V228"/>
        <rect class="l body" x="108" y="130" width="84" height="100"/>
        ${[118, 128, 138, 148, 158, 168, 178].map(x => `<line class="l thin" x1="${x + 2}" y1="134" x2="${x + 2}" y2="226"/>`).join("")}
        <rect class="l" x="104" y="130" width="4" height="100"/><rect class="l" x="192" y="130" width="4" height="100"/>
        <rect class="glow" x="110" y="126" width="80" height="3"/><rect class="glow" x="110" y="231" width="80" height="3"/>
        ${co(194, 200, 250, 250, 6)}
        ${dimH(100, 200, 346, "120", 322)}${dimV(40, 320, 268, "260", 204)}`),
      side: () => svg("0 0 300 360", `
        <rect x="26" y="20" width="16" height="320" fill="HATCH"/><line class="l" x1="42" y1="20" x2="42" y2="340"/>
        <rect class="l" x="42" y="150" width="6" height="60"/>
        <rect class="l body" x="48" y="130" width="58" height="100"/>
        <path class="acr-thick" d="M58 130 C58 96 112 96 132 64 L144 40"/><path class="l" d="M58 130 C58 96 112 96 132 64 L144 40"/>
        <path class="acr-thick" d="M58 230 C58 264 112 264 132 296 L144 320"/><path class="l" d="M58 230 C58 264 112 264 132 296 L144 320"/>
        <rect class="glow" x="60" y="126" width="40" height="3"/><rect class="glow" x="60" y="231" width="40" height="3"/>
        ${ray(80, 122, 128, 30)}${ray(96, 122, 170, 46)}${ray(80, 238, 128, 330)}${ray(96, 238, 170, 314)}
        ${co(45, 196, 22, 252, 1)}${co(90, 180, 200, 180, 2)}${co(80, 127, 210, 120, 3)}${co(120, 80, 220, 76, 4)}${co(120, 280, 220, 284, 5)}
        ${dimH(42, 144, 348, "90", 322)}`)
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
        ${dimV(57, 345, 236, "96", 189)}${dimH(71.5, 188.5, 393, "39", 346)}`),
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
        ${dimV(57, 345, 236, "96", 167)}${dimH(28, 166, 393, "46", 346)}`),
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
        ${dimH(50, 710, 278, "1100", 212)}${dimV(150, 207.6, 744, "96", 712)}${dimV(28, 150, 40, "≤ 1500", 84)}`),
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
      elev: () => svg("0 0 460 230", `
        <rect x="20" y="172" width="420" height="12" fill="HATCH"/><line class="l" x1="20" y1="172" x2="440" y2="172"/>
        <rect class="l" x="62" y="62" width="5" height="122"/><rect class="l" x="393" y="62" width="5" height="122"/>
        <rect class="l" x="57" y="184" width="15" height="6"/><rect class="l" x="388" y="184" width="15" height="6"/>
        <rect class="l body" x="55" y="54" width="350" height="8" rx="4"/>
        <rect class="glow" x="72" y="62" width="316" height="2"/>
        ${ray(110, 66, 86, 168)}${ray(230, 66, 230, 168)}${ray(350, 66, 374, 168)}
        ${co(395, 120, 424, 120, 4)}${co(64, 187, 40, 214, 5)}
        ${dimH(55, 405, 30, "1600", 54)}${dimV(54, 172, 446, "450", 405)}`),
      bar: () => svg("0 0 220 230", `
        <line class="cl" x1="110" y1="30" x2="110" y2="200"/>
        <rect class="l body" x="70" y="60" width="80" height="52" rx="16" fill="HATCH"/>
        <rect class="l" x="84" y="78" width="52" height="16" fill="var(--bg)"/>
        <rect class="glow" x="92" y="90" width="36" height="4"/>
        <path class="l acr" d="M84 100 Q110 112 136 100 V96 H84 Z"/>
        ${ray(96, 110, 70, 200)}${ray(124, 110, 150, 200)}
        ${co(140, 66, 186, 50, 1)}${co(110, 92, 186, 130, 2)}${co(124, 104, 186, 160, 3)}
        ${dimH(70, 150, 36, "18", 60)}${dimV(60, 112, 30, "12", 70)}`)
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
