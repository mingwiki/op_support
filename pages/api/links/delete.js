import SQL from '../../../db'

export default async (req, res) => {
  try {
    let result
    console.log(req.method)
    if (req.method === 'POST') {
      const { filter } = req.body
      result = await SQL(
        `UPDATE links SET isShow=0` +
          (Object.keys(filter)?.length
            ? ` WHERE ${Object.entries(filter)
                .flatMap((e) => `${e[0]}='${e[1]}'`)
                .join(' AND ')}`
            : null)
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
