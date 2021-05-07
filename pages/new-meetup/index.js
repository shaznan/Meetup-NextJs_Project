import NewMeetupForm from "../../components/meetups/NewMeetupForm";
import axios from "axios";
import { Fragment } from "react";
// import Head from "next/head";

function NewMeetupPage() {
  function addMeetupHandler(enteredMeetupData) {
    // *axios http request
    axios
      .post("/api/newmeetup", enteredMeetupData) //entered meetup is an incoming object
      .then((res) => {
        console.log(res);
      })
      .catch((err) => {
        console.log(err);
      });

    // *Normal Fetch Request
    // const response = await fetch("/api/newmeetup", {
    //   method: "POST",
    //   body: JSON.stringify(enteredMeetupData),
    //   headers: {
    //     "Content-Type": "application/json",
    //   },
    // });
    // const data = await response;

    // console.log(data);
  }

  //returning jsx and adding metaData
  return (
    <Fragment>
      {/* <Head>
        <title>Add a new Meetup</title>
        <meta name="description" content="Add a new meetup and create " />
      </Head> */}
      <NewMeetupForm onAddMeetup={addMeetupHandler} />;
    </Fragment>
  );
}

export default NewMeetupPage;
