import { Icon } from '@iconify/react';
import { Anchor, Container, Text, Title } from '@mantine/core';
import { ReleaseList } from '@site/src/components/modules/Release/ReleaseList';
import moment from 'moment';
import React, { useMemo } from 'react';
import { useLocation, useRouteMatch } from 'react-router-dom';

const ViewRelease = () => {
  const match = useRouteMatch();
  const { owner, repo } = match.params;

  const { search } = useLocation();
  const query = useMemo(() => new URLSearchParams(search), [search]);

  const fromTime = moment(query.get('from'), 'MM-DD-YYYY');
  const toTime = moment(query.get('to'), 'MM-DD-YYYY');

  return (
    <Container py="xl">
      <Title order={1}>
        Repository:{' '}
        <Anchor href={`https://github.com/${owner}/${repo}`} target="_blank">
          <Icon icon="octicon:mark-github-16" width={32} height={32} inline />{' '}
          {owner}/{repo}
        </Anchor>
      </Title>
      <Text fs="italic" fw={700}>
        Time: {fromTime.isValid() && `from ${fromTime.format('ll')} `}
        {toTime.isValid() ? `to ${toTime.format('ll')}` : 'to Current'}
      </Text>
      <ReleaseList owner={owner} repo={repo} from={fromTime} to={toTime} />
    </Container>
  );
};

export { ViewRelease };
