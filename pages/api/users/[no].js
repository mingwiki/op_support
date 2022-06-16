export default function (req, res) {
  res.status(404).json({ message: 'Invalid request' })
}
