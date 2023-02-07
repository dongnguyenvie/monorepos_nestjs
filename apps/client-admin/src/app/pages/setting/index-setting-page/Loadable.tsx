import { lazyLoad } from 'utils/loadable'

export const IndexSettingPage = lazyLoad(
  () => import('./index'),
  module => module.IndexSettingPage,
)
