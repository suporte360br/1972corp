// Gera todas as páginas do site 1972corp.com.br.
// Uso (na pasta 1972corp): node gerador/gerar.js
const fs = require('fs');
const path = require('path');
const crypto = require('crypto');
const { imoveis, materias } = require('./conteudo');

const RAIZ = path.join(__dirname, '..');
const SITE = 'https://1972corp.com.br';
const NOME = '1972corp';
const EMAIL = 'contato@1972corp.com.br';
const HOJE = new Date().toISOString().slice(0, 10);

const hash = f => crypto.createHash('md5').update(fs.readFileSync(path.join(RAIZ, f))).digest('hex').slice(0, 8);
const V_CSS = hash('assets/css/style.css');
const V_JS = hash('assets/js/main.js');

const esc = s => String(s).replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;').replace(/"/g, '&quot;');
const dataBR = d => new Date(d + 'T12:00:00').toLocaleDateString('pt-BR', { day: 'numeric', month: 'long', year: 'numeric' });
const ordenadas = [...materias].sort((a, b) => b.data.localeCompare(a.data));

const icones = {
  chave: '<svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><circle cx="7.5" cy="15.5" r="4.5"/><path d="m10.7 12.3 9.3-9.3M17 6l3 3M14 9l2 2"/></svg>',
  predio: '<svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><rect x="4" y="2" width="16" height="20" rx="1"/><path d="M9 22v-4h6v4M8 6h.01M12 6h.01M16 6h.01M8 10h.01M12 10h.01M16 10h.01M8 14h.01M12 14h.01M16 14h.01"/></svg>',
  escudo: '<svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z"/><path d="m9 12 2 2 4-4"/></svg>',
  email: '<svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><rect x="2" y="4" width="20" height="16" rx="2"/><path d="m22 6-10 7L2 6"/></svg>',
  mapa: '<svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><path d="M12 22s7-6.2 7-12a7 7 0 0 0-14 0c0 5.8 7 12 7 12z"/><circle cx="12" cy="10" r="2.5"/></svg>',
  relogio: '<svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><circle cx="12" cy="12" r="10"/><path d="M12 6v6l4 2"/></svg>'
};

const MENU = [
  ['/', 'Início'],
  ['/imoveis/', 'Imóveis'],
  ['/sobre/', 'Sobre'],
  ['/blog/', 'Blog'],
];

function pagina({ caminho, titulo, descricao, conteudo, imagem = 'og.jpg', tipo = 'website', jsonld = [], semIndex = false, preload = '' }) {
  const url = SITE + caminho;
  const tituloCompleto = caminho === '/' ? titulo : `${titulo} | ${NOME}`;
  const menu = MENU.map(([href, txt]) => {
    const atual = href === '/' ? caminho === '/' : caminho.startsWith(href);
    return `<li><a href="${href}"${atual ? ' aria-current="page"' : ''}>${txt}</a></li>`;
  }).join('\n          ');
  const ld = jsonld.map(o => `<script type="application/ld+json">${JSON.stringify(o)}</script>`).join('\n  ');
  return `<!doctype html>
<html lang="pt-BR">
<head>
  <meta charset="utf-8">
  <meta name="viewport" content="width=device-width, initial-scale=1">
  <title>${esc(tituloCompleto)}</title>
  <meta name="description" content="${esc(descricao)}">
  <link rel="canonical" href="${url}">
  ${semIndex ? '<meta name="robots" content="noindex, follow">' : '<meta name="robots" content="index, follow, max-image-preview:large">'}
  <meta name="theme-color" content="#1c1f24">
  <meta property="og:locale" content="pt_BR">
  <meta property="og:site_name" content="${NOME}">
  <meta property="og:type" content="${tipo}">
  <meta property="og:title" content="${esc(titulo)}">
  <meta property="og:description" content="${esc(descricao)}">
  <meta property="og:url" content="${url}">
  <meta property="og:image" content="${SITE}/assets/img/${imagem}">
  <meta name="twitter:card" content="summary_large_image">
  <meta name="twitter:title" content="${esc(titulo)}">
  <meta name="twitter:description" content="${esc(descricao)}">
  <meta name="twitter:image" content="${SITE}/assets/img/${imagem}">
  <link rel="icon" href="/favicon.ico?v=2" sizes="48x48">
  <link rel="icon" type="image/png" sizes="32x32" href="/assets/img/favicon-32.png?v=2">
  <link rel="icon" type="image/png" sizes="16x16" href="/assets/img/favicon-16.png?v=2">
  <link rel="apple-touch-icon" href="/assets/img/apple-touch-icon.png?v=2">
  <link rel="manifest" href="/site.webmanifest">
  <link rel="preconnect" href="https://fonts.googleapis.com">
  <link rel="preconnect" href="https://fonts.gstatic.com" crossorigin>
  <link rel="stylesheet" href="https://fonts.googleapis.com/css2?family=Fraunces:opsz,wght@9..144,500;9..144,600&family=Inter:wght@400;500;600;700&display=swap">
  ${preload}<link rel="stylesheet" href="/assets/css/style.css?v=${V_CSS}">
  ${ld}
</head>
<body>
  <a class="pular" href="#conteudo">Pular para o conteúdo</a>
  <header class="topo">
    <div class="container">
      <a class="marca" href="/" aria-label="${NOME}, página inicial">
        <img src="/assets/img/logo.png" alt="1972corp" width="60" height="60">
      </a>
      <button class="botao-menu" aria-expanded="false" aria-controls="menu">
        <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" aria-hidden="true"><path d="M3 6h18M3 12h18M3 18h18"/></svg> Menu
      </button>
      <nav class="menu" id="menu" aria-label="Principal">
        <ul>
          ${menu}
          <li><a class="cta-menu" href="/contato/"${caminho.startsWith('/contato/') ? ' aria-current="page"' : ''}>Contato</a></li>
        </ul>
      </nav>
    </div>
  </header>

  <main id="conteudo">
${conteudo}
  </main>

  <footer class="rodape">
    <div class="container">
      <div class="colunas">
        <div>
          <img class="logo-rodape" src="/assets/img/logo.png" alt="Logotipo 1972corp" width="64" height="64" loading="lazy">
          <p>Administração de imóveis residenciais e comerciais em São Paulo e Sorocaba, com transparência e atendimento direto.</p>
        </div>
        <div>
          <h2>Navegação</h2>
          <ul>
            <li><a href="/imoveis/">Imóveis</a></li>
            <li><a href="/sobre/">Sobre a 1972corp</a></li>
            <li><a href="/blog/">Blog</a></li>
            <li><a href="/contato/">Contato</a></li>
          </ul>
        </div>
        <div>
          <h2>Contato</h2>
          <ul>
            <li><a href="mailto:${EMAIL}">${EMAIL}</a></li>
            <li>São Paulo e Sorocaba – SP</li>
            <li><a href="/privacidade/">Política de privacidade</a></li>
          </ul>
        </div>
      </div>
      <div class="base">
        <span>© <span id="ano">${new Date().getFullYear()}</span> 1972corp. Marca registrada no INPI.</span>
        <span>Administração de imóveis</span>
      </div>
    </div>
  </footer>
  <script src="/assets/js/main.js?v=${V_JS}" defer></script>
</body>
</html>
`;
}

function trilha(itens) {
  const lis = itens.map(([href, txt], i) => i === itens.length - 1
    ? `<li aria-current="page">${esc(txt)}</li>`
    : `<li><a href="${href}">${esc(txt)}</a></li>`).join('');
  const ld = {
    '@context': 'https://schema.org', '@type': 'BreadcrumbList',
    itemListElement: itens.map(([href, txt], i) => ({ '@type': 'ListItem', position: i + 1, name: txt, item: SITE + href }))
  };
  return { html: `<nav class="trilha" aria-label="Você está em"><ol>${lis}</ol></nav>`, ld };
}

function midiaImovel(im, carregar = 'lazy') {
  if (im.imagem) {
    return `<img src="/assets/img/${im.imagem}" alt="${esc(im.imagemAlt)}" width="${im.imagemLargura || 1200}" height="${im.imagemAltura || 800}" loading="${carregar}" style="object-position:center 30%">`;
  }
  return `<div class="placa" role="img" aria-label="${esc(im.titulo)}"><div><small>Foto em breve</small><strong>${esc(im.bairro)}</strong><span>${esc(im.cidade)}</span></div></div>`;
}

function cartaoImovel(im, completo = false) {
  const contato = `/contato/?assunto=Imóveis&imovel=${encodeURIComponent(im.titulo + ' – ' + im.cidade)}`;
  return `<article class="cartao imovel" id="${im.slug}">
        <div class="midia"><span class="selo">${esc(im.tipo)}</span>${midiaImovel(im)}</div>
        <div class="corpo">
          <span class="meta">${esc(im.bairro)} · ${esc(im.cidade)}</span>
          <h3>${esc(im.titulo)}</h3>
          ${completo ? `<ul class="detalhes">${im.detalhes.map(d => `<li>${esc(d)}</li>`).join('')}</ul>` : `<p>${esc(im.resumo)}</p>`}
          <div class="rodape-cartao"><a class="botao ${completo ? 'botao-primario' : 'botao-contorno'}" href="${completo ? contato : '/imoveis/#' + im.slug}">${completo ? 'Consultar condições' : 'Ver detalhes'}</a></div>
        </div>
      </article>`;
}

function cartaoMateria(m) {
  const midia = m.imagem
    ? `<img src="/assets/img/${m.imagem}" alt="${esc(m.imagemAlt)}" width="1200" height="800" loading="lazy">`
    : `<div class="placa" aria-hidden="true"><div><small>${esc(m.tema)}</small><strong>${esc(m.titulo.split(':')[0])}</strong></div></div>`;
  return `<article class="cartao" data-tema="${esc(m.tema)}">
        <div class="midia">${midia}</div>
        <div class="corpo">
          <span class="tag">${esc(m.tema)}</span>
          <h3><a href="/blog/${m.slug}/">${esc(m.titulo)}</a></h3>
          <p>${esc(m.descricao)}</p>
          <span class="meta"><time datetime="${m.data}">${dataBR(m.data)}</time></span>
        </div>
      </article>`;
}

const ORG = {
  '@context': 'https://schema.org',
  '@type': 'RealEstateAgent',
  '@id': SITE + '/#organizacao',
  name: NOME,
  url: SITE + '/',
  logo: SITE + '/assets/img/logo.png',
  image: SITE + '/assets/img/og.jpg',
  email: EMAIL,
  description: 'Administração de imóveis residenciais e comerciais em São Paulo e Sorocaba.',
  areaServed: [{ '@type': 'City', name: 'São Paulo' }, { '@type': 'City', name: 'Sorocaba' }],
  address: { '@type': 'PostalAddress', addressLocality: 'São Paulo', addressRegion: 'SP', addressCountry: 'BR' },
  knowsAbout: ['Administração de imóveis', 'Locação residencial', 'Locação comercial', 'Galpões', 'Holding patrimonial']
};

const FAQ = [
  ['Os imóveis são para locação ou venda?', 'As condições variam conforme o imóvel. Entre em contato informando o imóvel de interesse e enviamos valores, condições e disponibilidade para visita.'],
  ['Em quais cidades a 1972corp atua?', 'Hoje administramos imóveis em São Paulo (Mooca e Parque da Mooca) e em Sorocaba (Terras de Arieta).'],
  ['Quais garantias de aluguel são aceitas?', 'A Lei do Inquilinato permite caução, fiança, seguro-fiança ou cessão de quotas de fundo de investimento, uma por contrato. A modalidade é combinada caso a caso, de acordo com o imóvel e o perfil do inquilino.'],
  ['Como agendar uma visita?', 'Envie uma mensagem pela página de contato ou para contato@1972corp.com.br com o imóvel de interesse e os melhores dias e horários. Respondemos com as opções disponíveis.'],
];

// ---------- Páginas ----------
const paginas = {};

// Início
paginas['index.html'] = pagina({
  caminho: '/',
  titulo: '1972corp | Administração de imóveis em São Paulo e Sorocaba',
  descricao: 'Imóveis residenciais e comerciais para alugar em São Paulo (Mooca) e Sorocaba, com administração direta, contratos claros e atendimento próximo.',
  preload: '<link rel="preload" as="image" href="/assets/img/hero.jpg">\n  ',
  jsonld: [ORG, {
    '@context': 'https://schema.org', '@type': 'WebSite', '@id': SITE + '/#site', url: SITE + '/', name: NOME, inLanguage: 'pt-BR', publisher: { '@id': SITE + '/#organizacao' }
  }, {
    '@context': 'https://schema.org', '@type': 'FAQPage',
    mainEntity: FAQ.map(([q, a]) => ({ '@type': 'Question', name: q, acceptedAnswer: { '@type': 'Answer', text: a } }))
  }],
  conteudo: `
    <section class="hero">
      <img src="/assets/img/hero.jpg" alt="" width="1600" height="900" fetchpriority="high">
      <div class="container">
        <span class="sobretitulo">Administração de imóveis</span>
        <h1>Imóveis bem cuidados, contratos claros e atendimento direto</h1>
        <p>A 1972corp administra imóveis residenciais e comerciais em São Paulo e Sorocaba. Você fala direto com quem cuida do imóvel, sem intermediários.</p>
        <div class="acoes">
          <a class="botao botao-primario" href="/imoveis/">Ver imóveis disponíveis</a>
          <a class="botao botao-claro" href="/contato/">Fale com a gente</a>
        </div>
      </div>
    </section>

    <section class="secao" aria-labelledby="servicos-titulo">
      <div class="container">
        <div class="secao-cabeca">
          <span class="sobretitulo">O que fazemos</span>
          <h2 id="servicos-titulo">Administração completa do imóvel</h2>
          <p>Da escolha do inquilino à manutenção, cuidamos de cada etapa para que o imóvel renda bem e o inquilino se sinta em casa.</p>
        </div>
        <div class="grade grade-3">
          <div class="servico">
            <div class="icone">${icones.chave}</div>
            <h3>Locação residencial</h3>
            <ul><li>Casas e apartamentos prontos para morar</li><li>Análise cadastral transparente</li><li>Contrato conforme a Lei do Inquilinato</li></ul>
          </div>
          <div class="servico">
            <div class="icone">${icones.predio}</div>
            <h3>Imóveis comerciais</h3>
            <ul><li>Salas comerciais e galpões</li><li>Contratos com prazo e garantias adequados</li><li>Apoio na adaptação do espaço</li></ul>
          </div>
          <div class="servico">
            <div class="icone">${icones.escudo}</div>
            <h3>Gestão do patrimônio</h3>
            <ul><li>Reajustes, cobranças e recibos em dia</li><li>Vistorias de entrada e saída documentadas</li><li>Manutenção preventiva e IPTU organizados</li></ul>
          </div>
        </div>
      </div>
    </section>

    <section class="secao secao-alt" aria-labelledby="imoveis-titulo">
      <div class="container">
        <div class="secao-cabeca">
          <span class="sobretitulo">Portfólio</span>
          <h2 id="imoveis-titulo">Imóveis em destaque</h2>
          <p>Conheça os imóveis administrados pela 1972corp em São Paulo e Sorocaba.</p>
        </div>
        <div class="grade grade-3">
      ${imoveis.map(im => cartaoImovel(im)).join('\n      ')}
        </div>
        <p style="margin-top:28px"><a class="botao botao-contorno" href="/imoveis/">Ver todos os imóveis</a></p>
      </div>
    </section>

    <section class="secao faixa" aria-labelledby="como-titulo">
      <div class="container">
        <div class="secao-cabeca">
          <span class="sobretitulo">Como funciona</span>
          <h2 id="como-titulo">Do primeiro contato à entrega das chaves</h2>
        </div>
        <div class="grade grade-3" style="grid-template-columns:repeat(auto-fit,minmax(220px,1fr))">
          <div class="item"><h3>1. Escolha</h3><p>Veja os imóveis disponíveis e escolha o que combina com você ou com o seu negócio.</p></div>
          <div class="item"><h3>2. Contato e visita</h3><p>Envie uma mensagem. Respondemos com condições e agendamos a visita.</p></div>
          <div class="item"><h3>3. Análise e contrato</h3><p>Análise cadastral, escolha da garantia e contrato claro, sem letras miúdas.</p></div>
          <div class="item"><h3>4. Chaves na mão</h3><p>Vistoria de entrada com fotos e atendimento direto durante toda a locação.</p></div>
        </div>
      </div>
    </section>

    <section class="secao" aria-labelledby="blog-titulo">
      <div class="container">
        <div class="secao-cabeca">
          <span class="sobretitulo">Blog</span>
          <h2 id="blog-titulo">Conteúdo para proprietários e inquilinos</h2>
          <p>Guias práticos sobre locação, contratos e organização do patrimônio imobiliário.</p>
        </div>
        <div class="grade grade-3">
      ${ordenadas.slice(0, 3).map(cartaoMateria).join('\n      ')}
        </div>
        <p style="margin-top:28px"><a class="botao botao-contorno" href="/blog/">Ver todas as matérias</a></p>
      </div>
    </section>

    <section class="secao secao-alt faq" aria-labelledby="faq-titulo">
      <div class="container" style="max-width:820px">
        <div class="secao-cabeca">
          <span class="sobretitulo">Dúvidas frequentes</span>
          <h2 id="faq-titulo">Perguntas frequentes</h2>
        </div>
        ${FAQ.map(([q, a]) => `<details><summary>${esc(q)}</summary><p>${esc(a)}</p></details>`).join('\n        ')}
      </div>
    </section>

    <section class="secao">
      <div class="container">
        <div class="chamada">
          <div>
            <h2>Procurando um imóvel em São Paulo ou Sorocaba?</h2>
            <p>Conte o que você precisa e retornamos com as opções disponíveis.</p>
          </div>
          <a class="botao botao-primario" href="/contato/">Entrar em contato</a>
        </div>
      </div>
    </section>`
});

// Imóveis
{
  const t = trilha([['/', 'Início'], ['/imoveis/', 'Imóveis']]);
  paginas['imoveis/index.html'] = pagina({
    caminho: '/imoveis/',
    titulo: 'Imóveis para alugar em São Paulo e Sorocaba',
    descricao: 'Sala comercial no Parque da Mooca, casa térrea em Terras de Arieta (Sorocaba) e imóvel na Mooca. Veja detalhes e consulte condições.',
    jsonld: [t.ld, {
      '@context': 'https://schema.org', '@type': 'ItemList', name: 'Imóveis administrados pela 1972corp',
      itemListElement: imoveis.map((im, i) => ({
        '@type': 'ListItem', position: i + 1,
        item: { '@type': 'Accommodation', name: im.titulo, description: im.resumo, url: `${SITE}/imoveis/#${im.slug}`,
          address: { '@type': 'PostalAddress', addressLocality: im.cidade.split(' – ')[0], addressRegion: 'SP', addressCountry: 'BR' } }
      }))
    }],
    conteudo: `
    <section class="cabecalho-pagina">
      <div class="container">
        ${t.html}
        <h1>Imóveis</h1>
        <p>Imóveis residenciais e comerciais administrados diretamente pela 1972corp. Escolha um e clique em “Consultar condições” para receber valores e agendar visita.</p>
      </div>
    </section>
    <section class="secao">
      <div class="container">
        <div class="grade grade-3">
      ${imoveis.map(im => cartaoImovel(im, true)).join('\n      ')}
        </div>
        <p class="legenda" style="margin-top:20px">Disponibilidade e condições sujeitas a confirmação no momento do contato.</p>
      </div>
    </section>
    <section class="secao secao-alt">
      <div class="container">
        <div class="chamada" style="background:var(--papel)">
          <div>
            <h2>Não encontrou o que procura?</h2>
            <p>Conte o tipo de imóvel e a região que você precisa. Avisamos quando surgir uma opção.</p>
          </div>
          <a class="botao botao-primario" href="/contato/?assunto=Imóveis">Deixar meu interesse</a>
        </div>
      </div>
    </section>`
  });
}

// Sobre
{
  const t = trilha([['/', 'Início'], ['/sobre/', 'Sobre']]);
  paginas['sobre/index.html'] = pagina({
    caminho: '/sobre/',
    titulo: 'Sobre a 1972corp',
    descricao: 'Conheça a 1972corp, marca de administração de imóveis registrada no INPI, com atuação em São Paulo e Sorocaba e atendimento direto ao inquilino.',
    jsonld: [t.ld, ORG],
    conteudo: `
    <section class="cabecalho-pagina">
      <div class="container">
        ${t.html}
        <h1>Sobre a 1972corp</h1>
        <p>Administração de imóveis com olhar de dono: cuidado com o patrimônio e respeito a quem mora ou trabalha nele.</p>
      </div>
    </section>
    <section class="secao">
      <div class="container grade grade-2" style="align-items:center">
        <div>
          <h2>Quem somos</h2>
          <p>A 1972corp é uma marca de <strong>administração de imóveis</strong>, registrada no Instituto Nacional da Propriedade Industrial (INPI). Cuidamos de imóveis residenciais e comerciais em São Paulo e Sorocaba, do anúncio à manutenção.</p>
          <p>Nosso modelo é simples: atendimento direto, sem camadas de intermediação. Quem fala com você é quem conhece o imóvel e pode resolver.</p>
          <a class="botao botao-primario" href="/contato/">Fale com a gente</a>
        </div>
        <img src="/assets/img/casa-card.jpg" alt="Casa moderna com fachada de vidro e jardim iluminado ao entardecer (imagem ilustrativa)" width="1200" height="800" loading="lazy" style="border-radius:var(--raio);border:1px solid var(--linha)">
      </div>
    </section>
    <section class="secao secao-alt">
      <div class="container">
        <div class="secao-cabeca"><h2>No que acreditamos</h2></div>
        <div class="grade grade-3">
          <div class="servico"><div class="icone">${icones.escudo}</div><h3>Transparência</h3><p>Contratos claros, reajustes explicados com cálculo e fonte do índice, recibos sempre em dia.</p></div>
          <div class="servico"><div class="icone">${icones.chave}</div><h3>Imóvel bem cuidado</h3><p>Vistoria documentada com fotos e manutenção preventiva para evitar surpresas dos dois lados.</p></div>
          <div class="servico"><div class="icone">${icones.relogio}</div><h3>Relação de longo prazo</h3><p>Um bom inquilino vale mais que um aluguel alto. Buscamos acordos justos e duradouros.</p></div>
        </div>
      </div>
    </section>`
  });
}

// Contato
{
  const t = trilha([['/', 'Início'], ['/contato/', 'Contato']]);
  paginas['contato/index.html'] = pagina({
    caminho: '/contato/',
    titulo: 'Contato',
    descricao: 'Fale com a 1972corp para consultar imóveis, agendar visitas ou tirar dúvidas sobre locação em São Paulo e Sorocaba. E-mail: contato@1972corp.com.br.',
    jsonld: [t.ld, { '@context': 'https://schema.org', '@type': 'ContactPage', url: SITE + '/contato/', about: { '@id': SITE + '/#organizacao' } }],
    conteudo: `
    <section class="cabecalho-pagina">
      <div class="container">
        ${t.html}
        <h1>Contato</h1>
        <p>Quer saber condições de um imóvel, agendar visita ou tirar uma dúvida? Mande sua mensagem.</p>
      </div>
    </section>
    <section class="secao">
      <div class="container grade grade-2">
        <form class="formulario" id="form-contato" aria-label="Formulário de contato">
          <label>Nome<input name="nome" required autocomplete="name"></label>
          <label>E-mail<input name="email" type="email" required autocomplete="email"></label>
          <label>Telefone <small>(opcional)</small><input name="telefone" type="tel" autocomplete="tel"></label>
          <label>Assunto
            <select name="assunto">
              <option>Imóveis</option>
              <option>Agendar visita</option>
              <option>Sou inquilino</option>
              <option>Outro assunto</option>
            </select>
          </label>
          <label>Mensagem<textarea name="mensagem" required></textarea></label>
          <button class="botao botao-primario" type="submit">Enviar mensagem</button>
          <small>Ao enviar, o seu programa de e-mail abre com a mensagem pronta. Seus dados são usados apenas para responder ao contato (veja a <a href="/privacidade/">política de privacidade</a>).</small>
        </form>
        <div class="contato-info">
          <div class="item"><div class="icone">${icones.email}</div><div><h3>E-mail</h3><p><a href="mailto:${EMAIL}">${EMAIL}</a></p></div></div>
          <div class="item"><div class="icone">${icones.mapa}</div><div><h3>Onde atuamos</h3><p>São Paulo – SP (Mooca e Parque da Mooca)<br>Sorocaba – SP (Terras de Arieta)</p></div></div>
          <div class="item"><div class="icone">${icones.relogio}</div><div><h3>Retorno</h3><p>Respondemos as mensagens em dias úteis.</p></div></div>
        </div>
      </div>
    </section>`
  });
}

// Blog (listagem)
{
  const t = trilha([['/', 'Início'], ['/blog/', 'Blog']]);
  const temas = [...new Set(ordenadas.map(m => m.tema))];
  paginas['blog/index.html'] = pagina({
    caminho: '/blog/',
    titulo: 'Blog: locação, imóveis comerciais e patrimônio',
    descricao: 'Guias práticos para proprietários e inquilinos: garantias de aluguel, vistoria, reajuste, galpões, renovação comercial e holding patrimonial.',
    jsonld: [t.ld, {
      '@context': 'https://schema.org', '@type': 'Blog', name: 'Blog 1972corp', url: SITE + '/blog/', inLanguage: 'pt-BR',
      publisher: { '@id': SITE + '/#organizacao' },
      blogPost: ordenadas.map(m => ({ '@type': 'BlogPosting', headline: m.titulo, url: `${SITE}/blog/${m.slug}/`, datePublished: m.data }))
    }],
    conteudo: `
    <section class="cabecalho-pagina">
      <div class="container">
        ${t.html}
        <h1>Blog</h1>
        <p>Conteúdo prático sobre locação, imóveis comerciais e organização do patrimônio imobiliário.</p>
      </div>
    </section>
    <section class="secao">
      <div class="container">
        <div class="filtros" role="group" aria-label="Filtrar por tema">
          <button data-filtro="todos" aria-pressed="true">Todos</button>
          ${temas.map(tm => `<button data-filtro="${esc(tm)}" aria-pressed="false">${esc(tm)}</button>`).join('\n          ')}
        </div>
        <div class="grade grade-3">
      ${ordenadas.map(cartaoMateria).join('\n      ')}
        </div>
      </div>
    </section>`
  });
}

// Matérias
for (const m of ordenadas) {
  const t = trilha([['/', 'Início'], ['/blog/', 'Blog'], [`/blog/${m.slug}/`, m.titulo]]);
  const relacionadas = [...ordenadas.filter(x => x !== m && x.tema === m.tema), ...ordenadas.filter(x => x !== m && x.tema !== m.tema)].slice(0, 3);
  paginas[`blog/${m.slug}/index.html`] = pagina({
    caminho: `/blog/${m.slug}/`,
    titulo: m.titulo,
    descricao: m.descricao,
    tipo: 'article',
    imagem: m.imagem || 'og.jpg',
    jsonld: [t.ld, {
      '@context': 'https://schema.org', '@type': 'BlogPosting',
      headline: m.titulo, description: m.descricao, inLanguage: 'pt-BR',
      image: `${SITE}/assets/img/${m.imagem || 'og.jpg'}`,
      datePublished: m.data, dateModified: m.data,
      mainEntityOfPage: `${SITE}/blog/${m.slug}/`,
      author: { '@type': 'Organization', name: NOME, url: SITE + '/' },
      publisher: { '@id': SITE + '/#organizacao' },
      articleSection: m.tema
    }],
    conteudo: `
    <article class="artigo">
      ${t.html}
      <span class="tag">${esc(m.tema)}</span>
      <h1 style="margin-top:12px">${esc(m.titulo)}</h1>
      <p class="meta">Publicado em <time datetime="${m.data}">${dataBR(m.data)}</time> · por ${NOME}</p>
      ${m.imagem ? `<img class="capa" src="/assets/img/${m.imagem}" alt="${esc(m.imagemAlt)}" width="1200" height="800">` : ''}
      ${m.corpo.trim()}
      <div class="chamada" style="margin-top:40px;padding:32px">
        <div><h2 style="font-size:1.4rem">Precisa de um imóvel em São Paulo ou Sorocaba?</h2><p>Veja os imóveis administrados pela 1972corp.</p></div>
        <a class="botao botao-primario" href="/imoveis/">Ver imóveis</a>
      </div>
      <section class="leia-tambem" aria-labelledby="leia-tambem">
        <h2 id="leia-tambem" style="margin-top:0">Leia também</h2>
        <div class="grade grade-3" style="grid-template-columns:repeat(auto-fit,minmax(200px,1fr))">
      ${relacionadas.map(cartaoMateria).join('\n      ')}
        </div>
      </section>
    </article>`
  });
}

// Privacidade
{
  const t = trilha([['/', 'Início'], ['/privacidade/', 'Política de privacidade']]);
  paginas['privacidade/index.html'] = pagina({
    caminho: '/privacidade/',
    titulo: 'Política de privacidade',
    descricao: 'Como a 1972corp trata os dados pessoais enviados pelo site, em conformidade com a Lei Geral de Proteção de Dados (LGPD).',
    jsonld: [t.ld],
    conteudo: `
    <article class="artigo">
      ${t.html}
      <h1>Política de privacidade</h1>
      <p class="meta">Atualizada em ${dataBR(HOJE)}</p>
      <p>Esta política explica como a 1972corp trata os dados pessoais de quem visita o site 1972corp.com.br, de acordo com a Lei Geral de Proteção de Dados (Lei 13.709/2018).</p>
      <h2>Quais dados coletamos</h2>
      <p>O site não usa cookies de rastreamento nem ferramentas de publicidade. O formulário de contato não grava dados em servidor: ele apenas abre o seu programa de e-mail com a mensagem pronta. Recebemos somente o que você decidir enviar por e-mail (nome, e-mail, telefone e mensagem).</p>
      <h2>Para que usamos</h2>
      <p>Usamos os dados apenas para responder ao seu contato, enviar informações sobre imóveis que você solicitou e, se houver negociação, preparar a proposta e o contrato.</p>
      <h2>Compartilhamento</h2>
      <p>Não vendemos nem compartilhamos seus dados com terceiros para fins de marketing. Eles podem ser compartilhados apenas quando necessário para a locação (por exemplo, com seguradora em caso de seguro-fiança) ou por obrigação legal.</p>
      <h2>Seus direitos</h2>
      <p>Você pode pedir a qualquer momento acesso, correção ou exclusão dos seus dados, escrevendo para <a href="mailto:${EMAIL}">${EMAIL}</a>.</p>
      <h2>Fontes externas</h2>
      <p>As fontes tipográficas do site são carregadas do Google Fonts, que pode registrar o endereço IP do visitante conforme a política do Google.</p>
    </article>`
  });
}

// 404
paginas['404.html'] = pagina({
  caminho: '/404.html',
  titulo: 'Página não encontrada',
  descricao: 'A página que você procurou não existe ou mudou de endereço.',
  semIndex: true,
  conteudo: `
    <section class="secao">
      <div class="container" style="max-width:640px;text-align:center">
        <h1>Página não encontrada</h1>
        <p>O endereço pode ter mudado. Que tal começar por aqui?</p>
        <p style="display:flex;gap:12px;justify-content:center;flex-wrap:wrap;margin-top:24px">
          <a class="botao botao-primario" href="/">Página inicial</a>
          <a class="botao botao-contorno" href="/imoveis/">Imóveis</a>
          <a class="botao botao-contorno" href="/blog/">Blog</a>
        </p>
      </div>
    </section>`
});

// Redirecionamentos dos endereços do site antigo da UOL
function redirecionar(destino) {
  return `<!doctype html><html lang="pt-BR"><head><meta charset="utf-8"><title>Redirecionando…</title><link rel="canonical" href="${SITE}${destino}"><meta name="robots" content="noindex"><meta http-equiv="refresh" content="0; url=${destino}"></head><body><p><a href="${destino}">Clique aqui se não for redirecionado.</a></p></body></html>\n`;
}
paginas['privacy/index.html'] = redirecionar('/privacidade/');
paginas['legal-notice/index.html'] = redirecionar('/privacidade/');

// ---------- Gravação ----------
for (const [arq, html] of Object.entries(paginas)) {
  const destino = path.join(RAIZ, arq);
  fs.mkdirSync(path.dirname(destino), { recursive: true });
  fs.writeFileSync(destino, html);
}

const urls = [
  ['/', '1.0'], ['/imoveis/', '0.9'], ['/blog/', '0.8'], ['/sobre/', '0.6'], ['/contato/', '0.6'], ['/privacidade/', '0.2'],
  ...ordenadas.map(m => [`/blog/${m.slug}/`, '0.7', m.data])
];
fs.writeFileSync(path.join(RAIZ, 'sitemap.xml'),
  `<?xml version="1.0" encoding="UTF-8"?>\n<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">\n` +
  urls.map(([u, p, d]) => `  <url><loc>${SITE}${u}</loc><lastmod>${d || HOJE}</lastmod><priority>${p}</priority></url>`).join('\n') +
  `\n</urlset>\n`);
fs.writeFileSync(path.join(RAIZ, 'robots.txt'), `User-agent: *\nAllow: /\nDisallow: /gerador/\n\nSitemap: ${SITE}/sitemap.xml\n`);

console.log(`${Object.keys(paginas).length} páginas geradas (css v=${V_CSS}, js v=${V_JS}).`);
