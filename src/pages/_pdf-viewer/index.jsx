import BrowserOnly from '@docusaurus/BrowserOnly';
import useDocusaurusContext from '@docusaurus/useDocusaurusContext';
import { Center } from '@mantine/core';
import {
  PDFViewer,
  PDFViewerButton,
} from '@site/src/components/elements/PDFViewer';
import React, { useMemo } from 'react';
import { useLocation } from 'react-router-dom';

const PDFViewerPage = () => {
  const {
    siteConfig: { customFields },
  } = useDocusaurusContext();
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
              <PDFViewerButton
                clientId={customFields.clientId}
                title={title}
                url={url}
              />
            </Center>
          ),
          FULL_WINDOW: (
            <div className="h-screen">
              <PDFViewer
                clientId={customFields.clientId}
                embedMode="FULL_WINDOW"
                title={title}
                url={url}
              />
            </div>
          ),
          SIZED_CONTAINER: (
            <div className="h-screen">
              <PDFViewer
                clientId={customFields.clientId}
                embedMode="SIZED_CONTAINER"
                title={title}
                url={url}
              />
            </div>
          ),
          IN_LINE: (
            <PDFViewer
              clientId={customFields.clientId}
              embedMode="IN_LINE"
              title={title}
              url={url}
            />
          ),
        }[embedMode];
      }}
    </BrowserOnly>
  );
};

export { PDFViewerPage };
