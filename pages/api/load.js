// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
import fs from 'fs'
import SQL from '../../db'
export default async function handler(req, res) {
  try{
    const result = await SQL(`UPDATE links SET username = 'luobingyao' WHERE nickname = '马小各'`)
    res.status(200).json(result)
  }
  catch(err){
    res.status(500).json(err)
  }
  // users.map(async (user) => {
  //   try {
  //     const result = await SQL(
  //       `INSERT INTO users (create_time, update_time, username, password, nickname, session_id) VALUES ('${new Date().toJSON().slice(0, 19).replace('T', ' ')}', '${new Date().toJSON().slice(0, 19).replace('T', ' ')}', '${user.username}', '123', '${user.realname}', '')`
  //     )
  //     console.log(result)
  //     return result
  //   } catch (error) {
  //     console.log(error)
  //   }
  // })
  // links.map(async (link) => {
  //   try {
  //     const result = await SQL(
  //       `INSERT INTO links (create_time, update_time, isShow, appId, pagePath, enterId, sourceOrigin, linkName, nickname, url) VAlUES ('${new Date()
  //         .toJSON()
  //         .slice(0, 19)
  //         .replace('T', ' ')}', '${new Date()
  //         .toJSON()
  //         .slice(0, 19)
  //         .replace('T', ' ')}', true, '${link.appId}', '${
  //         link.pagePath
  //       }', '${link.enterId.join(',')}', '${link.sourceOrigin.join(',')}', '${
  //         link.name
  //       }', '${link.user}', '${link.url}')`
  //     )
  //     // console.log(result)
  //     return result
  //   } catch (error) {
  //     console.log(error)
  //   }
  // })

  res.status(200).json('ok')
}
