import SQL from 'common/db'
import { genSessionId } from 'common/crypto'
import setHeader from 'common/setHeader'
const datetime = require('moment')().format('YYYY-MM-DD HH:mm:ss')

const api = async (req, res) => {
  try {
    let result
    res.setHeader('Access-Control-Allow-Origin', '*')
    res.setHeader('Access-Control-Allow-Methods', '*')
    res.setHeader('Access-Control-Allow-Headers', '*')
    res.setHeader('Access-Control-Allow-Credentials', true)
    if (req.method === 'POST') {
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
      if (update.warningCount === 0) {
        result = await SQL(
          'SELECT id, username, nickname, update_time, create_time, disabled FROM users' +
            (Object.keys(filter)?.length
              ? ` WHERE ${Object.entries(filter)
                  .flatMap((e) => `${e[0]}='${e[1]}'`)
                  .join(' AND ')}`
              : null)
        )
        if (result[0]?.disabled === 1) {
          res.status(500).json('此账户已禁用，请自行注册或使用其他账户。')
          return
        }
        setHeader(res, sessionId, result[0].username)
        res.status(200).json(result)
      } else {
        res.status(200).json(update?.sqlMessage)
      }
    } else {
      res.status(200).json('Not POST request')
    }
  } catch (error) {
    res.status(500).json('帐户不存在或密码不匹配')
  }
}
export default api
