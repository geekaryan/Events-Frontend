import { useLoaderData, json, defer, Await } from "react-router-dom";
//useLoaderData is used to load data from the most close api..

import { Suspense } from "react";

import EventsList from "../components/EventsList";

const EventPage = () => {
  const { events } = useLoaderData();
  //console.log(data);

  // if (data.isError) {
  //   return <p>{data.message}</p>;
  // }
  //const events = data.events;
  // return (
  //   <>
  //     <EventsList events={events} />
  //   </>
  // );

  return (
    <Suspense fallback={<p style={{ textAlign: "center" }}>Loading..</p>}>
      <Await resolve={events}>
        {(loadedEvents) => <EventsList events={loadedEvents} />}
      </Await>
    </Suspense>
  );
};

export default EventPage;

async function loadEvents() {
  const response = await fetch("http://localhost:8080/events");

  if (!response.ok) {
    // return { isError: true, message: "Could not fetch events" };
    // throw { message: "Could not fetch events" };
    //we want to throw responses because it contains a status which then we can
    //manually handle to get the error of our own... we are going to stringify here..
    // throw new Response(
    //   JSON.stringify({ message: "Could not fetch events.." }),
    //   { status: 500 }
    // );

    //=> using json;
    throw json(
      { message: "Could not fetch events" },
      {
        status: 500,
      }
    );
  } else {
    //==> we can directly return response.
    //return response;

    const resData = await response.json();
    return resData.events;

    // const resData = await response.json();
    // //browser support response constructor and response object...
    // const res = new Response();
    // return resData.events;
  }
}

//making a simple api request by making a loader function which we can use in the loader..
export const loader = () => {
  return defer({
    events: loadEvents(),
  });
};
