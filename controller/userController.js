const User = require('../model/User')

const  createAndSaveUser = async (req,res) =>{
    const username= req.body.username
    console.log(username)
    try {
        const postUser = new User({...User,username:username})
        const saveUser = await postUser.save() 
        res.json(saveUser)
    } catch (error) {
        res.json({
            error:'can\'t create user'
        })
    }
}

const getAllUsers = async (req,res) =>{
    try{
        const users = await User.find({})
        res.json(users) 
    }catch(err){
        res.json({
            error:'can\'t fetch users'
        })
    }
}

module.exports = {
    createAndSaveUser,
    getAllUsers,
    }