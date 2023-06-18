### Yandex cloud docker-compose VM settings  
```
version: "3.9"

services:
client:
container_name: prakticum-client
image: ghcr.io/brilliant-hamsters/quiz-game/client:e270f294ebea7796e9027cf80e7b468a58993e1e
build:
context: .
dockerfile: Dockerfile.client
args:
CLIENT_PORT: 3000
restart: always
ports:
- "3000:80"
environment:
- CLIENT_PORT=3000
- SERVER_PORT=3001
server:
container_name: prakticum-server
image: ghcr.io/brilliant-hamsters/quiz-game/server:e270f294ebea7796e9027cf80e7b468a58993e1e
build:
context: .
dockerfile: Dockerfile.server
args:
SERVER_PORT: 3001
restart: always
depends_on:
- postgres
ports:
- "3001:3001"
environment:
SERVER_PORT: 3001
POSTGRES_USER: root
POSTGRES_PASSWORD: rootpassword
POSTGRES_DB: quizgamedb
DATABASE_URL: postgres://root:rootpassword@postgres:5432/quizgamedb
networks:
- quizgame
postgres:
container_name: postgres
image: postgres:14
ports:
- "5432:5432"
environment:
POSTGRES_USER: root
POSTGRES_PASSWORD: rootpassword
POSTGRES_DB: quizgamedb
PGADMIN_DEFAULT_EMAIL: root@root.ru
PGADMIN_DEFAULT_PASSWORD: rootpassword
restart: always
volumes:
- ./tmp/pgdata:/var/lib/postgresql/data
networks:
- quizgame
pgadmin:
container_name: pgadmin
image: dpage/pgadmin4:4.18
restart: always
environment:
PGADMIN_DEFAULT_EMAIL: root@root.ru
PGADMIN_DEFAULT_PASSWORD: rootpassword
PGADMIN_LISTEN_PORT: 8080
ports:
- "8080:80"
volumes:
- pgadmin-data:/var/lib/pgadmin
depends_on:
- postgres
networks:
- quizgame

volumes:
postgres-data:
external: false
pgadmin-data:
external: false

networks:
quizgame:
driver: bridge
```