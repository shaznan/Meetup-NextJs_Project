import NewMeetupForm from "../../components/meetups/NewMeetupForm";
import axios from "axios";
import {Fragment} from 'react'
import Head from 'next/head'

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

  return(
    <Fragment>
           <Head>
        <Title>React Meetups</Title>
        <meta name="description" content="Browse Huge List of Meetup places in Sri Lanka" />
      </Head>
      <NewMeetupForm onAddMeetup={addMeetupHandler} />);
    </Fragment>
}

export default NewMeetupPage;
