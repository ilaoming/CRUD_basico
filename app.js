const express = require('express');
const bodyParser= require('body-parser');
const cors = require('cors');
const app = express();
const apiPersona = require("./routes/api/persona")
require('./db');


const PORT = 3000;


app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended: true}));
app.use(cors());

app.get('/',(req,res)=>{
    res.json("Hola bienvenido a mi servidor");
});

app.use(apiPersona);



app.listen(PORT,()=>{
    console.log(`¡Server UP! on port: ${PORT}`);
});