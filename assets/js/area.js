// Área restrita do 1972corp: login por código SMS (Supabase do AXIA) e painel de empresas e marcas.
// A chave publishable é pública por natureza; quem protege os dados são as funções c1972_* do banco,
// que só respondem para celulares cadastrados em c1972_acessos (ver Projetos IA/1972corp-backend/area-empresas.sql).
(function () {
  var SUPABASE_URL = 'https://sodztpnfelmntvnbmzff.supabase.co';
  var SUPABASE_KEY = 'sb_publishable_jADhJfITu4l9-GvFv-csLA_1ik6DE16';
  var BUCKET = 'c1972-empresas';

  var $ = function (id) { return document.getElementById(id); };
  var formCel = $('form-celular'), formCod = $('form-codigo'), msg = $('area-msg');
  var login = $('area-login'), painel = $('area-painel');
  var celular = '';

  if (!window.supabase) { msg.textContent = 'Não foi possível carregar o login. Recarregue a página.'; return; }
  var sb = window.supabase.createClient(SUPABASE_URL, SUPABASE_KEY, { auth: { persistSession: true, storageKey: 'c1972-auth' } });

  function aviso(t, erro) { msg.textContent = t || ''; msg.style.color = erro ? '#b42318' : ''; }
  function esc(s) { return String(s == null ? '' : s).replace(/[&<>"]/g, function (c) { return { '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;' }[c]; }); }
  function dataBR(d) { return /^\d{4}-\d{2}-\d{2}$/.test(d || '') ? d.split('-').reverse().join('/') : (d || ''); }
  function normalizar(v) {
    var n = String(v || '').replace(/\D/g, '');
    if (n.length === 10 || n.length === 11) n = '55' + n;
    return /^55\d{10,11}$/.test(n) ? n : null;
  }

  var empresas = [];
  var ROTULO = { ok: 'Em dia', atencao: 'Atenção', pendente: 'Pendente' };

  function linha(rotulo, valor) {
    return valor ? '<tr><th scope="row">' + esc(rotulo) + '</th><td>' + valor + '</td></tr>' : '';
  }

  function cartao(e, i) {
    var site = e.site ? '<a href="' + esc(e.site) + '" target="_blank" rel="noopener">' + esc(e.site.replace(/^https?:\/\//, '')) + '</a>' : '';
    var email = e.email ? '<a href="mailto:' + esc(e.email) + '">' + esc(e.email) + '</a>' : '';
    var dados = '<table class="ficha">' +
      linha('Atividade', esc(e.atividade)) + linha('Situação', esc(e.situacao)) +
      linha('CNPJ', esc(e.cnpj || 'Não cadastrado')) + linha('Site', site) + linha('E-mail', email) + '</table>';

    var marcas = (e.inpi || []).map(function (m) {
      return '<div class="marca-inpi"><h4>' + esc(m.apresentacao || e.marca || 'Marca') + '</h4><table class="ficha">' +
        linha('Processo INPI', esc(m.processo)) + linha('Classe', esc(m.classe)) + linha('Especificação', esc(m.especificacao)) +
        linha('Depósito', esc(dataBR(m.deposito))) + linha('Situação', esc(m.situacao)) + linha('Próximo prazo', esc(m.proximo_prazo)) +
        '</table></div>';
    }).join('') || '<p class="sem-fotos">Nenhuma marca cadastrada.</p>';

    var ind = (e.indicadores || []).map(function (x) {
      var st = x.status || 'pendente';
      return '<li><span class="status status-' + esc(st) + '">' + esc(ROTULO[st] || st) + '</span> <strong>' + esc(x.nome) + ':</strong> ' + esc(x.valor) + '</li>';
    }).join('');

    var docs = (e.documentos || []).length
      ? '<button class="botao botao-contorno" type="button" data-docs="' + i + '">Documentos (' + e.documentos.length + ')</button>' : '';

    return '<article class="cartao empresa">' +
      '<div class="corpo">' +
        '<span class="meta">' + esc(e.marca || '') + '</span>' +
        '<h3>' + esc(e.nome) + '</h3>' +
        '<h4>Dados cadastrais</h4>' + dados +
        '<h4>Marca no INPI</h4>' + marcas +
        (ind ? '<h4>Indicadores</h4><ul class="indicadores">' + ind + '</ul>' : '') +
        (e.observacoes ? '<p class="meta">' + esc(e.observacoes) + '</p>' : '') +
        '<div class="rodape-cartao">' + docs + '</div>' +
      '</div></article>';
  }

  // ---------- Documentos (só admin; link temporário de 5 minutos) ----------
  var dlg = document.createElement('dialog');
  dlg.className = 'galeria documentos';
  dlg.innerHTML = '<div class="topo-galeria"><h2 id="docs-titulo"></h2><button class="fechar" type="button">Fechar</button></div><div id="docs-lista" style="padding:8px 16px 20px"></div>';
  document.body.appendChild(dlg);
  dlg.addEventListener('click', async function (ev) {
    if (ev.target === dlg || ev.target.closest('.fechar')) { dlg.close(); return; }
    var b = ev.target.closest('[data-arquivo]');
    if (!b) return;
    var r = await sb.storage.from(BUCKET).createSignedUrl(b.getAttribute('data-arquivo'), 300);
    if (r.error || !r.data) { b.textContent = 'Arquivo não encontrado'; return; }
    window.open(r.data.signedUrl, '_blank', 'noopener');
  });
  function abrirDocs(e) {
    $('docs-titulo').textContent = 'Documentos – ' + e.nome;
    $('docs-lista').innerHTML = '<ul style="list-style:none;padding:0;margin:0;display:grid;gap:8px">' + e.documentos.map(function (d) {
      return '<li><button class="botao botao-claro" type="button" data-arquivo="' + esc(d.arquivo) + '">📄 ' + esc(d.nome || d.arquivo.split('/').pop()) + '</button></li>';
    }).join('') + '</ul>';
    dlg.showModal();
  }
  $('area-empresas').addEventListener('click', function (ev) {
    var d = ev.target.closest('[data-docs]');
    if (d) abrirDocs(empresas[+d.getAttribute('data-docs')]);
  });

  async function abrirPainel() {
    var acesso = await sb.rpc('c1972_meu_acesso');
    if (acesso.error || !acesso.data || !acesso.data.length) {
      await sb.auth.signOut();
      aviso('Este celular não tem acesso à área restrita da 1972corp.', true);
      return;
    }
    var lista = await sb.rpc('c1972_listar_empresas');
    if (lista.error) { aviso('Não foi possível carregar as empresas: ' + lista.error.message, true); return; }
    empresas = lista.data || [];
    $('area-nome').textContent = acesso.data[0].nome;
    $('area-empresas').innerHTML = empresas.length ? empresas.map(cartao).join('') : '<p>Nenhuma empresa cadastrada ainda.</p>';
    login.classList.add('oculto');
    painel.classList.remove('oculto');
    aviso('');
  }

  formCel.addEventListener('submit', async function (ev) {
    ev.preventDefault();
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

  formCod.addEventListener('submit', async function (ev) {
    ev.preventDefault();
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
    aviso('Você saiu da área restrita.');
  });

  sb.auth.getSession().then(function (r) { if (r.data && r.data.session) abrirPainel(); });
})();
