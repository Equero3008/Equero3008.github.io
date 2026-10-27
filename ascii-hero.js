/* ASCII-Hero: Augen -> Name (Animation aus resources/ascii-intro.html) */
(() => {
/* ===== Edit these ===== */
const CONFIG = {
  name: "Enrico Kleffmann",
  font: '900 {size}px "Arial Black", Impact, "Helvetica Neue", sans-serif', // font used to draw the name
  cols: 90,              // grid width in characters
  rows: 22,              // grid height in characters
  ramp: " .:-=+*#%@",    // light -> dark characters used to draw shapes
  glyphs: "!<>-_\\/[]{}=+*^?#@$%&", // scramble characters during morphs
  fallMs: 2600,          // intro trickle-down
  blinks: 2,             // blinks in the intro
  blinkMs: 380,          // one blink
  morphMs: 1800,         // eyes <-> name transition
  holdMs: 7000,          // how long your name stays before the eyes return
  loop: true,            // false = eyes never come back after the intro
  dust: 90,              // drifting background specks (0 to turn off)
  halo: 70,              // twinkles hugging the eyes / name
  splash: 0.3,           // chance a landing drip throws sparks (0-1)
  burst: 0.2,            // chance each morphing cell throws sparks (0-1)
};
/* ====================== */

const COLS = CONFIG.cols, ROWS = CONFIG.rows;
const CW = 6, CH = 10; // canvas pixels per character cell
const wrap = document.getElementById("ascii-hero");
const out = wrap.querySelector("pre");
wrap.querySelector("h1").textContent = CONFIG.name;

const cvs = document.createElement("canvas");
cvs.width = COLS * CW;
cvs.height = ROWS * CH;
const ctx = cvs.getContext("2d", { willReadFrequently: true });

/* Turn whatever is drawn on the hidden canvas into a grid of characters */
function sample(boost = 1) {
  const d = ctx.getImageData(0, 0, cvs.width, cvs.height).data;
  const g = new Array(COLS * ROWS);
  const R = CONFIG.ramp, n = R.length - 1;
  for (let r = 0; r < ROWS; r++) {
    for (let c = 0; c < COLS; c++) {
      let s = 0, k = 0;
      for (let y = r * CH; y < (r + 1) * CH; y += 2)
        for (let x = c * CW; x < (c + 1) * CW; x += 2) {
          s += d[(y * cvs.width + x) * 4 + 3];
          k++;
        }
      const a = Math.min(1, s / (k * 255) * boost);
      g[r * COLS + c] = a < 0.08 ? " " : R[Math.max(1, Math.min(n, Math.round(a * n)))];
    }
  }
  return g;
}

/* Two almond eyes. open: 1 open -> 0 closed. look: -1 left, 0 center, 1 right */
const eyeCache = new Map();
function eyes(open, look = 0) {
  const ok = Math.round(open * 20), lk = Math.round(look * 10), key = ok + "|" + lk;
  if (eyeCache.has(key)) return eyeCache.get(key);
  open = ok / 20; look = lk / 10;

  const W = cvs.width, H = cvs.height;
  ctx.clearRect(0, 0, W, H);
  const rx = W * 0.17, ry = Math.min(H * 0.34, rx * 0.62), h = ry * open, cy = H / 2;

  // each eye is a bit different: size, height, tilt, lid weight, pupil offset
  const EYES = [
    { x: 0.27, dy: -0.04, sx: 1.05, sy: 0.92, rot: -0.10, lid: 0.8, pup: 0.46, ox: 0.10, oy: 0.05 },
    { x: 0.73, dy:  0.05, sx: 0.90, sy: 1.08, rot:  0.07, lid: 1.2, pup: 0.30, ox: -0.08, oy: -0.04 },
  ];
  for (const e of EYES) {
    const cx = W * e.x, ey = cy + H * e.dy, erx = rx * e.sx, eh = h * e.sy;
    const ix = look * erx * 0.45 + erx * e.ox, iy = ry * e.oy; // iris follows look, slightly off-centre
    ctx.save();
    ctx.translate(cx, ey);
    ctx.rotate(e.rot);
    ctx.beginPath();
    ctx.moveTo(-erx, 0);
    ctx.quadraticCurveTo(-erx * 0.1, -2.3 * eh, erx, -eh * 0.2);   // lopsided upper lid
    ctx.quadraticCurveTo(erx * 0.2, 1.6 * eh, -erx, 0);             // flatter lower lid
    ctx.closePath();
    ctx.fillStyle = "rgba(255,255,255,.15)";
    ctx.fill();
    ctx.lineWidth = CH * e.lid;
    ctx.strokeStyle = "#fff";
    ctx.stroke();
    ctx.clip();
    ctx.fillStyle = "#fff";
    ctx.beginPath(); ctx.arc(ix, iy, ry * 0.72, 0, Math.PI * 2); ctx.fill();   // iris
    ctx.globalCompositeOperation = "destination-out";
    ctx.beginPath(); ctx.arc(ix + ry * 0.05, iy, ry * e.pup, 0, Math.PI * 2); ctx.fill();   // pupil
    ctx.globalCompositeOperation = "source-over";
    ctx.beginPath(); ctx.arc(ix + ry * 0.3, iy - ry * 0.25, ry * 0.09, 0, Math.PI * 2); ctx.fill(); // glint
    ctx.restore();
  }
  const g = sample();
  eyeCache.set(key, g);
  return g;
}

/* Your name: one word per line, stretched tall and bold so it stays readable */
function textFrame(text) {
  const W = cvs.width, H = cvs.height, words = text.split(" "), STRETCH = 1.55;
  ctx.clearRect(0, 0, W, H);
  ctx.fillStyle = "#fff";
  ctx.textAlign = "center";
  ctx.textBaseline = "middle";
  let size = H;
  for (const w of words) {
    ctx.font = CONFIG.font.replace("{size}", size);
    size = Math.min(size, size * (W * 0.96) / ctx.measureText(w).width);
  }
  size = Math.min(size, H / words.length / STRETCH / 0.8);
  ctx.font = CONFIG.font.replace("{size}", size);
  ctx.lineWidth = size * 0.04; ctx.strokeStyle = "#fff"; ctx.lineJoin = "round";
  words.forEach((w, i) => {
    const y = H * (i + 0.5) / words.length;
    ctx.save();
    ctx.translate(W / 2, y);
    ctx.scale(1, STRETCH);
    ctx.fillText(w, 0, 0);
    ctx.strokeText(w, 0, 0);
    ctx.restore();
  });
  return sample(2);
}

const toText = g => {
  let s = "";
  for (let r = 0; r < ROWS; r++) s += g.slice(r * COLS, (r + 1) * COLS).join("") + (r < ROWS - 1 ? "\n" : "");
  return s;
};

/* ---------- Trickle down ---------- */
let particles = [];
function makeParticles(target) {
  particles = [];
  target.forEach((ch, i) => {
    if (ch === " ") return;
    const dur = 700 + Math.random() * 700;
    particles.push({
      x: i % COLS, ty: (i / COLS) | 0, ch,
      y0: -1 - Math.random() * ROWS,
      delay: Math.random() * (CONFIG.fallMs - dur),
      dur,
    });
  });
}
function fallGrid(t) {
  const g = new Array(COLS * ROWS).fill(" ");
  const putIfEmpty = (x, y, c) => { if (y >= 0 && y < ROWS && g[y * COLS + x] === " ") g[y * COLS + x] = c; };
  for (const p of particles) {
    const k = (t - p.delay) / p.dur;
    if (k <= 0) continue;
    if (k >= 1) {
      g[p.ty * COLS + p.x] = p.ch;
      if (!p.landed) { p.landed = true; if (Math.random() < CONFIG.splash) splash(p.x, p.ty); }
      continue;
    }
    const y = Math.round(p.y0 + (p.ty - p.y0) * k * k);
    putIfEmpty(p.x, y, k > 0.85 ? p.ch : "|");
    putIfEmpty(p.x, y - 1, ":");
    putIfEmpty(p.x, y - 2, ".");
  }
  return g;
}

/* ---------- Blink & look helpers ---------- */
function blinkAt(t, startT) {
  const local = (t - startT) / CONFIG.blinkMs;
  return local >= 0 && local <= 1 ? 1 - Math.sin(Math.PI * local) : 1;
}
const introBlinkStart = 500, blinkCycle = CONFIG.blinkMs + 300;
const introBlinkMs = introBlinkStart + CONFIG.blinks * blinkCycle + 300;
function introOpen(t) {
  let o = 1;
  for (let i = 0; i < CONFIG.blinks; i++) o = Math.min(o, blinkAt(t, introBlinkStart + i * blinkCycle));
  return o;
}

// look-around keyframes: [time ms, direction]
const LOOK = [[0, 0], [350, 0], [700, -1], [1250, -1], [1850, 1], [2400, 1], [2750, 0]];
const lookBlink = 2850, lookMs = lookBlink + CONFIG.blinkMs + 350;
function lookAt(t) {
  for (let i = 1; i < LOOK.length; i++) {
    const [t1, v1] = LOOK[i], [t0, v0] = LOOK[i - 1];
    if (t <= t1) { let k = (t - t0) / (t1 - t0); k = k * k * (3 - 2 * k); return v0 + (v1 - v0) * k; }
  }
  return 0;
}

/* ---------- Morph between any two frames ---------- */
let eyeOpen, nameG, delays, burstDone = [];
function makeDelays() {
  delays = nameG.map((_, i) => (i % COLS) / COLS * CONFIG.morphMs * 0.55 + Math.random() * CONFIG.morphMs * 0.2);
  burstDone = [];
}
function morphGrid(from, to, t) {
  const G = CONFIG.glyphs;
  return to.map((b, i) => {
    const a = from[i];
    if (a === " " && b === " ") return " ";
    if (t < delays[i]) return a;
    if (t < delays[i] + 250) {
      if (!burstDone[i]) {
        burstDone[i] = true;
        if (Math.random() < CONFIG.burst) burstFrom(i % COLS, (i / COLS) | 0);
      }
      return G[(Math.random() * G.length) | 0];
    }
    return b;
  });
}

/* ---------- Scatter effects (only drawn in empty cells) ---------- */
const rnd = (a, b) => a + Math.random() * (b - a);

let dust = [];
function makeDust() {
  dust = Array.from({ length: CONFIG.dust }, () => ({
    x: rnd(0, COLS), y: rnd(0, ROWS),
    vx: rnd(-1.2, 1.2), vy: rnd(0.6, 2.5),
    ch: ".`',:·"[(Math.random() * 6) | 0],
    tw: Math.random() < 0.3, ph: rnd(0, 6.28),
  }));
}

let sparks = [];
function splash(x, y) {
  const n = 1 + ((Math.random() * 3) | 0);
  for (let i = 0; i < n; i++)
    sparks.push({ x, y: y - 0.5, vx: rnd(-6, 6), vy: rnd(-9, -3), life: 0, max: rnd(0.3, 0.6) });
}
function burstFrom(x, y) {
  const dx = x - COLS / 2, dy = (y - ROWS / 2) * 1.7, d = Math.hypot(dx, dy) || 1;
  const sp = rnd(8, 18);
  sparks.push({ x, y, vx: dx / d * sp + rnd(-3, 3), vy: dy / d * sp * 0.55 + rnd(-3, 1), life: 0, max: rnd(0.5, 1.1) });
}

let halo = [], haloFor = null;
function makeHalo(target) {
  haloFor = target;
  const cand = [];
  for (let r = 0; r < ROWS; r++)
    for (let c = 0; c < COLS; c++) {
      if (target[r * COLS + c] !== " ") continue;
      let near = false;
      for (let dy = -2; dy <= 2 && !near; dy++)
        for (let dx = -5; dx <= 5 && !near; dx++) {
          const rr = r + dy, cc = c + dx;
          if (rr >= 0 && rr < ROWS && cc >= 0 && cc < COLS && target[rr * COLS + cc] !== " ") near = true;
        }
      if (near) cand.push(r * COLS + c);
    }
  halo = [];
  for (let i = 0; i < CONFIG.halo && cand.length; i++) {
    const j = (Math.random() * cand.length) | 0;
    halo.push({ i: cand.splice(j, 1)[0], ph: rnd(0, 6.28), sp: rnd(2, 5) });
  }
}

function overlay(g, s, dt, showHalo) {
  const put = (x, y, c) => {
    x = Math.round(x); y = Math.round(y);
    if (x >= 0 && x < COLS && y >= 0 && y < ROWS && g[y * COLS + x] === " ") g[y * COLS + x] = c;
  };
  for (const d of dust) {
    d.x += d.vx * dt; d.y += d.vy * dt;
    if (d.y >= ROWS) { d.y -= ROWS + 1; d.x = rnd(0, COLS); }
    if (d.x < 0) d.x += COLS; else if (d.x >= COLS) d.x -= COLS;
    if (d.tw) {
      const b = Math.sin(s * 3 + d.ph);
      put(d.x, d.y, b > 0.8 ? "*" : b > 0.3 ? "+" : ".");
    } else put(d.x, d.y, d.ch);
  }
  if (showHalo) {
    for (const h of halo) {
      const b = Math.sin(s * h.sp + h.ph);
      if (b > 0.4) put(h.i % COLS, (h.i / COLS) | 0, b > 0.92 ? "*" : b > 0.7 ? "+" : "·");
    }
  }
  sparks = sparks.filter(p => (p.life += dt) < p.max);
  for (const p of sparks) {
    p.vy += 18 * dt; p.x += p.vx * dt; p.y += p.vy * dt;
    const k = p.life / p.max;
    put(p.x, p.y, k < 0.3 ? "*" : k < 0.65 ? "'" : ".");
  }
  return g;
}

/* ---------- Sequence: fall → blink → name ⟲ (eyes return → look → name) ---------- */
let phase = "", phaseStart = 0, last = 0, raf = 0, running = false;
function setPhase(p, now) {
  phase = p; phaseStart = now;
  if (p === "toName" || p === "toEyes") makeDelays();
}

function tick(now) {
  const t = now - phaseStart;
  const dt = Math.min(0.05, (now - last) / 1000); last = now;
  let g, haloTarget = eyeOpen, showHalo = true;

  switch (phase) {
    case "fall":
      g = fallGrid(t);
      showHalo = t > CONFIG.fallMs * 0.7;
      if (t >= CONFIG.fallMs) setPhase("blink", now);
      break;
    case "blink":
      g = eyes(introOpen(t)).slice();
      if (t >= introBlinkMs) setPhase("toName", now);
      break;
    case "toName":
      g = morphGrid(eyeOpen, nameG, t);
      haloTarget = t < CONFIG.morphMs / 2 ? eyeOpen : nameG;
      if (t >= CONFIG.morphMs) setPhase("name", now);
      break;
    case "name":
      g = nameG.slice();
      haloTarget = nameG;
      if (CONFIG.loop && t >= CONFIG.holdMs) setPhase("toEyes", now);
      break;
    case "toEyes":
      g = morphGrid(nameG, eyeOpen, t);
      haloTarget = t < CONFIG.morphMs / 2 ? nameG : eyeOpen;
      if (t >= CONFIG.morphMs) setPhase("look", now);
      break;
    case "look":
      g = eyes(blinkAt(t, lookBlink), lookAt(t)).slice();
      if (t >= lookMs) setPhase("toName", now);
      break;
  }

  if (haloFor !== haloTarget) makeHalo(haloTarget);
  out.textContent = toText(overlay(g, now / 1000, dt, showHalo));
  raf = requestAnimationFrame(tick);
}

function start() {
  if (running) return;
  running = true;
  last = performance.now();
  raf = requestAnimationFrame(tick);
}
function stop() { running = false; cancelAnimationFrame(raf); }

function play() {
  stop();
  nameG = textFrame(CONFIG.name);
  eyeOpen = eyes(1);
  if (matchMedia("(prefers-reduced-motion: reduce)").matches) {
    out.textContent = toText(nameG);
    return;
  }
  makeDust();
  sparks = [];
  haloFor = null;
  makeParticles(eyeOpen);
  setPhase("fall", performance.now());
  start();
}

/* ---------- Size to the container ---------- */
let charRatio = 0.6;
function measureChar() {
  const probe = document.createElement("span");
  probe.textContent = "M".repeat(100);
  probe.style.cssText = "position:absolute;visibility:hidden;font-size:100px;white-space:pre;";
  out.appendChild(probe);
  charRatio = probe.getBoundingClientRect().width / 10000 || 0.6;
  probe.remove();
}
function fit() {
  out.style.fontSize = (wrap.clientWidth / (COLS * charRatio)) + "px";
}
new ResizeObserver(fit).observe(wrap);

/* Pause when scrolled out of view, resume when back */
new IntersectionObserver(([e]) => {
  if (!phase || matchMedia("(prefers-reduced-motion: reduce)").matches) return;
  e.isIntersecting ? start() : stop();
}).observe(wrap);

out.addEventListener("click", play);

document.fonts.ready.then(() => {
  measureChar();
  fit();
  play();
});
})();
