import { getPeriods } from '@/lib/reports/getPeriods'
import CreatePeriodButton from './CreatePeriodButton'

export default async function PeriodList() {
  let periods = await getPeriods()
  return (
    <div>
      <h1>Periods</h1>
      <div>
        <div>
          <CreatePeriodButton />
        </div>
        <div>
          {periods.map((period) => (
            <div>{period.name}</div>
          ))}
        </div>
      </div>
    </div>
  )
}
