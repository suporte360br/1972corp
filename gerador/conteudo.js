// Conteúdo do site 1972corp: imóveis e matérias do blog.
// Depois de editar, rode: node gerador/gerar.js

exports.imoveis = [
  {
    slug: 'sala-comercial-parque-da-mooca',
    titulo: 'Sala comercial no Parque da Mooca',
    cidade: 'São Paulo – SP',
    bairro: 'Parque da Mooca',
    tipo: 'Comercial',
    resumo: 'Conjunto de 36 m² em andar alto, com duas salas, banheiros e copa, em localização privilegiada.',
    detalhes: [
      '36 m² de área',
      '2 salas, cada uma com banheiro',
      'Copa em uma das salas',
      'Andar alto',
      'Localização privilegiada no Parque da Mooca'
    ],
    imagem: 'parque-da-mooca.jpg',
    imagemAlt: 'Fachada do edifício comercial no Parque da Mooca, São Paulo',
    imagemLargura: 219,
    imagemAltura: 438
  },
  {
    slug: 'casa-terrea-terras-de-arieta-sorocaba',
    titulo: 'Casa térrea em Terras de Arieta',
    cidade: 'Sorocaba – SP',
    bairro: 'Terras de Arieta',
    tipo: 'Residencial',
    resumo: 'Casa térrea com cozinha e sala integradas, suíte, duas vagas de garagem e quintal nos fundos.',
    detalhes: [
      'Cozinha e sala em conceito aberto',
      '1 quarto e 1 suíte',
      'Banheiro social',
      '2 vagas de garagem',
      'Lavanderia e quintal nos fundos'
    ]
  },
  {
    slug: 'imovel-mooca-sao-paulo',
    titulo: 'Imóvel na Mooca',
    cidade: 'São Paulo – SP',
    bairro: 'Mooca',
    tipo: 'Sob consulta',
    resumo: 'Novo imóvel na Mooca. Fale com a gente para receber a descrição completa e as condições.',
    detalhes: [
      'Detalhes sob consulta',
      'Bairro tradicional, com fácil acesso ao centro'
    ]
  }
];

// Matérias do blog (mais recentes primeiro na listagem).
exports.materias = [
  {
    slug: 'holding-patrimonial-imoveis',
    titulo: 'Holding patrimonial: o que é e quando vale a pena para quem tem imóveis',
    descricao: 'Entenda como funciona uma holding patrimonial, quais as vantagens para proprietários de imóveis, os custos envolvidos e os cuidados antes de abrir uma.',
    tema: 'Patrimônio',
    data: '2026-10-20',
    imagem: 'holding.jpg',
    imagemAlt: 'Esquema de holding patrimonial reunindo casas, apartamento, lotes, fazenda, carro e quotas de empresa',
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
  },
  {
    slug: 'garantias-de-aluguel',
    titulo: 'Caução, fiador ou seguro-fiança: como escolher a garantia do aluguel',
    descricao: 'Conheça as quatro garantias locatícias permitidas pela Lei do Inquilinato, as vantagens de cada uma e por que o contrato só pode ter uma delas.',
    tema: 'Locação',
    data: '2026-10-19',
    corpo: `
<p>A garantia é o que protege o proprietário se o inquilino deixar de pagar o aluguel ou devolver o imóvel danificado. A Lei do Inquilinato (Lei 8.245/1991) lista no artigo 37 as modalidades possíveis. E determina que <strong>o contrato só pode ter uma delas</strong>: exigir fiador e caução ao mesmo tempo, por exemplo, é proibido.</p>

<h2>As quatro garantias previstas em lei</h2>
<div class="rolagem"><table class="tabela">
<thead><tr><th>Garantia</th><th>Como funciona</th><th>Ponto forte</th><th>Ponto fraco</th></tr></thead>
<tbody>
<tr><td><strong>Caução</strong></td><td>Depósito em dinheiro (até 3 meses de aluguel, em poupança), ou bens móveis ou imóveis dados em garantia</td><td>Simples e sem custo de terceiros</td><td>Cobre pouco se a dívida se acumular</td></tr>
<tr><td><strong>Fiança</strong></td><td>Uma pessoa, normalmente com imóvel próprio, se responsabiliza pela dívida</td><td>Sem custo para o inquilino</td><td>Cobrança depende de processo judicial contra o fiador</td></tr>
<tr><td><strong>Seguro-fiança</strong></td><td>Seguradora cobre aluguéis e encargos em atraso, conforme a apólice</td><td>Indenização mais rápida e análise de crédito feita pela seguradora</td><td>Custo anual pago pelo inquilino</td></tr>
<tr><td><strong>Cessão de quotas de fundo</strong></td><td>Quotas de um fundo de investimento ficam vinculadas ao contrato</td><td>O dinheiro continua rendendo para o inquilino</td><td>Pouco oferecida pelos bancos</td></tr>
</tbody></table></div>

<h2>Como escolher</h2>
<ul>
<li><strong>Aluguel mais alto ou imóvel comercial:</strong> o seguro-fiança costuma dar mais segurança, porque a seguradora analisa o crédito e paga em caso de atraso.</li>
<li><strong>Fiador:</strong> peça a matrícula atualizada do imóvel do fiador e confira se ele é casado. O cônjuge precisa assinar a fiança (outorga conjugal), ou ela pode ser anulada.</li>
<li><strong>Caução em dinheiro:</strong> deve ficar depositada em caderneta de poupança, e os rendimentos pertencem ao inquilino na devolução.</li>
</ul>

<h2>Cuidados que valem para qualquer garantia</h2>
<ol>
<li>Faça análise cadastral do inquilino (renda, histórico de crédito, referências).</li>
<li>Deixe por escrito no contrato qual é a garantia e até quando ela vale. Pela lei, a garantia se estende até a devolução das chaves, salvo disposição em contrário.</li>
<li>Se a garantia acabar no meio do contrato (fiador falecido, seguro cancelado), o proprietário pode exigir uma nova.</li>
<li>Locação sem garantia é permitida e, nesse caso, o proprietário pode cobrar o aluguel antecipadamente, até o sexto dia útil do mês a vencer (art. 42).</li>
</ol>

<div class="aviso">Conteúdo informativo, baseado na Lei 8.245/1991. Para casos específicos, consulte um advogado.</div>
`
  },
  {
    slug: 'vistoria-de-imovel-alugado',
    titulo: 'Vistoria de entrada e saída: como evitar conflitos no fim do aluguel',
    descricao: 'Veja o que precisa constar no laudo de vistoria de um imóvel alugado, como registrar fotos e o que é desgaste natural versus dano.',
    tema: 'Locação',
    data: '2026-10-18',
    corpo: `
<p>A maior parte das discussões entre proprietário e inquilino acontece no dia da entrega das chaves. A forma mais simples de evitar isso é fazer uma <strong>boa vistoria de entrada</strong>. A Lei do Inquilinato obriga o proprietário a fornecer uma descrição minuciosa do estado do imóvel quando ele é entregue (art. 22, V) e obriga o inquilino a devolvê-lo no mesmo estado, exceto pelo desgaste do uso normal (art. 23, III).</p>

<h2>O que o laudo de entrada deve ter</h2>
<ul>
<li>Descrição de cada cômodo: piso, paredes, teto, portas, janelas, tomadas e interruptores.</li>
<li>Estado da pintura (cor, marcas, manchas, furos).</li>
<li>Funcionamento de torneiras, descargas, chuveiro, aquecedor e registros.</li>
<li>Itens que ficam no imóvel: armários, box, luminárias, cortinas, eletrodomésticos.</li>
<li>Leitura dos medidores de água, luz e gás.</li>
<li>Quantidade de chaves e controles entregues.</li>
<li>Fotos e vídeos com data, anexados ao laudo e assinados pelas duas partes.</li>
</ul>

<h2>Desgaste natural ou dano?</h2>
<div class="rolagem"><table class="tabela">
<thead><tr><th>Normalmente é desgaste natural</th><th>Normalmente é dano a reparar</th></tr></thead>
<tbody>
<tr><td>Pintura desbotada pelo tempo</td><td>Paredes riscadas, manchadas ou pintadas de outra cor sem autorização</td></tr>
<tr><td>Pequenos riscos no piso pelo uso</td><td>Piso trincado, queimado ou com peças soltas</td></tr>
<tr><td>Borracha de vedação gasta</td><td>Torneira, vaso ou box quebrados</td></tr>
<tr><td>Dobradiças frouxas com os anos</td><td>Portas arrombadas ou com furos</td></tr>
</tbody></table></div>

<h2>Dicas práticas</h2>
<ol>
<li>Dê ao inquilino um prazo (por exemplo, 5 a 10 dias) para apontar defeitos que não apareceram na vistoria.</li>
<li>Combine no contrato se o imóvel deve ser devolvido pintado e com qual padrão.</li>
<li>Na saída, use o mesmo roteiro da entrada e compare item por item, com as fotos lado a lado.</li>
<li>Orçamentos de reparo devem ser apresentados por escrito antes de qualquer desconto na caução.</li>
</ol>

<div class="aviso">Uma vistoria bem feita protege as duas partes: o proprietário recebe o imóvel como entregou e o inquilino não paga por problemas que já existiam.</div>
`
  },
  {
    slug: 'reajuste-de-aluguel',
    titulo: 'Reajuste de aluguel: IGP-M, IPCA e o que diz a lei',
    descricao: 'Saiba como funciona o reajuste anual do aluguel, quais índices podem ser usados, o que é proibido e quando cabe a revisão do valor.',
    tema: 'Locação',
    data: '2026-10-17',
    corpo: `
<p>Todo ano, no aniversário do contrato, surge a mesma pergunta: quanto o aluguel vai subir? A resposta está no próprio contrato, mas a lei impõe alguns limites.</p>

<h2>O que a lei permite</h2>
<ul>
<li><strong>Periodicidade anual:</strong> reajustes com periodicidade inferior a um ano são nulos (Lei 10.192/2001).</li>
<li><strong>Índice livre:</strong> as partes escolhem o índice. Os mais usados são o IGP-M (FGV) e o IPCA (IBGE).</li>
<li><strong>Proibições:</strong> o aluguel não pode ser fixado em moeda estrangeira nem atrelado à variação cambial ou ao salário mínimo (Lei 8.245/1991, art. 17).</li>
</ul>

<h2>IGP-M ou IPCA?</h2>
<p>O IGP-M sofre forte influência do câmbio e de preços no atacado. Em alguns anos sobe muito mais que a inflação ao consumidor; em outros, fica negativo. O IPCA, que mede a inflação oficial ao consumidor, costuma ser mais estável. Por isso, muitos contratos novos passaram a adotar o IPCA, ou preveem o “menor entre os dois”.</p>
<p>Se o índice do contrato der negativo, vale o que estiver escrito. Muitos contratos preveem que o aluguel não será reduzido nesse caso; sem essa cláusula, o reajuste negativo pode ser aplicado.</p>

<h2>Como calcular</h2>
<p>Multiplique o aluguel atual pelo índice acumulado dos últimos 12 meses. Exemplo: aluguel de R$ 2.000,00 e índice acumulado de 4,5% → R$ 2.000,00 × 1,045 = <strong>R$ 2.090,00</strong>. A calculadora do cidadão do Banco Central ajuda a obter o índice acumulado exato.</p>

<h2>Reajuste não é revisão</h2>
<p>O reajuste só repõe a inflação. Se o aluguel ficou muito acima ou abaixo do valor de mercado, qualquer das partes pode pedir a <strong>revisão</strong>, por acordo ou, depois de três anos de contrato (ou do último acordo), por ação revisional (art. 19).</p>

<h2>Boas práticas</h2>
<ol>
<li>Avise o inquilino por escrito, com o cálculo e a fonte do índice.</li>
<li>Em momentos de índice muito alto, negociar um percentual menor pode valer mais que perder um bom inquilino.</li>
<li>Registre qualquer acordo diferente do contrato num aditivo assinado.</li>
</ol>
`
  },
  {
    slug: 'como-alugar-galpao',
    titulo: 'Galpão para alugar: 10 pontos para avaliar antes de fechar contrato',
    descricao: 'Checklist para escolher um galpão ou imóvel comercial: pé-direito, piso, docas, energia, zoneamento, AVCB, acesso e custos.',
    tema: 'Imóveis comerciais',
    data: '2026-10-16',
    imagem: 'galpao.jpg',
    imagemAlt: 'Galpão com estrutura metálica, portão aberto e piso de concreto (imagem ilustrativa)',
    corpo: `
<p>Um galpão bem escolhido reduz custos de operação por anos. Um mal escolhido gera obras, multas e mudança antes da hora. Antes de assinar, confira estes pontos.</p>

<ol>
<li><strong>Pé-direito útil:</strong> meça a altura livre até a parte mais baixa da estrutura, e não até a cumeeira. É isso que define quantos níveis de porta-pallet cabem.</li>
<li><strong>Piso:</strong> pergunte a capacidade de carga (em toneladas por m²) e confira se há trincas ou desníveis. Empilhadeiras exigem piso nivelado.</li>
<li><strong>Acesso de veículos:</strong> verifique se carretas conseguem entrar e manobrar, se há restrição de circulação de caminhões na região e se existem docas niveladoras.</li>
<li><strong>Zoneamento:</strong> confirme na prefeitura se a sua atividade é permitida naquele endereço. Em São Paulo, a consulta é feita pelo GeoSampa e pela Lei de Zoneamento.</li>
<li><strong>AVCB ou CLCB:</strong> o documento do Corpo de Bombeiros precisa estar válido e compatível com a sua ocupação e a carga de incêndio.</li>
<li><strong>Energia elétrica:</strong> confira se a rede é trifásica, a potência disponível e se há cabine primária, caso use máquinas pesadas.</li>
<li><strong>Estrutura e telhado:</strong> procure sinais de goteiras, ferrugem e calhas entupidas. Pergunte quem paga a manutenção do telhado.</li>
<li><strong>Escritório e apoio:</strong> banheiros, vestiários e refeitório podem ser exigidos pelas normas trabalhistas conforme o número de funcionários.</li>
<li><strong>Custos além do aluguel:</strong> IPTU, condomínio (em condomínios logísticos), seguro do imóvel e taxa de segurança.</li>
<li><strong>Contrato:</strong> prazo, carência para adaptação, quem faz e quem paga as benfeitorias, e direito à renovação.</li>
</ol>

<h2>Prazo e renovação</h2>
<p>Para locações comerciais, um contrato escrito de pelo menos cinco anos (ou contratos sucessivos que somem cinco anos) dá ao inquilino o direito de pedir a <strong>renovação compulsória</strong>, desde que explore o mesmo ramo há pelo menos três anos. Isso protege quem investiu no ponto. Veja mais em <a href="/blog/renovacao-de-aluguel-comercial/">renovação de aluguel comercial</a>.</p>

<p class="legenda">A imagem desta matéria é ilustrativa.</p>
`
  },
  {
    slug: 'renovacao-de-aluguel-comercial',
    titulo: 'Renovação de aluguel comercial: como funciona a ação renovatória',
    descricao: 'Entenda os requisitos da ação renovatória na locação comercial, o prazo para entrar com o pedido e como proteger o seu ponto.',
    tema: 'Imóveis comerciais',
    data: '2026-10-15',
    corpo: `
<p>Para muitos negócios, o endereço é parte do valor da empresa: clientes conhecem o local, a vizinhança gera movimento e houve investimento na reforma. A Lei do Inquilinato protege esse <strong>ponto comercial</strong> por meio da ação renovatória (art. 51).</p>

<h2>Requisitos</h2>
<ul>
<li>Contrato <strong>escrito</strong> e com <strong>prazo determinado</strong>.</li>
<li>Prazo mínimo de <strong>cinco anos</strong>, em um contrato ou na soma de contratos escritos ininterruptos.</li>
<li>O inquilino deve explorar o <strong>mesmo ramo</strong> de atividade há pelo menos <strong>três anos</strong> seguidos.</li>
</ul>

<h2>O prazo é curto</h2>
<p>A ação deve ser proposta no intervalo entre <strong>um ano e seis meses antes</strong> do fim do contrato. Fora dessa janela, o direito se perde. Vale anotar a data na agenda assim que o contrato for assinado.</p>

<h2>O que o proprietário pode alegar</h2>
<p>A renovação pode ser negada em situações previstas em lei, como: obras exigidas pelo poder público, reforma que valorize o imóvel, uso próprio do imóvel, proposta melhor de terceiro (com indenização ao inquilino em algumas hipóteses) ou proposta de aluguel do inquilino abaixo do valor de mercado.</p>

<h2>Na prática, negocie antes</h2>
<ol>
<li>Comece a conversa sobre renovação com pelo menos 18 meses de antecedência.</li>
<li>Pesquise preços de imóveis semelhantes na região para embasar a proposta.</li>
<li>Formalize o acordo num novo contrato ou aditivo antes de a janela da renovatória se fechar.</li>
</ol>

<div class="aviso">A ação renovatória exige advogado. Este texto é informativo e não substitui orientação jurídica.</div>
`
  }
];
