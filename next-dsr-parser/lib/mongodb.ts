import mongoose from 'mongoose'
declare global {
  var mongoose: any // This must be a `var` and not a `let / const`
}

const MONGODB_PW = encodeURIComponent(process.env.MONGODB_PW!)
// const MONGODB_PW = process.env.MONGODB_PW!

const MONGODB_USER = encodeURIComponent(process.env.MONGODB_USER!)
const MONGODB_PREFIX = process.env.MONGODB_PREFIX!
const MONGODB_SUFFIX = process.env.MONGODB_SUFFIX!

if (!MONGODB_PW || !MONGODB_USER || !MONGODB_PREFIX || !MONGODB_SUFFIX) {
  throw new Error(
    'Please define the MONGODB_URI environment variable inside .env'
  )
}

const mongodb_uri = `${MONGODB_PREFIX}${MONGODB_USER}:${MONGODB_PW}${MONGODB_SUFFIX}`
let cached = global.mongoose

if (!cached) {
  cached = global.mongoose = { conn: null, promise: null }
}

async function dbConnect() {
  if (cached.conn) {
    return cached.conn
  }
  if (!cached.promise) {
    const opts = {
      bufferCommands: false,
    }
    cached.promise = mongoose.connect(mongodb_uri, opts).then((mongoose) => {
      return mongoose
    })
  }
  try {
    cached.conn = await cached.promise
  } catch (e) {
    cached.promise = null
    throw e
  }

  return cached.conn
}

export default dbConnect
