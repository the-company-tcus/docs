import useDocusaurusContext from '@docusaurus/useDocusaurusContext';
import { Icon } from '@iconify/react';
import {
  Anchor,
  Avatar,
  Card,
  Center,
  Group,
  Loader,
  ScrollArea,
  Space,
  Stack,
  Text,
  Title,
} from '@mantine/core';
import { evaluateSync } from '@mdx-js/mdx';
import Details from '@theme/Details';
import moment from 'moment';
import { Octokit } from 'octokit';
import React from 'react';
import * as runtime from 'react/jsx-runtime';
import { useReleaseByTimeRange } from '../../hooks/useReleaseByTimeRange';

const ReleaseByTimeRange = ({ from, to }) => {
  const {
    siteConfig: { customFields },
  } = useDocusaurusContext();
  const octokit = new Octokit({ auth: customFields.ghToken });

  const { releases, isLoading } = useReleaseByTimeRange(
    octokit,
    { owner: customFields.owner, repo: customFields.repo, perPage: 1 },
    from,
    to,
  );

  const releaseList = releases?.map((release) => {
    const { default: BodyContent } = evaluateSync(release.body, {
      ...runtime,
    });

    return (
      <Group key={release.id} align="flex-start" className="mb-4">
        <Stack justify="flex-start" className="md:w-1/10">
          <Text>{moment(release.published_at).fromNow()}</Text>
          <Stack spacing="xs" className="flex-row md:flex-col">
            <Group spacing="xs">
              <Avatar src={release.author.avatar_url} size={20} />
              <Anchor
                fz="sm"
                href={release.author.html_url}
                color="dimmed"
                target="_blank"
              >
                {release.author.login}
              </Anchor>
            </Group>
            <Anchor
              underline={false}
              color="dimmed"
              className="hover:text-blue-700"
              href={release.html_url.replace('releases/tag', 'tree')}
              target="_blank"
            >
              <Group spacing={14}>
                <Icon icon="octicon:tag-16" width={16} height={16} />
                <Text>{release.name}</Text>
              </Group>
            </Anchor>
          </Stack>
        </Stack>
        <Card className="md:w-3/4">
          <Title order={1}>{release.name}</Title>
          <BodyContent />
        </Card>
      </Group>
    );
  });

  return (
    <Details summary={<summary>View releases</summary>} open>
      <Title order={2}>{`${
        releases?.length || 'No'
      } version(s) released`}</Title>
      <Space h="md" />
      <ScrollArea className="h-80 relative">
        {releaseList}
        {isLoading && (
          <Center className="w-full" my="md">
            <Loader size="md" />
          </Center>
        )}
      </ScrollArea>
    </Details>
  );
};

export { ReleaseByTimeRange };
