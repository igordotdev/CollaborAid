import "./front/Navbar.tsx";
import { Navbar } from "./front/Navbar.tsx";
import { Hero } from "./front/Hero.tsx";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Listings from "./front/pages/listings.tsx";
import Events from "./front/pages/events.tsx";
import Blog from "./front/pages/blog.tsx";
import About from "./front/pages/about.tsx";
import { OrgRegister } from "./front/pages/orgregister.tsx";
// import Profile from "./front/pages/profile.tsx";
import { RegisterUser } from "./front/pages/register-user.tsx";
// import { initDatabase } from "./back/manageDatabase.ts";

function App() {
  return (
    <Router>
      <Navbar />
      <Routes>
        <Route path="/" element={<Hero />} />
        <Route path="/listings" element={<Listings />} />
        <Route path="/events" element={<Events />} />
        <Route path="/blog" element={<Blog />} />
        <Route path="/about" element={<About />} />
        <Route path="/orgregister" element={<OrgRegister />} />
        <Route path="/profile" element={<RegisterUser />} />
      </Routes>
    </Router>
  );
}

export default App;
