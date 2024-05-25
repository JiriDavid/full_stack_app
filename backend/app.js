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
const subscriptionRoute = require("./routes/subscriptionRoutes")
const orderRouter = require("./routes/orderRoutes")
const reviewRouter = require("./routes/reviewRoutes")
const likeRouter = require("./routes/likeRoutes")
const conversationRouter = require("./routes/conversationRoutes")
const messageRouter = require("./routes/messageRoutes")
const paymentRouter = require("./routes/paymentRoutes")


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
app.use("/api/v1/subscription", subscriptionRoute)
app.use("/api/v1/order", orderRouter)
app.use("/api/v1/review",reviewRouter)
app.use("/api/v1/like",likeRouter)
app.use("/api/v1/conversation",conversationRouter)
app.use("/api/v1/message", messageRouter)
app.use("/api/v1/payment", paymentRouter)

app.all("*", (req, res, next) => {
  next(
    new AppError(`The route you are trying to access is not defined ${req.originalUrl}`, 400)
  )
})

app.use(GlobalErrorHandler)

module.exports = app;