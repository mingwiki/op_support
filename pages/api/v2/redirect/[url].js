const api = async (req, res) => {
  const { url } = req.query
  const fetchUrl = url.startsWith('http')
    ? url
    : `https://benefit.jujienet.com/benefit/index/${url}`
  const result = await fetch(fetchUrl, {
    method: 'GET',
    redirect: 'manual',
  })
  res.status(200).send(result.headers.get('location'))
}

export default api
