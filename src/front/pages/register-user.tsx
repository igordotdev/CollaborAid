import { useState } from "react";
import { useNavigate } from "react-router-dom";

/* type User = {
  id: number;
  firstName: string;
  lastName: string;
  age: number;
  city: string;
  email: string;
  password: string;
}; */

export const RegisterUser = () => {
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [age, setAge] = useState<number | "">("");
  const [email, setEmail] = useState("");
  const [city, setCity] = useState("");
  const [password, setPassword] = useState("");

  const navigate = useNavigate();
  // Add a new user
  const handleAddUser = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (firstName && lastName && age && email && city) {
      const response = await fetch(
        "http://localhost:3000/api/naturalEntities",
        {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({
            firstName,
            lastName,
            age,
            email,
            city,
            password,
          }),
        }
      );

      if (response.ok) {
        alert("User added successfully!");
        setFirstName("");
        setLastName("");
        setCity("");
        setEmail("");
        setAge("");
        setPassword("");
        navigate("/");
      } else {
        alert("Failed to add user.");
      }
    }
  };

  return (
    <form onSubmit={handleAddUser}>
      <div>
        <h1>First Name</h1>
        <input
          type={"text"}
          value={firstName}
          onChange={(e) => setFirstName(e.target.value)}
          required
        />
      </div>
      <div>
        <h1>Last Name</h1>
        <input value={lastName} onChange={(e) => setLastName(e.target.value)} required />
      </div>
      <div>
        <h1>Age</h1>
        <input
          type={"number"}
          value={age}
          onChange={(e) => setAge(e.target.value ? Number(e.target.value) : "")}
          required
        />
      </div>
      <div>
        <h1>City</h1>
        <input
          type={"text"}
          value={city}
          onChange={(e) => setCity(e.target.value)}
        />
      </div>
      <div>
        <h1>Email</h1>
        <input
          type={"email"}
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          required
        />
      </div>
      <div>
        <h1>Password</h1>
        <input
          type={"password"}
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          required
        />
      </div>
      <button
        className={
          "bg-blue-500 hover:bg-blue-600 active:scale-90 mt-10 py-3 px-5 rounded-2xl"
        }
        type={"submit"}
      >
        Register
      </button>
    </form>
  );
};
