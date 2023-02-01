import SQL from '/common/db'
import { request } from '/common/public'

export default (req, res) =>
  request(req, res, async () => {
    return await SQL(
      'select a.appId,a.appName,c.* from applets a join config c on a.appId = c.appId where c.hide is null order by c.appId desc, c.id desc'
    )
  })
