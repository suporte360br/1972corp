// Menu móvel
(function () {
  var botao = document.querySelector('.botao-menu');
  var menu = document.getElementById('menu');
  if (botao && menu) {
    botao.addEventListener('click', function () {
      var aberto = menu.classList.toggle('aberto');
      botao.setAttribute('aria-expanded', aberto ? 'true' : 'false');
    });
  }
})();

// Filtro de temas do blog
(function () {
  var filtros = document.querySelectorAll('.filtros button');
  if (!filtros.length) return;
  var cartoes = document.querySelectorAll('[data-tema]');
  filtros.forEach(function (b) {
    b.addEventListener('click', function () {
      var tema = b.getAttribute('data-filtro');
      filtros.forEach(function (x) { x.setAttribute('aria-pressed', x === b ? 'true' : 'false'); });
      cartoes.forEach(function (c) {
        c.classList.toggle('oculto', tema !== 'todos' && c.getAttribute('data-tema') !== tema);
      });
    });
  });
})();

// Formulário de contato: monta um e-mail com os dados preenchidos
(function () {
  var form = document.getElementById('form-contato');
  if (!form) return;
  form.addEventListener('submit', function (e) {
    e.preventDefault();
    var d = new FormData(form);
    var assunto = (d.get('assunto') || 'Contato pelo site') + ' — ' + (d.get('nome') || '');
    var corpo = 'Nome: ' + d.get('nome') + '\n' +
      'E-mail: ' + d.get('email') + '\n' +
      (d.get('telefone') ? 'Telefone: ' + d.get('telefone') + '\n' : '') +
      'Assunto: ' + d.get('assunto') + '\n\n' + d.get('mensagem');
    window.location.href = 'mailto:contato@1972corp.com.br?subject=' +
      encodeURIComponent(assunto) + '&body=' + encodeURIComponent(corpo);
  });
  // Pré-seleciona o assunto vindo de um link (?assunto=...)
  var p = new URLSearchParams(location.search).get('assunto');
  if (p) {
    var sel = form.querySelector('[name=assunto]');
    var msg = form.querySelector('[name=mensagem]');
    if (sel) {
      var ok = Array.prototype.some.call(sel.options, function (o) { return o.value === p; });
      if (ok) sel.value = p;
    }
    var imovel = new URLSearchParams(location.search).get('imovel');
    if (imovel && msg && !msg.value) msg.value = 'Olá! Tenho interesse no imóvel "' + imovel + '". Gostaria de saber condições e disponibilidade para visita.';
  }
})();

// Ano no rodapé
(function () {
  var el = document.getElementById('ano');
  if (el) el.textContent = new Date().getFullYear();
})();
