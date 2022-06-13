import SQL from '../../../db'

export default async (req, res) => {
  if (req.method === 'GET') {
    try {
      const result = await SQL('SELECT * FROM users')
      res.status(200).json(result)
    } catch (error) {
      res.status(500).json({ error: error.message })
    }
  } else {
    res.status(405).json({ error: 'Method not allowed' })
  }
}
