'use client'

import React, { useState } from 'react';
import { Filter_1, Filter_2, Filter_3, Filter_4 } from "../filter/Filte";
import { SchoolContextProvider } from "@/lib/Context/SchholContext";
import SearchInstitute from "../Search/SearchInstitute";
import SecondaryBtn from "../buttons/SecondaryBtn";

const AddListing = () => {
    const [errorMessage, setErrorMessage] = useState('');
    const [selectedCategory, setSelectedCategory] = useState('');
    // const [imageFiles, setImageFiles] = useState([]);

    const handleCategoryChange = (event: React.ChangeEvent<HTMLSelectElement>) => {
        setSelectedCategory(event.target.value);
    };

    const addList = (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        //
    }

    // const handleImageChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    //     const files = event.target.files;
    //     if (files.length < 2 || files.length > 5) {
    //         setErrorMessage("Images should be more than 2 and less than 5");
    //     } else {
    //         setErrorMessage('');
    //     }
    //     setImageFiles(files);
    // };

    return (
        <div className='px-3 py-8 sm:max-w-[500px] sm:m-auto'>
            <hr className="bg-orange border-none h-2 w-20 " />
            <h2 className="mb-10  text-3xl relative font-bold">Add Listing</h2>
            <form onSubmit={addList} className='flex flex-col gap-5'>
                <div>
                    <p>CATEGORY</p>
                    <select className='w-full' name='category' onChange={handleCategoryChange}>
                        <option value="">---</option>
                        <option value="Accommodation">Accommodation</option>
                        <option value="Service">Service</option>
                        <option value="Property">Property</option>
                        <option value="Roommate">Roommate</option>
                    </select>
                </div>

                <div className="input">
                    <p>IMAGE</p>
                    <p className='-mt-6 text-sm'>The first image will be the cover (max 5)</p>
                    <input 
                        name='images' 
                        type="file" 
                        accept='.jpg, .png, .jpeg'
                        multiple
                        required
                    />
                    <div className="error">{errorMessage}</div>
                </div>

                <div className="flex flex-col w-10/12">
                    <SchoolContextProvider>
                        <SearchInstitute />
                    </SchoolContextProvider>
                </div>

                <div className="input">
                    {selectedCategory === 'Accommodation' && (
                        <Filter_1>
                            <div className="input">
                                <label className="p-text">ACCOMMODATION NAME</label>
                                <div className="price">
                                    <input type="text" name="accommodationName" placeholder='Accommodation Name' />
                                </div>
                            </div>
                            <div className="input">
                                <label className="p-text">PRICE</label>
                                <div className="price">
                                    <input type="number" name="price" placeholder='Price' />
                                </div>
                            </div>
                            <div className="input">
                                <label className="p-text">PHONE</label>
                                <div className="price">
                                    <input type="number" name="phoneNo" />
                                </div>
                            </div>
                        </Filter_1>
                    )}
                    {selectedCategory === 'Service' && (
                        <Filter_2>
                            <div className="input">
                                <label className="p-text">PHONE</label>
                                <div className="price">
                                    <input type="number" name="phoneNo" />
                                </div>
                            </div>
                        </Filter_2>
                    )}
                    {selectedCategory === 'Property' && (
                        <Filter_3>
                            <div className="input">
                            <label className="p-text">PRICE</label>
                            <div className="price">
                            <input type="number" name="price"  placeholder='Price'/>
                            </div>
                            <div className="input">
                            <label className="p-text">phone</label>
                            <div className="price">
                            <input type="number" name="phoneNo" />
                            </div>
                            </div>
                            </div>
                        </Filter_3>
                    )}
                    {selectedCategory === 'Roommate' && (
                        <Filter_4>
                            <div className="input">
                            <label className="p-text">Name</label>
                            <div className="price">
                            <input type="text" name="roommateName"  placeholder='Your Name'/>
                            </div>
                            </div>
                            <div className="input">
                            <label className="p-text">phone</label>
                            <div className="price">
                            <input type="number" name="phoneNo"  />
                            </div>
                            </div>
                        </Filter_4>
                    )}
                </div>

                {selectedCategory !== 'Service' && (
                        <textarea className="border p-2 outline-none" name="description" rows={4} cols={50} placeholder='Give important details'></textarea>
                )}

                <SecondaryBtn text='Add'/>
            </form>
            {/* <ToastContainer /> */}
        </div>
    );
}

export default AddListing;
