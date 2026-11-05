// Fila social da Urban Digital Products (QuoteZap). Gera queue.json + cards 1080x1350.
// Público: brasileiros que trabalham com limpeza (casa e piscina) nos EUA. Tudo em português.
// type: phrase (frase em inglês + tradução) | card (headline + accent + body) | list (itens) | steps (passo a passo)
// pillar: en (inglês p/ o trabalho) | biz (preço e negócio) | app (QuoteZap)
// Só afirmações verdadeiras sobre o QuoteZap: tabela com os preços do usuário, PDF com logo,
// mensagem em inglês/espanhol/português, funciona no celular sem instalar, $19/mês, 7 dias grátis.
const LINK = 'app.urbandigitalpro.net';
const CTA = `💬 Comenta ORÇAMENTO que eu te mando o link.\n📲 Teste grátis por 7 dias: ${LINK} (link na bio)`;
const TAGS = [
  '#brasileirosnoseua #limpezanoseua #housecleaning #cleaningbusiness #brasileirosnaflorida',
  '#faxinanoseua #brasileirosemorlando #cleaninglady #housecleaner #inglesparatrabalho',
  '#empreendedorbrasileiro #limpezaresidencial #airbnbcleaning #turnovercleaning #brasileirosnamerica',
];

const posts = [
  // ---------- 1-10 ----------
  { slug: 'en-cobrar', pillar: 'en', type: 'phrase',
    label: 'INGLÊS PARA O TRABALHO', headline: 'Como cobrar sem vergonha',
    phrase: 'Just a friendly reminder: the payment for Tuesday\'s cleaning is still open.',
    tr: 'Só um lembrete: o pagamento da limpeza de terça ainda está em aberto.',
    pt: `Cliente esqueceu de pagar e você trava na hora de cobrar em inglês?\n\nUse essa frase. "Friendly reminder" é educado, profissional e o americano entende na hora que é cobrança.\n\n🇺🇸 Just a friendly reminder: the payment for Tuesday's cleaning is still open.\n🇧🇷 Só um lembrete: o pagamento da limpeza de terça ainda está em aberto.\n\nSalva esse post pra usar na próxima vez.` },

  { slug: 'app-30s', pillar: 'app', type: 'card',
    label: 'QUOTEZAP', headline: 'Orçamento em inglês', accent: 'em 30 segundos.',
    body: 'Você escolhe o serviço em português. O cliente recebe tudo em inglês, no WhatsApp.',
    pt: `Quanto tempo você leva pra montar um orçamento em inglês?\n\nNo QuoteZap você escolhe o serviço, o tamanho da casa e os extras, em português. Ele monta o orçamento com os SEUS preços e gera a mensagem pronta em inglês pra mandar no WhatsApp do cliente.\n\nSem tradutor. Sem medo de errar o inglês.` },

  { slug: 'biz-cobrar-pouco', pillar: 'biz', type: 'card',
    label: 'PREÇO E NEGÓCIO', headline: 'Cobrar barato', accent: 'não enche a agenda.',
    body: 'Enche de cliente que reclama do preço. Calcule hora, produto e gasolina antes de passar valor.',
    pt: `Muita gente começa cobrando barato pra pegar cliente. O problema é que o cliente que veio pelo preço vai embora pelo preço.\n\nAntes de passar qualquer valor, some:\n• quantas horas o serviço leva\n• quanto você gasta de produto\n• a gasolina até a casa\n• quanto você quer ganhar por hora\n\nSe não fecha a conta, não é cliente, é prejuízo.` },

  { slug: 'en-remarcar', pillar: 'en', type: 'phrase',
    label: 'INGLÊS PARA O TRABALHO', headline: 'Precisa remarcar?',
    phrase: 'Something came up. Would Thursday at 10 am work for you instead?',
    tr: 'Surgiu um imprevisto. Quinta às 10h funcionaria pra você?',
    pt: `Teve um imprevisto e precisa trocar o dia da limpeza?\n\nNão precisa explicar demais. Avisa com antecedência e já oferece outro horário. O cliente americano valoriza quem resolve.\n\n🇺🇸 Something came up. Would Thursday at 10 am work for you instead?\n🇧🇷 Surgiu um imprevisto. Quinta às 10h funcionaria pra você?` },

  { slug: 'app-pdf-logo', pillar: 'app', type: 'card',
    label: 'QUOTEZAP', headline: 'Orçamento com', accent: 'a sua logo.',
    body: 'Gere um PDF profissional com o nome e a logo da sua empresa. Cliente confia mais.',
    pt: `Mandar preço solto no WhatsApp funciona. Mandar um orçamento em PDF, com a sua logo e tudo detalhado, fecha mais.\n\nO cliente americano compara 3, 4 empresas. A que parece mais organizada sai na frente, mesmo não sendo a mais barata.\n\nNo QuoteZap o PDF sai com o nome e a logo da sua empresa.` },

  { slug: 'en-reclamacao', pillar: 'en', type: 'phrase',
    label: 'INGLÊS PARA O TRABALHO', headline: 'Cliente reclamou?',
    phrase: 'I\'m sorry about that. I can come back tomorrow and fix it at no extra cost.',
    tr: 'Desculpa por isso. Posso voltar amanhã e resolver sem custo extra.',
    pt: `Cliente reclamou de um cantinho que ficou sujo. O que responder?\n\nNão discute, não se justifica demais. Pede desculpa e oferece a solução. É assim que cliente vira cliente fixo.\n\n🇺🇸 I'm sorry about that. I can come back tomorrow and fix it at no extra cost.\n🇧🇷 Desculpa por isso. Posso voltar amanhã e resolver sem custo extra.` },

  { slug: 'biz-turnover', pillar: 'biz', type: 'list',
    label: 'AIRBNB E TURNOVER', headline: 'Turnover não é limpeza comum.',
    items: ['Horário apertado entre hóspedes', 'Troca de roupa de cama e toalhas', 'Reposição de itens', 'Foto pro anfitrião no final'],
    pt: `Limpeza de Airbnb (turnover) tem regras próprias, e precisa estar no preço.\n\n• Horário apertado entre a saída e a entrada do hóspede\n• Troca de roupa de cama e toalhas\n• Reposição de papel, sabonete, café\n• Foto de tudo pro anfitrião no final\n\nSe você cobra turnover igual limpeza normal, está trabalhando de graça em parte do serviço.` },

  { slug: 'en-chave', pillar: 'en', type: 'phrase',
    label: 'INGLÊS PARA O TRABALHO', headline: 'Como entrar na casa',
    phrase: 'Will you be home, or should I use a lockbox code?',
    tr: 'Você vai estar em casa, ou eu uso um código de cofre de chave?',
    pt: `Primeira limpeza na casa nova. Como você vai entrar?\n\nPergunta antes, pra não perder tempo na porta.\n\n🇺🇸 Will you be home, or should I use a lockbox code?\n🇧🇷 Você vai estar em casa, ou eu uso um código de cofre de chave?\n\n"Lockbox" é aquela caixinha com senha onde fica a chave.` },

  { slug: 'app-idiomas', pillar: 'app', type: 'list',
    label: 'QUOTEZAP', headline: 'Um orçamento, três idiomas.',
    items: ['Inglês para o cliente americano', 'Espanhol para o cliente latino', 'Português para o brasileiro'],
    pt: `Seu cliente fala inglês. O próximo fala espanhol. O outro é brasileiro.\n\nNo QuoteZap você monta o orçamento uma vez, em português, e escolhe em que idioma a mensagem sai: inglês, espanhol ou português.` },

  { slug: 'biz-extras', pillar: 'biz', type: 'list',
    label: 'PREÇO E NEGÓCIO', headline: 'Extras que você esquece de cobrar.',
    items: ['Dentro do forno', 'Dentro da geladeira', 'Janelas por dentro', 'Roupa pra lavar e dobrar'],
    pt: `Esses serviços tomam tempo e muita gente faz "de brinde":\n\n• Dentro do forno\n• Dentro da geladeira\n• Janelas por dentro\n• Lavar e dobrar roupa\n\nTudo isso é extra (add-on). Coloca na sua tabela com preço, e o cliente escolhe se quer.` },

  // ---------- 11-20 ----------
  { slug: 'en-preco', pillar: 'en', type: 'phrase',
    label: 'INGLÊS PARA O TRABALHO', headline: 'Passando o preço',
    phrase: 'For a 3-bedroom, 2-bath home, a regular cleaning is $___.',
    tr: 'Para uma casa de 3 quartos e 2 banheiros, a limpeza regular sai $___.',
    pt: `O cliente perguntou "how much?". Responde com segurança, sem gaguejar:\n\n🇺🇸 For a 3-bedroom, 2-bath home, a regular cleaning is $___.\n🇧🇷 Para uma casa de 3 quartos e 2 banheiros, a limpeza regular sai $___.\n\nNos EUA casa se mede em quartos (bedrooms) e banheiros (baths). Completa com o seu preço.` },

  { slug: 'app-tabela', pillar: 'app', type: 'card',
    label: 'QUOTEZAP', headline: 'Os preços', accent: 'são os seus.',
    body: 'Você monta a sua tabela uma vez: por tamanho da casa, tipo de limpeza e extras.',
    pt: `O QuoteZap não inventa preço pra você.\n\nVocê cadastra a sua tabela uma vez: quanto cobra por tamanho de casa, por tipo de limpeza (regular, deep clean, turnover, move-out) e pelos extras.\n\nDepois é só escolher e o orçamento sai certinho, toda vez.` },

  { slug: 'en-deep', pillar: 'en', type: 'phrase',
    label: 'INGLÊS PARA O TRABALHO', headline: 'Explicando o deep clean',
    phrase: 'The first cleaning is a deep clean. After that, regular visits cost less.',
    tr: 'A primeira limpeza é uma limpeza pesada. Depois disso, as visitas regulares custam menos.',
    pt: `Cliente novo estranhou o preço da primeira limpeza? Explica assim:\n\n🇺🇸 The first cleaning is a deep clean. After that, regular visits cost less.\n🇧🇷 A primeira limpeza é uma limpeza pesada. Depois disso, as visitas regulares custam menos.\n\nCasa que nunca foi limpa por profissional dá mais trabalho na primeira vez. Isso é normal e o americano entende.` },

  { slug: 'biz-whatsapp', pillar: 'biz', type: 'card',
    label: 'PREÇO E NEGÓCIO', headline: 'Orçamento que demora', accent: 'é cliente perdido.',
    body: 'Quem pede preço pra 3 empresas fecha com a primeira que responde direito.',
    pt: `O cliente mandou mensagem pedindo preço. Você estava no meio de uma limpeza e respondeu 5 horas depois.\n\nNessa hora ele já fechou com outra empresa.\n\nQuem responde rápido e bem organizado sai na frente. Deixe sua tabela pronta pra responder em minutos, mesmo no intervalo entre uma casa e outra.` },

  { slug: 'en-fotos', pillar: 'en', type: 'phrase',
    label: 'INGLÊS PARA O TRABALHO', headline: 'Pedindo fotos da casa',
    phrase: 'Could you send me a few photos of the kitchen and bathrooms?',
    tr: 'Você pode me mandar algumas fotos da cozinha e dos banheiros?',
    pt: `Não sabe se a casa está muito suja pra passar o preço? Pede foto antes.\n\n🇺🇸 Could you send me a few photos of the kitchen and bathrooms?\n🇧🇷 Você pode me mandar algumas fotos da cozinha e dos banheiros?\n\nCozinha e banheiro mostram o estado da casa. Assim você não erra o preço.` },

  { slug: 'app-passos', pillar: 'app', type: 'steps',
    label: 'QUOTEZAP', headline: 'Como funciona',
    items: ['Escolhe o serviço e o tamanho da casa', 'Marca os extras', 'Manda no WhatsApp do cliente'],
    pt: `Como o QuoteZap funciona, em 3 passos:\n\n1. Escolhe o serviço e o tamanho da casa\n2. Marca os extras (forno, geladeira, janelas...)\n3. Manda no WhatsApp do cliente, no idioma dele\n\nFunciona direto no celular, sem instalar nada.` },

  { slug: 'en-chegando', pillar: 'en', type: 'phrase',
    label: 'INGLÊS PARA O TRABALHO', headline: 'Vai atrasar? Avisa antes',
    phrase: 'Hi! I\'m running about 15 minutes late. Sorry for the wait.',
    tr: 'Oi! Vou atrasar uns 15 minutos. Desculpa a espera.',
    pt: `Trânsito na I-4 de novo? Avisa antes do horário, não depois.\n\n🇺🇸 Hi! I'm running about 15 minutes late. Sorry for the wait.\n🇧🇷 Oi! Vou atrasar uns 15 minutos. Desculpa a espera.\n\n"Running late" é o jeito natural de dizer que vai atrasar.` },

  { slug: 'biz-recorrente', pillar: 'biz', type: 'card',
    label: 'PREÇO E NEGÓCIO', headline: 'Cliente fixo', accent: 'vale mais que cliente novo.',
    body: 'Ofereça um valor menor pra quem fecha limpeza semanal ou quinzenal.',
    pt: `Cliente que faz limpeza toda semana ou a cada 15 dias é o que segura sua agenda.\n\nUma ideia: tenha um preço pra limpeza única e um preço menor pra quem fecha recorrente (weekly, bi-weekly).\n\nVocê ganha um pouco menos por limpeza, mas ganha previsibilidade e para de correr atrás de cliente toda semana.` },

  { slug: 'en-review', pillar: 'en', type: 'phrase',
    label: 'INGLÊS PARA O TRABALHO', headline: 'Pedindo avaliação',
    phrase: 'If you\'re happy with the cleaning, would you mind leaving us a review?',
    tr: 'Se você gostou da limpeza, se importaria de deixar uma avaliação?',
    pt: `Cliente elogiou o serviço? Aproveita e pede avaliação no Google. É o que traz cliente novo de graça.\n\n🇺🇸 If you're happy with the cleaning, would you mind leaving us a review?\n🇧🇷 Se você gostou da limpeza, se importaria de deixar uma avaliação?` },

  { slug: 'app-preco', pillar: 'app', type: 'card',
    label: 'QUOTEZAP', headline: '$19 por mês.', accent: 'Um orçamento fechado já paga.',
    body: 'Teste grátis por 7 dias com os seus preços.',
    pt: `Quanto você ganha numa limpeza? Com uma limpeza fechada a mais por mês, o QuoteZap já se paga.\n\n$19 por mês, e você testa 7 dias grátis, com a sua tabela de preços.` },

  // ---------- 21-30 ----------
  { slug: 'en-cancelar', pillar: 'en', type: 'phrase',
    label: 'INGLÊS PARA O TRABALHO', headline: 'Política de cancelamento',
    phrase: 'Cancellations less than 24 hours in advance have a $___ fee.',
    tr: 'Cancelamentos com menos de 24 horas de antecedência têm uma taxa de $___.',
    pt: `Cliente cancelou em cima da hora e você perdeu o dia? Tenha uma política de cancelamento e avisa antes do primeiro serviço.\n\n🇺🇸 Cancellations less than 24 hours in advance have a $___ fee.\n🇧🇷 Cancelamentos com menos de 24 horas de antecedência têm uma taxa de $___.\n\nEmpresa organizada tem regra. E o cliente americano respeita regra.` },

  { slug: 'biz-moveout', pillar: 'biz', type: 'list',
    label: 'PREÇO E NEGÓCIO', headline: 'Move-out: o que entra?',
    items: ['Casa vazia, mas suja de verdade', 'Armários por dentro', 'Eletrodomésticos por dentro', 'Rodapés e paredes marcadas'],
    pt: `Limpeza de mudança (move-out) parece fácil porque a casa está vazia. Não é.\n\n• Sujeira que estava escondida atrás dos móveis\n• Armários por dentro\n• Forno e geladeira por dentro\n• Rodapés e marcas na parede\n\nCobre move-out como serviço próprio, não como limpeza regular.` },

  { slug: 'en-pets', pillar: 'en', type: 'phrase',
    label: 'INGLÊS PARA O TRABALHO', headline: 'Perguntando sobre pets',
    phrase: 'Do you have any pets I should know about?',
    tr: 'Você tem algum animal de estimação que eu deva saber?',
    pt: `Pergunta antes da primeira limpeza. Cachorro solto, gato que foge, muito pelo no sofá: tudo isso muda o serviço (e o preço).\n\n🇺🇸 Do you have any pets I should know about?\n🇧🇷 Você tem algum animal de estimação que eu deva saber?` },

  { slug: 'app-celular', pillar: 'app', type: 'card',
    label: 'QUOTEZAP', headline: 'Sem computador.', accent: 'Sem instalar nada.',
    body: 'Abre no navegador do celular, monta o orçamento e manda. Pronto.',
    pt: `Você passa o dia na rua, de casa em casa. Não dá pra depender de computador.\n\nO QuoteZap abre direto no navegador do celular. Monta o orçamento e manda no WhatsApp do cliente entre uma limpeza e outra.` },

  { slug: 'en-pagamento', pillar: 'en', type: 'phrase',
    label: 'INGLÊS PARA O TRABALHO', headline: 'Formas de pagamento',
    phrase: 'I accept Zelle, Venmo, or cash. Payment is due on the day of the cleaning.',
    tr: 'Aceito Zelle, Venmo ou dinheiro. O pagamento é no dia da limpeza.',
    pt: `Deixa claro como e quando você recebe, antes da primeira limpeza. Evita dor de cabeça depois.\n\n🇺🇸 I accept Zelle, Venmo, or cash. Payment is due on the day of the cleaning.\n🇧🇷 Aceito Zelle, Venmo ou dinheiro. O pagamento é no dia da limpeza.\n\nTroca pelas formas que você aceita.` },

  { slug: 'biz-piscina', pillar: 'biz', type: 'card',
    label: 'LIMPEZA DE PISCINA', headline: 'Trabalha com piscina?', accent: 'Vem coisa por aí.',
    body: 'Estamos criando o QuoteZap Pool: orçamento e relatório de visita em inglês.',
    pt: `Você limpa piscina aqui nos EUA?\n\nEstamos criando o QuoteZap Pool: orçamento e relatório da visita (foto, cloro, pH) que chega pro cliente em inglês, no WhatsApp.\n\nComenta PISCINA que eu te aviso quando ficar pronto.` },

  { slug: 'en-obrigado', pillar: 'en', type: 'phrase',
    label: 'INGLÊS PARA O TRABALHO', headline: 'Fechando com chave de ouro',
    phrase: 'All done! Thank you for trusting us with your home.',
    tr: 'Tudo pronto! Obrigado(a) por confiar a sua casa a nós.',
    pt: `Terminou a limpeza? Manda uma mensagem curta no final. É o detalhe que faz o cliente lembrar de você.\n\n🇺🇸 All done! Thank you for trusting us with your home.\n🇧🇷 Tudo pronto! Obrigado(a) por confiar a sua casa a nós.` },

  { slug: 'biz-indicacao', pillar: 'biz', type: 'card',
    label: 'PREÇO E NEGÓCIO', headline: 'O melhor marketing', accent: 'é cliente feliz.',
    body: 'Ofereça um desconto pra quem indicar um vizinho que fechar com você.',
    pt: `Cliente satisfeito conhece vizinho, amigo, colega de trabalho que também precisa de limpeza.\n\nUma ideia simples: ofereça um desconto na próxima limpeza pra quem indicar alguém que fechar com você.\n\nEm inglês: "referral discount".` },

  { slug: 'en-orcamento', pillar: 'en', type: 'phrase',
    label: 'INGLÊS PARA O TRABALHO', headline: 'Mandando o orçamento',
    phrase: 'Here\'s your quote. Let me know if you have any questions!',
    tr: 'Aqui está seu orçamento. Me avisa se tiver alguma dúvida!',
    pt: `Mandou o orçamento? Fecha a mensagem assim, simples e simpático:\n\n🇺🇸 Here's your quote. Let me know if you have any questions!\n🇧🇷 Aqui está seu orçamento. Me avisa se tiver alguma dúvida!\n\n"Quote" é orçamento. Grava essa palavra.` },

  { slug: 'app-teste', pillar: 'app', type: 'list',
    label: 'QUOTEZAP', headline: 'Teste 7 dias grátis.',
    items: ['Cadastre os seus preços', 'Mande orçamentos de verdade', 'Veja se fecha mais cliente'],
    pt: `Não precisa acreditar em mim. Testa.\n\n7 dias grátis, com os seus preços, mandando orçamento de verdade pros seus clientes. Se não fizer diferença, você não continua.` },
];

// Foto de cada post (social/photos/<cena>.jpg, gerada no Gemini via tools/scenes.js)
const PHOTO = {
  'en-cobrar': 'phone-car', 'app-30s': 'phone-porch', 'biz-cobrar-pouco': 'planning', 'en-remarcar': 'phone-car',
  'app-pdf-logo': 'planning', 'en-reclamacao': 'door-client', 'biz-turnover': 'airbnb-bed', 'en-chave': 'lockbox',
  'app-idiomas': 'phone-porch', 'biz-extras': 'oven', 'en-preco': 'door-client', 'app-tabela': 'planning',
  'en-deep': 'kitchen-clean', 'biz-whatsapp': 'phone-porch', 'en-fotos': 'bathroom', 'app-passos': 'phone-porch',
  'en-chegando': 'traffic', 'biz-recorrente': 'team', 'en-review': 'happy-client', 'app-preco': 'supplies',
  'en-cancelar': 'phone-car', 'biz-moveout': 'empty-house', 'en-pets': 'dog', 'app-celular': 'phone-car',
  'en-pagamento': 'door-client', 'biz-piscina': 'pool', 'en-obrigado': 'happy-client', 'biz-indicacao': 'team',
  'en-orcamento': 'phone-porch', 'app-teste': 'kitchen-clean',
};
for (const p of posts) {
  if (!PHOTO[p.slug]) throw new Error('post sem foto ' + p.slug);
  p.photo = PHOTO[p.slug];
}

module.exports = { posts, CTA, TAGS, LINK };
