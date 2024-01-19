import CreatePeriodButton from './CreatePeriodButton'

export default async function PeriodList() {
  // let periods: any = await getPeriods()
  return (
    <div>
      <div>
        <div>
          <CreatePeriodButton />
        </div>
        {/* <div>
          {periods.map((period: any) => (
            <div>{period.name}</div>
          ))}
        </div> */}
      </div>
    </div>
  )
}
