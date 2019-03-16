migrate-db:
	docker-compose -f docker-compose.yml run --rm django python manage.py makemigrations

upgrade-db:
	docker-compose -f docker-compose.yml run --rm django python manage.py migrate

dev:
	docker-compose -f docker-compose.yml up

test:
	docker-compose -f docker-compose.yml run --rm django python manage.py test

shell:
	docker-compose -f docker-compose.yml run --rm django python manage.py shell

superuser:
	docker-compose -f docker-compose.yml run --rm django python manage.py createsuperuser --email admin@example.com --username admin

clean-db:
	set -a && source .env && docker-compose -f docker-compose.yml down && docker volume rm --force $$DOCKER_DB_VOLUME
