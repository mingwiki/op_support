import SQL from '../../../db'

export default async (req, res) => {
  try {
    let result
    console.log(req.method)
    if (req.method === 'POST') {
      const { filter, data } = req.body
      const { orderBy } = data
      result = await SQL(
        `SELECT * FROM links` +
          (Object.keys(filter)?.length
            ? ` WHERE ${Object.entries(filter)
                .flatMap((e) => `${e[0]}='${e[1]}'`)
                .join(' AND ')}`
            : null) +
          (orderBy ? ` ORDER BY ${orderBy}` : null)
      )
    }
    res.setHeader('Access-Control-Allow-Origin', '*')
    res.setHeader('Access-Control-Allow-Methods', '*')
    res.setHeader('Access-Control-Allow-Headers', '*')
    res.status(200).json(result)
  } catch (error) {
    res.status(500).json({ error: error.message })
  }
}
