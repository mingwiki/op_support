import SQL from '../../../db'

export default async (req, res) => {
  try {
    const result = await SQL('SELECT * FROM links')
    res.status(200).json({ data: result })
  } catch (error) {
    res.status(500).json({ error: error.message })
  }
}
