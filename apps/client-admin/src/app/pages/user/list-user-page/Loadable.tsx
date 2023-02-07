import { lazyLoad } from 'utils/loadable'

export const ListUserPage = lazyLoad(
  () => import('./index'),
  module => module.ListUserPage,
)
