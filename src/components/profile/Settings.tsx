'use client'

import { signOut } from 'next-auth/react';
import React, { useEffect, useState } from 'react'
import { toast, ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

const Settings = ({ name, email, phone, school }: any) => {
    const [changeDetail, setChangeDetail] = useState(true);
    const [schoolSearch, setSchoolSearch] = useState('');
    const [dropDown, setDropDown] = useState(false);
    const [fetchedSchool, setFetchedSchhol] = useState<[] | null>([])
    const [formData, setFormData] = useState({
        name: name || "",
        email: email || "",
        phone: phone || "",
        school: school || schoolSearch,
    });

    useEffect(() => {
        async function searchSchool() {
            const res = await fetch('/api/schools');

            if (!res.ok) {
                throw new Error('Failed to fetch schools');
            }
            const schools = await res.json();
            setFetchedSchhol(schools);
        }
        searchSchool()
    }, [])

    const handleSchoolSearchChange = (query: string) => {
        setSchoolSearch(query)

        setFormData((prev) => ({
            ...prev,
            school: query, // Update the `school` field in `formData`
        }));

        if (query.trim() === '') {
            setDropDown(false);
        } else {
            setDropDown(true)
        }
    };

    const searchedSchools = fetchedSchool?.filter((sch: any) =>
        sch.school.toLowerCase().includes(schoolSearch.toLowerCase())
    );

    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        setFormData((prev) => ({
            ...prev,
            [e.target.name]: e.target.value,
        }))
    }

    const handleSubmit = async () => {

        try {
            const res = await fetch(`/api/user/${email}`, {
                method: "PATCH",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify(formData)
            })
            if (res.status === 200) {
                toast.success("Updated")
                signOut() 
            }
            if(!res.ok){
                const errorMessgae = await res.json();
                toast.error(errorMessgae.message)
            }
        } catch (error) {
            console.error("Error updating user:", error);
        }
    }

    const onSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault()
        await handleSubmit(); // Call reusable submit logic
    }

    return (
        <form onSubmit={onSubmit}>
            <h3 className="text-3xl font-semibold mb-5">Settings</h3>

            {/* Name Input */}
            <input
                type="text"
                id="name"
                name="name"
                placeholder="Enter Your Name"
                disabled={changeDetail}
                value={formData.name}
                onChange={handleChange}
                className={`w-full p-2 border rounded ${changeDetail
                    ? "bg-gray-200 text-gray-500 border-gray-300"
                    : "bg-white text-black border-black focus:outline-none focus:ring-2 focus:ring-black"
                    }`}
            />

            {/* Email Input */}
            <input
                type="email"
                id="email"
                name="email"
                placeholder="Enter Your Email"
                disabled={true}
                value={formData.email}
                onChange={handleChange}
                className={`w-full p-2 border rounded ${changeDetail
                    ? "bg-gray-200 text-gray-500 border-gray-300"
                    : "bg-white text-black border-black focus:outline-none focus:ring-2 focus:ring-black"
                    }`}
            />

            {/* Phone Input */}
            <input
                type="tel"
                id="phone"
                name="phone"
                placeholder="Enter Your Phone"
                disabled={changeDetail}
                value={formData.phone}
                onChange={handleChange}
                className={`w-full p-2 border rounded ${changeDetail
                    ? "bg-gray-200 text-gray-500 border-gray-300"
                    : "bg-white text-black border-black focus:outline-none focus:ring-2 focus:ring-black"
                    }`}
            />

            {/* School Input */}
            <input
                type="text"
                id="school"
                name="school"
                placeholder="Enter Your School"
                disabled={changeDetail}
                value={formData.school}
                onChange={e => handleSchoolSearchChange(e.target.value)}
                className={`w-full p-2 border rounded ${changeDetail
                    ? "bg-gray-200 text-gray-500 border-gray-300"
                    : "bg-white text-black border-black focus:outline-none focus:ring-2 focus:ring-black"
                    }`}
            />
            {
                dropDown && (
                    <ul className="sticky z-10 bg-white border rounded w-[100%] max-h-40 overflow-y-auto -mt-4">
                        {
                            searchedSchools?.map((sch: any, index) => (
                                <li
                                    key={index}
                                    className="px-2 py-1 cursor-pointer hover:bg-gray-200"
                                    onClick={() => {
                                        setFormData(prev => ({
                                            ...prev,
                                            school: sch.school,
                                        })); // Set the selected school in input
                                        setDropDown(false); // Close the dropdown
                                    }}
                                >
                                    {sch.school}
                                </li>
                            ))
                        }
                    </ul>
                )
            }

            {/* Toggle Edit */}
            <p className="-mt-0">
                Do you want to change your details?{" "}
                <span
                    className="text-orange cursor-pointer font-extralight text-sm"
                    onClick={async () => {
                        setChangeDetail(prev => !prev)
                        if (!changeDetail) {
                            await handleSubmit(); // Call reusable submit logic
                        }
                        // setChangeDetail(!changeDetail);
                    }}
                >
                    {changeDetail ? " Edit" : " Apply Change"}
                </span>
            </p>
            <ToastContainer/>
        </form>
    )
}

export default Settings;
