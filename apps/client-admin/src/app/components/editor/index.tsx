import React, { useMemo, forwardRef, useRef, useEffect } from 'react'
import { JoditEditor } from 'utils/plugins/IJodit'
import * as joditHelper from 'utils/plugins/IJodit/helper'
type IDictionary<T> = any
type IUploaderAnswer = any

const editorConfig = joditHelper.defaultConfigs({ readonly: false, tabIndex: 1, minHeight: 650 })
interface EditorCustomProps {
  value?: any
  onChange?: (value: any) => void
}
export const EditorCustom = forwardRef((props: EditorCustomProps, ref: any) => {
  const { value = '', onChange } = props
  const inputRef = useRef<any>()

  const handleChange = newContent => {
    if (onChange) {
      onChange(newContent)
    }
  }

  useEffect(() => {
    if (!inputRef.current) return
    const uploader = inputRef.current?.component?.uploader as any
    if (uploader) {
      const originalSend = uploader.send // this is ajax
      uploader.send = function (data: FormData | IDictionary<string>, success: (resp: IUploaderAnswer) => void) {
        console.log('==> custom uploader')
        // Because the data is FormData and it include multiple file. my api is not support upload multiple file
        // so we can overwrite, and loop files and re-create formData. split request
        for (let file of (data as any).values()) {
          if (!file || !file.name) continue
          const formData = new FormData()
          Object.assign(file, { originalname: file.name })
          formData.append('files', file)
          originalSend.call(this, formData, success)
        }
        return Promise.resolve(null)
      }
    }
  }, [])

  return (
    <JoditEditor
      ref={(el: HTMLInputElement) => {
        ref(el)
        inputRef.current = el
      }}
      value={value}
      config={editorConfig}
      tabIndex={1}
      // onBlur={newContent => console.log(newContent)} // preferred to use only this option to update the content for performance reasons
      onChange={handleChange}
    />
  )
})
