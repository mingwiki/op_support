import SQL from '../../db'

export default async (req, res) => {
  try {
    const result = await SQL({
      sql: 'SELECT content FROM hello_test LIMIT 1',
    })
    res.status(200).json(result)
  } catch (error) {
    console.log(error)
  }
}
