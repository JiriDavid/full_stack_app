const express = require("express")
const dotenv = require("dotenv")
const bodyParser = require("body-parser")
const cookieParser = require("cookie-parser")
const cors = require("cors")
const AppError = require("./utils/AppError")
const GlobalErrorHandler = require("./controller/errorController")

const userRouter =  require("./routes/userRoutes")
const productRouter = require("./routes/productRoutes")
const followRouter = require("./routes/followerRoutes")


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
app.use("/api/v1/product", productRouter)
app.use("/api/v1/follow", followRouter)

app.all("*", (req, res, next) => {
  next(
    new AppError(`The route you are trying to access is not defined ${req.originalUrl}`, 400)
  )
})

app.use(GlobalErrorHandler)

module.exports = app;