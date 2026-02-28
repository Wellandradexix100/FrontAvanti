# Banco de Trocas de Conhecimento - Frontend

Bem-vindos ao repositório oficial do nosso sistema de trocas de conhecimento! Este projeto foi estruturado para ser escalável, moderno e visualmente padronizado.

---

## Como funciona o Frontend

A arquitetura foi pensada para ser limpa e eficiente, facilitando o trabalho em equipe:

- **Autenticação (JWT):** O token de acesso é gerenciado pelo `AuthContext` e armazenado no `localStorage`. Ele é enviado automaticamente em todas as requisições para o backend.
- **Consumo de API:** Utilizamos o **Axios**. Todas as chamadas devem ser feitas através do serviço centralizado em `src/services/api.js`.
- **Formulários:** Utilizamos o **React Hook Form** para performance e validações simples.
- **Navegação:** As rotas são gerenciadas pelo `react-router-dom`. Páginas privadas (como o Dashboard) são protegidas pelo componente `PrivateRoute`.
- **Padronização:** O projeto utiliza **Tailwind CSS**. Evitem criar estilos CSS puros; utilizem as classes utilitárias e os componentes já configurados.

---

## Guia de Estilo (Design System)

Para evitar que o sistema pareça um "Frankenstein", **todas** as páginas devem seguir rigorosamente estas regras:

### Tipografia e Cores

- **Fonte:** `Roboto` (Configurada como padrão no Tailwind).
- **Fundo da Página:** Sempre usar `bg-slate-50`.
- **Containers e Cards:** Sempre usar `bg-white`.
- **Textos:**
  - Títulos Principais: `text-slate-900 font-bold text-3xl`
  - Textos de Apoio/Corpo: `text-slate-600 font-normal`

### Layout e Elementos

- **Bordas:** Arredondamento padrão de `rounded-xl`.
- **Sombras (Elevation):**
  - `shadow-sm`: Para cards e conteúdos gerais.
  - `shadow-xl`: Exclusivo para **Modais** abertos.

---

## Nossa Caixa de Ferramentas (Componentes)

Já temos 6 componentes prontos na pasta `src/components`. **Usem eles em vez de criar do zero**:

1.  **`Layout.jsx`**: **Obrigatório!** Envolvam o conteúdo de cada página nele para garantir o Header e o espaçamento correto.
2.  **`Button.jsx`**: Botão oficial com variantes de cor e estado de _loading_.
3.  **`Input.jsx`**: Campo de texto com label e suporte a erros de validação.
4.  **`CardOferta.jsx`**: Cartão padrão para exibir os conhecimentos na vitrine (Home) e no Dashboard.
5.  **`Header.jsx`**: Menu superior inteligente que identifica se o usuário está logado.
6.  **`PrivateRoute.jsx`**: Proteção para rotas que exigem autenticação.

---

## Configuração do Ambiente

1.  **Instalação:**
    ```bash
    npm install
    ```
2.  **Variáveis de Ambiente:**
    Crie um arquivo `.env` na raiz (baseado no `.env.example`) e configure a `VITE_API_URL`.
3.  **Execução:**
    ```bash
    npm run dev
    ```

---
