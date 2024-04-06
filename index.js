const express = require('express') 
const app = express() 
const port = process.env.PORT || 3000; 

//to solve ObjectId is not defined
const { ObjectId } = require('mongodb');
 

app.use(express.json()) 

//registration new user
app.post('/user', async(req, res) => {
  try{
  await client. connect();
//app.post('/user', (req, res) => {
  //insertOne
  //console.log('create user profile')
  //console.log(req)
  //console.log(req.body)//to get the data of body from postman
  let result = await client .db("benr_2423").collection("new").insertOne(
    //await must with async
    {
      name: req.body.name,
      email: req.body.email,
      password: req.body.password,
    });
    res.json(result);
    console.log(result);
}catch(err){
  console.log(err);
} finally { 
  await client.close();
}
});




//get user profile
//:username is a parameter that can be anything that user key in
//可以有多个parameter
app.get('/user/:username/:email/:password', async(req, res) => {
  //findOne
  console.log('get user profile')
  //console.log(req.params)//to get the data of body from postman
  //console.log(req.params.username.email)//to get the data of body from postman
  let result =await client.db("benr_2423").collection("new").findOne(
    {
      name: req.params.username,
      email: req.params.email,
      password: req.params.password,

    }
  )
  res.send(result)
})
//app.get('/user', (req, res) => {})
//cannot use 2 get method with same end point, it will crash

/*
//update user profile
app.patch('/user', (req, res) => {
  //UpdateOne
  console.log('update user profile')
})

//delete user profile
app.delete('/user', (req, res) => {
  //DeleteOne
  console.log('delete user profile')

})

*/

//define get method
//end point is '/'
//req is request
//res is response
/*
app.get('/', (req, res) => { 

   res.send('Hello World!') 

}) 
*/
 
//start server by listening to port
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
    await client.db("admin").command({ ping: 1 });
    console.log("Pinged your deployment. You successfully connected to MongoDB!");

    //insert document to database
    /*let result= await client.db("benr_2423").collection("new").insertOne({
      name: "Teeshi",
      email: "Teeshi@gmail",
      password: "1234",
    });
    */

    //find array in database
    //let result= await client.db("benr_2423").collection("new").find().toArray();

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

    //console.log(result)

  } finally {
    // Ensures that the client will close when you finish/error
    await client.close();
  }
}
run().catch(console.dir);
