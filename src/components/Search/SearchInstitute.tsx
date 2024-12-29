"use client"

import React from "react";
import { ListOfInstitutions } from "@/data/listOfInstitution";

interface SearchBox {
    children?: React.ReactNode;
    institutionRef?: React.RefObject<HTMLSelectElement | null>;
    typeRef? : React.RefObject<HTMLSelectElement | null>;
    campusRef? : React.RefObject<HTMLSelectElement | null>;
    value:any;
    changeType?: any;
    changeInstitution?: any;
    changeCampus?:any;
}

const SearchInstitute = ({ children, institutionRef, typeRef, campusRef, value, changeType, changeCampus, changeInstitution }: SearchBox) => {
    

    return (
        <>
            <select name="type" onChange={changeType} required ref={typeRef}>
                <option value="">--Institution-Type--</option>
                {ListOfInstitutions.map((inst, index) => (
                    <option key={index} value={inst.type}>{inst.type}</option>
                ))}
            </select>

            <select name="institution" onChange={changeInstitution} ref={institutionRef} required>
                <option value="">--Institution--</option>
                {value?.institutions.map((inst:any, index:any) => (
                    <option key={index} value={inst.school}>{inst.school}</option>
                ))}
            </select>

            <select name="campus" onChange={changeCampus} ref={campusRef} required>
                <option value="">--Campus--</option>
                {value?.campuses.map((campus:any, index:any) => (
                    <option key={index} value={campus}>{campus}</option>
                ))}
            </select>

            {children}
        </>
    );
};

export default SearchInstitute;
