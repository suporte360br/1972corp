# 1972corp.com.br

Site estático da 1972corp (administração de imóveis), publicado no GitHub Pages.

- Conteúdo (imóveis e matérias do blog): `gerador/conteudo.js`
- Layout e páginas: `gerador/gerar.js`
- Para regenerar tudo: `node gerador/gerar.js` (na pasta do site)
- Imagens WebP e capas das matérias: `node gerador/imagens.js <caminho do pacote sharp>` (precisa do sharp instalado), depois `node gerador/gerar.js`
