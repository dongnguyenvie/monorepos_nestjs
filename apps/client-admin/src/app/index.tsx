/**
 *
 * App
 *
 * This component is the skeleton around the actual pages, and should only
 * contain code that should be seen on all pages. (e.g. navigation bar)
 */

import * as React from 'react'
import { Switch, BrowserRouter } from 'react-router-dom'

import { GlobalStyle } from 'styles/global-styles'

import { NotFoundPage } from './components/not-found-page/Loadable'
import { RouteExtension } from 'router/Route'
import { LayoutDefault } from 'app/layouts/layout-default'
import { LoginPage } from './pages/login-page/Loadable'
import { SignUp } from './pages/sign-up'

export function App() {
  let BrowserRouterA = BrowserRouter as any
  return (
    <BrowserRouterA>
      <Switch>
        {/* <RouteExtension exact path="/" name="" component={HomePage} /> */}
        <RouteExtension name="" path="/not-found" component={NotFoundPage} />
        <RouteExtension name="" path="/sign-in" component={LoginPage} />
        <RouteExtension name="" path="/sign-up" component={SignUp} />
        <RouteExtension path="/" isAuth={true} component={LayoutDefault} />
      </Switch>
      <GlobalStyle />
    </BrowserRouterA>
  )
}
