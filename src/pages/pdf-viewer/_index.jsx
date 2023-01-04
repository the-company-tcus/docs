import BrowserOnly from '@docusaurus/BrowserOnly';
import { Center } from '@mantine/core';
import {
  PDFViewer,
  PDFViewerButton,
} from '@site/src/components/modules/PDFViewer';
import React, { useMemo } from 'react';
import { useLocation } from 'react-router-dom';

const PDFViewerPage = () => {
  const { search } = useLocation();
  const query = useMemo(() => new URLSearchParams(search), [search]);

  const url = query.get('url');
  const title = query.get('title') || 'Untitled';
  const embedMode = query.get('embedMode') || 'FULL_WINDOW';

  // NOTE: MUST be rendered in browser only, to prevent SSR errors: divId is not
  // rendered, classnames are not rendered, inline styles overridden, etc.
  return (
    <BrowserOnly>
      {() => {
        return {
          LIGHT_BOX: (
            <Center className="h-screen">
              <PDFViewerButton url={url} title={title} />
            </Center>
          ),
          FULL_WINDOW: (
            <div className="h-screen">
              <PDFViewer url={url} title={title} embedMode="FULL_WINDOW" />
            </div>
          ),
          SIZED_CONTAINER: (
            <div className="h-screen">
              <PDFViewer url={url} title={title} embedMode="SIZED_CONTAINER" />
            </div>
          ),
          IN_LINE: <PDFViewer url={url} title={title} embedMode="IN_LINE" />,
        }[embedMode];
      }}
    </BrowserOnly>
  );
};

export { PDFViewerPage };
