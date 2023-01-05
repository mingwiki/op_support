const api = (req, res) => {
  console.log(req.headers)
  res.status(404).json(req.headers)
}

export default api
