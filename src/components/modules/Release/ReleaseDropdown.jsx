import { Group, ScrollArea, Text } from '@mantine/core';
import Details from '@theme/Details';
import moment from 'moment';
import React from 'react';
import { ReleaseList } from './ReleaseList';

const ReleaseDropdown = ({ owner, repo, from, to }) => {
  const fromTime = moment(from, 'MM-DD-YYYY');
  const toTime = moment(to, 'MM-DD-YYYY');

  return (
    <Details
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
      open
    >
      <ScrollArea className="h-80 relative">
        <ReleaseList owner={owner} repo={repo} from={from} to={to} />
      </ScrollArea>
    </Details>
  );
};

export { ReleaseDropdown };
