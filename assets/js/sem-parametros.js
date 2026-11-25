// Endereços com parâmetros (ex.: ?u=... criados pela invasão do site antigo da UOL) não são indexados;
// na página inicial, redireciona para o endereço limpo. Carregado no <head>, antes do resto da página.
if (location.search) {
  var r = document.querySelector('meta[name=robots]');
  if (r) r.content = 'noindex, follow';
  if (location.pathname === '/') location.replace('/');
}
