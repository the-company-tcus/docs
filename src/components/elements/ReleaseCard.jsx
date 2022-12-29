import ErrorBoundary from '@docusaurus/ErrorBoundary';
import { Icon } from '@iconify/react';
import {
  Anchor,
  Avatar,
  Card,
  Group,
  Stack,
  Text,
  Title,
  Tooltip,
} from '@mantine/core';
import { evaluateSync } from '@mdx-js/mdx';
import Admonition from '@theme/Admonition';
import moment from 'moment';
import React from 'react';
import * as runtime from 'react/jsx-runtime';

const ReleaseBody = ({ body }) => {
  const { default: BodyContent } = evaluateSync(body, {
    ...runtime,
  });

  return <BodyContent />;
};

const ReleaseCard = ({ release }) => {
  return (
    <Group
      key={release.id}
      align="flex-start"
      className="mb-4 md:flex-row flex-col"
      spacing="lg"
      noWrap
    >
      <Stack justify="flex-start">
        <Tooltip.Floating label={moment(release.published_at).format('lll')}>
          <Text className="whitespace-nowrap">
            {moment(release.published_at).fromNow()}
          </Text>
        </Tooltip.Floating>
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
      <Card className="w-300">
        <Title order={1}>{release.name}</Title>
        <ErrorBoundary
          fallback={({ error }) => (
            <>
              <Admonition type="danger" title="Error">
                <p>This component crashed because of error: {error.message}.</p>
              </Admonition>
              <pre className="whitespace-pre-wrap">
                <code>{release.body}</code>
              </pre>
            </>
          )}
        >
          <ReleaseBody body={release.body} />
        </ErrorBoundary>
      </Card>
    </Group>
  );
};

export { ReleaseCard };
