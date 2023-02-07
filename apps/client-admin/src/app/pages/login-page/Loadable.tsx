import { lazyLoad } from 'utils/loadable'
// import styled from 'styled-components/macro'

// const LoadingWrapper = styled.div`
//   width: 100%;
//   height: 100vh;
//   display: flex;
//   align-items: center;
//   justify-content: center;
// `

// const LoadingItem = () => <div>Loading....</div>;

export const LoginPage = lazyLoad(
  () => import('./index'),
  module => module.LoginPage,
)
