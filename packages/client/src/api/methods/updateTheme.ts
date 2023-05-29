type Theme = {
    theme: string 
}

const DEFAULT_HEADERS = {
    'Content-Type': 'application/json',
  }

export const updateTheme = async (data:Theme) => {
  return await fetch('http://localhost:5432/theme', {
    method: 'PUT',
    headers: DEFAULT_HEADERS,
    body: JSON.stringify(data)
  });
};
