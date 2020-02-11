import fetch from 'unfetch'
import { API_URL } from '@constants/config'

export default (
  path: string,
  init: RequestInit,
  authToken?: string
): Promise<Response> => {
  const { headers, ...config } = init

  return fetch(`${API_URL}/${path.replace(/^\/|\/$/g, '')}`, {
    headers: {
      Accept: 'application/json',
      'Content-Type': 'application/json',
      Authorization: authToken ? `Bearer ${authToken}` : null,
      ...init.headers
    },
    ...config
  })
}
