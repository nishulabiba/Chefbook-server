const express = require('express');
const cors = require("cors")
const { MongoClient, ServerApiVersion, ObjectId } = require('mongodb');
require('dotenv').config();

const app = express();
const port = process.env.PORT || 5000;

app.use(cors())
app.use(express.json());

const uri = `mongodb+srv://${process.env.DB_USER}:${process.env.DB_PASS}@cluster0.sy7qwz5.mongodb.net/?retryWrites=true&w=majority`;


// Create a MongoClient with a MongoClientOptions object to set the Stable API version
const client = new MongoClient(uri, {
    serverApi: {
      version: ServerApiVersion.v1,
      strict: true,
      deprecationErrors: true,
    }
  });

const chefData = require("./data/chefData.json")



app.get("/chefdetails", (req, res)=>{
    res.send(chefData)
} )

app.get("/chefdetails/:id", (req, res)=>{
    const details = chefData.find(data=> data.id === req.params.id)

    res.send(details)
})


async function run() {
    try {
      // Connect the client to the server	(optional starting in v4.7)
      await client.connect();
  
       const reviewCollection = client.db("User").collection("reviews")
  
    //   //insert reviews  to db
  
    app.post("/upload", async(req, res)=>{
        const data = req.body;
        console.log(data)
  
        const result = await reviewCollection.insertOne(data)
        res.send(result)
      })
  
      app.get('/reviews', async(req, res)=> {
        const reviews = reviewCollection.find()
        const result = await reviews.toArray()
        res.send(result)
      })
  

  
      
  
  
  
      // Send a ping to confirm a successful connection
      await client.db("admin").command({ ping: 1 });
      console.log("Pinged your deployment. You successfully connected to MongoDB!");
    } finally {
      // Ensures that the client will close when you finish/error
      //  await client.close();
    }
  }
  run().catch(console.dir);
app.get('/', (req, res)=>{

    res.send("This site is running")

})

app.listen(port, ()=>{
    console.log(`chefData api running on port ${port}`);
})