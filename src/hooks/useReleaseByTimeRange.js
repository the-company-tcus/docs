import { useInfiniteQuery } from '@tanstack/react-query';
import moment from 'moment';

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
  const fromTime = moment(from, 'MM-DD-YYYY');
  const toTime = moment(to, 'MM-DD-YYYY');

  if (toTime.isBefore(fromTime)) {
    throw new Error('From date is greater than to date');
  }
  const { data, fetchNextPage, hasNextPage, isFetching } = useInfiniteQuery({
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

      // Ref: https://stackoverflow.com/a/901144/12512981
      const params = new Proxy(new URLSearchParams(new URL(url).search), {
        get: (searchParams, prop) => searchParams.get(prop),
      });

      const prevPage = params.page;

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
  };
};

export { useReleaseByTimeRange };
