// Gera versões WebP otimizadas e as capas das matérias sem foto.
// Requer o pacote sharp: node gerador/imagens.js /caminho/para/node_modules/sharp
// (sem argumento, tenta require('sharp')).
const fs = require('fs');
const path = require('path');
const sharp = require(process.argv[2] || 'sharp');
const { materias } = require('./conteudo');

const IMG = path.join(__dirname, '..', 'assets', 'img');
const esc = s => s.replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;');

// Quebra o texto em linhas de até n caracteres
function linhas(texto, n) {
  const out = []; let atual = '';
  for (const p of texto.split(' ')) {
    if ((atual + ' ' + p).trim().length > n) { out.push(atual); atual = p; } else atual = (atual + ' ' + p).trim();
  }
  if (atual) out.push(atual);
  return out;
}

function capaSVG(m, w, h) {
  const titulo = m.tituloCurto || m.titulo.split(':')[0];
  const ls = linhas(titulo, 26).slice(0, 3);
  const tam = 64, base = h / 2 - ((ls.length - 1) * tam * 1.15) / 2 + 20;
  return `<svg xmlns="http://www.w3.org/2000/svg" width="${w}" height="${h}" viewBox="0 0 ${w} ${h}">
  <defs><linearGradient id="g" x1="0" y1="0" x2="1" y2="1"><stop offset="0" stop-color="#2b3646"/><stop offset="1" stop-color="#161b23"/></linearGradient></defs>
  <rect width="${w}" height="${h}" fill="url(#g)"/>
  <rect x="80" y="${base - tam - 70}" width="8" height="${ls.length * tam * 1.15 + 50}" fill="#b8741a"/>
  <text x="116" y="${base - tam - 30}" font-family="Segoe UI, Arial, sans-serif" font-size="26" font-weight="700" letter-spacing="5" fill="#f3c98b">${esc(m.tema.toUpperCase())}</text>
  ${ls.map((l, i) => `<text x="114" y="${base + i * tam * 1.15}" font-family="Georgia, 'Times New Roman', serif" font-size="${tam}" font-weight="600" fill="#ffffff">${esc(l)}</text>`).join('\n  ')}
  <text x="${w - 80}" y="${h - 60}" text-anchor="end" font-family="Segoe UI, Arial, sans-serif" font-size="28" font-weight="600" fill="#c9d1db">1972corp.com.br</text>
</svg>`;
}

(async () => {
  // Capas das matérias sem imagem própria (1200x630 para compartilhamento e 1200x800 para o cartão)
  for (const m of materias.filter(x => !x.imagem || x.capaGerada)) {
    const nome = `capa-${m.slug}`;
    await sharp(Buffer.from(capaSVG(m, 1200, 630))).jpeg({ quality: 85, mozjpeg: true }).toFile(path.join(IMG, nome + '.jpg'));
    await sharp(Buffer.from(capaSVG(m, 1200, 800))).webp({ quality: 82 }).toFile(path.join(IMG, nome + '.webp'));
    await sharp(Buffer.from(capaSVG(m, 1200, 800))).resize(600).webp({ quality: 80 }).toFile(path.join(IMG, nome + '-600.webp'));
  }

  // WebP em dois tamanhos para as fotos
  const fotos = { 'hero.jpg': [800, 1600], 'casa-card.jpg': [600, 1200], 'galpao.jpg': [600, 1200], 'holding.jpg': [600, 1200] };
  for (const [arq, larguras] of Object.entries(fotos)) {
    const base = arq.replace('.jpg', '');
    for (const l of larguras) {
      await sharp(path.join(IMG, arq)).resize(l).webp({ quality: arq === 'hero.jpg' ? 70 : 76 }).toFile(path.join(IMG, `${base}-${l}.webp`));
    }
  }
  // Imagem de compartilhamento mais leve
  await sharp(path.join(IMG, 'casa-card.jpg')).resize(1200, 630, { fit: 'cover', position: 'centre' }).jpeg({ quality: 78, mozjpeg: true }).toFile(path.join(IMG, 'og.jpg.tmp'));
  fs.renameSync(path.join(IMG, 'og.jpg.tmp'), path.join(IMG, 'og.jpg'));

  for (const f of fs.readdirSync(IMG).filter(f => /\.(webp|jpg)$/.test(f)).sort()) {
    console.log(f.padEnd(52), Math.round(fs.statSync(path.join(IMG, f)).size / 1024) + ' KB');
  }
})();
