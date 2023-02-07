import React, { useEffect, useMemo, useRef, useState } from 'react'
import { Form, Input, Button, message, Row, Col, Card, Select, Alert, notification, Typography } from 'antd'
import { RouteComponentProps, useHistory } from 'react-router-dom'
import { FORMATS, MODULES } from '../add-post-page/types'
import { slugify } from 'utils/helpers'
import { MESSAGES } from 'utils/constants'
import { AvatarUpload } from 'app/components/uploads/AvatarUpload'
import { EditorCustom } from 'app/components/editor'
import { Spin } from 'app/components/Spin'
const { Option } = Select
const { Title } = Typography

let useGetCategoriesQuery: any = () => ({})
let useGetPostByIdQuery: any = () => ({})
let useGetTagsQuery: any = () => ({})
let useUpdatePostMutation: any = () => ({})

export type Props = RouteComponentProps<{ id: string }, {}, { isFetchData?: boolean }> & {}
export function EditPostPage(props: Props) {
  const id = props.match.params.id as string
  const [form] = Form.useForm()
  const [isEdit, setIsEdit] = useState(true)
  const [flag, setFlag] = useState(true)
  const editorRef = useRef()
  const { data: dataGetPost, loading: loadingGetPost, error: errorGetPost } = useGetPostByIdQuery({
    fetchPolicy: 'no-cache',
    variables: {
      post: { id: id },
    },
  })
  const { data: dataGetCategory, loading: loadingGetCategory, error: errorGetCategory } = useGetCategoriesQuery({
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
  const [handleUpdatePost, { data: dataUpdate, loading: loadingUpdate, error: errorUpdate, called }] = useUpdatePostMutation({
    onError: () => {},
  })
  const history = useHistory()

  useEffect(() => {
    if (loadingGetPost || errorGetPost) return
    form.setFieldsValue({
      title: dataGetPost?.getPostById.title,
      metaTitle: dataGetPost?.getPostById.metaTitle,
      summary: dataGetPost?.getPostById.summary,
      slug: dataGetPost?.getPostById.slug,
      categories: dataGetPost?.getPostById.categories?.map(i => i.id),
      tags: dataGetPost?.getPostById.tags?.map(i => i.id),
      thumbnail: dataGetPost?.getPostById.thumbnail,
      content: dataGetPost?.getPostById.content,
    })
  }, [dataGetPost, loadingGetPost, errorGetPost])

  useEffect(() => {
    if (!called || loadingUpdate) return
    const notiFnc = errorUpdate ? notification.error : notification.success
    notiFnc({
      message: errorUpdate ? MESSAGES.updateFailed : MESSAGES.updateSuccessfully,
    })
    history.push('/post/list')
  }, [called, errorUpdate, loadingUpdate, dataUpdate])

  const renderCategorieOpts = useMemo(() => {
    if (loadingGetCategory || errorGetCategory) return null
    return dataGetCategory?.getCategories.data.map(category => (
      <Option value={category.id as string} key={category.id as string}>
        {category.title}
      </Option>
    ))
  }, [dataGetCategory, loadingGetCategory, errorGetCategory])

  const renderTagOpts = useMemo(() => {
    if (loadingGetTags || errorGetTags) return null
    return dataGetTags?.getTags.data.map(tag => (
      <Option value={tag.id as string} key={tag.id as string}>
        {tag.title}
      </Option>
    ))
  }, [dataGetTags, loadingGetTags, errorGetTags])

  const handleOnChange = e => {
    if (e[0]?.name[0] === 'title' && e[0].value !== '' && !flag) {
      const newValue = slugify(e[0].value || '')
      form.setFieldsValue({ slug: newValue })
    }
  }

  const edit = async () => {
    try {
      setIsEdit(false)
    } catch (error) {
      console.log(`error`, error)
    }
  }

  const save = async () => {
    try {
      setIsEdit(true)
      setFlag(true)
    } catch (error) {
      console.log(`error`, error)
    }
  }

  const handleEditPost = async () => {
    const row = await form.validateFields()
    await handleUpdatePost({
      variables: {
        post: {
          id: id,
          title: row.title,
          metaTitle: row.metaTitle,
          summary: row.summary,
          slug: row.slug,
          content: row.content,
          categories: (row.categories || []).map((i: string) => {
            return { id: i }
          }),
          tags: (row.tags || []).map((i: string) => {
            return { id: i }
          }),
        },
      },
    })
  }

  return (
    <div style={{ paddingTop: 20, paddingBottom: 20 }}>
      <Title>Chỉnh sửa bài viết</Title>
      {(!loadingUpdate && !!errorUpdate) ||
        (!loadingGetCategory && !!errorGetCategory) ||
        (!loadingGetPost && !!errorGetPost && <Alert type="error" message={errorUpdate?.message || errorGetCategory?.message || errorGetPost?.message} banner />)}
      <Spin tip="Loading..." spinning={loadingGetPost || loadingGetCategory || loadingUpdate}>
        <Form layout="vertical" form={form} onFinish={handleEditPost} onFieldsChange={handleOnChange}>
          <Row gutter={[16, 16]}>
            <Col span={18}>
              <Form.Item label="Tiêu đề" hasFeedback name={'title'} rules={[{ required: true, message: 'Vui lòng nhập tiêu đề!' }]}>
                <Input placeholder="Thêm tiêu đề" autoFocus={true} />
              </Form.Item>
              <Form.Item label="SEO Title" hasFeedback name={'metaTitle'} rules={[{ required: true }]}>
                <Input placeholder="Thêm SEO title" />
              </Form.Item>
              <Form.Item label="Tóm tắt" hasFeedback name={'summary'} rules={[{ required: true }]}>
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

              <Form.Item name={'content'}>
                <EditorCustom
                  ref={(el: any) => {
                    editorRef.current = el
                  }}
                />
              </Form.Item>
            </Col>

            <Col span={6}>
              <Row gutter={16} style={{ marginBottom: '10px' }}>
                <Col span={24}>
                  <Card bordered={false} title="Đăng">
                    <Form.Item>
                      <Button block={true} type="primary" htmlType="submit">
                        Sửa
                      </Button>
                    </Form.Item>
                  </Card>
                </Col>
              </Row>

              <Row gutter={[16, 16]} style={{ marginBottom: '10px' }}>
                <Col span={24}>
                  <Card bordered={false} title="Chuyên mục">
                    <Form.Item name={'categories'} rules={[{ required: true, message: 'Vui lòng chọn chuyên mục!', type: 'array' }]}>
                      <Select mode="multiple" placeholder="Chọn chuyên mục">
                        {renderCategorieOpts}
                      </Select>
                    </Form.Item>
                  </Card>
                </Col>
              </Row>

              <Row gutter={[16, 16]} style={{ marginBottom: '10px' }}>
                <Col span={24}>
                  <Card bordered={false} title="Thẻ">
                    <Form.Item name={'tags'} rules={[{ required: false, message: 'Vui lòng chọn thẻ!', type: 'array' }]}>
                      <Select mode="multiple" placeholder="Chọn thẻ" allowClear={true}>
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
                        defaultImgUrl={form.getFieldValue('thumbnail')}
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
