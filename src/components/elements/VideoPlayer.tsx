import React from 'react';
import ReactPlayer from 'react-player';
import type { ReactPlayerProps } from 'react-player';

const VideoPlayer = ({
  src,
  ...props
}: {
  src: string;
} & ReactPlayerProps) => {
  return <ReactPlayer controls url={src} {...props} />;
};

export { VideoPlayer };
