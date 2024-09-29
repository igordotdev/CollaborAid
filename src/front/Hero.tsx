import { Link } from "react-router-dom";
import { FilledButton, StrokedButton } from "./components/Buttons";

export const Hero = () => {
	return (
		<div className="w-full h-full" style={{ backgroundImage: "url('/assets/hero-image.jpg')", backgroundPosition: 'center', backgroundSize: 'cover' }}>
			<div className='ml-20 pt-64 pb-[30%]'>
				<h1 className="font-bold text-5xl text-white">CollaborAid</h1>
				<p className="mt-8 text-xl text-white font-medium">Where great opportunities are born</p>
			</div>
			<div className='flex pb-36'>
				<Link to='/listings'> <FilledButton styling='ml-20' title='Explore' /> </Link>
				<Link to='/about'> <StrokedButton styling='ml-10 text-white' title='About Us' /> </Link>
			</div>
		</div>
	)
};