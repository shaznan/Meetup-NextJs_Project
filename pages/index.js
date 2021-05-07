import React, { Fragment } from "react";
import MeetupList from "../components/meetups/MeetupList";
import { MongoClient } from "mongodb"; //to import data from server
// import Head from "next/head";

function HomePage(props) {
  //usestate([])
  //useEffect(()=>{})

  //returning jsx and adding metadata
  return (
    <Fragment>
      {/* <Head>
        <title>React Meetups in Sri Lanka</title>
        <meta name="description" content="Browse Huge List of Meetup places in Sri Lanka" />
      </Head> */}
      <MeetupList meetups={props.meetups} />
    </Fragment>
  );
}

export async function getStaticProps() {
  // server side pre-rendering code
  // fetch data from an API
  const client = await MongoClient.connect(
    "mongodb+srv://new-user_786:786786@cluster0.s24uu.mongodb.net/myFirstDatabase?retryWrites=true&w=majority"
  ); //simply connecting to the database
  const db = client.db(); //generating a database
  const meetupsCollection = db.collection("meetup"); //creating a database collection of documents
  const meetups = await meetupsCollection.find().toArray();
  client.close();

  // let meetups = [];

  return {
    //has to be an object
    props: {
      // meetups: DUMMY_MEETUPS, //data that u fetch from API
      meetups: meetups.map((meetup) => ({
        id: meetup._id.toString(), //in mongodb the id is a special kind of object so we convert it to a regular string
        title: meetup.title,
        address: meetup.address,
        image: meetup.image,
      })),
    },
    revalidate: 1,
  };
}

export default HomePage;
