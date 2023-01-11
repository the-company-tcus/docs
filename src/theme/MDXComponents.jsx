import useDocusaurusContext from '@docusaurus/useDocusaurusContext';
import { PDFViewer } from '@site/src/components/elements/PDFViewer';
import { VideoPlayer } from '@site/src/components/elements/VideoPlayer';
// Import the original mapper
import MDXComponents from '@theme-original/MDXComponents';
import React from 'react';

const PDFViewerWrapper = ({ src, ...props }) => {
  const {
    siteConfig: { customFields },
  } = useDocusaurusContext();

  return <PDFViewer clientId={customFields.clientId} url={src} {...props} />;
};

export default {
  // Re-use the default mapping
  ...MDXComponents,
  // Map the "iframe" tag to our <VideoPlayer /> component!
  // `VideoPlayer` will receive all props that were passed to `iframe` in MDX
  iframe: (props) => {
    if (props['data-type-iframe'] === 'video') {
      return <VideoPlayer {...props} />;
    }
    if (props['data-type-iframe'] === 'pdf') {
      return <PDFViewerWrapper {...props} />;
    }
    return <iframe title={props.title} {...props}></iframe>;
  },
};
