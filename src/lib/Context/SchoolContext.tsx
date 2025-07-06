'use client';

import {
  createContext,
  useContext,
  useEffect,
  useMemo,
  useState,
  ReactNode,
} from 'react';
import { getSchools } from '../functions/schools/getSchools';

interface School {
  _id: string;
  school: string;
  type: string;
  campuses: string[];
  __v: number;
}

interface SchoolContextType {
  schools: School[];
  selectedType: string;
  uniqueTypes: string[];
  setSelectedType: (type: string) => void;
  setFilteredSchool: any;
  filteredSchool: any;
  setSelectedSchool:any;
    selectedSchool:any;
}

export const SchoolContext = createContext<SchoolContextType | null>(null);

export const SchoolContextProvider = ({ children }: { children: ReactNode }) => {
  const [schools, setSchools] = useState<School[]>([]);
  const [selectedType, setSelectedType] = useState('');
  const [selectedSchool, setSelectedSchool] = useState('');
  const [filteredSchool, setFilteredSchool] = useState([])

  const uniqueTypes = [...new Set(schools.map((school) => school.type))];

  useEffect(() => {
    const fetchSchools = async () => {
      try {
        const data = await getSchools();
        setSchools(data);
      } catch (error) {
        console.error('Failed to fetch schools:', error);
      }
    };
    fetchSchools();
  }, []);

  const value: SchoolContextType = {
    schools,
    selectedType,
    uniqueTypes,
    setSelectedType,
    setFilteredSchool,
    filteredSchool,
    setSelectedSchool,
    selectedSchool
  };

  return (
    <SchoolContext.Provider value={value}>
      {children}
    </SchoolContext.Provider>
  );
};

// Custom Hook
export const useSchoolContext = () => {
  const context = useContext(SchoolContext);
  if (!context) {
    throw new Error('useSchoolContext must be used within a SchoolContextProvider');
  }
  return context;
};
