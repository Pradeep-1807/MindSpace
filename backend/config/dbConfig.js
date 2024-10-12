import mongoose from 'mongoose'

const connectDB = async()=>{
    try {
        const connect = await mongoose.connect(process.env.CONNECTION_STRING)
        console.log('Database connected successfully ',connect.connection.host, connect.connection.name)
    } catch (error) {
        console.log("Failed to Connect to Database")
    }
}

export default connectDB