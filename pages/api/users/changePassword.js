import SQL from '/db'
const datetime = require('moment')().format('YYYY-MM-DD HH:mm:ss')
import { genSessionId } from '/common/crypto'
import { auth } from '/common/auth'
import { parseSessionTokenFromCookie } from '/common/parse'

export default async (req, res) => {
  try {
    let result
    res.setHeader('Access-Control-Allow-Origin', '*')
    res.setHeader('Access-Control-Allow-Methods', '*')
    res.setHeader('Access-Control-Allow-Headers', '*')
    res.setHeader('Access-Control-Allow-Credentials', true)
    if (req.method === 'POST') {
      const { filter } = req.body
      const { password } = filter
      const sessionToken = parseSessionTokenFromCookie(req)
      const { username } = sessionToken
      filter.update_time = datetime
      filter.session_id = genSessionId(filter)
      if (auth(req)) {
        result = await SQL(
          `UPDATE users SET update_time='${filter.update_time}', session_id='${filter.session_id}', password='${password}' WHERE username='${username}'`
        )
        res.setHeader(
          'Set-Cookie',
          `sessionToken=${JSON.stringify({
            session_id: filter.session_id,
            username: username,
          })}; max-age=86400; path=/;`
        )
        res.status(200).json(result)
      } else {
        res.status(200).json('账户不存在')
      }
    } else {
      res.status(200).json('Not POST request')
    }
  } catch (error) {
    console.log(error)
    res.status(500).json({ error: error.message })
  }
}
