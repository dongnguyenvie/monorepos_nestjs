import { lazyLoad } from 'utils/loadable'

export const ListRolePage = lazyLoad(
  () => import('./index'),
  module => module.ListRolePage,
)
