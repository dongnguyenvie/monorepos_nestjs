import { lazyLoad } from 'utils/loadable'

export const ListPostPage = lazyLoad(
  () => import('./index'),
  module => module.ListPostPage,
)
