import mongoose from 'mongoose'
import colors from 'colors'


const connectDB = async () => {
  try {
    const conn = await mongoose.connect(`mongodb://mongodb-service/eshop`, {
      useUnifiedTopology: true,
      useNewUrlParser: true ,
      autoIndex: true,
    })
    console.log(`MongoDB connected: ${conn.connection.host}`.cyan.underline)
  } catch (error) {
    console.error(`Error:${error.message}`.red.underline.bold)
    process.exit(1)
  }
}

export default connectDB
