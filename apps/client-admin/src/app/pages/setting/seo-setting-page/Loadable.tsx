import { lazyLoad } from 'utils/loadable'

export const SeoSettingPage = lazyLoad(
  () => import('./index'),
  module => module.SeoSettingPage,
)
