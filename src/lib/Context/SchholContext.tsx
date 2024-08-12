'use client'

import React, { useState, createContext, useContext, ReactElement } from "react";

export type SchoolType = {
    type: string;
    setType: React.Dispatch<React.SetStateAction<string>>;
    institution: string;
    setInstitution: React.Dispatch<React.SetStateAction<string>>;
    campus: string;
    setCampus: React.Dispatch<React.SetStateAction<string>>;
    institutions: { school: string; campus: string[] }[];
    setInstitutions: React.Dispatch<React.SetStateAction<{ school: string; campus: string[] }[]>>;
    campuses: string[];
    setCampuses: React.Dispatch<React.SetStateAction<string[]>>;
}

export const SchoolContext = createContext<SchoolType | null>(null);

export const SchoolContextProvider = ({ children }: { children: ReactElement }) => {
    const [type, setType] = useState<string>("");
    const [institution, setInstitution] = useState<string>("");
    const [campus, setCampus] = useState<string>("");
    const [institutions, setInstitutions] = useState<{ school: string; campus: string[] }[]>([]);
    const [campuses, setCampuses] = useState<string[]>([]);

    const value: SchoolType = {
        type,
        setType,
        institution,
        setInstitution,
        campus,
        setCampus,
        institutions,
        setInstitutions,
        campuses,
        setCampuses
    };

    return (
        <SchoolContext.Provider value={value}>
            {children}
        </SchoolContext.Provider>
    );
}

export const useSchoolProvider = () => useContext(SchoolContext); // Fixed hook name here
