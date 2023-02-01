import { useInfiniteQuery } from '@tanstack/react-query';
import moment from 'moment';
import type { Moment } from 'moment';
import type { Octokit } from 'octokit';

const fetchReleases = async (
  octokit: Octokit,
  {
    owner,
    repo,
    page = 1,
    perPage = 100,
  }: {
    owner: string;
    repo: string;
    page?: number;
    perPage?: number;
  },
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
  octokit: Octokit,
  {
    owner,
    repo,
    page,
    perPage,
  }: {
    owner: string;
    repo: string;
    page?: number;
    perPage?: number;
  },
  from: string | Moment,
  to: string | Moment,
) => {
  const fromTime = moment(from, 'MM-DD-YYYY');
  const toTime = moment(to, 'MM-DD-YYYY');

  if (toTime.isBefore(fromTime)) {
    throw new Error('From date is greater than to date');
  }
  const { data, fetchNextPage, hasNextPage, isFetching, refetch } =
    useInfiniteQuery({
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
      refetchOnMount: false,
      refetchOnWindowFocus: false,
      refetchOnReconnect: false,

      getNextPageParam: (lastPage) => {
        const { url, data: lastPageData } = lastPage;

        const prevPage = new URLSearchParams(new URL(url).search).get('page');

        if (!prevPage) {
          return undefined;
        }

        if (lastPageData.length === 0) {
          return undefined;
        }

        const lastReleaseTime = moment(
          lastPageData[lastPageData.length - 1].published_at,
        );

        // NOTE: We have to check if the last release is before the from time to
        // stop fetching the next page
        if (lastReleaseTime.isBefore(fromTime)) {
          return undefined;
        }

        return +prevPage + 1;
      },

      onSuccess: () => {
        if (hasNextPage !== false) {
          fetchNextPage();
        }
      },
    });

  // NOTE: You will see a "redundant" render here because we have to fetch the
  // next page then check if it's finished
  const selectedReleases = data?.pages?.flatMap((releasePage) => {
    return releasePage.data.filter((release) => {
      const releaseTime = moment(release.published_at);

      if (fromTime.isValid() && toTime.isValid()) {
        return releaseTime.isBetween(fromTime, toTime, undefined, '[]');
      }
      if (fromTime.isValid()) {
        return releaseTime.isSameOrAfter(fromTime);
      }
      if (toTime.isValid()) {
        return releaseTime.isSameOrBefore(toTime);
      }
      return true;
    });
  });

  return {
    releases: selectedReleases,
    isFetching,
    refetch,
  };
};

export { useReleaseByTimeRange };
