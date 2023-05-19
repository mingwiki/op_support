const api = async (req, res) => {
  const { link } = req.query
  const url = decodeURIComponent(link)
  console.log(url)
  const fetchUrl = url.startsWith('http')
    ? url
    : `https://benefit.jujienet.com/benefit/index/${url}`
  const result = await fetch(fetchUrl, {
    method: 'GET',
    redirect: 'manual',
  })
  console.log(result.headers)
  res.status(200).send(result.headers.get('location'))
}

export default api
