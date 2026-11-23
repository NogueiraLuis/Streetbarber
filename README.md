# 💈 StreetBarber

Aplicação web full-stack desenvolvida com **Next.js (App Router)**, **React**, **TypeScript**, **CSS** e **Supabase**, voltada para apresentação institucional de barbearia, agendamento online de clientes sem necessidade de login e gerenciamento administrativo para profissionais.

---

## 🚀 Funcionalidades

### Área do Cliente (Pública)

- **Página Inicial (`/`):** Apresentação da barbearia, catálogo de serviços/cortes, galeria de fotos, equipe e localização da unidade.

- **Agendamento Sem Login (`/agendamento`):** Fluxo direto para o cliente escolher profissional, data/horário e informar seus dados para reserva, sem exigir cadastro ou autenticação do cliente.

- **Página Sobre (`/sobre`):** Informações institucionais sobre a barbearia e sua proposta.

### Painel Administrativo (Restrito)

- **Autenticação de Profissionais (`/login`):** Acesso restrito à equipe/administração via **Supabase Auth**.

- **Gestão de Agendamentos (`/admin`):** Visualização de agendamentos, edição de registros por modal e exclusão de reservas.

- **Gestão de Barbeiros (`/admin/barbeiros`):** Cadastro, listagem e gerenciamento de profissionais disponíveis.

- **Interface Responsiva:** Layout adaptado para diferentes resoluções, incluindo menu lateral com menu hambúrguer no mobile e tabelas com rolagem horizontal (`overflow-x`).

---

## 🛠️ Tecnologias Utilizadas

- **Framework Front-end / Full-stack:** Next.js (App Router)
- **Biblioteca de Interface:** React
- **Tipagem Estática:** TypeScript
- **Estilização:** CSS puro e tailwind (`globals.css` e estilos por seção/componente)

- **Banco de Dados e Autenticação:** Supabase (PostgreSQL + Auth)

- **Hospedagem e Deploy:** Vercel

---

## 📂 Estrutura do Projeto

```text
├── app/
│   ├── admin/              # Páginas do painel administrativo (agendamentos, barbeiros)
│   ├── agendamento/        # Página pública de agendamento
│   ├── login/              # Tela de login para profissionais/administradores
│   ├── sobre/              # Página institucional
│   ├── globals.css         # Estilos globais e regras de responsividade
│   ├── layout.tsx          # Layout principal da aplicação
│   └── page.tsx            # Página inicial (Home)
├── components/             # Componentes reutilizáveis (Sidebar, modais, tabelas, etc.)
├── public/                 # Arquivos estáticos e imagens (ex.: logos, fotos da galeria)
└── src/
    ├── lib/                # Configuração do cliente Supabase, dados e utilitários
    └── types/              # Tipagens e interfaces TypeScript
```

---

## 🗄️ Estrutura de Dados (Supabase)

- **`barbeiros`**: Cadastro dos profissionais (`id`, `nome`, entre outros campos configurados no banco).

- **`agendamentos`**: Registros de horários marcados (`id`, `nome_cliente`, `email_cliente`, `barbeiro_id`, `data_hora`, entre outros campos).

---

## ⚙️ Como Rodar Localmente

### 1. Clone o repositório

```bash
git clone https://github.com/SEU-USUARIO/SEU-REPOSITORIO.git
cd SEU-REPOSITORIO
```

### 2. Instale as dependências

```bash
npm install
```

### 3. Configure as variáveis de ambiente

Crie um arquivo `.env.local` na raiz do projeto e preencha com as credenciais do seu projeto no Supabase (encontradas em **Project Settings > API**):

```env
NEXT_PUBLIC_SUPABASE_URL=https://seu-projeto.supabase.co
NEXT_PUBLIC_SUPABASE_ANON_KEY=sua_chave_anon_publica
```

> **Atenção:** Nunca envie o arquivo `.env.local` nem chaves reais para o GitHub ou para documentos compartilhados.

### 4. Execute o servidor de desenvolvimento

```bash
npm run dev
```

Abra [http://localhost:3000](http://localhost:3000) no navegador para visualizar a aplicação.

---

## 🌐 Como Fazer Deploy na Vercel

1. Envie o código atualizado para o seu repositório no **GitHub**.

2. Acesse o painel da **Vercel**, importe o repositório e abra **Settings > Environment Variables**.

3. Cadastre as variáveis obrigatórias antes do build:
   - `NEXT_PUBLIC_SUPABASE_URL` = `[https://seu-projeto.supabase.co](https://seu-projeto.supabase.co)`
   - `NEXT_PUBLIC_SUPABASE_ANON_KEY` = `sua_chave_anon_publica`
4. Selecione os ambientes (**Production**, **Preview**, **Development**) e salve.

5. Caso o build já tenha sido executado antes de adicionar as variáveis, acesse **Deployments** e clique em **Redeploy** no último deploy.

---

## 📝 Observações de Manutenção

- As variáveis `NEXT_PUBLIC_*` são expostas no bundle do cliente pelo Next.js, portanto devem conter apenas a URL do projeto e a chave `anon` pública (com políticas de segurança/RLS configuradas adequadamente no Supabase), nunca chaves administrativas privadas.
