# App de Notícias - Desafio Técnico

Este é um aplicativo de notícias construído com React Native e Expo, como solução para o desafio proposto. O aplicativo busca notícias de uma API pública, permite visualizá-las, pesquisar, favoritar e filtrar por categorias.

## Funcionalidades Implementadas

- **Lista de Notícias:** Visualização das principais notícias com scroll infinito.
- **Busca:** Pesquisa por palavras-chave em tempo real.
- **Detalhes da Notícia:** Tela com informações completas, incluindo imagem, descrição e um link para a matéria original.
- **Navegação:** Navegação completa entre as telas de lista, detalhes e favoritos.

### Diferenciais Implementados

- **Favoritos:** Possibilidade de salvar notícias para ler mais tarde. Os favoritos são persistidos localmente no dispositivo usando `AsyncStorage`.
- **Categorias:** Filtro de notícias por categorias (tecnologia, esportes, saúde, etc.).
- **Modo Offline:** O aplicativo armazena em cache as últimas notícias carregadas e as exibe caso o dispositivo esteja sem conexão, garantindo uma experiência de usuário contínua.
- **Componentização:** A UI foi construída com componentes reutilizáveis (`NewsCard`, `CategorySelector`, etc.) para um código mais limpo e manutenível.
- **TypeScript:** O projeto foi desenvolvido 100% em TypeScript, garantindo maior segurança e robustez ao código.
- **Gerenciamento de Estado com Context API:** O estado global (busca, favoritos) é gerenciado de forma eficiente e desacoplada com a Context API do React.
- **Multiplataforma (Web):** Além de iOS e Android, o projeto foi configurado para rodar também na web.

## Decisões Técnicas

- **Expo:** Escolhido para agilizar o setup inicial e o processo de desenvolvimento. O Expo Go facilita os testes em dispositivos físicos e o SDK do Expo abstrai muitas configurações complexas, permitindo focar na lógica da aplicação.
- **TypeScript:** Utilizado para adicionar tipagem estática ao JavaScript. Isso reduz drasticamente a chance de erros em tempo de execução, melhora o autocompletar e a compreensão do código, tornando-o mais escalável e fácil de manter.
- **React Navigation:** É a solução padrão e mais robusta para roteamento em aplicações React Native. A escolha do `StackNavigator` aninhado em um `BottomTabNavigator` oferece uma experiência de usuário familiar e intuitiva.
- **Context API:** Para o gerenciamento de estado global (termo de busca e favoritos), a Context API foi a escolha ideal. Ela é nativa do React, evitando a necessidade de bibliotecas externas mais pesadas como Redux para um caso de uso relativamente simples, mantendo o código limpo e performático.
- **AsyncStorage:** Utilizado para a persistência dos favoritos. É a solução padrão da comunidade para armazenamento simples de chave-valor no React Native, perfeita para salvar dados que precisam sobreviver ao fechamento do app.
- **Axios:** Escolhido para as chamadas HTTP à API de notícias por sua simplicidade, suporte a Promises e fácil configuração com TypeScript.

## Instalação e Execução

### Pré-requisitos

- Node.js (LTS)
- npm ou Yarn
- Expo Go (para testes em dispositivo móvel)
- Xcode ou Android Studio (para testes em simulador/emulador)

### Passos

1.  **Clone o repositório:**
    ```bash
    git clone <https://github.com/Enzo0Portella/expo-app-noticias>
    cd <https://github.com/Enzo0Portella/expo-app-noticias>
    ```

2.  **Instale as dependências:**
    ```bash
    npm install
    ```

3.  **Configure a Chave da API:**
    -   Crie um arquivo chamado `.env` na raiz do projeto.
    -   Dentro do arquivo `.env`, adicione a seguinte linha, substituindo `SUA_CHAVE_API_AQUI` pela sua chave da [NewsAPI](https://newsapi.org):
        ```
        EXPO_PUBLIC_NEWS_API_KEY=SUA_CHAVE_API_AQUI
        ```
    -   *Nota: Por padrão, o país está configurado como `us` (Estados Unidos) para garantir que a API retorne resultados no plano gratuito. Você pode alterar para `br` ou outro país suportado no arquivo `src/services/newsApi.ts`.*

4.  **Execute o projeto:**
    -   `npm run ios`
    -   `npm run android`
    -   `npm run web`

---

*Desafio concluído com sucesso!*
