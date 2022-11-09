import { useInfiniteQuery } from '@tanstack/react-query';
import moment from 'moment';
import { useRef } from 'react';

const fetchReleases = async (
  octokit,
  { owner, repo, page = 1, perPage = 100 },
) => {
  const data = await octokit.request('GET /repos/{owner}/{repo}/releases', {
    owner,
    repo,
    page,
    per_page: perPage,
  });

  return data;
};

const useReleaseByTimeRange = (
  octokit,
  { owner, repo, page, perPage },
  from,
  to,
) => {
  const fromTime = moment(from);
  const toTime = moment(to);

  if (toTime.isBefore(fromTime)) {
    throw new Error('From date is greater than to date');
  }
  const isFetchFinished = useRef(false);

  const { data, fetchNextPage } = useInfiniteQuery({
    queryKey: ['releases'],
    // NOTE: `page` will be used as starting page
    queryFn: ({ pageParam = page }) => {
      return fetchReleases(octokit, {
        owner,
        repo,
        page: pageParam,
        perPage,
      });
    },

    getNextPageParam: (lastPage) => {
      const { url, data: lastPageData } = lastPage;

      const params = new Proxy(new URLSearchParams(new URL(url).search), {
        get: (searchParams, prop) => searchParams.get(prop),
      });

      const prevPage = params.page;

      if (lastPageData.length === 0) {
        isFetchFinished.current = true;
        return undefined;
      }

      const lastReleaseTime = moment(
        lastPageData[lastPageData.length - 1].published_at,
      );

      if (lastReleaseTime.isBefore(fromTime)) {
        isFetchFinished.current = true;
        return undefined;
      }

      return +prevPage + 1;
    },

    onSuccess: () => {
      // NOTE: hasNextPage is not updated yet
      if (!isFetchFinished.current) {
        fetchNextPage();
      }
    },
  });

  // NOTE: You will see a "redundant" render here because we have to fetch the
  // next page then check if it's finished
  const selectedReleases = data?.pages?.flatMap((releasePage) => {
    return releasePage.data.filter((release) => {
      const releaseTime = moment(release.published_at);
      return releaseTime.isBetween(fromTime, toTime, undefined, '[]');
    });
  });

  return {
    releases: selectedReleases,
    isLoading: !isFetchFinished.current,
  };
};

export { useReleaseByTimeRange };
