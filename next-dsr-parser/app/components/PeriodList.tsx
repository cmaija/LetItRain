import { getPeriods } from '@/lib/reports/getPeriods'
import CreatePeriodButton from './CreatePeriodButton'
import { Period } from '@/lib/interfaces'

export default async function PeriodList() {
  console.log(process.env.URL)
  let periods: any = await getPeriods()
  return (
    <div>
      <h1>Periods</h1>
      <div>
        <div>
          <CreatePeriodButton />
        </div>
        <div>
          {periods.map((period: any) => (
            <div>{period.name}</div>
          ))}
        </div>
      </div>
    </div>
  )
}
