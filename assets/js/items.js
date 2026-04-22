// ══════════════════════════════════════════
//  ITEMS DINÀMICS
// ══════════════════════════════════════════
const itemFields = {
  exp: ['t1', 't2', 't3', 'desc'],
  est: ['t1', 't2', 't3'],
  skills: ['t1', 'range'],
  idi: ['t1', 't2'],
  altres: ['t1', 't2']
};

function afegirItem(type, data = {}) {
  const id = Date.now() + Math.random();
  const obj = { id, ...data };
  if (!data.t1) obj.t1 = '';
  if (!data.t2 && type !== 'skills') obj.t2 = '';
  if ((type === 'exp' || type === 'est') && !data.t3) obj.t3 = '';
  if (type === 'exp' && !data.desc) obj.desc = '';
  if (type === 'skills' && data.range === undefined) obj.range = 80;
  items[type].push(obj);
  renderItemList(type);
  actualitzar();
}

function renderItemList(type) {
  const container = document.getElementById('list-' + type);
  if (!container) return;
  container.innerHTML = '';
  const d = T[lang];
  items[type].forEach((item, idx) => {
    const div = document.createElement('div');
    div.className = 'item-card';
    let fields = '';
    if (type === 'exp') {
      fields = `
        <input type="text" value="${esc(item.t1)}" maxlength="80" placeholder="${d['ph-t1-exp'] || 'Càrrec'}" data-ph="ph-t1-exp" oninput="updateItem('exp','${item.id}','t1',this.value);spellCheck(this);updateCounter(this, 'count-t1-${item.id}')">
        <div class="char-counter" id="count-t1-${item.id}">${(item.t1 || '').length} / 80</div>
        
        <input type="text" value="${esc(item.t2)}" maxlength="80" placeholder="${d['ph-t2-exp'] || 'Empresa'}" data-ph="ph-t2-exp" oninput="updateItem('exp','${item.id}','t2',this.value);updateCounter(this, 'count-t2-${item.id}')">
        <div class="char-counter" id="count-t2-${item.id}">${(item.t2 || '').length} / 80</div>
        
        <input type="text" value="${esc(item.t3)}" maxlength="40" placeholder="${d['ph-t3-exp'] || 'Dates'}" data-ph="ph-t3-exp" oninput="updateItem('exp','${item.id}','t3',this.value);updateCounter(this, 'count-t3-${item.id}')">
        <div class="char-counter" id="count-t3-${item.id}">${(item.t3 || '').length} / 40</div>
        
        <textarea maxlength="500" placeholder="${d['ph-desc-exp'] || 'Descripció'}" data-ph="ph-desc-exp" oninput="updateItem('exp','${item.id}','desc',this.value);spellCheck(this);updateCounter(this, 'count-desc-${item.id}')">${esc(item.desc)}</textarea>
        <div class="char-counter" id="count-desc-${item.id}">${(item.desc || '').length} / 500</div>`;
    } else if (type === 'est') {
      fields = `
        <input type="text" value="${esc(item.t1)}" maxlength="80" placeholder="${d['ph-t1-est'] || 'Títol'}" data-ph="ph-t1-est" oninput="updateItem('est','${item.id}','t1',this.value);spellCheck(this);updateCounter(this, 'count-t1-${item.id}')">
        <div class="char-counter" id="count-t1-${item.id}">${(item.t1 || '').length} / 80</div>

        <input type="text" value="${esc(item.t2)}" maxlength="80" placeholder="${d['ph-t2-est'] || 'Centre'}" data-ph="ph-t2-est" oninput="updateItem('est','${item.id}','t2',this.value);updateCounter(this, 'count-t2-${item.id}')">
        <div class="char-counter" id="count-t2-${item.id}">${(item.t2 || '').length} / 80</div>

        <input type="text" value="${esc(item.t3)}" maxlength="30" placeholder="${d['ph-t3-est'] || 'Any'}" data-ph="ph-t3-est" oninput="updateItem('est','${item.id}','t3',this.value);updateCounter(this, 'count-t3-${item.id}')">
        <div class="char-counter" id="count-t3-${item.id}">${(item.t3 || '').length} / 30</div>`;
    } else if (type === 'skills') {
      fields = `
        <div class="skill-item">
          <input type="text" value="${esc(item.t1)}" maxlength="40" placeholder="${d['ph-t1-skills'] || 'Habilitat'}" data-ph="ph-t1-skills" oninput="updateItem('skills','${item.id}','t1',this.value);updateCounter(this, 'count-t1-${item.id}')" style="flex:1;">
          <input type="range" min="0" max="100" step="10" value="${item.range !== undefined ? Math.max(30, item.range) : 80}" 
            style="--v: ${item.range !== undefined ? Math.max(30, item.range) : 80}%"
            oninput="if(this.value < 30) this.value = 30; updateItem('skills','${item.id}','range',parseInt(this.value));this.parentNode.querySelector('.skill-pct').textContent=this.value+'%';this.style.setProperty('--v', this.value+'%')">
          <span class="skill-pct">${item.range !== undefined ? Math.max(30, item.range) : 80}%</span>
        </div>
        <div class="char-counter" id="count-t1-${item.id}">${(item.t1 || '').length} / 40</div>`;
    } else if (type === 'idi') {
      fields = `
        <input type="text" value="${esc(item.t1)}" maxlength="40" placeholder="${d['ph-t1-idi'] || 'Idioma'}" data-ph="ph-t1-idi" oninput="updateItem('idi','${item.id}','t1',this.value);updateCounter(this, 'count-t1-${item.id}')">
        <div class="char-counter" id="count-t1-${item.id}">${(item.t1 || '').length} / 40</div>

        <input type="text" value="${esc(item.t2)}" maxlength="40" placeholder="${d['ph-t2-idi'] || 'Nivell'}" data-ph="ph-t2-idi" oninput="updateItem('idi','${item.id}','t2',this.value);updateCounter(this, 'count-t2-${item.id}')">
        <div class="char-counter" id="count-t2-${item.id}">${(item.t2 || '').length} / 40</div>`;
    } else {
      fields = `
        <input type="text" value="${esc(item.t1)}" maxlength="60" placeholder="${d['ph-t1-altres'] || 'Títol'}" data-ph="ph-t1-altres" oninput="updateItem('altres','${item.id}','t1',this.value);updateCounter(this, 'count-t1-${item.id}')">
        <div class="char-counter" id="count-t1-${item.id}">${(item.t1 || '').length} / 60</div>

        <input type="text" value="${esc(item.t2)}" maxlength="100" placeholder="${d['ph-t2-altres'] || 'Detall'}" data-ph="ph-t2-altres" oninput="updateItem('altres','${item.id}','t2',this.value);updateCounter(this, 'count-t2-${item.id}')">
        <div class="char-counter" id="count-t2-${item.id}">${(item.t2 || '').length} / 100</div>`;
    }
    div.innerHTML = `
      <div class="item-actions">
        ${idx > 0 ? `<button onclick="moveItem('${type}','${item.id}',-1)"><i class="fas fa-arrow-up"></i></button>` : ''}
        ${idx < items[type].length - 1 ? `<button onclick="moveItem('${type}','${item.id}',1)"><i class="fas fa-arrow-down"></i></button>` : ''}
        <button class="del" onclick="deleteItem('${type}','${item.id}')"><i class="fas fa-times"></i></button>
      </div>
      <div class="item-fields" style="margin-top:24px;">${fields}</div>`;
    container.appendChild(div);
  });
}

function esc(s) { return (s || '').replace(/"/g, '&quot;'); }
function updateItem(type, id, field, val) {
  const item = items[type].find(x => x.id == id);
  if (item) { 
    item[field] = val; 
    if (field === 'range') actualitzar();
    else debounceActualitzar(); 
  }
}
function deleteItem(type, id) {
  items[type] = items[type].filter(x => x.id != id);
  renderItemList(type);
  actualitzar();
}
function moveItem(type, id, dir) {
  const arr = items[type];
  const idx = arr.findIndex(x => x.id == id);
  const newIdx = idx + dir;
  if (newIdx < 0 || newIdx >= arr.length) return;
  [arr[idx], arr[newIdx]] = [arr[newIdx], arr[idx]];
  renderItemList(type);
  actualitzar();
}
