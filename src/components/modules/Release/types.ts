import type { Moment } from 'moment';

export type ReleaseProps = {
  owner: string;
  repo: string;
  from: Moment;
  to: Moment;
};
