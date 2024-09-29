import { useState } from "react";
import { FilledButton, NavButton } from "../components/Buttons.tsx";
import { FilterItem } from "../components/FilterItem.tsx";
import { Link, Outlet, useNavigate } from "react-router-dom"; // Import useNavigate for redirection
import { BASE_URL } from "../../config"; // Make sure to define your base URL for the API

export const Login = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState(""); // State for error message
  const navigate = useNavigate(); // Hook for navigation

  const handleLogin = async () => {
    try {
      const response = await fetch(`http://localhost:3000/api/login`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ email, password }),
      });

      if (!response.ok) {
        const errorMessage = await response.text();
        setError(errorMessage); // Set error message
        return;
      }

      // Clear error message if login is successful
      setError("");

      // Optionally handle successful login (like storing the token or redirecting)
      // Example of redirecting to a protected route
      navigate("/protected"); // Adjust to the route you want to redirect to

    } catch (err) {
      console.error("Login failed", err);
      setError("An unexpected error occurred."); // Handle fetch error
    }
  };

  return (
    <>
      <div className={"flex flex-col items-center mt-48"}>
        <h1 className={"text-5xl font-semibold"}>Welcome Back!</h1>
        <div className={"text-left mt-14"}>
          <div>
            <p className={"text-2xl font-semibold mb-3"}>Email</p>
            <input
              type={"email"}
              className={"bg-gray-200 rounded-xl h-9 w-96 px-3"}
              value={email}
              onChange={(e) => setEmail(e.target.value)}
            />
          </div>
          <div>
            <p className={"text-2xl font-semibold mt-6 mb-3"}>Password</p>
            <input
              type={"password"}
              className={"bg-gray-200 rounded-xl h-9 w-96 px-3"}
              value={password}
              onChange={(e) => setPassword(e.target.value)}
            />
          </div>
        </div>
        <div className={"flex w-96 justify-between mt-5"}>
          <FilterItem title={"Remember Me"} />
          <NavButton title={"Forgot password?"} styling={"text-sm"} />
        </div>
        <FilledButton 
          title={"Log In"} 
          styling={"w-44 mt-10"} 
          onClick={handleLogin} // Attach the click handler
        />
        {error && <p className="text-red-500 mt-2">{error}</p>} {/* Display error message */}
        <p className={"mt-5 text-sm"}>Don't have an account?</p>
        <div className={"flex w-80 justify-between"}>
          <Link to={"/registerUser"}>
            <NavButton title={"Register as user"} />
          </Link>
          <Link to={"/registerOrg"}>
            <NavButton title={"Register as company"} />
          </Link>
        </div>
      </div>
      <Outlet />
    </>
  );
};
