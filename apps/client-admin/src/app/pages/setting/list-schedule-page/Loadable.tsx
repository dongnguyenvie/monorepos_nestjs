import { lazyLoad } from 'utils/loadable'

export const ListSchedulePage = lazyLoad(
  () => import('./index'),
  module => module.ListSchedulePage,
)
