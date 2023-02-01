import Head from '@docusaurus/Head';
import React, { useEffect, useId, useState } from 'react';
import type { PDFViewerProps } from './types';

// eslint-disable-next-line @typescript-eslint/no-explicit-any
declare const AdobeDC: any;

function detectFileNameFromURL(url: string) {
  try {
    // url should be a component of the URL (query), not the entire URL
    const fileName = decodeURIComponent(url).split('/').pop();
    return fileName;
  } catch (err) {
    return '';
  }
}

function previewFile(
  url: string,
  title: string,
  clientId: string,
  options: {
    embedMode: 'FULL_WINDOW' | 'SIZED_CONTAINER' | 'IN_LINE' | 'LIGHT_BOX';
    divId?: string;
  },
) {
  const { embedMode, divId = 'adobe-dc-view' } = options;
  // eslint-disable-next-line no-undef
  const adobeDCView = new AdobeDC.View({
    // NOTE: ClientID token is defined in docusaurus.config.js
    clientId,
    divId,
  });
  adobeDCView.previewFile(
    {
      content: {
        location: {
          url,
        },
      },
      metaData: { fileName: title },
    },
    {
      embedMode,
    },
  );
  adobeDCView.registerCallback(
    /* Type of call back */
    // eslint-disable-next-line no-undef
    AdobeDC.View.Enum.CallbackType.EVENT_LISTENER,
    /* call back function */
    (event) => {
      if (event.type === 'APP_RENDERING_FAILED') {
        throw new Error('APP_RENDERING_FAILED');
      }
    },
    /* options to control the callback execution */
  );
}

function PDFViewer({
  url,
  title = 'Untitled',
  clientId,
  embedMode = 'FULL_WINDOW',
  detectFileName = false,
  fallback,
  container,
  ...props
}: PDFViewerProps) {
  const [error, setError] = useState<Error>(null);
  const [containerComp, setContainerComp] = useState<React.ReactNode>(null);
  const [isReady, setIsReady] = useState<boolean>(false);
  const divId = useId();

  if (detectFileName) {
    title = detectFileNameFromURL(url) || title;
  }

  useEffect(() => {
    const handleLoad = () => {
      setIsReady(true);

      // If no container is provided, we will use the default div and preview
      // the file immediately
      if (!container) {
        try {
          previewFile(url, title, clientId, { embedMode, divId });
        } catch (err) {
          setError(new Error(err));
        }
      }
    };

    document.addEventListener('adobe_dc_view_sdk.ready', handleLoad);

    return () => {
      document.removeEventListener('adobe_dc_view_sdk.ready', handleLoad);
    };
  }, [clientId, url, title, container, embedMode, divId]);

  useEffect(() => {
    if (!container) {
      return;
    }
    try {
      // Set the container component to render with the provided props
      setContainerComp(
        container({
          divId,
          isReady,
          preview: () =>
            previewFile(url, title, clientId, { embedMode, divId }),
        }),
      );
    } catch (err) {
      setError(new Error(err));
    }
  }, [container, clientId, url, title, embedMode, divId, isReady]);

  if (error) {
    // Render the fallback component if provided, with the error as a prop.
    // Otherwise, render the iframe to display the PDF
    if (fallback) {
      return <>{fallback({ error })}</>;
    }

    return (
      <iframe
        src={url}
        style={{ height: '100%', width: '100%', display: 'block' }}
        title={title}
        {...props}
      ></iframe>
    );
  }

  return (
    <>
      <Head>
        <script src="https://documentservices.adobe.com/view-sdk/viewer.js"></script>
      </Head>

      {!container && (
        <div id={divId} style={{ height: '100%', width: '100%' }} {...props} />
      )}

      {containerComp}
    </>
  );
}

export { PDFViewer };
