/*
 * @function findRowIdx
 * @description Find the index of a row in a csv file given a validator function and optionally a start index.
 * @param {any} csv - The csv file to search.
 * @param {function} rowValidator - A function that takes a row and returns a boolean. If the function returns true, the row is considered a match.
 * @param {number} startIdx - The index to start searching from. Defaults to 0.
 */
export function findRowIdx(
  csv: any,
  rowValidator: (row: string[]) => boolean,
  startIdx: number = 0
): number {
  return csv.findIndex(
    (row: string[], index: any) => index > startIdx && rowValidator(row)
  )
}

/*
 * @function parseCol
 * @description Find the index of a column in a row.
 * @param {string[]} row - The row row to search.
 * @param {string} colName - The name of the column to find.
 */
export function parseCol(row: string[], colName: string): number {
  return row.findIndex(
    (col: string) => col.toLowerCase() === colName.toLowerCase()
  )
}

/*
 * @function parseColWithTest
 * @description Find the index of a column in a row.
 * @param {string[]} row - The row row to search.
 * @param {function} colTest - The test to run on each column. If the test returns true, the column is considered a match.
 */
export function parseColWithTest(
  row: string[],
  colTest: (col: string) => boolean
) {
  return row.findIndex((col: string) => colTest(col))
}
