import Layout from '@theme/Layout';
import NotFound from '@theme/NotFound';
import React from 'react';
import { Route, Switch, useRouteMatch } from 'react-router-dom';
import { ReleasePage } from '@site/src/pages/_releases/index';
import { ViewRelease } from '@site/src/pages/_releases/view';

function ReleaseLayout() {
  const match = useRouteMatch();

  return (
    <Switch>
      <Route exact path={`${match.path}/view/:owner/:repo`}>
        <Layout title="Releases">
          <ViewRelease />
        </Layout>
      </Route>

      <Route exact path={match.path}>
        <Layout title="Releases">
          <ReleasePage />
        </Layout>
      </Route>

      <Route>
        <NotFound />
      </Route>
    </Switch>
  );
}

export default ReleaseLayout;
