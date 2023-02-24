# labMoviesApp

Repository space for Enterprise Web Development lab exercises

## Requirements

In order to deploy the service, the host environment will need the following installed:

- [Docker](https://docs.docker.com/get-docker/)
- [Docker Compose](https://docs.docker.com/compose/install/)
- [GNU Make](https://www.gnu.org/software/make/) Note: this is not strictly required, but will streamline deployment

## Deployment

### GNU Make

There are two deployment options available currently, an option to deploy a [Storybook](https://storybook.js.org/docs/react/get-started/introduction) server, and a [Vite](https://vitejs.dev/guide/) development server.

The first step is to build the Docker image, from the parent directory, run the command:

> make build_image 

The built image can be confirmed with the command:

> docker images

The relevant image will be named `movies-app-image` as per the below example output:

```console
REPOSITORY                  TAG       IMAGE ID       CREATED       SIZE
movies-app-image            latest    67550183481d   2 hours ago   998MB
```

- Storybook server deployment
  
Once the image has been built, to deploy the Storybook server, use the command:

> make run_storybook

When the deployment is complete, the Storybook container will be running as per the below example:

```console
CONTAINER ID   IMAGE              COMMAND                  CREATED         STATUS        PORTS                                                           NAMES
bcde85db7c13   movies-app-image   "docker-entrypoint.s…"   3 seconds ago   Up 1 second   3000/tcp, 8080/tcp, 0.0.0.0:6006->6006/tcp, :::6006->6006/tcp   build_movies-app-storybook_1
```

The Storybook UI can be reached via web browser at [localhost:6006](http://localhost:6006).

- Vite server deployment
  
The steps for deploying the Vite dev server are similar, use the command:

> make run_dev

When the deployment is complete, the dev container will be running as per the below example:

```console
CONTAINER ID   IMAGE              COMMAND                  CREATED         STATUS         PORTS                                                           NAMES
43d6e699acd7   movies-app-image   "docker-entrypoint.s…"   3 seconds ago   Up 2 seconds   6006/tcp, 0.0.0.0:3000->3000/tcp, :::3000->3000/tcp, 8080/tcp   build_movies-app-dev_1
```

The dev server can be reached via browser at [localhost:3000](http://localhost:3000).

### Docker Compose 

If GNU Make is unavailable on the host machine, the following commands can be used to build the Docker image and deploy the respective servers.

- Building Docker image

From the `build` directory, run the command:

> docker build -t movies-app-image -f Dockerfile .

- Deploying Storybook server

From the `build` directory, run the command:

> docker-compose -f docker-compose-story.yml up --remove-orphans --force-recreate -d

- Deploying Vite dev server

From the `build` directory, run the command:

> docker-compose -f docker-compose-dev.yml up --remove-orphans --force-recreate -d

## Removal

To take down the container, with GNU Make use one of the following commands from the top-level directory, depending on the server type deployed:

> make cleanup_story

**or**

> make cleanup_dev

With Docker Compose, from the `build` directory, use either the command:

> docker-compose -f docker-compose-story.yml down --rmi local -v --remove-orphans

**or**

> docker-compose -f docker-compose-dev.yml down --rmi local -v --remove-orphans