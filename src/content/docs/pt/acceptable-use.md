---
title: Política de Utilização Aceitável
description: "Política de Utilização Aceitável do Sonic: âmbito de aplicação, lista de condutas proibidas, limites de utilização de recursos, escadaria de execução, canal de tolerância zero e procedimento de reclamação."
---

**Data de entrada em vigor: 2 de novembro de 2026｜Versão: 1.5**

Esta política fixa os limites de conduta para a utilização do serviço Sonic (a seguir designado «o serviço») e descreve as condutas proibidas e as medidas do operador. Esta política é o código de conduta referido na secção 7 dos [Termos de Utilização](/pt/terms-of-service/), que deve cumprir ao utilizar o serviço; quem não concordar com esta política, cesse a utilização do serviço.

![Escadaria de execução do Sonic: quatro níveis de medidas (aviso, limitação, suspensão, cessação), seguidos da conservação de provas e da transmissão legal; canal de tolerância zero para a proteção de crianças e jovens e conteúdos terroristas, com tratamento imediato; circuito de reclamação para revisão pelas partes](/images/sonic/aup-ladder.svg)

*Figura: as medidas do operador aplicam-se em escadaria, segundo a gravidade, com o motivo registado a cada nível; o canal de tolerância zero não segue o procedimento escalonado; a parte pode reclamar contra qualquer medida.*

## 1. Âmbito de aplicação

Esta política aplica-se à sua utilização do serviço por qualquer modo, incluindo:

1. A totalidade das funções do leitor web (pesquisa, reprodução, letras, recomendações, descargas e importação de música local);
2. O acesso pela API aberta, incluindo os clientes e os scripts de terceiros criados por si;
3. As instâncias de implantação própria (quem opera a implantação própria pode modificar esta política antes de a adotar, mas não abaixo dos requisitos da lei do seu local).

## 2. Condutas proibidas

### 2.1 Abuso do sistema e das interfaces

1. Contornar ou quebrar a limitação de taxa, a verificação de assinatura, o mecanismo de circuit breaker, a defesa SSRF, a lista branca de domínios ou outras medidas de proteção técnica;
2. Falsificar chaves de API, reproduzir identificadores de chave revogados (jti), roubar sessões ou chaves alheias, ou contornar por qualquer modo a validação fail-closed;
3. Recolher em massa, com scripts automatizados, os resultados de pesquisa, as letras ou os endereços de reprodução do serviço, para revenda, redistribuição ou construção de conjuntos de dados espelho sem relação com as funções do serviço;
4. Sondar, analisar ou obter por outro modo a topologia interna do serviço, as chaves entre serviços, o material de chaves ou os endpoints não públicos;
5. Utilizar os endpoints de proxy do serviço (`/api/music/stream`, `/api/sonic/forward`, entre outros) como proxy de rede genérico para aceder a destinos sem relação com a reprodução musical.

### 2.2 Conteúdos e direitos

1. Utilizar as interfaces do serviço para decifrar, contornar ou perturbar os mecanismos de pagamento e de proteção de copyright de qualquer plataforma musical;
2. Difundir conteúdos que violem os direitos de autor, as marcas, a imagem ou os direitos de personalidade de outrem;
3. Carregar ou difundir conteúdos ilícitos, incluindo material de exploração sexual de menores e propaganda terrorista;
4. Atuar sob nome ou identidade institucional alheios, ou usar o nome e os sinais distintivos `epocanvas` e `Sonic` para sugerir, sem autorização, o apoio do serviço;
5. Carregar ficheiros ilícitos para distribuição através do serviço para a importação de música local ou para as funções de descarga.

### 2.3 Direitos de terceiros

1. Perturbar ou quebrar o funcionamento normal do serviço ou de quaisquer sistemas associados, incluindo a ativação deliberada do circuit breaker e do mecanismo de degradação;
2. Praticar assédio, difamação ou ataques contra o operador, os fornecedores a montante ou outros utilizadores;
3. Utilizar o serviço para qualquer finalidade que viole a lei do seu local ou os termos dos serviços a montante;
4. Vender, subarrendar ou fornecer o acesso ao serviço com fins de revenda comercial.

## 3. Limites de utilização de recursos

| Item | Limite | Medida em caso de excesso |
| --- | --- | --- |
| Pedidos anónimos | 240 por minuto (valor predefinido) | Recusa direta na camada de edge (429), sem registo como infração |
| Pedidos autenticados | 600 por minuto (valor predefinido) | Recusa direta na camada de edge (429); o excesso persistente entra na escadaria de execução |
| Endpoint de autenticação (início de sessão/emissão de chaves) | 30 por minuto por IP | Recusa direta na camada de edge (429) |
| Comunicação de eventos comportamentais | Máximo de 50 eventos por lote e corpo de pedido de 64 KB | O pedido em excesso recusa-se na íntegra |
| Streams de áudio | Via proxy de edge, ou via modo de ligação direta por pedido expresso seu | A concorrência anómala entra na escadaria de execução |

A utilização pessoal normal não atinge os limites acima; a finalidade técnica da limitação de taxa é prevenir abusos e manter a estabilidade do serviço, não constituindo sanção. Os parâmetros da limitação de taxa são configuráveis por quem implanta; nas instâncias de implantação própria, os valores reais são os da respetiva configuração.

## 4. Escadaria de execução

Detetada uma conduta violadora, o operador aplica as medidas seguintes segundo a gravidade; cada nível de medida regista o respetivo motivo:

1. Aviso: emite um aviso no leitor, com indicação do motivo;
2. Limitação: reduz a quota de pedidos dessa conta ou chave;
3. Suspensão: bloqueia temporariamente a sessão e a chave de API dessa conta (via lista de revogação de `jti` ou mecanismo de revogação imediata), com conservação temporária dos dados;
4. Cessação: cessa o direito de utilização; os dados comportamentais destroem-se após o prazo de conservação (90 dias, mínimo de 7 dias);
5. Conservação de provas e transmissão legal: quando a lei o exigir, conserva os registos na medida do necessário e disponibiliza-os às autoridades competentes por procedimento legal.

Nas situações seguintes não se aplica o procedimento escalonado, podendo o operador suspender de imediato e transmitir ou denunciar: material de exploração sexual de menores, propaganda terrorista e ataques ao sistema em curso.

## 5. Reclamações e denúncias

- Reclamação: se considerar a medida errada, pode reclamar para `admin@epocanvas.com`, indicando a conta e os factos da medida; o operador revê e responde em prazo razoável. As reclamações contra medidas urgentes (situações de tolerância zero da secção 4) são igualmente recebidas, e a revisão não suspende a reparação do erro de julgamento que lhe diga respeito.
- Denúncia: qualquer pessoa que detete condutas contra esta política pode denunciá-las para a caixa acima; a identidade do denunciante mantém-se confidencial perante o denunciado até à verificação. As denúncias envolvendo a proteção de crianças não ficam limitadas pelo dever de confidencialidade e tratam-se por procedimento legal.

As medidas tomadas pelo operador ao abrigo desta política não dispensam o infrator da responsabilidade que lhe caiba por lei.
