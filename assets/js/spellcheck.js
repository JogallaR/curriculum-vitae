// ══════════════════════════════════════════
//  CORRECTOR ORTOGRÀFIC BÀSIC
// ══════════════════════════════════════════
const dicCA = {
  'cami': 'camí', 'tambe': 'també', 'doncs': 'doncs', 'despres': 'després', 'mes': 'més', 'aqui': 'aquí',
  'anar': 'anar', 'trebal': 'treball', 'treballa': 'treballar', 'formació': 'formació',
  'experencia': 'experiència', 'experiencia': 'experiència', 'idiomes': 'idiomes',
  'habilitats': 'habilitats', 'estudis': 'estudis', 'empresa': 'empresa', 'carec': 'càrrec',
  'titol': 'títol', 'adress': 'adreça', 'correo': 'correu', 'telefon': 'telèfon',
  'gestor': 'gestor', 'director': 'director', 'coordinador': 'coordinador'
};
const dicES = {
  'experiencia': 'experiencia', 'formacion': 'formación', 'habilidades': 'habilidades',
  'idiomas': 'idiomas', 'telefono': 'teléfono', 'correo': 'correo', 'empresa': 'empresa',
  'gestion': 'gestión', 'direccion': 'dirección', 'coordinacion': 'coordinación',
  'tituloo': 'título', 'adress': 'dirección'
};

function spellCheck(el) {
  const dict = lang === 'ca' ? dicCA : lang === 'es' ? dicES : null;
  if (!dict) return;
  const words = el.value.split(/\s+/);
  const suggestions = [];
  words.forEach(w => {
    const lower = w.toLowerCase().replace(/[.,;:!?]/g, '');
    if (dict[lower]) suggestions.push(`"${lower}" → "${dict[lower]}"`);
  });
  let hint = el.nextElementSibling;
  if (!hint || !hint.classList.contains('spell-suggestion')) {
    hint = document.createElement('div');
    hint.className = 'spell-suggestion';
    el.parentNode.insertBefore(hint, el.nextSibling);
  }
  if (suggestions.length) {
    el.classList.add('spell-error');
    hint.textContent = '💡 ' + suggestions.join(', ');
  } else {
    el.classList.remove('spell-error');
    hint.textContent = '';
  }
}
