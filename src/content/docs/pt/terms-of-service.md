---
title: Termos de Utilização
description: "Termos de Utilização do Sonic: aceitação dos termos, detalhe do âmbito do serviço, regras de conta, autorização dos dados comportamentais, qualidade de áudio e selos de amostra, limitação de responsabilidade, lei aplicável e resolução de litígios."
---

**Data de entrada em vigor: 1 de novembro de 2026｜Versão: 1.3**

Estes termos constituem o acordo entre si e o operador da instância que utiliza, sobre a utilização do serviço Sonic (a seguir designado «o serviço»). Ao concluir o início de sessão ou utilizar o serviço de qualquer outra forma, declara que leu e aceita a integralidade do conteúdo destes termos; quem não concordar, não utilize o serviço.

Estes termos são cláusulas contratuais gerais, publicadas na íntegra para sua apreciação, com as versões históricas arquivadas no repositório de código aberto. O consentimento prestado por via eletrónica tem a mesma eficácia que o documento em suporte físico e a assinatura. Os direitos que, nos termos da lei aplicável, não podem ser excluídos ou limitados por cláusulas contratuais gerais não são afetados por estes termos. Os documentos legais deste site têm como versão oficial a versão em Chinês Simplificado; as versões nas restantes línguas, incluindo a presente versão em Português, são traduções de referência e, em caso de dúvida na interpretação, prevalece a versão oficial.

![Ciclo de vida contratual dos Termos de Utilização do Sonic: consentimento eletrónico (o início de sessão implica a aceitação) → cumprimento (segurança da conta, os seus conteúdos, limitação de responsabilidade) → revisão (anúncio prévio das alterações substanciais) → cessação (cessar a utilização, limpar o perfil com um clique), com a lei aplicável e a linha de base de proteção de dados como alicerce](/images/sonic/tos-contract.svg)

*Figura: ciclo de vida do contrato, da celebração à cessação. O consentimento eletrónico tem a mesma eficácia que o escrito; o âmbito do serviço consta da secção 2, a conta da secção 3, os seus conteúdos e os dados comportamentais da secção 5, a limitação de responsabilidade da secção 10, a revisão da secção 12, e a lei aplicável e a resolução de litígios da secção 11.*

## 1. Definições

1. O serviço: o conjunto de funcionalidades que corre numa instância Sonic, incluindo o leitor web, o gateway de edge, o motor de protocolos local, a API aberta e os componentes associados; a disposição da interface e a localização das funções constam da [Interface e funcionalidades](/pt/interface/).
2. Operador: a pessoa singular ou a equipa que implantou e opera a instância que utiliza. Quanto às instâncias geridas (`sonic.epocanvas.tech`, `sonic.epocanvas.com`), é a equipa de operação; quanto às instâncias de implantação própria, é quem as implantou.
3. Você (utilizador): a pessoa singular ou a organização que inicia sessão ou utiliza o serviço de qualquer outra forma.
4. Celebração do contrato: contrata com o operador da instância em que inicia sessão. Estes termos são um modelo geral: aplicam-se diretamente às instâncias geridas; quem opera implantação própria pode modificá-los e adotá-los como termos do seu site, devendo cumprir, nos termos da lei aplicável do seu local, o dever de informação para com os seus utilizadores.
5. Plano de dados: o nó Linux que presta à instância que utiliza a análise de protocolos e o cálculo das recomendações; a sua indisponibilidade não afeta o serviço degradado a que tem direito ao abrigo da secção 4, n.º 2.

## 2. Descrição e âmbito do serviço

O serviço é uma ferramenta de pesquisa, agregação e reprodução que não armazena nem aloja quaisquer ficheiros musicais; os conteúdos de áudio obtêm-se dos CDN oficiais e das interfaces abertas a montante, e as letras obtêm-se da análise nativa e das bases de letras públicas. O âmbito e a localização dos dados de cada função são os seguintes:

| Categoria de funções | Funções incluídas | Local de armazenamento dos dados | Requer início de sessão |
| --- | --- | --- | --- |
| Funções principais (disponíveis anonimamente) | Pesquisa agregada multifuente, letras palavra a palavra, reprodução com níveis de qualidade, selos de amostra, tabelas de classificação, MV | Navegador local (estado de reprodução) | Não |
| Funções de conta | Sincronização na nuvem dos favoritos e das playlists, recomendação personalizada e Auto DJ, gestão dos eventos comportamentais | O servidor guarda apenas eventos comportamentais pseudonimizados; as preferências de favoritos guardam-se no navegador | Sim |
| Funções de dados pessoais | Lista de descargas, importação e gestão de música local | IndexedDB do navegador | Não |
| API aberta | Acesso de clientes de terceiros mediante chave de API assinada | Sessão e listas de revogação no servidor | Sim |

O serviço constrói-se sobre um projeto de código aberto e mantém-se aberto: o código-fonte é público e auditável, e pode implantar por si para obter capacidade equivalente. O software presta-se «tal como está», e os seus termos de licença coerem com as disposições de responsabilidade destes termos (ver a secção 10).

## 3. Obtenção e segurança da conta

1. Modo de início de sessão: o serviço inicia sessão com a conta Epomail via OAuth 2.0 (PKCE), sem sistema de registo autónomo; as disposições de conta entre si e a Epomail regem-se pelos termos desse serviço. Sendo a conta Epomail congelada ou cancelada, o seu início de sessão no serviço cessa em consequência.
2. Requisitos de idade: deve ter 16 anos completos; se a lei do seu local fixar para os serviços da sociedade da informação uma idade de consentimento diferente, prevalece a idade inferior (mínimo de 13 anos), mas sendo menor, continua a exigir-se o consentimento do tutor. A idade apura-se pelos dados da conta Epomail com que inicia sessão; o serviço não dispõe de mecanismo autónomo de verificação de idade.
3. Uma pessoa, uma conta: não pode emprestar, alugar, vender a conta nem partilhá-la com outrem; o operador não responde por distinguir nem recuperar litígios e misturas de dados resultantes de contas partilhadas.
4. Guarda das credenciais: responde pela guarda das credenciais da conta Epomail, das chaves de API e da segurança da sessão. As operações efetuadas através das suas credenciais presumem-se praticadas por si. O cookie de sessão contém a chave assinada; evite iniciar sessão em dispositivos partilhados sem terminar a sessão; detetada a fuga de credenciais, deve terminar a sessão de imediato e pedir a revogação.
5. Mecanismo de sessão: após o início de sessão bem-sucedido emite-se o cookie de sessão `HttpOnly; Secure; SameSite=Lax` (validade máxima de 30 dias); as chaves de API não se escrevem no URL, nos parâmetros de consulta nem no localStorage. Pode terminar a sessão a qualquer momento; o término revoga de imediato a sessão atual e o identificador de chave correspondente (jti).
6. Emissão de chaves: as chaves de API adotam o formato versionado com assinatura HMAC-SHA256, com validade de emissão de 30 dias e limite de validação de 90 dias; as chaves sem assinatura ou revogadas recusam-se sempre. A reemissão da chave exige a apresentação da chave atual válida. A chave de API é uma credencial de uso pessoal, que não pode entregar a terceiros nem incorporar em clientes publicamente distribuídos.
7. Proteção do início de sessão: a devolução de chamada OAuth passa por quádrupla verificação de state, PKCE, código de autorização e repetição; o endpoint de autenticação tem uma limitação de 30 pedidos por minuto por IP.

## 4. Prestação e alteração do serviço

1. Disponibilidade: o operador envida esforços razoáveis para manter a disponibilidade, mas não promete taxa de disponibilidade, tempos de memória intermédia nem prazos de recuperação específicos, e não presta acordo de nível de serviço (SLA).
2. Mecanismo de degradação: quando o nó do plano de dados falha 3 vezes consecutivas ou uma chamada excede o orçamento de 4,5 segundos, a camada de edge abre o circuito e comuta automaticamente para o modo degradado (ligação direta às interfaces públicas de letras e pesquisa), com recuperação por sondagem após 30 segundos de arrefecimento; durante a degradação, a interface exibe o aviso «modo degradado de edge» e algumas funções (como a análise integral das fontes de áudio e a atualização das recomendações) podem ficar indisponíveis. Trata-se de um comportamento de contingência do desenho do sistema, não de incumprimento contratual.
3. Qualidade de áudio e selos de amostra: os selos de qualidade do leitor (como SQ sem perdas e HQ alta qualidade) refletem fielmente o nível real da stream de áudio em curso; os fragmentos de amostra oficiais de 30 segundos indicam-se expressamente com o selo de amostra, sem se apresentarem como faixas completas. Mudando os níveis das fontes a montante, muda em consequência a qualidade realmente obtida, o que não constitui incumprimento contratual.
4. Alteração de funções: o projeto de código aberto evolui continuamente e as funções podem acrescentar-se, ajustar-se ou remover-se; as alterações substanciais que envolvam a capacidade de eliminação de dados anunciam-se previamente.
5. Manutenção e interrupções: o operador pode suspender parte ou a totalidade do serviço para atualizações, reparações ou tratamento de abusos; a indisponibilidade causada por falhas da Cloudflare, das interfaces musicais a montante ou dos CDN não constitui incumprimento do operador.
6. Funções experimentais: as funções assinaladas como experimentais ou em período de teste prestam-se tal como estão, podem ser instáveis e podem ajustar-se ou retirar-se a qualquer momento.

## 5. Os seus conteúdos e dados comportamentais

1. Favoritos e preferências: os favoritos, as playlists e as preferências do leitor que criar guardam-se no armazenamento local do seu navegador; limpar os dados do navegador ou usar «Limpar todos os dados locais» elimina-os, e o operador não responde pela sua perda; registe por conta própria as playlists importantes.
2. Música local e descargas: os ficheiros de música local que importar e as músicas descarregadas guardam-se no IndexedDB do seu navegador; esses conteúdos são seus e o servidor do operador não guarda cópias. Os ficheiros descarregados e importados localmente destinam-se apenas à sua audição pessoal; não os pode redistribuir, comunicar publicamente nem usar para fins comerciais.
3. Autorização dos eventos comportamentais: para prestar a função de recomendação, o serviço regista eventos comportamentais quando reproduz, conclui, salta, marca como favorita ou rejeita faixas (as categorias e os pesos dos sinais são públicos no código-fonte). Com a personalização desativada ou em modo puramente local/incógnito, não se geram novos registos de eventos; durante o período de ativação, a autorização precedente limita-se ao âmbito necessário à função de recomendação e cessa quando destrói a totalidade dos registos com a «limpeza do perfil com um clique».
4. Responsabilidade pelos conteúdos: responde pelos conteúdos que submeter por iniciativa própria (como nomes de playlists personalizadas e comportamento de chamadas à API); os litígios e as responsabilidades legais daí decorrentes são da sua responsabilidade.
5. Conteúdos musicais: os direitos sobre gravações, letras, capas e outros conteúdos pertencem aos respetivos titulares. O serviço não concede qualquer sublicenciamento de conteúdos musicais; a responsabilidade por ouvir legalmente no seu local é sua.

## 6. Serviços de terceiros

1. Fontes musicais a montante: a pesquisa, os endereços de reprodução e as letras obtêm-se das interfaces abertas oficiais da NetEase, QQ, KuGou e KuWo e de bases de letras públicas como AMLL e LRCLIB; as interfaces de terceiros podem mudar, limitar-se ou cessar, e o operador não garante a disponibilidade a montante.
2. Proxy de edge: por predefinição, as streams de áudio obtêm-se através do proxy de edge e o CDN a montante não contacta o seu endereço IP; se usar expressamente o modo de ligação direta `?mode=redirect`, o seu navegador estabelece a ligação diretamente ao CDN oficial e o seu IP fica visível para esse CDN.
3. Autenticação: a Epomail é o fornecedor de identidade do serviço; o seu tratamento de dados consta da [Lista de partilha com terceiros e transferências](/pt/sub-processors/).
4. Termos de terceiros: ao utilizar os serviços acima, fica igualmente vinculado aos respetivos termos de serviço de terceiros.

## 7. Utilização aceitável

Ao utilizar o serviço, deve cumprir a integralidade da [Política de Utilização Aceitável](/pt/acceptable-use/), incluindo a proibição de abusar dos recursos das interfaces, de atacar o sistema, de difundir conteúdos ilícitos ou de perturbar a utilização por outrem. Em caso de violação, o operador pode tomar as medidas previstas nos procedimentos dessa política, até à cessação do direito de utilização, e conservar as provas nos termos da lei para cooperação com as investigações das autoridades competentes.

## 8. Conservação, remoção dos dados e cessação da utilização

1. Cessação por si: pode cessar a utilização do serviço a qualquer momento; elimine os registos comportamentais com a «limpeza do perfil com um clique» e termine a sessão para revogá-la. O cancelamento da própria conta Epomail rege-se pelas regras da Epomail.
2. Registos comportamentais: os eventos comportamentais guardam-se no armazenamento SQLite do plano de dados e destroem-se automaticamente 90 dias após o registo (configurável por quem implanta, mínimo de 7 dias); pedida a eliminação ou a limpeza, destroem-se de imediato. Não existe perfil comercial de longo prazo construído automaticamente.
3. Cessação pelo operador: violando a [Política de Utilização Aceitável](/pt/acceptable-use/), o operador pode suspender ou cessar o seu direito de utilização ao abrigo dessa política.
4. Conservação legal: sendo a conservação necessária por exigência legal ou procedimento judicial, o operador pode adiar a eliminação na medida do necessário e tratar conforme o procedimento legal.

## 9. Notificação das medidas e recursos

Antes de suspender ou cessar o seu direito de utilização ao abrigo da «utilização aceitável» ou da secção anterior, o operador deve notificá-lo e dar-lhe oportunidade de se explicar ou de corrigir, salvo em situação urgente (como um ataque em curso). Se considerar a medida errada, pode reclamar segundo o procedimento da secção «Reclamações» da [Política de Utilização Aceitável](/pt/acceptable-use/), devendo o operador rever e responder em prazo razoável.

As notificações previstas nestes termos fazem-se por documento eletrónico; a conta Epomail com que inicia sessão é o lugar de entrega das notificações eletrónicas, e deve mantê-la em condições normais de receção.

## 10. Exclusão de garantias e limitação de responsabilidade

1. Prestação tal como está: o serviço (incluindo o seu software) presta-se «tal como está» e «conforme disponível», sem quaisquer garantias expressas ou implícitas, incluindo garantias de comerciabilidade, de adequação a uma finalidade específica e de não infração; âmbito coincidente com a exclusão de garantias da licença MIT adotada pelo software.
2. Limite de eficácia: as disposições anteriores, e quaisquer outras que reduzam ou excluam a responsabilidade do operador, agravem a sua responsabilidade ou limitem os seus direitos, não produzem efeito na parte que, nas circunstâncias, seja manifestamente injusta ou não admitida pela lei aplicável.
3. Limitação de responsabilidade: dentro do máximo permitido pela lei, a responsabilidade acumulada do operador para consigo limita-se ao montante mais elevado entre as despesas que efetivamente lhe pagou nos últimos 12 meses (no serviço gratuito, normalmente zero) e 100 dólares dos Estados Unidos. O operador não responde por danos indiretos, perda de dados, perda de negócio ou danos na reputação comercial.
4. Responsabilidade legal não limitada: a responsabilidade que, nos termos da lei aplicável, não possa excluir-se ou limitar-se por acordo (incluindo a decorrente do incumprimento pelo operador dos seus deveres de proteção de dados) não fica excluída nem limitada pelo teto da responsabilidade anterior.
5. Força maior: pelas interrupções do serviço e pelas perdas de dados causadas por catástrofes naturais, atos governamentais, falhas de redes troncais, ataques cibernéticos em massa ou cessação das interfaces a montante ou dos CDN, o operador não responde por indemnização, desde que tenha envidado esforços razoáveis.

## 11. Lei aplicável, resolução de litígios e supervisão da proteção de dados

1. A interpretação, a validade e o cumprimento destes termos regem-se pela lei do local do operador: nas instâncias geridas, a lei de Taiwan; nas instâncias de implantação própria, a lei do local de quem implantou.
2. Os litígios decorrentes destes termos resolvem-se primeiro por negociação; não havendo acordo, nos litígios das instâncias geridas, o Tribunal Distrital de Taipé, Taiwan, é o tribunal de primeira instância competente. Sendo consumidor e prevendo a lei do seu local jurisdição obrigatória ou proteção dos consumidores diferente, prevalece essa disposição.
3. A proteção de dados não fica reduzida pelas duas disposições anteriores: o serviço adota o RGPD como padrão mínimo de proteção de dados para todos os utilizadores (ver a secção 4 do [Panorama](/pt/overview/)); os utilizadores da União Europeia e do Espaço Económico Europeu gozam, quanto aos seus dados pessoais, de todos os direitos e recursos enumerados na [Política de Privacidade](/pt/privacy-policy/).

## 12. Revisão dos termos

Estes termos podem ser revistos com a evolução do serviço. As alterações substanciais comunicam-se previamente por aviso no site, com atualização da data de entrada em vigor e do número de versão no topo desta página. Continuando a utilizar o serviço após a entrada em vigor da alteração, considera-se que aceita os termos revistos; quem discordar deve cessar a utilização e limpar ou exportar os seus dados. As versões históricas das revisões substanciais arquivam-se com os registos de versões do repositório de código aberto; os termos revistos publicam-se, antes da entrada em vigor, segundo o modo descrito, para sua apreciação.

## 13. Contactos

- Instância gerida: `admin@epocanvas.com`; privacidade e proteção de dados: `privacy@epocanvas.com`
- Projeto de código aberto: Issues do repositório GitHub (`github.com/shijianus/sonic`)
- Sites de implantação própria: contacte o operador indicado pelo próprio site

---

*Estes termos, a [Política de Privacidade](/pt/privacy-policy/) e a [Política de Utilização Aceitável](/pt/acceptable-use/) constituem em conjunto o acordo integral entre si e o operador; a ordem de aplicação entre documentos consta do [Panorama](/pt/overview/). Este documento é um modelo geral elaborado pela comunidade de código aberto e não constitui parecer jurídico; quem opera deve consultar um advogado antes de iniciar a operação formal e ajustá-lo ao seu negócio efetivo.*
