'use client';
import React, { useEffect, useState } from 'react';

const Page = () => {
  const [loading, setLoading] = useState(false);
  const [campuses, setCampuses] = useState<string[]>([]);
  const [inputValue, setInputValue] = useState('');
  const [schools, setSchools] = useState<[] | null>(null);
  const [searchTerm, setSearchTerm] = useState<string>(''); // State for search input

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setLoading(true);

    const type = e.currentTarget.type.value;
    const school = e.currentTarget.school.value;

    console.log({ type, school, campuses });

    try {
      const res = await fetch('/api/schools', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          type,
          school,
          campuses,
        }),
      });

      if (res.status === 500) {
        console.error('Network error');
      } else if (res.status === 400) {
        console.error('This school is already registered');
      } else if (res.status === 200) {
        setCampuses([]);
        setInputValue('');
        // console.log('School added successfully');
      }
    } catch (error) {
      console.error('Error:', error);
    } finally {
      setLoading(false);
    }
  };

  const handleAddCampus = () => {
    const trimmedValue = inputValue.trim();
    if (trimmedValue && !campuses.includes(trimmedValue)) {
      setCampuses([...campuses, trimmedValue]);
      setInputValue('');
    }
  };

  const handleRemoveCampus = (campus: string) => {
    setCampuses(campuses.filter((c) => c !== campus));
  };

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setInputValue(e.target.value);
  };

  const handleSearchChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSearchTerm(e.target.value.toLowerCase()); // Update search term
  };

  useEffect(() => {
    const fetchData = async () => {
      const res = await fetch('/api/schools');
      const data = await res.json();
      setSchools(data);
      console.log('data', data);
    };

    fetchData();
  }, []);

  // Filtered schools based on the search term
  const filteredSchools = schools?.filter((school: any) =>
    school.school.toLowerCase().includes(searchTerm)
  );

  return (
    <section>
      <h2 className="text-2xl font-bold">Add Schools</h2>
      <form onSubmit={handleSubmit}>
        {/* School Type */}
        <div className="flex flex-col gap-1">
          <label htmlFor="type" className="text-xl mt-2">
            Enter Type
          </label>
          <select
            name="type"
            id="type"
            className="text-xl px-1 py-2 border-none outline-none text-black bg-[#d6c2c29d]"
            required
          >
            <option value="Federal">Federal</option>
            <option value="State">State</option>
            <option value="Polytechnic">Polytechnic</option>
          </select>
        </div>

        {/* School Name */}
        <div className="flex flex-col gap-1">
          <label htmlFor="school" className="text-xl mt-2">
            Enter School
          </label>
          <input
            id="school"
            name="school"
            className="text-xl px-1 py-2 border-none outline-none text-black bg-[#d6c2c29d]"
            type="text"
            placeholder="Enter School"
            required
          />
        </div>

        {/* Campuses */}
        <div className="flex flex-col gap-1">
          <label htmlFor="campus" className="text-xl mt-2">
            Enter Campuses
          </label>
          <div className="flex items-center gap-2">
            <input
              id="campus"
              className="text-xl px-1 py-2 border-none outline-none text-black bg-[#d6c2c29d] flex-grow"
              type="text"
              placeholder="Enter a campus and click Add"
              value={inputValue}
              onChange={handleInputChange}
            />
            <button
              type="button"
              onClick={handleAddCampus}
              className="px-3 py-2 bg-blue-500 hover:bg-blue-600 rounded"
            >
              Add
            </button>
          </div>
          <div className="flex flex-wrap gap-2">
            {campuses.map((campus, index) => (
              <div
                key={index}
                className="bg-blue-500 px-2 py-1 rounded flex items-center gap-2"
              >
                <span>{campus}</span>
                <button
                  type="button"
                  onClick={() => handleRemoveCampus(campus)}
                  className="text-red-300 hover:text-red-500"
                >
                  &times;
                </button>
              </div>
            ))}
          </div>
        </div>

        {/* Submit Button */}
        <button
          type="submit"
          className="w-full mt-3 p-2 text-lg border-none outline-none text-white bg-orange"
          disabled={loading}
        >
          {loading ? 'Loading...' : 'Add School'}
        </button>
      </form>

      {/* School List with Search */}
      <section>
        <h2 className="text-2xl font-bold mt-10">List of Schools ({filteredSchools?.length})</h2>
        <input
          type="text"
          placeholder="Search schools"
          value={searchTerm}
          onChange={handleSearchChange}
          className="w-full px-3 py-2 border rounded mt-4 mb-4"
        />
        <div>
          {filteredSchools?.length ? (
            filteredSchools.map((sch: any) => (
              <div key={sch._id} className="py-2 border-b">
                {sch.school}
              </div>
            ))
          ) : (
            <p>No schools found</p>
          )}
        </div>
      </section>
    </section>
  );
};

export default Page;
