/** @format */

// db.js
import mysql from 'serverless-mysql'
const db = mysql({
  config: {
    host: process.env.VITE_MYSQL_HOST,
    port: process.env.VITE_MYSQL_PORT,
    database: process.env.VITE_MYSQL_DATABASE,
    user: process.env.VITE_MYSQL_USER,
    password: process.env.VITE_MYSQL_PASSWORD,
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
