NGINX=reverse-proxy
WEB=test1

BASH=/bin/bash
CONNECT=docker exec -it

start:
	@docker-compose up

build:
	@docker-compose up -d

nginx:
	@$(CONNECT) $(NGINX) $(BASH)

web:
	@$(CONNECT) $(WEB) $(BASH)

stop:
	@docker stop $(NGINX) $(WEB)

clean: stop
	@docker-compose rm -v

cleanAll: clean
	@docker image prune -a

re: clean start

reAll: cleanAll start
