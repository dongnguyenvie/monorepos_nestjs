import { lazyLoad } from 'utils/loadable'

export const ListSettingPage = lazyLoad(
  () => import('./index'),
  module => module.ListSettingPage,
)
