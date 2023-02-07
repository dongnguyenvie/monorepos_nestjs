> Setup redis for staging env

- password: ldQgnHWjr8ZD0J2Qab

```bash
docker run --name noinghe_redis -d -p 6379:6379 -e REDIS_PASSWORD=ldQgnHWjr8ZD0J2Qab bitnami/redis:latest /opt/bitnami/scripts/redis/run.sh --maxmemory 768M
```

> Setup progres db for staging env

- username: postgres
- password: 8QIBHIOld6t1iwA2aba

```bash
docker run --name noinghe_postgresql -d  -p 5432:5432 -e POSTGRESQL_PASSWORD=8QIBHIOld6t1iwA2aba bitnami/postgresql:14
```
