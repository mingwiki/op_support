import SQL from '../../../db'

export default async (req, res) => {
  try {
    let result
    console.log(req.method)
    res.setHeader('Access-Control-Allow-Origin', '*')
    res.setHeader('Access-Control-Allow-Methods', '*')
    res.setHeader('Access-Control-Allow-Headers', '*')
    if (req.method === 'POST') {
      const { filter, data } = req.body
      const { orderBy } = data
      const [, session_id] = req.headers?.cookie?.split('=')
      console.log(session_id)
      const check = await SQL(
        `SELECT COUNT(session_id) FROM users WHERE session_id='${session_id}'`
      )
      if (check[0]['COUNT(session_id)'] === 1) {
        result = await SQL(
          `SELECT * FROM links` +
            (Object.keys(filter)?.length
              ? ` WHERE ${Object.entries(filter)
                  .flatMap((e) => `${e[0]}='${e[1]}'`)
                  .join(' AND ')}`
              : null) +
            (orderBy ? ` ORDER BY ${orderBy}` : null)
        )
        res.status(200).json(result)
      } else {
        console.log(check[0]['COUNT(session_id)'])
        res.status(200).json(check)
      }
    } else {
      res.status(200).json('Not POST request')
    }
  } catch (error) {
    res.status(500).json({ error: error.message })
  }
}
