const Ecercise = require('../model/Ecercise')
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
  let { from, to, limit } = req.query

  const from_date = new Date(from)
  const to_date = new Date(to)

  try {
    const exercise = await Exercise.find({ userid: id })
    let log = []
    let count
    if (limit) {
      count = parseInt(limit)
    } else {
      count = exercise[0].count
    }
    if (from && to) {
      const exerciseOnDates = exercise[0].log.forEach(obj => {

        const date = new Date(obj.date)
        if (date >= from_date && date <= to_date && log.length < count) {
          log.push(obj)
        }
      })

    }
    else {
      log = exercise[0].log
    }

    from = from_date.toDateString()
    to = to_date.toDateString()
    return res.json({
      _id: id,
      from,
      to,
      username: exercise[0].username,
      count: count,
      log: log
    })

  } catch (error) {
    res.json({
      error: `can\'t create exercise ${error}`
    })
  }
}
module.exports = { createExerise, getUserExercise }