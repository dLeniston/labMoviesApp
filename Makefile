build_image:
		cd ./build/ \
		&& docker build -t movies-app-image -f Dockerfile .

run:
		cd ./build/ \
		&& docker-compose up --remove-orphans --force-recreate

cleanup:
		cd ./build/ \
		docker-compose -f docker-compose-test.yml down --rmi local -v --remove-orphans;
