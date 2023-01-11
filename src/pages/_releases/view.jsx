import { Icon } from '@iconify/react';
import { Anchor, Container, Group, Input, Text, Title } from '@mantine/core';
import { ReleaseList } from '@site/src/components/modules/Release/ReleaseList';
import moment from 'moment';
import React, { useMemo } from 'react';
import { useHistory, useLocation, useRouteMatch } from 'react-router-dom';

const ViewRelease = () => {
  const history = useHistory();

  const match = useRouteMatch();
  const { owner, repo } = match.params;

  const { pathname, search } = useLocation();
  const query = useMemo(() => new URLSearchParams(search), [search]);

  const fromTime = moment(query.get('from'), 'MM-DD-YYYY');
  const toTime = moment(query.get('to'), 'MM-DD-YYYY');

  return (
    <Container py="xl">
      <Title order={1}>
        Repository:{' '}
        <Anchor href={`https://github.com/${owner}/${repo}`} target="_blank">
          <Icon height={32} icon="octicon:mark-github-16" inline width={32} />{' '}
          {owner}/{repo}
        </Anchor>
      </Title>
      <Group>
        <Text fs="italic" fw={700}>
          Time:{' '}
        </Text>
        <Group spacing="xs">
          <Input
            id="from"
            max={toTime.isValid() ? toTime.format('YYYY-MM-DD') : ''}
            name="from"
            onChange={(e) => {
              // e.target.value is a string in the format YYYY-MM-DD, empty
              // string if no date is selected
              const fromDate =
                e.target.value !== ''
                  ? moment(e.target.value, 'YYYY-MM-DD').format('MM-DD-YYYY')
                  : '';

              query.set('from', fromDate);

              history.push({ pathname, search: query.toString() });
            }}
            type="date"
            value={fromTime.isValid() ? fromTime.format('YYYY-MM-DD') : ''}
          />
          {'-'}
          <Input
            id="to"
            min={fromTime.isValid() ? fromTime.format('YYYY-MM-DD') : ''}
            name="to"
            onChange={(e) => {
              const toDate =
                e.target.value !== ''
                  ? moment(e.target.value, 'YYYY-MM-DD').format('MM-DD-YYYY')
                  : '';

              query.set('to', toDate);

              history.push({ pathname, search: query.toString() });
            }}
            type="date"
            value={toTime.isValid() ? toTime.format('YYYY-MM-DD') : ''}
          />
        </Group>
      </Group>
      <ReleaseList from={fromTime} owner={owner} repo={repo} to={toTime} />
    </Container>
  );
};

export { ViewRelease };
