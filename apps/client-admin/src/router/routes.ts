import { RoutesType } from 'types/Utils'
import { DashboardPage } from 'app/pages/dashboard-page/Loadable'
import { ListPostPage } from 'app/pages/post/list-post-page/Loadable'
import { AddPostPage } from 'app/pages/post/add-post-page/Loadable'
import { EditPostPage } from 'app/pages/post/edit-post-page/Loadable'
import { ListRolePage } from 'app/pages/role/list-role-page/Loadable'
import { AddRolePage } from 'app/pages/role/add-role-page/Loadable'
import { ListUserPage } from 'app/pages/user/list-user-page/Loadable'
import { EditUserPage } from 'app/pages/user/edit-user-page/Loadable'
import { EditRolePage } from 'app/pages/role/edit-role-page/Loadable'
import { AddUserPage } from 'app/pages/user/add-user-page/Loadable'
import { ListSettingPage } from 'app/pages/setting/list-setting-page/Loadable'
import { AddSettingPage } from 'app/pages/setting/add-setting-page/Loadable'
import { EditSettingPage } from 'app/pages/setting/edit-setting-page/Loadable'
import { SeoSettingPage } from 'app/pages/setting/seo-setting-page/Loadable'
import { NewsSettingPage } from 'app/pages/setting/news-setting-page/Loadable'
import { IndexSettingPage } from 'app/pages/setting/index-setting-page/Loadable'
import { ListSchedulePage } from 'app/pages/setting/list-schedule-page/Loadable'
import { ROUTE_NAMES } from 'utils/constants'

export const ROUTES: RoutesType[] = [
  { path: '/', exact: true, name: 'Home', component: DashboardPage },

  /** Post route */
  { path: '/post/list', exact: true, name: ROUTE_NAMES.postList, component: ListPostPage },
  { path: '/post/add', exact: true, name: ROUTE_NAMES.postAdd, component: AddPostPage },
  { path: '/post/edit/:id', exact: true, name: ROUTE_NAMES.postEdit, component: EditPostPage },

  /** Role routing */
  { path: '/role/list', exact: true, name: ROUTE_NAMES.roleList, component: ListRolePage },
  { path: '/role/add', exact: true, name: ROUTE_NAMES.roleAdd, component: AddRolePage },
  { path: '/role/edit/:id', exact: true, name: ROUTE_NAMES.roleEdit, component: EditRolePage },

  /** User routing */
  { path: '/user/list', exact: true, name: ROUTE_NAMES.userList, component: ListUserPage },
  { path: '/user/add', exact: true, name: ROUTE_NAMES.userAdd, component: AddUserPage },
  { path: '/user/edit/:id', exact: true, name: ROUTE_NAMES.userEdit, component: EditUserPage },

  /** Setting routing */
  { path: '/setting/list', exact: true, name: ROUTE_NAMES.settingList, component: ListSettingPage },
  { path: '/setting/add', exact: true, name: ROUTE_NAMES.settingAdd, component: AddSettingPage },
  { path: '/setting/edit/:id', exact: true, name: ROUTE_NAMES.settingEdit, component: EditSettingPage },
  { path: '/setting/seo-setting-page', exact: true, name: ROUTE_NAMES.seoSetting, component: SeoSettingPage },
  { path: '/setting/news-setting-page', exact: true, name: ROUTE_NAMES.newsSetting, component: NewsSettingPage },
  { path: '/setting/index-setting-page', exact: true, name: ROUTE_NAMES.trangChuBlockSetting, component: IndexSettingPage },
  { path: '/setting/list-schedule-page', exact: true, name: ROUTE_NAMES.scheduleSettingList, component: ListSchedulePage },
]

export const ROUTE_RECORDS = ROUTES.reduce((acc, cur) => {
  if (!acc[cur.name!]) {
    acc[cur.name!] = {
      exact: cur.exact,
      path: cur.path,
      name: cur.name,
    }
  }
  return acc
}, {} as Record<string, Pick<RoutesType, 'exact' | 'path' | 'name'>>)

export const DEFAULT_ROUTE = '/dashboard'
export const PAGE_NOTFOUND = '/page-notfound'
