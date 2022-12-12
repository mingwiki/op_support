/** @format */

import SQL from 'common/db'

const api = async (req, res) => {
  try {
    let result
    res.setHeader('Access-Control-Allow-Origin', '*')
    res.setHeader('Access-Control-Allow-Methods', '*')
    res.setHeader('Access-Control-Allow-Headers', '*')
    if (req.method === 'POST') {
      result = await SQL(
        'SELECT  id, username, nickname, update_time, create_time, disabled FROM users ORDER BY update_time DESC',
      )
      res.status(200).json(result)
    } else {
      res.status(200).json('Not POST request')
    }
  } catch (error) {
    res.status(500).json({ error: error.message })
  }
}

export default api
