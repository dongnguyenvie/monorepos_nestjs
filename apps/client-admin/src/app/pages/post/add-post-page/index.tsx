import React, { useEffect, useMemo, useRef, useState } from 'react'
import { Form, Input, Button, Row, Col, Select, Card, Alert, notification, Typography } from 'antd'
import { slugify } from 'utils/helpers'
import './style.module.scss'
import { MESSAGES } from 'utils/constants'
import { AvatarUpload } from 'app/components/uploads/AvatarUpload'
import { EditorCustom } from 'app/components/editor'
import { Spin } from 'app/components/Spin'
const { Option } = Select
const { Title } = Typography

let useCreatePostMutation: any = () => ({})
let useGetCategoriesQuery: any = () => ({})
let useGetTagsQuery: any = () => ({})

export function AddPostPage() {
  const [form] = Form.useForm()
  const [isEdit, setIsEdit] = useState(true)
  const [flag, setFlag] = useState(false)
  const editorRef = useRef()
  const [handleCreatePost, { data: createPostData, loading: createPostLoading, error: createPostError, called: createPostCalled }] = useCreatePostMutation({
    onError: (err: any) => {},
  })
  const { data: dataGetCategories, loading: loadingGetCategories, error: errorGetCategories } = useGetCategoriesQuery({
    fetchPolicy: 'no-cache',
    variables: {
      category: {
        pagination: {
          limit: 100,
          page: 1,
        },
      },
    },
  })
  const { data: dataGetTags, loading: loadingGetTags, error: errorGetTags } = useGetTagsQuery({
    fetchPolicy: 'no-cache',
    variables: {
      tag: {
        pagination: {
          limit: 100,
          page: 1,
        },
      },
    },
  })

  useEffect(() => {
    if (!createPostCalled || createPostLoading) return
    const notiFnc = createPostError ? notification.error : notification.success
    notiFnc({
      message: createPostError ? MESSAGES.createFailed : MESSAGES.createSuccessfully,
    })
    form.resetFields()
    setFlag(false)
  }, [createPostData, createPostError, createPostLoading, createPostCalled])

  const convertToOption = (list: any) => {
    return list?.map(item => (
      <Option value={item.id as string} key={item.id as string}>
        {item.title}
      </Option>
    ))
  }
  const renderCategoriesOpts = useMemo(() => {
    if (loadingGetCategories || errorGetCategories) return null
    return convertToOption(dataGetCategories?.getCategories.data)
  }, [dataGetCategories, loadingGetCategories, errorGetCategories])

  const renderTagOpts = useMemo(() => {
    if (loadingGetTags || errorGetTags) return null
    return convertToOption(dataGetTags?.getTags.data)
  }, [dataGetTags, loadingGetTags, errorGetTags])

  const handleCreate = async () => {
    const row = await form.validateFields()
    console.log('row', row)
    try {
      handleCreatePost({
        variables: {
          post: {
            title: row.title,
            metaTitle: row.metaTitle,
            summary: row.summary,
            slug: row.slug,
            // content: content,
            content: row.content,
            thumbnail: row.thumbnail,
            categories: (row.categories || []).map((i: string) => {
              return { id: i }
            }),
            tags: (row.tags || []).map((i: string) => {
              return { id: i }
            }),
          },
        },
      })
    } catch (error) {}
  }

  const handleOnChange = e => {
    if (e[0]?.name[0] === 'title' && e[0].value !== '' && !flag) {
      const newValue = slugify(e[0].value || '')
      form.setFieldsValue({ slug: newValue })
    }
  }

  const edit = () => {
    setIsEdit(false)
  }

  const save = () => {
    setIsEdit(true)
    setFlag(true)
  }

  return (
    <div style={{ paddingTop: 20, paddingBottom: 20 }}>
      <Title>Tạo bài viết</Title>
      {(!createPostLoading && !!createPostError) ||
        (!loadingGetCategories && !!errorGetCategories) ||
        (!loadingGetTags && !!errorGetTags && <Alert type="error" message={createPostError?.message || errorGetCategories?.message || errorGetTags?.message} banner />)}{' '}
      <Spin tip="Loading..." spinning={createPostLoading}>
        <Form layout="vertical" form={form} onFinish={handleCreate} onFieldsChange={handleOnChange}>
          <Row gutter={[16, 16]}>
            <Col span={18}>
              <Form.Item label="Tiêu đề" hasFeedback name={'title'} rules={[{ required: true, message: 'Vui lòng nhập tiêu đề!' }]}>
                <Input placeholder="Thêm tiêu đề" autoFocus={true} />
              </Form.Item>
              <Form.Item label="SEO Title" hasFeedback name={'metaTitle'} rules={[{}]}>
                <Input placeholder="Thêm SEO title" />
              </Form.Item>
              <Form.Item label="Tóm tắt" hasFeedback name={'summary'} rules={[{}]}>
                <Input placeholder="Thêm tóm tắt" />
              </Form.Item>
              <Form.Item label="Chuỗi cho đường dẫn tĩnh" hasFeedback>
                <Row gutter={24}>
                  <Col span={20}>
                    <Form.Item name={'slug'} rules={[{ required: true, message: 'Vui lòng nhập đường dẫn tĩnh!' }]}>
                      <Input disabled={isEdit} placeholder="Đường dẫn tĩnh" />
                    </Form.Item>
                  </Col>
                  <Col span={4}>
                    <Button block={true} type="primary" hidden={!isEdit} onClick={edit}>
                      Chỉnh sửa
                    </Button>
                    <Button block={true} type="primary" hidden={isEdit} onClick={save}>
                      Lưu
                    </Button>
                  </Col>
                </Row>
              </Form.Item>
              {/* <ReactQuill className="postpage__quill" modules={MODULES} formats={FORMATS} theme="snow" defaultValue="" value={content} onChange={setContent} /> */}
              <Form.Item name={'content'}>
                <EditorCustom
                  ref={(el: any) => {
                    editorRef.current = el
                  }}
                />
              </Form.Item>
            </Col>
            <Col span={6}>
              <Row gutter={[16, 16]} style={{ marginBottom: '10px' }}>
                <Col span={24}>
                  <Card bordered={false} title="Đăng">
                    <Form.Item>
                      <Button block={true} type="primary" htmlType="submit">
                        Tạo
                      </Button>
                    </Form.Item>
                  </Card>
                </Col>
              </Row>

              <Row gutter={[16, 16]} style={{ marginBottom: '10px' }}>
                <Col span={24}>
                  <Card bordered={false} title="Chuyên mục">
                    <Form.Item name={'categories'} rules={[{ message: 'Vui lòng chọn chuyên mục!', type: 'array' }]}>
                      <Select mode="multiple" placeholder="Chọn chuyên mục">
                        {renderCategoriesOpts}
                      </Select>
                    </Form.Item>
                  </Card>
                </Col>
              </Row>

              <Row gutter={[16, 16]} style={{ marginBottom: '10px' }}>
                <Col span={24}>
                  <Card bordered={false} title="Thẻ">
                    <Form.Item name={'tags'} rules={[{ message: 'Vui lòng chọn thẻ!', type: 'array' }]}>
                      <Select mode="multiple" placeholder="Chọn thẻ" allowClear={true} loading={loadingGetCategories}>
                        {renderTagOpts}
                      </Select>
                    </Form.Item>
                  </Card>
                </Col>
              </Row>

              <Row gutter={[16, 16]} style={{ marginBottom: '10px' }}>
                <Col span={24}>
                  <Card bordered={false} title="ảnh đại diện">
                    <Form.Item name={'thumbnail'}>
                      <AvatarUpload
                        onUpload={img => {
                          form.setFieldsValue({
                            thumbnail: img.url,
                          })
                        }}
                      />
                    </Form.Item>
                  </Card>
                </Col>
              </Row>
            </Col>
          </Row>
        </Form>
      </Spin>
    </div>
  )
}
