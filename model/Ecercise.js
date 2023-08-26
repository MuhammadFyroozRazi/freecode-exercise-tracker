const mongoose = require('mongoose')


const ExerciseSchema = new mongoose.Schema({
    description: {
      type: String,
      require:[true,'enter the description']
    },
    duration: {
      type: Number
    },
    date: {
      type: String
    }
  })
  
  module.exports = mongoose.model('Exercise', ExerciseSchema)