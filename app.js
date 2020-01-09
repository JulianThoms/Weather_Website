/*jshint esversion: 6 */
/* jshint node: true */

const express = require("express");
const pg = require("pg");
const bodyParser = require("body-parser");
const session = require("express-session");
const fetch = require("node-fetch");
//const nodemailer = require("nodemailer");
//let transporter = nodemailer.createTransport(transport[, defaults]); //only one required


const CON_STRING = process.env.DB_CON_STRING || "postgres://lqkivzqdzcaalr:78e9f45f9f4195a0fa11636e58447dd83ef914c0626af5ef55c12177af0e1c5b@ec2-54-75-235-28.eu-west-1.compute.amazonaws.com:5432/dc0kk7vjlc3fti";
if (CON_STRING == undefined) {
  console.log("Error: Environment variable DB_CON_STRING not set!");
  process.exit(1);
}

pg.defaults.ssl = true;
const dbClient = new pg.Client(CON_STRING);
dbClient.connect();

const urlencodedParser = bodyParser.urlencoded({
  extended: false
});

const PORT = 4000;

const app = express();
const api = "3a8bc35ffd38047c3426323bc05d54e6";
app.use(session({
  secret: "dwai2§dkjwao210dwkalcklxkd3d013ie2kdlkwla4i29keedlkccvoit32011",
  resave: true,
  cookie: {
    maxAge: 3600000
  }, //time in millisecs before cookie expires
  saveUninitialized: false
}));


//allowing CSS
app.use(express.static(__dirname + '/public'));

app.set("views", "views");
app.set("view engine", "pug");


app.get("/", function(req, res) {
  res.render("index");
});

app.post("/weather", urlencodedParser, function(req, res){

  fetch('http://api.openweathermap.org/data/2.5/weather?q='+req.body.searchTerm+'&units=metric&APPID=3a8bc35ffd38047c3426323bc05d54e6')
  .then((response) => {
    return response.json();
  })
  .then((data) => {
    if(data.cod === '404'){
      console.log("Sorry, not found!")
    }
    else{
      let dateObj = new Date(( data.sys.sunrise + data.timezone )  * 1000);
      let utcString = dateObj.toUTCString();
      data.sunrise = utcString.slice(-12, -7);

      let dateObj2 = new Date(( data.sys.sunset + data.timezone )  * 1000);
      let utcString2 = dateObj2.toUTCString();
      data.sunset = utcString2.slice(-12, -7);

      data.main.temp = Math.round(data.main.temp);
      data.main.temp_min = Math.round(data.main.temp_min);
      data.main.temp_max = Math.round(data.main.temp_max);
      
      res.render("searchResults", {
        data
      })
    }
  });
})




//END OF GET/POST

app.listen(PORT, function() {
  console.log(`Shopping App listening on Port ${PORT}`);
});
