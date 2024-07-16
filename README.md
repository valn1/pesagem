# Bem-vindo ao Projeto VS Pesagem

## KISS(Keep It Simple, Stupid)

Esse projeto deve sempre se manter ágil e simples.

- Mantenha as abstrações a no máximo dois níveis.
- Crie helpers para evitar repetição de código e para manter os componentes legíveis.
- Faça uso dos snippets, eles vão te poupar muito tempo.
- Evite fazer um banco de dados confuso, sempre pense "será que eu preciso fazer uma tabela nova ou uma coluna já resolve?".
- Procure desenvolver pensando no futuro e no impacto de alguma mudança.
- O app é para o usuário, mas o projeto é para os devs então, documente sempre que achar necessário.

## Estrutura do Projeto

A estrutura do projeto VS Pesagem segue a seguinte organização:

```
├── src/                    # Pasta principal do código fonte
│   ├── components/         # Componentes reutilizáveis
│   ├── entities/           # Interfaces e tipos do projeto
│   ├── screens/            # Telas do aplicativo
│   ├── helpers/            # Helpers para manter o código nos componentes e telas mais organizado e limpo
│   ├── hooks/              # Hooks e contextos para serem usados dentro da estrutura do app
│   └── router.tsx          # Arquivo de rotas de navegação
└── App.tsx                 # Arquivo principal de inicialização do aplicativo
```

## Padrões de Nomenclatura

Para manter a consistência e legibilidade do código, adotamos os seguintes padrões de nomenclatura:

- **components**: Cada componente **VSComponent** leva um index.tsx e um styles.ts, possivelmente um helper.ts e outros arquivos que caibam ali
- **entities**: Separadas em **commons** com nomes simples terminados em .d.ts e **componentEntities** com o nome do componente **VSComponent** terminado em .d.ts
- **helpers**: Nome simples com extensão .ts
- **hooks**: Nome simples com extensão .tsx
- **screens**: Estruturadas em diretórios com o nome da tela capitalizado, contendo um index.tsx, styles.ts e possivelmente um helper.ts

## Snippets Personalizados

Ao longo do desenvolvimento do projeto, foram criados alguns snippets personalizados para agilizar a escrita de código.

- mkcomponent: cria um componente padrão;
- mkhook: cria um hook com context padrão;
- mkscreen: cria uma tela padrão;
- exsty: cria e exporta um estilo padrão;
- extype: cria e exporta um tipo padrão;

## Deixe o lugar melhor do que estava quando você chegou

Esse projeto foi criado como um exemplo a ser seguido de um projeto que cumpre e supera os requisitos(em ordem de prioridade) de:

- manutenibilidade: o projeto deve ser de fácil compreensão e manutenção, com código bem estruturado e documentado.
- escalabilidade: o projeto deve ser capaz de lidar com o crescimento e evolução, permitindo a adição de novas funcionalidades sem grandes impactos no código existente.
- performance: o projeto deve ser otimizado para garantir uma boa experiência de uso, com tempos de resposta rápidos e consumo eficiente de recursos.
- usabilidade: o projeto deve ser intuitivo e fácil de usar, proporcionando uma boa experiência para os usuários.
- documentação: o projeto deve ser bem documentado, incluindo informações sobre sua arquitetura, funcionalidades, configuração e uso.
- segurança: o projeto deve adotar práticas e medidas de segurança para proteger os dados e garantir a integridade do sistema.

Se essas orientações forem seguidas, não teremos problemas para criar novas funcionalidades nem para consertar falhas que eventualmente vão aparecer. Os commits de feat terão poucos arquivos alterados, novatos vão entender o projeto sem dificuldades, independete do nível de experiência, atualizações serão frequentes, rápidas e descomplicadas.

Dito isso, divirta-se codando, sinta-se livre para implementar coisas novas e melhorar a estrutura do projeto. Não fuja dos desafios.
_Atreva-se a aprender_

//Valdeli Vaz - jul. de 2024
