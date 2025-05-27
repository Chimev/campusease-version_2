'use client';


import React, { useState, useEffect, useRef } from 'react';
import { Filter_1, Filter_2, Filter_3, Filter_4 } from "../filter/Filte";
import SecondaryBtn from "../buttons/SecondaryBtn";
import { toast, ToastContainer } from "react-toastify";
import LoadingBackground from '../background/LoadingBackground';

interface formData {
    description?: string;
    accommodationName?: string;
    price?: string;
    phone?: string;
    accommodationType?: string;
    service?: string;
    propertyType?: string;
    property?: string;
    roommateName?: string;
    level?: string;
    gender?: string;
  }

const EditListing = ({ category, id, setShowBackground }:any) => {
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);
  const [list, setList] = useState<any>({});
  const [selectedPropertyType, setSelectedPropertyType] = useState('');
  
  // useRef for form fields
  const descriptionRef = useRef<HTMLTextAreaElement>(null);
  const accommodationNameRef = useRef<HTMLInputElement>(null);
  const priceRef = useRef<HTMLInputElement>(null);
  const phoneRef = useRef<HTMLInputElement>(null);
  const accommodationTypeRef = useRef<HTMLSelectElement>(null);
  const serviceTypeRef = useRef<HTMLSelectElement>(null);
  const propertyTypeRef = useRef<HTMLSelectElement>(null);
  // Explicitly type as HTMLSelectElement for the select dropdown
  const propertyRef = useRef<HTMLSelectElement>(null);
  const roommateNameRef = useRef<HTMLInputElement>(null);
  const levelRef = useRef<HTMLSelectElement>(null);
  const genderRef = useRef<HTMLSelectElement>(null);

  useEffect(() => {
    const fetchListing = async () => {
        setLoading(true);
        try {
            const res = await fetch(`/api/listings/${id}`);
            const data = await res.json();
            setList(data);
          } catch (err) {
            console.error("Failed to fetch listing:", err);
            setError("Could not load listing data.");
          } finally {
            setLoading(false);
          }
    };
    fetchListing();
  }, []);

  // Populate form fields on load
  useEffect(() => {
    if (list) {
      if (descriptionRef.current) descriptionRef.current.value = list.description || '';
      if (accommodationNameRef.current) accommodationNameRef.current.value = list.accommodationName || '';
      if (priceRef.current) priceRef.current.value = list.price || '';
      if (phoneRef.current) phoneRef.current.value = list.phone || '';
      if (accommodationTypeRef.current) accommodationTypeRef.current.value = list.accommodationType || '';
      if (serviceTypeRef.current) serviceTypeRef.current.value = list.service || '';
      if (propertyTypeRef.current) propertyTypeRef.current.value = list.propertyType || '';
      if (propertyRef.current) propertyRef.current.value = list.property || '';
      if (roommateNameRef.current) roommateNameRef.current.value = list.roommateName || '';
      if (levelRef.current) levelRef.current.value = list.level || '';
      if (genderRef.current) genderRef.current.value = list.gender || '';
      
      // Set the selected property type from the list data
      if (list.propertyType) {
        setSelectedPropertyType(list.propertyType);
      }
    }
  }, [list]);

  const updateListing = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError(''); 

    const formData: formData = {
      description: descriptionRef.current?.value || '',
      accommodationName: accommodationNameRef.current?.value || '',
      price: priceRef.current?.value || '',
      phone: phoneRef.current?.value || '',
      accommodationType: accommodationTypeRef.current?.value || '',
      service: serviceTypeRef.current?.value || '',
      propertyType: propertyTypeRef.current?.value || '',
      property: propertyRef.current?.value || '',
      roommateName: roommateNameRef.current?.value || '',
      level: levelRef.current?.value || '',
      gender: genderRef.current?.value || '',
    };

    // Remove irrelevant fields based on category
    if(category === 'accommodation'){
      delete formData.service;
      delete formData.property;
      delete formData.propertyType;
      delete formData.level;
      delete formData.gender;
      delete formData.roommateName;
    }
    if(category === 'service'){
      delete formData.accommodationName;
      delete formData.accommodationType;
      delete formData.price;
      delete formData.property;
      delete formData.propertyType;
      delete formData.level;
      delete formData.gender;
      delete formData.roommateName;
    }
    if(category === 'marketplace'){
      delete formData.accommodationName;
      delete formData.accommodationType;
      delete formData.service;
      delete formData.level;
      delete formData.gender;
      delete formData.roommateName;
    }
    if(category === 'roommate'){
      delete formData.accommodationName;
      delete formData.price;
      delete formData.accommodationType;
      delete formData.service;
      delete formData.property;
      delete formData.propertyType;
    }

   

    try {
      const res = await fetch(`/api/listings/${id}`, {
        method: "PATCH",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(formData),
      });

      if (!res.ok) throw new Error('Failed to update listing');

      const updatedData = await res.json();
      toast.success(updatedData.message)
      setShowBackground(false)
      
    } catch (error) {
      console.error('Error updating listing:', error);
      setError('An error occurred while updating your listing.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className='px-3 py-8 max-w-[350px] m-auto bg-white'>
      <h2 className="mb-3 text-xl text-center font-bold">Edit Listing</h2>
      <form onSubmit={updateListing} className='flex flex-col gap-5'>
        <div className="input">
          {category === 'accommodation' && (
            <Filter_1 accommodationTypeRef={accommodationTypeRef}>
              <div className="input">
                <label className="p-text">Accommodation Name</label>
                <input type="text" required ref={accommodationNameRef} placeholder='Accommodation Name' />
              </div>
              <div className="input">
                <label className="p-text">Price</label>
                <input type="number" required ref={priceRef} placeholder='Price' />
              </div>
              <div className="input">
                <label className="p-text">Phone</label>
                <input type="number" required ref={phoneRef} />
              </div>
            </Filter_1>
          )}
          {category === 'service' && (
            <Filter_2 serviceTypeRef={serviceTypeRef}>
              <div className="input">
                <label className="p-text">Phone</label>
                <input type="number" required ref={phoneRef} />
              </div>
            </Filter_2>
          )}
          {category === 'marketplace' && (
            <Filter_3 
              propertyTypeRef={propertyTypeRef} 
              propertyRef={propertyRef}
              selectedPropertyType={selectedPropertyType}
              setSelectedPropertyType={setSelectedPropertyType}>
              <div className="input">
                <label className="p-text">Price</label>
                <input type="number" required ref={priceRef} placeholder='Price' />
              </div>
              <div className="input">
                <label className="p-text">Phone</label>
                <input type="number" required ref={phoneRef} />
              </div>
            </Filter_3>
          )}
          {category === 'roommate' && (
            <Filter_4 levelRef={levelRef} genderRef={genderRef}>
              <div className="input">
                <label className="p-text">Name</label>
                <input type="text" required ref={roommateNameRef} placeholder='Your Name' />
              </div>
              <div className="input">
                <label className="p-text">Phone</label>
                <input type="tel" required ref={phoneRef} />
              </div>
            </Filter_4>
          )}
        </div>
        <h4 className='-mb-3'>Description</h4>
        <textarea ref={descriptionRef} className="border p-2 outline-none" rows={4} cols={50} required placeholder='Give important details'></textarea>
        <SecondaryBtn text='Update' loading={loading} />
      </form>
      {error && <p className="text-red-500 mt-2">{error}</p>}
      <ToastContainer />
      { loading && <LoadingBackground/> }
    </div>
  );
};

export default EditListing;
