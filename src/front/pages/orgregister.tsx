import { FilledButton } from "../components/Buttons";
import { Link } from "react-router-dom";

export const OrgRegister = () => {
	return (
		<>
			<div className="flex flex-col items-center">
				<h1 className="mt-[10%] text-center font-semibold text-3xl">Let's get you started</h1>
				<h2 className="mt-4 text-center text-xl">Enter your details</h2>
			</div>
			<form>
			<div className="justify-center flex flex-row pt-6">
				<div className="pr-4 w-auto">
					<div className="justify-left w-72">
						<p className="font-medium pb-1">Name *</p>
						<input required className="px-4 w-72 h-10 border-gray-300 border-[1px] rounded-lg" type="text" placeholder="Enter your name" />
					</div>
					<div className="pt-4 justify-left w-72">
						<p className="font-medium pb-1">NIP (optional)</p>
						<input className="px-4 w-72 h-10 border-gray-300 border-[1px] rounded-lg" type="number" placeholder="0123456789" />
					</div>
					<div className="pt-4 justify-left w-72">
						<p className="font-medium pb-1">Address *</p>
						<input required className="px-4 w-72 h-10 border-gray-300 border-[1px] rounded-lg" type="address" placeholder="Enter your address" />
					</div>
					<div className="pt-4 justify-left w-72">
						<p className="font-medium pb-1">Date of Foundation *</p>
						<input required className="px-4 w-72 h-10 border-gray-300 border-[1px] rounded-lg" type="date" placeholder="YYYY" />
					</div>
				</div>
				<div className="pl-4 w-auto">
				<div className="justify-left w-72">
						<p className="font-medium pb-1">E-mail *</p>
						<input required className="px-4 w-72 h-10 border-gray-300 border-[1px] rounded-lg" type="email" placeholder="Enter your address" />
					</div>
				<div className="justify-left w-72">
						<p className="pt-4 font-medium pb-1">REGON *</p>
						<input required className="px-4 w-72 h-10 border-gray-300 border-[1px] rounded-lg" type="number" placeholder="123456789" />
					</div>
					<div className="pt-4 justify-left w-72">
						<p className="font-medium pb-1">Legal Form *</p>
						<input required className="px-4 w-72 h-10 border-gray-300 border-[1px] rounded-lg" type="text" placeholder="Enter your legal form" />
					</div>
					<div className="pt-4 justify-left w-72">
						<p className="font-medium pb-1">Password *</p>
						<input required className="px-4 w-72 h-10 border-gray-300 border-[1px] rounded-lg" type="password" placeholder="Enter your name" />
					</div>
				</div>
			</div>
			<div className="justify-center flex flex-row pt-6">
			<div className="pr-4 w-auto">
					<div className="justify-left w-72">
						<p className="font-medium pb-1">Scope of Activities</p>
						<input className="px-4 w-72 h-10 border-gray-300 border-[1px] rounded-lg" type="text" placeholder="Type something here" />
					</div>
					<div className="pt-4 justify-left w-72">
						<p className="font-medium pb-1">Latest Projects</p>
						<input className="px-4 w-72 h-24 border-gray-300 border-[1px] rounded-lg" type="text" placeholder="Type something here" />
					</div>
				</div>
				<div className="pl-4 w-auto">
				<div className="justify-left w-72">
						<p className="font-medium pb-1">Phone number</p>
						<input className="px-4 w-72 h-10 border-gray-300 border-[1px] rounded-lg" type="number" placeholder="123456789" />
					</div>
				<div className="justify-left w-72">
						<p className="pt-4 font-medium pb-1">Main Values</p>
						<input className="px-4 w-72 h-24 border-gray-300 border-[1px] rounded-lg" type="text" placeholder="Type something here" />
					</div>
				</div>
			</div>
			</form>
			<div className="pt-8 flex w-full justify-center"> <Link to='/profile'> <FilledButton title="Register" styling=""/> </Link> </div>
			<div className="flex justify-center"> <p> Already have an account? </p> <Link to='/login'> <p className="font-medium underline pl-1"> Log in </p> </Link></div>
		</>
	);
};