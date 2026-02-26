# 📦 Sistema de Gestão de Categorias - Angular CRUD

![Angular](https://img.shields.io/badge/angular-%23DD0031.svg?style=for-the-badge&logo=angular&logoColor=white)
![Material UI](https://img.shields.io/badge/Material--UI-0081CB?style=for-the-badge&logo=material-ui&logoColor=white)
![.Net](https://img.shields.io/badge/.NET-512BD4?style=for-the-badge&logo=dotnet&logoColor=white)
![Windows 11](https://img.shields.io/badge/Windows%2011-0078D4?style=for-the-badge&logo=windows-11&logoColor=white)

Este é um projeto de **Gestão de Categorias** (Catálogo) desenvolvido para fins de portfólio, integrando um frontend moderno em Angular com uma API robusta em .NET. O foco principal foi a implementação de um fluxo de trabalho completo de CRUD (Create, Read, Update, Delete) com uma interface limpa e responsiva.

## 🚀 Funcionalidades

- **Dashboard Administrativo:** Visualização rápida dos itens.
- **CRUD Completo:** Criação, edição, visualização e eliminação de categorias.
- **Autenticação:** Sistema de Login e Logout com proteção de rotas (AuthGuard).
- **Interface Angular Material:** Uso de componentes como tabelas, botões e campos de input estilizados.
- **Integração API:** Consumo de serviços RESTful através do `HttpClient`.

## 🛠️ Tecnologias e Ferramentas

- **Frontend:** [Angular](https://angular.io/) (com TypeScript)
- **UI Framework:** [Angular Material](https://material.angular.io/)
- **Linguagem:** TypeScript / SCSS
- **Versionamento:** Git & GitHub
- **SO de Desenvolvimento:** Windows 11 (24H2)

## 📁 Estrutura do Projeto (Principais Componentes)

- `categorias/`: Listagem principal das categorias.
- `categoria-nova/`: Formulário para adição de novos registos.
- `categoria-editar/`: Interface para modificação de dados existentes.
- `login/` & `logout/`: Gestão de sessão do utilizador.
- `services/api.service.ts`: Camada de comunicação com o backend .NET.

## 🔧 Como Executar Localmente

1. **Clonar o Repositório:**
   ```powershell
   git clone [https://github.com/alex247417/categorias-angular.git](https://github.com/alex247417/categorias-angular.git)
Instalar Dependências:

PowerShell
npm install
Executar a Aplicação:

PowerShell
ng serve
Aceda a http://localhost:4200 no seu browser.

Desenvolvido por Alecsandro
