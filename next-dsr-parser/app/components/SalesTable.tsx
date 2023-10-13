'use client'
import EditableTableCell from '@/components/ui/EditableTableCell'
import { TotalsByCategory } from '@/lib/interfaces'
import { convertToMoneyString } from '@/lib/shared'
import { useState } from 'react'

interface Props {
  sales: TotalsByCategory
  taxes: number
  onChangeSales: (sales: TotalsByCategory) => void
  onChangeTaxes: (taxes: number) => void
}

export default function SalesTable({
  sales,
  taxes,
  onChangeSales,
  onChangeTaxes,
}: Props) {
  const [originalSales] = useState<TotalsByCategory>(structuredClone(sales))
  const [originalTaxes] = useState<number>(taxes)

  function handleChangeSales(category: string, value: number | string) {
    let newSales = structuredClone(sales)
    newSales[category].netSales =
      typeof value === 'string' ? parseFloat(value) : value
    newSales[category].total =
      newSales[category].netSales + newSales[category].comps
    onChangeSales(newSales)
  }

  function handleChangeComps(category: string, value: number | string) {
    let newSales = structuredClone(sales)
    newSales[category].comps =
      typeof value === 'string' ? parseFloat(value) : value
    newSales[category].total =
      newSales[category].netSales + newSales[category].comps
    onChangeSales(newSales)
  }

  function handleUndoSalesChanges(category: string) {
    let newSales = structuredClone(sales)
    newSales[category].netSales = originalSales[category].netSales
    newSales[category].total =
      newSales[category].netSales + newSales[category].comps
    onChangeSales(newSales)
  }

  function handleUndoCompsChanges(category: string) {
    let newSales = structuredClone(sales)
    newSales[category].comps = originalSales[category].comps
    newSales[category].total =
      newSales[category].netSales + newSales[category].comps
    onChangeSales(newSales)
  }

  function handleUpdateTaxes(value: number | string) {
    onChangeTaxes(typeof value === 'string' ? parseFloat(value) : value)
  }

  function handleUndoChangeTaxes() {
    onChangeTaxes(originalTaxes)
  }

  return (
    <div>
      <table>
        <thead>
          <tr>
            <th className="text-left">Cagtegory</th>
            <th className="text-right">Net Sales</th>
            <th className="text-right">Comps</th>
            <th className="text-right">Taxes</th>
            <th className="text-right">Total</th>
          </tr>
        </thead>
        <tbody>
          {Object.keys(sales).map((item) => (
            <tr key={item}>
              <td className="text-left">{item}</td>
              <EditableTableCell
                value={sales[item].netSales}
                onChange={(value) => handleChangeSales(item, value)}
                onClickUndo={() => handleUndoSalesChanges(item)}
                className="text-right min-w-[12rem]"
              />
              <EditableTableCell
                value={sales[item].comps}
                onChange={(value) => handleChangeComps(item, value)}
                onClickUndo={() => handleUndoCompsChanges(item)}
                className="text-right min-w-[12rem]"
              />
              <td className="text-right">
                {convertToMoneyString(sales[item].taxes)}
              </td>
              <td className="text-right">
                {convertToMoneyString(sales[item].total)}
              </td>
            </tr>
          ))}
          <tr>
            <td>Totals</td>
            <td className="text-right pr-[4.25rem]">
              {convertToMoneyString(
                Object.values(sales).reduce(
                  (acc, curr) => acc + curr.netSales,
                  0
                )
              )}
            </td>
            <td className="text-right pr-[4.25rem]">
              {convertToMoneyString(
                Object.values(sales).reduce((acc, curr) => acc + curr.comps, 0)
              )}
            </td>
            <td className="text-right">
              {convertToMoneyString(
                Object.values(sales).reduce((acc, curr) => acc + curr.taxes, 0)
              )}
            </td>
            <td className="text-right">
              {convertToMoneyString(
                Object.values(sales).reduce((acc, curr) => acc + curr.total, 0)
              )}
            </td>
          </tr>
          <tr>
            <td>Total Taxes</td>
            <EditableTableCell
              value={taxes}
              onChange={handleUpdateTaxes}
              onClickUndo={handleUndoChangeTaxes}
              className="text-right min-w-[7rem] max-w-[10rem]"
              colSpan={4}
            />
          </tr>
        </tbody>
      </table>
    </div>
  )
}
