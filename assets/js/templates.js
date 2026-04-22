// ══════════════════════════════════════════
//  PLANTILLES
// ══════════════════════════════════════════
function setTemplate(t) {
  currentTemplate = t;
  document.querySelectorAll('.tpl-card').forEach(c => c.classList.remove('active'));
  document.getElementById('tpl-' + t).classList.add('active');
  actualitzar();
}
