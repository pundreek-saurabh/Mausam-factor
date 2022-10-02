const express = require("express");
const app = express();
const https = require("https");
const bodyParser = require("body-parser");//used to look around the body of post request and to fetch data from it 


app.use(bodyParser.urlencoded({extended:true}) );

app.get ("/", (req, res)=>{
    res.sendFile(__dirname+"/index.html");
}); 

app.post("/", (req, res)=>{
    // console.log(req.body.cityName);
    const query = req.body.cityName;
    const apikey = "dde71b4b44fae604023aaee8b98bfaa2";
    const unit = "metric";
    const url = "https://api.openweathermap.org/data/2.5/weather?q="+ query +"&appid="+apikey +"&units="+unit;
    https.get(url,function(response){
        // console.log(res.statusCode);
            response.on("data", (data)=>{
            const weatherData=JSON.parse(data);
            var temp = weatherData.main.temp;
            var description = weatherData.weather[0].description;
            res.write("<p>"+ description +" in "+query +" now</p>");
            res.write("<h1>"+ temp+ " degree celcius is the temprature in "+ query +" now </h1>");
            var icon = weatherData.weather[0].icon;
            var imgurl = "http://openweathermap.org/img/wn/" + icon + "@2x.png" ;
            res.write("<img src="+ imgurl+">");
            res.send();
        })
    });
});



app.listen(3000, function(){
    console.log("pundreek! server is running on port 3000");
});