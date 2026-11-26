// Conteúdo do site 1972corp (holding empresarial): matérias do blog.
// Depois de editar, rode: node gerador/imagens.js <sharp> (capas) e node gerador/gerar.js
// Matérias de locação removidas em 11/11/2026 (redirecionam para /blog/): garantias-de-aluguel, vistoria-de-imovel-alugado, reajuste-de-aluguel, como-alugar-galpao, renovacao-de-aluguel-comercial.
exports.removidas = ["garantias-de-aluguel","vistoria-de-imovel-alugado","reajuste-de-aluguel","como-alugar-galpao","renovacao-de-aluguel-comercial"];

exports.materias = [
  {
    slug: "holding-imobiliaria",
    titulo: "Holding imobiliária: como funciona e como é tributada",
    tituloCurto: "Holding imobiliária",
    descricao: "O que é holding imobiliária, diferença para a holding patrimonial, tributação de aluguéis e vendas, ITBI e o que muda com o IBS e a CBS.",
    tema: "Holding",
    data: "2026-11-26",
    fontes: [{"nome":"Código Tributário Nacional, art. 37 (ITBI na integralização)","url":"https://www.planalto.gov.br/ccivil_03/leis/l5172compilado.htm"},{"nome":"Lei Complementar 214/2025 (IBS e CBS), arts. 260 e 261","url":"https://www.planalto.gov.br/ccivil_03/leis/lcp/lcp214.htm"}],
    corpo: `
<p>A <strong>holding imobiliária</strong> é uma empresa cuja atividade principal é <strong>comprar, vender, alugar ou administrar imóveis próprios</strong>. Ela é muito usada por quem tem vários imóveis e quer tratá-los como um negócio, com contabilidade, contratos e decisões centralizadas.</p>

<h2>Holding imobiliária ou patrimonial?</h2>
<p>Na prática, os nomes se misturam. A diferença está no foco:</p>
<ul>
<li><strong>Patrimonial:</strong> concentra bens da família ou do empresário para organizar e planejar a sucessão. A renda costuma vir de aluguéis (veja <a href="/blog/holding-patrimonial-imoveis/">holding patrimonial</a>).</li>
<li><strong>Imobiliária:</strong> tem a exploração de imóveis como negócio, com compra para revenda, locação em escala ou desenvolvimento de projetos.</li>
</ul>
<p>Para o fisco, o que importa é a atividade real e de onde vem a receita, e não o nome usado.</p>

<h2>Tributação da renda</h2>
<p>No lucro presumido, a base de cálculo do IRPJ e da CSLL é um percentual da receita, que varia conforme a atividade: na locação a presunção costuma ser bem maior que na venda de imóveis. Por isso, a mesma holding pode pagar cargas efetivas muito diferentes sobre aluguel e sobre venda. A comparação com a pessoa física e com o lucro real deve ser simulada pelo contador.</p>

<h2>IBS e CBS: o que muda com a reforma</h2>
<p>A Lei Complementar 214/2025 reduz as alíquotas de IBS e CBS em <strong>50%</strong> nas operações com bens imóveis e em <strong>70%</strong> na locação, na cessão onerosa e no arrendamento (art. 261). Na locação residencial existe ainda um <strong>redutor social</strong> por imóvel, abatido da base de cálculo a cada mês (art. 260). A transição para os novos tributos acontece ao longo dos próximos anos.</p>

<h2>ITBI na hora de colocar os imóveis na holding</h2>
<p>A imunidade do ITBI na integralização de capital <strong>não vale</strong> quando a atividade preponderante da empresa é compra, venda ou locação de imóveis. O Código Tributário Nacional considera preponderante a atividade que gera mais de 50% da receita operacional (art. 37). Numa holding imobiliária, isso quase sempre acontece: o ITBI deve entrar no custo do projeto.</p>

<h2>Quando faz sentido</h2>
<ul>
<li>Vários imóveis com receita de aluguel relevante.</li>
<li>Planos de comprar e vender imóveis com frequência.</li>
<li>Vontade de separar o patrimônio imobiliário dos demais negócios do grupo, como uma controlada da <a href="/holding-empresarial/">holding empresarial</a>.</li>
</ul>
<div class="aviso">Conteúdo informativo. Estrutura societária e tributária deve ser definida com contador e advogado, com base nas regras em vigor.</div>`
  },
  {
    slug: "holding-e-incorporacao-imobiliaria",
    titulo: "Holding e incorporação imobiliária: SPE, patrimônio de afetação e RET",
    tituloSEO: "Holding e incorporação imobiliária: SPE e RET",
    tituloCurto: "Holding e incorporação imobiliária",
    descricao: "Como grupos estruturam incorporações com holding e SPE, o que é patrimônio de afetação e como funciona o RET de 4% sobre a receita.",
    tema: "Holding",
    data: "2026-11-26",
    fontes: [{"nome":"Lei 10.931/2004 (patrimônio de afetação e RET)","url":"https://www.planalto.gov.br/ccivil_03/_ato2004-2006/2004/lei/l10.931.htm"},{"nome":"Lei Complementar 214/2025 (IBS e CBS), arts. 260 e 261","url":"https://www.planalto.gov.br/ccivil_03/leis/lcp/lcp214.htm"}],
    corpo: `
<p>Quem incorpora imóveis, ou seja, constrói e vende unidades na planta, costuma organizar o negócio em camadas: uma <strong>holding</strong> no topo e uma empresa separada para cada empreendimento, a chamada <strong>SPE</strong> (sociedade de propósito específico).</p>

<h2>Por que uma SPE por empreendimento</h2>
<ul>
<li><strong>Riscos isolados:</strong> problemas de uma obra não contaminam as demais.</li>
<li><strong>Sócios por projeto:</strong> é possível ter um investidor ou o dono do terreno como sócio só daquele empreendimento.</li>
<li><strong>Controle financeiro:</strong> cada obra tem caixa, contabilidade e prestação de contas próprios.</li>
</ul>
<p>A holding é sócia das SPEs, recebe os resultados e decide onde reinvestir (veja <a href="/blog/o-que-e-holding-empresarial/">o que é holding empresarial</a>).</p>

<h2>Patrimônio de afetação</h2>
<p>A lei permite separar o terreno, a obra e os recursos de cada incorporação do restante do patrimônio da incorporadora: é o <strong>patrimônio de afetação</strong>. Os bens afetados respondem só pelas obrigações daquele empreendimento, o que dá mais segurança aos compradores e aos financiadores.</p>

<h2>RET: tributação unificada de 4%</h2>
<p>A incorporação submetida ao patrimônio de afetação pode optar pelo <strong>Regime Especial de Tributação (RET)</strong>: um pagamento mensal unificado de <strong>4% da receita recebida</strong>, que cobre IRPJ, CSLL, PIS e Cofins (Lei 10.931/2004, art. 4º). Para muitas incorporações, a carga é menor e o cálculo é bem mais simples.</p>
<p>Com a reforma tributária, PIS e Cofins dão lugar à CBS, e a Lei Complementar 214/2025 tem regras próprias para a incorporação imobiliária, como a cobrança de IBS e CBS a cada pagamento das unidades vendidas. Quem vai lançar empreendimentos nos próximos anos precisa simular os dois cenários.</p>

<h2>Cuidados</h2>
<ol>
<li>Definir no contrato da SPE as regras de aporte, distribuição de resultado e saída dos sócios.</li>
<li>Formalizar o patrimônio de afetação no cartório de registro de imóveis antes de optar pelo RET.</li>
<li>Manter contabilidade separada por empreendimento.</li>
</ol>
<div class="aviso">Conteúdo informativo. Estrutura societária e tributária deve ser definida com contador e advogado, com base nas regras em vigor.</div>`
  },
  {
    slug: "holding-imoveis-e-criptoativos",
    titulo: "Holding para imóveis e criptoativos: vale a pena?",
    tituloCurto: "Holding para imóveis e criptoativos",
    descricao: "Pode colocar criptoativos e imóveis na mesma holding? Veja como fica a tributação na pessoa física e na empresa, a guarda dos ativos e os cuidados.",
    tema: "Holding",
    data: "2026-11-26",
    fontes: [{"nome":"Lei 14.478/2022 (marco legal dos ativos virtuais)","url":"https://www.planalto.gov.br/ccivil_03/_ato2019-2022/2022/lei/l14478.htm"},{"nome":"Lei 14.754/2023 (aplicações no exterior, inclusive ativos virtuais)","url":"https://www.planalto.gov.br/ccivil_03/_ato2023-2026/2023/lei/l14754.htm"}],
    corpo: `
<p>Cada vez mais empresários têm parte do patrimônio em <strong>criptoativos</strong> e se perguntam se vale colocá-los numa holding, junto com os imóveis. É possível, mas a decisão envolve tributação, guarda dos ativos e governança.</p>

<h2>Na pessoa física</h2>
<ul>
<li><strong>Criptoativos em corretoras brasileiras ou carteira própria:</strong> o ganho na venda é tributado como ganho de capital. Vendas de pequeno valor no mês podem ser isentas, conforme as regras da Receita Federal.</li>
<li><strong>Criptoativos no exterior:</strong> desde 2024, os ganhos com aplicações no exterior, <strong>inclusive ativos virtuais</strong>, são declarados à parte na declaração anual e tributados a <strong>15%</strong> (Lei 14.754/2023).</li>
</ul>

<h2>Na holding</h2>
<ul>
<li>Os criptoativos passam a ser ativos da empresa, registrados na contabilidade pelo custo de aquisição.</li>
<li>Os ganhos entram no resultado da empresa e são tributados pelo regime escolhido (lucro presumido ou real).</li>
<li>A distribuição do lucro aos sócios segue a regra nova de dividendos: retenção de 10% acima de R$ 50 mil por mês, por pessoa física (veja <a href="/blog/lucros-e-dividendos-na-holding/">dividendos na holding</a>).</li>
</ul>

<h2>Guarda e governança</h2>
<p>Numa empresa, ninguém deve depender de uma única pessoa com a chave da carteira:</p>
<ol>
<li>Usar custódia profissional ou carteiras com múltiplas assinaturas.</li>
<li>Registrar em ata quem pode movimentar e com quais limites.</li>
<li>Guardar as chaves de recuperação de forma segura, com um plano para caso o responsável falte.</li>
<li>Escolher prestadores que sigam o marco legal dos ativos virtuais (Lei 14.478/2022).</li>
</ol>

<h2>Imóveis e cripto na mesma estrutura?</h2>
<p>Os riscos são muito diferentes: imóveis são estáveis e geram aluguel, criptoativos são voláteis. Muitos grupos preferem uma <a href="/holding-empresarial/">holding empresarial</a> no topo com empresas separadas para cada classe de ativo, como uma <a href="/blog/holding-imobiliaria/">holding imobiliária</a> e outra para investimentos. Isso facilita a gestão, a prestação de contas e uma eventual entrada de sócios.</p>
<div class="aviso">Conteúdo informativo. Estrutura societária e tributária deve ser definida com contador e advogado, com base nas regras em vigor.</div>`
  },
  {
    slug: "o-que-e-holding-empresarial",
    titulo: "Holding empresarial: o que é e quando faz sentido",
    tituloCurto: "O que é holding empresarial",
    descricao: "Entenda o que é uma holding empresarial, como ela controla as empresas do grupo, quais as vantagens reais e quando a estrutura não compensa.",
    tema: "Holding",
    data: "2026-11-11",
    fontes: [{"nome":"Lei 6.404/1976 (Lei das S.A.), art. 2º, § 3º","url":"https://www.planalto.gov.br/ccivil_03/leis/l6404consol.htm"},{"nome":"Código Civil (Lei 10.406/2002)","url":"https://www.planalto.gov.br/ccivil_03/leis/2002/l10406compilada.htm"}],
    corpo: `
<p>Quando um empresário passa a ter mais de um negócio, marcas próprias e imóveis, cada ativo costuma ficar em um lugar diferente: um CNPJ aqui, uma participação ali, bens no nome da pessoa física. A <strong>holding empresarial</strong> organiza esse conjunto: uma empresa no topo que detém as participações nas demais e concentra as decisões estratégicas.</p>

<h2>Como funciona</h2>
<p>A holding é sócia das empresas operacionais (as "controladas"). Quem decide os rumos do grupo, aprova investimentos e recebe os lucros das controladas é a holding, e os sócios da holding decidem num só lugar. A lei permite expressamente que uma sociedade tenha por objeto participar de outras sociedades (<a href="https://www.planalto.gov.br/ccivil_03/leis/l6404consol.htm" rel="noopener">Lei 6.404/1976, art. 2º, § 3º</a>), e o Código Civil trata das sociedades controladas e coligadas (arts. 1.097 a 1.101).</p>

<h2>Vantagens reais</h2>
<ul>
<li><strong>Controle centralizado:</strong> um só centro de decisão para todas as empresas, com regras de governança únicas.</li>
<li><strong>Alocação de capital:</strong> o lucro de uma empresa pode ser reinvestido em outra pela holding, sem passar antes pela pessoa física.</li>
<li><strong>Separação de riscos:</strong> cada negócio continua em seu CNPJ; um problema numa controlada não contamina automaticamente as outras.</li>
<li><strong>Marcas e ativos organizados:</strong> marcas, domínios e imóveis podem ficar na holding e ser licenciados ou alugados às empresas do grupo, com contratos formais.</li>
<li><strong>Entrada de sócios e investidores:</strong> é possível trazer um sócio para um negócio específico sem abrir o restante do grupo.</li>
</ul>

<h2>Quando não compensa</h2>
<ul>
<li>Há uma única empresa pequena, sem perspectiva de outros negócios ou ativos.</li>
<li>O custo de mais uma contabilidade e de obrigações acessórias supera o benefício de gestão.</li>
<li>O objetivo é apenas fugir de dívidas existentes: a estrutura pode ser desconsiderada pela Justiça em caso de confusão patrimonial ou desvio de finalidade (Código Civil, art. 50).</li>
</ul>

<h2>Primeiros passos</h2>
<ol>
<li>Mapear empresas, participações, marcas, imóveis, contratos e dívidas.</li>
<li>Definir o tipo de holding (<a href="/blog/holding-pura-mista-patrimonial/">pura, mista ou patrimonial</a>) e o regime tributário.</li>
<li>Redigir contrato social e acordo de sócios com regras de governança.</li>
<li>Transferir as participações e ativos, com a avaliação e os registros necessários.</li>
</ol>
<div class="aviso">Conteúdo informativo. Estrutura societária e tributária deve ser definida com contador e advogado, com base nas regras em vigor.</div>`
  },
  {
    slug: "holding-pura-mista-patrimonial",
    tituloSEO: "Holding pura, mista ou patrimonial: qual escolher",
    titulo: "Holding pura, mista ou patrimonial: qual estrutura escolher",
    tituloCurto: "Holding pura, mista ou patrimonial",
    descricao: "Compare holding pura, holding mista e holding patrimonial: o que cada uma faz, como é tributada e qual combina com o seu grupo de empresas.",
    tema: "Holding",
    data: "2026-11-11",
    fontes: [{"nome":"Lei 6.404/1976 (Lei das S.A.), art. 2º, § 3º","url":"https://www.planalto.gov.br/ccivil_03/leis/l6404consol.htm"},{"nome":"Código Civil (Lei 10.406/2002)","url":"https://www.planalto.gov.br/ccivil_03/leis/2002/l10406compilada.htm"}],
    corpo: `
<p>"Holding" é um nome genérico. Na prática, o tipo de holding depende do que ela faz além de deter participações, e isso muda o objeto social, a tributação e até o custo de transferir bens para ela.</p>

<div class="rolagem"><table class="tabela">
<thead><tr><th>Tipo</th><th>O que faz</th><th>Receitas típicas</th><th>Quando usar</th></tr></thead>
<tbody>
<tr><td><strong>Pura</strong></td><td>Só detém participações em outras empresas</td><td>Lucros e dividendos das controladas</td><td>Grupos com várias empresas operacionais e nenhuma atividade própria na holding</td></tr>
<tr><td><strong>Mista</strong></td><td>Detém participações e também exerce atividade própria (serviços de gestão, licenciamento de marcas, locação)</td><td>Dividendos + receitas operacionais</td><td>Quando a holding presta serviços às controladas ou explora ativos do grupo</td></tr>
<tr><td><strong>Patrimonial</strong></td><td>Concentra bens, principalmente imóveis</td><td>Aluguéis e ganhos na venda de bens</td><td>Organização do patrimônio imobiliário e sucessão (veja <a href="/blog/holding-patrimonial-imoveis/">holding patrimonial</a>)</td></tr>
</tbody></table></div>

<h2>Pontos de atenção</h2>
<ul>
<li><strong>Objeto social coerente:</strong> o contrato precisa descrever o que a holding realmente faz. Receitas que não batem com o objeto geram problemas fiscais.</li>
<li><strong>Tributação muda conforme a receita:</strong> dividendos recebidos de controladas e receitas operacionais (serviços, aluguéis, royalties) seguem regras diferentes. A <a href="/blog/lucros-e-dividendos-na-holding/">tributação de lucros e dividendos</a> também mudou a partir de 2026.</li>
<li><strong>ITBI na integralização de imóveis:</strong> se a atividade preponderante for compra, venda ou locação de imóveis, a imunidade costuma não se aplicar.</li>
<li><strong>Contratos entre empresas do grupo:</strong> serviços, licenças de marca e aluguéis entre holding e controladas precisam de contrato escrito e preço compatível com o de mercado.</li>
</ul>

<h2>Um formato muito comum</h2>
<p>Muitos grupos usam uma holding mista no topo, sócia das empresas operacionais e titular das marcas, combinada ou não com uma holding patrimonial separada para os imóveis. A separação deixa os riscos de cada atividade mais isolados.</p>
<div class="aviso">Conteúdo informativo. Estrutura societária e tributária deve ser definida com contador e advogado, com base nas regras em vigor.</div>`
  },
  {
    slug: "registro-de-marca-no-inpi",
    titulo: "Registro de marca no INPI: etapas, prazos e renovação",
    tituloCurto: "Registro de marca no INPI",
    descricao: "Como registrar uma marca no INPI: pesquisa, pedido, oposição, deferimento, pagamento do primeiro decênio, renovação a cada 10 anos e caducidade por falta de uso.",
    tema: "Marcas",
    data: "2026-11-11",
    fontes: [{"nome":"Lei 9.279/1996 (Lei da Propriedade Industrial)","url":"https://www.planalto.gov.br/ccivil_03/leis/l9279.htm"},{"nome":"INPI – Marcas (portal oficial)","url":"https://www.gov.br/inpi/pt-br/servicos/marcas"}],
    corpo: `
<p>A marca é um dos ativos mais valiosos de um grupo de empresas, e só o <strong>registro no INPI</strong> garante o uso exclusivo em todo o país. Numa holding, é comum que as marcas fiquem em nome dela e sejam licenciadas às empresas operacionais.</p>

<h2>Etapas do registro</h2>
<ol>
<li><strong>Pesquisa prévia:</strong> verificar na base do INPI se já existe marca igual ou parecida na mesma área.</li>
<li><strong>Escolha da classe:</strong> o pedido é feito por classe da Classificação de Nice (por exemplo, classe 35 para gestão de negócios e 36 para negócios imobiliários). Cada classe é um pedido e uma taxa.</li>
<li><strong>Pedido e taxa (GRU):</strong> pelo sistema e-Marcas, com o tipo de marca (nominativa, figurativa ou mista) e a imagem, quando houver.</li>
<li><strong>Publicação e oposição:</strong> o pedido é publicado na Revista da Propriedade Industrial, e terceiros têm <strong>60 dias</strong> para apresentar oposição (Lei 9.279/1996, art. 158).</li>
<li><strong>Exame e deferimento:</strong> o INPI analisa e decide.</li>
<li><strong>Pagamento do primeiro decênio:</strong> deferido o pedido, a taxa de concessão e do primeiro decênio deve ser paga em <strong>60 dias</strong>, ou em mais 30 dias com taxa adicional, sob pena de arquivamento (art. 162).</li>
</ol>

<h2>Vigência e renovação</h2>
<p>O registro vale por <strong>10 anos a partir da concessão</strong> e pode ser prorrogado por períodos iguais e sucessivos. O pedido de prorrogação é feito no <strong>último ano de vigência</strong>; se o prazo passar, ainda é possível prorrogar nos <strong>6 meses seguintes</strong>, pagando retribuição adicional (art. 133).</p>

<h2>Cuidado com a caducidade</h2>
<p>Depois de 5 anos da concessão, qualquer interessado pode pedir a caducidade do registro se a marca não estiver sendo usada ou se o uso ficar interrompido por mais de 5 anos (art. 143). Guarde provas de uso: notas fiscais, materiais, site.</p>

<h2>Organize o portfólio</h2>
<div class="rolagem"><table class="tabela">
<thead><tr><th>O que controlar</th><th>Por quê</th></tr></thead>
<tbody>
<tr><td>Número do processo e classe</td><td>Acompanhar despachos na Revista da Propriedade Industrial</td></tr>
<tr><td>Data de concessão</td><td>Calcular a janela de renovação</td></tr>
<tr><td>Titular (pessoa física ou holding)</td><td>Saber quem pode licenciar ou ceder a marca</td></tr>
<tr><td>Comprovantes de pagamento</td><td>Evitar arquivamento por falta de prova</td></tr>
<tr><td>Provas de uso</td><td>Defender a marca contra pedido de caducidade</td></tr>
</tbody></table></div>
<div class="aviso">Conteúdo informativo. Estrutura societária e tributária deve ser definida com contador e advogado, com base nas regras em vigor.</div>`
  },
  {
    slug: "lucros-e-dividendos-na-holding",
    titulo: "Lucros e dividendos na holding: o que muda com a Lei 15.270/2025",
    tituloSEO: "Dividendos na holding: o que muda em 2026",
    tituloCurto: "Dividendos na holding em 2026",
    descricao: "A partir de 2026, dividendos acima de R$ 50 mil por mês pagos a uma pessoa física têm retenção de 10%. Veja o efeito na holding e no grupo de empresas.",
    tema: "Tributação",
    data: "2026-11-11",
    fontes: [{"nome":"Lei 15.270/2025 (IR sobre lucros e dividendos)","url":"https://www.planalto.gov.br/ccivil_03/_ato2023-2026/2025/lei/l15270.htm"}],
    corpo: `
<p>Por muitos anos, lucros e dividendos distribuídos aos sócios ficaram isentos de Imposto de Renda. A <a href="https://www.planalto.gov.br/ccivil_03/_ato2023-2026/2025/lei/l15270.htm" rel="noopener">Lei 15.270/2025</a> mudou esse quadro a partir de janeiro de 2026, e isso afeta diretamente o planejamento de quem tem holding.</p>

<h2>A regra principal</h2>
<p>Quando uma <strong>mesma empresa</strong> paga a uma <strong>mesma pessoa física</strong> residente no Brasil mais de <strong>R$ 50 mil em lucros e dividendos no mesmo mês</strong>, há retenção na fonte de <strong>10% de Imposto de Renda sobre o valor total</strong>, sem deduções. Se houver vários pagamentos no mês, o cálculo considera a soma. A lei também criou uma tributação mínima anual para rendas muito altas, apurada na declaração.</p>

<h2>O que isso significa para a holding</h2>
<ul>
<li><strong>A regra mira a pessoa física:</strong> a retenção mensal vale para pagamentos a pessoas físicas. O fluxo entre controladas e a holding (empresa para empresa) não é o alvo dessa retenção.</li>
<li><strong>Reinvestir passa a valer mais:</strong> manter o lucro na holding para investir em outra empresa do grupo evita a retenção que ocorreria ao distribuir à pessoa física.</li>
<li><strong>Calendário de distribuição:</strong> como o limite é mensal e por empresa pagadora, a política de distribuição (valores e datas) precisa ser planejada com o contador.</li>
<li><strong>Pró-labore e dividendos:</strong> a combinação entre remuneração dos administradores e distribuição de lucros deve ser revista à luz das novas regras.</li>
</ul>

<h2>Checklist para a holding</h2>
<ol>
<li>Revisar com o contador a política de distribuição de lucros para 2026.</li>
<li>Registrar em ata as deliberações de distribuição.</li>
<li>Mapear quanto cada sócio recebe por mês de cada empresa do grupo.</li>
<li>Avaliar se o lucro deve ser distribuído ou reinvestido pela holding.</li>
</ol>
<div class="aviso">As regras de transição e os detalhes da tributação mínima anual dependem do caso concreto. Confirme com o contador antes de decidir.</div>`
  },
  {
    slug: "holding-patrimonial-imoveis",
    tituloSEO: "Holding patrimonial para imóveis: quando vale a pena",
    fontes: [{"nome":"Constituição Federal, art. 156, § 2º, I (ITBI)","url":"https://www.planalto.gov.br/ccivil_03/constituicao/constituicao.htm"},{"nome":"Emenda Constitucional 132/2023 (reforma tributária)","url":"https://www.planalto.gov.br/ccivil_03/constituicao/emendas/emc/emc132.htm"},{"nome":"STF, Tema 796 de repercussão geral (RE 796.376)"}],
    titulo: "Holding patrimonial: o que é e quando vale a pena para quem tem imóveis",
    descricao: "Entenda como funciona uma holding patrimonial, quais as vantagens para proprietários de imóveis, os custos envolvidos e os cuidados antes de abrir uma.",
    tema: "Patrimônio",
    data: "2026-10-20",
    revisado: "2026-11-01",
    imagem: "holding.jpg",
    imagemAlt: "Esquema de holding patrimonial reunindo casas, apartamento, lotes, fazenda, carro e quotas de empresa",
    corpo: `
<p>Quem acumula imóveis ao longo da vida logo esbarra em três preocupações: como organizar a gestão, quanto se paga de imposto sobre os aluguéis e como deixar tudo em ordem para a família. A <strong>holding patrimonial</strong> aparece com frequência como resposta. Ela pode ajudar muito, mas não serve para todo mundo.</p>

<nav class="sumario" aria-label="Nesta matéria"><strong>Nesta matéria</strong><ol>
<li><a href="#o-que-e">O que é uma holding patrimonial</a></li>
<li><a href="#vantagens">Principais vantagens</a></li>
<li><a href="#custos">Custos e pontos de atenção</a></li>
<li><a href="#quando">Quando costuma fazer sentido</a></li>
<li><a href="#passos">Passo a passo resumido</a></li>
</ol></nav>

<h2 id="o-que-e">O que é uma holding patrimonial</h2>
<p>É uma empresa criada para ser dona de bens, e não para vender produtos ou prestar serviços ao mercado. Os imóveis que estavam no nome da pessoa física passam a pertencer à empresa, e a família passa a ter <strong>quotas</strong> dessa empresa. Na prática, em vez de ter “três apartamentos e uma sala comercial”, a pessoa passa a ter “100% das quotas de uma empresa que tem três apartamentos e uma sala comercial”.</p>

<h2 id="vantagens">Principais vantagens</h2>
<h3>Sucessão mais simples</h3>
<p>Os pais podem doar as quotas aos filhos ainda em vida, normalmente com <strong>reserva de usufruto</strong>: continuam administrando e recebendo os aluguéis, enquanto a propriedade das quotas já fica definida. Isso reduz a chance de um inventário longo e de brigas sobre quem fica com qual imóvel. Cláusulas de incomunicabilidade, impenhorabilidade e inalienabilidade também podem ser previstas.</p>
<h3>Gestão profissional e centralizada</h3>
<p>Contratos, recebimentos, despesas e impostos ficam num só CNPJ, com contabilidade própria. Isso facilita enxergar a rentabilidade de cada imóvel e tomar decisões.</p>
<h3>Tributação dos aluguéis</h3>
<p>Na pessoa física, o aluguel entra na tabela progressiva do Imposto de Renda, que chega a 27,5%. Numa empresa do lucro presumido, a carga sobre receitas de locação costuma ser menor. A comparação depende do valor dos aluguéis e das regras em vigor. A reforma tributária (Emenda Constitucional 132/2023 e leis que a regulamentam) mudou a tributação sobre locação e venda de imóveis por empresas, então qualquer simulação precisa ser feita com as regras atuais.</p>

<h2 id="custos">Custos e pontos de atenção</h2>
<ul>
<li><strong>ITBI na transferência:</strong> a Constituição prevê imunidade do ITBI quando o imóvel é usado para integralizar capital, mas há exceções, como empresas cuja atividade principal é a compra, venda ou locação de imóveis. O STF também decidiu que a imunidade vale apenas até o valor do capital integralizado (Tema 796). Cada prefeitura tem sua prática.</li>
<li><strong>ITCMD na doação das quotas:</strong> a doação continua tributada pelo estado. Com a reforma tributária, as alíquotas do ITCMD passaram a ser obrigatoriamente progressivas, o que tende a aumentar o custo para patrimônios maiores.</li>
<li><strong>Custo fixo:</strong> contador, taxas, obrigações acessórias e eventuais certidões. Para poucos imóveis com aluguel baixo, esse custo pode anular a economia.</li>
<li><strong>Valor de transferência:</strong> integralizar pelo valor declarado no IR ou pelo valor de mercado traz efeitos diferentes no ganho de capital futuro.</li>
<li><strong>Planejamento abusivo:</strong> a holding não serve para esconder bens de credores. Usada com esse fim, pode ser desconsiderada pela Justiça.</li>
</ul>

<h2 id="quando">Quando costuma fazer sentido</h2>
<div class="rolagem"><table class="tabela">
<thead><tr><th>Tende a valer a pena</th><th>Tende a não compensar</th></tr></thead>
<tbody>
<tr><td>Vários imóveis alugados, com renda relevante</td><td>Um ou dois imóveis, com aluguel baixo</td></tr>
<tr><td>Desejo de planejar a sucessão ainda em vida</td><td>Imóveis que serão vendidos em pouco tempo</td></tr>
<tr><td>Família com vários herdeiros</td><td>Patrimônio com dívidas ou pendências de regularização</td></tr>
</tbody></table></div>

<h2 id="passos">Passo a passo resumido</h2>
<ol>
<li>Levantar todos os imóveis, matrículas, valores declarados e aluguéis.</li>
<li>Simular com contador e advogado: impostos atuais, custos de abertura e manutenção.</li>
<li>Definir o contrato social: objeto, administração, regras de entrada e saída de sócios.</li>
<li>Abrir a empresa e integralizar os imóveis (escritura e registro em cartório).</li>
<li>Planejar a doação das quotas, se esse for o objetivo.</li>
<li>Transferir os contratos de locação para o CNPJ e manter a contabilidade em dia.</li>
</ol>

<div class="aviso"><strong>Importante:</strong> este conteúdo é informativo e não substitui a orientação de um contador e de um advogado. As regras tributárias mudam e variam por município e estado.</div>
`
  }
];
