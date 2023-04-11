import React from 'react';
import VideoJS from '../video';
import videojs from 'video.js';

/* NOT USED, moved to implement and emdedded video */
export const VideoPlayer = (props) => {
  const playerRef = React.useRef(null);

  const videoJsOptions = {
    autoplay: true,
    controls: true,
    responsive: true,
    fluid: true,
    sources: [{
        // Test URL
      src: 'https://www.youtube.com/watch?v=xHNMEvYPdZE',
      type: 'application/x-mpegURL'
    }]
  };

  const handlePlayerReady = (player) => {

    playerRef.current = player;

    player.on('waiting', () => {
      videojs.log('player is waiting');
    });

    player.on('dispose', () => {
      videojs.log('player will dispose');
    });
  };

  return (
    <>
      <VideoJS options={videoJsOptions} onReady={handlePlayerReady} />
    </>
  );
}

export default VideoPlayer;