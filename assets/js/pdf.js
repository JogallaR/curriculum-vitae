// ══════════════════════════════════════════
//  PDF
// ══════════════════════════════════════════
function baixarPDF() {
  const wrapper = document.getElementById('cvWrapper');
  const preview = wrapper.parentElement;
  const el = document.getElementById('cv-a4');

  const originalPreviewScroll = preview.scrollTop;
  const originalShadow = el.style.boxShadow;
  const originalPreviewOverflowX = preview.style.overflowX || '';
  const originalPreviewOverflowY = preview.style.overflowY || '';

  // Crear una capa ovelay perquè l'usuari no vegi el reset de layout
  const overlay = document.createElement('div');
  overlay.style.position = 'fixed';
  overlay.style.top = '0';
  overlay.style.left = '0';
  overlay.style.width = '100vw';
  overlay.style.height = '100vh';
  overlay.style.backgroundColor = 'var(--bg)';
  overlay.style.zIndex = '999999';
  overlay.style.display = 'flex';
  overlay.style.flexDirection = 'column';
  overlay.style.alignItems = 'center';
  overlay.style.justifyContent = 'center';
  overlay.style.color = 'var(--accent)';
  overlay.style.fontSize = '18px';
  overlay.style.fontWeight = 'bold';
  overlay.style.fontFamily = "'DM Sans', sans-serif";
  
  const langText = (typeof T !== 'undefined' && typeof lang !== 'undefined' && T[lang] && T[lang]['loading-pdf']) ? T[lang]['loading-pdf'] : 'Generant PDF...';
  overlay.innerHTML = '<i class="fas fa-spinner fa-spin" style="font-size:32px;margin-bottom:16px;"></i> ' + langText;
  document.body.appendChild(overlay);

  // Temps pel reflow visual del loader
  setTimeout(() => {
    // Resetejem el layout per capturar el CV a mida real al DOM LIVE
    wrapper.style.width = el.style.width; // Mantenim la mida virtual calculada!
    wrapper.style.height = el.style.height;
    wrapper.style.position = 'absolute'; // Forcem que no quedi limitat pel pare 'preview'
    wrapper.style.top = '0';
    wrapper.style.left = '0';

    el.style.position = 'relative';
    el.style.top = '0';
    el.style.left = '0';
    el.style.transform = 'scale(1)';
    el.style.boxShadow = 'none';
    
    // Assegurar que els pares no tallin la captura
    preview.style.overflowX = 'visible';
    preview.style.overflowY = 'visible';
    preview.scrollTop = 0;
    window.scrollTo(0, 0);

    const nom = document.getElementById('inNom').value || 'CV';
    const avui = new Date();
    const dia = avui.getDate().toString().padStart(2, '0');
    const mes = (avui.getMonth() + 1).toString().padStart(2, '0');
    const any = avui.getFullYear();
    const filename = `${nom}_CV_${dia}-${mes}-${any}.pdf`;

    const isMobile = /Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(navigator.userAgent);
    const renderScale = isMobile ? 2 : 3;

    // Timeout addicional per assegurar que el navegador apliqui els estils abans de capturar
    setTimeout(() => {
      const pdfH = Math.max(1123, el.scrollHeight);
      html2pdf()
        .set({
          margin: 0,
          filename: filename,
          image: { type: 'jpeg', quality: 0.98 },
          html2canvas: { scale: renderScale, useCORS: true, scrollY: 0, logging: false },
          jsPDF: { unit: 'px', format: [794, pdfH], orientation: 'portrait', hotfixes: ['px_scaling'] }
        })
        .from(el)
        .outputPdf('blob')
        .then(blob => {
          // Restaurar visuals
          el.style.boxShadow = originalShadow;
          preview.style.overflowX = originalPreviewOverflowX;
          preview.style.overflowY = originalPreviewOverflowY;
          if (typeof scaleCV === 'function') scaleCV();
          preview.scrollTop = originalPreviewScroll;
          document.body.removeChild(overlay);

          const url = URL.createObjectURL(blob);
          const a = document.createElement('a');
          a.href = url;
          a.download = filename;
          a.style.display = 'none';
          document.body.appendChild(a);
          a.click();
          document.body.removeChild(a);
          setTimeout(() => URL.revokeObjectURL(url), 2000);
        })
        .catch(() => {
          el.style.boxShadow = originalShadow;
          preview.style.overflowX = originalPreviewOverflowX;
          preview.style.overflowY = originalPreviewOverflowY;
          if (typeof scaleCV === 'function') scaleCV();
          document.body.removeChild(overlay);
          notify('Error generant el PDF', 'err');
        });
    }, 100);
  }, 50);
}
