import SQL from '/common/db'
import { auth } from '/common/auth'
import { parseSessionTokenFromCookie } from '/common/parse'

const api = async (req, res) => {
  try {
    let result
    res.setHeader('Access-Control-Allow-Origin', '*')
    res.setHeader('Access-Control-Allow-Methods', '*')
    res.setHeader('Access-Control-Allow-Headers', '*')
    if (req.method === 'POST') {
      const filter = {}
      const sessionToken = parseSessionTokenFromCookie(req)
      const { username } = sessionToken
      filter.username = username
      if (auth(req)) {
        result = await SQL(
          'UPDATE users SET session_id=null' +
            (Object.keys(filter)?.length
              ? ` WHERE ${Object.entries(filter)
                  .flatMap((e) => `${e[0]}='${e[1]}'`)
                  .join(' AND ')}`
              : null)
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
