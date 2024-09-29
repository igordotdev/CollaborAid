import { useEffect, useState } from "react";

interface Company {
    NIP: string;
    REGON: string;
    name: string;
    legalForm: string;
    address: string;
    dateOfStart: string;
    scopeOfActivities: string;
    mainValuesAndObjectives: string;
    latestProjects: string;
    contactNumber: string;
    contactEmail: string;
}

const Profile = () => {
    const [company, setCompany] = useState<Company | null>(null); // State to hold company data
    const [loading, setLoading] = useState(true); // State for loading
    const [error, setError] = useState<string | null>(null); // State for error handling

    // Fetch company data from the backend
    const fetchCompanyData = async () => {
        try {
            const response = await fetch("http://localhost:3000/api/legalEntities/1234567890"); // Update with your actual endpoint
            if (!response.ok) {
                throw new Error("Network response was not ok");
            }
            const data = await response.json();
            setCompany(data); // Store the data in state
        } catch (error) {
            setError("Failed to fetch company data");
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        fetchCompanyData(); // Fetch company data on mount
    }, []);

    if (loading) {
        return <p>Loading...</p>; // Loading state
    }

    if (error) {
        return <p>{error}</p>; // Error handling
    }

    if (!company) {
        return <p>No company data found.</p>; // Handle case where no data is returned
    }

    return (
        <>
            <div className="flex flex-row">
                <div className="ml-[15%] mt-10 mr-6"> 
                    <img src="/assets/group-icon.svg" alt="Org Logo" className="h-20"/>
                </div>
                <div className="mt-10 flex flex-col items-left justify-start">
                    <h1 className="text-4xl font-bold text-red-700">{company.name}</h1>
                    <p className="w-[70%] ml-4 mb-[7%] text-lg mt-2 text-pretty text-left">
                        <a href={`https://some-link.com/${company.NIP}`}>{company.NIP}</a>
                    </p>
                </div>
            </div>
            <div className="ml-8 flex flex-row">
                <div className="flex flex-col w-[50%]">
                    <div className="h-56">
                        <h1 className="text-2xl font-bold text-red-700">Info</h1>
                        <p className="ml-4 text-lg mt-2 mb-1 text-pretty text-left">
                            Address: {company.address}
                        </p>
                        <hr className="ml-4 border-[1.3px] w-[80%]"/>
                        <p className="ml-4 mt-1 mb-1 text-lg text-pretty text-left">
                            Legal form: {company.legalForm}
                        </p>
                        <hr className="ml-4 border-[1.3px] w-[80%]"/>
                        <p className="ml-4 mt-1 mb-1 text-lg text-pretty text-left">
                            REGON: {company.REGON}
                        </p>
                        <hr className="ml-4 border-[1.3px] w-[80%]"/>
                        <p className="ml-4 mt-1 mb-1 text-lg text-pretty text-left">
                            NIP: {company.NIP}
                        </p>
                        <hr className="ml-4 border-[1.3px] w-[80%]"/>
                    </div>
                    <div className="h-72">
                        <div>
                            <h1 className="text-2xl font-bold text-red-700">Contact</h1>
                            <p className="ml-4 text-lg mt-2 text-pretty text-left">
                                Email: {company.contactEmail}
                            </p>
                            <p className="ml-4 mt-2 text-lg text-pretty text-left">
                                Phone Number: {company.contactNumber}
                            </p>
                        </div>
                    </div>
                </div>
                <div className="flex flex-col w-[50%]">
                    <div className="h-56">
                        <h1 className="text-2xl font-bold text-red-700">About</h1>
                        <p className="ml-4 text-lg mt-2 mb-1 text-pretty text-left">
                            Scope of Activities: {company.scopeOfActivities}
                        </p>
                        <p className="ml-4 text-lg mt-1 mb-1 text-pretty text-left">
                            Main Values and Objectives: {company.mainValuesAndObjectives}
                        </p>
                        <p className="ml-4 text-lg mt-1 mb-1 text-pretty text-left">
                            Latest Projects: {company.latestProjects}
                        </p>
                    </div>
                    <div className="h-72">
                        <div>
                            <h1 className="text-2xl font-bold text-red-700">Areas</h1>
                            <p className="ml-4 text-lg mt-2 text-pretty text-left">
                                Areas: {/* Add area information here if applicable */}
                            </p>
                        </div>
                    </div>
                </div>
            </div>
        </>
    );
};

export default Profile;
