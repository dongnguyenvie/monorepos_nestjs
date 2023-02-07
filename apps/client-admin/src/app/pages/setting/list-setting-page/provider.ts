import { notification } from 'antd'
import { selectSettings } from 'app/redux/settings/selectors'
import { actions } from 'app/redux/settings/slice'
import { useCallback, useEffect, useMemo } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { useHistory } from 'react-router-dom'
import { MESSAGES } from 'utils/constants'
import { getPathByName } from 'utils/utils'

let useDeleteSettingMutation: any = () => ({})
let useGetSettingQuery: any = () => ({})

export function useProvider() {
  const dispatch = useDispatch()
  const history = useHistory()
  const currentSettings = useSelector(selectSettings)
  const { data: settingData, loading: settingLoading, error: settingError, refetch: settingsRefetch } = useGetSettingQuery({
    fetchPolicy: 'no-cache',
  })
  const [handleDeleteSetting, { data: dataDelete, loading: loadingDelete, error: errorDelete, called: calledDelete }] = useDeleteSettingMutation({ fetchPolicy: 'no-cache' })

  useEffect(() => {
    if (!calledDelete || loadingDelete) return
    const notiFnc = errorDelete ? notification.error : notification.success
    notiFnc({
      message: errorDelete ? MESSAGES.deleteFailed : MESSAGES.deleteSuccessfully,
    })
    settingsRefetch()
  }, [dataDelete, errorDelete, loadingDelete, calledDelete])
  if (!currentSettings) {
    dispatch(actions.loadedSettings({ settings: settingData?.getSettings }))
  }

  const handleDelete = id => {
    handleDeleteSetting({
      variables: {
        setting: { id: id },
      },
    })
  }

  const handleEdit = useCallback(
    record => {
      const pathname = getPathByName('setting-edit', { id: record.id })
      history.push({ pathname })
    },
    [history],
  )

  return {
    settingData,
    settingError,
    settingLoading,
    handleDelete,
    handleEdit,
  }
}
