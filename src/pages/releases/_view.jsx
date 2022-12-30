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
          <Icon icon="octicon:mark-github-16" width={32} height={32} inline />{' '}
          {owner}/{repo}
        </Anchor>
      </Title>
      <Group>
        <Text fs="italic" fw={700}>
          Time:{' '}
        </Text>
        <Group spacing="xs">
          <Input
            type="date"
            id="from"
            name="from"
            max={toTime.isValid() ? toTime.format('YYYY-MM-DD') : ''}
            value={fromTime.isValid() ? fromTime.format('YYYY-MM-DD') : ''}
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
          />
          {'-'}
          <Input
            type="date"
            id="to"
            name="to"
            min={fromTime.isValid() ? fromTime.format('YYYY-MM-DD') : ''}
            value={toTime.isValid() ? toTime.format('YYYY-MM-DD') : ''}
            onChange={(e) => {
              const toDate =
                e.target.value !== ''
                  ? moment(e.target.value, 'YYYY-MM-DD').format('MM-DD-YYYY')
                  : '';

              query.set('to', toDate);

              history.push({ pathname, search: query.toString() });
            }}
          />
        </Group>
      </Group>
      <ReleaseList owner={owner} repo={repo} from={fromTime} to={toTime} />
    </Container>
  );
};

export { ViewRelease };
