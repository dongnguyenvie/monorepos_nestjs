import React, { useMemo } from 'react'
import { Alert, Form, Popconfirm, Space, Table, Typography, Row, Col, Button } from 'antd'
import { DeleteTwoTone, EditTwoTone } from '@ant-design/icons'
import moment from 'moment'
import { useProvider } from './provider'
import { useSelector } from 'react-redux'
import { selectSettings } from 'app/redux/settings/selectors'
import isObject from 'lodash/isObject'

const { Title } = Typography

const pagination = {
  current: 1,
  pageSize: 10,
}

export function ListSettingPage() {
  const [form] = Form.useForm()
  const { settingData, settingError, settingLoading, handleEdit, handleDelete } = useProvider()
  console.log(useSelector(selectSettings))

  const columns = [
    {
      title: 'Key',
      dataIndex: 'key',
      key: 'key',
      render: (key, record) => {
        return <Row style={{ whiteSpace: 'nowrap' }}>{key}</Row>
      },
    },
    {
      title: 'Ngày tạo',
      dataIndex: 'createdAt',
      key: 'createdAt',
      render: (time, record) => {
        return <div style={{ whiteSpace: 'nowrap' }}>{moment(time).format('MM-DD-YYYY HH:mm:ss')}</div>
      },
    },
    {
      title: 'giá trị động',
      dataIndex: 'jsonValue',
      key: 'jsonValue',
      render: (value, record) => {
        return <div style={{ maxHeight: '50px', maxWidth: '150px', overflowX: 'auto' }}>{isObject(value) && JSON.stringify(value, null, 2)}</div>
      },
    },
    {
      title: 'Giá trị chuỗi',
      dataIndex: 'stringValue',
      key: 'stringValue',
      render: (defaultValue, record) => {
        return <div style={{ maxHeight: '50px', maxWidth: '150px', overflowX: 'auto' }}>{defaultValue}</div>
      },
    },
    {
      title: '',
      key: 'action',
      render: (_, record) => {
        return (
          <Space size="middle">
            <Button type="primary" onClick={() => handleEdit(record)}>
              Sửa
            </Button>
            <Popconfirm title="Bạn có chắc xoá user này không?" onConfirm={() => handleDelete(record.id)}>
              <Button type="primary">Xóa</Button>
            </Popconfirm>
          </Space>
        )
      },
    },
  ]

  const tableResource = useMemo(() => {
    return settingData?.getSettings || []
  }, [settingData])

  return (
    <div style={{ paddingTop: 20, paddingBottom: 20 }}>
      <Title>Danh sách cài đặt</Title>
      {!settingLoading && settingError && <Alert type="error" message={settingError?.message} banner />}
      <Form form={form} component={false}>
        <Table dataSource={tableResource} loading={settingLoading} pagination={pagination} columns={columns} rowKey="id" />
      </Form>
    </div>
  )
}
