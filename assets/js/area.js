// Área do cliente: login por código SMS (Supabase do AXIA) e lista de imóveis.
// A chave publishable é pública por natureza; quem protege os dados são as funções c1972_* do banco,
// que só respondem para celulares cadastrados em c1972_acessos (ver Projetos IA/1972corp-backend).
(function () {
  var SUPABASE_URL = 'https://sodztpnfelmntvnbmzff.supabase.co';
  var SUPABASE_KEY = 'sb_publishable_jADhJfITu4l9-GvFv-csLA_1ik6DE16';

  var $ = function (id) { return document.getElementById(id); };
  var formCel = $('form-celular'), formCod = $('form-codigo'), msg = $('area-msg');
  var login = $('area-login'), painel = $('area-painel');
  var celular = '';

  if (!window.supabase) { msg.textContent = 'Não foi possível carregar o login. Recarregue a página.'; return; }
  var sb = window.supabase.createClient(SUPABASE_URL, SUPABASE_KEY, { auth: { persistSession: true, storageKey: 'c1972-auth' } });

  function aviso(t, erro) { msg.textContent = t || ''; msg.style.color = erro ? '#b42318' : ''; }
  function esc(s) { return String(s == null ? '' : s).replace(/[&<>"]/g, function (c) { return { '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;' }[c]; }); }

  function normalizar(v) {
    var n = String(v || '').replace(/\D/g, '');
    if (n.length === 10 || n.length === 11) n = '55' + n;
    return /^55\d{10,11}$/.test(n) ? n : null;
  }

  var BUCKET = 'c1972-imoveis';
  var imoveis = [];
  var ehAdmin = false;
  var links = {}; // caminho no bucket -> link temporário

  // Links temporários (1 h) para todos os arquivos dos imóveis; arquivos que não existirem ficam de fora
  async function assinar(lista) {
    var caminhos = [];
    lista.forEach(function (im) {
      (im.midia || []).forEach(function (m) { caminhos.push(m.arquivo); if (m.thumb) caminhos.push(m.thumb); });
    });
    if (!caminhos.length) return;
    var r = await sb.storage.from(BUCKET).createSignedUrls(caminhos, 3600);
    (r.data || []).forEach(function (x) { if (x.signedUrl && !x.error) links[x.path] = x.signedUrl; });
  }

  function midiaDisponivel(im) {
    return (im.midia || []).filter(function (m) { return links[m.arquivo]; });
  }

  function cartao(im, i) {
    var midia = midiaDisponivel(im);
    var capa = midia.filter(function (m) { return m.tipo === 'foto'; })[0];
    var topo = capa
      ? '<img class="capa-imovel" src="' + esc(links[capa.thumb] || links[capa.arquivo]) + '" alt="' + esc(capa.legenda || im.titulo) + '">'
      : '<div class="placa" aria-hidden="true"><div><small>' + esc(im.cidade) + '</small><strong>' + esc(im.bairro) + '</strong></div></div>';
    var botao = midia.length
      ? '<button class="botao botao-primario" type="button" data-galeria="' + i + '">Ver fotos</button>'
      : '<span class="sem-fotos">Fotos em breve</span>';
    return '<article class="cartao imovel">' +
      '<div class="midia"><span class="selo">' + esc(im.tipo) + '</span>' + topo + '</div>' +
      '<div class="corpo">' +
        '<span class="meta">' + esc(im.bairro) + ' · ' + esc(im.cidade) + '</span>' +
        '<h3>' + esc(im.titulo) + '</h3>' +
        '<p>' + esc(im.resumo) + '</p>' +
        '<ul class="detalhes">' + (im.detalhes || []).map(function (d) { return '<li>' + esc(d) + '</li>'; }).join('') + '</ul>' +
        '<p class="meta">Valor: ' + esc(im.valor) + '</p>' +
        '<div class="rodape-cartao" style="display:flex;gap:10px;flex-wrap:wrap;align-items:center">' + botao +
          (ehAdmin ? '<button class="botao botao-contorno" type="button" data-docs="' + i + '">Documentos</button>' : '') + '</div>' +
      '</div></article>';
  }

  // ---------- Galeria ----------
  var dlg = document.createElement('dialog');
  dlg.className = 'galeria';
  dlg.innerHTML = '<div class="topo-galeria"><h2 id="galeria-titulo"></h2><button class="fechar" type="button">Fechar</button></div>' +
    '<div class="palco"><button class="seta ant" type="button" aria-label="Anterior">‹</button><div id="galeria-item"></div><button class="seta prox" type="button" aria-label="Próxima">›</button></div>' +
    '<p class="legenda-galeria" id="galeria-legenda"></p><div class="miniaturas" id="galeria-miniaturas"></div>';
  document.body.appendChild(dlg);
  var galeria = { itens: [], atual: 0 };

  function mostrar(n) {
    var itens = galeria.itens;
    galeria.atual = (n + itens.length) % itens.length;
    var m = itens[galeria.atual];
    $('galeria-item').innerHTML = m.tipo === 'video'
      ? '<video src="' + esc(links[m.arquivo]) + '" controls playsinline preload="metadata"></video>'
      : '<img src="' + esc(links[m.arquivo]) + '" alt="' + esc(m.legenda || '') + '">';
    $('galeria-legenda').textContent = (m.legenda || '') + ' (' + (galeria.atual + 1) + ' de ' + itens.length + ')';
    Array.prototype.forEach.call($('galeria-miniaturas').children, function (b, k) { b.setAttribute('aria-current', k === galeria.atual ? 'true' : 'false'); });
    var ativa = $('galeria-miniaturas').children[galeria.atual];
    if (ativa && ativa.scrollIntoView) ativa.scrollIntoView({ block: 'nearest', inline: 'center' });
  }

  function abrirGaleria(im) {
    galeria.itens = midiaDisponivel(im);
    $('galeria-titulo').textContent = im.titulo;
    $('galeria-miniaturas').innerHTML = galeria.itens.map(function (m, k) {
      return '<button type="button" data-k="' + k + '" aria-label="' + esc(m.legenda || 'Item ' + (k + 1)) + '">' +
        (m.tipo === 'video' ? '▶ Vídeo' : '<img src="' + esc(links[m.thumb] || links[m.arquivo]) + '" alt="">') + '</button>';
    }).join('');
    dlg.showModal();
    mostrar(0);
  }

  dlg.addEventListener('click', function (e) {
    if (e.target === dlg || e.target.closest('.fechar')) { dlg.close(); return; }
    if (e.target.closest('.ant')) mostrar(galeria.atual - 1);
    if (e.target.closest('.prox')) mostrar(galeria.atual + 1);
    var mini = e.target.closest('[data-k]');
    if (mini) mostrar(+mini.getAttribute('data-k'));
  });
  dlg.addEventListener('keydown', function (e) {
    if (e.key === 'ArrowLeft') mostrar(galeria.atual - 1);
    if (e.key === 'ArrowRight') mostrar(galeria.atual + 1);
  });
  dlg.addEventListener('close', function () { $('galeria-item').innerHTML = ''; });

  // ---------- Documentos (só admin; links gerados na hora, valem 5 min) ----------
  var dlgDocs = document.createElement('dialog');
  dlgDocs.className = 'galeria documentos';
  dlgDocs.innerHTML = '<div class="topo-galeria"><h2 id="docs-titulo"></h2><button class="fechar" type="button">Fechar</button></div><div id="docs-lista" style="padding:8px 16px 20px"></div>';
  document.body.appendChild(dlgDocs);
  dlgDocs.addEventListener('click', async function (e) {
    if (e.target === dlgDocs || e.target.closest('.fechar')) { dlgDocs.close(); return; }
    var b = e.target.closest('[data-arquivo]');
    if (!b) return;
    var r = await sb.storage.from(BUCKET).createSignedUrl(b.getAttribute('data-arquivo'), 300);
    if (r.error || !r.data) { b.textContent = 'Arquivo não encontrado'; return; }
    window.open(r.data.signedUrl, '_blank', 'noopener');
  });
  function abrirDocs(im) {
    var docs = im.documentos || [];
    $('docs-titulo').textContent = 'Documentos – ' + im.titulo;
    $('docs-lista').innerHTML = docs.length
      ? '<ul style="list-style:none;padding:0;margin:0;display:grid;gap:8px">' + docs.map(function (d) {
          return '<li><button class="botao botao-claro" type="button" data-arquivo="' + esc(d.arquivo) + '">📄 ' + esc(d.nome || d.arquivo.split('/').pop()) + '</button></li>';
        }).join('') + '</ul>'
      : '<p style="color:#c9d1db">Nenhum documento cadastrado para este imóvel ainda.</p>';
    dlgDocs.showModal();
  }

  $('area-imoveis').addEventListener('click', function (e) {
    var d = e.target.closest('[data-docs]');
    if (d) { abrirDocs(imoveis[+d.getAttribute('data-docs')]); return; }
    var b = e.target.closest('[data-galeria]');
    if (b) abrirGaleria(imoveis[+b.getAttribute('data-galeria')]);
  });

  async function abrirPainel() {
    var acesso = await sb.rpc('c1972_meu_acesso');
    if (acesso.error || !acesso.data || !acesso.data.length) {
      await sb.auth.signOut();
      aviso('Este celular não tem acesso à área do cliente da 1972corp.', true);
      return;
    }
    var lista = await sb.rpc('c1972_listar_imoveis');
    if (lista.error) { aviso('Não foi possível carregar os imóveis: ' + lista.error.message, true); return; }
    imoveis = lista.data || [];
    await assinar(imoveis);
    ehAdmin = acesso.data[0].papel === 'admin';
    $('area-nome').textContent = acesso.data[0].nome;
    $('area-imoveis').innerHTML = imoveis.length ? imoveis.map(cartao).join('') : '<p>Nenhum imóvel disponível no momento.</p>';
    login.classList.add('oculto');
    painel.classList.remove('oculto');
    aviso('');
  }

  formCel.addEventListener('submit', async function (e) {
    e.preventDefault();
    celular = normalizar(formCel.celular.value);
    if (!celular) { aviso('Informe o celular com DDD.', true); return; }
    aviso('Enviando código…');
    var r = await sb.auth.signInWithOtp({ phone: '+' + celular, options: { shouldCreateUser: false } });
    if (r.error) { aviso('Não foi possível enviar o código. Confira se o celular está cadastrado.', true); return; }
    formCel.classList.add('oculto');
    formCod.classList.remove('oculto');
    formCod.codigo.focus();
    aviso('Código enviado por SMS. Ele vale por 5 minutos.');
  });

  formCod.addEventListener('submit', async function (e) {
    e.preventDefault();
    aviso('Conferindo código…');
    var r = await sb.auth.verifyOtp({ phone: '+' + celular, token: formCod.codigo.value.trim(), type: 'sms' });
    if (r.error) { aviso('Código inválido ou vencido. Tente de novo.', true); return; }
    abrirPainel();
  });

  $('trocar-celular').addEventListener('click', function () {
    formCod.classList.add('oculto'); formCel.classList.remove('oculto'); formCod.reset(); aviso('');
  });

  $('sair').addEventListener('click', async function () {
    await sb.auth.signOut();
    painel.classList.add('oculto'); login.classList.remove('oculto');
    formCod.classList.add('oculto'); formCel.classList.remove('oculto'); formCel.reset(); formCod.reset();
    aviso('Você saiu da área do cliente.');
  });

  sb.auth.getSession().then(function (r) { if (r.data && r.data.session) abrirPainel(); });
})();
