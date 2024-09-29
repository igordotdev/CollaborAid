import { Outlet, Link } from "react-router-dom";
import { ProfileButton } from "./components/Buttons";
import { NavButton } from "./components/Buttons";

export const Navbar = () => {
  return (
    <>
      <nav className="w-full h-20 flex pl-4 items-center bg-transparent">
        <div>
          <Link to="/" className="flex items-center">
            <img src="/vite.svg" alt="Vite Logo" className="h-12" />
            <h1 className="ml-5 text-2xl font-semibold">CollaborAid</h1>
          </Link>
        </div>
        <Link className="ml-12" to="/listings">
          <NavButton styling="font-semibold" title="Listings" />
        </Link>
        <Link className="ml-12" to="/events">
          <NavButton styling="font-semibold" title="Events" />
        </Link>
        <Link className="ml-12" to="/blog">
          <NavButton styling="font-semibold" title="Blog" />
        </Link>
        <Link className="ml-12" to="/about">
          <NavButton styling="font-semibold" title="About" />
        </Link>
        <Link className="ml-auto mr-6 w-12 h-12" to="/profile">
          <ProfileButton
            styling=""
            img="/assets/profile-icon.svg"
          ></ProfileButton>
        </Link>
      </nav>
      <Outlet />
    </>
  );
};
