/** @format */

import SQL from 'common/db'
import { request } from 'common/public'
export default (req, res) =>
  request(
    req,
    res,
    async () => {
      return await await SQL(
        'SELECT  id, username, nickname, update_time, create_time, disabled FROM users ORDER BY update_time DESC'
      )
    },
    true
  )
