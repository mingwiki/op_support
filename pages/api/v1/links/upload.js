/** @format */

import SQL from '/common/db'
import { auth } from '/common/auth'
import { parseSessionTokenFromCookie } from '/common/parse'
import dayjs from 'dayjs'
const api = async (req, res) => {
  const datetime = dayjs().format('YYYY-MM-DD HH:mm:ss')
  try {
    let result
    res.setHeader('Access-Control-Allow-Origin', '*')
    res.setHeader('Access-Control-Allow-Methods', '*')
    res.setHeader('Access-Control-Allow-Headers', '*')
    if (req.method === 'POST') {
      const filter = {}
      const { data } = req.body
      const sessionToken = parseSessionTokenFromCookie(req)
      const { username, sessionId } = sessionToken
      filter.username = username
      filter.sessionId = sessionId
      if (auth(req)) {
        const temp = await SQL(
          'SELECT * FROM users' +
            (Object.keys(filter)?.length
              ? ` WHERE ${Object.entries(filter)
                  .flatMap((e) => `${e[0]}='${e[1]}'`)
                  .join(' AND ')}`
              : null),
        )
        if (!Array.isArray(data)) {
          data.create_time = datetime
          data.update_time = datetime
          data.isShow = 1
          data.username = temp[0].username
          data.nickname = temp[0].nickname
          result = await SQL(
            'INSERT INTO links' +
              `(${Object.entries(data)
                .flatMap((e) => e[0])
                .join(', ')})` +
              ` VALUES(${Object.entries(data)
                .flatMap((e) => `'${e[1]}'`)
                .join(', ')})`,
          )
        } else {
          data.forEach((e) => {
            e.create_time = datetime
            e.update_time = datetime
            e.isShow = 1
            e.username = temp[0].username
            e.nickname = temp[0].nickname
          })
          result = await SQL(
            'INSERT INTO links' +
              `(${Object.entries(data[0])
                .flatMap((e) => e[0])
                .join(', ')})` +
              ` VALUES(${data
                .map((e) =>
                  Object.entries(e)
                    .flatMap((i) => `'${i[1]}'`)
                    .join(', '),
                )
                .join('), (')})`,
          )
        }
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
