import { useCallback, useEffect } from 'react'
import { useInjectReducer } from 'utils/redux-injectors'
import { useDispatch, useSelector } from 'react-redux'
import { sliceKey, reducer, actions } from './slice'
import { selectCurrentPath, selectIsLocalMapping, selectTheme, selectDashboard } from './selectors'
import { AppSettings } from 'types/Utils'
// import { useGetSettingQuery } from 'graphql/autogenerated'

let useGetSettingQuery: any = () => {
  return {
    data: {
      getSettings: {},
    },
  }
}

export function useSettingsStore() {
  useInjectReducer({ key: sliceKey, reducer: reducer })
  const { data, loading, error, called } = useGetSettingQuery()

  const dispatch = useDispatch()

  const currentPath = useSelector(selectCurrentPath)
  const isLocalMapping = useSelector(selectIsLocalMapping)
  const currentTheme = useSelector(selectTheme)
  const dashboard = useSelector(selectDashboard)

  useEffect(() => {
    dispatch(actions.loadedSettings({ settings: data?.getSettings }))
  }, [dispatch])

  const handleUpdateStateLocalMapping = useCallback(() => {
    dispatch(actions.localMappingLoaded())
  }, [dispatch])

  const handleUpdateCurrentPath = useCallback(
    (path: string) => {
      dispatch(actions.updateCurrentPath({ path }))
    },
    [dispatch],
  )

  const handleUpdateNavigationDashboard = useCallback(
    (menu: any) => {
      dispatch(actions.updateMenu(menu))
    },
    [dispatch],
  )
  const handleUpdateSettings = useCallback(
    (payload: Partial<AppSettings> & Partial<AppSettings['dashboard']>) => {
      dispatch(actions.updateSettings(payload))
    },
    [dispatch],
  )

  return {
    currentPath,
    isLocalMapping,
    currentTheme,
    dashboard,
    handleUpdateStateLocalMapping,
    handleUpdateCurrentPath,
    handleUpdateNavigationDashboard,
    handleUpdateSettings,
  }
}
