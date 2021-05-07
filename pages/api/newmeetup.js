// /api/new-meetup
// api folder should be inside the pages folder
// it is basically a backend data API end point to handle http requests
// the backend is who communicate with the server
//!This is for posting data to the database

import { MongoClient } from "mongodb";

async function handler(req, res) {
  if (req.method === "POST") {
    const data = req.body; //this is the object that comes in from the front end post http request

    const client = await MongoClient.connect(
      "mongodb+srv://new-user_786:786786@cluster0.s24uu.mongodb.net/myFirstDatabase?retryWrites=true&w=majority"
    ); //simply connecting to the database

    const db = client.db(); //generating a database

    const meetupsCollection = db.collection("meetup"); //creating a database collection of documents

    const result = await meetupsCollection.insertOne(data); //inserting a document query to the database, which is an object basically
    console.log(result);

    client.close(); //closing connection with the backend

    res.status(201).json({ message: "Meetup inserted!" }); //response if the process was successful
  }
}

export default handler;
