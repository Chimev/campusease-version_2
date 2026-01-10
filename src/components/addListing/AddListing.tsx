'use client'

import React, { useRef, useState } from 'react';
import { Filter_1, Filter_2, Filter_3, Filter_4 } from "../filter/Filte";
import SearchInstitute from "../Search/SearchInstitute";
import SecondaryBtn from "../buttons/SecondaryBtn";
import { useRouter } from 'next/navigation';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import LoadingBackground from '../background/LoadingBackground';
import { deleteUploadedImage } from '@/lib/functions/listings/image/deleteUploadedImage';





const AddListing = ({name, email, role} : {name: string; email:string; school:string; role:string[]}) => {
    const route = useRouter();
    const [errorMessage, setErrorMessage] = useState('');
    const [selectedCategory, setSelectedCategory] = useState('');
    const [loading, setLoading] = useState(false);
    const [selectedPropertyType, setSelectedPropertyType] = useState('')
   

     
    
    // Get available categories based on user role
    const getAvailableCategories = () => {
        const isAgent = role.includes('agent');
        const isStudent = role.includes('student');
        const isService = role.includes('service');
        const isRoommate = role.includes('roommate');
        
        // Agent only
        if (isAgent && !isStudent && !isService && !isRoommate) {
            return ['accommodation', 'marketplace'];
        }
        
        // Agent + Student
        if (isAgent && isStudent && !isService && !isRoommate) {
            return ['roommate', 'accommodation'];
        }
        
        // Agent + Service
        if (isAgent && isService && !isStudent && !isRoommate) {
            return ['service', 'accommodation', 'marketplace'];
        }
        
        // Service + Student
        if (isService && isStudent && !isAgent && !isRoommate) {
            return ['marketplace', 'service', 'roommate'];
        }
        
        // Service only
        if (isService && !isAgent && !isStudent && !isRoommate) {
            return ['service', 'marketplace'];
        }
        
        // Student only
        if (isStudent && !isAgent && !isService && !isRoommate) {
            return ['roommate', 'marketplace'];
        }
        
        // Roommate + Service
        if (isRoommate && isService && !isAgent && !isStudent) {
            return ['service', 'marketplace', 'roommate'];
        }
        
        // Agent + Roommate
        if (isAgent && isRoommate && !isService && !isStudent) {
            return ['accommodation', 'roommate', 'marketplace'];
        }
        
        // Default - show all categories if no specific combination matches or no roles provided
        return ['accommodation', 'service', 'marketplace', 'roommate'];
    };

    const availableCategories = getAvailableCategories();

    //useRef
    const categoryRef = useRef<HTMLSelectElement>(null);
    const imageRef = useRef<HTMLInputElement | null>(null);
    const institutionRef = useRef<HTMLSelectElement>(null);
    const typeRef = useRef<HTMLSelectElement>(null);
    const campusRef = useRef<HTMLSelectElement>(null);
    const descriptionRef = useRef<HTMLTextAreaElement>(null);
    const accommodationTitleRef = useRef<HTMLInputElement>(null);
    const videoRef = useRef<HTMLInputElement>(null);
    const priceRef = useRef<HTMLInputElement>(null);
    const phoneRef = useRef<HTMLInputElement>(null);
    const accommodationTypeRef = useRef<HTMLSelectElement>(null);
    const serviceTypeRef = useRef<HTMLSelectElement>(null);
    const propertyTypeRef = useRef<HTMLSelectElement>(null);
    const propertyRef = React.useRef<HTMLSelectElement>(null);
    const roommateNameRef = useRef<HTMLInputElement>(null);
    const levelRef = useRef<HTMLSelectElement>(null);
    const genderRef = useRef<HTMLSelectElement>(null);


 

    const handleCategoryChange = (event: React.ChangeEvent<HTMLSelectElement>) => {
        setSelectedCategory(event.target.value);
    };

    const addList = async (e: any) => {
        e.preventDefault();
        setLoading(true);

        const category = categoryRef?.current?.value;
        const description = descriptionRef?.current?.value;
        const institution = institutionRef?.current?.value;
        const type = typeRef?.current?.value;
        const campus = campusRef?.current?.value;
        const accommodationType = accommodationTypeRef?.current?.value;
        const accommodationTitle = accommodationTitleRef?.current?.value;
        const videoLink = videoRef?.current?.value || "";
        const service = serviceTypeRef?.current?.value;
        const propertyType = propertyTypeRef?.current?.value;
        const property = propertyRef?.current?.value;
        const level = levelRef?.current?.value;
        const gender = genderRef?.current?.value;
        const price = priceRef?.current?.value?.toString();
        const phone = phoneRef?.current?.value;
        const roommateName = roommateNameRef?.current?.value;

        // Handle image uploads
        const imageFiles = imageRef?.current?.files;

        if (!imageFiles || imageFiles.length < 3) {
            setErrorMessage("Please upload minimum of 3.");
            setLoading(false);
            return;
        }

        let uploadedImages: Array<{ url: string; publicId: string }> = [];

        try {
            //Uplaod Images
            const uploadImagesArray = async (imageFiles: FileList) => {
                const cloudName = process.env.NEXT_PUBLIC_CLOUDINARY_CLOUD_NAME;
                const uploadPreset = process.env.NEXT_PUBLIC_UPLOAD_PRESET;

                const uploads = Array.from(imageFiles).map(async (file) => {
                    const formData = new FormData();
                    formData.append("file", file);
                    formData.append("upload_preset", uploadPreset!);

                    const res = await fetch(
                    `https://api.cloudinary.com/v1_1/${cloudName}/image/upload`,
                    { method: "POST", body: formData }
                    );

                    const data = await res.json();
                    return {
                    url: data.secure_url,
                    publicId: data.public_id,
                    };
                });

                return await Promise.all(uploads);
            };

            uploadedImages = await uploadImagesArray(imageFiles);



            // Enable roommate notification if needed
            if (category === 'roommates') {
                const res = await fetch('/api/notifications', {
                    method: 'POST',
                    headers: { 'Content-Type': 'application/json' },
                    body: JSON.stringify({ category: 'roommates', enabled: true }),
                });

                if (!res.ok) {
                    throw new Error('Failed to enable roommate notifications');
                }
            }
                        
            // Send to backend API
            const response = await fetch('/api/listings', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({
                    category,
                    description,
                    institution,
                    type,
                    campus,
                    email,
                    name,
                    accommodationTitle,
                    videoLink,
                    accommodationType,
                    service,
                    propertyType,
                    property,
                    roommateName,
                    level,
                    gender,
                    price,
                    phone,
                    image: uploadedImages 
                }),
            });

            const data = await response.json();

            if (!response.ok) {
                throw new Error(data.message || 'Failed to add listing');
            }

            

            toast.success("Listing added successfully!");
            route.push('/profile');
        } catch (error) {
            console.error("Error during listing:", error);

            // Delete uploaded images if listing fails
            if (uploadedImages && uploadedImages.length > 0) {
                for (const img of uploadedImages) {
                    try {
                        await deleteUploadedImage(img.publicId); // <-- call your helper
                    } catch (err) {
                        console.error("Failed to delete image:", img.publicId, err);
                    }
                }
            }

            if (error instanceof Error) {
                toast.error(error.message || "Error during listing.");
            } else {
                toast.error("Error during listing.");
            }
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className='px-3 py-8 sm:max-w-[500px] sm:m-auto'>
            <hr className="bg-orange border-none h-2 w-20 " />
            <h2 className="mb-10 text-3xl relative font-bold">Add Listing</h2>
            <form onSubmit={addList} className='flex flex-col gap-5'>
                <div>
                    <p>CATEGORY</p>
                    <select className='w-full' name='category' required onChange={handleCategoryChange} ref={categoryRef} >
                        <option value="">---</option>
                        {availableCategories.includes('accommodation') && (
                            <option value="accommodation">Accommodation</option>
                        )}
                        {availableCategories.includes('service') && (
                            <option value="services">Service</option>
                        )}
                        {availableCategories.includes('marketplace') && (
                            <option value="marketplace">MarketPlace</option>
                        )}
                        {availableCategories.includes('roommate') && (
                            <option value="roommates">Roommate</option>
                        )}
                    </select>
                </div>

                {/* Image */}
                <div className="input">
                    <p>IMAGE</p>
                    <p className='-mt-5 text-xs'>
                       <b>Add at least 5 photos</b><br/>
                       First picture - is the title picture. You can change the order of photos: just grab your photos and drag
                    </p>
                    <input 
                        name='images' 
                        type="file" 
                        accept='image/*'
                        ref={imageRef}
                        multiple
                        required
                    />
                    <div className="-mt-6 text-red-600 text-[16px]">{errorMessage}</div>
                </div>

                <div className="flex flex-col w-10/12">
                <h4>Select School</h4>
                    
                <SearchInstitute typeRef={typeRef} institutionRef={institutionRef} campusRef={campusRef} />
                </div>

                <div className="input">
                    {selectedCategory === 'accommodation' && (
                        <Filter_1 accommodationTypeRef={accommodationTypeRef}>
                            <div className="input">
                                <label className="p-text">ACCOMMODATION TITLE</label>
                                <div className="price">
                                    <input type="text" required ref={accommodationTitleRef} name="accommodationTitle" placeholder='Accommodation Name' />
                                </div>
                            </div>
                            <div className="input">
                                <label className="p-text">VIDEO LINK <span className='text-xs'>
                       (optional)
                    </span></label>
                                <div className="price">
                                    <input type="text"  ref={videoRef} name="accommodationName" placeholder='Add the video link (from any social media)' />
                                </div>
                            </div>
                            <div className="input">
                                <label className="p-text">PRICE</label>
                                <div className="price">
                                    <input type="number" required ref={priceRef} name="price" placeholder='Price' />
                                </div>
                            </div>
                            <div className="input">
                                <label className="p-text">PHONE</label>
                                <div className="price">
                                    <input type="tel" required ref={phoneRef} name="phoneNo" />
                                </div>
                            </div>
                        </Filter_1>
                    )}
                    {selectedCategory === 'services' && (
                        <Filter_2 serviceTypeRef={serviceTypeRef}>
                            <div className="input">
                                <label className="p-text">PHONE</label>
                                <div className="price">
                                    <input type="tel" required ref={phoneRef} name="phoneNo" />
                                </div>
                            </div>
                        </Filter_2>
                    )}
                    {selectedCategory === 'marketplace' && (
                        <Filter_3 propertyTypeRef={propertyTypeRef} propertyRef={propertyRef} setSelectedPropertyType={setSelectedPropertyType} selectedPropertyType={selectedPropertyType}>
                            <div className="input">
                                <label className="p-text">PRICE</label>
                                <div className="price">
                                    <input type="number" ref={priceRef} required name="price"  placeholder='Price'/>
                                </div>
                                <div className="input">
                                    <label className="p-text">phone</label>
                                    <div className="price">
                                        <input type="tel" ref={phoneRef} required name="phoneNo" />
                                    </div>
                                </div>
                            </div>
                        </Filter_3>
                    )}
                    {selectedCategory === 'roommates' && (
                        <Filter_4 levelRef={levelRef} genderRef={genderRef}>
                            <div className="input">
                            <label className="p-text">Name</label>
                            <div className="price">
                            <input type="text" ref={roommateNameRef} name="roommateName" required  placeholder='Your Name'/>
                            </div>
                            </div>
                            <div className="input">
                            <label className="p-text">phone</label>
                            <div className="price">
                            <input type="tel" ref={phoneRef} name="phoneNo" required />
                            </div>
                            </div>
                        </Filter_4>
                    )}
                </div>
                <h4 className='-mb-3'>Description</h4>
                <textarea ref={descriptionRef} className="border p-2 outline-none" name="description" rows={4} cols={50} required placeholder='Give important details'></textarea>

                <SecondaryBtn text='Add' loading={loading}/>
            </form>
            <ToastContainer />
            {loading ? <LoadingBackground/> : null }
            
        </div>
    );
}

export default AddListing;