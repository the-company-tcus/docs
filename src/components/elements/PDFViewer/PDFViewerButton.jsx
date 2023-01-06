import { Icon } from '@iconify/react';
import { Button } from '@mantine/core';
import React from 'react';
import { PDFViewer } from './PDFViewer';

function PDFViewerButton(props) {
  return (
    <PDFViewer
      embedMode="LIGHT_BOX"
      container={({ divId, isReady, preview }) => {
        // NOTE: Create a different div so when we click close the button won't effect
        return (
          <>
            {/* NOTE: width and height have o set to 0 to prevent content reflow */}
            <div id={divId} style={{ height: 0, width: 0 }} />
            <Button
              variant="light"
              leftIcon={
                <Icon
                  icon="ant-design:file-pdf-twotone"
                  width={24}
                  height={24}
                />
              }
              disabled={!isReady}
              onClick={() => preview()}
            >
              View PDF
            </Button>
          </>
        );
      }}
      {...props}
    />
  );
}
export { PDFViewerButton };
