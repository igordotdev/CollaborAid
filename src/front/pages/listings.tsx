import React, { useState, useEffect } from "react";
import { UserLegal } from "../../back/types.ts";
import { CompanyListItem } from "../components/CompanyListItem.tsx";
import { useNavigate, Link } from "react-router-dom";
import Profile from "./profile.tsx";

function convertToCSV(data: any[]): string {
  if (!data.length) return '';

  // Extract column headers
  const headers = Object.keys(data[0]);

  // Map rows to CSV string
  const rows = data.map(row =>
    headers.map(header => `"${row[header]}"`).join(',')
  );

  // Join headers and rows with line breaks
  return [headers.join(','), ...rows].join('\n');
}

function DownloadCSVButton(csvData: string) {
    // Create a temporary link to trigger download
    const blob = new Blob([csvData], { type: 'text/csv' });
    const url = window.URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = 'listings.csv';
    document.body.appendChild(a);
    a.click();
    a.remove();
    window.URL.revokeObjectURL(url);
  };


const Listings = () => {
  const [page, setPage] = useState(1);

  const handleNextPage = () => {
    setPage((prevPage) =>
      prevPage < Math.ceil(users.length / 10)
        ? prevPage + 1
        : Math.ceil(users.length / 10)
    );
  };

  const handlePreviousPage = () => {
    setPage((prevPage) => (prevPage > 1 ? prevPage - 1 : 1));
  };

  const fetchUsers = async () => {
    const response = await fetch("http://localhost:3000/api/legalEntities");
    const data = await response.json();
    setUsers(data);
  };

  const [users, setUsers] = useState<UserLegal[]>([]);
  useEffect(() => {
    fetchUsers();
  }, []);

  const sortedUsers = users.sort((a, b) => b.compatibility - a.compatibility);

  return (
    <>
      <h1 className="lex text-center font-medium text-3xl pt-10 pb-24">
        Find your next collaboration
      </h1>
      <div className="flex flex-row w-[80%] ml-0">
        <ul className="w-full">
          {sortedUsers.length > 0 ? (
            sortedUsers.slice((page - 1) * 10, page * 10).map((user) => (
              <li key={user.REGON} className="mb-2">
                <Link to={`/profile/${user.REGON}`}>
                  <CompanyListItem
                    compatibility={user.compatibility}
                    location={user.address}
                    title={user.name}
                    description={user.mainValuesAndObjectives}
                    date={user.dateOfStart}
                    styling={"ml-[20%] flex text-left"}
                  />
                </Link>
              </li>
            ))
          ) : (
            <h2 className="text-2xl font-semibold text-red-700">
              No listings available.
            </h2>
          )}
        </ul>
      </div>
      {sortedUsers.length > 0 && (
        <div className="flex justify-center mr-14">
          <button
            onClick={handlePreviousPage}
            className="bg-red-700 hover:bg-red-900 text-white font-bold py-2 px-4 rounded"
          >
            Previous
          </button>
          <button
            onClick={() => DownloadCSVButton(convertToCSV(sortedUsers))}
            className="bg-red-700 hover:bg-red-900 text-white font-bold py-2 px-4 rounded"
          >
            Export to CSV
          </button>
          <p className="w-[53%]"></p>
          <button
            onClick={handleNextPage}
            className="bg-red-700 hover:bg-red-900 text-white font-bold py-2 px-4 rounded"
          >
            Next
          </button>
        </div>
      )}
    </>
  );
};

export default Listings;
