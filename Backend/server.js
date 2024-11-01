const express = require("express");
const cors = require("cors");
const { MongoClient } = require("mongodb");
const dotenv = require("dotenv");
const bodyParser = require("body-parser");

//reading env file
dotenv.config();

//express and middlewares
const app = express();
const port = 3000;
app.use(bodyParser.json());
app.use(cors());

//database management
const client = new MongoClient(process.env.MONGO_URI);
const dbName = "PassPass";
client.connect();
console.log("server connected");

// get all the passwords
app.get("/", async (req, res) => {
  const db = client.db(dbName);
  const collection = db.collection("passwords");
  const findResult = await collection.find({}).toArray();
  res.json(findResult);
});

// save a password
app.post("/", async (req, res) => {
  const data = req.body;
  const db = client.db(dbName);
  const collection = db.collection("passwords");
  const findResult = await collection.insertOne(data);
  res.send({ success: true, result: findResult });
});

// delete a password
app.delete('/', async (req, res) => { 
  const password = req.body
  const db = client.db(dbName);
  const collection = db.collection('passwords');
  const findResult = await collection.deleteOne(password);
  res.send({success: true, result: findResult})
})




app.listen(port, () => {
  console.log(`Example app listening on port ${port}`);
});
