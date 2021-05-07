import { Fragment } from "react";
import MeetupDetail from "../../components/meetups/MeetupDetail";
import Head from "next/head"; //import head to add meta datac
import { MongoClient, ObjectId } from "mongodb"; //to dynamically render each item page

function MeetupDetails(props) {
  //Main component that will receive the props that were generated in the pre-rendered file
  return (
    <Fragment>
      <Head>
        <title>{props.meetupData.title}</title>
        <meta name="description" content={props.meetupData.description} />
      </Head>
      <MeetupDetail
        image={props.meetupData.image}
        title={props.meetupData.title}
        address={props.meetupData.address}
        description={props.meetupData.description}
      />
    </Fragment>
  );
}

export async function getStaticPaths() {
  const client = await MongoClient.connect(
    "mongodb+srv://new-user_786:786786@cluster0.s24uu.mongodb.net/myFirstDatabase?retryWrites=true&w=majority"
  );
  const db = client.db();

  const meetupsCollection = db.collection("meetup");

  const meetups = await meetupsCollection.find({}, { _id: 1 }).toArray(); //find here is a way to look for queries in a database

  client.close();

  return {
    // fallback: false,
    fallback: "blocking", //it will re-render the paths if new enteries are made,
    //blocking will show content in the new page only after that new component is rendered, true will show parts of the page and wait for the rest of the components to be rendered, where you need to add a loading spinner as well
    paths: meetups.map((meetup) => ({
      //
      params: { meetupId: meetup._id.toString() },
    })),
  };
}

export async function getStaticProps(context) {
  //fetch data for single meetup

  const meetupId = context.params.meetupId; //meetupid is the name given to the dynamic folder, this code will read the params that you set inside the dynamic folder within [].js, can't use hooks in getStaticProps component so cant use useRouter here to read.

  const client = await MongoClient.connect(
    "mongodb+srv://new-user_786:786786@cluster0.s24uu.mongodb.net/myFirstDatabase?retryWrites=true&w=majority"
  );
  const db = client.db(); // accessing the database

  const meetupsCollection = db.collection("meetup"); //name given to ur cluster, check if name is correct always!

  const selectedMeetup = await meetupsCollection.findOne({
    _id: ObjectId(meetupId), // this changes the ip to an object string which can be compared by the object string provided in the server
  });
  //findOne finds a key value pair from your database document, in this case we need to find the ID that was pushed to the url on click of the button

  client.close(); // once all are done, close the connection

  return {
    //returns fetch data to be sent back to the component
    props: {
      meetupData: {
        id: selectedMeetup._id.toString(), // converting the object string back to a normal string
        title: selectedMeetup.title,
        address: selectedMeetup.address,
        image: selectedMeetup.image,
        description: selectedMeetup.description,
      },
    },
  };
}

export default MeetupDetails;

//bug fixes: internal server error: make sure you have stored variables using const, check name with cluster name given in server, if nothing works, try deleting old ip from mongo and create new until works

//mainly check for typos!
