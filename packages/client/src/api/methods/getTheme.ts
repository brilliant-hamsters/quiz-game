const DEFAULT_HEADERS = {
    'Content-Type': 'application/json',
  }

export const getTheme = async () => {
  return await fetch('http://localhost:5432/theme', {
    method: 'GET',
    headers: DEFAULT_HEADERS,
  });
};
