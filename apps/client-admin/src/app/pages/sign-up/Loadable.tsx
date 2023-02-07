import { lazyLoad } from 'utils/loadable'

export const SignUp = lazyLoad(
  () => import('./index'),
  module => module.SignUp,
)
