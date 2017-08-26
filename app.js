var express  = require('express'),
    mongoose = require('mongoose'),
    bodyparser = require('body-parser'),
    cors = require('cors'),
    path = require('path');

var routes =  require('./routes/routes');

var app = express();

// Defining Port 
const port = 3000;

// Connect to mongoDB
mongoose.connect("mongodb://localhost:27017/contactlist");
// on connection
mongoose.connection.on('connected',()=>{
    console.log("connected to mongoDb at 27017..");
});
mongoose.connection.on('error',(err)=>{
    if(err) 
        console.log("Error in connecting to database: "+ err);
   
});

// Adding  Middleware
app.use(cors());
app.use(bodyparser.json());


// Static files
app.use(express.static(path.join(__dirname,'public')));
app.use('/api', routes)



app.get('/',(req,res)=>{
    res.send('Root Page of server');

})




app.listen(port, ()=>{
    console.log('server is running at port: '+ port);
})