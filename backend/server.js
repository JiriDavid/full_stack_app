const app = require("./app")
const mongoose = require("mongoose")
 
const connectToMongo = () => {
  const cs = process.env.MONGODB_CS
  mongoose.connect(cs, {
    useUnifiedTopology: true,
    useNewUrlParser: true
  }).then((data) =>{
    console.log("successfully connected to mongodb" + data.connection.host)
  }).catch((error) => {
    console.log(error)
  })
}

// handle uncaught exceptions
process.on("uncaughtException", (err) => {
  console.log("error = ", err.message)
  console.log("Shutting down the application now for uncaught exceptions")
})

connectToMongo()
const port = process.env.PORT

const server = app.listen(port, () => {
  console.log("Our app is running on PORT " + port)
} )

process.on("unhandledRejection", (err) => {
  console.log(`${err.name} ${err.message}`)
  //close server
  server.close(()=> {
    //exit node process
    process.exit(1)
  })
})