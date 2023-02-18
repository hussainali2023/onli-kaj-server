const express = require("express");
const cors = require("cors");
require("dotenv").config();
const { MongoClient, ServerApiVersion, ObjectId } = require("mongodb");

const port = process.env.PORT || 5000;

const app = express();

app.use(cors());
app.use(express.json());

const uri = `mongodb+srv://${process.env.DB_USER}:${process.env.DB_PASSWORD}@cluster0.xgu9cba.mongodb.net/?retryWrites=true&w=majority`;
console.log(uri);
const client = new MongoClient(uri, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
  serverApi: ServerApiVersion.v1,
});

async function run() {
  try {
    const fresherJobCollection = client.db("onliKaj").collection("fresherJob");

    app.get("/fresher", async (req, res) => {
      const query = {};
      const jobs = await fresherJobCollection.find(query).toArray();
      res.send(jobs);
    });
  } catch (data) {
    console.log(data);
  }
}
run().catch((error) => console.log(error));

app.get("/", async (req, res) => {
  res.send("Server is Running");
});

app.listen(port, () => {
  console.log(`Onli-Kaj is running on port: ${port}`);
});
