import "./front/Navbar.tsx";
import { Navbar } from "./front/Navbar.tsx";
import { Hero } from "./front/Hero.tsx";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { useParams } from "react-router-dom";
import Listings from "./front/pages/listings.tsx";
import Events from "./front/pages/events.tsx";
import Blog from "./front/pages/blog.tsx";
import About from "./front/pages/about.tsx";
import { OrgRegister } from "./front/pages/registerOrg.tsx";
import { RegisterUser } from "./front/pages/registerUser.tsx";
import { Login } from "./front/pages/login.tsx";
import { Profile } from "./front/pages/profile.tsx"
// import { RegisterUser } from "./front/pages/register-user.tsx";
// import { initDatabase } from "./back/manageDatabase.ts";

function App() {
  return (
    <Router>
      <Navbar />
      <Routes>
      <Route path="/profile/:userId" element={<ProfileWrapper />} />
        <Route path="/" element={<Hero />} />
        <Route path="/listings" element={<Listings />} />
        <Route path="/events" element={<Events />} />
        <Route path="/blog" element={<Blog />} />
        <Route path="/about" element={<About />} />
        <Route path="/registerOrg" element={<OrgRegister />} />
        <Route path="/registerUser" element={<RegisterUser />} />
        <Route path="/login" element={<Login />} />
      </Routes>
    </Router>
  );
}

const ProfileWrapper: React.FC = () => {
  const { userId } = useParams<{ userId: string }>(); // useParams hook to get userId
  return <Profile userId={userId || ""} />; // Pass userId prop to Profile component
};

export default App;
