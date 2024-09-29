import { useState } from "react";
import { FilledButton } from "../components/Buttons";
import { Link, useNavigate } from "react-router-dom";

export const OrgRegister = () => {
	const [currentStep, setCurrentStep] = useState(0);
	const [formData, setFormData] = useState({
        name: '',
        nip: '',
        address: '',
        dateOfFoundation: '',
        email: '',
        regon: '',
        legalForm: '',
        password: '',
        scopeOfActivities: '',
        latestProjects: '',
        phoneNumber: '',
        mainValues: ''
    }); // State to store form data

	// Handle change in input fields
    const handleChange = (e : any) => {
        const { name, value } = e.target;
        setFormData({ ...formData, [name]: value });
    };

    const navigate = useNavigate();

    const handleAddUserLegal = async (e : any) => {
        e.preventDefault();  // Prevent default form submission
        const { nip, regon, name, legalForm, address, dateOfFoundation, scopeOfActivities, mainValues, latestProjects, phoneNumber, email, password } = formData;

        // Ensure all required fields are filled
        if (nip && regon && name && legalForm && address && dateOfFoundation && email && password) {
            const response = await fetch("http://localhost:3000/api/legalEntities", {
                method: "POST",
                headers: { "Content-Type": "application/json" },

                body: JSON.stringify({ nip, regon, name, legalForm, address, dateOfFoundation, scopeOfActivities, mainValues, latestProjects, phoneNumber, email, password }),
            });

            if (response.ok) {
                alert("User added successfully!");
                // Reset form data
                setFormData({
                    name: '',
                    nip: '',
                    address: '',
                    dateOfFoundation: '',
                    email: '',
                    regon: '',
                    legalForm: '',
                    password: '',
                    scopeOfActivities: '',
                    latestProjects: '',
                    phoneNumber: '',
                    mainValues: ''
                });
                navigate('/');
            } else {
                alert("Failed to add user.");
            }
        } else {
            alert("Please fill out all fields before submitting.");
        }
    };

	const nextStep = () => {
		if (currentStep === 0) {
			// Validate fields in Step 1
			const { name, address, dateOfFoundation, email, regon, legalForm, password } = formData;
			if (name && address && dateOfFoundation && email && regon && legalForm && password) {
				setCurrentStep(currentStep + 1);
			} else {
				alert("Please fill out all required fields in Step 1.");
			}
		}
	};
	
	return (
		<>
			<div className="flex flex-col items-center">
                <h1 className="mt-[10%] text-center font-semibold text-3xl">Let's get you started</h1>
                <h2 className="mt-4 text-center text-xl">Enter your details</h2>
            </div>
            <form onSubmit={handleAddUserLegal}>
                {/* Step 1: Basic Information */}
                {currentStep === 0 && (
                    <div className="justify-center flex flex-row pt-6">
                        <div className="pr-4 w-auto">
                            <div className="justify-left w-72">
                                <p className="font-medium pb-1">Name *</p>
                                <input
                                    required
                                    name="name"
                                    value={formData.name}
                                    onChange={handleChange}
                                    className="px-4 w-72 h-10 border-gray-300 border-[1px] rounded-lg"
                                    type="text"
                                    placeholder="Enter your name"
                                />
                            </div>
                            <div className="pt-4 justify-left w-72">
                                <p className="font-medium pb-1">NIP</p>
                                <input
                                    name="nip"
                                    value={formData.nip}
                                    onChange={handleChange}
                                    className="px-4 w-72 h-10 border-gray-300 border-[1px] rounded-lg"
                                    type="number"
                                    placeholder="0123456789"
                                />
                            </div>
                            <div className="pt-4 justify-left w-72">
                                <p className="font-medium pb-1">Address *</p>
                                <input
                                    required
                                    name="address"
                                    value={formData.address}
                                    onChange={handleChange}
                                    className="px-4 w-72 h-10 border-gray-300 border-[1px] rounded-lg"
                                    type="text"
                                    placeholder="Enter your address"
                                />
                            </div>
                            <div className="pt-4 justify-left w-72">
                                <p className="font-medium pb-1">Date of Foundation *</p>
                                <input
                                    required
                                    name="dateOfFoundation"
                                    value={formData.dateOfFoundation}
                                    onChange={handleChange}
                                    className="px-4 w-72 h-10 border-gray-300 border-[1px] rounded-lg"
                                    type="date"
                                />
                            </div>
                        </div>
                        <div className="pl-4 w-auto">
                            <div className="justify-left w-72">
                                <p className="font-medium pb-1">E-mail *</p>
                                <input
                                    required
                                    name="email"
                                    value={formData.email}
                                    onChange={handleChange}
                                    className="px-4 w-72 h-10 border-gray-300 border-[1px] rounded-lg"
                                    type="email"
                                    placeholder="Enter your email"
                                />
                            </div>
                            <div className="justify-left w-72">
                                <p className="pt-4 font-medium pb-1">REGON *</p>
                                <input
                                    required
                                    name="regon"
                                    value={formData.regon}
                                    onChange={handleChange}
                                    className="px-4 w-72 h-10 border-gray-300 border-[1px] rounded-lg"
                                    type="number"
                                    placeholder="123456789"
                                />
                            </div>
                            <div className="pt-4 justify-left w-72">
                                <p className="font-medium pb-1">Legal Form *</p>
                                <input
                                    required
                                    name="legalForm"
                                    value={formData.legalForm}
                                    onChange={handleChange}
                                    className="px-4 w-72 h-10 border-gray-300 border-[1px] rounded-lg"
                                    type="text"
                                    placeholder="Enter your legal form"
                                />
                            </div>
                            <div className="pt-4 justify-left w-72">
                                <p className="font-medium pb-1">Password *</p>
                                <input
                                    required
                                    name="password"
                                    value={formData.password}
                                    onChange={handleChange}
                                    className="px-4 w-72 h-10 border-gray-300 border-[1px] rounded-lg"
                                    type="password"
                                    placeholder="Enter your password"
                                />
                            </div>
                        </div>
                    </div>
                )}

                {/* Step 2: More Details */}
                {currentStep === 1 && (
                    <div className="justify-center flex flex-row pt-6">
                        <div className="pr-4 w-auto">
                            <div className="justify-left w-72">
                                <p className="font-medium pb-1">Scope of Activities</p>
                                <input
                                    name="scopeOfActivities"
                                    value={formData.scopeOfActivities}
                                    onChange={handleChange}
                                    className="px-4 w-72 h-10 border-gray-300 border-[1px] rounded-lg"
                                    type="text"
                                    placeholder="Type something here"
                                />
                            </div>
                            <div className="pt-4 justify-left w-72">
                                <p className="font-medium pb-1">Latest Projects</p>
                                <input
                                    name="latestProjects"
                                    value={formData.latestProjects}
                                    onChange={handleChange}
                                    className="px-4 w-72 h-24 border-gray-300 border-[1px] rounded-lg"
                                    type="text"
                                    placeholder="Type something here"
                                />
                            </div>
                        </div>
                        <div className="pl-4 w-auto">
                            <div className="justify-left w-72">
                                <p className="font-medium pb-1">Phone number</p>
                                <input
                                    name="phoneNumber"
                                    value={formData.phoneNumber}
                                    onChange={handleChange}
                                    className="px-4 w-72 h-10 border-gray-300 border-[1px] rounded-lg"
                                    type="number"
                                    placeholder="123456789"
                                />
                            </div>
                            <div className="justify-left w-72">
                                <p className="pt-4 font-medium pb-1">Main Values</p>
                                <input
                                    name="mainValues"
                                    value={formData.mainValues}
                                    onChange={handleChange}
                                    className="px-4 w-72 h-24 border-gray-300 border-[1px] rounded-lg"
                                    type="text"
                                    placeholder="Type something here"
                                />
                            </div>
                        </div>
                    </div>
                )}

                {/* Next Button */}
                {currentStep === 0 && (
                    <div className="pt-8 flex w-full justify-center">
                        <button type="button" onClick={nextStep} className="bg-blue-500 text-white px-4 py-2 rounded">
                            Next
                        </button>
                    </div>
                )}

                {/* Submit Button */}
                {currentStep === 1 && (
                    <div className="pt-8 flex w-full justify-center">
                        <FilledButton title="Register" styling="" />
                    </div>
                )}
            </form>

            <div className="flex justify-center">
                <p>Already have an account?</p>
                <Link to="/login">
                    <p className="font-medium underline pl-1">Log in</p>
                </Link>
            </div>
		</>
	);
};