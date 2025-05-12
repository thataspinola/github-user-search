# GitHub User Search App

Aplicação frontend para busca de usuários e repositórios do GitHub, construída com React e hospedada na AWS S3.

> ⚠️ Este projeto foi desenvolvido como parte de um processo seletivo, sem qualquer menção ou referência à empresa responsável.

---

## ✨ Funcionalidades

- Busca de usuários do GitHub
- Exibição de informações do perfil (avatar, bio, seguidores, etc.)
- Listagem de repositórios do usuário
- Filtro e ordenação por nome e quantidade de estrelas
- Página de detalhes de cada repositório
- Acessível por rota pública na AWS
- Testes unitários com Vitest + React Testing Library

---

## 🚀 Como rodar localmente

### 1. Clone o repositório

```bash
git clone https://github.com/thataspinola/github-user-search
cd seu-repo
````

### 2. Instale as dependências

```bash
npm install
```

### 3. Rode o projeto

```bash
npm run dev
```

Acesse em: [http://localhost:5173](http://localhost:5173)

---

## 🧪 Testes

Este projeto utiliza **Vitest**, **React Testing Library** e **jsdom**.

### Rodar os testes unitários

```bash
npm run test
```

Os testes cobrem:

- Página de busca (Home)
- Página de resultados (`Results`)
- Página de detalhes do repositório (`RepoDetails`)
- Casos de sucesso, erro e ordenação

---

## 🛠️ Build para produção

```bash
npm run build
```

Os arquivos otimizados ficarão na pasta `dist/`.

---

## ☁️ Deploy na AWS S3 (manual)

### Pré-requisitos

- AWS CLI instalado e configurado (`aws configure`)
- Bucket S3 criado e com acesso público habilitado
- Política pública aplicada

### Passo a passo

1. Crie o bucket:

```bash
aws s3 mb s3://github-user-search-thamis --region sa-east-1
```

2. Ative o modo de hospedagem:

```bash
aws s3 website s3://github-user-search-thamis --index-document index.html --error-document index.html
```

3. Torne o bucket público (arquivo `public-policy.json`):

```json
{
  "Version": "2012-10-17",
  "Statement": [
    {
      "Sid": "PublicReadGetObject",
      "Effect": "Allow",
      "Principal": "*",
      "Action": "s3:GetObject",
      "Resource": "arn:aws:s3:::github-user-search-thamis/*"
    }
  ]
}
```

```bash
aws s3api put-bucket-policy \
  --bucket github-user-search-thamis \
  --policy file://public-policy.json
```

4. Envie os arquivos do build:

```bash
npm run build
aws s3 sync dist/ s3://github-user-search-thamis --delete
```

5. Acesse pela URL:

```
http://github-user-search-thamis.s3-website-sa-east-1.amazonaws.com
```

---

## 🧱 Tecnologias usadas

- [React](https://reactjs.org/)
- [Sass](https://sass-lang.com/)
- [Vite](https://vitejs.dev/)
- [React Router](https://reactrouter.com/)
- [React Testing Library](https://testing-library.com/docs/react-testing-library/intro/)
- [Vitest](https://vitest.dev/)
- [AWS S3](https://aws.amazon.com/s3/)
- [GitHub REST API](https://docs.github.com/en/rest)

---

## 📁 Estrutura de diretórios

``` bash
src/
├─ assets/             # Imagens, ícones, etc
├─ components/         # Componentes reutilizáveis
├─ pages/              # Home, Results, RepoDetails
│  ├─ __tests__/       # Testes por página
├─ styles/             # Estilos globais em SCSS
├─ App.jsx             # Rotas
└─ main.jsx            # Ponto de entrada
```

---

## ♿ Acessibilidade e performance

- HTML semântico (uso adequado de `<main>`, `<section>`, `<label>`)
- Feedback de carregamento e erro
- Títulos e descrições claras
- Compatível com navegação por teclado

---

## 🔗 Deploy

Aplicação disponível em:
➡️ [http://github-user-search-thamis.s3-website-sa-east-1.amazonaws.com](http://github-user-search-thamis.s3-website-sa-east-1.amazonaws.com)

---

## 📌 Autor

Desenvolvido por \[Thamiris Gaspar].
Entre em contato: \[[thamiris_cristina_962@hotmail.com](mailto:thamiris_cristina_962@hotmail.com)]
