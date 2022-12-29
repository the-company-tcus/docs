import { ReleasePage } from '@site/src/pages/releases/_index';
import { ViewRelease } from '@site/src/pages/releases/_view';
import Layout from '@theme/Layout';
import NotFound from '@theme/NotFound';
import React from 'react';
import { Route, Switch, useRouteMatch } from 'react-router-dom';

function ReleaseLayout() {
  const match = useRouteMatch();

  return (
    <Switch>
      <Route path={`${match.path}/view/:owner/:repo`} exact>
        <Layout title="Releases">
          <ViewRelease />
        </Layout>
      </Route>

      <Route path={match.path} exact>
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
