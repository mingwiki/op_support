import SQL from '../../db'

export default async (req, res) => {
  try {
    console.log('req body', req.body)
    const result = await SQL({
      query: 'SELECT * FROM hello_test LIMIT 100',
      // values: [req.body.content],
    })
    console.log('result', result)
    res.status(200).json(result)
  } catch (error) {
    console.log(error)
  }
}
