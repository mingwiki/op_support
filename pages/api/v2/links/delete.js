/** @format */

import SQL from '/common/db'
import { request } from '/common/public'
import { parseSessionTokenFromCookie } from '/common/parse'
export default (req, res) =>
  request(req, res, async () => {
    const { filter } = req.body
    const { username } = parseSessionTokenFromCookie(req)
    filter.username = username
    return await SQL(
      'UPDATE links SET isShow=0' +
        (Object.keys(filter)?.length
          ? ` WHERE ${Object.entries(filter)
              .flatMap((e) => `${e[0]}='${e[1]}'`)
              .join(' AND ')}`
          : null)
    )
  })
