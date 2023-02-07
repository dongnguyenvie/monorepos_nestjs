import { Form, notification } from 'antd'
import { actions } from 'app/redux/settings/slice'
import { useEffect, useMemo } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { MESSAGES } from 'utils/constants'

let useCreateSettingMutation: any = () => ({})

export function useProvider(form) {
  const dispatch = useDispatch()
  const [handleCreateSetting, { data: dataCreate, loading: loadingCreate, error: errorCreate, called }] = useCreateSettingMutation({
    onError: () => {},
  })

  useEffect(() => {
    if (!called || loadingCreate) return
    const notiFnc = errorCreate ? notification.error : notification.success
    notiFnc({
      message: errorCreate ? MESSAGES.createFailed : MESSAGES.createSuccessfully,
    })
  }, [dataCreate, errorCreate, loadingCreate, called])

  // dispatch(actions.loadedSettings({ settings: settingData?.getSettings }))

  const handleCreate = async () => {
    const row = await form.validateFields()
    handleCreateSetting({
      variables: {
        setting: {
          ...row,
        },
      },
    })
    form.resetFields()
  }

  return {
    loadingCreate,
    handleCreate: handleCreate,
  }
}
