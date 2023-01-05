/** @format */

import SQL from '/common/db'
import { parseSessionTokenFromCookie } from '/common/parse'
import { request } from '/common/public'
import moment from 'moment'
export default (req, res) =>
  request(req, res, async () => {
    const datetime = moment().format('YYYY-MM-DD HH:mm:ss')
    const filter = {}
    const { data } = req.body
    const { username, sessionId } = parseSessionTokenFromCookie(req)
    filter.username = username
    filter.sessionId = sessionId
    const temp = await SQL(
      'SELECT * FROM users' +
        (Object.keys(filter)?.length
          ? ` WHERE ${Object.entries(filter)
              .flatMap((e) => `${e[0]}='${e[1]}'`)
              .join(' AND ')}`
          : null)
    )
    if (!Array.isArray(data)) {
      data.create_time = datetime
      data.update_time = datetime
      data.isShow = 1
      data.username = temp[0].username
      data.nickname = temp[0].nickname
      return await SQL(
        'INSERT INTO links' +
          `(${Object.entries(data)
            .flatMap((e) => e[0])
            .join(', ')})` +
          ` VALUES(${Object.entries(data)
            .flatMap((e) => `'${e[1]}'`)
            .join(', ')})`
      )
    } else {
      data.forEach((e) => {
        e.create_time = datetime
        e.update_time = datetime
        e.isShow = 1
        e.username = temp[0].username
        e.nickname = temp[0].nickname
      })
      return await SQL(
        'INSERT INTO links' +
          `(${Object.entries(data[0])
            .flatMap((e) => e[0])
            .join(', ')})` +
          ` VALUES(${data
            .map((e) =>
              Object.entries(e)
                .flatMap((i) => `'${i[1]}'`)
                .join(', ')
            )
            .join('), (')})`
      )
    }
  })
