# Unipass - Sistema de Check-in para Academias

Unipass é um sistema MVP completo para check-in em academias, similar ao Gympass/TotalPass, desenvolvido com React + TypeScript no frontend e FastAPI + SQLite no backend.

## 🚀 Características

- **Frontend Responsivo**: React + TypeScript + Tailwind CSS
- **Backend Robusto**: FastAPI + SQLite com arquitetura modular
- **Check-in/Check-out**: Sistema completo de entrada e saída
- **Busca de Academias**: Localização por proximidade e busca por nome
- **Perfil do Usuário**: Histórico de check-ins e estatísticas
- **Perfil das Academias**: Informações detalhadas, ocupação em tempo real
- **Autenticação**: Sistema completo de login/registro com JWT
- **Mobile-First**: 100% responsivo para dispositivos móveis

## 📁 Estrutura do Projeto

```
unipass/
├── frontend/                 # React + TypeScript + Tailwind
│   ├── src/
│   │   ├── components/      # Componentes reutilizáveis
│   │   │   ├── Logo.tsx     # Logo elegante do Unipass
│   │   │   └── Navbar.tsx   # Navegação responsiva
│   │   ├── pages/           # Páginas da aplicação
│   │   │   ├── Homepage.tsx      # Página inicial
│   │   │   ├── LoginPage.tsx     # Login de usuários
│   │   │   ├── RegisterPage.tsx  # Cadastro de usuários
│   │   │   ├── CheckInPage.tsx   # Check-in com QR code e busca
│   │   │   ├── UserProfile.tsx   # Perfil e histórico do usuário
│   │   │   └── GymProfile.tsx    # Detalhes da academia
│   │   ├── App.tsx          # Componente principal
│   │   └── index.tsx        # Ponto de entrada
│   ├── public/
│   └── package.json
│
├── backend/                  # FastAPI + SQLite
│   ├── database/            # Configuração do banco
│   │   └── connection.py    # Conexão e inicialização
│   ├── models/              # Modelos do banco de dados
│   │   ├── user.py          # Modelo de usuário
│   │   ├── gym.py           # Modelo de academia
│   │   └── checkin.py       # Modelo de check-in
│   ├── schemas/             # Schemas Pydantic
│   │   ├── user.py          # Schemas de usuário
│   │   ├── gym.py           # Schemas de academia
│   │   └── checkin.py       # Schemas de check-in
│   ├── routes/              # Rotas da API
│   │   ├── auth.py          # Autenticação (login/registro)
│   │   ├── users.py         # Gestão de usuários
│   │   ├── gyms.py          # Gestão de academias
│   │   └── checkins.py      # Sistema de check-in/out
│   ├── utils/               # Utilitários
│   │   ├── auth.py          # Autenticação JWT
│   │   └── config.py        # Configurações
│   ├── scripts/             # Scripts de manutenção
│   │   ├── init_db.py       # Inicialização do banco
│   │   └── db_maintenance.py # Manutenção do banco
│   ├── main.py              # Aplicação principal FastAPI
│   └── requirements.txt     # Dependências Python
│
└── package.json             # Scripts principais do projeto
```

## 🛠️ Tecnologias Utilizadas

### Frontend
- **React 18** - Biblioteca para interfaces
- **TypeScript** - Tipagem estática
- **Tailwind CSS** - Framework CSS utilitário
- **React Router** - Navegação
- **Lucide React** - Ícones
- **Axios** - Cliente HTTP

### Backend
- **FastAPI** - Framework web moderno
- **SQLAlchemy** - ORM para banco de dados
- **SQLite** - Banco de dados
- **Pydantic** - Validação de dados
- **José** - JWT para autenticação
- **Passlib** - Hash de senhas
- **Uvicorn** - Servidor ASGI

## 🚀 Como Executar

### Pré-requisitos
- Node.js 16+
- Python 3.8+
- npm ou yarn

### 1. Instalação das Dependências

```bash
# Instalar dependências do frontend
cd frontend
npm install

# Instalar dependências do backend
cd ../backend
pip install -r requirements.txt
```

### 2. Inicialização do Banco de Dados

```bash
# Inicializar banco com dados de exemplo
npm run init-db
```

### 3. Executar o Projeto

```bash
# Opção 1: Frontend apenas (porta 3000)
npm run dev

# Opção 2: Backend apenas (porta 8000)
npm run dev:backend

# Opção 3: Ambos simultaneamente
npm run dev & npm run dev:backend
```

### 4. Acessar a Aplicação

- **Frontend**: http://localhost:3000
- **Backend API**: http://localhost:8000
- **Documentação da API**: http://localhost:8000/docs

## 📱 Funcionalidades Implementadas

### ✅ Páginas Principais
- [x] Homepage com design moderno e responsivo
- [x] Sistema de login/registro completo
- [x] Página de check-in com QR code e busca
- [x] Perfil do usuário com histórico e estatísticas
- [x] Perfil detalhado das academias

### ✅ Sistema de Check-in
- [x] Check-in por QR code (simulado)
- [x] Check-in por busca de academia
- [x] Visualização de academias próximas
- [x] Controle de ocupação em tempo real
- [x] Check-out automático após 4 horas

### ✅ Backend Completo
- [x] API RESTful com FastAPI
- [x] Autenticação JWT
- [x] CRUD completo para usuários e academias
- [x] Sistema de check-in/out com validações
- [x] Busca de academias por proximidade
- [x] Scripts de manutenção do banco

### ✅ Responsividade
- [x] Design mobile-first
- [x] 100% largura e altura em dispositivos móveis
- [x] Navegação adaptativa
- [x] Cards e formulários responsivos

## 🗄️ Banco de Dados

O sistema utiliza SQLite com as seguintes tabelas:

- **users**: Usuários do sistema
- **gyms**: Academias parceiras
- **checkins**: Histórico de check-ins

### Dados de Exemplo

O banco é inicializado com:
- 3 academias de exemplo
- 1 usuário de teste
- Dados realistas para demonstração

## 🔧 Scripts Úteis

```bash
# Inicializar banco de dados
npm run init-db

# Manutenção do banco (limpeza de check-ins antigos)
npm run db-maintenance

# Forçar check-out de sessões presas
npm run db-maintenance -- --force-checkout

# Resetar ocupação das academias (emergência)
npm run db-maintenance -- --reset-occupancy
```

## 🎨 Design System

O projeto utiliza um design system customizado baseado em:

- **Cores Primárias**: Azul (#0ea5e9) e derivados
- **Cores Accent**: Amarelo/Dourado (#eab308) para destaques
- **Typography**: Inter font family
- **Espaçamentos**: Sistema de 4px base
- **Componentes**: Cards, botões e inputs padronizados

## 🚀 Próximos Passos

Este é um MVP funcional. Para produção, considere:

1. **Segurança**:
   - Implementar HTTPS
   - Usar variáveis de ambiente para secrets
   - Adicionar rate limiting

2. **Funcionalidades**:
   - Sistema de pagamentos
   - Notificações push
   - Chat de suporte
   - Programa de pontos/fidelidade

3. **Performance**:
   - Cache Redis
   - CDN para assets
   - Otimização de imagens

4. **Monitoramento**:
   - Logs estruturados
   - Métricas de performance
   - Error tracking

## 📄 Licença

Este projeto foi desenvolvido como MVP para demonstração. Use conforme necessário.

---

**Unipass** - Sua academia em qualquer lugar! 🏋️‍♂️
