const mongoose = require('mongoose')

const connectDB =  async() => {

    try {
        const conn = await mongoose.connect('mongodb+srv://zoo123:zoo123@cluster0.wlkam.mongodb.net/zoohackathon?retryWrites=true&w=majority',{
            useNewUrlParser: true,
            useUnifiedTopology: true,
            useFindAndModify:false,
        })

        console.log(`connected DB!: ${conn.connection.host}`)
    } catch (error) {
        console.log("idk")
        console.error(err)
        process.exit(1)
    }

}

module.exports = connectDB