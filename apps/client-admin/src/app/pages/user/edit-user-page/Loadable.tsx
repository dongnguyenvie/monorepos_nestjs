import { lazyLoad } from 'utils/loadable'

export const EditUserPage = lazyLoad(
  () => import('./index'),
  module => module.EditUserPage,
)
