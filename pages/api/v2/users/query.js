import SQL from '/common/db'
import { request } from '/common/public'
import { parseSessionTokenFromCookie } from '/common/parse'
import moment from 'moment'
export default (req, res) =>
  request(req, res, async () => {
    const sessionToken = parseSessionTokenFromCookie(req)
    const datetime = moment().format('YYYY-MM-DD HH:mm:ss')
    await SQL(
      `UPDATE users SET update_time = '${datetime}'` +
        (Object.keys(sessionToken)?.length
          ? ` WHERE ${Object.entries(sessionToken)
              .flatMap((e) => `${e[0]}='${e[1]}'`)
              .join(' AND ')}`
          : null)
    )
    return await SQL(
      'SELECT  id, username, nickname, update_time, create_time FROM users' +
        (Object.keys(sessionToken)?.length
          ? ` WHERE ${Object.entries(sessionToken)
              .flatMap((e) => `${e[0]}='${e[1]}'`)
              .join(' AND ')}`
          : null)
    )
  })
