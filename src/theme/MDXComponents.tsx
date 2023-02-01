import useDocusaurusContext from '@docusaurus/useDocusaurusContext';
// Import the original mapper
import MDXComponents from '@theme-original/MDXComponents';
import React from 'react';
import { PDFViewer } from '@site/src/components/elements/PDFViewer';
import { VideoPlayer } from '@site/src/components/elements/VideoPlayer';

const PDFViewerWrapper = ({ src, ...props }: { src: string }) => {
  const {
    siteConfig: { customFields },
  } = useDocusaurusContext();

  return (
    <PDFViewer
      clientId={customFields.clientId as string}
      url={src}
      {...props}
      container={null}
      fallback={null}
    />
  );
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
