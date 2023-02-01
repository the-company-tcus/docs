export type PDFViewerProps = {
  url: string;
  title?: string;
  clientId: string;
  embedMode?: 'FULL_WINDOW' | 'SIZED_CONTAINER' | 'IN_LINE' | 'LIGHT_BOX';
  detectFileName?: boolean;
  fallback?: (props: { error: Error }) => React.ReactNode;
  container?: (props: {
    divId: string;
    isReady: boolean;
    preview: () => void;
  }) => React.ReactNode;
};
