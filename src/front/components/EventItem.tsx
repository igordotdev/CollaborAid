export const EventItem = () => {
  return (
    <div
      className={"flex bg-gray-100 rounded-xl w-10/12 mb-6 py-6 items-center"}
    >
      <div className={"text-center"}>
        <p className={"text-red-800 text-4xl font-bold px-10"}>23</p>
        <p className={"text-2xl font-bold"}>Wed</p>
      </div>
      <div className={"w-0.5 h-20 bg-gray-300"}></div>
      <div className={"ml-10"}>
        <p className={"text-3xl font-bold mb-2"}>Gadanie o niczym</p>
        <div className={"flex"}>
          <div
            className={
              "flex mr-5 items-center justify-center text-center content-baseline"
            }
          >
            <img
              src={"/assets/calendar-icon.svg"}
              className={"w-4 mr-1"}
            />
            <p className={"text-sm mt-0.5"}>09:00 - 12:00</p>
          </div>
          <div className={"flex"}>
            <img src={"/assets/location-icon.svg"} className={"w-4"} />
            <p className={"text-sm mt-0.5 mr-1"}>Online</p>
          </div>
        </div>
      </div>
    </div>
  );
};
