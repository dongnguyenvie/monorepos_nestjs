import React from 'react'
import { Form, Input, Button, Typography, Row, Col, Spin } from 'antd'
import { useProvider } from './provider'
const { Title } = Typography

let SpinS = Spin as any
export function AddSettingPage() {
  const [form] = Form.useForm()
  const { loadingCreate, handleCreate } = useProvider(form)

  return (
    <div style={{ paddingTop: 20, paddingBottom: 20 }}>
      <Title>Tạo cài đặt</Title>
      <SpinS spinning={loadingCreate} tip="Loading...">
        <Form layout="vertical" form={form} onFinish={handleCreate}>
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
              Tạo
            </Button>
          </Form.Item>
        </Form>
      </SpinS>
    </div>
  )
}
