import React from 'react';
import { propertyTypes } from "@/data/addListing/marketplace";

interface IFilter {
  children?: React.ReactNode;
  accommodationTypeRef?: React.RefObject<HTMLSelectElement | null>;
  serviceTypeRef?: React.RefObject<HTMLSelectElement | null>;
  propertyTypeRef?: React.RefObject<HTMLSelectElement | null>;
  levelRef?: React.RefObject<HTMLSelectElement | null>;
  genderRef?: React.RefObject<HTMLSelectElement | null>;
  setSelectedPropertyType?: React.Dispatch<React.SetStateAction<string>>;
  selectedPropertyType?: string;
  propertyRef?:any
}

export const Filter_1 = ({children, accommodationTypeRef}: IFilter) => {
  return (
    <>
    {children ??
      <div className="input">
        <label className="p-text">PRICE</label>
        <div className="flex gap-2">
          <input type="number" name="min" placeholder='Min' />
          <input type="number" name="max" placeholder='Max' />
        </div>
      </div>
    }
    <div>
      <label className="p-text">ACCOMMODATION TYPE</label>
      <select name="accommodationType" ref={accommodationTypeRef} required className="p-3 w-3/4 mb-5 bg-[#d6c2c29d]">
        <option>---</option>
        <option value="4 Bedroom">4 Bedroom</option>
        <option value="3 Bedroom">3 Bedroom</option>
        <option value="2 Bedroom">2 Bedroom</option>
        <option value="1 Bedroom">1 Bedroom</option>
        <option value="6 man Room">6 man Room</option>
        <option value="5 man Room">5 man Room</option>
        <option value="4 man Room">4 man Room</option>
        <option value="3 man Room">3 man Room</option>
        <option value="2 man Room">2 man Room</option>
        <option value="Single Room">Single Room</option>
        <option value="Self Contain">Self Contain</option>
        <option value="1 Room">1 Room</option>
      </select>
    </div>
    </>
  )
}

export const Filter_2 = ({children, serviceTypeRef}: IFilter) => {
  return (
    <>
    {children}
      <div className="flex flex-col">
        <label className="p-text">SERVICE TYPE</label>
        <select name="service" ref={serviceTypeRef} required className="p-3 w-fill bg-[#d6c2c29d]">
          <option>---</option>
          <option value="Academic-Assistant">Academic Assistance</option>
          <option value="Barber">Barber</option>
          <option value="Painter">Painter</option>
          <option value="Hairdresser">Hairdresser</option>
          <option value="Electrician">Electrician</option>
          <option value="Gifting Services">Gifting Services</option>
          <option value="Barker">Barker</option>
        </select>
      </div>
    </>
  )
}

export const Filter_3 = ({
  children,
  propertyTypeRef,
  setSelectedPropertyType,
  selectedPropertyType,
  propertyRef,
}: IFilter) => {
  const handlePropertyTypeChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    if (setSelectedPropertyType) {
      setSelectedPropertyType(e.target.value);
    }
  };

  // Filter and sort properties alphabetically
  const filteredProperties = propertyTypes
    .filter(item => item.propertyType === selectedPropertyType)
    .sort((a, b) => a.item.localeCompare(b.item));

    const filteredPropertyType = [...new Set(propertyTypes.map(prop => prop.propertyType))].sort()
    // console.log('first', filteredPropertyType)

  return (
    <>
      {children}
      <div className="flex flex-col">
        <label className="p-text">PROPERTY TYPE</label>
        <select
          name="propertyType"
          ref={propertyTypeRef}
          required
          className="p-3 w-fill bg-[#d6c2c29d]"
          onChange={handlePropertyTypeChange}
          value={selectedPropertyType || ""}
        >
          <option value="">---</option>
          {
            filteredPropertyType.map(prop => <option value={prop}>{prop}</option>)
          }
          {/* <option value="Electronics & Gadgets">Electronics & Gadgets</option>
          <option value="Furniture">Furniture</option>
          <option value="Kitchenware">Kitchenware</option>
          <option value="Personal Care & Essentials">Personal Care & Essentials</option> */}
        </select>
      </div>
      <div className="flex flex-col">
        <label className="p-text">PROPERTY</label>
        <select
          name="property"
          ref={propertyRef}
          required
          className="p-3 w-fill bg-[#d6c2c29d]"
          disabled={!selectedPropertyType}
        >
          <option value="">---</option>
          {filteredProperties.map((property, index) => (
            <option key={index} value={property.item}>
              {property.item}
            </option>
          ))}
        </select>
      </div>
    </>
  );
};

export const Filter_4 = ({children, levelRef, genderRef}: IFilter) => {
  return (
    <>
    {children}
    <div className="flex flex-col">
      <label className="p-text">LEVEL</label>
      <select ref={levelRef} required name="level">
        <option>---</option>
        <option value="level 1">Level 1</option>
        <option value="level 2">Level 2</option>
        <option value="level 3">Level 3</option>
        <option value="level 4">Level 4</option>
        <option value="level 5">Level 5</option>
        <option value="level 6">Level 6</option>
        <option value="level 7">Level 7</option>
      </select>
    </div>
    <div className="flex flex-col">
      <label className="p-text">GENDER</label>
      <select ref={genderRef} required name="gender">
        <option>---</option>
        <option value="male">Male</option>
        <option value="female">Female</option>
      </select>
    </div>
    </>
  )
}