build_image:
		cd ./build/ \
		&& docker build -t movies-app-image -f Dockerfile .

run_storybook:
		cd ./build/ \
		&& docker-compose -f docker-compose-story.yml up --force-recreate -d

run_dev:
		cd ./build/ \
		&& docker-compose -f docker-compose-dev.yml up --force-recreate -d

run_integrated:
		cd ./build/ \
		&& docker-compose -f docker-compose-movies-api.yml up --force-recreate -d

cleanup_storybook:
		cd ./build/ \
		docker-compose -f docker-compose-story.yml down --rmi local -v --remove-orphans;

cleanup_dev:
		cd ./build/ \
		docker-compose -f docker-compose-dev.yml down --rmi local -v --remove-orphans;
