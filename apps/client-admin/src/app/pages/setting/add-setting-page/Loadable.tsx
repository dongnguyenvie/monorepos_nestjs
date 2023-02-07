import { lazyLoad } from 'utils/loadable'

export const AddSettingPage = lazyLoad(
  () => import('./index'),
  module => module.AddSettingPage,
)
