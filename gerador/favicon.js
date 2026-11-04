// Gera os ícones do site a partir do logo oficial (recorte do "1972"), em fundo branco arredondado.
// Uso: node gerador/favicon.js <caminho do pacote sharp> [caminho do logo]
const fs = require('fs');
const path = require('path');
const sharp = require(process.argv[2] || 'sharp');

const LOGO = process.argv[3] || path.join(__dirname, '..', '..', '..', '1972Corp', 'Logo', 'Logo Arredondado - oficial.png');
const RAIZ = path.join(__dirname, '..');
const IMG = path.join(RAIZ, 'assets', 'img');
const RECORTE = { left: 80, top: 500, width: 600, height: 560 }; // "1972" com o traço de baixo, no logo de 1500x1500

async function icone(s, margem) {
  const raio = Math.round(s * 0.18);
  const fundo = Buffer.from(`<svg xmlns="http://www.w3.org/2000/svg" width="${s}" height="${s}"><rect width="${s}" height="${s}" rx="${raio}" ry="${raio}" fill="#ffffff"/></svg>`);
  const w = s - 2 * Math.round(s * margem);
  const marca = await sharp(LOGO).extract(RECORTE)
    .resize(w, null, { kernel: 'lanczos3' })
    .sharpen(s <= 48 ? { sigma: 0.6 } : undefined)
    .png().toBuffer();
  const { height: h } = await sharp(marca).metadata();
  return sharp(fundo).composite([{ input: marca, left: Math.round((s - w) / 2), top: Math.round((s - h) / 2) }]).png({ compressionLevel: 9 }).toBuffer();
}

(async () => {
  const tamanhos = { 'favicon-16.png': [16, 0.02], 'favicon-32.png': [32, 0.03], 'favicon-48.png': [48, 0.04],
    'icon-96.png': [96, 0.07], 'icon-144.png': [144, 0.08], 'apple-touch-icon.png': [180, 0.1],
    'icon-192.png': [192, 0.1], 'icon-512.png': [512, 0.1] };
  const buf = {};
  for (const [nome, [s, m]] of Object.entries(tamanhos)) {
    buf[nome] = await icone(s, m);
    fs.writeFileSync(path.join(IMG, nome), buf[nome]);
  }
  // favicon.ico com 16, 32 e 48 (entradas PNG)
  const ims = [[16, buf['favicon-16.png']], [32, buf['favicon-32.png']], [48, buf['favicon-48.png']]];
  const h = Buffer.alloc(6 + 16 * ims.length);
  h.writeUInt16LE(0, 0); h.writeUInt16LE(1, 2); h.writeUInt16LE(ims.length, 4);
  let off = h.length;
  ims.forEach(([n, b], i) => {
    const e = 6 + 16 * i;
    h[e] = n; h[e + 1] = n; h.writeUInt16LE(1, e + 4); h.writeUInt16LE(32, e + 6);
    h.writeUInt32LE(b.length, e + 8); h.writeUInt32LE(off, e + 12); off += b.length;
  });
  fs.writeFileSync(path.join(RAIZ, 'favicon.ico'), Buffer.concat([h, ...ims.map(x => x[1])]));
  for (const n of Object.keys(tamanhos)) console.log(n.padEnd(22), buf[n].length, 'bytes');
})();
