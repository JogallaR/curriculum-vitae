// ══════════════════════════════════════════
//  MÒDULS
// ══════════════════════════════════════════
function renderModuleList() {
  const d = T[lang];
  const ml = document.getElementById('moduleList');
  ml.innerHTML = '';

  // Fem servir moduleOrder per renderitzar-los en l'ordre actual
  moduleOrder.forEach(m => {
    const row = document.createElement('div');
    row.className = 'module-row';
    row.setAttribute('data-mod', m);
    row.innerHTML = `
      <i class="fas fa-grip-vertical drag-handle" title="Arrossega per ordenar"></i>
      <span class="module-name">${d['mod-' + m] || m}</span>
      <button class="toggle-vis ${modules[m] ? 'active' : ''}" onclick="toggleModule('${m}',this)">
        <i class="fas ${modules[m] ? 'fa-eye' : 'fa-eye-slash'}"></i>
      </button>`;
    ml.appendChild(row);
  });

  // Habilitar Drag & Drop amb SortableJS si està carregat
  if (typeof Sortable !== 'undefined') {
    if (window.moduleSortable) window.moduleSortable.destroy();
    window.moduleSortable = new Sortable(ml, {
      handle: '.drag-handle',
      animation: 150,
      ghostClass: 'dragging',
      onEnd: function () {
        moduleOrder = Array.from(ml.children).map(row => row.getAttribute('data-mod'));
        actualitzar(); // Re-render CV
      }
    });
  }
}

function toggleModule(mod, btn) {
  // Prevent the click event from bubbling up if necessary
  modules[mod] = !modules[mod];
  btn.classList.toggle('active', modules[mod]);
  btn.querySelector('i').className = `fas ${modules[mod] ? 'fa-eye' : 'fa-eye-slash'}`;
  actualitzar();
}
