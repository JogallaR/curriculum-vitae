// ══════════════════════════════════════════
//  IDIOMA
// ══════════════════════════════════════════
const flags = {
  ca: 'https://upload.wikimedia.org/wikipedia/commons/c/ce/Flag_of_Catalonia.svg',
  es: 'https://upload.wikimedia.org/wikipedia/commons/8/89/Bandera_de_Espa%C3%B1a.svg',
  en: 'https://upload.wikimedia.org/wikipedia/commons/a/a5/Flag_of_the_United_Kingdom_%281-2%29.svg'
};
const langNames = { ca: 'Català', es: 'Español', en: 'English' };

function canviarIdioma(l) {
  lang = l;
  const d = T[l];
  document.querySelectorAll('[data-key]').forEach(el => {
    const k = el.getAttribute('data-key');
    if (d[k]) el.textContent = d[k];
  });
  document.querySelectorAll('[data-ph]').forEach(el => {
    const k = el.getAttribute('data-ph');
    if (d[k]) el.placeholder = d[k];
  });

  const selEl = document.getElementById('langSelected');
  if (selEl) selEl.innerHTML = `<img src="${flags[l]}" style="width:16px;border-radius:2px;"> <span data-key="lang-${l}">${d['lang-' + l]}</span>`;

  renderModuleList();
  actualitzar();
}
