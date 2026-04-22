// ══════════════════════════════════════════
//  FOTO
// ══════════════════════════════════════════
function gestionarFoto(event) {
  const file = event.target.files[0];
  if (!file) return;
  const reader = new FileReader();
  reader.onload = (e) => {
    const img = new Image();
    img.onload = () => {
      // Retallem la imatge en quadrat centrat via canvas
      const size = Math.min(img.width, img.height);
      const sx = (img.width - size) / 2;
      const sy = (img.height - size) / 2;
      const canvas = document.createElement('canvas');
      // Alta resolució optimitzada: 300x300px és suficient i alleugereix el JSON
      canvas.width = 300;
      canvas.height = 300;
      const ctx = canvas.getContext('2d');
      ctx.drawImage(img, sx, sy, size, size, 0, 0, 300, 300);
      fotoData = canvas.toDataURL('image/jpeg', 0.80);
      actualitzar();
    };
    img.src = e.target.result;
  };
  reader.readAsDataURL(file);
}
