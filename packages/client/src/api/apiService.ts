const DEFAULT_API_URL = 'https://ya-praktikum.tech/api/v2'
const DEFAULT_HEADERS = {
  'Content-Type': 'application/json',
}

interface IApiOptions {
  method: string;
  body?: Record<string, string | number | boolean > | FormData;
}

export const sendApiRequest = async (path: string, options?: IApiOptions) => {
  if (!options || options.method === 'GET') {
    const result = await fetch(`${DEFAULT_API_URL}${path}`, {
      method: 'GET',
      headers: DEFAULT_HEADERS,
      credentials: 'include',
    })
    return result
  }

  const { method, body } = options

  const result = await fetch(`${DEFAULT_API_URL}${path}`, {
    method,
    headers: ((path === '/user/profile/avatar') ? {} : DEFAULT_HEADERS),
    credentials: 'include',
    ...(body
      ? { body: body instanceof FormData ? body : JSON.stringify(body)}
      : {}),
  })
  return result
}
