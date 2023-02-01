import useDocusaurusContext from '@docusaurus/useDocusaurusContext';
import { Button, Center, Group, Loader, Space, Title } from '@mantine/core';
import { useQuery } from '@tanstack/react-query';
import { Octokit } from 'octokit';
import React from 'react';
import type { ReleaseProps } from './types';
import { ReleaseCard } from '@site/src/components/elements/ReleaseCard';
import { useReleaseByTimeRange } from '@site/src/hooks/useReleaseByTimeRange';

const fetchLatestRelease = async (
  octokit: Octokit,
  {
    owner,
    repo,
  }: {
    owner: string;
    repo: string;
  },
) => {
  const data = await octokit.request(
    'GET /repos/{owner}/{repo}/releases/latest',
    {
      owner,
      repo,
    },
  );

  return data;
};

const ReleaseList = ({ owner, repo, from = '', to = '' }: ReleaseProps) => {
  const {
    siteConfig: { customFields },
  } = useDocusaurusContext();
  const octokit = new Octokit({ auth: customFields.ghToken });

  const {
    data: latestRelease,
    refetch: refetchLatestRelease,
    isFetching: isFetchingLatestRelease,
  } = useQuery({
    queryKey: ['latest-release', octokit, { owner, repo }],
    queryFn: () => fetchLatestRelease(octokit, { owner, repo }),
    refetchOnMount: false,
    refetchOnWindowFocus: false,
    refetchOnReconnect: false,
  });

  const {
    releases,
    isFetching: isFetchingReleases,
    refetch: refetchReleases,
  } = useReleaseByTimeRange(octokit, { owner, repo, perPage: 100 }, from, to);

  const releaseList = releases?.map((release) => {
    if (latestRelease.data.id === release.id) {
      return <ReleaseCard key={release.id} latest release={release} />;
    }
    return <ReleaseCard key={release.id} release={release} />;
  });

  return (
    <>
      <Group position="apart">
        <Title order={2}>{`${
          releases?.length || 'No'
        } version(s) released`}</Title>
        <Button
          loading={isFetchingLatestRelease || isFetchingReleases}
          onClick={() => {
            refetchLatestRelease();
            refetchReleases();
          }}
        >
          Refresh
        </Button>
      </Group>
      <Space h="md" />
      {releaseList}
      {isFetchingReleases && (
        <Center className="w-full" my="md">
          <Loader size="md" />
        </Center>
      )}
    </>
  );
};

export { ReleaseList };
