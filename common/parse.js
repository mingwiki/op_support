export const parseCookie = (req) => {
  return Object.fromEntries(
    req.headers?.cookie?.split('; ').map((e) => e.split('=')),
  )
}

export const parseSessionTokenFromCookie = (req) => {
  const { sessionToken } = Object.fromEntries(
    req.headers?.cookie?.split('; ').map((e) => e.split('=')),
  )
  return JSON.parse(sessionToken || '{}')
}
