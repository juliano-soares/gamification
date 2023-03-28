
## Backend

### Tabelas:
> User - OK

| Collumn                   | Type         |
| ------------------------- | ------------ |
| id                        | uuid         |
| username                  | varchar(180) |
| name                      | varchar(180) |
| email                     | varchar(180) |
| password                  | varchar      |
| role                      | varchar(20)  |
| phone                     | varchar(11)  |
| avatar                    | string       |
| bio                       | string       |
| location                  | string       |
| gender                    | string       |
| qrcode                    | string       |
| linkedin                  | varchar(180) |
| github                    | varchar(180) |
| created_at                | datetime     |
| updated_at                | datetime     |
| last_login                | datetime     |
| password_reset_token      | string       |
| password_reset_expires_in | datetime     |

> Presença

| Collumn    | Type |
| ---------- | ---- |
| id         | uuid |
| rfk_User   | uuid |
| rfk_event  | uuid |
| created_at | date |

> Scores Daily

| Collumn    | Type   |
| ---------- | ------ |
| id         | uuid   |
| score      | number |
| rfk_User   | uuid   |
| rfk_event  | uuid   |
| created_at | date   |

> Scores Total

| Collumn    | Type   |
| ---------- | ------ |
| id         | uuid   |
| score      | number |
| rfk_User   | uuid   |
| rfk_event  | uuid   |
| created_at | date   |
| updated_at | date   |

> Ativar Notificações

| Collumn    | Type |
| ---------- | ---- |
| Id         | uuid |
| rfk_User   | uuid |
| rfk_event  | uuid |
| created_at | date |

> badge_user

| Collumn    | Type |
| ---------- | ---- |
| Id         | uuid |
| rfk_User   | uuid |
| rfk_event  | uuid |
| rfk_Badge  | uuid |
| created_at | date |

> badge

| Collumn    | Type   |
| ---------- | ------ |
| Id         | uuid   |
| url_bagde  | string |
| rfk_event  | uuid   |
| created_at | date   |
| updated_at | date   |

> Evento

| Collumn     | Type     |
| ----------- | -------- |
| Id          | uuid     |
| title       | string   |
| description | string   |
| start_time  | DateTime |
| end_time    | DateTime |
| QRCode      | varchar  |
| isActive    | bool     |
| rfk_badge   | uuid     |
| created_at  | date     |
| updated_at  | date     |

> Palestrantes

| Collumn    | Type |
| ---------- | ---- |
| Id         | uuid |
| rfk_evento | uuid |
| rfk_user   | uuid |
| type       | uuid |
| created_at | date |

> Anexos

| Collumn    | Type   |
| ---------- | ------ |
| Id         | uuid   |
| rfk_evento | uuid   |
| url_anexo  | string |
| created_at | date   |

> Avaliações

| Collumn    | Type   |
| ---------- | ------ |
| Id         | uuid   |
| rfk_User   | uuid   |
| rfk_event  | uuid   |
| stars      | number |
| message    | number |
| created_at | date   |
| updated_at | date   |

> Refresh Token - OK

| Collumn     | Type   |
| ----------- | ------ |
| Id          | uuid   |
| expires_in  | string |
| rfk_User_id | uuid   |
| created_at  | date   |



### API
> Usuário/Participante
  - [X] Cadastrar Perfil - Rota POST = /user
  - [X] Visualizar seu Perfil - Rota GET = /user/:id
  - [X] Listar Todos Perfils - Rota GET = /user
  - [X] Buscar por username - 
  - [X] Buscar por e-mail
  - [ ] Remover Perfil - Rota DELETE = /user/:id
  - [ ] Editar Perfil - Rota PUT = /user/:id
  - [ ] Editar somente o Avatar - Rota PUT = /user/:id 
  - [ ] Adicionar Notificacoes
  - [ ] Listar Notificacoes ativas
  - [ ] Remove suas Notificações
  - [ ] ver sua pontuação
  - [ ] Ver sua classificação
  - [ ] ver perfil de outras pessoas
  - [ ] Seguir pessoas segui-las
  - [ ] Gerar minhas presenças
> Administrador
  - [ ] Login
  - [ ] Listar palestras - Ativas, Desativadas
  - [ ] Buscar informações Palestra
  - [ ] Listar presenças
  - [ ] Gerar certificados
  - [ ] Gerar lista de presença no evento
  - [ ] Gerar lista de presença por palestra
  - [ ] Imprimir crachás
  - [ ] Inserir vários usuários a partir de um excel
> Palestrante/Apresentador
  - [ ] Cadastrar/Editar/Remover sua palestra
  - [ ] Adicionar e remover anexos
  - [ ] Adicionar e remover co-autores
  - [ ] Adicionar e remover redes sociais
> Notificações
  - [ ] Vai rodar um cron a cada 48h para remover do banco notificações já expiradas
> Geral
  - [X] Login - Rota POST = /login
  - [X] Token e RefreshToken - Rota POST = /refresh-token

Tipos de Pontuação
> Presença de chegada no evento geral = +50
> Presença em sessões técnicas, minicursos, workshops e palestras = +20
> Perguntas durante uma sessões técnica, minicurso, workshop e palestra = +50
> Conexões no Linkedin/Redes Sociais = +20
> Avaliações das sessões = +20
> Fazer perguntas = +20
