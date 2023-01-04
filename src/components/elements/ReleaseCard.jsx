import ErrorBoundary from '@docusaurus/ErrorBoundary';
import { Icon } from '@iconify/react';
import {
  Anchor,
  Avatar,
  Badge,
  Card,
  Group,
  Space,
  Stack,
  Text,
  Title,
  Tooltip,
} from '@mantine/core';
import { evaluate, nodeTypes } from '@mdx-js/mdx';
import { useMDXComponents } from '@mdx-js/react';
import transformVideo from '@site/src/remark/transformVideo';
import Admonition from '@theme/Admonition';
import MDXContent from '@theme/MDXContent';
import moment from 'moment';
import React, { useEffect, useState } from 'react';
import * as runtime from 'react/jsx-runtime';
import rehypeRaw from 'rehype-raw';

const ReleaseBody = ({ body }) => {
  const components = useMDXComponents();

  const [parsed, setParsed] = useState();

  useEffect(() => {
    const evaluateBody = async () => {
      const { default: BodyContent } = await evaluate(body, {
        ...runtime,
        remarkPlugins: [transformVideo],
        // Ref: https://github.com/atomiks/rehype-pretty-code/issues/6#issuecomment-1006220771
        rehypePlugins: [[rehypeRaw, { passThrough: nodeTypes }]],
        useMDXComponents: () => components,
      });

      setParsed(<BodyContent />);
    };

    evaluateBody();
  }, [body]);

  return parsed;
};

const ReleaseCard = ({ release, latest = false }) => {
  return (
    <Group
      key={release.id}
      align="flex-start"
      className="mb-4 md:flex-row flex-col"
      spacing="lg"
      noWrap
    >
      <Stack justify="flex-start" className="w-full md:w-1/6">
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
            href={release.html_url.replace('releases/tag', 'tree')}
            target="_blank"
          >
            <Group spacing={14}>
              <Icon icon="octicon:tag-16" width={16} height={16} />
              <Text>{release.tag_name}</Text>
            </Group>
          </Anchor>
        </Stack>
      </Stack>
      <Card className="w-full md:max-w-3/4" withBorder>
        <Group noWrap>
          <Anchor href={release.html_url} target="_blank">
            <Title order={1}>{release.name}</Title>
          </Anchor>
          {release.prerelease ? (
            <Badge
              color="yellow"
              variant="outline"
              size="lg"
              className="min-w-max normal-case"
            >
              Pre-release
            </Badge>
          ) : (
            latest && (
              <Badge
                color="green"
                variant="outline"
                size="lg"
                className="min-w-max normal-case"
              >
                Latest
              </Badge>
            )
          )}
        </Group>
        <Space h="xl" />
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
          <MDXContent>
            <ReleaseBody body={release.body} />
          </MDXContent>
        </ErrorBoundary>
      </Card>
    </Group>
  );
};

export { ReleaseCard };
