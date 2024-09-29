import { EventItem } from "../components/EventItem.tsx";

const Events = () => {
  return (
    <>
      <div>
        <h1 className={"text-6xl font-bold ml-28 mb-6 mt-14"}>Events</h1>
        <h2 className={"text-3xl font-bold ml-28 mb-4"}>September</h2>
        <div
          className={"justify-center text-center items-center flex flex-col"}
        >
          <EventItem day="23" dotw="Sun" title="Kraków Charity Conference" hours="12:00 - 20:00" location="Tauron Arena Kraków"/>
          <EventItem day="17" dotw="Sat" title="Warsaw for Charity" hours="All day" location="National Stadium Warszawa"/>
          <EventItem day="10" dotw="Wed" title="Kraków Charity Event" hours="All day" location="Main Square"/>
        </div>
      </div>
    </>
  );
};

export default Events;
