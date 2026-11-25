const esc = s => String(s).replace(/[&<>"]/g, c => ({ "&": "&amp;", "<": "&lt;", ">": "&gt;", '"': "&quot;" }[c]));
const pad = n => String(n).padStart(2, "0");
const cap = s => s.toLowerCase().replace(/\b\w/g, c => c.toUpperCase());

/* header: hides on scroll down, returns on scroll up; turns white over a dark hero */
function header(opts = {}) {
  const S = window.SITE;
  document.body.insertAdjacentHTML("afterbegin", `
    <header class="hd">
      <a class="name" href="index.html">${esc(cap(S.name))}</a>
      <span class="mid">${esc(S.role)}, Seoul</span>
      <nav><a href="index.html#work">Work</a><a href="index.html#info">Info</a><a href="mailto:${esc(S.email)}">Contact</a></nav>
    </header>`);
  const hd = document.querySelector(".hd");
  let last = scrollY;
  const tick = () => {
    const y = scrollY, overHero = opts.darkHero && y < innerHeight - 60;
    hd.classList.toggle("inv", !!overHero);
    hd.classList.toggle("solid", y > 40 && !overHero);
    hd.classList.toggle("hide", y > last && y > 300);
    last = y;
  };
  addEventListener("scroll", tick, { passive: true }); requestAnimationFrame(tick);
}

function reveal() {
  const io = new IntersectionObserver(es => es.forEach(e => {
    if (e.isIntersecting) { e.target.classList.add("in"); io.unobserve(e.target); }
  }), { rootMargin: "0px 0px -8% 0px" });
  document.querySelectorAll(".rv").forEach(el => io.observe(el));
}

function fadeImgs() {
  document.querySelectorAll("img:not(.fade)").forEach(im => {
    if (im.closest(".lb")) return;
    im.classList.add("fade");
    const ok = () => im.classList.add("ok");
    im.complete && im.naturalWidth ? ok() : im.addEventListener("load", ok, { once: true });
  });
}

(() => { // favicon
  const svg = `<svg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 64 64'><rect width='64' height='64' fill='%23141414'/><text x='32' y='42' font-family='Helvetica,Arial' font-size='26' font-weight='300' fill='%23f3f2ef' text-anchor='middle'>HY</text></svg>`;
  const l = document.createElement("link"); l.rel = "icon"; l.href = "data:image/svg+xml," + svg; document.head.appendChild(l);
})();

document.addEventListener("click", e => { // page fade
  const a = e.target.closest("a");
  if (!a || a.target || e.metaKey || e.ctrlKey) return;
  const href = a.getAttribute("href") || "";
  if (!href.includes(".html") || href.includes("#")) return;
  e.preventDefault();
  document.body.classList.add("out");
  setTimeout(() => (location.href = href), 280);
});
addEventListener("pageshow", () => document.body.classList.remove("out"));
