import SQL from '/common/db'
import { request } from '/common/public'
import { parseSessionTokenFromCookie } from '/common/parse'
export default (req, res) =>
  request(req, res, async () => {
    const { filter } = req.body
    const { username } = parseSessionTokenFromCookie(req)
    const data = []
    filter.map(async (i) => {
      const { id, appId } = i
      const res = await SQL(
        `update config set hide=true where appId='${appId}' and id='${id}'`
      )
      if (res.warningCount === 0) {
        if (!i.hide) {
          delete i.id
          delete i.hide
          delete i.appName
          i.username = username
          const keys = Object.keys(i)
          return await SQL(`
        insert into config (${keys.join(',')}) values('${keys
            .map((key) => i[key])
            .join("','")}')
        `)
        } else {
          console.log('error', i)
          data.push(i)
        }
      } else {
        return data.push(res)
      }
    })
    return data
  })
