import { lazyLoad } from 'utils/loadable'

export const EditSettingPage = lazyLoad(
  () => import('./index'),
  module => module.EditSettingPage,
)
