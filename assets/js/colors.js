// ══════════════════════════════════════════
//  COLORS
// ══════════════════════════════════════════
function setColor(c1, c2) {
  document.querySelectorAll('.color-swatch').forEach(s => s.classList.remove('active'));
  document.querySelector(`.color-swatch[data-c="${c1}"]`)?.classList.add('active');
  document.getElementById('customColor1').value = c1;
  document.getElementById('customColor2').value = c2;
  applyColors(c1, c2);
}
function setCustomColor() {
  document.querySelectorAll('.color-swatch').forEach(s => s.classList.remove('active'));
  applyColors(document.getElementById('customColor1').value, document.getElementById('customColor2').value);
}
function hexToRgb(hex) {
  let result = /^#?([a-f\d]{2})([a-f\d]{2})([a-f\d]{2})$/i.exec(hex);
  return result ? { r: parseInt(result[1], 16), g: parseInt(result[2], 16), b: parseInt(result[3], 16) } : null;
}

function getTextColorForBackground(hex) {
  const rgb = hexToRgb(hex);
  if (!rgb) return '#ffffff';
  // Luma formula
  const lum = (rgb.r * 299 + rgb.g * 587 + rgb.b * 114) / 1000;
  return lum > 140 ? '#111827' : '#ffffff';
}

function applyColors(c1, c2) {
  document.documentElement.style.setProperty('--cv-accent', c1);
  document.documentElement.style.setProperty('--cv-accent2', c2);
  const textC = getTextColorForBackground(c1);
  document.documentElement.style.setProperty('--cv-accent-text-color', textC);

  // Per al Creative, que té un gradient, agafem la mitjana dels dos o tirem del principal
  const textC2 = getTextColorForBackground(c2);
  document.documentElement.style.setProperty('--cv-accent2-text-color', textC2);
  // Si qualsevol dels dos és molt clar, millor utilitzar fosc
  document.documentElement.style.setProperty('--cv-gradient-text-color', textC === '#111827' || textC2 === '#111827' ? '#111827' : '#ffffff');
}

function setFont(fontFamily, btn) {
  document.querySelectorAll('[onclick^="setFont"]').forEach(b => b.classList.remove('active'));
  btn.classList.add('active');
  document.documentElement.style.setProperty('--cv-font', fontFamily);
  actualitzar();
}
