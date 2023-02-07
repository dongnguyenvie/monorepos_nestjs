import { lazyLoad } from 'utils/loadable'

export const NewsSettingPage = lazyLoad(
  () => import('./index'),
  module => module.NewsSettingPage,
)
