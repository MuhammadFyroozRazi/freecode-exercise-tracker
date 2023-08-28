const Ecercise = require('../model/Ecercise')
const Exercise = require('../model/Ecercise')
const User = require('../model/User')

const createExerise = async (req,res) =>{
    try {
        const {_id:userId} = req.params
        const{description,duration,date} = req.body
        const user =await User.findById({_id:userId})
        const {_id,username} = user
        console.log(_id,username);
        let exercise = await Exercise.find({userid:userId})
        console.log(exercise.length === 0)
        if(exercise.length === 0 ){ // means its is the first exercise creating
            const postExercise = new Exercise({
                userid : _id,
                username,
                log:[{
                    description,
                    date,
                    duration
                }]
            }) 
            const saveExercise = await postExercise.save() // this is the db db part
            return res.json(saveExercise)
        }
        else{

            // exercise[0].log.push

            // const updatedExercise = await Exercise.updateOne(
            //     {_id:userId},
            //     {$push:{log : [{
            //         date,
            //         description,
            //         duration
            //     }]}}
            //     ) 
            //     let updatedExerciseFetched = await Exercise.find({userid:userId})
            //     return res.json(updatedExerciseFetched)


            exercise[0].log.push({
                date,
                description,
                duration
            })
            console.log(exercise[0])
            const saveExercise = await exercise[0].save()
            console.log('***************')
            console.log(saveExercise)
            return res.json(saveExercise)

        }
    } catch (error) {
        res.json({
            error:`can\'t create exercise ${error}`
        })
    }
    
}
module.exports = {createExerise}