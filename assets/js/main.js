// ══════════════════════════════════════════
//  INIT
// ══════════════════════════════════════════
let debounceTimer;
function debounceActualitzar() {
  clearTimeout(debounceTimer);
  debounceTimer = setTimeout(() => {
    actualitzar();
  }, 150);
}

function saveLocalData() {
  if (typeof getExportData === 'function') {
    const data = getExportData();
    localStorage.setItem('cv_data', JSON.stringify(data));
  }
}

function loadLocalData() {
  const str = localStorage.getItem('cv_data');
  if (str) {
    try {
      const data = JSON.parse(str);
      if (typeof processarJSON === 'function') {
        processarJSON(data);
        return true;
      }
    } catch (e) {
      console.error('Error loading local data', e);
    }
  }
  return false;
}

window.addEventListener('load', () => {
  if (!loadLocalData()) {
    // Afegir items inicials per defecte si no hi ha dades guardades
    afegirItem('exp', { t1: 'Dissenyadora UX', t2: 'TechCorp', t3: '2022 – avui', desc: "Disseny d'interfícies i prototipatge amb Figma." });
    afegirItem('exp', { t1: 'Junior Designer', t2: 'Startup XYZ', t3: '2020 – 2022', desc: '' });
    afegirItem('est', { t1: 'Grau en Disseny Gràfic', t2: 'Universitat Autònoma', t3: '2020' });
    afegirItem('skills', { t1: 'Figma', range: 90 });
    afegirItem('skills', { t1: 'Adobe XD', range: 80 });
    afegirItem('skills', { t1: 'HTML/CSS', range: 70 });
    afegirItem('idi', { t1: 'Català', t2: 'Natiu' });
    afegirItem('idi', { t1: 'Castellà', t2: 'Natiu' });
    afegirItem('idi', { t1: 'Anglès', t2: 'B2' });
  }

  renderModuleList();
  actualitzar();
  window.addEventListener('resize', scaleCV);
});
