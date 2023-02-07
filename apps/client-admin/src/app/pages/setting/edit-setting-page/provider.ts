import { Form, notification } from 'antd'
import { actions } from 'app/redux/settings/slice'
import { useEffect, useMemo } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { useHistory } from 'react-router-dom';
import { MESSAGES } from 'utils/constants'

let useGetSettingByIdQuery: any = () => ({} as any)
let useUpdateSettingMutation: any = () => ({} as any)


export function useProvider(form, id) {
  const dispatch = useDispatch()
  const history = useHistory()
  const [handleUpdateSetting, { data: dataUpdate, loading: loadingUpdate, error: errorUpdate, called }] = useUpdateSettingMutation({
    onError: () => {},
  })
  const { data: dataGetSetting, loading: loadingGetSetting, error: errorGetSetting } = useGetSettingByIdQuery({
    variables: {
      setting: {
        id,
      },
    },
  })

  useEffect(() => {
    if (loadingGetSetting || errorGetSetting) return
    form.setFieldsValue({
      ...dataGetSetting?.getSettingById,
    })
  }, [dataGetSetting, loadingGetSetting, errorGetSetting])

  useEffect(() => {
    if (!called || loadingUpdate) return
    const notiFnc = errorUpdate ? notification.error : notification.success
    notiFnc({
      message: errorUpdate ? MESSAGES.updateFailed : MESSAGES.updateSuccessfully,
    })
    history.push('/setting/list')
  }, [dataUpdate, errorUpdate, loadingUpdate, called])

  // dispatch(actions.loadedSettings({ settings: settingData?.getSettings }))

  const handleUpdate = async () => {
    const row = await form.validateFields()
    handleUpdateSetting({
      variables: {
        setting: {
          id: id,
          ...row,
        },
      },
    })
  }

  return {
    loadingUpdate,
    dataGetSetting,
    loadingGetSetting,
    errorGetSetting,
    handleUpdate: handleUpdate,
  }
}
