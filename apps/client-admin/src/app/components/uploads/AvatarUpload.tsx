import React, { useEffect, useMemo, useState } from 'react'
import { useBoolean } from 'react-use'
import { Upload, message, Modal } from 'antd'
import { LoadingOutlined, PlusOutlined } from '@ant-design/icons'
import { fetchUploadFile } from 'utils/services/file.service'
import _get from 'lodash/get'

function beforeUpload(file) {
  const isJpgOrPng = file.type === 'image/jpeg' || file.type === 'image/png'
  if (!isJpgOrPng) {
    message.error('Bản chỉ có thể upload ảnh PNG/JPG!')
  }
  const isLt5M = file.size / 1024 / 1024 < 5
  if (!isLt5M) {
    message.error('Kích thước hình ảnh phải nhỏ hơn 5MB!')
  }
  // return isJpgOrPng && isLt5M
  return false
}

interface AvatarUploadProps {
  onUpload: (payload: any) => void
  defaultImgUrl?: string
}
export const AvatarUpload = (props: AvatarUploadProps) => {
  const [loading, setLoading] = useBoolean(false)
  const [imageUploaded, setImageUploaded] = useState<any>()
  const [previewVisible, setPreviewVisible] = useState('')

  const handleChange = async info => {
    if (!info.fileList.length) return
    setLoading(true)
    console.log('info', info)
    const formData = new FormData()
    formData.append('files', _get(info, 'fileList[0].originFileObj'))
    try {
      const result = await fetchUploadFile(formData)
      setImageUploaded(result)
      setLoading(false)
      props.onUpload && props.onUpload(result)
    } catch (error) {
      setLoading(false)
    }
  }

  const imageUrl = useMemo(() => {
    return _get(imageUploaded, 'url', '')
  }, [imageUploaded])

  const imageTitle = useMemo(() => {
    return _get(imageUploaded, 'key', '')
  }, [imageUploaded])

  const fileList = useMemo(() => {
    const file = !!imageUploaded ? [{ ...imageUploaded, uid: imageUploaded.id, status: 'done', name: imageUploaded.key }] : []
    return file
  }, [imageUploaded])

  useEffect(() => {
    const defaultImgUrl = props.defaultImgUrl
    if (!defaultImgUrl) return
    console.log('defaultImgUrl', { defaultImgUrl })
    setImageUploaded({
      url: defaultImgUrl,
      id: '1-default',
      key: 'thumbnail',
    })
  }, [props.defaultImgUrl])

  const uploadButton = (
    <div>
      {loading ? <LoadingOutlined /> : <PlusOutlined />}
      <div style={{ marginTop: 8 }}>Upload</div>
    </div>
  )

  return (
    <>
      <Upload
        name="avatar"
        listType="picture-card"
        className="avatar-uploader"
        // showUploadList={false}
        fileList={fileList}
        // action="https://www.mocky.io/v2/5cc8019d300000980a055e76"
        beforeUpload={beforeUpload}
        onChange={handleChange}
        onPreview={(e: any) => {
          setPreviewVisible(e.url)
        }}
        onRemove={e => {
          setImageUploaded(null)
          setPreviewVisible('')
        }}
      >
        {imageUrl ? null : uploadButton}
        {/* {imageUrl ? <img src={imageUrl} alt="avatar" style={{ width: '100%' }} /> : uploadButton} */}
      </Upload>
      <Modal
        open={!!previewVisible}
        title={imageTitle}
        footer={null}
        onCancel={() => {
          setPreviewVisible('')
        }}
      >
        <div>
          <img alt={imageTitle} style={{ width: '100%' }} src={previewVisible} />
        </div>
      </Modal>
    </>
  )
}
