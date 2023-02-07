import { lazyLoad } from 'utils/loadable'

export const AddPostPage = lazyLoad(
  () => import('./index'),
  module => module.AddPostPage,
)
