/** @format */

import SQL from '/common/db'
import { genSessionId } from '/common/crypto'
import { auth } from '/common/auth'
import { parseSessionTokenFromCookie } from '/common/parse'
import setHeader from '/common/setHeader'
import dayjs from 'dayjs'
const api = async (req, res) => {
  const datetime = dayjs().format('YYYY-MM-DD HH:mm:ss')
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
      filter.sessionId = genSessionId(filter)
      if (auth(req)) {
        result = await SQL(
          `UPDATE users SET update_time='${filter.update_time}', sessionId='${filter.sessionId}', password='${password}' WHERE username='${username}'`,
        )
        setHeader(res, filter.sessionId, username)
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

export default api
