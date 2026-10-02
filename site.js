// ===== Edite aqui seus contatos (vale para as duas línguas) =====
const CONTATO = {
  whatsapp: "55XXXXXXXXXXX",   // DDI + DDD + número, só dígitos. Ex.: 5535999998888
  email: "seu-email@exemplo.com",
  linkedin: "https://www.linkedin.com/in/raphael-winckler-de-bettio-2b5999110/",
  mensagem: {
    pt: "Olá, Raphael! Vi sua página e gostaria de conversar sobre uma ideia.",
    en: "Hi Raphael! I saw your page and would like to talk about an idea."
  },
  pacote: {
    pt: (nome) => ` Tenho interesse no pacote "${nome}".`,
    en: (nome) => ` I'm interested in the "${nome}" package.`
  }
};
// ================================================================

(function () {
  const lang = document.documentElement.lang.startsWith("en") ? "en" : "pt";
  const configured = (v) => v && !v.includes("X") && !v.includes("exemplo");

  document.querySelectorAll(".js-wa").forEach((a) => {
    if (!configured(CONTATO.whatsapp)) return;
    const pkg = a.dataset.pkg;
    const msg = CONTATO.mensagem[lang] + (pkg ? CONTATO.pacote[lang](pkg) : "");
    a.href = `https://wa.me/${CONTATO.whatsapp}?text=${encodeURIComponent(msg)}`;
    a.target = "_blank";
    a.rel = "noopener";
  });
  document.querySelectorAll(".js-li").forEach((a) => {
    a.href = CONTATO.linkedin; a.target = "_blank"; a.rel = "noopener";
  });
  document.querySelectorAll(".js-mail").forEach((a) => {
    if (configured(CONTATO.email)) a.href = `mailto:${CONTATO.email}`;
  });
  const year = document.getElementById("year");
  if (year) year.textContent = new Date().getFullYear();
})();
