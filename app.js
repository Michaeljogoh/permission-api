const express = require('express');
const app = express();
require('dotenv').config();
const cors = require('cors');
const blogRoutes = require('./routes/blogRoutes');
const mongoose = require('mongoose');
const errorHandler = require('./middleware/errorHandler');


//DB
mongoose.connect(process.env.blog_DB , {useNewUrlParser: true , useUnifiedTopology: true})
.then(() => console.log('MongoDB'))
.catch(err => console.log(err));


// cross origin
app.use(cors());
// bodyparser
app.use(express.json());

// Routes
app.use(blogRoutes)

app.use(errorHandler)


const PORT = process.env.PORT;
app.listen(PORT , ()=>{
    console.log(`Server started at ${PORT}`)
});
