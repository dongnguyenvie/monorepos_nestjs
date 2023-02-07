import { RouteProps, RouteComponentProps } from 'react-router-dom'
import { TeamOutlined } from '@ant-design/icons'

export type ValueOf<T> = T[keyof T]

export type RouteExtensionProps = RouteProps & { name?: string }
export type RoutesType = RouteExtensionProps & { component?: (props: RouteComponentProps<any, any, any>) => JSX.Element }
// export type NavigationType = typeof navigationLst[number] & { icon?: any; childrens: typeof navigationLst[number] };
export interface NavigationType {
  label: string
  path?: string
  icon?: typeof TeamOutlined
  scp?: string
  childrens?: NavigationType[]
  callback?: () => void
}

export interface LocalStorageEx {
  _prefix: string
  set(key: string, value: any): boolean
  get(key: string, defaultValue: any): any
  clearAll(): boolean
  getKey(key: string): string
  clear(key: string): boolean
}

export interface DataResponse<T = any> {
  count: number
  links: {
    next: string | null
    previous: string | null
  }
  results: T[]
}

export enum ErrorType {
  RESPONSE_ERROR = 1,
}

export interface AppSettings {
  theme: 'dark' | 'light'
  dashboard: {
    menu: {
      keySelected: string[]
      keyOpened: string[]
    }
  }
  path: string
  isLocalMapping: boolean
  settings: any
}

export enum MenuDashboard {
  expand = 'expand',
  active = 'active',
}
export interface IRouteComponentProps extends Partial<RouteComponentProps> {
  exact?: boolean
  path: string | string[] | undefined
  component?: React.ComponentType<any>
  name?: string
  isAuth?: boolean
}
