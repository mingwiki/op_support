import { Client } from 'pg'

const client = new Client({
  host: 'localhost',
  port: 5432,
  database: 'op_data',
  user: 'op',
  password: 'test',
})
client.connect()
export default async function SQL(sql) {
  try {
    console.log(sql)
    const results = await client.query(sql)
    return results
  } catch (error) {
    return error
  }
}
