// Galeria com transição + diagrama sincronizado.
// Cada <figure class="showcase"> tem imagens em .stage com data-step e data-title/data-text;
// o diagrama ligado (data-diagram="id") tem <g class="node" data-step="...">.
(function () {
  document.querySelectorAll(".showcase").forEach((show) => {
    const slides = [...show.querySelectorAll(".stage img")];
    if (!slides.length) return;
    const dur = Number(show.dataset.interval || 6000);
    const diagram = document.getElementById(show.dataset.diagram);
    const nodes = diagram ? [...diagram.querySelectorAll(".node")] : [];
    const cap = show.querySelector(".caption");
    const bar = show.querySelector(".progress");
    bar.innerHTML = slides.map(() => "<i><b></b></i>").join("");
    const ticks = [...bar.children];
    show.style.setProperty("--dur", dur + "ms");

    let cur = 0, timer = null, paused = false;

    function go(i) {
      cur = (i + slides.length) % slides.length;
      slides.forEach((s, k) => s.classList.toggle("on", k === cur));
      // reinicia a animação Ken Burns
      const img = slides[cur]; img.style.animation = "none"; void img.offsetWidth; img.style.animation = "";
      const s = slides[cur];
      cap.innerHTML = `<strong>${cur + 1}. ${s.dataset.title}</strong><span>${s.dataset.text || ""}</span>`;
      ticks.forEach((t, k) => {
        t.className = k < cur ? "done" : k === cur ? "cur" : "";
        const b = t.firstChild; b.style.animation = "none"; void b.offsetWidth; b.style.animation = "";
      });
      nodes.forEach((n) => n.classList.toggle("on", n.dataset.step === s.dataset.step));
      schedule();
    }
    function schedule() {
      clearTimeout(timer);
      if (!paused) timer = setTimeout(() => go(cur + 1), dur);
    }
    function setPaused(p) { paused = p; show.classList.toggle("paused", p); if (p) clearTimeout(timer); else schedule(); }

    show.querySelector(".prev").onclick = () => go(cur - 1);
    show.querySelector(".next").onclick = () => go(cur + 1);
    show.querySelector(".stage").onclick = () => go(cur + 1);
    show.addEventListener("mouseenter", () => setPaused(true));
    show.addEventListener("mouseleave", () => setPaused(false));
    nodes.forEach((n) => n.addEventListener("click", () => {
      const k = slides.findIndex((s) => s.dataset.step === n.dataset.step);
      if (k >= 0) go(k);
    }));
    // toque no celular
    let x0 = null;
    show.addEventListener("touchstart", (e) => (x0 = e.touches[0].clientX), { passive: true });
    show.addEventListener("touchend", (e) => {
      if (x0 === null) return;
      const dx = e.changedTouches[0].clientX - x0;
      if (Math.abs(dx) > 40) go(cur + (dx < 0 ? 1 : -1));
      x0 = null;
    });
    // só anda quando visível
    new IntersectionObserver(([e]) => setPaused(!e.isIntersecting), { threshold: 0.3 }).observe(show);

    go(0);
  });
})();
