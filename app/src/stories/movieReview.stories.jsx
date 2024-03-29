import React from "react";
import MovieReview from "../components/movieReview";
import { QueryClientProvider, QueryClient } from "react-query";
import { MemoryRouter } from "react-router";
import { ThemeProvider, createTheme } from "@mui/material/styles";
import themeStyle from "../theme";
import MoviesContextProvider from "../contexts/moviesContext";

const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      staleTime: 360000,
      refetchInterval: 360000, 
      refetchOnWindowFocus: false
    },
  },
});

const theme = createTheme(themeStyle);

const sampleReview = {
    "author": "mooney240",
    "author_details": {
        "name": "",
        "username": "mooney240",
        "avatar_path": "/blEC280vq31MVaDcsWBXuGOsYnB.jpg",
        "rating": 6
    },
    "content": "**Avatar: The Way of Water follows in its predecessor’s footsteps with stunning effects and a mediocre story.**\r\n\r\nIt’s a James Cameron film, so it’s impressive. The special effects, camerawork, world-building, and action were all off the charts. But Avatar: The Way of Water struggles like its predecessor in the story and character development departments. In fact, the story of The Way of Water is almost identical to the first Avatar. Instead of humans learning to be Na’vi and then fighting Stephen slang, a family of forest Na’vi learns to be ocean Na’vi and then fight Stephen Lang. But the new movie also focuses on a group of annoying teens that constantly get themselves in trouble and peril over and over again throughout the much too long 3+ hour runtime and sidelining better, more established characters. All the strengths and weaknesses of the first movie are back in this one, with the bonus of being compared to the original at every turn. It really is a visual feast and special effects masterpiece, but just like the first Avatar, that’s all it is.",
    "created_at": "2022-12-16T06:48:15.541Z",
    "id": "639c14af0752880093558e1c",
    "updated_at": "2022-12-16T14:07:45.139Z",
    "url": "https://www.themoviedb.org/review/639c14af0752880093558e1c"
}

export default {
  title: "Movie Details Page/MovieReview",
  component: MovieReview,
  decorators: [
    (Story) => (
      (Story) => <ThemeProvider theme={theme}>{Story()}</ThemeProvider>,
      <QueryClientProvider client={queryClient}>
        {Story()}
      </QueryClientProvider>
    ),
    (Story) => <MemoryRouter initialEntries={["/"]}>{Story()}</MemoryRouter>,
    (Story) => <MoviesContextProvider>{Story()}</MoviesContextProvider>,
  ],
};

export const Basic = () => <MovieReview review={sampleReview} />;

Basic.storyName = "Default";