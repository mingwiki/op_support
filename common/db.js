/** @format */

// db.js
import mysql from 'serverless-mysql'
const db = mysql({
  config: {
    host: import.meta.env.VITE_MYSQL_HOST,
    port: import.meta.env.VITE_MYSQL_PORT,
    database: import.meta.env.VITE_MYSQL_DATABASE,
    user: import.meta.env.VITE_MYSQL_USER,
    password: import.meta.env.VITE_MYSQL_PASSWORD,
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
