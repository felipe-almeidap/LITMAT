LITMAT LMS - Plataforma de Aprendizagem e Gestao Educacional

Uma plataforma de aprendizagem (LMS) interativa voltada para estudantes do Ensino Medio e pre-vestibulandos. O projeto foca em arquitetura limpa client-side, ergonomia visual e gestao de estado de autenticacao em Vanilla JS.

Design System (Regra 60/30/10)

A interface aplica a regra de design 60/30/10 para garantir legibilidade e conforto visual:

60% Dominante (Fundo): #F4F6F8 (Off-White) - Base limpa para area de descanso visual.

30% Estrutura (Tipografia e Contornos): #106EBE (Azul Profundo) - Utilizado na hierarquia visual, headers e titulos.

10% Acento / Destaque (Call to Action): #0FFCBE (Verde Menta) - Aplicado estritamente nos botoes de acao principal (.btn-cta).

Arquitetura e Funcionalidades

1. Autenticacao e Sessao (Auth Flow)

Alternancia de interface entre telas de Login e Cadastro sem recarregar a pagina.

Validacao client-side com sanitizacao de dados e checagem de campos.

Persistencia de usuarios via Web Storage API (localStorage) utilizando e-mail como chave de identificacao.

Protecao de rotas (Route Guarding): bloqueio de acesso direto ao dashboard (cursos.html) sem autenticacao previa.

Controle de sessao ativa e rotina de encerramento seguro (Logout).

2. Dashboard do Estudante

Exibicao dinamica do nome do usuario logado.

Grid de cursos responsivo construido com CSS Grid e Flexbox.

3. Modulos Curriculares (Matematica e Literatura)

Paginas estruturadas para ementas de cursos, divididas por modulos de estudo e carga horaria.

Tecnologias Utilizadas

HTML5 Semantico

CSS3 (Variaveis CSS, Flexbox, CSS Grid)

JavaScript ES6+ (DOM Manipulation, FormData API, localStorage, Event Handling)

Estrutura de Arquivos

front/
├── index.html            # Landing page da plataforma
├── login.html            # Modulo de Login e Cadastro
├── cursos.html           # Dashboard do aluno (Rota Protegida)
├── curso.matematica.html # Ementa e aulas de Matematica
├── curso.literatura.html # Ementa e aulas de Literatura
├── style.css             # Estilos globais
├── script.js             # Logica de validacao e autenticacao
└── cursos.js             # Gestao do Dashboard e protecao de rota

Como Executar

Clone o repositorio:
git clone https://github.com/seu-usuario/litmat-lms.git

Navegue ate a pasta do projeto:
cd litmat-lms/front

Abra o arquivo login.html no seu navegador.

Autor

Felipe Almeida
Desenvolvedor Web
