import React, { useEffect, useMemo } from 'react'
import { MESSAGES, SETUP_SCHEDULE_CRONB } from 'utils/constants'
import _get from 'lodash/get'
import { Form, Input, Button, Space, Typography, Divider, Row, notification, Select, Checkbox, Tag } from 'antd'
import { MinusCircleOutlined, PlusOutlined } from '@ant-design/icons'
import { Spin } from 'app/components/Spin'

let useCreateOrUpdateSystmSettingMutation: any = () => ({})
let useGetSystemEventsQuery: any = () => ({})
let useGetSystmSettingByKeyQuery: any = () => ({})

const { Title, Text } = Typography
const { TextArea } = Input

const StatusCodeSchedule = {
  crawlingService: 0,
  apiService: 1,
}

const boxStyle = {
  border: '1px dashed gray',
  padding: '10px',
  borderRadius: '5px',
  marginBottom: '11px',
}

export const ListSchedulePage = () => {
  const [form] = Form.useForm()
  const { data: scheduleData, called: scheduleCalled, loading: scheduleLoading, error: scheduleError, refetch: scheduleRefetch } = useGetSystmSettingByKeyQuery({
    fetchPolicy: 'no-cache',
    variables: {
      systmSetting: {
        key: SETUP_SCHEDULE_CRONB,
      },
    },
  })

  const { data: systemEventsData, loading: systemEventsLoading } = useGetSystemEventsQuery()

  const [fetchUpdateSetting, { data: updateSettingData, error: updateSettingError, loading: updateSettingLoading, called: updateSettingCalled }] = useCreateOrUpdateSystmSettingMutation()

  const canUpdate = useMemo(() => {
    if (scheduleLoading || !scheduleCalled) return false
    const errors = _get(scheduleError, 'graphQLErrors', [])
    const _canCreate = errors.some(e => _get(e, 'extensions.code', false) === '404')
    return _canCreate || !!scheduleData
  }, [scheduleCalled, scheduleError, scheduleLoading, scheduleData])

  const eventsOtp = useMemo(() => {
    return systemEventsData?.getSystemEvents.keys?.map(value => ({ value })) || []
  }, [systemEventsData])

  const onFinish = values => {
    const cronSetup = _get(values, 'crons', []).map(event => {
      const events = _get(event, 'events', [])
      const time = _get(event, 'time', '')
      const code = _get(event, 'code', 0)
      const desc = _get(event, 'desc', '')
      const status = _get(event, 'status', 0) ? 1 : 0
      return {
        time,
        events,
        desc,
        code,
        status,
      }
    })

    fetchUpdateSetting({
      variables: {
        systmSetting: {
          key: SETUP_SCHEDULE_CRONB,
          value: cronSetup,
        },
      },
    })
  }

  useEffect(() => {
    if (!updateSettingCalled || updateSettingLoading) return
    const notiFnc = updateSettingError ? notification.error : notification.success
    notiFnc({
      message: updateSettingError ? MESSAGES.updateFailed : MESSAGES.updateSuccessfully,
    })
    scheduleRefetch()
  }, [updateSettingData, updateSettingError, updateSettingLoading, updateSettingCalled])

  useEffect(() => {
    if (scheduleLoading || scheduleError) return
    const values = scheduleData?.getSystmSettingByKey.value || []
    const cronSetup = values.map(event => {
      const events = _get(event, 'events', [])
      const time = _get(event, 'time', '')
      const code = _get(event, 'code', 0)
      const status = !!_get(event, 'status', 0)
      const desc = _get(event, 'desc', '')
      return {
        events,
        time,
        code,
        status,
        desc,
      }
    })

    form.setFieldsValue({
      crons: cronSetup,
    })
  }, [scheduleData, scheduleCalled, scheduleLoading, scheduleError])

  return (
    <Spin tip="Loading..." spinning={scheduleLoading || updateSettingLoading || systemEventsLoading}>
      <div className="list-schedule-page" style={{ paddingTop: 20, paddingBottom: 20 }}>
        <Title>Cấu hình lịch crawling service</Title>
        <Divider plain></Divider>
        <p>
          định dạng: <b>schedule</b>::<b>event_name</b>
        </p>
        <p>
          <b>schedule</b>:{' '}
          <a href="https://crontab.guru/" target="_blank" rel="noreferrer">
            https://crontab.guru/
          </a>
        </p>
        <p>
          <b>event_name</b>: tên event trong crawling service.
          <div style={{ maxHeight: '200px', overflowY: 'scroll', border: '1px solid #000' }}>
            <code>
              <pre>{JSON.stringify(_get(systemEventsData, 'getSystemEvents.keys'), null, 2)}</pre>
            </code>
          </div>
        </p>
        <Divider plain></Divider>
        {!canUpdate && (
          <div>
            <Title type="danger">Có lỗi trong trình lấy dữ liệu.</Title>
            <div onClick={() => scheduleRefetch()} style={{ cursor: 'pointer' }}>
              <Title type="warning" level={3}>
                Click vào đây để tải lại {'<<'}
              </Title>
            </div>
          </div>
        )}
        {canUpdate && (
          <div>
            <Form name="dynamic_form_nest_item" form={form} onFinish={onFinish} autoComplete="off">
              <Form.List name="crons">
                {(fields, { add, remove }) => (
                  <>
                    {/* {fields.map(({ key, name, fieldKey, ...restField }) => (
                      <Space key={key} style={{ display: 'flex', ...boxStyle, flexWrap: 'wrap', flexDirection: 'column', width: '100%' }} align="baseline">
                        <Space style={{ display: 'flex' }} align="baseline">
                          <Form.Item
                            {...restField}
                            style={{ minWidth: '300px' }}
                            name={[name, 'time']}
                            fieldKey={[fieldKey, 'time']}
                            rules={[{ required: true, message: 'Cron time không được bỏ trống' }]}
                          >
                            <Input placeholder="Cron time" />
                          </Form.Item>
                          <Form.Item
                            {...restField}
                            name={[name, 'code']}
                            initialValue={StatusCodeSchedule.apiService}
                            fieldKey={[fieldKey, 'code']}
                            rules={[{ required: true, message: 'key không được bỏ trống' }]}
                          >
                            <Input disabled placeholder="Event name" />
                          </Form.Item>

                          <Form.Item name={[name, 'status']} initialValue={true} valuePropName="checked" rules={[]}>
                            <Checkbox>Hoạt động</Checkbox>
                          </Form.Item>

                          <MinusCircleOutlined onClick={() => remove(name)} />
                        </Space>

                        <Form.Item
                          {...restField}
                          style={{ width: '100%', minWidth: '300px' }}
                          name={[name, 'events']}
                          fieldKey={[fieldKey, 'events']}
                          rules={[{ required: true, message: 'Event name không được bỏ trống' }]}
                        >
                          <Select mode="tags" style={{ width: '100%', minWidth: '300px' }} placeholder="events" options={eventsOtp}></Select>
                        </Form.Item>
                        <Form.Item {...restField} style={{ minWidth: '300px' }} name={[name, 'desc']} fieldKey={[fieldKey, 'desc']} rules={[{ required: true, message: 'Mô tả không thể bỏ trống' }]}>
                          <TextArea placeholder="Mô tả" autoSize={{ minRows: 2, maxRows: 6 }} />
                        </Form.Item>
                      </Space>
                    ))} */}
                    <Form.Item>
                      <Button type="dashed" onClick={() => add()} block icon={<PlusOutlined />}>
                        Thêm cài đặt
                      </Button>
                    </Form.Item>
                  </>
                )}
              </Form.List>
              <Form.Item>
                <Button type="primary" htmlType="submit" disabled={!canUpdate}>
                  Cập nhập
                </Button>
              </Form.Item>
            </Form>
          </div>
        )}
      </div>
    </Spin>
  )
}
