import { Document, WithId } from 'mongodb'
import clientPromise from '../mongodb'

export async function getPeriods(): Promise<WithId<Document>[]> {
  const client = await clientPromise
  const periods: WithId<Document>[] = await client
    .db()
    .collection('periods')
    .find({})
    .sort({ date: -1 })
    .toArray()

  return periods
}
