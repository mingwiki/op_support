import SQL from '/common/db'
import { request } from '/common/public'
import { parseSessionTokenFromCookie } from '/common/parse'
export default (req, res) =>
  request(req, res, async () => {
    const { appId, pagePath, presets } = req.body
    const { username } = parseSessionTokenFromCookie(req)
    return await SQL(
      `update config set presets='${JSON.stringify(
        JSON.parse(presets)
      )}', username='${username}' where appId='${appId}' and pagePath='${pagePath}'`
    )
  })
