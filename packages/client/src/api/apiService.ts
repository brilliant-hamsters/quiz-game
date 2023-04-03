const DEFAULT_API_URL = 'https://ya-praktikum.tech/api/v2'
const DEFAULT_HEADERS = {
  'Content-Type': 'application/json',
}

interface IApiOptions {
  method: string
  body?: Record<string, string | number | boolean>
}

export const sendApiRequest = async (path: string, options?: IApiOptions) => {
  async function checkHeaderType(result: Response) {
    const headerType = result.headers.get('Content-Type')
    if (headerType?.includes('text/plain')) {
      return result
    }
    return await result.json()
  }

  if (!options) {
    const result = await fetch(`${DEFAULT_API_URL}${path}`, {
      method: 'GET',
      headers: DEFAULT_HEADERS,
      credentials: 'include',
    })
    return checkHeaderType(result)
  }

  const { method, body } = options

  const result = await fetch(`${DEFAULT_API_URL}${path}`, {
    method,
    headers: DEFAULT_HEADERS,
    credentials: 'include',
    ...(body
      ? { body: typeof body === 'object' ? JSON.stringify(body) : body }
      : {}),
  })
  return checkHeaderType(result)
}
