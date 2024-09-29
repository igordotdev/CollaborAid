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
          <EventItem />
          <EventItem />
          <EventItem />
        </div>
      </div>
    </>
  );
};

export default Events;
