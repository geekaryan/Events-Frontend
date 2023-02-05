import { Suspense } from "react";
import {
  defer,
  //useParams,
  json,
  Await,
  redirect,
  //useLoaderData,
  useRouteLoaderData,
  //useRouteLoaderData basically is used that in loader data we have some id..
} from "react-router-dom";
import EventItem from "../components/EventItem";
import EventsList from "../components/EventsList";
const EventDetailPage = () => {
  // const params = useParams();
  const { event, events } = useRouteLoaderData("event-detail");
  //console.log(data);
  return (
    <>
      <Suspense fallback={<p style={{ textAlign: "center" }}>Loading...</p>}>
        <Await resolve={event}>
          {(loadedEvent) => <EventItem event={loadedEvent} />}
        </Await>
      </Suspense>
      <Suspense fallback={<p style={{ textAlign: "center" }}>Loading...</p>}>
        <Await resolve={events}>
          {(loadedEvents) => <EventsList events={loadedEvents} />}
        </Await>
      </Suspense>
    </>
  );
};

export default EventDetailPage;

async function loadEvent(id) {
  const response = await fetch("http://localhost:8080/events/" + id);
  if (!response.ok) {
    throw json(
      { message: "Could not fetch details for selected events.." },
      {
        status: 500,
      }
    );
  } else {
    const resData = await response.json();
    return resData.event;
  }
}

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

export async function loader({ request, params }) {
  const id = params.id;
  console.log(id);

  return defer({
    event: await loadEvent(id),
    events: loadEvents(),
  });
}

export const action = async ({ request, params }) => {
  const id = params.id;
  const response = await fetch("http://localhost:8080/events/" + id, {
    method: request.method,
  });

  if (!response.ok) {
    throw json(
      { message: "Could not fetch details for selected events.." },
      {
        status: 500,
      }
    );
  }
  return redirect("/events");
};
