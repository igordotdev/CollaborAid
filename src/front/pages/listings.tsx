import React, { useState, useEffect } from "react";
import { UserLegal } from "../../back/types.ts";
import { CompanyListItem } from "../components/CompanyListItem.tsx";

const Listings = () => {
	const [page, setPage] = useState(1);

	const handleNextPage = () => {
		setPage((prevPage) => prevPage + 1);
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
	return (
		<>
		<h1 className="lex text-center font-medium text-3xl pt-10 pb-24"> Find your next collaboration</h1>
		<div className="flex flex-row w-[80%] ml-0">
		<ul className="w-full">
        {users.slice(page-1,10+page-1).map((user) => (
          <li className="mb-2">
            <CompanyListItem location={user.address} title={user.name} description={user.mainValuesAndObjectives} date={user.dateOfStart} styling={"ml-[20%] flex text-left"} />
          </li>
        ))}
      </ul>
		</div>
		<div className="flex justify-center">
			<button onClick={handlePreviousPage} className="bg-red-700 hover:bg-red-900 text-white font-bold py-2 px-4 rounded-l">
				Previous
			</button>
			<button onClick={handleNextPage} className="bg-red-700 hover:bg-red-900 text-white font-bold py-2 px-4 rounded-r">
				Next
			</button>
		</div>
		</>
	);
};

export default Listings;