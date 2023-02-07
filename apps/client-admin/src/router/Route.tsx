import React from 'react'
import { Redirect, Route } from 'react-router-dom'
import { IRouteComponentProps } from 'types/Utils'
import { useGuard } from 'utils/hooks/guard'

export function RouteExtension({ component: Component, isAuth = false, location, path, ...otherProps }: IRouteComponentProps) {
  const { isNext, me } = useGuard({ isAuth })
  const isLogin = !!(me['username'] || me['email'])

  if (!isNext) {
    return <Redirect to={{ pathname: '/sign-in', state: { from: location } }} />
  }

  if (!isLogin && isAuth) {
    return (
      <>
        <Route {...otherProps} path={path} render={_ => <div>checking...</div>} />
      </>
    )
  }

  let C = Component as any
  return (
    <>
      <Route {...otherProps} path={path} render={_props => (Component ? <C {..._props} me={me} /> : null)} />
    </>
  )
}
