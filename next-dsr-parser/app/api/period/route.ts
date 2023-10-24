import { createPeriod } from '@/lib/reports/createPeriod'
export async function POST(req: Request) {
  const { name, start, end } = await req.json()
  return Response.json(await createPeriod({ name, start, end }))
}
