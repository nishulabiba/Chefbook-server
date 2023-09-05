const express = require('express');
const cors = require("cors")
const app = express();
const port = process.env.PORT || 5000;

app.use(cors())

const chefData = require("./data/chefData.json")

app.get('/', (req, res)=>{

    res.send("This site is running")

})

app.get("/chefdetails", (req, res)=>{
    res.send(chefData)
} )

app.get("/chefdetails/:id", (req, res)=>{
    const details = chefData.find(data=> data.id === req.params.id)

    res.send(details)
})

app.listen(port, ()=>{
    console.log(`chefData api running on port ${port}`);
})