const express = require("express");
const app = express();
const { MongoClient, ServerApiVersion } = require("mongodb");
const cors = require("cors");
const res = require("express/lib/response");
require("dotenv").config();
const port = process.env.PORT || 5000;
app.use(cors());
app.use(express.json());

// MONGODB CONNECT
const uri = `mongodb+srv://${process.env.DB_USER}:${process.env.DB_PASS}@cluster0.h8cst.mongodb.net/myFirstDatabase?retryWrites=true&w=majority`;
// const client = new MongoClient(uri, { useNewUrlParser: true, useUnifiedTopology: true, serverApi: ServerApiVersion.v1 });
const client = new MongoClient(uri);
console.log(uri);
async function run() {
  try {
    await client.connect();
    console.log(`db connected`);
    const serviceCollection = client.db("doctors_portal").collection("services");
    app.get("/service", async (req, res) => {
      const query = {};
      const cursor = serviceCollection.find(query);
      const result = await cursor.toArray();
      res.send(result);
      // console.log(result);
    });
  } finally {
    // client.close();
  }
}
run().catch(console.dir);
app.get("/", (req, res) => {
  res.send("Hello Heroku!! heoku");
});
app.listen(port, () => console.log(`listening at http://localhost:${port}`));
