const api = (req, res) => {
  res.status(404).json({ message: 'Invalid request' })
}

export default api
