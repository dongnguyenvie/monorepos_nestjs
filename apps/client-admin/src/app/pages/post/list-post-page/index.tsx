import React, { useCallback, useEffect, useMemo, useState } from 'react'
import { Alert, Button, Divider, Form, notification, Pagination, Popconfirm, Select, Space, Table, Tag, Typography } from 'antd'
import { EditTwoTone, DeleteTwoTone, TagOutlined } from '@ant-design/icons'
import { getPathByName } from 'utils/utils'
import { useHistory } from 'react-router-dom'
import { DEFAULT_PAGINATION, MESSAGES, TABLE_DROPDOWN_OPTIONS } from 'utils/constants'
import { ListWithOptions } from 'app/components/list-with-options'
import { useSelector } from 'react-redux'
import { selectMe } from 'app/redux/user/selectors'
import { RolesConstants } from 'utils/roles'

let useDeletePostMutation: any = () => ({})
let useGetPostLazyQuery: any = () => ({})
let useRecoverPostMutation: any = () => ({})
let useGetPostsWasDeletedLazyQuery: any = () => ({})

const { Title } = Typography

export function ListPostPage() {
  const me = useSelector(selectMe)
  const [form] = Form.useForm()
  const history = useHistory()
  const [page, setPage] = useState(1)
  const [fetchGetPosts, { data: postsData, loading: postsLoading, error: postsError, refetch: postsRefetch }] = useGetPostLazyQuery({
    fetchPolicy: 'no-cache',
  })
  const [fetchGetPostsDeleted, { data: postDeletedData, loading: postsDeletedLoading, error: postDeletedError, refetch: postsDeletedRefetch }] = useGetPostsWasDeletedLazyQuery({
    fetchPolicy: 'no-cache',
    variables: {
      post: {
        pagination: {
          limit: 100,
          page: 1,
        },
      },
    },
  })
  const [fetchDeletePost, { data: deletingData, loading: deletingLoading, error: deletingError, called: deletingCalled }] = useDeletePostMutation({ fetchPolicy: 'no-cache' })
  const [fetchRecoverPost, { data: recoverPostData, loading: recoverPostLoading, error: recoverPostError, called: recoverPostCalled }] = useRecoverPostMutation()
  const [dropdownOpt, setDropdownOpt] = useState(TABLE_DROPDOWN_OPTIONS.active.value)

  const isPostActive = useMemo(() => {
    return dropdownOpt === TABLE_DROPDOWN_OPTIONS.active.value
  }, [dropdownOpt])

  const fetchList = () => {
    switch (dropdownOpt) {
      case TABLE_DROPDOWN_OPTIONS.active.value: {
        fetchGetPosts({
          variables: {
            post: {
              pagination: { limit: DEFAULT_PAGINATION.pageSize!, page: page, totalCount: postsData?.getPosts.pagination.totalCount || null },
            },
          },
        })
        return
      }
      case TABLE_DROPDOWN_OPTIONS.deleted.value: {
        fetchGetPostsDeleted({
          variables: {
            post: {
              pagination: { limit: DEFAULT_PAGINATION.pageSize!, page: page, totalCount: postDeletedData?.getPostsWasDeleted.pagination.totalCount || null },
            },
          },
        })
        return
      }
    }
  }

  useEffect(() => {
    fetchList()
  }, [dropdownOpt, page])

  useEffect(() => {
    if (!deletingCalled || deletingLoading) return
    const notiFnc = deletingError ? notification.error : notification.success
    notiFnc({
      message: deletingError ? MESSAGES.deleteFailed : MESSAGES.deleteSuccessfully,
    })
    fetchList()
  }, [deletingData, deletingError, deletingLoading, deletingCalled])

  useEffect(() => {
    if (!recoverPostCalled || recoverPostLoading) return
    const notiFnc = recoverPostLoading ? notification.error : notification.success
    notiFnc({
      message: recoverPostError ? MESSAGES.recoverFailed : MESSAGES.recoverSuccessfully,
    })
    fetchList()
  }, [recoverPostData, recoverPostError, recoverPostLoading, recoverPostCalled])

  const handleEdit = useCallback(
    record => {
      const pathname = getPathByName('post-edit', { id: record.id })
      history.push({ pathname })
    },
    [history],
  )

  const handleChangePage = page => {
    setPage(page)
  }

  const handleDelete = (id: string) => {
    fetchDeletePost({
      variables: {
        post: {
          id: id,
        },
      },
    })
  }

  const handleRecoverPost = (id: string) => {
    fetchRecoverPost({ variables: { post: { id: id } } })
  }

  const tableResource = useMemo(() => {
    return (isPostActive ? postsData?.getPosts.data : postDeletedData?.getPostsWasDeleted.data) || ([] as any)
  }, [isPostActive, postsData, postDeletedData])

  const totalRecord = useMemo(() => {
    return (isPostActive ? postsData?.getPosts.pagination.totalCount : postDeletedData?.getPostsWasDeleted.pagination.totalCount) || DEFAULT_PAGINATION.total
  }, [isPostActive, postsData, postDeletedData])

  const columns = [
    {
      title: 'Tiêu đề',
      dataIndex: 'title',
      key: 'title',
    },
    {
      title: 'Hình đại diện',
      dataIndex: 'thumbnail',
      key: 'thumbnail',
      render: imageUrl => (
        <div style={{ border: '1px solid #f0f0f0', borderRadius: '4px' }}>
          <img src={imageUrl} alt="avatar" style={{ width: '100px' }} />
        </div>
      ),
    },
    {
      title: 'Chuỗi đường dẫn',
      dataIndex: 'slug',
      key: 'slug',
    },
    {
      title: 'Tiêu đề SEO',
      dataIndex: 'metaTitle',
      key: 'metaTitle',
    },
    {
      title: 'Tác giả',
      dataIndex: 'author.username',
      key: 'author',
    },
    {
      title: 'Thẻ',
      dataIndex: 'tags',
      key: 'tags',
      render: tags => (
        <span>
          {tags?.map(tag => {
            return (
              <Tag icon={<TagOutlined />} color="success" key={tag.id}>
                {tag.title}
              </Tag>
            )
          })}
        </span>
      ),
    },
    {
      title: 'Chủ đề',
      dataIndex: 'categories',
      key: 'categories',
      render: categories => (
        <span>
          {categories?.map(tag => {
            return (
              <Tag color="processing" key={tag.id}>
                {tag.title}
              </Tag>
            )
          })}
        </span>
      ),
    },
    {
      title: '',
      key: 'action',
      render: (_, record) => {
        if (isPostActive) {
          return (
            <Space size="middle">
              <Button type="primary" onClick={() => handleEdit(record)}>
                Sửa
              </Button>
              <Popconfirm title="Bạn có chắc xoá bài viết này không?" onConfirm={() => handleDelete(record.id)}>
                <Button type="primary">Xóa</Button>
              </Popconfirm>
            </Space>
          )
        }
        return (
          <Space size="middle">
            <Button type="primary" onClick={() => handleRecoverPost(record.id)}>
              Khôi phục
            </Button>
          </Space>
        )
      },
    },
  ]

  return (
    <div style={{ paddingTop: 20, paddingBottom: 20 }}>
      <Title>Danh sách bài viết</Title>
      <Divider plain></Divider>
      {!postsLoading && postsError && <Alert type="error" message={postsError?.message} banner />}
      <ListWithOptions isDeletedList={!!me.scp?.includes(RolesConstants.getPostsWasDeleted)} onChange={setDropdownOpt} />
      <Form form={form} component={false}>
        <Table dataSource={tableResource} loading={postsLoading} pagination={false} columns={columns} rowKey="id" />
      </Form>
      <div style={{ marginTop: 5 }}>
        <Pagination current={page} onChange={handleChangePage} pageSize={DEFAULT_PAGINATION.pageSize} total={totalRecord} />
      </div>
    </div>
  )
}
