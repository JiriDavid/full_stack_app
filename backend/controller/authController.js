const User = require("../model/userModel")
const jwt = require("jsonwebtoken");
const catchAsync = require("../utils/catchAsync");
const AppError = require("../utils/AppError");


const createActivationLink = (user) => {
  return jwt.sign(user, process.env.ACTIVATION_SECRET, {expiresIn: '10m'})
}
//register a new user
exports.register = catchAsync(
  async (req, res, next) => {
    const {email, storename, password, name} = req.body;
  
      // 1. activation token

      const activationToken = createActivationLink({
        email, 
        storename, 
        password, 
        name
      })

      // 2. confirmation link

      const confirmationLink = `${process.env.FRONTEND_URL}/activation?activationToken=${activationToken}`

      // 3. create a subscriber using storename
      await novu.subscribers.identify(storename, {
        firstName: name,
        email
      })

      // 4. trigger a notification to send email
    await novu.trigger("brokangaccountactivation", 
      to: {
        subscriberId: storename
      },
      payload: {
        companyName = "Brokang",
        confirmationLink
      }
     )

      // 5. send response
  
      res.status(200).json({
        success: true,
        message : `Please go to your email ${email} to activate your account`
      })
    
  }
) 
//brokangaccountactivation

//login user
exports.login = catchAsync(

  async(req, res, next) => {
    const{email, password} = req.body;
  
      // 1. get user from db using email
    const dbUser = await User.findOne({email}).select("+password")
    
    // 2. check if user exist
    if(!dbUser){
      next(new AppError("we don't have a user with that email", 404))
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
        next(new AppError("Password or email is incorrect", 400))
      }
    }
    
    
  }
) 