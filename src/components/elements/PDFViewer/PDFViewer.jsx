import Head from '@docusaurus/Head';
import React, { useEffect, useId, useState } from 'react';

function detectFileNameFromURL(url) {
  try {
    // url should be a component of the URL (query), not the entire URL
    const fileName = decodeURIComponent(url).split('/').pop();
    return fileName;
  } catch (err) {
    return 'Untitled';
  }
}

function previewFile(url, title, clientId, options) {
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
  detectFileName,
  fallback,
  container,
}) {
  const [error, setError] = useState(null);
  const [containerComp, setContainerComp] = useState(null);
  const [isReady, setIsReady] = useState(false);
  const divId = useId();

  if (detectFileName) {
    title = detectFileNameFromURL(url);
  }

  useEffect(() => {
    const handleLoad = () => {
      setIsReady(true);

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
  }, []);

  useEffect(() => {
    if (!container) {
      return;
    }
    try {
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
  }, [container, isReady]);

  if (error) {
    if (fallback) {
      return fallback({ error });
    }

    return (
      <iframe
        title={title}
        src={url}
        style={{ height: '100%', width: '100%', display: 'block' }}
      ></iframe>
    );
  }

  return (
    <>
      <Head>
        <script src="https://documentservices.adobe.com/view-sdk/viewer.js"></script>
      </Head>

      {!container && (
        <div id={divId} style={{ height: '100%', width: '100%' }} />
      )}

      {containerComp}
    </>
  );
}

export { PDFViewer };
