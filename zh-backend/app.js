const express = require('express')
const app = express()
const path = require('path')
const bodyParser = require('body-parser')
var cors = require('cors')

const connectDB = require('./db')
const Report = require('./models/report')
const report = require('./models/report')

app.use(bodyParser.json())
app.use(cors())


connectDB()


// app.get('/', function(req, res) {
//     res.sendFile(path.join(__dirname + '/index.html'));
// });


//getting a random coordinate
app.get('/newcoord', (req,res) =>{ 
    const coordinates = getRandomCoordinates()
    
    res.json({
        lat:coordinates.lat,
        lng:coordinates.lng,
    })
})

//saves to db
app.post('/report',(req,res)=>{
    console.log(req.body)
    const isLowCertainty = req.body.certainty < 50 ? 1 : 0

    const report = new Report({
        certainty: req.body.certainty,
        isLowCertainty: isLowCertainty,
        lat: req.body.lat,
        lng: req.body.lng,
        time: Math.floor(Date.now() / 1000)
    })
    report.save().then(
        res.sendStatus(200)
    )
    console.log(req.body)
})


//function for getting a random coordinate
app.get('/report', (req,res)=>{
    console.log(req.query.certainty)
    if(req.query.certainty != undefined){
        console.log("hiitt")
        const isLow = req.query.certainty == "l" ? 1:0
        Report.find({isLowCertainty: isLow}).then(data=>{
            res.json({
                report:data
            })
        })
        return
    } else{
        console.log("hit")
        Report.find().then(data=>{
            res.json({report:data})
        })
    }
    
})


function getRandomCoordinates(){
    const forestCenter = {lat:-18.142587, lng:35.578483}
    console.log('before' + JSON.stringify(forestCenter))
    forestCenter.lat  = getNearValue(forestCenter.lat)
    forestCenter.lng = getNearValue(forestCenter.lng)
    console.log(JSON.stringify(forestCenter))
    return forestCenter
}


function getRandomBoolean(){
    return random_boolean = Math.random() >= 0.5;
}

function getNearValue(coordinate){
    var difference = getRandomDouble()
    translation = getRandomBoolean? difference*-1: difference
    return coordinate + difference
}

function getRandomDouble(){
    return Math.random()/1000
}



app.listen(5009)




