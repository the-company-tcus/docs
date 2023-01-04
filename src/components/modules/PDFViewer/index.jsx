import Head from '@docusaurus/Head';
import useDocusaurusContext from '@docusaurus/useDocusaurusContext';
import { Icon } from '@iconify/react';
import { Button } from '@mantine/core';
import ErrorPageContent from '@theme/ErrorPageContent';
import React, { useEffect, useId, useState } from 'react';

function detectFileNameFromURL(url) {
  try {
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
  embedMode = 'FULL_WINDOW',
  detectFileName,
}) {
  const [error, setError] = useState(null);
  const divId = useId();
  const {
    siteConfig: { customFields },
  } = useDocusaurusContext();

  if (detectFileName) {
    title = detectFileNameFromURL(url);
  }

  useEffect(() => {
    const handleLoad = () => {
      try {
        previewFile(url, title, customFields.clientId, { embedMode, divId });
      } catch (err) {
        setError(new Error(err));
      }
    };

    document.addEventListener('adobe_dc_view_sdk.ready', handleLoad);

    return () => {
      document.removeEventListener('adobe_dc_view_sdk.ready', handleLoad);
    };
  }, []);

  if (error) {
    return <ErrorPageContent error={error} />;
  }

  return (
    <>
      <Head>
        <script src="https://documentservices.adobe.com/view-sdk/viewer.js"></script>
      </Head>

      <div id={divId} style={{ height: '100%', width: '100%' }} />
    </>
  );
}

function PDFViewerSimple({ url, title = 'Untitled', detectFileName }) {
  if (detectFileName) {
    title = detectFileNameFromURL(url);
  }
  return (
    <iframe
      title={title}
      src={url}
      style={{ height: '100%', width: '100%' }}
    ></iframe>
  );
}

function PDFViewerButton({ url, title = 'Untitled', detectFileName }) {
  const [error, setError] = useState(null);
  const [isReady, setIsReady] = useState(false);
  const divId = useId();
  const {
    siteConfig: { customFields },
  } = useDocusaurusContext();

  if (detectFileName) {
    title = detectFileNameFromURL(url);
  }

  useEffect(() => {
    const handleLoad = () => {
      setIsReady(true);
    };

    document.addEventListener('adobe_dc_view_sdk.ready', handleLoad);

    return () => {
      document.removeEventListener('adobe_dc_view_sdk.ready', handleLoad);
    };
  }, []);

  if (error) {
    return <ErrorPageContent error={error} />;
  }

  return (
    <>
      <Head>
        <script src="https://documentservices.adobe.com/view-sdk/viewer.js"></script>
      </Head>

      {/* NOTE: width and height have o set to 0 to prevent content reflow */}
      <div id={divId} style={{ width: 0, height: 0 }} />
      <Button
        variant="light"
        leftIcon={
          <Icon icon="ant-design:file-pdf-twotone" width={24} height={24} />
        }
        disabled={!isReady}
        onClick={() => {
          try {
            previewFile(url, title, customFields.clientId, {
              embedMode: 'LIGHT_BOX',
              divId,
            });
          } catch (err) {
            setError(err);
          }
        }}
      >
        View PDF
      </Button>
    </>
  );
}

export { PDFViewer, PDFViewerSimple, PDFViewerButton };
