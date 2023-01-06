import SQL from '/common/db'
import { request } from '/common/public'

export default (req, res) =>
  request(req, res, async () => {
    return {
      applets: await SQL('select * from applets'),
      config: await SQL(
        'select a.*, c.id as pageId, c.pageName, c.pagePath, c.hide as pageHide FROM config c  join applets a on a.appId=c.appId'
      ),
    }
  })
