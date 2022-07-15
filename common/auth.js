import { parseSessionTokenFromCookie } from './parse'
import SQL from '/common/db'
export const auth = async (req) => {
  const sessionToken = parseSessionTokenFromCookie(req)
  const check = await SQL(
    `SELECT COUNT(session_id) FROM users` +
      (Object.keys(sessionToken)?.length
        ? ` WHERE ${Object.entries(sessionToken)
            .flatMap((e) => `${e[0]}='${e[1]}'`)
            .join(' AND ')}`
        : null)
  )
  return check[0]['COUNT(session_id)'] === 1
}
