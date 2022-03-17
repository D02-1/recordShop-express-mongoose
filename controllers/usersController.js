require('dotenv').config();
const User = require("../models/User");
const { validationResult } = require("express-validator");
const jwt = require('jsonwebtoken');
const crypto = require('crypto');


const getUsers = async (req, res, next) => {
  try {
    const users = await User.find();
    res.status(200).json({
      success: true,
      amount: users.length,
      data: users,
    });
  } catch (err) {
    next(err);
  }
};


const getUser = async (req, res, next) => {
  try {
    const { id } = req.params
    const user = await User.findById(id);
    if (!user) throw new Error("not found");
    res.status(200).json({
      success: true,
      data: user,
    });
  } catch (err) {
    next(err);
  }
};


const deleteUser = async (req, res, next) => {
  try {
    const { id } = req.params
    const user = await User.findById(id);
    if (!user) throw new Error("not found");
    console.log("id", id, "reqTokenID", req.tokenUser);
    if (id !== req.tokenUser) {
      return res.status(400).json({
        success: false,
        message: "Sorry, but you are not authorized!"
      })
    }
    const delUser = await User.deleteOne({ _id: id })
    res.status(200).json({
      success: true,
      message: `User with email ${user.email} was successfully deleted.`,
      deleted: delUser
    });
  } catch (err) {
    next(err);
  }
};


const updateUser = async (req, res, next) => {
  try {
    const {id} =req.params;
    const {password} = req.body

    if(id !== req.tokenUser){
      return res.status(400).json({
        success:false,
        message:"Sorry, but you are unauthorized!"
      })
  }
    const errors = validationResult(req); // Finds the validation errors in the request
    // errors object has function isEmpty()?
    if (!errors.isEmpty()) {
    // errors.array() function has the validation results
      return res.status(422).json({ errors: errors.array() });
    }
    if(password){
      const userWithNewPW = await User.find({_id:id})
      userWithNewPW.password = crypto.createHmac('sha256', process.env.SECRET_TOKEN).update(password).digest('hex')
      const updatedUser = await User.findOneAndUpdate({_id:id}, {...req.body, password: userWithNewPW.password}, {
        new: true,
      })
      return res.status(200).json({
        success:true,
        message: "User successfully updated."
    });
    }
      const user = await User.findOneAndUpdate({_id:id}, {...req.body}, {
      new: true,
    });
    res.status(200).json({
      success:true,
      message: "User successfully updated."
    });
  
    if (!user) throw new Error("not found");

  } catch (err) {
    next(err);
  }
};



const addUser = async (req, res, next) => {
  try {
    const { firstName, lastName, email, password, admin } = req.body
    const alreadyExists = await User.find({ email });
    if (alreadyExists.length >= 1) {
      return res.status(409).json({
        success: false,
        message: "email already exists"
      })
    }

    const errors = validationResult(req); // Finds the validation errors in the request
    // errors object has function isEmpty()?
    if (!errors.isEmpty()) {
      // errors.array() function has the validation results
      return res.status(422).json({ errors: errors.array() });
    }

    const user = new User({
      firstName,
      lastName,
      email,
      password,
      admin
    });
    user.password = user.hashPassword(password);
    const userSavedDB = await user.save();
    res.status(200).json({
      success: true,
      message: `Thanks ${firstName} for registering.`,
      data: user
    });
  } catch (err) {
    next(err);
  }
};


const loginUser = async (req, res, next) => {
  try {
    const { email, password, firstName } = req.body;
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(422).res.json({
        success: false,
        errors: errors.array()
      })
    }
    const userFoundDB = await User.findOne({ email })
    console.log(userFoundDB);
    if (userFoundDB) {
      if (userFoundDB.comparePassword(password)) {
        userFoundDB.lastLogin = new Date()
        const userLastLogin = await userFoundDB.save()
        const token = jwt.sign({
          email: userLastLogin.email,
          userId: userLastLogin._id,
        }, process.env.SECRET_TOKEN, { expiresIn: '30d' }
        )
        res.status(200).json({
          success: true,
          token: token,
          message: `You are logged in ${userLastLogin.firstName}`
        })
      } else {
        res.send(400).res.json({
          success: false,
          message: `You could not log in. Pls ensure email and password are correct.`
        })
      }

    } else {
      res.status(400).json({
        success: false,
        message: `pls sign up`
      })
    }

  } catch (err) {
    next(err)
  }
};

module.exports = { getUsers, getUser, deleteUser, updateUser, addUser, loginUser }
