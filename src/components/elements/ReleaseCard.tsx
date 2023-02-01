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
import Admonition from '@theme/Admonition';
import MDXContent from '@theme/MDXContent';
import moment from 'moment';
import React, { useEffect, useState } from 'react';
import * as runtime from 'react/jsx-runtime';
import rehypeRaw from 'rehype-raw';
import remarkEmoji from 'remark-emoji';
import transformVideo from '@site/src/remark/transformVideo';

const ReleaseBody = ({ body }) => {
  const components = useMDXComponents();

  const [parsed, setParsed] = useState<React.ReactNode>();

  useEffect(() => {
    const evaluateBody = async () => {
      const { default: BodyContent } = await evaluate(body, {
        ...runtime,
        remarkPlugins: [transformVideo, [remarkEmoji, { emoticon: true }]],
        // Ref: https://github.com/atomiks/rehype-pretty-code/issues/6#issuecomment-1006220771
        rehypePlugins: [[rehypeRaw, { passThrough: nodeTypes }]],
        useMDXComponents: () => components,
        // eslint-disable-next-line @typescript-eslint/no-explicit-any
      } as any);

      setParsed(<BodyContent />);
    };

    evaluateBody();
  }, [body, components]);

  return <>{parsed}</>;
};

const ReleaseCard = ({
  release,
  latest = false,
}: {
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  release: any;
  latest?: boolean;
}) => {
  return (
    <Group
      align="flex-start"
      className="mb-4 md:flex-row flex-col"
      key={release.id}
      noWrap
      spacing="lg"
    >
      <Stack className="w-full md:w-1/6" justify="flex-start">
        <Tooltip.Floating label={moment(release.published_at).format('lll')}>
          <Text className="whitespace-nowrap">
            {moment(release.published_at).fromNow()}
          </Text>
        </Tooltip.Floating>
        <Stack className="flex-row md:flex-col" spacing="xs">
          <Group spacing="xs">
            <Avatar size={20} src={release.author.avatar_url} />
            <Anchor
              color="dimmed"
              fz="sm"
              href={release.author.html_url}
              target="_blank"
            >
              {release.author.login}
            </Anchor>
          </Group>
          <Anchor
            color="dimmed"
            href={release.html_url.replace('releases/tag', 'tree')}
            target="_blank"
            underline={false}
          >
            <Group spacing={14}>
              <Icon height={16} icon="octicon:tag-16" width={16} />
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
              className="min-w-max normal-case"
              color="yellow"
              size="lg"
              variant="outline"
            >
              Pre-release
            </Badge>
          ) : (
            latest && (
              <Badge
                className="min-w-max normal-case"
                color="green"
                size="lg"
                variant="outline"
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
              <Admonition title="Error" type="danger">
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
