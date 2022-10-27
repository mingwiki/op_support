import SQL from 'common/db'
import { parseSessionTokenFromCookie } from 'common/parse'
import { auth } from 'common/auth'

const api = async (req, res) => {
  try {
    let result
    res.setHeader('Access-Control-Allow-Origin', '*')
    res.setHeader('Access-Control-Allow-Methods', '*')
    res.setHeader('Access-Control-Allow-Headers', '*')
    if (req.method === 'POST') {
      const sessionToken = parseSessionTokenFromCookie(req)
      if (auth(req)) {
        result = await SQL(
          'SELECT  id, username, nickname, update_time, create_time FROM users' +
            (Object.keys(sessionToken)?.length
              ? ` WHERE ${Object.entries(sessionToken)
                  .flatMap((e) => `${e[0]}='${e[1]}'`)
                  .join(' AND ')}`
              : null),
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

export default api
