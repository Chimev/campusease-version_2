'use client';

import { useState } from 'react';

const schools = [
  { type: 'State', school: 'Ebsu', campuses: ['CAS', 'ISHIEKE', 'PERMSITE'] },
  { type: 'Federal', school: 'FUNAI', campuses: ['Area 4', 'Area 5'] },
  { type: 'Polytechnic', school: 'IMT', campuses: ['CAMPUS 1', 'CAMPUS 2'] },
  { type: 'State', school: 'Lasu', campuses: ['Epe', 'Ikeja', 'Ojo'] },
];

export default function SchoolSelector() {
  const [selectedType, setSelectedType] = useState('');
  const [filteredSchools, setFilteredSchools] = useState(schools);
  const [schoolSearch, setSchoolSearch] = useState(''); // Tracks search input for schools
  const [showDropdown, setShowDropdown] = useState(false); // Controls the visibility of the dropdown

  // Extract unique types
  const uniqueTypes = Array.from(new Set(schools.map((inst) => inst.type)));

  // Filter schools by type
  const handleTypeChange = (type: string) => {
    setSelectedType(type);
    if (type) {
      const filtered = schools.filter((inst) => inst.type === type);
      setFilteredSchools(filtered);
    } else {
      setFilteredSchools(schools); // Reset to all schools if no type is selected
    }
  };

  // Filter school options based on search query
  const handleSchoolSearchChange = (query: string) => {
    setSchoolSearch(query);
    if (query.trim() === '') {
      setShowDropdown(false); // Hide dropdown if the search is cleared
    } else {
      setShowDropdown(true); // Show dropdown when there is input
    }
  };

  // Filtered schools for the dropdown
  const searchedSchools = filteredSchools.filter((inst) =>
    inst.school.toLowerCase().includes(schoolSearch.toLowerCase())
  );

  return (
    <div className="relative w-64">
      <form>
        {/* Institution Type Dropdown */}
        <label htmlFor="type">Select Institution Type:</label>
        <select
          id="type"
          value={selectedType}
          onChange={(e) => handleTypeChange(e.target.value)}
          className="w-full border rounded px-2 py-1 mb-4"
        >
          <option value="">--Select Type--</option>
          {uniqueTypes.map((type, index) => (
            <option key={index} value={type}>
              {type}
            </option>
          ))}
        </select>

        {/* School Search Input */}
        <label htmlFor="school-search">Search School:</label>
        <input
          id="school-search"
          type="text"
          value={schoolSearch}
          onChange={(e) => handleSchoolSearchChange(e.target.value)}
          placeholder="Type to search school..."
          className="w-full border rounded px-2 py-1"
          onFocus={() => setShowDropdown(true)} // Show dropdown on input focus
        />

        {/* Dropdown for search results */}
        {showDropdown && searchedSchools.length > 0 && (
          <ul className="absolute z-10 bg-white border rounded w-full max-h-40 overflow-y-auto mt-1">
            {searchedSchools.map((sch, index) => (
              <li
                key={index}
                className="px-2 py-1 cursor-pointer hover:bg-gray-200"
                onClick={() => {
                  setSchoolSearch(sch.school); // Set the selected school in input
                  setShowDropdown(false); // Close the dropdown
                }}
              >
                {sch.school}
              </li>
            ))}
          </ul>
        )}
      </form>
    </div>
  );
}

