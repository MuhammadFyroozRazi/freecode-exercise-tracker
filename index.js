const express = require('express')
const app = express()
const cors = require('cors')
const mongoose = require('mongoose')
const { createAndSaveUser, getAllUsers } = require('./controller/userController')
require('dotenv').config()

app.use(cors())
app.use(express.static('./public'))

const port = process.env.PORT || 3000;

app.use(express.json()) 
app.use(express.urlencoded({extended: true}))

app.get('/', (req, res) => {
  res.sendFile(__dirname + '/views/index.html')
});

app.route('/api/users')
  .post(createAndSaveUser)
  .get(getAllUsers)


const start = async () =>{
  try {
    await mongoose.connect(process.env.MONGO_URI)
    app.listen(port,()=>{
      console.log('Your app is listening on port ' + port)
    })
  } catch (error) {
    console.log(error)
  }
}

start()
