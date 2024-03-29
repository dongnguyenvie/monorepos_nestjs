import React, { useCallback, useEffect, useMemo, useState } from 'react'
import { Alert, Table, Form, Space, Popconfirm, Tag, notification, Typography, Checkbox, Select, Divider, Button } from 'antd'
import { useDeleteRoleMutation, useGetDeletedRolesLazyQuery, useGetRolesLazyQuery, useRecoverRoleMutation } from 'graphql/autogenerated'
import { DeleteTwoTone, EditTwoTone } from '@ant-design/icons'
import '../style.scss'
import { useHistory } from 'react-router'
import { getPathByName } from 'utils/utils'
import { MESSAGES, TABLE_DROPDOWN_OPTIONS } from 'utils/constants'

const { Title } = Typography
const { Option } = Select

export function ListRolePage() {
  const [fetchRolesActive, { data: rolesActiveData, loading: rolesActiveLoading, error: rolesActiveError, refetch: refetchRolesActive }] = useGetRolesLazyQuery({ fetchPolicy: 'no-cache' })
  const [fetchDeletedRoles, { data: deletedRolesData, loading: deletedRolesLoading, error: deletedRolesError, refetch: refetchDeletedRoles }] = useGetDeletedRolesLazyQuery({
    fetchPolicy: 'no-cache',
  })
  const [fetchDeleteRole, { data: deleteData, loading: deleteLoading, called: deleteCalled, error: deleteError }] = useDeleteRoleMutation({ fetchPolicy: 'no-cache' })
  const [fetchRecoverRole, { data: dataRecoverRole, loading: loadingRecoverRole, error: errorRecoverRole, called: calledRecoverRole }] = useRecoverRoleMutation({ fetchPolicy: 'no-cache' })

  const history = useHistory()
  const [form] = Form.useForm()
  const [dropdownOpt, setDropdownOpt] = useState(TABLE_DROPDOWN_OPTIONS.active.value)

  const isRoleActive = useMemo(() => {
    return dropdownOpt === TABLE_DROPDOWN_OPTIONS.active.value
  }, [dropdownOpt])

  const fetchList = () => {
    switch (dropdownOpt) {
      case TABLE_DROPDOWN_OPTIONS.active.value: {
        fetchRolesActive()
        return
      }

      case TABLE_DROPDOWN_OPTIONS.deleted.value: {
        fetchDeletedRoles()
        return
      }
    }
  }

  useEffect(() => {
    fetchList()
  }, [dropdownOpt])

  const handleEdit = useCallback(
    record => {
      const pathname = getPathByName('role-edit', { id: record.id })
      history.push({ pathname })
    },
    [history],
  )

  const handleDelete = useCallback((id: string) => {
    fetchDeleteRole({
      variables: { input: { id: id } },
    })
  }, [])

  const handleRecover = useCallback((id: string) => {
    fetchRecoverRole({
      variables: { input: { id: id } },
    })
  }, [])

  useEffect(() => {
    if (!deleteCalled || deleteLoading) return
    const notiFnc = deleteError ? notification.error : notification.success
    notiFnc({
      message: deleteError ? MESSAGES.deleteFailed : MESSAGES.deleteSuccessfully,
    })
    fetchList()
  }, [deleteCalled, deleteLoading, deleteError, deleteData])

  useEffect(() => {
    if (!calledRecoverRole || loadingRecoverRole) return
    const notiFnc = errorRecoverRole ? notification.error : notification.success
    notiFnc({
      message: errorRecoverRole ? MESSAGES.recoverFailed : MESSAGES.recoverSuccessfully,
    })
    fetchList()
  }, [dataRecoverRole, errorRecoverRole, loadingRecoverRole, calledRecoverRole])

  const tableDropDownOtps = useMemo(() => {
    return Object.values(TABLE_DROPDOWN_OPTIONS).map(otps => ({ key: otps.value, title: otps.label }))
  }, [])

  const columns = [
    {
      title: 'Title',
      dataIndex: 'title',
      key: 'title',
      editable: true,
    },
    {
      title: 'mặc định',
      dataIndex: 'isDefault',
      key: 'isDefault',
      render: (isDefault, record) => {
        return <Checkbox checked={isDefault} disabled />
      },
    },
    {
      title: 'Scope',
      dataIndex: 'scp',
      editable: true,
      width: '40%',
      render: (scp, record) => {
        return (
          <div className="role_page__100_scroll">
            {(scp || []).map(scp => (
              <Tag color="geekblue" className="role_page__tag" key={scp}>
                {scp}
              </Tag>
            ))}
          </div>
        )
      },
    },
    {
      title: 'Action',
      key: 'action',
      render: (_, record) => {
        if (isRoleActive) {
          return (
            <Space size="middle">
              <Button type="primary" onClick={() => handleEdit(record)}>
                Sửa
              </Button>
              <Popconfirm title="Bạn có chắc xoá?" onConfirm={() => handleDelete(record.id)}>
                <Button type="primary">Xóa</Button>
              </Popconfirm>
            </Space>
          )
        }
        return (
          <Space size="middle">
            <Button type="primary" onClick={() => handleRecover(record.id)}>
              Khôi phục
            </Button>
          </Space>
        )
      },
    },
  ]

  const tableResource = useMemo(() => {
    return (isRoleActive ? rolesActiveData?.getRoles : deletedRolesData?.getDeletedRoles) || ([] as any)
  }, [isRoleActive, rolesActiveData, deletedRolesData])

  return (
    <div style={{ paddingTop: 20, paddingBottom: 20 }}>
      <Title>Danh sách Nhóm quyền</Title>
      <Divider plain></Divider>
      {!rolesActiveLoading && rolesActiveError && <Alert type="error" message={rolesActiveError?.message} banner />}
      <Select defaultValue={dropdownOpt} style={{ width: 200 }} onChange={setDropdownOpt}>
        {tableDropDownOtps.map(opt => (
          <Option value={opt.key} key={opt.key}>
            {opt.title}
          </Option>
        ))}
      </Select>
      <Form form={form} component={false}>
        <Table dataSource={tableResource} loading={rolesActiveLoading || deletedRolesLoading} pagination={{ pageSize: 10 }} columns={columns} rowKey="id" />
      </Form>
    </div>
  )
}
