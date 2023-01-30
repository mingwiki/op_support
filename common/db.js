import mysql from 'serverless-mysql'
const db = mysql({
  config: {
    host: process.env.MYSQL_HOST,
    port: process.env.MYSQL_PORT,
    database: process.env.MYSQL_DATABASE,
    user: process.env.MYSQL_USER,
    password: process.env.MYSQL_PASSWORD,
  },
})
export default async function SQL(sql) {
  try {
    console.log(sql)
    const results = await db.query(sql)
    await db.end()
    return results
  } catch (error) {
    return error
  }
}
