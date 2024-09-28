// src/App.tsx

import React, { useState, useEffect } from "react";

type User = {
  id: number;
  name: string;
  age: number;
};

const App: React.FC = () => {
  const [users, setUsers] = useState<User[]>([]);
  const [name, setName] = useState("");
  const [age, setAge] = useState<number | "">("");

  // Fetch users from the backend
  const fetchUsers = async () => {
    const response = await fetch("http://localhost:3000/api/users");
    const data = await response.json();
    setUsers(data);
  };

  // Add a new user
  const handleAddUser = async (e: React.FormEvent<HTMLFormElement>) => {
    console.log("handleAddUser");
    e.preventDefault();
    if (name && age) {
      const response = await fetch("http://localhost:3000/api/users", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ name, age: Number(age) }),
      });

      if (response.ok) {
        alert("User added successfully!");
        setName("");
        setAge("");
        fetchUsers(); // Refresh users list
      } else {
        alert("Failed to add user.");
      }
    }
  };

  // Delete a user by ID
  const deleteUser = async (userId: number) => {
    const response = await fetch(`http://localhost:3000/api/users/${userId}`, {
      method: "DELETE",
    });

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
          Name:
          <input
            type="text"
            value={name}
            onChange={(e) => setName(e.target.value)}
            required
          />
        </label>

        <label>
          Age:
          <input
            type="number"
            value={age}
            onChange={(e) => setAge(e.target.value ? Number(e.target.value) : "")}
            required
          />
        </label>
        <button type="submit">Add User</button>
      </form>

      <h2>Users</h2>
      <ul>
        {users.map((user) => (
          <li key={user.id}>
            {user.name}, Age: {user.age}
            <button onClick={() => deleteUser(user.id)}>Delete</button>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default App;
