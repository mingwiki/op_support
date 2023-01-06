import SQL from '/common/db'
import { request } from '/common/public'

export default (req, res) =>
  request(req, res, async () => {
    return await SQL('select * from applets')
  })
