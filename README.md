# **Amazon Web Scraping**

## **Descrição**

Este projeto realiza scraping de dados de produtos na Amazon com base em uma palavra-chave fornecida pelo usuário. Ele utiliza tecnologias como Node.js, Express, Axios e jsDOM para buscar e exibir informações de produtos.

---

## **Como executar o projeto**

### **Pré-requisitos**

Certifique-se de ter as seguintes ferramentas instaladas em sua máquina:

- [Node.js](https://nodejs.org/) (versão 14 ou superior)
- [npm](https://www.npmjs.com/) (gerenciador de pacotes do Node.js)
- Navegador web para acessar a interface

---

### **Passos para rodar o projeto**

1. **Clone o repositório:**

   ```bash
   git clone https://github.com/rafael-rodrigues01/desafio-tecnico-longlifenutri.git
   ```

2. **Acesse o diretório do projeto:**

   ```bash
   cd desafio-tecnico-longlifenutri
   ```

3. **Instale as dependências:**

   ```bash
   npm install
   ```

4. **Inicie o servidor:**

   ```bash
   npm start
   ```

   O servidor será iniciado na porta `3000`. Você verá a mensagem no terminal:

   ```
   Server is running at port: http://localhost:3000
   ```

5. **Acesse a interface web:**

   Abra o arquivo `index.html` localizado em `data_scraping/views/` no seu navegador ou utilize uma extensão de servidor local no Visual Studio Code, como o [Live Server](https://marketplace.visualstudio.com/items?itemName=ritwickdey.LiveServer).

6. **Realize uma busca:**

   - Insira uma palavra-chave no campo de texto.
   - Clique no botão "Scrape".
   - Os resultados da busca serão exibidos na página.

---

## **Estrutura do Projeto**

- **`data_scraping/`**: Contém o código principal do backend e a lógica de scraping.
  - **`AmazonScraper.js`**: Classe responsável por realizar o scraping na Amazon.
  - **`index.js`**: Configuração do servidor Express.
  - **`routes.js`**: Define as rotas da API.
  - **`views/`**: Contém os arquivos da interface web (HTML, CSS e JavaScript).

- **`docs/`**: Documentação adicional do projeto.

---

## **Tecnologias Utilizadas**

- **Backend:**
  - [Node.js](https://nodejs.org/)
  - [Express](https://expressjs.com/)
  - [Axios](https://axios-http.com/)
  - [jsDOM](https://github.com/jsdom/jsdom)

- **Frontend:**
  - HTML, CSS e JavaScript
  - [Axios CDN](https://cdn.jsdelivr.net/npm/axios/dist/axios.min.js)

---

## **Observações**

- Este projeto utiliza scraping, que pode estar sujeito a limitações ou bloqueios por parte do site da Amazon. Certifique-se de respeitar os [termos de uso](https://www.amazon.com/gp/help/customer/display.html?nodeId=508088) da Amazon.
- Caso encontre problemas ao carregar imagens, um placeholder será exibido.

---

### **Autor**

Desenvolvido por [Rafael Rodrigues](https://github.com/rafael-rodrigues01).

---

## Documentação:

1. [Padrões de Commits](/docs/commit-pattern.md)
2. [Gerenciamento de Branches](/docs/branch-management.md)
3. [Ferramentas e Dependências](/docs/tools-and-dependencies.md)
