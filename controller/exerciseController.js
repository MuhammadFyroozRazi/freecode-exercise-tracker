const Ecercise = require('../model/Ecercise')
const Exercise = require('../model/Ecercise')
const User = require('../model/User')

const createExerise = async (req,res) =>{
    try {
        const {_id:userId} = req.params
        let date
        const{description,duration, date:inputdate} = req.body
        let dateString 
        if(!inputdate){
            dateString = new Date()
             date = dateString.toDateString()
        }
        else{
            dateString = new Date(inputdate)
             date=dateString.toDateString()
            console.log(date)
        }
        const user =await User.findById({_id:userId})
        const {_id,username} = user
        console.log(_id,username);
        let exercise = await Exercise.find({userid:userId})
        console.log(exercise.length === 0)
        if(exercise.length === 0 ){ // means its is the first exercise creating
            const postExercise = new Exercise({
                userid : _id,
                username,
                count:0,
                log:[{
                    description,
                    date,
                    duration
                }]
            }) 
            const saveExercise = await postExercise.save() // this is the db db part
            // return res.json(saveExercise)
            return res.json({
                _id:saveExercise.id,
                username:saveExercise.username,
                date,
                duration,
                description
            })
        }
        else{
            exercise[0].count =exercise[0].count+ 1
            exercise[0].log.push({
                date,
                description,
                duration
            })
            console.log(exercise[0])
            const saveExercise = await exercise[0].save()
            console.log('***************')
            console.log(saveExercise)
            return res.json({
                _id:saveExercise.id,
                username:saveExercise.username,
                date,
                duration,
                description
            })

        }
    } catch (error) {
        res.json({
            error:`can\'t create exercise ${error}`
        })
    }
    
}

const getUserExercise= async (req,res) => {
    const {_id:id} = req.params
    // console.log(params)
    try {
        const  exercise = await Exercise.find({userid:id}) 
        // console.log(exercise.username)
        return res.json({
            _id : id,
            username:exercise[0].username,
            count:exercise[0].count,
            log:exercise[0].log
        })
        
    } catch (error) {
        res.json({
            error:`can\'t create exercise ${error}`
        })
    }
}
module.exports = {createExerise,getUserExercise}