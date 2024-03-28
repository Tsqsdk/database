const express = require('express') 

const app = express() 

const port = process.env.PORT || 3000; 

//to solve ObjectId is not defined
const { ObjectId } = require('mongodb');
 

app.use(express.json()) 

 

app.get('/', (req, res) => { 

   res.send('Hello World!') 

}) 

 

app.listen(port, () => { 

   console.log(`Example app listening on port ${port}`) 

}) 

const { MongoClient, ServerApiVersion } = require('mongodb');
const uri = "mongodb+srv://teeshihqun:tsq020213@cluster0.ndrkgnf.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0";

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
    // Connect the client to the server	(optional starting in v4.7)
    //await client----
    await client.connect();
    console.log("Connected correctly to server");

    // Send a ping to confirm a successful connection
    //await client.db("admin").command({ ping: 1 });
    //console.log("Pinged your deployment. You successfully connected to MongoDB!");

    //insert document to database
    /*let result= await client.db("benr_2423").collection("new").insertOne({
      name: "Teeshi",
      email: "Teeshi@gmail",
      password: "1234",
    });
    */

    //find array in database
    let result= await client.db("benr_2423").collection("new").find().toArray();

    //find specific array in database
    /*let result= await client.db("benr_2423").collection("new").find(
      {
        name: "john",
        email: "john@gmail",
      }).toArray();
    */

    //update array in database
    /*let result= await client.db("benr_2423").collection("new").updateOne(
       { _id: new ObjectId("660515b855e76ed1b754d70a")},
       { $set: { name: "Te"}}
    );
    */

    //detele array in database
    /*let result= await client.db("benr_2423").collection("new").deleteOne(
      { _id: new ObjectId("660526c57766631a61725552")},
    );
    */

    console.log(result)

  } finally {
    // Ensures that the client will close when you finish/error
    await client.close();
  }
}
run().catch(console.dir);
