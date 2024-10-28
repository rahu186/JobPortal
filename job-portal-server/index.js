const express = require('express')
const app = express()
const cors = require('cors')
const port = process.env.PORT || 5000;
require('dotenv').config()
// console.log(process.env.DB_USER)
// console.log(process.env.DB_PASSWORD)  

// middleware
app.use(express.json())
app.use(cors())

app.get('/', (req, res) => {
  res.send('Hello Developer')
})

//user: rahulyadav42j
//password : ocbBQ9B3eD2yZEO4

const { MongoClient, ServerApiVersion, ObjectId } = require('mongodb');
const uri = `mongodb+srv://${process.env.DB_USER}:${process.env.DB_PASSWORD}@careerplusjobportal.30xmi.mongodb.net/?retryWrites=true&w=majority&appName=CareerPlusJobPortal`;

// Create a MongoClient with a MongoClientOptions object to set the Stable API version
const client = new MongoClient(uri, {
  serverApi: {
    version: ServerApiVersion.v1,
    strict: true,
    deprecationErrors: true,
  }
});

async function run() {
  try {
    // Connect the client to the server (optional starting in v4.7)
    await client.connect();

    //create db 
    const db = client.db("mernJobPortal");
    const jobsCollections = db.collection("demoJobs");

    //post a job
    app.post("/post-job", async(req,res) =>{
         const body = req.body;
         body.createAt = new Date();
        //  console.log(body)
        const result = await jobsCollections.insertOne(body);
        if(result.insertedId){
          return res.status(200).send(result);
        }else{
          return res.status(404).send({
            message : "can not insert!  try again later",
            status : false
          })
        }
    })

    //get all jobs
    app.get("/all-jobs", async(req,res) => {
      const jobs = await jobsCollections.find({}).toArray()
      res.send(jobs);
    }
  )
   //get single job using id 
   app.get("/all-jobs/:id", async (req, res) => {
    const id = req.params.id;
    try {
      const job = await jobsCollections.findOne({
        _id: new ObjectId(id)
      });
      if (job) {
        res.send(job);
      } else {
        res.status(404).send({ message: "Job not found" });
      }
    } catch (error) {
      res.status(500).send({ message: "Error retrieving the job", error });
    }
  });
  
    //get jobs by email
    app.get("/myjobs/:email",async(req,res) =>{
      // console.log(req.params.email)
      const jobs = await jobsCollections.find({
        postedBy : req.params.email}).toArray();
        res.send(jobs)
    })

    //delete a job
    app.delete("/job/:id",async(req,res)=>{
      const id = req.params.id;
      const filter = {_id : new ObjectId(id)}
      const result = await jobsCollections.deleteOne(filter);
      res.send(result)
    })

    //Edit/Update the jobs
    app.patch("/update-job/:id", async(req,res)=>{
      const id = req.params.id;
      const jobData = req.body;
      const filter = {_id : new ObjectId(id)};
      const options = {upsert:true};
      const updateDoc = {
        $set : {
              ...jobData
        },
      };
         const result = await jobsCollections.updateOne(filter,updateDoc,options);
         res.send(result)
    })

    // Send a ping to confirm a successful connection
    await client.db("admin").command({ ping: 1 });
    console.log("Pinged your deployment. You successfully connected to MongoDB!");
    
    // Perform database operations here
  } catch (error) {
    console.error('Error connecting to MongoDB:', error);
  } finally {
    // Close the connection if necessary
    // await client.close(); // Uncomment this only if you want to close after one operation
  }
}
  //Game Start Page 
app.get('/games/:gameName', (req, res) => {
  const { gameName } = req.params;
  const gamesData = [
    { title: 'Flames', description: 'A fun relationship game for friends.' },
    { title: 'Truth & Dare', description: 'A classic game to reveal secrets or take on dares.' }
  ];
  const game = gamesData.find(
    (g) => g.title.toLowerCase().replace(/\s+/g, '-') === gameName
  );
  if (game) {
    res.json(game); // Return the game data as JSON
  } else {
    res.status(404).json({ error: 'Game not found' }); // Return a 404 JSON error if not found
  }
});

run().catch(console.dir);

app.listen(port, () => {
  console.log(`Example app listening on port ${port}`)
})
