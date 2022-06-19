.PHONY: install
install: node_modules package.json
	docker-compose run node npm install

.PHONY: dev
start:
	docker-compose run --service-ports node npm run start

.PHONY: dev
build:
	docker-compose run --service-ports node npm run build

.PHONY: dev
test:
	docker-compose run --service-ports node npm run test

.PHONY: sh
sh:
	docker-compose exec node sh
