import React from "react";
import VideoPlayer from "../components/videoPlayer";
import { MemoryRouter } from "react-router";

export default {
  title: "Video Player",
  component: VideoPlayer,
  decorators: [
    (Story) => <MemoryRouter initialEntries={["/"]}>{Story()}</MemoryRouter>,
  ],
};

export const Basic = () => <VideoPlayer />;

Basic.storyName = "Default";