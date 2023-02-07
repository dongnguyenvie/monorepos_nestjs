import * as H from 'history'

export interface RouteComponentProps<P> {
  match: match<P>
  location: H.Location
  history: H.History
  // staticContext?: any
}

export interface match<P> {
  params: P
  isExact: boolean
  path: string
  url: string
}
