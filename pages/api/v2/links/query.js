/** @format */

import SQL from 'common/db'
import { parseSessionTokenFromCookie } from 'common/parse'
import { request } from 'common/public'

export default (req, res) =>
  request(req, res, async () => {
    const { filter, data, type } = req.body
    const { username } = parseSessionTokenFromCookie(req)
    const { orderBy } = data
    filter.isShow = 1
    if (!type) {
      filter.username = username
    }
    return await SQL(
      'SELECT * FROM links' +
        (Object.keys(filter)?.length
          ? ` WHERE ${Object.entries(filter)
              .flatMap((e) => `${e[0]}='${e[1]}'`)
              .join(' AND ')}`
          : null) +
        (orderBy ? ` ORDER BY ${orderBy}` : null)
    )
  })