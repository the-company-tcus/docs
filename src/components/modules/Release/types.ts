import type { Moment } from 'moment';

export type ReleaseProps = {
  owner: string;
  repo: string;
  from: string | Moment;
  to: string | Moment;
};
