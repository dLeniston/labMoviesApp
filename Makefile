build_image:
		cd ./build/ \
		&& docker build -t movies-app-image -f Dockerfile .

run_storybook:
		cd ./build/ \
		&& docker-compose -f docker-compose-story.yml up --remove-orphans --force-recreate -d

run_dev:
		cd ./build/ \
		&& docker-compose -f docker-compose-dev.yml up --remove-orphans --force-recreate

cleanup:
		cd ./build/ \
		docker-compose -f docker-compose-test.yml down --rmi local -v --remove-orphans;
