// Gera todas as páginas do site 1972corp.com.br.
// Uso (na pasta 1972corp): node gerador/gerar.js
const fs = require('fs');
const path = require('path');
const crypto = require('crypto');
const { materias } = require('./conteudo');

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
  <script>/* Endereços com parâmetros (ex.: ?u=... criados pela invasão do site antigo da UOL) não devem ser indexados */if(location.search){var r=document.querySelector('meta[name=robots]');if(r)r.content='noindex, follow';}</script>
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
  <link rel="icon" href="/favicon.ico?v=3" sizes="48x48">
  <link rel="icon" type="image/png" sizes="512x512" href="/assets/img/icon-512.png?v=3">
  <link rel="icon" type="image/png" sizes="192x192" href="/assets/img/icon-192.png?v=3">
  <link rel="icon" type="image/png" sizes="144x144" href="/assets/img/icon-144.png?v=3">
  <link rel="icon" type="image/png" sizes="96x96" href="/assets/img/icon-96.png?v=3">
  <link rel="icon" type="image/png" sizes="48x48" href="/assets/img/favicon-48.png?v=3">
  <link rel="icon" type="image/png" sizes="32x32" href="/assets/img/favicon-32.png?v=3">
  <link rel="icon" type="image/png" sizes="16x16" href="/assets/img/favicon-16.png?v=3">
  <link rel="apple-touch-icon" sizes="180x180" href="/assets/img/apple-touch-icon.png?v=3">
  <link rel="manifest" href="/site.webmanifest?v=3">
  <link rel="preload" href="/assets/fonts/inter-latin.woff2" as="font" type="font/woff2" crossorigin>
  <link rel="preload" href="/assets/fonts/fraunces-latin.woff2" as="font" type="font/woff2" crossorigin>
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
          <p>Holding empresarial que reúne participações societárias e patrimônio imobiliário em São Paulo, com gestão profissional e visão de longo prazo.</p>
        </div>
        <div>
          <h2>Navegação</h2>
          <ul>
            <li><a href="/sobre/">Sobre a 1972corp</a></li>
            <li><a href="/blog/">Blog</a></li>
            <li><a href="/contato/">Contato</a></li>
          </ul>
        </div>
        <div>
          <h2>Contato</h2>
          <ul>
            <li><a href="mailto:${EMAIL}">${EMAIL}</a></li>
            <li>São Paulo – SP</li>
            <li><a href="/privacidade/">Política de privacidade</a></li>
          </ul>
        </div>
      </div>
      <div class="base">
        <span>© <span id="ano">${new Date().getFullYear()}</span> 1972corp. Marca registrada no INPI.</span>
        <span>Holding empresarial</span>
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

// Imagem em WebP (dois tamanhos) com JPEG de reserva; arquivos gerados por gerador/imagens.js
function foto(base, alt, w, h, { larguras = [600, 1200], sizes = '(max-width: 760px) 100vw, 400px', attrs = 'loading="lazy"', jpg = base + '.jpg' } = {}) {
  const srcset = larguras.map(l => `/assets/img/${base}-${l}.webp ${l}w`).join(', ');
  return `<picture><source type="image/webp" srcset="${srcset}" sizes="${sizes}"><img src="/assets/img/${jpg}" alt="${esc(alt)}" width="${w}" height="${h}" ${attrs}></picture>`;
}

// Capas geradas para matérias sem foto: capa-<slug>-600.webp, capa-<slug>.webp (1200) e capa-<slug>.jpg (1200x630)
function capaGerada(m, sizes) {
  return `<picture><source type="image/webp" srcset="/assets/img/capa-${m.slug}-600.webp 600w, /assets/img/capa-${m.slug}.webp 1200w" sizes="${sizes || '(max-width: 760px) 100vw, 400px'}"><img src="/assets/img/capa-${m.slug}.jpg" alt="" width="1200" height="800" loading="lazy"></picture>`;
}

function cartaoMateria(m) {
  const midia = m.imagem
    ? foto(m.imagem.replace('.jpg', ''), m.imagemAlt, 1200, 800)
    : capaGerada(m);
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
  '@type': 'Organization',
  '@id': SITE + '/#organizacao',
  name: NOME,
  url: SITE + '/',
  logo: SITE + '/assets/img/logo.png',
  image: SITE + '/assets/img/og.jpg',
  email: EMAIL,
  description: 'Holding empresarial em São Paulo: participações societárias, patrimônio imobiliário e governança.',
  areaServed: [{ '@type': 'City', name: 'São Paulo' }],
  address: { '@type': 'PostalAddress', addressLocality: 'São Paulo', addressRegion: 'SP', addressCountry: 'BR' },
  knowsAbout: ['Holding empresarial', 'Participações societárias', 'Gestão de patrimônio', 'Administração de imóveis', 'Governança corporativa']
};

const FAQ = [
  ['O que é uma holding empresarial?', 'É uma empresa cuja função principal é deter participações em outras empresas e bens, como imóveis. Ela centraliza o controle, a gestão e as decisões estratégicas do grupo em uma única estrutura.'],
  ['Qual a diferença entre holding empresarial e holding familiar?', 'A holding familiar tem como foco organizar o patrimônio de uma família e planejar a sucessão. A holding empresarial tem como foco o controle de empresas e ativos com visão de negócio: governança, alocação de capital e crescimento. Uma mesma estrutura pode cumprir os dois papéis.'],
  ['A 1972corp administra imóveis?', 'Sim. O patrimônio imobiliário do grupo, com imóveis residenciais e comerciais em São Paulo, é administrado diretamente pela 1972corp.'],
  ['Como falar com a 1972corp?', 'Pela página de contato ou pelo e-mail contato@1972corp.com.br. Respondemos em dias úteis.'],
];

// ---------- Páginas ----------
const paginas = {};

// Início
paginas['index.html'] = pagina({
  caminho: '/',
  titulo: '1972corp | Holding empresarial em São Paulo',
  descricao: 'A 1972corp é uma holding empresarial em São Paulo que reúne participações societárias e patrimônio imobiliário, com gestão profissional e governança.',
  preload: '<link rel="preload" as="image" type="image/webp" imagesrcset="/assets/img/hero-800.webp 800w, /assets/img/hero-1600.webp 1600w" imagesizes="100vw">\n  ',
  jsonld: [ORG, {
    '@context': 'https://schema.org', '@type': 'WebSite', '@id': SITE + '/#site', url: SITE + '/', name: NOME, inLanguage: 'pt-BR', publisher: { '@id': SITE + '/#organizacao' }
  }, {
    '@context': 'https://schema.org', '@type': 'FAQPage',
    mainEntity: FAQ.map(([q, a]) => ({ '@type': 'Question', name: q, acceptedAnswer: { '@type': 'Answer', text: a } }))
  }],
  conteudo: `
    <section class="hero">
      ${foto('hero', '', 1600, 900, { larguras: [800, 1600], sizes: '100vw', attrs: 'fetchpriority="high"' })}
      <div class="container">
        <span class="sobretitulo">Holding empresarial</span>
        <h1>Participações, patrimônio e governança sob uma gestão única</h1>
        <p>A 1972corp é a holding que reúne participações societárias e o patrimônio imobiliário do grupo, com gestão profissional, controles claros e visão de longo prazo.</p>
        <div class="acoes">
          <a class="botao botao-primario" href="/sobre/">Conheça a 1972corp</a>
          <a class="botao botao-claro" href="/contato/">Fale com a gente</a>
        </div>
      </div>
    </section>

    <section class="secao" aria-labelledby="servicos-titulo">
      <div class="container">
        <div class="secao-cabeca">
          <span class="sobretitulo">O que fazemos</span>
          <h2 id="servicos-titulo">Uma holding para organizar e fazer crescer o patrimônio</h2>
          <p>Concentramos empresas e bens em uma estrutura única, com decisões estratégicas, controle financeiro e prestação de contas.</p>
        </div>
        <div class="grade grade-3">
          <div class="servico">
            <div class="icone">${icones.predio}</div>
            <h3>Participações societárias</h3>
            <ul><li>Controle e acompanhamento das empresas do grupo</li><li>Planejamento de capital e de investimentos</li><li>Indicadores e prestação de contas periódica</li></ul>
          </div>
          <div class="servico">
            <div class="icone">${icones.chave}</div>
            <h3>Patrimônio imobiliário</h3>
            <ul><li>Imóveis residenciais e comerciais próprios</li><li>Locação, manutenção e contratos em dia</li><li>Documentação e impostos organizados</li></ul>
          </div>
          <div class="servico">
            <div class="icone">${icones.escudo}</div>
            <h3>Governança e planejamento</h3>
            <ul><li>Estrutura societária e tributária revisada com especialistas</li><li>Política de distribuição de resultados</li><li>Planejamento de longo prazo</li></ul>
          </div>
        </div>
      </div>
    </section>

    <section class="secao faixa" aria-labelledby="como-titulo">
      <div class="container">
        <div class="secao-cabeca">
          <span class="sobretitulo">Como atuamos</span>
          <h2 id="como-titulo">Gestão com método</h2>
        </div>
        <div class="grade grade-3" style="grid-template-columns:repeat(auto-fit,minmax(220px,1fr))">
          <div class="item"><h3>1. Diagnóstico</h3><p>Levantamento de empresas, imóveis, contratos, dívidas e resultados.</p></div>
          <div class="item"><h3>2. Estrutura</h3><p>Organização societária, tributária e documental, com assessoria especializada.</p></div>
          <div class="item"><h3>3. Gestão</h3><p>Acompanhamento das empresas e do patrimônio, com controles e metas.</p></div>
          <div class="item"><h3>4. Prestação de contas</h3><p>Relatórios periódicos e decisões registradas, com transparência entre os sócios.</p></div>
        </div>
      </div>
    </section>

    <section class="secao" aria-labelledby="blog-titulo">
      <div class="container">
        <div class="secao-cabeca">
          <span class="sobretitulo">Blog</span>
          <h2 id="blog-titulo">Gestão de patrimônio, holding e imóveis</h2>
          <p>Guias práticos sobre holding, organização do patrimônio, contratos e imóveis.</p>
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
            <h2>Quer conversar com a 1972corp?</h2>
            <p>Para parcerias, negócios, locação de imóveis ou outros assuntos, fale com a gente.</p>
          </div>
          <a class="botao botao-primario" href="/contato/">Entrar em contato</a>
        </div>
      </div>
    </section>`
});

// /imoveis/ deixou de existir (área do cliente foi para o Mana Vivaro): redireciona para a página inicial
paginas['imoveis/index.html'] = redirecionar('/');

// Sobre
{
  const t = trilha([['/', 'Início'], ['/sobre/', 'Sobre']]);
  paginas['sobre/index.html'] = pagina({
    caminho: '/sobre/',
    titulo: 'Sobre a 1972corp',
    descricao: 'Conheça a 1972corp, holding empresarial em São Paulo que reúne participações societárias e patrimônio imobiliário, com marca registrada no INPI.',
    jsonld: [t.ld, ORG],
    conteudo: `
    <section class="cabecalho-pagina">
      <div class="container">
        ${t.html}
        <h1>Sobre a 1972corp</h1>
        <p>Holding empresarial com visão de longo prazo: governança, disciplina financeira e patrimônio bem cuidado.</p>
      </div>
    </section>
    <section class="secao">
      <div class="container grade grade-2" style="align-items:center">
        <div>
          <h2>Quem somos</h2>
          <p>A 1972corp é uma <strong>holding empresarial</strong> com sede em São Paulo. Reúne participações societárias e o patrimônio imobiliário do grupo em uma estrutura única, com gestão profissional. A marca é registrada no Instituto Nacional da Propriedade Industrial (INPI).</p>
          <p>Nosso papel é dar direção ao conjunto: definir prioridades, acompanhar resultados, cuidar dos imóveis e manter a estrutura societária e tributária em ordem.</p>
          <a class="botao botao-primario" href="/contato/">Fale com a gente</a>
        </div>
        <div style="border-radius:var(--raio);border:1px solid var(--linha);overflow:hidden">${foto('casa-card', 'Casa moderna com fachada de vidro e jardim iluminado ao entardecer (imagem ilustrativa)', 1200, 800, { sizes: '(max-width: 760px) 100vw, 560px' })}</div>
      </div>
    </section>
    <section class="secao secao-alt">
      <div class="container">
        <div class="secao-cabeca"><h2>No que acreditamos</h2></div>
        <div class="grade grade-3">
          <div class="servico"><div class="icone">${icones.escudo}</div><h3>Governança</h3><p>Decisões registradas, regras claras entre os sócios e prestação de contas periódica.</p></div>
          <div class="servico"><div class="icone">${icones.chave}</div><h3>Patrimônio bem cuidado</h3><p>Imóveis com manutenção em dia, contratos claros e documentação organizada.</p></div>
          <div class="servico"><div class="icone">${icones.relogio}</div><h3>Visão de longo prazo</h3><p>Crescimento sustentável vale mais que ganho rápido. Pensamos em gerações, não em trimestres.</p></div>
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
    descricao: 'Fale com a 1972corp: parcerias, negócios, locação de imóveis e outros assuntos. E-mail: contato@1972corp.com.br.',
    jsonld: [t.ld, { '@context': 'https://schema.org', '@type': 'ContactPage', url: SITE + '/contato/', about: { '@id': SITE + '/#organizacao' } }],
    conteudo: `
    <section class="cabecalho-pagina">
      <div class="container">
        ${t.html}
        <h1>Contato</h1>
        <p>Parcerias, negócios, locação de imóveis ou outro assunto? Mande sua mensagem.</p>
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
              <option>Parcerias e negócios</option>
              <option>Locação de imóveis</option>
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
          <div class="item"><div class="icone">${icones.mapa}</div><div><h3>Onde atuamos</h3><p>São Paulo – SP</p></div></div>
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
    titulo: 'Blog: holding, patrimônio e imóveis',
    descricao: 'Guias práticos sobre holding, organização do patrimônio e imóveis: holding patrimonial, garantias de aluguel, vistoria, reajuste, galpões e renovação comercial.',
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
    titulo: m.tituloSEO || m.titulo,
    descricao: m.descricao,
    tipo: 'article',
    imagem: m.imagem || `capa-${m.slug}.jpg`,
    jsonld: [t.ld, {
      '@context': 'https://schema.org', '@type': 'BlogPosting',
      headline: m.titulo, description: m.descricao, inLanguage: 'pt-BR',
      image: `${SITE}/assets/img/${m.imagem || `capa-${m.slug}.jpg`}`,
      datePublished: m.data, dateModified: m.revisado || m.data,
      citation: (m.fontes || []).map(f => f.url ? { '@type': 'CreativeWork', name: f.nome, url: f.url } : { '@type': 'CreativeWork', name: f.nome }),
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
      <p class="meta">Publicado em <time datetime="${m.data}">${dataBR(m.data)}</time>${m.revisado && m.revisado !== m.data ? ` · Revisado em <time datetime="${m.revisado}">${dataBR(m.revisado)}</time>` : ''} · por ${NOME}</p>
      ${m.imagem ? `<div class="capa" style="overflow:hidden">${foto(m.imagem.replace('.jpg', ''), m.imagemAlt, 1200, 800, { sizes: '(max-width: 780px) 100vw, 740px', attrs: 'fetchpriority="high"' })}</div>` : ''}
      ${m.corpo.trim()}
      ${(m.fontes || []).length ? `<section class="fontes" aria-labelledby="fontes-titulo">
        <h2 id="fontes-titulo">Fontes</h2>
        <ul>${m.fontes.map(f => `<li>${f.url ? `<a href="${f.url}" rel="noopener" target="_blank">${esc(f.nome)}</a>` : esc(f.nome)}</li>`).join('')}</ul>
      </section>` : ''}
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
          <a class="botao botao-contorno" href="/sobre/">Sobre a 1972corp</a>
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
  ['/', '1.0'], ['/blog/', '0.8'], ['/sobre/', '0.6'], ['/contato/', '0.6'], ['/privacidade/', '0.2'],
  ...ordenadas.map(m => [`/blog/${m.slug}/`, '0.7', m.revisado || m.data])
];
fs.writeFileSync(path.join(RAIZ, 'sitemap.xml'),
  `<?xml version="1.0" encoding="UTF-8"?>\n<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">\n` +
  urls.map(([u, p, d]) => `  <url><loc>${SITE}${u}</loc><lastmod>${d || HOJE}</lastmod><priority>${p}</priority></url>`).join('\n') +
  `\n</urlset>\n`);
fs.writeFileSync(path.join(RAIZ, 'robots.txt'), `User-agent: *\nAllow: /\nDisallow: /gerador/\n\nSitemap: ${SITE}/sitemap.xml\n`);

console.log(`${Object.keys(paginas).length} páginas geradas (css v=${V_CSS}, js v=${V_JS}).`);
