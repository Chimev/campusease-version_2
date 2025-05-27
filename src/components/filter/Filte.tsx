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
        <option key="default">---</option>
        <option key="4-bedroom" value="4 Bedroom">4 Bedroom</option>
        <option key="3-bedroom" value="3 Bedroom">3 Bedroom</option>
        <option key="2-bedroom" value="2 Bedroom">2 Bedroom</option>
        <option key="1-bedroom" value="1 Bedroom">1 Bedroom</option>
        <option key="6-man-room" value="6 man Room">6 man Room</option>
        <option key="5-man-room" value="5 man Room">5 man Room</option>
        <option key="4-man-room" value="4 man Room">4 man Room</option>
        <option key="3-man-room" value="3 man Room">3 man Room</option>
        <option key="2-man-room" value="2 man Room">2 man Room</option>
        <option key="single-room" value="Single Room">Single Room</option>
        <option key="self-contain" value="Self Contain">Self Contain</option>
        <option key="1-room" value="1 Room">1 Room</option>
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
          <option key="default">---</option>
          <option key="academic-assistant" value="Academic-Assistant">Academic Assistance</option>
          <option key="barber" value="Barber">Barber</option>
          <option key="painter" value="Painter">Painter</option>
          <option key="hairdresser" value="Hairdresser">Hairdresser</option>
          <option key="electrician" value="Electrician">Electrician</option>
          <option key="gifting-services" value="Gifting Services">Gifting Services</option>
          <option key="barker" value="Barker">Barker</option>
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
            filteredPropertyType.map(prop => <option key={prop} value={prop}>{prop}</option>)
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
            <option key={property.item} value={property.item}>
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
        <option key="default">---</option>
        <option key="level-1" value="level 1">Level 1</option>
        <option key="level-2" value="level 2">Level 2</option>
        <option key="level-3" value="level 3">Level 3</option>
        <option key="level-4" value="level 4">Level 4</option>
        <option key="level-5" value="level 5">Level 5</option>
        <option key="level-6" value="level 6">Level 6</option>
        <option key="level-7" value="level 7">Level 7</option>
      </select>
    </div>
    <div className="flex flex-col">
      <label className="p-text">GENDER</label>
      <select ref={genderRef} required name="gender">
        <option key="default">---</option>
        <option key="male" value="male">Male</option>
        <option key="female" value="female">Female</option>
      </select>
    </div>
    </>
  )
}