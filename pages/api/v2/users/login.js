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
      const sessionId = genSessionId(filter)
      const update = await SQL(
        `UPDATE users SET update_time = '${datetime}', sessionId ='${sessionId}'` +
          (Object.keys(filter)?.length
            ? ` WHERE ${Object.entries(filter)
                .flatMap((e) => `${e[0]}='${e[1]}'`)
                .join(' AND ')}`
            : null)
      )
      if (update.affectedRows !== 0) {
        const result = await SQL(
          'SELECT id, username, nickname, update_time, create_time, disabled FROM users' +
            (Object.keys(filter)?.length
              ? ` WHERE ${Object.entries(filter)
                  .flatMap((e) => `${e[0]}='${e[1]}'`)
                  .join(' AND ')}`
              : null)
        )
        if (result[0]?.disabled === 1) {
          return '此账户已禁用，请自行注册或使用其他账户。'
        }
        setHeader(res, sessionId, result[0].username)
        return result
      } else {
        return '用户名或密码错误'
      }
    },
    true
  )
