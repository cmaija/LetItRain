import mongoose, { Schema } from 'mongoose'

const periodSchema = new Schema({
  start: Schema.Types.Date,
  end: Schema.Types.Date,
  name: String,
})

const Period = mongoose.models.Period || mongoose.model('Period', periodSchema)
export default Period
