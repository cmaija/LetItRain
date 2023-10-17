import Period, { IPeriod } from '@/models/period'
import dbConnect from '../mongodb'

export async function getPeriods(): Promise<IPeriod[]> {
  await dbConnect()
  const periods = await Period.find({})
  return periods
}
