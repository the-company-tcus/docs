import NotFound from '@theme/NotFound';
import React from 'react';
import { Route, Switch, useRouteMatch } from 'react-router-dom';
import { PDFViewerPage } from '@site/src/pages/_pdf-viewer/index';

function PDFViewerLayout() {
  const match = useRouteMatch();

  return (
    <Switch>
      <Route exact path={match.path}>
        <PDFViewerPage />
      </Route>

      <Route>
        <NotFound />
      </Route>
    </Switch>
  );
}

export default PDFViewerLayout;
