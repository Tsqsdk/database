const express = require('express') 
const app = express() 
const port = process.env.PORT || 3000; 
const jwt = require('jsonwebtoken');

//to solve bcrypt is not defined
const bcrypt = require('bcrypt');

//to solve ObjectId is not defined
const { ObjectId } = require('mongodb');
 

app.use(express.json()) 


//registration new user at client side
//post user without checking the existing of user
app.post('/user', async(req, res) => {
    const hash = bcrypt.hashSync(req.body.password, 10);
    // Store hash in your password DB.
    //app.post('/user', (req, res) => {
    //insertOne
    //console.log('create user profile')
    //console.log(req)
    //console.log(req.body)//to get the data of body from postman
    let result = await client.db("benr_2423").collection("new").insertOne(
      //await must with async
      {
        name: req.body.name,
        email: req.body.email,
        password: hash,
      });
    res.json(result);
    console.log(result);
  } 
);

//login user with (/...)endpoint at client side
//sometime, login using gmail and password, but sometimes, login using username and password
app.post('/login', async(req, res) => {
    //check email or username if exist--client.db("benr_2423").collection("new").findOne
    let result = await client.db("benr_2423").collection("new").findOne(
      {
        //1. check the existing of username by using findOne
        name: req.body.name
        //email: req.body.email,
      });
      console.log(result);
    if(!result){
      res.send('Username not found')
    }else{
      //2. check password--bcrypt.compare
      if(bcrypt.compareSync(req.body.password, result.password)==true){
        var token = jwt.sign({ 
          _id: result._id,
          name: result.name 
        }, 'mysupersecretpasskey',{expiresIn: 10*60});
        res.send(token)
        //res.send('Login success')
      }else{
        res.send('Login failed')
      }
    }
  } 
); 
  
/*
app.get('/user/:name/:gmail', async(req, res) => {
  console.log(req.params)
})
*/

//get user profile
//:username is a parameter that can be anything that user key in
//可以有多个parameter
//app.get('/user/:username/:email/:password', async(req, res) => {
app.get('/user/:namee/:id', async(req, res) => {
  //findOne
  //console.log('get user profile')
  //console.log(req.params)//to get the data of body from postman
  //console.log(req.params.username.email)//to get the data of body from postman
  let result =await client.db("benr_2423").collection("new").findOne(
    {
      name: req.params.namee,
      //email: req.params.email,
      //password: req.params.password,
      _id: new ObjectId(req.params.id),
    }
  )
  res.json(result);
  console.log(result);
})
//app.get('/user', (req, res) => {})
//cannot use 2 get method with same end point, it will crash



//update user profile
//如果别人知道id，就可以update别人的资料（这是一个问题）
app.patch('/user/:id', async (req, res) => {
  let result = await client.db("benr_2423").collection("new").updateOne(
    {
      _id: new ObjectId(req.params.id),
    },
    {
      $set: {
        email: req.body.email,
      },
    });
  console.log(result);
  res.json(result);
})  

//delete user profile
app.delete('/user/:id', async (req, res) => {
  let result = await client.db("benr_2423").collection("new").deleteOne(
    {
      _id: new ObjectId(req.params.id),
    });
  console.log(result);
  res.json(result);
})


app.post('/buy', async(req, res) => {
  //console.log(req.headers)
  //console.log(req.headers.authorization.split(' ')[1])
  
  const token = req.headers.authorization.split(' ')[1]

  var decoded = jwt.verify(token, 'mysupersecretpasskey');
  console.log(decoded) //bar
  res.send(token)
})

//define get method
//end point is '/user'
//req is request
//res is response
/*
app.get('/user', (req, res) => { 

   res.send('Hello World!') 

});
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

/*
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
    let result= await client.db("benr_2423").collection("new").insertOne({
      name: "Teeshi",
      email: "Teeshi@gmail",
      password: "1234",
    });
    

    //find array in database
    //let result= await client.db("benr_2423").collection("new").find().toArray();

    //find specific array in database
    let result= await client.db("benr_2423").collection("new").find(
      {
        name: "john",
        email: "john@gmail",
      }).toArray();
    

    //update array in database
    let result= await client.db("benr_2423").collection("new").updateOne(
       { _id: new ObjectId("660515b855e76ed1b754d70a")},
       { $set: { name: "Te"}}
    );
    

    //detele array in database
    let result= await client.db("benr_2423").collection("new").deleteOne(
      { _id: new ObjectId("660526c57766631a61725552")},
    );
    

    //console.log(result)

  } finally {
    // Ensures that the client will close when you finish/error
    await client.close();
  }
}
run().catch(console.dir);
*/