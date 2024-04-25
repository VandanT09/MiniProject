import mongoose from "mongoose"

const Connection = async () => {
  try {
    await mongoose.connect(process.env.MONGODB_URL, { useUnifiedTopology: true, useNewUrlParser: true })
    console.log('Database Connected successfully')
  } catch (error) {
    console.log('Error while connecting database ', error.message)
  }
}

export default Connection