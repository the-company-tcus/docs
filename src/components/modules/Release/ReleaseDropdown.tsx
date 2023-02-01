import { Container, Group, Stack, Text } from '@mantine/core';
import Details from '@theme/Details';
import moment from 'moment';
import React from 'react';
import { ReleaseList } from './ReleaseList';
import type { ReleaseProps } from './types';

const ReleaseDropdown = ({ owner, repo, from, to }: ReleaseProps) => {
  const fromTime = moment(from, 'MM-DD-YYYY');
  const toTime = moment(to, 'MM-DD-YYYY');

  return (
    <Details
      open
      summary={
        <summary>
          <Group position="apart">
            <Text>
              View releases ({owner}/{repo})
            </Text>
            <Text fs="italic" fw={700}>
              Time: {fromTime.isValid() && `from ${fromTime.format('ll')} `}
              {toTime.isValid() ? `to ${toTime.format('ll')}` : 'to Current'}
            </Text>
          </Group>
        </summary>
      }
    >
      <Stack className="h-100 overflow-auto">
        <Container className="w-full">
          <ReleaseList from={from} owner={owner} repo={repo} to={to} />
        </Container>
      </Stack>
    </Details>
  );
};

export { ReleaseDropdown };
