// Challenge / Exercise

// 1. Add five new (dummy) page components (content can be simple <h1> elements)
//    - HomePage
//    - EventsPage
//    - EventDetailPage
//    - NewEventPage
//    - EditEventPage
//done..
// 2. Add routing & route definitions for these five pages
//    - / => HomePage
//    - /events => EventsPage
//    - /events/<some-id> => EventDetailPage
//    - /events/new => NewEventPage
//    - /events/<some-id>/edit => EditEventPage
//done..
// 3. Add a root layout that adds the <MainNavigation> component above all page components
// 4. Add properly working links to the MainNavigation
// 5. Ensure that the links in MainNavigation receive an "active" class when active
//done..
// 6. Output a list of dummy events to the EventsPage
//    Every list item should include a link to the respective EventDetailPage
// 7. Output the ID of the selected event on the EventDetailPage
// BONUS: Add another (nested) layout route that adds the <EventNavigation> component above all /events... page components

// import { createBrowserRouter, RouterProvider } from "react-router-dom";
// import HomePage from "./page/HomePage";
// import EventsPage, { loader as eventsloader } from "./page/EventPage";
// import EventDetailPage, {
//   loader as eventDetailLoader,
//   action as deleteEvent,
// } from "./page/EventDetailPage";
// import NewEventPage from "./page/NewEventPage";
// import EditEventPage from "./page/EditEventPage";
// import Root from "./page/Root";
// import EventRoot from "./page/EventsRoot";
// import ErrorPage from "./page/Error";
// import { action as manipulateAction } from "./components/EventForm";

// const router = createBrowserRouter([
//   {
//     path: "/",
//     element: <Root />,
//     errorElement: <ErrorPage />,
//     children: [
//       {
//         index: true,
//         element: <HomePage />,
//       },
//       {
//         path: "events",
//         element: <EventRoot />,
//         children: [
//           {
//             index: true,
//             element: <EventsPage />,
//             //loader is used to fetch the data from API and useLoaderData is then used to load that event..
//             loader: eventsloader,
//           },
//           {
//             path: ":id",
//             id: "event-detail",
//             loader: eventDetailLoader,
//             children: [
//               {
//                 index: true,
//                 element: <EventDetailPage />,
//                 action: deleteEvent,
//               },
//               {
//                 path: "edit",
//                 element: <EditEventPage />,
//                 action: manipulateAction,
//               },
//             ],
//           },

//           {
//             path: "new",
//             element: <NewEventPage />,
//             action: manipulateAction,
//           },
//         ],
//       },
//     ],
//   },
// ]);

// function App() {
//   return <RouterProvider router={router} />;
// }

// export default App;

import { RouterProvider, createBrowserRouter } from "react-router-dom";

import EditEventPage from "./page/EditEventPage";
import ErrorPage from "./page/Error";
import EventDetailPage, {
  loader as eventDetailLoader,
  action as deleteEventAction,
} from "./page/EventDetailPage";
import EventsPage, { loader as eventsLoader } from "./page/EventPage";
import EventsRootLayout from "./page/EventsRoot";
import HomePage from "./page/HomePage";
import NewEventPage from "./page/NewEventPage";
import RootLayout from "./page/Root";
import { action as manipulateEventAction } from "./components/EventForm";
import NewsletterPage, { action as newsletterAction } from "./page/Newsletter";

const router = createBrowserRouter([
  {
    path: "/",
    element: <RootLayout />,
    errorElement: <ErrorPage />,
    children: [
      { index: true, element: <HomePage /> },
      {
        path: "events",
        element: <EventsRootLayout />,
        children: [
          {
            index: true,
            element: <EventsPage />,
            loader: eventsLoader,
          },
          {
            path: ":id",
            id: "event-detail",
            loader: eventDetailLoader,
            children: [
              {
                index: true,
                element: <EventDetailPage />,
                action: deleteEventAction,
              },
              {
                path: "edit",
                element: <EditEventPage />,
                action: manipulateEventAction,
              },
            ],
          },
          {
            path: "new",
            element: <NewEventPage />,
            action: manipulateEventAction,
          },
        ],
      },
      {
        path: "newsletter",
        element: <NewsletterPage />,
        action: newsletterAction,
      },
    ],
  },
]);

function App() {
  return <RouterProvider router={router} />;
}

export default App;
