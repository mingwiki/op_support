import SQL from '/common/db'
import { request } from '/common/public'

export default (req, res) =>
  request(req, res, async () => {
    const { appId, pagePath, presets } = req.body
    return await SQL(
      `update config set presets='${JSON.stringify(
        JSON.parse(presets)
      )}' where appId='${appId}' and pagePath='${pagePath}'`
    )
  })
