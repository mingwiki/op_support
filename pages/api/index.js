import SQL from '/common/db'

const api = async (req, res) => {
  try {
    const result = await SQL('SELECT content FROM hello_test LIMIT 1')
    res.status(200).json(result.rows[0]['content'])
  } catch (error) {
    console.log(error)
  }
}

export default api
