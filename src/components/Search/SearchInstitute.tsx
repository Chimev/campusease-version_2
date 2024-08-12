"use client"

import React from "react";
import { useSchoolProvider } from "@/lib/Context/SchholContext";
import { ListOfInstitutions } from "@/data/listOfInstitution";

interface SearchBox {
    children?: React.ReactNode;
}

const SearchInstitute = ({ children }: SearchBox) => {
    const value = useSchoolProvider();

    const changeType = (e: React.ChangeEvent<HTMLSelectElement>) => {
        const selectedType = e.target.value;
        const selectedInstitutions = ListOfInstitutions.find(int => int.type === selectedType)?.institution || [];
        
        value?.setType(selectedType);
        value?.setInstitutions(selectedInstitutions);
        value?.setInstitution(''); // Reset institution and campus on type change
        value?.setCampus('');
    };

    const changeInstitution = (e: React.ChangeEvent<HTMLSelectElement>) => {
        const selectedInstitution = e.target.value;
        const selectedCampus = value?.institutions.find(int => int.school === selectedInstitution)?.campus || [];
        
        value?.setInstitution(selectedInstitution);
        value?.setCampuses(selectedCampus);
        value?.setCampus(''); // Reset campus on institution change
    };

    const changeCampus = (e: React.ChangeEvent<HTMLSelectElement>) => {
        value?.setCampus(e.target.value);
    };

    return (
        <>
            <select name="type" onChange={changeType} required>
                <option value="">--Institution-Type--</option>
                {ListOfInstitutions.map((inst, index) => (
                    <option key={index} value={inst.type}>{inst.type}</option>
                ))}
            </select>

            <select name="institution" onChange={changeInstitution} required>
                <option value="">--Institution--</option>
                {value?.institutions.map((inst, index) => (
                    <option key={index} value={inst.school}>{inst.school}</option>
                ))}
            </select>

            <select name="campus" onChange={changeCampus} required>
                <option value="">--Campus--</option>
                {value?.campuses.map((campus, index) => (
                    <option key={index} value={campus}>{campus}</option>
                ))}
            </select>

            {children}
        </>
    );
};

export default SearchInstitute;
