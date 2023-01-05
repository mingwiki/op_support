/** @format */

import SQL from '/common/db'
import { parseSessionTokenFromCookie } from '/common/parse'
import { request } from '/common/public'
import setHeader from '/common/setHeader'
import { genSessionId } from '/common/crypto'
import moment from 'moment'
export default (req, res) =>
  request(req, res, async () => {
    const datetime = moment().format('YYYY-MM-DD HH:mm:ss')
    const { filter } = req.body
    const { password } = filter
    const { username } = parseSessionTokenFromCookie(req)
    filter.update_time = datetime
    filter.sessionId = genSessionId(filter)
    setHeader(res, filter.sessionId, username)
    return await SQL(
      `UPDATE users SET update_time='${filter.update_time}', sessionId='${filter.sessionId}', password='${password}' WHERE username='${username}'`
    )
  })
