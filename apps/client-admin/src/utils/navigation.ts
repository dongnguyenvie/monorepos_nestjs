import { DashboardOutlined, SnippetsOutlined, CaretRightOutlined, LogoutOutlined, TagsOutlined, BarsOutlined, SecurityScanOutlined, CommentOutlined, SettingOutlined } from '@ant-design/icons'
import { NavigationType } from 'types/Utils'
import { authentication } from './authentication'
import { RolesConstants } from './roles'

export const navigationLst: NavigationType[] = [
  {
    label: 'bảng điều khiển',
    path: '/',
    icon: DashboardOutlined,
  },
  // {
  //   label: 'Bài viết',
  //   icon: SnippetsOutlined,
  //   childrens: [
  //     {
  //       label: 'Tất cả bài viết',
  //       path: '/post/list',
  //       scp: RolesConstants.getPosts,
  //     },
  //     {
  //       label: 'Tạo bài viết',
  //       path: '/post/add',
  //       scp: RolesConstants.createPost,
  //     },
  //   ],
  // },
  // {
  //   label: 'Gói memberships',
  //   icon: CommentOutlined,
  //   childrens: [
  //     {
  //       label: 'Danh sách',
  //       path: '#',
  //     },
  //     {
  //       label: 'Tạo gói',
  //       path: '#',
  //     },
  //   ],
  // },
  {
    label: 'Thành viên',
    icon: SecurityScanOutlined,
    childrens: [
      {
        label: 'Tất cả thành viên',
        path: '/user/list',
        // scp: RolesConstants.getUsers,
      },
      // {
      //   label: 'Tạo thành viên',
      //   path: '/user/add',
      //   scp: RolesConstants.updateUser,
      // },
    ],
  },
  {
    label: 'Quyền',
    icon: SecurityScanOutlined,
    childrens: [
      {
        label: 'Tất cả quyền',
        path: '/role/list',
        // scp: RolesConstants.getRoles,
      },
      {
        label: 'Tạo nhóm quyền',
        path: '/role/add',
        // scp: RolesConstants.createRole,
      },
    ],
  },
  // {
  //   label: 'Cài đặt',
  //   icon: SettingOutlined,
  //   childrens: [
  //     {
  //       label: 'Tất cả cài đặt',
  //       path: '/setting/list',
  //       scp: RolesConstants.getSettings,
  //     },
  //     {
  //       label: 'Tạo cài đặt',
  //       path: '/setting/add',
  //       scp: RolesConstants.createSetting,
  //     },
  //     // {
  //     //   label: 'Cấu hình Seo page',
  //     //   path: '/setting/seo-setting-page',
  //     //   scp: RolesConstants.createOrUpdateSeoPage,
  //     // },
  //     // {
  //     //   label: 'Cấu hình hiển thị trang tin tức',
  //     //   path: '/setting/news-setting-page',
  //     //   scp: RolesConstants.createOrUpdateSetting,
  //     // },
  //     // {
  //     //   label: 'Cấu hình hiển thị trang chủ',
  //     //   path: '/setting/index-setting-page',
  //     // },
  //     // {
  //     //   label: 'Cấu hình lịch trình crawling',
  //     //   path: '/setting/list-schedule-page',
  //     //   scp: RolesConstants.createOrUpdateSystmSetting,
  //     // },
  //   ],
  // },
  {
    label: 'Logout',
    icon: LogoutOutlined,
    callback: () => {
      authentication.logout()
      setTimeout(() => {
        window.location.reload()
      }, 200)
    },
  },
]
