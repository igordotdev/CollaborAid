import { EventItem } from "../components/EventItem.tsx";

const Events = () => {
  return (
    <>
      <div>
        <h1 className={"text-6xl font-bold ml-28 mb-16 mt-14"}>Events</h1>
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
