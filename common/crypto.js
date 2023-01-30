import CryptoJS from 'crypto-js'
export const genSessionId = (filter) => {
  return CryptoJS.SHA256(
    Object.entries(filter)
      .flatMap((e) => `${e[0]}='${e[1]}'`)
      .concat([new Date().toLocaleString()])
      .join('-')
  ).toString(CryptoJS.enc.Hex)
}
