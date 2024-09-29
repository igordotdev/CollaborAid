const Profile = () => {
		return (
			<>
			<div className="flex flex-row">
				<div className="ml-[15%] mt-10 mr-6"> 
					<img src="/assets/group-icon.svg" alt="Org Logo" className="h-20"/>
				</div>
				<div className=" mt-10 flex flex-col items-left justify-start">
					<h1 className="text-4xl font-bold text-red-700">Company Name</h1>
					<p className="w-[70%] ml-4 mb-[7%] text-lg mt-2 text-pretty text-left">
						link to the page
					</p>
			</div>

				</div>
				<div className="ml-8 flex flex-row">
					<div className="flex flex-col w-[50%]">
						<div className="h-56">
							<h1 className="text-2xl font-bold text-red-700">Info</h1>
							<p className=" ml-4 text-lg mt-2 mb-1 text-pretty text-left">
								Address: 
							</p>
							<hr className="ml-4 border-[1.3px] w-[80%]"/>
							<p className=" ml-4 mt-1 mb-1 text-lg text-pretty text-left">
								Legal form: 
							</p>
							<hr className="ml-4 border-[1.3px] w-[80%]"/>
							<p className=" ml-4 mt-1 mb-1 text-lg text-pretty text-left">
								REGON: 
							</p>
							<hr className="ml-4 border-[1.3px] w-[80%]"/>
							<p className=" ml-4 mt-1 mb-1 text-lg text-pretty text-left">
								NIP: 
							</p>
							<hr className="ml-4 border-[1.3px] w-[80%]"/>
						</div>
						<div className="h-72">
							<div>
								<h1 className="text-2xl font-bold text-red-700">Contact</h1>
								<p className=" ml-4 text-lg mt-2 text-pretty text-left">
									Email: 
								</p>
								<p className=" ml-4 mt-2 text-lg text-pretty text-left">
									Phone Number: 
								</p>
							</div>
						</div>
					</div>
					<div className="flex flex-col w-[50%]">
						<div className="h-56">
							<h1 className="text-2xl font-bold text-red-700">About</h1>
							<p className=" ml-4 text-lg mt-2 mb-1 text-pretty text-left">
								Description here: wojtus work @wojtek
							</p>
						</div>
						<div className="h-72">
							<div>
								<h1 className="text-2xl font-bold text-red-700">Areas</h1>
								<p className=" ml-4 text-lg mt-2 text-pretty text-left">
									something:
								</p>
							</div>
						</div>
					</div>
				</div>
			</>
		);
};


export default Profile;