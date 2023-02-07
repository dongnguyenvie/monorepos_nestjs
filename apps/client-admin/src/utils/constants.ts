import { TablePaginationConfig } from 'antd/lib/table'

export const API_PREFIX = 'api'
export const API_VERSION = 'v1'

export const LOCALSTORAGE_PREFIX = 'sv::'

export const ACCESS_TOKEN_KEY = LOCALSTORAGE_PREFIX + 'token'

export const PAGE_SIZE_DEFAULT = 10

export const LOCAL_STORE_DB_NAME = 'localstore-db'
export const COLLECT_KEY = 'local-collect'

export const AUDIO_LISTED_HISTORY_KEY = 'AUDIO_LISTED_HISTORY_KEY'

export const FORMAT_SLUG = '.html'

export const APP_SETTINGS = 'APP_SETTINGS'

export const HTTP_CODES = {
  success: 200,
  notFound: 404,
  unauthorized: 401,
}

export const HIDDEN_ROLE = '__PLAPI__'
export const MESSAGES = {
  updateSuccessfully: 'Cập nhập thành công',
  createSuccessfully: 'Tạo thành công',
  deleteSuccessfully: 'Xóa thành công',
  recoverSuccessfully: 'Khôi phục thành công',
  approveSucessfully: 'Chấp nhận yêu cầu thành công',
  rejectSucessfully: 'Từ chối yêu cầu thành công',
  deleteFailed: 'Xóa thất bại',
  updateFailed: 'Cập nhập thất bại',
  createFailed: 'Tạo thất bại',
  recoverFailed: 'Khôi phục thất bại',
  approveFailed: 'Chấp nhận yêu cầu thất bại',
  rejectFailed: 'Từ chối yêu cầu thất bại',
  fail: 'Có lỗi xảy ra!!!',
}

export const TABLE_DROPDOWN_OPTIONS = {
  active: {
    value: 0,
    label: 'Danh sách hiện tại',
  },
  deleted: {
    value: 1,
    label: 'Danh sách đã xóa',
  },
}

export const SEO_ROUTING = 'SEO_ROUTING'

export const DEFAULT_PAGINATION: TablePaginationConfig = {
  pageSize: 10 as number,
  total: 10,
}

export enum RecordStatus {
  DELETE = 0,
  ACTIVE = 1,
  LOCK = 2,
}

export const GOLD_PRICE_STATUS = {
  // DELETE = 0,
  // ACTIVE = 1,
  // LOCK = 2,
  //   custom status
  awaitingApproval: {
    value: 3,
    label: 'Đang chờ xác nhận',
  },
  approved: {
    value: 4,
    label: 'Đã xác nhận',
  },
  rejected: {
    value: 5,
    label: 'Đã từ chối',
  },
  verificated: {
    value: 6,
    label: 'Đã verification',
  },
}
export const ROLE_MASTER = 'all'

export const API_PREFIX_V1 = process.env.REACT_APP_REST_ENDPOINT + '/api/' + API_VERSION

export const API_ENDPOINTS = {
  uploadFile: API_PREFIX_V1 + '/file',
}

export const SETUP_SCHEDULE_CRONB = 'crawling:SETUP_SCHEDULE_CRONB'
export const SETUP_NEWS_BLOCK = 'sv:SETUP_NEWS_BLOCK'

export const ROUTE_NAMES = {
  // category
  categoryList: 'category-list',
  categoryAdd: 'category-add',
  categoryEdit: 'category-edit',

  // post
  postList: 'post-list',
  postAdd: 'post-add',
  postEdit: 'post-edit',

  // tag
  tagList: 'post-list',
  tagAdd: 'post-add',
  tagEdit: 'post-edit',

  // comment
  commentList: 'comment-list',
  commentAdd: 'comment-add',

  // role
  roleList: 'role-list',
  roleAdd: 'role-add',
  roleEdit: 'role-edit',

  // user
  userList: 'user-list',
  userAdd: 'user-add',
  userEdit: 'user-edit',

  // setting
  settingList: 'setting-list',
  settingAdd: 'setting-add',
  settingEdit: 'setting-edit',
  seoSetting: 'seo-setting-page',
  newsSetting: 'news-setting-page',
  trangChuBlockSetting: 'trang-chu-block-setting',
  scheduleSettingList: 'schedule-page-list',

  // Gold price sjc
  goldPriceList: 'gold-price-list',
  myGoldPriceList: 'my-gold-price-list',
  goldPriceAdd: 'gold-price-add',

  // Tỷ giá tham khảo request
  exchangeRefList: 'exchange-ref-list',
  myExchangeRefList: 'my-exchange-ref-list',
  exchangeRefAdd: 'exchange-ref-add',

  // Homepage
  homepageEdit: 'homepage-edit',

  // Membership
  membershipList: 'membership-list',
  membershipAdd: 'membership-add',
  membershipEdit: 'membership-edit',
}
