import fs from 'fs' 
import path from 'path'
import csvParser from 'csv-parser'
let reportExport: string[] = []

console.log('before running main')
async function main() {
  console.log('in main')
  let result
  try {
    console.log('before reading file')
    result = await fs.createReadStream("./report.csv")
      .pipe(csvParser())
      .on("data", (data) => {
        reportExport.push(data);
      })
      .on("end", () => {
        console.log('finished parsing report');
        console.log(reportExport)
      });
  } catch (error) {
    console.log(error)
  }
  console.log(result)
  console.log(reportExport[0])
  console.log(reportExport.length)

}
main()