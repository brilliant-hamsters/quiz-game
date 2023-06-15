export const logouthUser = async (id: number) => {
  return await fetch('/authUser', {
    method: 'DELETE',
    body: JSON.stringify({ userId: id }),
    headers: { 'Content-Type': 'application/json' },
  })
}
