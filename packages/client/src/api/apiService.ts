const DEFAULT_API_URL = 'https://ya-praktikum.tech/api/v2'
const DEFAULT_API_FORUM = '/api'
const DEFAULT_HEADERS = {
  'Content-Type': 'application/json',
}
export const TEAM_NAME = 'brilliant-hamsters'
export const RATING_FIELDNAME = 'result'

interface IApiOptions {
  method: string
  body?: Record<string, unknown> | FormData
}

const sendApiRequest = async (
  URL: string,
  path: string,
  options?: IApiOptions
) => {
  if (!options || options.method === 'GET') {
    return await fetch(`${URL}${path}`, {
      method: 'GET',
      headers: DEFAULT_HEADERS,
      credentials: 'include',
    })
  }

  const { method, body } = options

  return await fetch(`${URL}${path}`, {
    method,
    headers: path === '/user/profile/avatar' ? {} : DEFAULT_HEADERS,
    credentials: 'include',
    ...(body
      ? { body: body instanceof FormData ? body : JSON.stringify(body) }
      : {}),
  })
}

export const sendApiRequestDefault = (path: string, options?: IApiOptions) =>
  sendApiRequest(DEFAULT_API_URL, path, options)

export const sendApiRequestForum = (path: string, options?: IApiOptions) =>
  sendApiRequest(DEFAULT_API_FORUM, path, options)
