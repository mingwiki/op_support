/** @format */

// db.js
import mysql from 'serverless-mysql'
const db = mysql({
  config: {
    host: import.meta.env.MYSQL_HOST,
    port: import.meta.env.MYSQL_PORT,
    database: import.meta.env.MYSQL_DATABASE,
    user: import.meta.env.MYSQL_USER,
    password: import.meta.env.MYSQL_PASSWORD,
  },
})
export default async function SQL(sql) {
  try {
    console.log(sql)
    const results = await db.query(sql)
    console.log(results)
    await db.end()
    return results
  } catch (error) {
    return error
  }
}
