const DEFAULT_API_URL = 'https://ya-praktikum.tech/api/v2'
const DEFAULT_HEADERS = {
  'Content-Type': 'application/json',
}
export const TEAM_NAME = 'brilliant-hamsters'
export const RATING_FIELDNAME = 'result'

interface IApiOptions {
  method: string;
  body?: Record<string, unknown> | FormData;
}

export const sendApiRequest = async (path: string, options?: IApiOptions) => {
  if (!options || options.method === 'GET') {
    return await fetch(`${DEFAULT_API_URL}${path}`, {
      method: 'GET',
      headers: DEFAULT_HEADERS,
      credentials: 'include',
    })
  }

  const { method, body } = options

  return await fetch(`${DEFAULT_API_URL}${path}`, {
    method,
    headers: ((path === '/user/profile/avatar') ? {} : DEFAULT_HEADERS),
    credentials: 'include',
    ...(body
      ? { body: body instanceof FormData ? body : JSON.stringify(body) }
      : {}),
  })
}
