---
title: Política de Utilização Aceitável
description: Limites de conduta nos recursos alojados do Sonic, restrições ao abuso do sistema, regras de conteúdos e direitos alheios, medidas e reclamações.
---

**Data de revisão: 3 de novembro de 2026｜Versão: 1.9**

Esta política aplica-se às instâncias de teste alojadas efetivamente operadas pelo Sonic e às suas APIs públicas, protegendo recursos partilhados, utilizadores e serviços a montante. Constitui as regras de conduta relacionadas com os [Termos de Utilização](/pt/terms-of-service/); se não concordar, cesse a utilização da instância alojada. Não transforma um projeto gratuito, sem fins lucrativos e de código aberto numa garantia incondicional de segurança nem substitui a [Política de Privacidade](/pt/privacy-policy/) ou [Processamento de dados e segurança](/pt/data-security/).

As descrições funcionais desta página baseiam-se no ramo candidato público `rc/sonic-20261031@a75f5cb` (2026-11-01 UTC), revisto em 2026-11-02. A versão antiga `main@ce443c8` (2026-10-27 UTC) é distinta e não se presumem nela as funções do candidato. O RC não é uma GitHub Release oficial; a versão em produção continua por verificar. O chinês simplificado da raiz é a base de manutenção e as outras nove versões são traduções; a prioridade linguística não reduz a lei imperativa nem o direito dos consumidores a cláusulas claras e compreensíveis.

![Limites de utilização e medidas do Sonic: utilização normal, proteção de recursos, restrição, suspensão, cessação e revisão](/images/sonic/aup-ladder.svg)

*Figura: as medidas consideram conduta, impacto, repetição e risco; o esquema não é uma tabela fixa de sanções nem um compromisso de prazo.*

## 1. Âmbito de aplicação

1. A política aplica-se à utilização do leitor web Sonic alojado, API pública, início de sessão, pesquisa, reprodução, letras, recomendações e restantes endpoints públicos.
2. Uma implantação própria é uma instância independente. O respetivo operador determina as suas políticas, configuração, enquadramento legal e relações com utilizadores; esta página não assume por ele obrigações operacionais ou contratuais.
3. A licença MIT permite copiar, modificar, distribuir e utilizar comercialmente o código. Esta política protege a instância alojada e os seus recursos, não proíbe globalmente o uso comercial do código ou de todas as implantações Sonic.
4. Na verificação atual não foi encontrado caminho de envio para o servidor dos Blobs de áudio importados localmente; letras e recomendações podem ainda enviar título, artista, álbum, duração ou identificadores. Ver a [Política de Privacidade](/pt/privacy-policy/).

## 2. Condutas proibidas

### 2.1 Abuso do sistema e das interfaces

1. Obter, usar ou partilhar sem autorização contas, sessões, cookies, chaves de API ou chaves de serviço alheias, falsificar credenciais ou contornar autenticação, limitação, assinatura, proteção SSRF ou outros controlos de acesso da instância alojada.
2. Sondar ou explorar sem autorização endpoints não públicos, endereços internos ou materiais de credenciais da instância, ou obter e divulgar dados privados de terceiros; não use sugestões públicas para recolher, expor ou verificar dados alheios.
3. Ocupar recursos partilhados por recolha massiva de resultados, letras, endereços de reprodução ou respostas da API para revenda, espelhos ou conjuntos de dados não autorizados; excluem-se reprodução pessoal normal, uso moderado da API e integrações autorizadas.
4. Usar o proxy alojado como proxy de rede genérico, scanner ou ponto de ataque, ou causar deliberadamente concorrência, tráfego, erros e pressão sobre a cache desnecessários.

Esta política não proíbe ler o código, testar numa instância local própria com dados sintéticos ou autorizados, nem comunicar vulnerabilidades responsavelmente. Testes ativos de segurança em instâncias públicas exigem autorização adequada prévia e devem evitar afetar outras pessoas, aceder aos seus dados ou ampliar a vulnerabilidade. Pode enviar uma reprodução mínima em privado para `admin@epocanvas.com`; não publique credenciais reais.

### 2.2 Conteúdos e direitos

1. Não use o serviço alojado para praticar ou facilitar pirataria, contornar pagamento ou proteção de direitos de autor, ou infringir direitos de autor, marcas, imagem, personalidade, privacidade ou outros direitos.
2. Não use o serviço para difundir conteúdos ilícitos, malware, material de exploração sexual de crianças ou propaganda terrorista ilícita, nem para divulgar ilegalmente ou sem autorização credenciais e dados pessoais alheios. Isto não proíbe o início de sessão normal nem pedidos privados necessários ao exercício de direitos; importar música local também não equivale a carregar ficheiros para o Sonic.
3. Não se faça passar por outra pessoa ou organização nem use nomes e marcas `Sonic`, `Epomail` ou `EpoCanvas` para sugerir apoio, cooperação ou certificação de segurança não autorizados.
4. Não submeta pesquisas, comentários ou denúncias sabendo que contêm informações privadas alheias. Comentários públicos podem conter nomes, avatares e textos de outras pessoas; escrever comentários locais no localStorage não equivale a obter autorização de publicação.

### 2.3 Direitos alheios e estabilidade do serviço

1. Não assedie, ameace, difame, persiga, discrimine ou ataque operadores, fornecedores a montante, colaboradores ou outros utilizadores; não exponha dados alheios através de caches ou sugestões públicas.
2. Não perturbe a disponibilidade, integridade ou segurança da instância alojada, dos serviços de conteúdos ou identidade a montante ou da rede, incluindo provocar deliberadamente circuit breaker, degradação ou esgotamento de recursos.
3. Não viole a lei aplicável do seu local nem use interfaces de conteúdos em desconformidade com as regras dos serviços a montante. A licença do código não concede automaticamente direitos sobre conteúdos, contas ou músicas de terceiros.

## 3. Limites de utilização de recursos

A instância alojada pode limitar pedidos por estado não autenticado ou autenticado, IP, sessão, interface ou lote de eventos; os valores concretos dependem da configuração real, não constituindo compromisso contratual uniforme deste site para todas as implantações. Exceder limites pode originar `429`, atrasos, recusa ou restrição temporária, sem significar necessariamente infração.

Use frequências razoáveis de pedidos pessoais, evitando recolha paralela, tentativas repetidas, ocupação prolongada de streams e envio desnecessário de eventos. Parâmetros de limitação, revogação e conservação podem divergir entre variáveis de ambiente, Compose e predefinições do código; não se pode deduzir o funcionamento apenas pela página.

## 4. Escada de medidas

O operador pode adotar uma ou várias medidas conforme impacto, intenção, repetição, dados envolvidos e urgência, registando os motivos necessários:

1. Avisar ou pedir a cessação da conduta;
2. Limitar interfaces, concorrência, cache, envio de eventos ou outros recursos;
3. Suspender contas, sessões, credenciais ou origens de rede; a eficácia imediata da revogação depende do armazenamento, dos interruptores e do sucesso do pedido na instância;
4. Cessar o acesso à instância alojada ou impedir o uso continuado dos endpoints afetados;
5. Conservar registos necessários e fornecê-los a destinatários autorizados na medida exigida pela lei aplicável, por pedidos válidos ou pela proteção necessária de terceiros e sistemas.

Perante ataques em curso, furto de credenciais, ameaças graves de segurança ou conteúdos manifestamente ilícitos, podem aplicar-se primeiro medidas provisórias necessárias, seguidas de explicação e revisão. As medidas da política não substituem responsabilidades legais do autor da conduta, nem prometem denúncia policial automática, prazo fixo de conservação, resposta humana em 24 horas ou eliminação permanente de todos os registos relacionados.

## 5. Reclamações e denúncias

- **Reclamações**: se discordar de uma restrição, suspensão ou cessação, pode explicar conta, momento, endpoints e motivos a `admin@epocanvas.com`. O operador revê em prazo razoável segundo os recursos disponíveis; isto não afeta prazos, direitos e meios de tutela previstos na lei aplicável. Não promete prazo fixo, equipa dedicada ou restabelecimento obrigatório do acesso. Não envie palavras-passe, tokens completos ou dados pessoais sem relação com o caso.
- **Denúncias**: pode comunicar suspeitas de abuso, infração, problemas de segurança ou danos a terceiros para o mesmo endereço. Forneça factos necessários, sem reenviar materiais ilícitos ou sensíveis; o operador decide medidas ou divulgação a autoridades competentes segundo risco, minimização e lei aplicável.

Para direitos de privacidade, pedidos de eliminação e comunicações de violações de dados, use `privacy@epocanvas.com`. A política regula apenas recursos efetivamente alojados; instâncias próprias devem indicar o seu operador e os seus canais de reclamação.
