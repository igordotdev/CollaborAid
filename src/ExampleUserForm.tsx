// src/App.tsx
import "./App.css";
import "./index.css";
import React, { useState, useEffect } from "react";

type User = {
  id: number;
  firstName: string;
  lastName: string;
  age: number;
  city: string;
  email: string;
};

const App: React.FC = () => {
  const [users, setUsers] = useState<User[]>([]);
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [age, setAge] = useState<number | "">("");
  const [email, setEmail] = useState("");
  const [city, setCity] = useState("");

  // Fetch users from the backend
  const fetchUsers = async () => {
    const response = await fetch("http://localhost:3000/api/naturalEntities");
    const data = await response.json();
    setUsers(data);
  };

  // Add a new user
  const handleAddUser = async (e: React.FormEvent<HTMLFormElement>) => {
    console.log("handleAddUser");
    e.preventDefault();
    if (firstName && lastName && age && email && city) {
      const response = await fetch(
        "http://localhost:3000/api/naturalEntities",
        {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ firstName, lastName, age, email, city }),
        }
      );

      if (response.ok) {
        alert("User added successfully!");
        setFirstName("");
        setLastName("");
        setCity("");
        setEmail("");
        setAge("");
        fetchUsers(); // Refresh users list
      } else {
        alert("Failed to add user.");
      }
    }
  };

  // Delete a user by ID
  const deleteUser = async (userId: number) => {
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
    fetchUsers();
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
