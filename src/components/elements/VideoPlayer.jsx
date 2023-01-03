import React from 'react';
import ReactPlayer from 'react-player';

const VideoPlayer = ({ src, ...props }) => {
  return <ReactPlayer url={src} {...props} />;
};

export { VideoPlayer };
