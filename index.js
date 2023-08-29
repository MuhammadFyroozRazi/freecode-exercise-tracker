const express = require('express')
const app = express()
const cors = require('cors')
const mongoose = require('mongoose')
const { createAndSaveUser, getAllUsers } = require('./controller/userController')
const { createExerise, getUserExercise } = require('./controller/exerciseController')
require('dotenv').config()

app.use(cors())
app.use(express.static('./public'))
// app.use('.')

const port = process.env.PORT || 3000;


// these code below is used to access post request body data 
// in older version we neeed to use body=parser
app.use(express.json()) 
app.use(express.urlencoded({extended: true}))


app.get('/', (req, res) => {
  res.sendFile(__dirname + '/views/index.html')
});

// what happen down when there comes an request in thi url do some functions that written in contollers
// if theres only one req then app.METHODE('url',function) 

app.route('/api/users')
.post(createAndSaveUser)
.get(getAllUsers)

app.route('/api/users/:_id/exercises')
.post(createExerise)

app.get('/api/users/:_id/logs',getUserExercise)



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
