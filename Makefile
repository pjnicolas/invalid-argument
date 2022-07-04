.PHONY: install
install:
	docker-compose run node npm install

.PHONY: dev
start:
	docker-compose run --service-ports node npm run start

.PHONY: build
build:
	docker-compose run --service-ports node npm run build

.PHONY: test
test:
	docker-compose run --service-ports node npm run test

.PHONY: sh
sh:
	docker-compose exec node sh

.PHONY: pack
pack:
	docker-compose run node npm run pack

.PHONY: pack-watch
pack-watch:
	docker-compose run node npm run pack-watch

.PHONY: new
new:
	docker-compose run node bash new.sh
