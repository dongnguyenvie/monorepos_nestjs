import { Button, Checkbox, Col, Divider, Form, InputNumber, Radio, Rate, Row, Select, Slider, Switch, Typography, Upload } from 'antd'
import React, { useCallback, useEffect, useMemo, useState } from 'react'
import { UploadOutlined, InboxOutlined } from '@ant-design/icons'

const { Option } = Select
const { Title } = Typography

const formItemLayout = {
  labelCol: { span: 6 },
  wrapperCol: { span: 14 },
}

const normFile = (e: any) => {
  console.log('Upload event:', e)
  if (Array.isArray(e)) {
    return e
  }
  return e && e.fileList
}

export const IndexSettingPage = () => {
  const onFinish = (values: any) => {
    console.log('Received values of form: ', values)
  }
  return (
    <div className="news-setting-page" style={{ paddingTop: 20, paddingBottom: 20 }}>
      <Title>Cài đặt trang chủ</Title>
      <Divider plain></Divider>
      <p>Bạn có thể tùy chọn hiển thị chuyên mục trên trang tin tức</p>
      <Divider plain></Divider>
      <div>
        <Form
          name="validate_other"
          {...formItemLayout}
          onFinish={onFinish}
          initialValues={{
            'input-number': 3,
            'checkbox-group': ['A', 'B'],
            rate: 3.5,
          }}
        >
          <Form.Item name="radio-group" label="Hiển thị giá vàng SJC">
            <Radio.Group defaultValue="all">
              <Radio value="member">chỉ thành viên</Radio>
              <Radio value="all">cho tất cả</Radio>
              <Radio value="hidden">ẩn</Radio>
            </Radio.Group>
          </Form.Item>

          <Form.Item name="switch" label="Hiện thông báo đăng khi đăng nhập" valuePropName="checked">
            <Switch />
          </Form.Item>

          <Form.Item name="radio-group" label="Hiển thị giá vàng tham khảo">
            <Radio.Group defaultValue="all">
              <Radio value="member">chỉ thành viên</Radio>
              <Radio value="all">cho tất cả</Radio>
              <Radio value="hidden">ẩn</Radio>
            </Radio.Group>
          </Form.Item>

          <Form.Item name="radio-group" label="Hiển thị tỷ giá thị trường tự do">
            <Radio.Group defaultValue="all">
              <Radio value="member">chỉ thành viên</Radio>
              <Radio value="all">cho tất cả</Radio>
              <Radio value="hidden">ẩn</Radio>
            </Radio.Group>
          </Form.Item>

          <Form.Item name="radio-group" label="Biểu đồ Vàng/USD">
            <Radio.Group defaultValue="all">
              <Radio value="member">chỉ thành viên</Radio>
              <Radio value="all">cho tất cả</Radio>
              <Radio value="hidden">ẩn</Radio>
            </Radio.Group>
          </Form.Item>

          <Form.Item name="radio-group" label="Nhận định giá vàng thế giới">
            <Radio.Group defaultValue="all">
              <Radio value="member">chỉ thành viên</Radio>
              <Radio value="all">cho tất cả</Radio>
              <Radio value="hidden">ẩn</Radio>
            </Radio.Group>
          </Form.Item>

          <Form.Item name="radio-group" label="Tính hiệu thường trường">
            <Radio.Group defaultValue="all">
              <Radio value="member">chỉ thành viên</Radio>
              <Radio value="all">cho tất cả</Radio>
              <Radio value="hidden">ẩn</Radio>
            </Radio.Group>
          </Form.Item>

          {/* <Form.Item label="InputNumber">
            <Form.Item name="input-number" noStyle>
              <InputNumber min={1} max={10} />
            </Form.Item>
            <span className="ant-form-text"> machines</span>
          </Form.Item> */}

          <Form.Item wrapperCol={{ span: 12, offset: 6 }}>
            <Button type="primary" htmlType="submit">
              Cập nhập
            </Button>
          </Form.Item>
        </Form>
      </div>
    </div>
  )
}
