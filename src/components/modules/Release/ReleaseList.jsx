import useDocusaurusContext from '@docusaurus/useDocusaurusContext';
import { Center, Loader, Space, Title } from '@mantine/core';
import { ReleaseCard } from '@site/src/components/elements/ReleaseCard';
import { useReleaseByTimeRange } from '@site/src/hooks/useReleaseByTimeRange';
import { Octokit } from 'octokit';
import React from 'react';

const ReleaseList = ({ owner, repo, from, to }) => {
  const {
    siteConfig: { customFields },
  } = useDocusaurusContext();
  const octokit = new Octokit({ auth: customFields.ghToken });

  const { releases, isFetching } = useReleaseByTimeRange(
    octokit,
    { owner, repo, perPage: 100 },
    from,
    to,
  );

  const releaseList = releases?.map((release) => {
    return <ReleaseCard key={release.id} release={release} />;
  });

  return (
    <>
      <Title order={2}>{`${
        releases?.length || 'No'
      } version(s) released`}</Title>
      <Space h="md" />
      {releaseList}
      {isFetching && (
        <Center className="w-full" my="md">
          <Loader size="md" />
        </Center>
      )}
    </>
  );
};

export { ReleaseList };
