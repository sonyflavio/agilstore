# 🛒 AgilStore – Gerenciamento de Produtos

Aplicação desenvolvida em **JavaScript (Node.js)** para gerenciamento de inventário da loja **AgilStore**, permitindo o controle de produtos por meio de comandos no terminal.

Projeto desenvolvido como parte do **Exercício de Programação – 2026/1 da Facilitadora Ágil**.

---

## 📌 Contexto

A AgilStore é uma loja de eletrônicos que expandiu seu catálogo de produtos, passando a trabalhar com diferentes categorias como smartphones, laptops e acessórios.

O controle manual de inventário por planilhas tornou-se ineficiente, motivando o desenvolvimento desta aplicação para automatizar o gerenciamento dos produtos.

---

## ⚙️ Tecnologias Utilizadas

- Node.js
- JavaScript
- File System
- Readline-Sync
- Terminal / CLI

---

## 📂 Estrutura do Projeto

```bash
AGILSTORE/
├── node_modules/
├── index.js
├── inventario.json
├── package.json
├── package-lock.json
└── README.md
```

---

## 🚀 Como Executar a Aplicação

### Pré-requisitos

- Node.js instalado (versão 16 ou superior)

### Passos para execução

1. Clone o repositório:

```bash
git clone https://github.com/sonyflavio/agilstore.git
```

2. Acesse a pasta do projeto:

```bash
cd agilstore
```

3. Instale as dependências:

```bash
npm install
```

4. Execute a aplicação:

```bash
node index.js
```

---

## 🧩 Funcionalidades

### 1️⃣ Adicionar Produto

Permite adicionar um novo produto ao inventário informando:

- Nome do produto
- Categoria
- Quantidade em estoque
- Preço

✔️ O sistema gera automaticamente um ID único para cada produto.

### 2️⃣ Listar Produtos

Exibe todos os produtos cadastrados no inventário em formato de tabela, contendo:

- ID
- Nome do Produto
- Categoria
- Quantidade em Estoque
- Preço

### 3️⃣ Atualizar Produto

Permite atualizar um produto existente a partir do ID:

- Nome
- Categoria
- Quantidade
- Preço

✔️ Verifica se o ID informado existe  
✔️ Valida os dados antes de salvar as alterações

### 4️⃣ Excluir Produto

Remove um produto do inventário pelo ID:

- Verifica se o produto existe
- Confirma a ação antes da exclusão (opcional)

### 5️⃣ Buscar Produto

Permite buscar um produto:

- Pelo ID
- Pelo nome ou parte do nome

📄 Exibe todas as informações do produto encontrado  
⚠️ Exibe mensagem caso nenhum produto seja localizado

---

## 💾 Persistência de Dados

Os dados do inventário são armazenados automaticamente no arquivo:

```
inventario.json
```

Isso garante que os produtos não sejam perdidos ao encerrar a aplicação.

---

## 🧪 Exemplo de Menu no Terminal

```
1 - Adicionar Produto
2 - Listar Produtos
3 - Atualizar Produto
4 - Excluir Produto
5 - Buscar Produto
0 - Sair
```

---

## 📚 Aprendizados

- Manipulação de dados em JavaScript
- Persistência de dados com arquivos JSON
- Desenvolvimento de aplicações CLI com Node.js
- Validação de entradas do usuário
- Organização lógica do código

---

## 👨‍💻 Autor

**Flavio Serra**  
GitHub: https://github.com/sonyflavio