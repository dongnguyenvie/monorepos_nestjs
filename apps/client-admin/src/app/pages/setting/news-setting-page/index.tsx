import React, { useCallback, useEffect, useMemo, useState } from 'react'
import { Button, Col, Divider, Input, Modal, notification, Row, Typography } from 'antd'
import { DragDropContext, Droppable, Draggable } from 'react-beautiful-dnd'
import { sampleData } from './sampledata'
import './style.scss'
import _cloneDeep from 'lodash/cloneDeep'
import _get from 'lodash/get'
import _differenceBy from 'lodash/differenceBy'
import _isEqualWith from 'lodash/isEqualWith'
import { DragBox } from './components/DragBox'
import { MESSAGES, SETUP_NEWS_BLOCK } from 'utils/constants'

let useGetCategoriesQuery: any = () => ({})
type GetCategoriesQuery = any
let useCreateOrUpdateSettingMutation: any = () => ({})
let useGetSettingByKeyQuery: any = () => ({})

const { Title } = Typography
export type Item = GetCategoriesQuery['getCategories']['data'][0]
export const NewsSettingPage = () => {
  const { data: categoriesData, loading: categoriesLoading, error: categoriesError, refetch: categoriesRefetch } = useGetCategoriesQuery({
    fetchPolicy: 'no-cache',
    variables: {
      category: {
        pagination: {
          limit: 1000,
          page: 1,
          totalCount: -1,
        },
      },
    },
  })
  const [fetchUpdateNewsConf, { data: updateNewsConfData, loading: updateNewsConfLoading, called: updateNewsConfCalled, error: updateNewsConfError }] = useCreateOrUpdateSettingMutation()
  const { data: newsConfData, error: newsConfError, loading: newsConfLoading } = useGetSettingByKeyQuery({ variables: { setting: { key: SETUP_NEWS_BLOCK } } })
  const [itemsActive, setItemsActive] = useState<Item[]>([])
  const [selected, setSelected] = useState<Item | null>(null)
  const [tempTitle, setTempTitle] = useState<string | null>(null)
  const [config, setConfig] = useState<Record<string, string>>({})

  const isModalVisible = useMemo(() => !!selected, [selected])

  useEffect(() => {
    if (!updateNewsConfCalled || updateNewsConfLoading) return
    const notiFnc = updateNewsConfError ? notification.error : notification.success
    notiFnc({
      message: updateNewsConfError ? MESSAGES.updateFailed : MESSAGES.updateSuccessfully,
    })
  }, [updateNewsConfCalled, updateNewsConfLoading, updateNewsConfError, updateNewsConfData])

  const categoriesActive = useMemo(() => {
    return (!newsConfLoading && !newsConfError && _get(newsConfData, 'getSettingByKey.jsonValue', [])) || []
  }, [newsConfData, newsConfError, newsConfLoading])

  const categories = useMemo(() => {
    const _data = (!categoriesLoading && !categoriesError && _get(categoriesData, 'getCategories.data', [])) || []
    return _differenceBy(_data, categoriesActive, (item: Item) => {
      return _get(item, 'id')
    })
  }, [categoriesData, categoriesLoading, categoriesError, categoriesActive])

  // useEffect(() => {
  //   if (categoriesActive.length) {
  //     const _config = {}
  //     categoriesActive.forEach((c: any) => {
  //       _config[c.id] = c.title
  //     })
  //   }
  // }, [categoriesActive])

  const handleModalOk = () => {
    if (!!tempTitle) {
      const { id } = selected!
      setConfig({
        ...config,
        [id!]: tempTitle,
      })
    }
    setTempTitle(null)
    setSelected(null)
  }

  const handleEdit = (item: Item) => {
    setSelected(item)
  }

  const handleSubmit = () => {
    const payload: any = []
    itemsActive.forEach(c => {
      payload.push({
        id: c.id,
        title: config[c.id!] || c.title,
      })
    })
    // submit api here
    console.log({ payload })
    fetchUpdateNewsConf({
      variables: {
        setting: {
          key: SETUP_NEWS_BLOCK,
          jsonValue: payload,
        },
      },
    })
  }

  return (
    <div className="news-setting-page" style={{ paddingTop: 20, paddingBottom: 20 }}>
      <Title>Hiển thị chuyên mục trên trang tin tức</Title>
      <Divider plain></Divider>
      <p>Bạn có thể tùy chọn hiển thị chuyên mục trên trang tin tức</p>
      <Divider plain></Divider>
      <div>
        <Row>
          <Col xs={24}>
            <DragBox config={config} categories={categories} categoriesActive={categoriesActive} onEdit={handleEdit} onSetCategoriesActive={setItemsActive} />
          </Col>
          <Col xs={24}>
            <Modal
              title="Chuyên mục"
              open={isModalVisible}
              onOk={handleModalOk}
              onCancel={() => {
                setSelected(null)
                setTempTitle(null)
              }}
            >
              <Input key={_get(selected, 'id', '')!} placeholder="Tiêu đề" defaultValue={_get(config, selected?.id!)! || _get(selected, 'title', '')} onChange={e => setTempTitle(e.target.value)} />
            </Modal>
          </Col>
          <Col xs={24} style={{ marginTop: '20px' }}>
            <div>
              <Button type="primary" onClick={handleSubmit}>
                Cập nhập
              </Button>
            </div>
          </Col>
        </Row>
      </div>
    </div>
  )
}
