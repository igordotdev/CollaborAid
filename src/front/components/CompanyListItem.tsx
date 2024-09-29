import React from "react";

interface CompanyListItemProps {
  title: string;
  location: string;
  date: string;
  description: string;
  styling: string;
}

export const CompanyListItem: React.FC<CompanyListItemProps> = ({
  title,
  location,
  date,
  description,
  styling,
}) => {
  return (
    <div className={styling}>
      <button className={"flex text-left w-full"}>
        <div
          className={
            "bg-gray-50 w-full h-32 rounded-3xl hover:bg-gray-100 active:bg-gray-200 transition duration-300"
          }
        >
          <p className={"text-xl font-semibold mb-1.5 mt-1 ml-3"}>{title}</p>
          <div className={"flex ml-3"}>
            <div className={"flex"}>
              <img
                className={"w-5"}
                src={"./public/assets/location-icon.svg"}
                alt={""}
              />
              <p className={"text-sm font-medium ml-1"}>{location}</p>
            </div>
            <div className={"flex ml-5"}>
              <img
                className={"w-5"}
                src={"./public/assets/calendar-icon.svg"}
                alt={""}
              />
              <p className={"text-sm font-medium ml-1 mr-2"}>{date}</p>
            </div>
          </div>
          <p className={"text-sm text-gray-900 mt-4 ml-3"}>{description}</p>
        </div>
      </button>
    </div>
  );
};
