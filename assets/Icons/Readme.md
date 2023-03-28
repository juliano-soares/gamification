
## Backend

### Tabelas:

| Nome     | Descrição      |
| -------- | -------------- |
| Event    | List of events |
| User     | List of users  |
| Presença | List of users  |
|          |

> User
| Collumn   | Type         |
| --------- | ------------ |
| Id        | uuid         |
| name      | varchar(180) |
| username  | varchar(25)  |
| email     | varchar(180) |
| phone     | varchar(11)  |
| matricula | number       |
| urlavatar | string       |
| urlQRCode | string       |
| isPresent | bool         |
| score     | number       |

> Presença
| Collumn    | Type     |
| ---------- | -------- |
| Id         | uuid     |
| rfk_User   | uuid     |
| rfk_event  | uuid     |
| start_time | DateTime |
| end_time   | DateTime |
| score      | number   |

> Notificações
| Collumn    | Type     |
| ---------- | -------- |
| Id         | uuid     |
| rfk_User   | uuid     |
| rfk_event  | uuid     |
| start_time | DateTime |
| end_time   | DateTime |
| score      | number   |

> badges
| Collumn   | Type    |
| --------- | ------- |
| Id        | uuid    |
| rfk_User  | uuid    |
| rfk_event | uuid    |
| url_badge | varchar |

> Evento
| Collumn       | Type     |
| ------------- | -------- |
| Id            | uuid     |
| title         | string   |
| description   | string   |
| rfk_presenter | uuid     |
| start_time    | DateTime |
| end_time      | DateTime |
| isActive      | bool     |

> Anexos
| Collumn    | Type   |
| ---------- | ------ |
| rfk_evento | uuid   |
| rfk_user   | uuid   |
| url_anexo  | string |

> Responsavel
| Collumn   | Type   |
| --------- | ------ |
| Id        | uuid   |
| rfk_User  | uuid   |
| rfk_event | uuid   |
| código    | string |

> Avaliações
| Collumn   | Type   |
| --------- | ------ |
| Id        | uuid   |
| rfk_User  | uuid   |
| rfk_event | uuid   |
| stars     | number |
| message   | number |

### API
> Administrador
  - Inserir um usuário
  - Inserir vários usuários a partir de um excel
  - Ao inserir um usuário gerar QR Code
  - Listar palestras
  - Listar presenças
  - Gerar certificados
  - Gerar lista de presença no evento
  - Gerar lista de presença por palestra
  - Inserção por excel
  - Imprimir crachás
> Palestrante/Apresentador
  - Cadastrar/Editar/Remover sua palestra
  - Adicionar e remover anexos
  - Adicionar e remover co-autores
  - Adicionar e remover redes sociais
> Usuário/Participante
  - Cadastrar/Editar/Remover/Visualizar seu Perfil
  - Adicionar/Listar/Remove suas Notificações
  - ver sua pontuação/classificação
  - ver perfil de outras pessoas e segui-las
  - Gerar minhas presenças
> Notificações
  - Vai rodar um cron a cada 72h para remover do banco notificações já expiradas

Tipos de Pontuação
> Presença de chegada no evento geral = +50
> Presença em sessões técnicas, minicursos, workshops e palestras = +20
> Perguntas durante uma sessões técnica, minicurso, workshop e palestra = +50
> Conexões no Linkedin/Redes Sociais = +20
> Avaliações das sessões = +20