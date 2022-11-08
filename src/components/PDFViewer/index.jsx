import BrowserOnly from '@docusaurus/BrowserOnly';
import ErrorBoundary from '@docusaurus/ErrorBoundary';
import Head from '@docusaurus/Head';
import { Icon } from '@iconify/react';
import { Button, Stack, Title } from '@mantine/core';
import React, { useEffect, useId, useState } from 'react';

function previewFile(url, title, embedMode, divId = 'adobe-dc-view') {
  // eslint-disable-next-line no-undef
  const adobeDCView = new AdobeDC.View({
    clientId: 'e11a56067bc646fcbbf5b6486f14283c',
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

function PDFViewerWrapper({ children }) {
  return (
    <BrowserOnly>
      {() => {
        return (
          <ErrorBoundary
            fallback={({ tryAgain }) => (
              <Stack align="center">
                <Title order={1}>This component crashed</Title>
                <Button onClick={tryAgain}>Try Again!</Button>
              </Stack>
            )}
          >
            {children}
          </ErrorBoundary>
        );
      }}
    </BrowserOnly>
  );
}

function PDFViewer({ url, title, embedMode = 'FULL_WINDOW' }) {
  const divId = useId();

  useEffect(() => {
    const handleLoad = () => {
      previewFile(url, title, embedMode, divId);
    };

    document.addEventListener('adobe_dc_view_sdk.ready', handleLoad);

    return () => {
      document.removeEventListener('adobe_dc_view_sdk.ready', handleLoad);
    };
  }, []);

  return (
    <PDFViewerWrapper>
      <Head>
        <script src="https://documentservices.adobe.com/view-sdk/viewer.js"></script>
      </Head>

      <div id={divId} style={{ height: '100%', width: '100%' }} />
    </PDFViewerWrapper>
  );
}

function PDFViewerSimple({ url, title }) {
  return (
    <iframe
      title={title}
      src={url}
      style={{ height: '100%', width: '100%' }}
    ></iframe>
  );
}

function PDFViewerButton({ url, title }) {
  const [isReady, setIsReady] = useState(false);
  const divId = useId();

  useEffect(() => {
    const handleLoad = () => {
      setIsReady(true);
    };

    document.addEventListener('adobe_dc_view_sdk.ready', handleLoad);

    return () => {
      document.removeEventListener('adobe_dc_view_sdk.ready', handleLoad);
    };
  }, []);

  return (
    <PDFViewerWrapper>
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
          previewFile(url, title, 'LIGHT_BOX', divId);
        }}
      >
        View PDF
      </Button>
    </PDFViewerWrapper>
  );
}

export { PDFViewer, PDFViewerSimple, PDFViewerButton };
