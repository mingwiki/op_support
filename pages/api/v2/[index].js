const api = (req, res) => {
  console.log(req.headers)
  res.setHeader('Content-Type', 'application/json');
  res.status(404).json(req.headers)
}

export default api
