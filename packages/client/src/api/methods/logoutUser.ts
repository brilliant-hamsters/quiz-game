export const logouthUser = async (id: number) => {
  console.log('DELETECLIENT', id)
  return await fetch('/authUser', {
    method: 'DELETE',
    body: JSON.stringify({ userId: id }),
    headers: { 'Content-Type': 'application/json' },
  })
}
