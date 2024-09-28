import { Outlet, Link } from "react-router-dom";
import { ProfileButton } from "./components/Buttons";
import { NavButton } from "./components/Buttons";

export const Navbar = () => {
	return (
		<>
		<nav className="w-full h-16 flex pl-4 pt-3 items-center">
			<div>
				<Link to="/" className="flex items-center">
					<img src="/vite.svg" alt="Vite Logo" className="h-12"/>
					<h1 className="ml-5 text-2xl font-semibold" >CollaborAid</h1>
				</Link>
			</div>
			<Link className="ml-12" to="/listings"><NavButton styling="" title="Listings"/></Link>
			<Link className="ml-12" to="/events"><NavButton styling="" title="Events" /></Link>
			<Link className="ml-12" to="/blog"><NavButton styling="" title="Blog" /></Link>
			<Link className="ml-12" to="/about"><NavButton styling="" title="About" /></Link>
			<Link className="ml-auto mr-6 w-12 h-12" to="/profile"><ProfileButton
				styling=""
				img="/assets/profile-icon.svg"
				></ProfileButton></Link>
		</nav>
		<Outlet />
		</>
	)
};