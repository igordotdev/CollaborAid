import { useState } from "react";

export const RegisterUser = () => {
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [age, setAge] = useState();
  const [city, setCity] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const onClick = () => {
    console.log("First name is: ", firstName);
    console.log("Last name is: ", lastName);
    console.log("Age is: ", age);
    console.log("City is: ", city);
    console.log("Email is: ", email);
    console.log("Password is: ", password);
  };

  return (
    <div>
      <div>
        <h1>First Name</h1>
        <input
          value={firstName}
          onChange={(e) => setFirstName(e.target.value)}
        />
      </div>
      <div>
        <h1>Last Name</h1>
        <input value={lastName} onChange={(e) => setLastName(e.target.value)} />
      </div>
      <div>
        <h1>Age</h1>
        <input
          type={"number"}
          value={age}
          onChange={(e) => setAge(e.target.value)}
        />
      </div>
      <div>
        <h1>City</h1>
        <input value={city} onChange={(e) => setCity(e.target.value)} />
      </div>
      <div>
        <h1>Email</h1>
        <input value={email} onChange={(e) => setEmail(e.target.value)} />
      </div>
      <div>
        <h1>Password</h1>
        <input
          type={"password"}
          value={password}
          onChange={(e) => setPassword(e.target.value)}
        />
      </div>
      <button
        className={
          "bg-blue-500 hover:bg-blue-600 active:scale-90 mt-10 py-3 px-5 rounded-2xl"
        }
        onClick={onClick}
      >
        Register
      </button>
    </div>
  );
};
