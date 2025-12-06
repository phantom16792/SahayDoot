const User = require("./../models/userModel");

// 1) to get all users ->
exports.getAllUsers = async(req,res) => {
    try {

        const users = await User.find();
        res.status(200).json({
            status : "success",
            result : users.length,
            data : {
                users : users,
            }
        });
        
    } catch (error) {
        res.status(404).json({
            status : "Fail",
            message : "Users not found"
        });
    }
}

// 2) to get one user ->
exports.getUser = async(req,res) =>{
    try {
        
        const user = await User.findById(req.params.id);

        res.status(200).json({
            status : "success",
            data : {
                users : user,
            }
        });

    } catch (error) {
         res.status(404).json({
            status : "Fail",
            message : "Users not found"
        });
    }
}

// 3) to create user ->
exports.createUser = async (req,res) => {
    try {
        const newUser = await User.create(req.body);

        res.status(201).json({
        status: "success",
        message: "User created successfully",
        data: {
            users: newUser,
        },
        });

    } catch (error) {
        res.status(400).json({
            status : "Fail",
            message : error,
        });

        
    }
    
}

