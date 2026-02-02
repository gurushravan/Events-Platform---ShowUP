export function updateQuery(
  searchParams: URLSearchParams,
  key: string,
  value: string | null
) {
  const params = new URLSearchParams(searchParams.toString())

  if (!value) {
    params.delete(key)
  } else {
    params.set(key, value)
  }

  return params.toString()
}
