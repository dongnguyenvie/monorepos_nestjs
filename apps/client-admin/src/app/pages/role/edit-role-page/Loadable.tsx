import { lazyLoad } from 'utils/loadable'

export const EditRolePage = lazyLoad(
  () => import('./index'),
  module => module.EditRolePage,
)
