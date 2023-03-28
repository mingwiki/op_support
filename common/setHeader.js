export default function (res, sessionId, username) {
  res.setHeader(
    'Set-Cookie',
    `sessionToken=${JSON.stringify({
      sessionId,
      username
    })}; max-age=2592000; path=/;`
  )
}
