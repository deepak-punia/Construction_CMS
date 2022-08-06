const express = require("express");
const app = express();
const connectDB = require('./config/db')

const PORT = process.env.PORT || 5000;

//connection to database
connectDB();

app.get('/', (req,res)=>{
    res.send('Working');
});

app.listen(PORT, () => {
	console.log(`Server is running at port : ${PORT}`);
});