const User = require("../model/userModel")
const jwt = require("jsonwebtoken")
//register a new user
exports.register = async (req, res) => {
  const {email, storename, password, name} = req.body;

  try{
    const user = await User.create({email, storename, password, name})
    res.status(200).json({
      success: true,
      user
    })
  } catch(error){
    res.status(500).json({
      success: false,
      error
    })
  }
}

//login user
exports.login = async(req, res) => {
  const{email, password} = req.body;

  try {
    // 1. get user from db using email
  const dbUser = await User.findOne({email}).select("+password")
  
  // 2. check if user exist
  if(!dbUser){
    res.status(404).json({
      success: false,
      message: "we don't have a user with that email"
    })
  } else {
    // 3. compare passwords
    const comparePassword = await dbUser.comparePassword(password, dbUser.password)

    if(comparePassword){
      // 4. create a jsonwebtoken
      const token = jwt.sign({
        id: dbUser._id
      }, process.env.JWT_SECRET, {
        expiresIn: process.env.JWT_SECRET_EXP
      })
      res.status(200).json({
        success: true,
        token
      })
    } else{
      res.status(400).json({
        success: false,
        message : "Password or email is incorrect"
      })
    }
  }
  } catch (error) {
    res.status(500).json({
      success: false,
      message : "Something went wrong"
    })
  }
  
}