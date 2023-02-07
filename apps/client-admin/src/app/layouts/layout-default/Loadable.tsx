import { lazyLoad } from 'utils/loadable';

export const LayoutDefault = lazyLoad(
  () => import('./index'),
  module => module.LayoutDefault,
);
