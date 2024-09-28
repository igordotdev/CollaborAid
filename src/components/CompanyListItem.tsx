import React from "react";

interface CompanyListItemProps {
  title: string;
  location: string;
  date: string;
  description: string;
}

export const CompanyListItem: React.FC<CompanyListItemProps> = ({
  title,
  location,
  date,
  description,
}) => {
  return (
    <div className={"bg-gray-200 px-8 py-8 rounded-3xl mx-16 my-14"}>
      <p className={"text-xl text-black font-semibold"}>{title}</p>
      <div className={"flex"}>
        <p className={"mr-14"}>{location}</p>
        <p>{date}</p>
      </div>
      <p className={"text-wrap text-sm text-gray-700"}>{description}</p>
    </div>
  );
};
