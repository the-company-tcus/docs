import { Icon } from '@iconify/react';
import { Button } from '@mantine/core';
import React from 'react';
import { PDFViewer } from './PDFViewer';
import type { PDFViewerProps } from './types';

function PDFViewerButton(props: Omit<PDFViewerProps, 'embedMode'>) {
  return (
    <PDFViewer
      container={({ divId, isReady, preview }) => {
        // NOTE: Create a different div so when we click close the button won't effect
        return (
          <>
            {/* NOTE: width and height have o set to 0 to prevent content reflow */}
            <div id={divId} style={{ height: 0, width: 0 }} />
            <Button
              disabled={!isReady}
              leftIcon={
                <Icon
                  height={24}
                  icon="ant-design:file-pdf-twotone"
                  width={24}
                />
              }
              onClick={() => preview()}
              variant="light"
            >
              View PDF
            </Button>
          </>
        );
      }}
      embedMode="LIGHT_BOX"
      {...props}
    />
  );
}
export { PDFViewerButton };
