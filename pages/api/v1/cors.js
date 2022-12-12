import fetch from 'node-fetch'
const api = async (req, res) => {
  try {
    res.setHeader('Access-Control-Allow-Origin', '*')
    res.setHeader('Access-Control-Allow-Methods', '*')
    res.setHeader('Access-Control-Allow-Headers', '*')
    if (req.method === 'POST') {
      const { url } = JSON.parse(req.body)
      fetch(url).then(async (fetchRes) => {
        const data = await fetchRes.text()
        res.status(200).json(data)
      })
    } else {
      res.status(200).json('Not POST request')
    }
  } catch (error) {
    res.status(500).json({ error })
  }
}

export default api
