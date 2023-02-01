const api = async (req, res) => {
  const { url } = req.query
  const realUrl = decodeURIComponent(url)
  const fetchUrl = realUrl.startsWith('http')
    ? realUrl
    : `https://benefit.jujienet.com/benefit/index/${realUrl}`
  const result = await fetch(fetchUrl, {
    method: 'GET',
    redirect: 'manual',
  })
  res.status(200).send(result.headers.get('location'))
}

export default api
