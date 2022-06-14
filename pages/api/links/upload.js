import SQL from '/db'
import { auth } from '/common/auth'
import { parseSessionTokenFromCookie } from '/common/parse'
const datetime = require('moment')().format('YYYY-MM-DD HH:mm:ss')
export default async (req, res) => {
  try {
    let result
    res.setHeader('Access-Control-Allow-Origin', '*')
    res.setHeader('Access-Control-Allow-Methods', '*')
    res.setHeader('Access-Control-Allow-Headers', '*')
    if (req.method === 'POST') {
      const filter = {}
      const { data } = req.body
      const sessionToken = parseSessionTokenFromCookie(req)
      const { username, session_id } = sessionToken
      filter.username = username
      filter.session_id = session_id
      if (auth(req)) {
        console.log(filter)
        const temp = await SQL(
          `SELECT * FROM users` +
            (Object.keys(filter)?.length
              ? ` WHERE ${Object.entries(filter)
                  .flatMap((e) => `${e[0]}='${e[1]}'`)
                  .join(' AND ')}`
              : null)
        )
        data.create_time = datetime
        data.update_time = datetime
        data.isShow = 1
        data.username = temp[0].username
        data.nickname = temp[0].nickname
        result = await SQL(
          `INSERT INTO links` +
            `(${Object.entries(data)
              .flatMap((e) => e[0])
              .join(', ')})` +
            ` VALUES(${Object.entries(data)
              .flatMap((e) => `'${e[1]}'`)
              .join(', ')})`
        )
        res.status(200).json(result)
      } else {
        res.status(200).json('sessionToken Not found')
      }
    } else {
      res.status(200).json('Not POST request')
    }
  } catch (error) {
    res.status(500).json({ error: error.message })
  }
}
