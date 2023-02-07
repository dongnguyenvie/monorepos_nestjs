import { lazyLoad } from 'utils/loadable'

export const AddRolePage = lazyLoad(
  () => import('./index'),
  module => module.AddRolePage,
)
