export const parseSessionTokenFromCookie = (req) => {
  const { sessionToken } = Object.fromEntries(
    req.headers?.cookie?.split('; ')?.map((e) => e.split('=')) || [],
  )
  return JSON.parse(sessionToken || '{}')
}
