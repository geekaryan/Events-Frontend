import { Outlet } from "react-router-dom";
import EventsNavigation from "../components/EventsNavigation";

const EventRoot = () => {
  return (
    <>
      <EventsNavigation />
      <main>
        <Outlet />
      </main>
    </>
  );
};

export default EventRoot;
