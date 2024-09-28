import { Link } from "react-router-dom";
import { FilledButton, StrokedButton } from "./components/Buttons";

export const Hero = () => {
	return (
		<div className='hero'>
			<div className='ml-20 mt-64'>
				<h1 className="font-bold text-5xl">CollaborAid</h1>
				<p className="mt-8 text-xl">Where great opportunities are born</p>
			</div>
			<div className='flex'>
				<Link to='/listings'> <FilledButton styling='mt-14 ml-20' title='Explore' /> </Link>
				<Link to='/about'> <StrokedButton styling='mt-14 ml-10' title='About Us' /> </Link>
			</div>
		</div>
	)
};