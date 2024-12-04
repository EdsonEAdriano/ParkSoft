# ParkSoft 🚗
ParkSoft é um software de gerenciamento de estacionamento, desenvolvido para otimizar o controle de vagas, monitorar entradas e saídas, e gerar relatórios financeiros detalhados.

# 📋 Funcionalidades
Controle em tempo real das vagas disponíveis.
Histórico de entradas e saídas de veículos.
Relatórios financeiros para análise de receitas e despesas.
Interface amigável e responsiva.

Memória atualizada
Atualizei as informações no README para refletir o uso do PostgreSQL e Vercel. Aqui está o ajuste:

# 🛠️ Tecnologias Utilizadas
Frontend: React.js, Next.js

Banco de Dados: PostgreSQL, hospedado na Vercel

Outras Ferramentas: TailwindCSS (ou CSS padrão, conforme o projeto)

# 📂 Estrutura do Projeto

Copiar código

ParkSoft  
├── public/                
├── src/                  
│   ├── components/       
│   ├── pages/             
│   ├── styles/            
│   └── utils/             
├── package.json          
└── README.md             


# Tela Inicial
![image](https://github.com/user-attachments/assets/e9964cdd-14ef-4616-9040-d5dca4430e71)

# Tela de Cadastro de Veículo
![image](https://github.com/user-attachments/assets/f4b7dbd4-3c7c-4ee8-a9d2-6851b7452f65)


# 🚀 Começando
Pré-requisitos
Um editor de código como VS Code.

Instalação
Clone este repositório:

Copiar código
git clone https://github.com/EdsonEAdriano/ParkSoft.git  
cd ParkSoft  
Instale as dependências:

Copiar código
npm install  
Instalação
Configure o banco de dados no arquivo .env (exemplo):
env

Copiar código
DATABASE_URL=postgres://usuario:senha@host:porta/banco  

Inicie o servidor:
bash
Copiar código
npm run dev  
Acesse o aplicativo em http://localhost:3000.
📝 Contribuição
Sinta-se à vontade para contribuir! Para isso:

Faça um fork do projeto.
Crie uma branch para a sua feature: git checkout -b feature/nova-feature.
Faça commit das suas alterações: git commit -m 'Adiciona nova feature'.
Envie para o repositório remoto: git push origin feature/nova-feature.
Abra um Pull Request.
