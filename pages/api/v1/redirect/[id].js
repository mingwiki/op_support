/** @format */

const api = async (req, res) => {
  const { id } = req.query
  console.log(id)
  const result = await fetch(
    `https://benefit.jujienet.com/benefit/index/${id}`,
    {
      method: 'GET',
      redirect: 'manual',
    }
  )
  console.log(result.headers.get('location'))
  res.status(200).send(result.headers.get('location'))
}

export default api
