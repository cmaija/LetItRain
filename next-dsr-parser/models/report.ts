import mongoose, { Schema } from 'mongoose'

const reportSchema = new Schema({
  date: Schema.Types.Date,
  isUploaded: Boolean,
  sales: Schema.Types.Mixed,
  taxes: Number,
  comps: Schema.Types.Mixed,
  nonCashPayments: Schema.Types.Mixed,
  tips: {
    ['Charge Tips']: Number,
    AutoGratuity: Number,
    total: Number,
  },
  cashPayments: {
    cashTaken: Number,
    pettyCash: Number,
    extraCash: Number,
  },
})

const Report = mongoose.models.Report || mongoose.model('Report', reportSchema)
export default Report
