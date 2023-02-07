import React, { useCallback } from 'react'
import { Menu } from 'antd'

import { navigationLst } from 'utils/navigation'
import { NavigationType, MenuDashboard } from 'types/Utils'
import { authentication } from '../../../../utils/authentication'
import { ROLE_MASTER } from '../../../../utils/constants'
import '../style.module.css'

const { SubMenu } = Menu

interface NavigationLeftProps {
  navigationData: typeof navigationLst
  menuKeySelected: string[]
  menuKeyOpened: string[]
  theme: any
  onActiveMenuItem: (key: string, type: MenuDashboard) => void
  onRedirectPage: (path: string, item?: boolean) => void
}

export function NavigationLeft(props: NavigationLeftProps) {
  const { menuKeySelected, menuKeyOpened, theme, onActiveMenuItem, onRedirectPage } = props
  const handleRedirectPage = useCallback(
    (path: string, index: string) => {
      if (path) {
        onRedirectPage(path)
        onActiveMenuItem(index, MenuDashboard.active)
      }
    },
    [onRedirectPage, onActiveMenuItem],
  )

  const renderItem = useCallback(
    (item: NavigationType, index: number | string, className = '') => (
      <Menu.Item
        key={String(index)}
        className={className}
        icon={item.icon ? <item.icon /> : null}
        onClick={() => {
          if (!item.path && item.callback) {
            item.callback()
          } else {
            handleRedirectPage(item.path || '', String(index))
          }
        }}
      >
        {item.label}
      </Menu.Item>
    ),
    [handleRedirectPage],
  )

  const renderSubmenu = useCallback(
    (item: NavigationType, index: number) => (
      <SubMenu key={`sub-${index}`} icon={item.icon ? <item.icon /> : null} className="root-menu1" title={item.label} onTitleClick={() => onActiveMenuItem(`sub-${index}`, MenuDashboard.expand)}>
        {item.childrens!.map((itemChild, indexChild) => renderItem(itemChild, `item-${index}-${indexChild}`, 'sub-menu'))}
      </SubMenu>
    ),
    [renderItem, onActiveMenuItem],
  )
  const scps = authentication.getScp()

  let navigationData: typeof navigationLst = []
  if (scps.includes(ROLE_MASTER)) {
    navigationData = props.navigationData
  } else {
    props.navigationData.forEach(item => {
      if (item.childrens) {
        const childrens = item.childrens.filter(info => !info.scp || scps.includes(info.scp))
        if (childrens.length > 0) {
          navigationData.push({ ...item, childrens: childrens })
        }
      } else {
        navigationData.push(item)
      }
    })
  }

  return (
    <Menu theme={theme} defaultSelectedKeys={menuKeySelected} defaultOpenKeys={menuKeyOpened} mode="inline">
      {navigationData.map((item, index) => (item.childrens ? renderSubmenu(item, index) : renderItem(item, index, 'root-menu2')))}
    </Menu>
  )
}
