// import React, { useState } from "react";


// type User = {
//   id: number;
//   firstName: string;
//   lastName: string;
//   age: number;
//   city: string;
//   email: string;
//     password: string;
// };
// const [users, setUsers] = useState<User[]>([]);
// const [firstName, setFirstName] = useState("");
// const [lastName, setLastName] = useState("");
// const [age, setAge] = useState<number | "">("");
// const [email, setEmail] = useState("");
// const [city, setCity] = useState("");
// const [password, setPassword] = useState("");

// // Fetch users from the backend
// const fetchUsers = async () => {
//   const response = await fetch("http://localhost:3000/api/naturalEntities");
//   const data = await response.json();
//   setUsers(data);
// };

// // Add a new user
// const handleAddUser = async (e: React.FormEvent<HTMLFormElement>) => {
//   console.log("handleAddUser");
//   e.preventDefault();
//   if (firstName && lastName && age && email && city) {
//     const response = await fetch("http://localhost:3000/api/naturalEntities", {
//       method: "POST",
//       headers: { "Content-Type": "application/json" },
//       body: JSON.stringify({ firstName, lastName, age, email, city, password }),
//     });

//     if (response.ok) {
//       alert("User added successfully!");
//       setFirstName("");
//       setLastName("");
//       setCity("");
//       setEmail("");
//       setAge("");
//       setPassword("");
//       fetchUsers(); // Refresh users list
//     } else {
//       alert("Failed to add user.");
//     }
//   }
// };

// // Delete a user by ID
// const deleteUser = async (userId: number) => {
//   const response = await fetch(
//     `http://localhost:3000/api/naturalEntities/${userId}`,
//     {
//       method: "DELETE",
//     }
//   );

//   if (response.ok) {
//     alert("User deleted successfully!");
//     fetchUsers(); // Refresh users list after deletion
//   } else {
//     alert("Failed to delete user.");
//   }
// };

// export {
//   handleAddUser,
//   deleteUser,
//   fetchUsers,
//   users,
//   setUsers,
//   setFirstName,
//   setLastName,
//   setAge,
//   setEmail,
//   setCity,
//   setPassword
// };
