# API Oasis - Backend

Este repositório contém a API **Oasis** construída com **GraphQL**, **Express** e **TypeScript**. Ele oferece funcionalidades de autenticação, CRUD para posts e comentários, e busca de conteúdo. A API utiliza **JWT** para autenticação de usuários e o banco de dados **PostgreSQL** hospedado no **Supabase**.

## 🛠️ Tecnologias Usadas

- **Express**: Framework para construção de APIs web.
- **GraphQL**: Para manipulação de dados de forma eficiente.
- **TypeScript**: Superset do JavaScript com tipagem estática.
- **Supabase**: Banco de dados PostgreSQL hospedado.
- **Apollo Client**: Para consultas e mutações GraphQL no frontend.
- **JWT (JSON Web Tokens)**: Para autenticação de usuários.

## 🚀 Funcionalidades

- **Autenticação (JWT)**: Usuários podem se registrar e fazer login utilizando JWT.
- **CRUD de Posts**: Criação, leitura, atualização e exclusão de posts.
- **CRUD de Comentários**: Criação, leitura, aprovação e exclusão de comentários.
- **Busca de Posts**: Busca de posts por título ou categoria.
- **Autorização de Usuários**: Somente usuários autenticados podem interagir com posts e comentários.

## 📦 Como Começar

### 1. Clone o Repositório

Clone o repositório para sua máquina local:

git clone https://github.com/usuario/nome-do-repositorio-api.git

### 2. Instale as Dependências

Dentro do diretório do projeto, instale as dependências com o seguinte comando:

npm install

### 3. Configuração do Ambiente

Crie um arquivo `.env` na raiz do projeto e adicione as seguintes variáveis de ambiente:

JWT_SECRET=your-super-secret-key-change-this-in-production
PORT=4000
DATABASE_URL=postgresql://postgres:210697EfrArthurts2208@db.fewfbjeyscczhvrebovg.supabase.co:5432/postgres

### 4. Inicie o Servidor

Após a configuração, execute o servidor localmente:

npm run dev

A API estará rodando em http://localhost:4000.

## 📋 Consultas e Mutações GraphQL

A API oferece as seguintes mutações e consultas GraphQL:

### 📝 Mutações

#### 1. **Registrar Usuário**

mutation Register($data: RegisterInput!) {
  register(data: $data) {
    user {
      id
      email
      name
    }
    token
  }
}

#### 2. **Login de Usuário**

mutation Login($data: LoginInput!) {
  login(data: $data) {
    user {
      id
      email
      name
    }
    token
  }
}

#### 3. **Criar Post**

mutation CreatePost($data: CreatePostInput!) {
  createPost(data: $data) {
    id
    title
    content
    category
    published
  }
}

#### 4. **Atualizar Post**

mutation UpdatePost($id: String!, $data: UpdatePostInput!) {
  updatePost(id: $id, data: $data) {
    id
    title
    content
    category
    published
  }
}

#### 5. **Deletar Post**

mutation DeletePost($id: String!) {
  deletePost(id: $id)
}

#### 6. **Criar Comentário**

mutation CreateComment($data: CreateCommentInput!) {
  createComment(data: $data) {
    id
    content
    approved
    author {
      id
      name
    }
  }
}

#### 7. **Aprovar Comentário**

mutation ApproveComment($id: Float!) {
  approveComment(id: $id) {
    id
    content
    approved
  }
}

### 📄 Consultas

#### 1. **Listar Posts**

query GetPosts($data: PaginationInput) {
  posts(data: $data) {
    id
    title
    content
    category
    published
    author {
      id
      name
    }
    createdAt
  }
}

#### 2. **Listar Posts por Categoria**

query GetPostsByCategory($category: Category!) {
  postsByCategory(category: $category) {
    id
    title
    content
    category
    authorId
    createdAt
    author {
      id
      name
    }
  }
}

#### 3. **Obter Post por ID**

query GetPost($id: String!) {
  post(id: $id) {
    id
    title
    content
    category
    published
    author {
      id
      name
    }
    comments {
      id
      content
      approved
      author {
        id
        name
      }
    }
    createdAt
  }
}

#### 4. **Listar Comentários de um Post**

query GetComments($postId: String!) {
  comments(postId: $postId) {
    id
    content
    approved
    author {
      id
      name
    }
    createdAt
  }
}

#### 5. **Buscar Post por Título ou Categoria**

query SearchPosts($data: SearchPostInput!) {
  searchPosts(data: $data) {
    id
    title
    content
    category
    authorId
    createdAt
    updatedAt
    author {
      id
      name
      email
    }
  }
}

#### 6. **Obter Perfil do Usuário**

query Me {
  me {
    id
    email
    name
    posts {
      id
      title
      category
    }
    comments {
      id
      content
      approved
    }
  }
}

## 📦 Variáveis de Ambiente

- **JWT_SECRET**: Chave secreta para assinatura de tokens JWT.
- **PORT**: Porta em que o servidor ficará disponível (padrão: 4000).
- **DATABASE_URL**: URL de conexão com o banco de dados PostgreSQL no Supabase.
