import React, { useState, useEffect } from "react";
import { User } from "../../back/types.ts";

const Listings = () => {

	const fetchUsers = async () => {
		const response = await fetch("http://localhost:3000/api/legalEntities");
		const data = await response.json();
		setUsers(data);
	};

	const [users, setUsers] = useState<User[]>([]);

	return (
		<>
		<h1 className="lex text-center font-medium text-3xl pt-10 pb-24"> Find your next collaboration</h1>
		<div className="flex flex-row">
		<ul>
        {users.map((user) => (
          <li key={user.id}>
            {user.firstName}, {user.lastName}, Age: {user.age}, Email:{" "}
            {user.email}, City: {user.city}
          </li>
        ))}
      </ul>
		</div>
		</>
	);
};

export default Listings;