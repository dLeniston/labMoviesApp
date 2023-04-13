# Enterprise Web Development - Assignment 1.

__Name:__ Darren Leniston

+ Deployed App: [https://lab-movies-app-livid.vercel.app/](https://lab-movies-app-livid.vercel.app/)

## Overview.

+ User Favourites
+ User Watchlist 
+ Pagination for Discover and Upcoming Movies
+ Expanded movie details page (similar movies, video media)
+ Supabase persistence to store user favourites and watchlist items
+ Google Sign In integration 
+ Conditional rendering of routes/components/controls based on user session state
+ MUI Theme and expanded styling of components to give consistent look
+ Deployment to Vercel
+ Dev environment in Docker for Vite app + Storybook
+ Expanded Storybook, including addition of MUI theme

## Feature Design.

#### The Discover Movies feature.

> Lists movies from the Discover movies endpoint of TMDB

![][discover]

#### The Upcoming Movies feature.

> Lists movies from the Upcoming movies endpoint of TMDB

![][upcoming]

#### Pagination

> Lists a large number of movies which can be navigated via pagination controls (Discover & Upcoming)

![][pagination]

#### Movies Reviews feature.

> Lists all the reviews for a particular movie (text extract only) (Scrollable list).

![][review_overview]

> Click the 'Full Review' link of an entry in the above list to show the full text of a review. 

![][full_review]

> Conditional rendering if reviewer has no avatar

![][reviewer_no_avatar]

#### Similar Movies

> Lists all similar/recommended movies for a particular movie (Swipeable list)

![][similar]

> Conditional rendering if none found

![][similar_none]

#### Movie Media

> Lists related media and places it within a playable video component (Swipeable list)

+ Video 1
  
![][video_1]

+ Video 2

![][video_2]

#### User Sessions

> Conditional Rendering on user session for certain routes/components/controls (e.g., Favourites, Watchlist)

![][signed_in_discover]

+ Signed in user favourites

![][signed_in_favs]

+ Signed in user watchlist

![][signed_in_watchlist]

#### Filter Working with Pagination

> Filters update pagination (e.g., Comedy)

![][filters_pagination]

## Storybook.

+ Header

![][storybook_header]

+ Video player

![][video_player]

+ Filter movies card

![][filter_movies_card]

+ Movie card

![][movie_card]

+ Movie list

![][movie_list]

+ Movie page header

![][movie_page_header]

+ Movie details

![][movie_details]

+ Movie header 

![][movie_header]

+ Movie review

![][movie_review]

+ Similar movies

![][similar_movies]

## Authentication.

+ `/movies/favourites` - Users selected favourites
+ `/movies/watchlist` - Users selected upcoming movies to add to watchlists

#### Protected features

Authentication is primarily used in the application to allow signed in users to access the favourites and watchlist functionality. To a non-signed in user, these pages and options do not appear. User authentication is managed with Google Sign In, in tandem with Supabase.

#### Supabase

Supabase has been utilised to store user favourites and watchlist items, and to enable authentication through the "Google" provider.

+ Supabase Tables

![][supabase]

+ Supabase Google provider
  
![][supabase_provider]

## Deployment

Deployment has been achieved with [Vercel](https://vercel.com/) by pulling code directly from GitHub. 

+ Deployment Screen

![][vercel_deployment]

- [https://lab-movies-app-livid.vercel.app/](https://lab-movies-app-livid.vercel.app/)

User will need to sign in with a Google account

## Persistence

User favourites and watchlist items are stored within relevant Supabase tables. Only the users `UUID` and movie `id` are stored, to avoid duplication of data by storing API results returned by TMDB. User account details are stored in the `profiles` table.

+ Profile table

![][profile_table]

+ Favourites table

![][favourites_table]

+ Watchlist table

![][watchlist_table]

## Additional Information.

+ Development leveraged [Docker](https://www.docker.com/products/docker-desktop/) & [Docker Compose](https://docs.docker.com/compose/) to ease deployment locally.

+ Iterative development process followed, GitHub issue tickets, branches and pull requests utilised to develop, test and integrate features. Tagged release created.

[discover]: ./images/discover.png
[favourites_table]: ./images/favourites_table.png
[filter_movies_card]: ./images/filter_movies_card.png
[filters_pagination]: ./images/filters_pagination.png
[full_review]: ./images/full_review.png
[movie_card]: ./images/movie_card.png
[movie_details]: ./images/movie_details.png
[movie_header]: ./images/movie_header.png
[movie_list]: ./images/movie_list.png
[movie_page_header]: ./images/movie_page_header.png
[movie_review]: ./images/movie_review.png
[pagination]: ./images/pagination.png
[profile_table]: ./images/profile_table.png
[review_overview]: ./images/review_overview.png
[reviewer_no_avatar]: ./images/reviewer_no_avatar.png
[signed_in_discover]: ./images/signed_in_discover.png
[signed_in_watchlist]: ./images/signed_in_watchlist.png
[signed_in_favs]: ./images/signed_in_favs.png
[similar_movies]: ./images/similar_movies.png
[similar_none]: ./images/similar_none.png
[similar]: ./images/similar.png
[storybook_header]: ./images/storybook_header.png
[supabase_provider]: ./images/supabase_provider.png
[supabase]: ./images/supabase.png
[upcoming]: ./images/upcoming.png
[vercel_deployment]: ./images/vercel_deployment.png
[video_1]: ./images/video_1.png
[video_2]: ./images/video_2.png
[video_player]: ./images/video_player.png
[watchlist_table]: ./images/watchlist_table.png

## Requirements

In order to deploy the service, the host environment will need the following installed:

- [Docker](https://docs.docker.com/get-docker/)
- [Docker Compose](https://docs.docker.com/compose/install/)
- [GNU Make](https://www.gnu.org/software/make/) Note: this is not strictly required, but will streamline deployment

The following ENV values are required in a `.env` file located in the `app` directory:

- `VITE_TMDB_KEY={your TMDB API key}`
- `VITE_SUPABASE_URL={your SUPABASE url}`
- `VITE_SUPABASE_KEY={your SUPABASE key}`

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