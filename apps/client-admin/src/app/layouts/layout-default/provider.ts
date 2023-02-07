import { useState, useCallback, useMemo } from 'react'
import { useHistory } from 'react-router-dom'

import { onAppSettings } from 'utils/helpers'
import { MenuDashboard } from 'types/Utils'
import { useSettingsStore } from 'app/redux/settings'
import cloneDeep from 'lodash/cloneDeep'

export const useLayoutDefault = () => {
  const { handleUpdateSettings, currentTheme, dashboard } = useSettingsStore()

  const [collapsed, setCollapse] = useState(false)

  const history = useHistory()

  const handleRedirectPage = useCallback(
    (path: string) => {
      history.push(path)
    },
    [history],
  )

  const menuSelected = useMemo(() => {
    return dashboard.menu
  }, [dashboard.menu])

  const theme = useMemo(() => {
    return currentTheme
  }, [currentTheme])

  const handleUpdateMenu = useCallback(
    (index: string, type: MenuDashboard) => {
      let _menuSelected = cloneDeep(menuSelected)

      switch (type) {
        case MenuDashboard.active:
          _menuSelected.keySelected = [index]
          break
        case MenuDashboard.expand:
          _menuSelected.keyOpened = [..._menuSelected.keyOpened.filter(i => i !== index), index]
          break
      }

      handleUpdateSettings({
        path: history.location.pathname,
        menu: _menuSelected,
      })
    },
    [handleUpdateSettings, menuSelected, history.location.pathname],
  )

  // const handleUpdateCollect = useCallback((index: string) => {}, [appSettings])

  return {
    collapsed,
    setCollapse,
    handleRedirectPage,
    menuSelected,
    handleUpdateMenu,
    theme,
  }
}
