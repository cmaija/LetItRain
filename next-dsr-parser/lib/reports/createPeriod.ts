import clientPromise from '../mongodb'

export async function createPeriod(period: {
  name: string
  start: Date
  end: Date
}) {
  const client = await clientPromise
  const db = client.db()
  const collection = db.collection('periods')

  const result = await collection.insertOne(period)

  return result
}
