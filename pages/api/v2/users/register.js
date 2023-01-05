/** @format */

import SQL from 'common/db'
import { request } from 'common/public'
import { genSessionId } from 'common/crypto'
import setHeader from 'common/setHeader'
import moment from 'moment'
export default (req, res) =>
  request(
    req,
    res,
    async () => {
      const datetime = moment().format('YYYY-MM-DD HH:mm:ss')
      const { filter } = req.body
      const { username } = filter
      filter.create_time = datetime
      filter.update_time = datetime
      filter.sessionId = genSessionId(filter)
      const check = await SQL(
        `SELECT COUNT(username) FROM users WHERE username='${username}'`
      )
      if (check[0] && check[0]['COUNT(username)'] === 0) {
        setHeader(res, filter.sessionId, filter.username)
        return await SQL(
          'INSERT INTO users' +
            `(${Object.entries(filter)
              .flatMap((e) => e[0])
              .join(', ')})` +
            ` VALUES(${Object.entries(filter)
              .flatMap((e) => `'${e[1]}'`)
              .join(', ')})`
        )
      } else {
        return '账户已存在'
      }
    },
    true
  )
