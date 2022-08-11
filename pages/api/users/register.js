import SQL from 'common/db'
import { genSessionId } from 'common/crypto'
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
      const { username } = filter
      filter.create_time = datetime
      filter.update_time = datetime
      filter.sessionId = genSessionId(filter)
      const check = await SQL(
        `SELECT COUNT(username) FROM users WHERE username='${username}'`
      )
      if (check[0]['COUNT(username)'] === 0) {
        result = await SQL(
          'INSERT INTO users' +
            `(${Object.entries(filter)
              .flatMap((e) => e[0])
              .join(', ')})` +
            ` VALUES(${Object.entries(filter)
              .flatMap((e) => `'${e[1]}'`)
              .join(', ')})`
        )
        res.setHeader(
          'Set-Cookie',
          `sessionToken=${JSON.stringify({
            sessionId: filter.sessionId,
            username: filter.username
          })}; max-age=86400; path=/;`
        )
        res.status(200).json(result)
      } else {
        res.status(200).json('账户已存在')
      }
    } else {
      res.status(200).json('Not POST request')
    }
  } catch (error) {
    console.log(error)
    res.status(500).json({ error: error.message })
  }
}

export default api
