import mongoose, { Schema } from 'mongoose'

export interface IPeriod {
  start: Date
  end: Date
  name: string
  reports: any
}

const periodSchema = new Schema<IPeriod>({
  start: Schema.Types.Date,
  end: Schema.Types.Date,
  name: String,
  reports: [{ type: Schema.Types.ObjectId, ref: 'Report' }],
})

const Period =
  mongoose.models.Period || mongoose.model<IPeriod>('Period', periodSchema)
export default Period
