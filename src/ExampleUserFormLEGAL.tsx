// src/App.tsx
import "./App.css";
import "./index.css";
import React, { useState, useEffect } from "react";
import { User } from "./back/types.ts";


//NIP, REGON, name, legalForm, address, dateOfStart, ScopeOfActivities, mainValuesAndObjectives, latestProjects, contactNumber, contactEmail
const App: React.FC = () => {
  const [users, setUsers] = useState<User[]>([]);
  const [NIP, setNIP] = useState("");
  const [REGON, setREGON] = useState("");
  const [name, setName] = useState("");
  const [legalForm, setLegalForm] = useState("");
  const [address, setAddress] = useState("");
  const [dateOfStart, setDateOfStart] = useState("");
  const [ScopeOfActivities, setScopeOfActivities] = useState("");
  const [mainValuesAndObjectives, setMainValuesAndObjectives] = useState("");
  const [latestProjects, setLatestProjects] = useState("");
  const [contactNumber, setContactNumber] = useState("");
  const [contactEmail, setContactEmail] = useState("");

  // Fetch users from the backend
  const fetchUsers = async () => {
    const response = await fetch("http://localhost:3000/api/legalEntities");
    const data = await response.json();
    setUsers(data);
  };

  // Add a new user
  const handleAddUserLegal = async (e: React.FormEvent<HTMLFormElement>) => {
    console.log("handleAddUser");
    e.preventDefault();
    if (NIP && REGON && name && legalForm && address && dateOfStart && ScopeOfActivities && mainValuesAndObjectives && latestProjects && contactNumber && contactEmail) {
      const response = await fetch(
        "http://localhost:3000/api/legalEntities",
        {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ NIP, REGON, name, legalForm, address, dateOfStart, ScopeOfActivities, mainValuesAndObjectives, latestProjects, contactNumber, contactEmail }),
        }
      );

      if (response.ok) {
        alert("User added successfully!");
        setNIP("");
        setREGON("");
        setName("");
        setLegalForm("");
        setAddress("");
        setDateOfStart("");
        setScopeOfActivities("");
        setMainValuesAndObjectives("");
        setLatestProjects("");
        setContactNumber("");
        setContactEmail("");
      } else {
        alert("Failed to add user.");
      }
    }
  };

  // Delete a user by ID
  const deleteUserLegal = async (userId: number) => {
    const response = await fetch(
      `http://localhost:3000/api/naturalEntities/${userId}`,
      {
        method: "DELETE",
      }
    );

    if (response.ok) {
      alert("User deleted successfully!");
      fetchUsers(); // Refresh users list after deletion
    } else {
      alert("Failed to delete user.");
    }
  };

  // Fetch users on component mount
  useEffect(() => {
    fetchUsersLegal();
  }, []);

  return (
    <div>
      <h1>User List</h1>

      <h2>Add New User</h2>
      <form onSubmit={handleAddUser}>
        <label>
          firstName:
          <input
            type="text"
            value={firstName}
            onChange={(e) => setFirstName(e.target.value)}
            required
          />
        </label>

        <label>
          lastName:
          <input
            type="text"
            value={lastName}
            onChange={(e) => setLastName(e.target.value)}
            required
          />
        </label>

        <label>
          Age:
          <input
            type="number"
            value={age}
            onChange={(e) =>
              setAge(e.target.value ? Number(e.target.value) : "")
            }
            required
          />
        </label>

        <label>
          Email:
          <input
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
          />
        </label>

        <label>
          City:
          <input
            type="text"
            value={city}
            onChange={(e) => setCity(e.target.value)}
            required
          />
        </label>
        <button type="submit">Add User</button>
      </form>

      <h2>Users</h2>
      <ul>
        {users.map((user) => (
          <li key={user.id}>
            {user.firstName}, {user.lastName}, Age: {user.age}, Email:{" "}
            {user.email}, City: {user.city}
            <button onClick={() => deleteUser(user.id)}>Delete</button>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default App;
