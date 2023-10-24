import { DayReport } from '../interfaces'
import clientPromise from '../mongodb'

export async function createReport(report: DayReport, periodId: string) {
  const client = await clientPromise
  const db = client.db()
  const collection = db.collection('reports')

  const result = await collection.insertOne({ period: periodId, ...report })
  return result
}
