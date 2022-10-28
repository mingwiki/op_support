import { parseSessionTokenFromCookie } from './parse'
import SQL from 'common/db'
export const auth = async (req) => {
  const sessionToken = parseSessionTokenFromCookie(req)
  if (Object.keys(sessionToken).length < 1) return false
  const check = await SQL(
    'SELECT COUNT(sessionId) FROM users' +
      (Object.keys(sessionToken)?.length
        ? ` WHERE ${Object.entries(sessionToken)
            .flatMap((e) => `${e[0]}='${e[1]}'`)
            .join(' AND ')}`
        : null),
  )
  return check[0] && check[0]['COUNT(sessionId)'] === 1
}
