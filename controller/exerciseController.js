// const Ecercise = require('../model/Ecercise')
const Exercise = require('../model/Ecercise')
const User = require('../model/User')

const createExerise = async (req, res) => {
  try {
    const { _id: userId } = req.params
    let date
    const { description, duration : inputDuration, date: inputdate } = req.body
    let dateString

    if (!inputdate) {
      dateString = new Date()
      date = dateString.toDateString()
    }
    else {
      dateString = new Date(inputdate)
      date = dateString.toDateString()
      //   console.log(date)
    }

    if (description === "") {
      return res.json({ error: "description is required" })
    }
    if (inputDuration === "") {
      return res.json({ error: "duration is required" })
    }
    const duration =  parseInt(inputDuration)


    let user = await User.findById({ _id: userId })
    const { _id, username } = user
    // console.log(_id, username);
    let exercise = await Exercise.find({ userid: userId })
    // console.log(exercise.length === 0)
    if (exercise.length === 0) { // means its is the first exercise creating
        const postExercise = new Exercise({
            userid: _id,
            username,
            count: 1,
            log: [{
            description,
            date,
            duration
            }]
        })
        const saveExercise = await postExercise.save() // this is the db db part
        return res.json({
            _id: user._id,
            username: user.username,
            date,
            duration,
            description,
        });
    }
    else {
        exercise[0].count = exercise[0].count + 1
        exercise[0].log.push({
            date,
            description,
            duration
        })
        const saveExercise = await exercise[0].save()
        return res.json({
            _id: user._id,
            username: user.username,
            date,
            duration,
            description,
        });
    }
  } catch (error) {
    res.json({
      error: `can\'t create exercise ${error}`
    })
  }

}

const getUserExercise = async (req, res) => {
  const { _id: id } = req.params
//   let { from, to, limit } = req.query

  let from = req.query.from !== undefined ? req.query.from : null
  let to = req.query.to !== undefined ? req.query.to : null
  let limit = req.query.limit !== undefined ? parseInt(req.query.limit) : null
  
  
  const from_date = from !== null && new Date(from)
  const to_date = to !== null && new Date(to)
//   console.log(from_date,to_date,limit)

  try {
    const exercise = await Exercise.find({ userid: id })
    let log = []
    let count = limit !== null ? limit : exercise[0].count
    // let count = 0
    let numberOfLogItems = 0
    
    if (from && to) {
      const exerciseOnDates = exercise[0].log.forEach(obj => {
        const date = new Date(obj.date)
        if (date >= from_date && date <= to_date && log.length < count) { // log.lenght is 0
          log.push(obj)
          numberOfLogItems += 1
        }
      })
      from = from_date !== false && from_date.toDateString()
      to = to_date !== false && to_date.toDateString()
      return res.json({
        _id: id,
        from,
        to,
        username: exercise[0].username,
        count: numberOfLogItems,
        log: log
      })

    }

    if(limit){
        exercise[0].log.forEach(obj => {
         if(log.length < limit){
            log.push(obj)
            numberOfLogItems += 1
         }
        })
        return res.json({
            _id: id,
            username: exercise[0].username,
            count : numberOfLogItems,
            log,
          })
    }
    else {
      log = exercise[0].log
      return res.json({
        _id: id,
        username: exercise[0].username,
        count,
        log,
      })
    }

  } catch (error) {
    res.json({
      error: `can\'t create exercise ${error}`
    })
  }
}
module.exports = { createExerise, getUserExercise }