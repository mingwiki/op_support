import SQL from '/common/db'
import { request } from '/common/public'
import { parseSessionTokenFromCookie } from '/common/parse'
import dayjs from 'dayjs'
export default (req, res) =>
  request(req, res, async () => {
    const sessionToken = parseSessionTokenFromCookie(req)
    const datetime = dayjs().format('YYYY-MM-DD HH:mm:ss')
    if (Object.keys(sessionToken)?.length) {
      await SQL(
        `UPDATE users SET update_time = '${datetime}'` +
          ` WHERE ${Object.entries(sessionToken)
            .flatMap((e) => `${e[0]}='${e[1]}'`)
            .join(' AND ')}`
      )
      const result = await SQL(
        'SELECT  id, username, nickname, update_time, create_time FROM users' +
          ` WHERE ${Object.entries(sessionToken)
            .flatMap((e) => `${e[0]}='${e[1]}'`)
            .join(' AND ')}`
      )
      return result.rows
    } else {
      return false
    }
  })
