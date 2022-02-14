const express = require("express");
const bodyParser = require("body-parser");
const multer = require ("multer");
const path = require('path');
const app = express();
const nodemailer = require('nodemailer');
const { stringify } = require("querystring");

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
    console.log(`Our app is running on port ${ PORT }`);
});

app.use(express.static('public'))
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

var upload = multer({dest: './public/uploads/'});

app.get("/", (req, res) => {
  res.sendFile(__dirname + "/index.html");
});

let mailTransporter = nodemailer.createTransport({
  service: 'gmail',
  auth: {
      user: 'advaitrajsirga@gmail.com',
      pass: 'chessplayer@2011'
  }
});


app.post('/send', upload.single('myFile'), (req, res) => {
var subName = req.body.username
var print = req.body
console.log(print)



let mailDetails = {
  from: 'advaitrajsirga@gmail.com',
  to: 'advaitrajsirga@gmail.com',
  subject: 'Attendance',
    text: "Details:" + " " + JSON.stringify(print),
    attachments: [{'filename': req.file.originalname,
    path: req.file.path
}]
}
    
  

mailTransporter.sendMail(mailDetails, function(err, data) {
  if(err) {
      console.log('Error Occurs');
  } else {
      console.log('Email sent successfully');
  }
});

res.send("Hello " + subName + ", Thank you for the attendance")
});
