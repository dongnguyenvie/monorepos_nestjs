import React from 'react'
import { Form, Input, Button, Alert, Row, Col, notification, Typography } from 'antd'
import { RouteComponentProps, useHistory } from 'react-router-dom'
import { useProvider } from './provider'
import { Spin } from 'app/components/Spin'
const { TextArea } = Input
const { Title } = Typography

export type Props = RouteComponentProps<{ id: string }, {}, { isFetchData?: boolean }> & {}
export function EditSettingPage(props: Props) {
  const id = props.match.params.id
  const [form] = Form.useForm()
  const { loadingUpdate, dataGetSetting, loadingGetSetting, errorGetSetting, handleUpdate } = useProvider(form, id)

  return (
    <div style={{ paddingTop: 20, paddingBottom: 20 }}>
      <Title>Chỉnh sửa chủ để</Title>
      {!loadingGetSetting && errorGetSetting && <Alert type="error" message={errorGetSetting.message} banner />}
      <Spin spinning={loadingUpdate} tip="Loading...">
        <Form layout="vertical" form={form} onFinish={handleUpdate}>
          <Row gutter={24}>
            <Col span={12}>
              <Form.Item hasFeedback label="Key" name={'key'} rules={[{ required: true }]}>
                <Input placeholder="Nhập key" />
              </Form.Item>
            </Col>
            <Col span={12}>
              <Form.Item hasFeedback label="Value" name={'value'} rules={[{ required: true }]}>
                <Input placeholder="Nhập value" />
              </Form.Item>
            </Col>
          </Row>
          <Form.Item hasFeedback label="Giá trị mặc định" name={'defaultValue'} rules={[{ required: true }]}>
            <Input placeholder="Nhập giá trị mặc định" />
          </Form.Item>
          <Form.Item>
            <Button type="primary" htmlType="submit">
              Sửa
            </Button>
          </Form.Item>
        </Form>
      </Spin>
    </div>
  )
}
