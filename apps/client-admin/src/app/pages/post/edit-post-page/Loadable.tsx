import { lazyLoad } from 'utils/loadable'

export const EditPostPage = lazyLoad(
  () => import('./index'),
  module => module.EditPostPage,
)
