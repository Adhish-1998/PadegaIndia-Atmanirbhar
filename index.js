const express = require("express");
const mongoose  = require("mongoose");
const route = require("../PadegaIndia-Atmanirbhar/src/Routes/routes");

const app = express();


app.use(express.json());
app.use(express.urlencoded({ extended: true })); 

mongoose.connect("mongodb+srv://anirudhsagar:fgAGHtahZoVNyIR3@cluster0.btvli.mongodb.net/StepOut", {
    useNewUrlParser: true
})
.then( () => console.log("MongoDb is connected"))
.catch ( err => console.log(err) )


app.use('/', route)

app.listen(process.env.PORT || 3000, function () {
    console.log('Express app running on port ' + (process.env.PORT || 3000))
    
});