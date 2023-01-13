const { json } = require("express");
const express = require("express");
const https= require("https");
const bodyParser= require("body-parser");

const app= express();
app.use(bodyParser.urlencoded({extended:true}));

app.get("/",function(req,res){

    res.sendFile(__dirname+"/index.html")

        });
    
app.post("/",function(req,res){

    const city= req.body.cityName;
    const appid= "323ee47d28660eb2d25b100c531e85c5";
    const url="https://api.openweathermap.org/data/2.5/weather?q="+city+"&appid="+appid+"&units=metric";
    
    https.get(url,function(response){
        response.on("data", function(data){
            const weatherInfo= JSON.parse(data);
            const temp=weatherInfo.main.temp;
            const condition= weatherInfo.weather[0].description;
            res.write("The temperature of "+city+" is "+ temp)
            res.send();
        });
})


})
app.listen(3000, function(){
    console.log("Server running on port:3000");
})