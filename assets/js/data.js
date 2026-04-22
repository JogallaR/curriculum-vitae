// ══════════════════════════════════════════
//  IMPORT / EXPORT JSON
// ══════════════════════════════════════════
function exportarJSON() {
  const data = {
    nom: document.getElementById('inNom').value,
    prof: document.getElementById('inProf').value,
    sobre: document.getElementById('inSobreMi').value,
    tel: document.getElementById('inTel').value,
    mail: document.getElementById('inMail').value,
    loc: document.getElementById('inLoc').value,
    web: document.getElementById('inWeb').value,
    foto: fotoData,
    showPhoto: document.getElementById('chkPhoto') ? document.getElementById('chkPhoto').checked : true,
    items, modules, moduleOrder, template: currentTemplate, lang,
    colors: {
      c1: document.getElementById('customColor1').value,
      c2: document.getElementById('customColor2').value
    }
  };
  const blob = new Blob([JSON.stringify(data, null, 2)], { type: 'application/json' });
  const a = document.createElement('a');
  a.href = URL.createObjectURL(blob);
  a.download = (data.nom || 'CV') + '_data.json';
  a.click();
  notify(T[lang]['notif-export'], 'ok');
}

function importar() {
  document.getElementById('importInput').click();
}

function carregarJSON(event) {
  const file = event.target.files[0];
  if (!file) return;
  const reader = new FileReader();
  reader.onload = (e) => {
    try {
      const data = JSON.parse(e.target.result);
      document.getElementById('inNom').value = data.nom || '';
      document.getElementById('inProf').value = data.prof || '';
      document.getElementById('inSobreMi').value = data.sobre || '';
      document.getElementById('inTel').value = data.tel || '';
      document.getElementById('inMail').value = data.mail || '';
      document.getElementById('inLoc').value = data.loc || '';
      document.getElementById('inWeb').value = data.web || '';
      if (data.foto) fotoData = data.foto;
      if (data.showPhoto !== undefined && document.getElementById('chkPhoto')) {
        document.getElementById('chkPhoto').checked = data.showPhoto;
      }
      if (data.items) {
        items = data.items;
        ['exp', 'est', 'skills', 'idi', 'altres'].forEach(t => renderItemList(t));
      }
      if (data.modules) modules = data.modules;
      if (data.moduleOrder) moduleOrder = data.moduleOrder;
      else moduleOrder = ['sobre', 'exp', 'est', 'skills', 'idi', 'altres'];
      if (data.template) { currentTemplate = data.template; setTemplate(data.template); }
      if (data.lang) { lang = data.lang; document.getElementById('langSel').value = lang; canviarIdioma(lang); }
      if (data.colors) applyColors(data.colors.c1, data.colors.c2);
      renderModuleList();
      actualitzar();
      notify(T[lang]['notif-import'], 'ok');
    } catch (err) {
      notify('Error al importar', 'err');
    }
  };
  reader.readAsText(file);
  event.target.value = '';
}
