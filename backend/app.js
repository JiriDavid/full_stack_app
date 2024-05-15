const express = require("express")
const dotenv = require("dotenv")
const bodyParser = require("body-parser")
const cookieParser = require("cookie-parser")
const cors = require("cors")
const userRouter =  require("./routes/userRoutes")
const AppError = require("./utils/AppError")

dotenv.config();

const app = express();

app.use(cors());
app.use(cookieParser())
app.use(bodyParser.json())
app.use(bodyParser.urlencoded({extended: true, limit: "50mb"}))

app.get("/test", (req, res)=>{
  res.status(200).send("Hello welcome to brokang market")
})
app.use("/api/v1/user", userRouter)

app.all("*", (req, res, next) => {
  next(
    new AppError(`The route you are trying to access is not defined ${req.originalUrl}`, 400)
  )
})

module.exports = app;