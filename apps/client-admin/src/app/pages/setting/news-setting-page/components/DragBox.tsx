import { Button, Col, Modal, Row } from 'antd'
import React, { useCallback, useEffect, useMemo, useState } from 'react'
import { DragDropContext, Droppable, Draggable } from 'react-beautiful-dnd'
import _cloneDeep from 'lodash/cloneDeep'
import _get from 'lodash/get'
import { Item } from '..'

const reorder = (list: any, startIndex, endIndex) => {
  const result = Array.from(list)
  const [removed] = result.splice(startIndex, 1)
  result.splice(endIndex, 0, removed)
  return result
}

const getItems = (count, offset = 0) =>
  Array.from({ length: count }, (v, k) => k).map(k => ({
    id: `item-${k + offset}`,
    content: `item ${k + offset}`,
  }))
const DROPPABLE = {
  firstDroppable: 'available',
  SecondDroppable: 'selected',
}
interface DragBoxProps {
  categories: Item[]
  onEdit: (item: any) => void
  onSetCategoriesActive: (items: any) => void
  config: Record<string, string>
  categoriesActive: Item[]
}
export const DragBox = (props: DragBoxProps) => {
  const [items, setItems] = useState<any>([])
  const [categoriesActive, setCategoriesActive] = useState<any>([])

  useEffect(() => {
    props.onSetCategoriesActive && props.onSetCategoriesActive(categoriesActive)
  }, [categoriesActive])

  useEffect(() => {
    const categories = _get(props, 'categories', [])
    setItems(categories)
  }, [props.categories])

  useEffect(() => {
    const categoriesActive = _get(props, 'categoriesActive', [])
    setCategoriesActive(categoriesActive)
  }, [props.categoriesActive])

  const config = useMemo(() => {
    return _get(props, 'config', {})
  }, [props.config])

  const move = (source, destination, droppableSource, droppableDestination) => {
    const sourceClone = _cloneDeep(source)
    const destClone = _cloneDeep(destination)
    const [removed] = sourceClone.splice(droppableSource.index, 1)

    destClone.splice(droppableDestination.index, 0, removed)

    if (droppableSource.droppableId === DROPPABLE.firstDroppable) {
      return {
        item: sourceClone,
        selected: destClone,
      }
    } else {
      return {
        selected: sourceClone,
        item: destClone,
      }
    }
  }

  const getList = id => {
    if (id === DROPPABLE.firstDroppable) {
      return items
    } else {
      return categoriesActive
    }
  }

  const handleDragEnd = result => {
    const { source, destination } = result

    // dropped outside the list
    if (!destination) {
      return
    }

    if (source.droppableId === destination.droppableId) {
      switch (source.droppableId) {
        case DROPPABLE.firstDroppable: {
          const _items = reorder(_cloneDeep(items), source.index, destination.index)
          setItems(_items)
          return
        }
        case DROPPABLE.SecondDroppable: {
          const _items = reorder(_cloneDeep(categoriesActive), source.index, destination.index)
          setCategoriesActive(_items)
          return
        }
      }
    } else {
      const result = move(getList(source.droppableId), getList(destination.droppableId), source, destination)
      setItems(result.item)
      setCategoriesActive(result.selected)
    }
  }

  const handleEdit = item => (e: any) => {
    props.onEdit && props.onEdit(item)
  }

  return (
    <div className="news-setting-page">
      <Row gutter={16} align="stretch" justify="space-between" className="page__wrapper">
        <DragDropContext onDragEnd={handleDragEnd}>
          <Droppable droppableId={DROPPABLE.firstDroppable}>
            {(provided, snapshot) => (
              <Col ref={provided.innerRef} className="page__nonactive" span={12}>
                <Row>
                  {items.map((item, idx) => (
                    <Draggable key={item.id} draggableId={`${item.id}`} index={idx}>
                      {(provided, snapshot) => (
                        <Col span={24} ref={provided.innerRef} {...provided.draggableProps} {...provided.dragHandleProps}>
                          <span className="page__item">{item.title}</span>
                        </Col>
                      )}
                    </Draggable>
                  ))}
                  {provided.placeholder}
                </Row>
              </Col>
            )}
          </Droppable>
          <Droppable droppableId={DROPPABLE.SecondDroppable}>
            {(provided, snapshot) => (
              <Col ref={provided.innerRef} className="page__active" span={12}>
                <Row>
                  {categoriesActive.map((item, idx) => (
                    <Draggable key={item.id} draggableId={`${item.id}`} index={idx}>
                      {(provided, snapshot) => (
                        <Col span={24} ref={provided.innerRef} {...provided.draggableProps} {...provided.dragHandleProps}>
                          <div className="page__item page__item--active">
                            {config[item.id] || item.title}
                            <div>
                              <Button type="primary" size="small" onClick={handleEdit(item)}>
                                Sửa
                              </Button>
                            </div>
                          </div>
                        </Col>
                      )}
                    </Draggable>
                  ))}
                  {provided.placeholder}
                </Row>
              </Col>
            )}
          </Droppable>
        </DragDropContext>
      </Row>
    </div>
  )
}
