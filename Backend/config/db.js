const mongoose = require('mongoose')

mongoose.connect(process.env.MONGODB_URL).then(() =>{
    console.log('Connected to MongoDB')
}).catch(() =>{
    console.log('Failed to connect to MongoDB')
})

module.exports = mongoose.connection;