export const authUser = async (id: number) => {
  return await fetch('/authUser', {
    method: 'POST',
    body: JSON.stringify({ userId: id }),
    headers: { 'Content-Type': 'application/json' },
  })
}
