// ══════════════════════════════════════════
//  RENDER CV
// ══════════════════════════════════════════
function escapeHTML(str) {
  if (typeof str !== 'string') return '';
  return str.replace(/[&<>'"]/g, match => ({
    '&': '&amp;', '<': '&lt;', '>': '&gt;', "'": '&#39;', '"': '&quot;'
  }[match]));
}

function actualitzar() {
  const d = T[lang];
  const nom = escapeHTML(document.getElementById('inNom').value) || (lang === 'ca' ? 'EL TEU NOM' : lang === 'es' ? 'TU NOMBRE' : 'YOUR NAME');
  const prof = escapeHTML(document.getElementById('inProf').value) || (lang === 'ca' ? 'PROFESSIÓ' : lang === 'es' ? 'PROFESIÓN' : 'PROFESSION');
  const sobre = escapeHTML(document.getElementById('inSobreMi').value) || '';
  const tel = escapeHTML(document.getElementById('inTel').value) || '';
  const mail = escapeHTML(document.getElementById('inMail').value) || '';
  const loc = escapeHTML(document.getElementById('inLoc').value) || '';
  const web = escapeHTML(document.getElementById('inWeb').value) || '';

  const cv = document.getElementById('cv-a4');
  cv.className = `cv-page tpl-${currentTemplate}`;

  const chkPhoto = document.getElementById('chkPhoto');
  const showPhoto = chkPhoto ? chkPhoto.checked : true;

  const photoHTML = fotoData
    ? `<img src="${fotoData}" alt="foto" style="width:100%;height:100%;display:block;object-fit:cover;">`
    : `<i class="fas fa-user"></i>`;
  const photoBlock = showPhoto ? `<div class="cv-photo">${photoHTML}</div>` : '';

  const contactItems = () => {
    const rows = [];
    if (tel) rows.push(`<div class="contact-item"><i class="fas fa-phone"></i>${tel}</div>`);
    if (mail) rows.push(`<div class="contact-item"><i class="fas fa-envelope"></i>${mail}</div>`);
    if (loc) rows.push(`<div class="contact-item"><i class="fas fa-map-marker-alt"></i>${loc}</div>`);
    if (web) rows.push(`<div class="contact-item"><i class="fas fa-link"></i>${web}</div>`);
    return rows.join('');
  };

  // Pre-calcular parts HTML
  const modHTML = {
    exp: modules.exp && items.exp.length ? `
      <div class="cv-sec-title">${d['cv-exp']}</div>
      ${items.exp.filter(x => x.t1).map(x => `
        <div class="cv-item">
          <div class="cv-item-title">${escapeHTML(x.t1)}</div>
          <div class="cv-item-sub">${[escapeHTML(x.t2), escapeHTML(x.t3)].filter(Boolean).join(' · ')}</div>
          ${x.desc ? `<div class="cv-item-desc">${escapeHTML(x.desc)}</div>` : ''}
        </div>`).join('')}` : '',

    est: modules.est && items.est.length ? `
      <div class="cv-sec-title">${d['cv-est']}</div>
      ${items.est.filter(x => x.t1).map(x => `
        <div class="cv-item">
          <div class="cv-item-title">${escapeHTML(x.t1)}</div>
          <div class="cv-item-sub">${[escapeHTML(x.t2), escapeHTML(x.t3)].filter(Boolean).join(' · ')}</div>
        </div>`).join('')}` : '',

    skills: modules.skills && items.skills.length ? `
      <div class="cv-sec-title">${d['cv-skills']}</div>
      ${items.skills.filter(x => x.t1).map(x => `
        <div class="cv-item">
          <div class="cv-item-title">${escapeHTML(x.t1)}</div>
          <div class="skill-bar"><div class="skill-bar-fill" style="width:${x.range !== undefined ? x.range : 80}%"></div></div>
        </div>`).join('')}` : '',

    idi: modules.idi && items.idi.length ? `
      <div class="cv-sec-title">${d['cv-idi']}</div>
      ${items.idi.filter(x => x.t1).map(x => `
        <div class="cv-item">
          <div class="cv-item-title">${escapeHTML(x.t1)}</div>
          ${x.t2 ? `<div class="cv-item-sub">${escapeHTML(x.t2)}</div>` : ''}
        </div>`).join('')}` : '',

    altres: modules.altres && items.altres.length ? `
      <div class="cv-sec-title">${d['cv-altres']}</div>
      ${items.altres.filter(x => x.t1).map(x => `
        <div class="cv-item">
          <div class="cv-item-title">${escapeHTML(x.t1)}</div>
          ${x.t2 ? `<div class="cv-item-sub">${escapeHTML(x.t2)}</div>` : ''}
        </div>`).join('')}` : ''
  };

  // Preparar llistes per columnes ordenades basat en moduleOrder
  const mainModules = ['exp', 'est', 'altres'];
  const sideModules = ['skills', 'idi'];

  mainModules.sort((a, b) => moduleOrder.indexOf(a) - moduleOrder.indexOf(b));
  sideModules.sort((a, b) => moduleOrder.indexOf(a) - moduleOrder.indexOf(b));

  const renderedMain = mainModules.map(m => modHTML[m]).join('');
  const renderedSide = sideModules.map(m => modHTML[m] ? (currentTemplate !== 'minimal' && currentTemplate !== 'executive' ? `<div class="sidebar-sec">${modHTML[m]}</div>` : modHTML[m]) : '').join('');

  const args = { d, nom, prof, sobre, photoBlock, showPhoto, contactItems, renderedMain, renderedSide };
  if (cvTemplates[currentTemplate]) {
    cv.innerHTML = cvTemplates[currentTemplate](args);
  } else {
    cv.innerHTML = cvTemplates['classic'](args);
  }

  // Escala responsive
  scaleCV();
  updateAllCounters();
  if (typeof saveLocalData === 'function') saveLocalData();
}

const cvTemplates = {
  classic: ({ d, nom, prof, sobre, photoBlock, contactItems, renderedMain, renderedSide }) => `
    <div class="cv-sidebar">
      ${photoBlock}
      ${modules.sobre ? `<div class="sidebar-sec"><h4>${d['cv-sobre']}</h4><p>${sobre || '...'}</p></div>` : ''}
      <div class="sidebar-sec"><h4>${d['cv-contacte']}</h4>${contactItems()}</div>
      ${renderedSide}
    </div>
    <div class="cv-main">
      <div class="cv-name">${nom}</div>
      <div class="cv-role">${prof}</div>
      ${renderedMain}
    </div>`,
    
  minimal: ({ d, nom, prof, sobre, photoBlock, contactItems, renderedMain, renderedSide }) => `
    <div class="cv-header">
      ${photoBlock}
      <div>
        <div class="cv-name">${nom}</div>
        <div class="cv-role">${prof}</div>
        <div class="cv-contacts">${contactItems()}</div>
      </div>
    </div>
    <div class="cv-body">
      <div class="cv-main-col">
        ${modules.sobre ? `<div class="cv-sec-title">${d['cv-sobre']}</div><p class="cv-sobre-minimal">${sobre}</p>` : ''}
        ${renderedMain}
      </div>
      <div class="cv-side-col">
        ${renderedSide}
      </div>
    </div>`,
    
  modern: ({ d, nom, prof, sobre, photoBlock, contactItems, renderedMain, renderedSide }) => `
    <div class="cv-sidebar">
      ${photoBlock}
      ${modules.sobre ? `<div class="sidebar-sec"><h4>${d['cv-sobre']}</h4><p class="cv-sobre-modern">${sobre || '...'}</p></div>` : ''}
      <div class="sidebar-sec"><h4>${d['cv-contacte']}</h4>${contactItems()}</div>
      ${renderedSide}
    </div>
    <div class="cv-main">
      <div class="cv-name">${nom}</div>
      <span class="cv-role">${prof}</span>
      ${renderedMain}
    </div>`,
    
  executive: ({ d, nom, prof, sobre, photoBlock, contactItems, renderedMain, renderedSide }) => {
    // Es requereix l'string original o adaptat per no trencar contactItems() que retorna un sol string.
    // Com que els estils son inline a la llista de contacts, adaptarem executive per extreure les dades pures si fos possible. 
    // Però contactItems() ja retorna divs HTML. Ho encapsularem al CSS.
    return `
    <div class="cv-top">
      ${photoBlock}
      <div>
        <div class="cv-name">${nom}</div>
        <div class="cv-role">${prof}</div>
        ${modules.sobre ? `<p class="cv-sobre-executive">${sobre}</p>` : ''}
      </div>
      <div class="cv-contacts-top">${contactItems()}</div>
    </div>
    <div class="cv-body">
      <div class="cv-main">${renderedMain}</div>
      <div class="cv-side">
        ${renderedSide}
      </div>
    </div>`;
  },
  
  dark: ({ d, nom, prof, sobre, photoBlock, contactItems, renderedMain, renderedSide }) => `
    <div class="cv-sidebar">
      ${photoBlock}
      ${modules.sobre ? `<div class="sidebar-sec"><h4>${d['cv-sobre']}</h4><p>${sobre || '...'}</p></div>` : ''}
      <div class="sidebar-sec"><h4>${d['cv-contacte']}</h4>${contactItems()}</div>
      ${renderedSide}
    </div>
    <div class="cv-main">
      <div class="cv-name">${nom}</div>
      <div class="cv-role">${prof}</div>
      ${renderedMain}
    </div>`,
    
  creative: ({ d, nom, prof, sobre, photoBlock, contactItems, renderedMain, renderedSide }) => `
    <div class="cv-header">
      ${photoBlock}
      <div>
        <div class="cv-name">${nom}</div>
        <div class="cv-role">${prof}</div>
        <div class="cv-contacts">${contactItems()}</div>
      </div>
    </div>
    <div class="cv-body">
      <div class="cv-main-col">
        ${modules.sobre ? `<div class="cv-sec-title">${d['cv-sobre']}</div><p class="cv-sobre-creative">${sobre}</p>` : ''}
        ${renderedMain}
      </div>
      <div class="cv-side-col">
        ${renderedSide}
      </div>
    </div>`,
    
  elegant: ({ d, nom, prof, showPhoto, sobre, photoBlock, contactItems, renderedMain, renderedSide }) => `
    <div class="cv-header">
      <div class="cv-name">${nom}</div>
      <div class="cv-role">${prof}</div>
      <div class="cv-contacts">${contactItems()}</div>
    </div>
    <div class="cv-body">
      ${showPhoto ? `<div class="cv-photo-container">${photoBlock}</div>` : ''}
      <div class="cv-content">
        <div class="cv-main-col">
          ${modules.sobre ? `<div class="cv-sec-title">${d['cv-sobre']}</div><p class="cv-sobre-text">${sobre}</p>` : ''}
          ${renderedMain}
        </div>
        <div class="cv-side-col">
          ${renderedSide}
        </div>
      </div>
    </div>`,
    
  professional: ({ d, nom, prof, sobre, photoBlock, contactItems, renderedMain, renderedSide }) => `
    <div class="cv-header">
      ${photoBlock}
      <div class="cv-header-info">
        <div class="cv-name">${nom}</div>
        <div class="cv-role">${prof}</div>
      </div>
      <div class="cv-contacts-right">${contactItems()}</div>
    </div>
    ${modules.sobre ? `<div class="cv-sobre-block">${sobre}</div>` : ''}
    <div class="cv-body">
      <div class="cv-main-col">${renderedMain}</div>
      <div class="cv-side-col">${renderedSide}</div>
    </div>`
};

function scaleCV() {
  const wrapper = document.getElementById('cvWrapper');
  const el = document.getElementById('cv-a4');
  if (!wrapper || !el) return;
  const preview = wrapper.parentElement;

  const isMobile = window.innerWidth <= 768;
  const padding = isMobile ? 20 : 40;
  const previewW = preview.clientWidth - padding;

  const baseW = 794; /* 210mm exacte en resolució 96dpi (CSS pixels) */
  const baseH = 1123;
  
  // Obtenim l'alçada real final
  el.style.width = `${baseW}px`;
  el.style.minHeight = `${baseH}px`;
  el.style.height = `auto`; // per tal que s'estableixi alçada natural
  el.style.maxHeight = 'none';
  el.style.transform = 'none';

  let virtualW = baseW;
  let virtualH = el.scrollHeight; // L'alçada serà l'alçada total del contingut
  if (virtualH < baseH) virtualH = baseH;

  el.style.width = `${virtualW}px`;
  el.style.height = `${virtualH}px`;

  // Scale final cap al visor del navegador (aplica sobre el virtualW)
  const scale = Math.min(1, Math.max(0.1, previewW / virtualW));

  el.style.position = 'absolute';
  el.style.top = '0';
  el.style.left = '0';
  el.style.transformOrigin = 'top left';
  el.style.transform = `scale(${scale})`;

  // El wrapper adquireix els píxels exactes de la pantalla visible
  wrapper.style.position = 'relative';
  wrapper.style.width = `${virtualW * scale}px`;
  wrapper.style.height = `${virtualH * scale}px`;

  // Limpiem estats residuals antic
  wrapper.style.marginBottom = '';

  // Indicador de salt de pàgina
  document.querySelectorAll('.page-break-indicator').forEach(el => el.remove());
  if (virtualH > 1123) {
    const indicator = document.createElement('div');
    indicator.className = 'page-break-indicator';
    indicator.style.top = '1123px';
    el.appendChild(indicator);
  }
}
