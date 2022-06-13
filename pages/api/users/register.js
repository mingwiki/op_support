import SQL from '../../../db'
import md5 from 'md5'
const datetime = require('moment')().format('YYYY-MM-DD HH:mm:ss')

export default async (req, res) => {
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
      filter.session_id = md5(
        Object.entries(filter)
          .flatMap((e) => `${e[0]}='${e[1]}'`)
          .join('-')
      ).slice(0, 50)
      console.log(filter)
      const check = await SQL(
        `SELECT COUNT(username) FROM users WHERE username='${username}'`
      )
      if (check[0]['COUNT(username)'] === 0) {
        result = await SQL(
          `INSERT users` +
            `(${Object.entries(filter)
              .flatMap((e) => e[0])
              .join(', ')})` +
            ` VALUES(${Object.entries(filter)
              .flatMap((e) => `'${e[1]}'`)
              .join(', ')})`
        )
        res.setHeader(
          'Set-Cookie',
          `session_id=${filter.session_id}; max-age=86400; path=/;`
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
