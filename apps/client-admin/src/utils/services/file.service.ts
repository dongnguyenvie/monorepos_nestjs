import { authentication } from 'utils/authentication'
import { API_ENDPOINTS } from 'utils/constants'

export async function fetchUploadFile(formData: FormData) {
  const bearer = authentication.getBearerToken()

  const response = await fetch(API_ENDPOINTS.uploadFile, {
    method: 'POST', // *GET, POST, PUT, DELETE, etc.
    mode: 'cors', // no-cors, *cors, same-origin
    cache: 'no-cache', // *default, no-cache, reload, force-cache, only-if-cached
    credentials: 'same-origin', // include, *same-origin, omit
    headers: {
      Authorization: bearer,
      // 'Content-Type': 'multipart/form-data',
      // 'Content-Type': 'application/x-www-form-urlencoded',
    },
    redirect: 'follow', // manual, *follow, error
    referrerPolicy: 'no-referrer', // no-referrer, *no-referrer-when-downgrade, origin, origin-when-cross-origin, same-origin, strict-origin, strict-origin-when-cross-origin, unsafe-url
    body: formData, // body data type must match "Content-Type" header
  })
  const result = await response.json()
  if (!response.ok) {
    throw new Error(String(response.status || ''))
  }
  return result
}
