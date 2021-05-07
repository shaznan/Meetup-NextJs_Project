import { Fragment } from "react";
import MeetupDetail from "../../components/meetups/MeetupDetail";
import { MongoClient, ObjectId } from "mongodb"; //to dynamically render each item page

function MeetupDetails(props) {
  //Main component that will receive the props that were generated in the pre-rendered file
  return (
    <Fragment>
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

  const meetups = await meetupsCollection.find({}, { _id: 1 }).toArray();

  client.close();

  return {
    fallback: false,
    paths: meetups.map((meetup) => ({
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
  const db = client.db();

  const meetupsCollection = db.collection("meetup");

  const selectedMeetup = await meetupsCollection.findOne({
    _id: ObjectId(meetupId),
  });
  //findOne finds a key value pair from your database document, in this case we need to find the ID that was pushed to the url on click of the button

  client.close();

  return {
    //returns fetch data to be sent back to the component
    props: {
      meetupData: {
        id: selectedMeetup._id.toString(),
        title: selectedMeetup.title,
        address: selectedMeetup.address,
        image: selectedMeetup.image,
        description: selectedMeetup.description,
      },
    },
  };
}

// export async function getStaticProps(context) {
//   // fetch data for a single meetup

//   const meetupId = context.params.meetupId;

//   const client = await MongoClient.connect(
//     "mongodb+srv://new-user_786:786786@cluster0.s24uu.mongodb.net/myFirstDatabase?retryWrites=true&w=majority"
//   );
//   const db = client.db();

//   const meetupsCollection = db.collection("meetups");

//   const selectedMeetup = await meetupsCollection.findOne({
//     _id: ObjectId(meetupId),
//   });

//   client.close();

//   return {
//     props: {
//       meetupData: {
//         id: selectedMeetup._id.toString(),
//         title: selectedMeetup.title,
//         address: selectedMeetup.address,
//         image: selectedMeetup.image,
//         description: selectedMeetup.description,
//       },
//     },
//   };
// }

export default MeetupDetails;
