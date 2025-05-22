"use client"

import React, { useEffect, useState } from "react";

interface SearchBox {
    children?: React.ReactNode;
    institutionRef?: React.RefObject<HTMLSelectElement | null>;
    typeRef?: React.RefObject<HTMLSelectElement | null>;
    campusRef?: React.RefObject<HTMLSelectElement | null>;
}

interface School {
    _id: string;
    school: string;
    type: string;
    campuses: string[];
    __v: number;
}

const SearchInstitute = ({ children, institutionRef, typeRef, campusRef }: SearchBox) => {
    const [schools, setSchools] = useState<School[]>([]);
    const [selectedType, setSelectedType] = useState("");
    const [selectedSchool, setSelectedSchool] = useState("");
    const [filteredSchools, setFilteredSchools] = useState<School[]>([]);
    const [selectedSchoolCampuses, setSelectedSchoolCampuses] = useState<string[]>([]);
    
    // Get unique types from schools data
    const uniqueTypes = [...new Set(schools.map(school => school.type))];
    
    useEffect(() => {
        const fetchData = async () => {
            try {
                const res = await fetch('/api/schools');
                const data = await res.json();
                setSchools(data);
                // console.log('Fetched school data:', data);
            } catch (error) {
                console.error('Error fetching schools:', error);
            }
        };
        fetchData();
    }, []);
    
    useEffect(() => {
        // Filter schools based on selected type
        if (selectedType) {
            const filtered = schools.filter(school => school.type === selectedType);
            setFilteredSchools(filtered);
        } else {
            setFilteredSchools([]);
        }
        setSelectedSchool("");
        setSelectedSchoolCampuses([]);
    }, [selectedType, schools]);
    
    useEffect(() => {
        // Set campuses for selected school
        if (selectedSchool) {
            const school = schools.find(s => s.school === selectedSchool);
            setSelectedSchoolCampuses(school?.campuses || []);
        } else {
            setSelectedSchoolCampuses([]);
        }
    }, [selectedSchool, schools]);
    
    const handleTypeChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
        setSelectedType(e.target.value);
    };
    
    const handleSchoolChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
        setSelectedSchool(e.target.value);
    };
    
    return (
        <>
            <select 
                name="type" 
                onChange={handleTypeChange} 
                value={selectedType}
                required 
                ref={typeRef}
            >
                <option value="">--Institution-Type--</option>
                {uniqueTypes.map((type, index) => (
                    <option key={index} value={type || 'Loading...'}>{type}</option>
                ))}
            </select>
            
            <select 
                name="institution" 
                onChange={handleSchoolChange} 
                value={selectedSchool || 'Loading...'}
                required 
                ref={institutionRef}
                disabled={!selectedType}
            >
                <option value="">--Institution--</option>
                {filteredSchools.map((school, index) => (
                    <option key={index} value={school.school}>{school.school}</option>
                ))}
            </select>
            
            <select 
                name="campus" 
                required 
                ref={campusRef}
                disabled={!selectedSchool}
            >
                <option value="">--Campus--</option>
                {selectedSchoolCampuses.map((campus, index) => (
                    <option key={index} value={campus || 'Loading...'}>{campus}</option>
                ))}
            </select>
            {children}
        </>
    );
};

export default SearchInstitute;