/**
 * index.tsx
 *
 * This is the entry file for the application, only setup and boilerplate
 * code.
 */

import 'react-app-polyfill/ie11'
import 'react-app-polyfill/stable'

import * as React from 'react'
import * as ReactDOM from 'react-dom'
import { Provider as ProviderO } from 'react-redux'
import * as serviceWorker from 'serviceWorker'
import 'sanitize.css/sanitize.css'
import './App.scss'

// Apollo
import { ApolloProvider } from '@apollo/client'
import { apolloClient } from 'graphql/apollo-client'

// Import root app
import { App } from 'app'

import { configureAppStore } from 'store/configureStore'

// Initialize languages
import './locales/i18n'

export const store = configureAppStore()
const MOUNT_NODE = document.getElementById('root') as HTMLElement
const Provider = ProviderO as any
interface Props {
  Component: typeof App
}
const ConnectedApp = ({ Component }: Props) => (
  <ApolloProvider client={apolloClient}>
    <Provider store={store}>
      {/* <React.StrictMode> */}
      <Component />
      {/* </React.StrictMode> */}
    </Provider>
  </ApolloProvider>
)
const render = (Component: typeof App) => {
  ReactDOM.render(<ConnectedApp Component={Component} />, MOUNT_NODE)
}

if (module.hot) {
  // Hot reloadable translation json files and app
  // modules.hot.accept does not accept dynamic dependencies,
  // have to be constants at compile-time
  module.hot.accept(['./app', './locales/i18n'], () => {
    ReactDOM.unmountComponentAtNode(MOUNT_NODE)
    const App = require('./app').App
    render(App)
  })
}

render(App)

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
serviceWorker.unregister()
