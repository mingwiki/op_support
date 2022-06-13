import SQL from '../../../db'

export default async (req, res) => {
  try {
    let result
    console.log(req.method)
    res.setHeader('Access-Control-Allow-Origin', '*')
    res.setHeader('Access-Control-Allow-Methods', '*')
    res.setHeader('Access-Control-Allow-Headers', '*')
    if (req.method === 'POST') {
      const [, session_id] = req.headers?.cookie?.split('=')
      result = await SQL(
        `SELECT  id, username, nickname, update_time, create_time FROM users WHERE session_id='${session_id}'`
      )
      res.status(200).json(result)
    } else {
      res.status(200).json('Not POST request')
    }
  } catch (error) {
    res.status(500).json({ error: error.message })
  }
}
