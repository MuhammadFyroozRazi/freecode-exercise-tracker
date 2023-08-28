const mongoose = require('mongoose')


const ExerciseSchema = new mongoose.Schema({
    userid:{
      type:mongoose.Types.ObjectId,
      ref:'User',
      required:true
    },
    username:{
      type:String,
      required:true
    },
    log:[{
      date: {
        type: String
      },
      description: {
        type: String,
        required:[true,'enter the description']
      },
      duration: {
        type: Number
      }
    }],
  })
  
  module.exports = mongoose.model('Exercise', ExerciseSchema)