const express = require('express');
const app = express();
const dotenv = require('dotenv').config();
const cors = require('cors');
const blogRoutes = require('./routes/blogRoutes');



app.use(cors());
app.use(express.json());
app.use(express.urlencoded({extended:true}));

// Routes
app.use(blogRoutes)



const PORT = process.env.PORT
app.listen(PORT , ()=>{
    console.log(`Server started at ${PORT}`)
});
