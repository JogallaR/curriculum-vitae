// ══════════════════════════════════════════
//  TABS
// ══════════════════════════════════════════
function showTab(id) {
  document.querySelectorAll('.tab-panel').forEach(p => p.classList.remove('active'));
  document.querySelectorAll('.editor-tab').forEach(t => t.classList.remove('active'));
  document.getElementById(id).classList.add('active');
  document.getElementById('tab-btn-' + id.replace('tab-', '')).classList.add('active');
}

// ══════════════════════════════════════════
//  SECCIONS DESPLEGABLES
// ══════════════════════════════════════════
function toggleSection(id) {
  document.getElementById(id).classList.toggle('open');
}

// ══════════════════════════════════════════
//  NOTIFICACIÓ
// ══════════════════════════════════════════
function notify(msg, type = 'ok') {
  const el = document.getElementById('notif');
  const icon = el.querySelector('i');
  el.className = `notif ${type}`;
  icon.className = `fas ${type === 'ok' ? 'fa-check-circle' : 'fa-exclamation-circle'}`;
  document.getElementById('notif-msg').textContent = msg;
  el.classList.add('show');
  setTimeout(() => el.classList.remove('show'), 3000);
}

// ══════════════════════════════════════════
//  COMPTADORS DE CARÀCTERS
// ══════════════════════════════════════════
function updateCounter(el, counterId) {
  const counter = document.getElementById(counterId);
  if (counter) {
    const max = el.getAttribute('maxlength');
    counter.textContent = `${el.value.length} / ${max}`;
  }
}

function updateAllCounters() {
  const fields = [
    { id: 'inNom', count: 'count-inNom' },
    { id: 'inProf', count: 'count-inProf' },
    { id: 'inSobreMi', count: 'count-inSobreMi' },
    { id: 'inTel', count: 'count-inTel' },
    { id: 'inMail', count: 'count-inMail' },
    { id: 'inLoc', count: 'count-inLoc' },
    { id: 'inWeb', count: 'count-inWeb' }
  ];

  fields.forEach(f => {
    const el = document.getElementById(f.id);
    if (el) updateCounter(el, f.count);
  });
}
