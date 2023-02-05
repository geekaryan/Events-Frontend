//import { json, redirect } from "react-router-dom";
import EventForm from "../components/EventForm";

const NewEventPage = () => {
  return <EventForm method="post" />;
};

export default NewEventPage;

// export async function action({ request, params }) {
//   //in request we are going to add formData so that basically we get the acces to the formData give by react router..
//   const data = await request.formData();

//   //use get we get the data ..
//   const eventData = {
//     title: data.get("title"),
//     image: data.get("image"),
//     date: data.get("date"),
//     description: data.get("description"),
//   };
//   const response = await fetch("http://localhost:8080/events", {
//     method: "POST",
//     headers: {
//       "Content-Type": "application/json",
//     },
//     body: JSON.stringify(eventData),
//   });

//   //console.log(response);

//   if (response.status === 422) {
//     return response;
//   }

//   if (!response.ok) {
//     throw json(
//       {
//         message: "Could not save event",
//       },
//       {
//         status: 500,
//       }
//     );
//   }

//   return redirect("/events");
// }
