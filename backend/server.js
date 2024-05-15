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
connectToMongo()
const port = process.env.PORT

app.listen(port, () => {
  console.log("Our app is running on PORT " + port)
} )