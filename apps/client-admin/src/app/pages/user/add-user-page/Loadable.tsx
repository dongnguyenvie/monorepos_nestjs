import { lazyLoad } from 'utils/loadable'

export const AddUserPage = lazyLoad(
  () => import('./index'),
  module => module.AddUserPage,
)
