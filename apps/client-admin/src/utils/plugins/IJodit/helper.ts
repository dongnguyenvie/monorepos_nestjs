import { authentication } from 'utils/authentication'
import { API_ENDPOINTS } from 'utils/constants'

type IJodit = any

type Configs = Partial<IJodit['options']> & {
  minHeight?: number
}
export const defaultConfigs = (args: Configs): IJodit['options'] =>
  ({
    ...args,
    buttons: [
      'source',
      'bold',
      'italic',
      'underline',
      'strikethrough',
      'eraser',
      'superscript',
      'subscript',
      'ul',
      'ol',
      'indent',
      'outdent',
      'left',
      'font',
      'fontsize',
      'paragraph',
      'classSpan',
      'brush',
      'image',
      'video',
      // 'file',
      'copyformat',
      'cut',
      'copy',
      'paste',
      'selectall',
      'hr',
      'table',
      'link',
      'symbol',
      'undo',
      'redo',
      'find',
      'fullsize',
      'preview',
      'print',
      // 'about',
    ],
    uploader: {
      url: API_ENDPOINTS.uploadFile,
      // insertImageAsBase64URI: false,
      withCredentials: true,
      imagesExtensions: ['jpg', 'png', 'jpeg', 'gif'],
      filesVariableName: function (e) {
        return 'files'
      },
      headers: {
        Authorization: authentication.getBearerToken(),
      },
      send: data => {
        console.log('send', data)
      },
      prepareData: function (data) {
        let formData = new FormData()
        for (let file of (data as any).values()) {
          if (!file || !file.name) continue
          Object.assign(file, { originalname: file.name })
          formData.append('files', file)
        }
        return formData
      },
      isSuccess: function (resp) {
        // console.log('isSuccess', resp)
        //this step is necessary for whatever reason, otherwise it will throw an error.
        return resp
      },
      process: function (resp) {
        console.log('process', resp)
        if (!resp.url) {
          return Promise.reject('Need files')
        }
        return {
          files: [resp.url],
          baseurl: '',
          error: resp.error,
          message: resp.message,
        }
      },
      error(e: Error) {
        this.j.e.fire('errorMessage', 'Upload hình ảnh bị lỗi', 'error', 4000)
      },
      defaultHandlerSuccess: function (data) {
        const that = this.jodit || this
        var i,
          field = 'files'
        if (data[field] && data[field].length) {
          for (i = 0; i < data[field].length; i += 1) {
            that.selection.insertImage(data[field][i])
          }
        }
      },
    } as any,
  } as IJodit['options'])
