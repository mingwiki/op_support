import SQL from '/common/db'
import { request } from '/common/public'
import { parseSessionTokenFromCookie } from '/common/parse'
export default (req, res) =>
  request(req, res, async () => {
    const { appId, pageName, pagePath, presets } = req.body
    const { username } = parseSessionTokenFromCookie(req)
    const result = await SQL(
      `update config set hide=true where appId='${appId}' and pagePath='${pagePath}' and hide is null`
    )
    if (result.warningCount === 0) {
      return await SQL(`
      insert into config (appId, pageName, pagePath, presets, username) values('${appId}', '${pageName}', '${pagePath}', '${presets}', '${username}')
      `)
    }
  })
