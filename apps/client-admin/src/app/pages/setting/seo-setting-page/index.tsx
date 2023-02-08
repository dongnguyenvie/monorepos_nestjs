import React, { useEffect, useMemo, useState } from 'react'
import { Form, Input, Button, Space, Row, Col, Divider, Typography, notification, Modal } from 'antd'
import { MinusCircleOutlined, PlusOutlined, EditOutlined } from '@ant-design/icons'
import { useForm } from 'antd/lib/form/Form'
import { MESSAGES, SEO_ROUTING } from 'utils/constants'
const { Title } = Typography

let useGetSettingByKeyQuery: any = () => ({} as any)
let useCreateOrUpdateSeoPageMutation: any = () => ({} as any)

export const SeoSettingPage = () => {
  const { data: dataSeoPage, loading: loadingSeoPage, error: errorSeoPage } = useGetSettingByKeyQuery({
    variables: {
      setting: {
        key: SEO_ROUTING,
      },
    },
    fetchPolicy: 'no-cache',
  })
  const [fetchCreateSeoPage, { data: updateSeopageData, loading: updateSeopageLoading, error: updateSeopageError, called: updateSeopageCalled }] = useCreateOrUpdateSeoPageMutation({
    onError: () => {},
  })
  const [isOpenPopup, setIsOpenPopup] = useState(false)
  const [itemSelected, setItemSelected] = useState(-1)
  const [tempDataSeoPage, setTempDataSeoPage] = useState<any>([])

  const [form] = Form.useForm()

  const onFinish = values => {
    try {
      const seoValue = values.seo.reduce((acc, cur, index) => {
        acc[cur.slug] = tempDataSeoPage[index] || {}
        return acc
      }, {})

      fetchCreateSeoPage({
        variables: { setting: { jsonValue: seoValue } },
      })
    } catch (error) {}
  }

  const handleOpenEditPopup = (name: number) => {
    setItemSelected(name)
    setIsOpenPopup(true)
  }

  const handleOkPopup = async (data: any) => {
    try {
      const { name, value } = data
      tempDataSeoPage[name] = value
      setTempDataSeoPage([...tempDataSeoPage])
      setIsOpenPopup(false)
    } catch (error) {}
  }

  const handleRemoveItem = (remove: any, name) => {
    tempDataSeoPage.splice(name, 1)
    setTempDataSeoPage(tempDataSeoPage)
    remove(name)
  }

  const currentItem = useMemo(() => {
    return tempDataSeoPage[itemSelected] || {}
  }, [itemSelected, tempDataSeoPage])

  const handleFormChange = data => {}

  const dataSeoPageParsed = useMemo(() => {
    try {
      const d = dataSeoPage?.getSettingByKey.jsonValue || {}
      return Object.keys(d).map(key => ({ slug: key }))
    } catch (error) {
      return []
    }
  }, [dataSeoPage])

  useEffect(() => {
    if (!loadingSeoPage && !errorSeoPage) {
      try {
        const d = dataSeoPage?.getSettingByKey.jsonValue || {}
        setTempDataSeoPage(Object.values(d))
      } catch (error) {}

      form.setFieldsValue({
        seo: dataSeoPageParsed,
      })
    }
  }, [dataSeoPage, loadingSeoPage, errorSeoPage, dataSeoPageParsed])

  useEffect(() => {
    if (!updateSeopageCalled || updateSeopageLoading) return
    const notiFnc = updateSeopageError ? notification.error : notification.success
    notiFnc({
      message: updateSeopageError ? MESSAGES.updateFailed : MESSAGES.updateSuccessfully,
    })
  }, [updateSeopageData, updateSeopageLoading, updateSeopageError])

  return (
    <div>
      <Title>Chỉnh sửa quyền</Title>
      <Divider plain> ... </Divider>

      <p>
        Nếu page có dạng http://abc.com/<b>duong-dan-page</b> thì hãy điền vào input <b>/duong-dan-page</b>
      </p>
      <Divider plain> Chỉ hỗ trợ cho page, không hỗ trợ cho bài viết </Divider>
      <Form form={form} name="dynamic_form_nest_item" onFinish={onFinish} onChange={handleFormChange} autoComplete="off">
        <Form.List name="seo">
          {(fields, { add, remove }) => (
            <>
              {fields.map(({ key, name, fieldKey, ...restField }) => (
                <Space key={key} style={{ display: 'flex', marginBottom: 8, flex: 1 }} align="baseline">
                  {/* <Form.Item {...restField} name={[name, 'slug']} fieldKey={[fieldKey, 'slug']} rules={[{ required: true, message: 'Vui lòng không để trống đường dẫn' }]}>
                    <Input placeholder="Đường dẫn page" />
                  </Form.Item> */}

                  <input style={{ width: '200px' }} placeholder={(tempDataSeoPage[name] && tempDataSeoPage[name].title) || 'Title'} disabled />

                  <Button block={true} type="primary" onClick={() => handleOpenEditPopup(name)}>
                    Thêm thuộc tính seo
                  </Button>
                  <Button block={true} type="primary" onClick={() => handleRemoveItem(remove, name)}>
                    Xóa
                  </Button>
                </Space>
              ))}
              <Form.Item>
                <Button type="dashed" onClick={() => add()} block icon={<PlusOutlined />}>
                  Thêm page
                </Button>
              </Form.Item>
            </>
          )}
        </Form.List>
        <Form.Item>
          <Button type="primary" htmlType="submit">
            Cập nhập SEO
          </Button>
        </Form.Item>
        <EditingPopup visible={isOpenPopup} onSetVisible={setIsOpenPopup} data={currentItem} name={itemSelected} onSubmit={handleOkPopup} />
      </Form>
    </div>
  )
}

const SEO_FIELDS = [
  {
    key: 'title',
    label: 'title',
  },
  {
    key: 'description',
    label: 'description',
  },
  {
    key: 'canonical',
  },
  {
    key: 'openGraph.title',
  },
  {
    key: 'openGraph.description',
  },
  {
    key: 'openGraph.images',
  },
  {
    key: 'openGraph.site_name',
  },
]

interface EditingPopupProps {
  visible: boolean
  onSetVisible: (visible: boolean) => void
  data: any
  name: number
  onSubmit: (data: any) => void
}
const EditingPopup = (props: EditingPopupProps) => {
  const [form] = useForm()

  const handleOk = async () => {
    const value = await form.validateFields()
    props.onSubmit({ value: JSON.parse(JSON.stringify(value)), name: props.name })
    form.resetFields()
  }

  const handleCancel = e => {
    props.onSetVisible(false)
  }

  useEffect(() => {
    form.setFieldsValue({ ...props.data })
  }, [props.data, form])

  return (
    <>
      <Modal title="Chỉnh meta SEO cho page" open={props.visible} onOk={handleOk} onCancel={handleCancel} okButtonProps={{}} cancelButtonProps={{}}>
        <div style={{ maxHeight: '80vh', overflowY: 'auto' }}>
          <Form layout="vertical" form={form}>
            {SEO_FIELDS.map(f => (
              <Form.Item key={f.key} label={f.key} hasFeedback initialValue="" name={f.key} rules={[{}]}>
                <Input placeholder={f.key} />
              </Form.Item>
            ))}
          </Form>
        </div>
      </Modal>
    </>
  )
}
