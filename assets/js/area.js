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

  function cartao(im) {
    var assunto = encodeURIComponent(im.titulo + ' – ' + im.cidade);
    return '<article class="cartao imovel">' +
      '<div class="midia"><span class="selo">' + esc(im.tipo) + '</span><div class="placa" aria-hidden="true"><div><small>' + esc(im.cidade) + '</small><strong>' + esc(im.bairro) + '</strong></div></div></div>' +
      '<div class="corpo">' +
        '<span class="meta">' + esc(im.bairro) + ' · ' + esc(im.cidade) + '</span>' +
        '<h3>' + esc(im.titulo) + '</h3>' +
        '<p>' + esc(im.resumo) + '</p>' +
        '<ul class="detalhes">' + (im.detalhes || []).map(function (d) { return '<li>' + esc(d) + '</li>'; }).join('') + '</ul>' +
        '<p class="meta">Finalidade: ' + esc(im.finalidade) + ' · Valor: ' + esc(im.valor) + '</p>' +
        '<div class="rodape-cartao"><a class="botao botao-primario" href="/contato/?assunto=Imóveis&imovel=' + assunto + '">Consultar condições</a></div>' +
      '</div></article>';
  }

  async function abrirPainel() {
    var acesso = await sb.rpc('c1972_meu_acesso');
    if (acesso.error || !acesso.data || !acesso.data.length) {
      await sb.auth.signOut();
      aviso('Este celular não tem acesso à área do cliente da 1972corp.', true);
      return;
    }
    var lista = await sb.rpc('c1972_listar_imoveis');
    if (lista.error) { aviso('Não foi possível carregar os imóveis: ' + lista.error.message, true); return; }
    $('area-nome').textContent = acesso.data[0].nome;
    $('area-imoveis').innerHTML = lista.data.length ? lista.data.map(cartao).join('') : '<p>Nenhum imóvel disponível no momento.</p>';
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
