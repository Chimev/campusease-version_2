'use client'

import React, {  useRef, useState } from 'react';
import { Filter_1, Filter_2, Filter_3, Filter_4 } from "../filter/Filte";
import SearchInstitute from "../Search/SearchInstitute";
import SecondaryBtn from "../buttons/SecondaryBtn";
import { useRouter } from 'next/navigation';
import { useSchoolProvider } from '@/lib/Context/SchholContext';
import { ListOfInstitutions } from "@/data/listOfInstitution";
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { uploadImagesToCloudinary } from '@/lib/functions/uploadCloudinary';
import { addListing } from '@/lib/functions/addLiisting';
import LoadingBackground from '../background/loadingBackground';



const AddListing = ({name, email} : {name: string; email:string;}) => {
    const route = useRouter();
    const [errorMessage, setErrorMessage] = useState('');
    const [selectedCategory, setSelectedCategory] = useState('');
    const [loading, setLoading] = useState(false);
    // const [imageUrls, setImageUrls] = useState<string[]>([]);

    //useRef
    const categoryRef = useRef<HTMLSelectElement>(null);
    const imageRef = useRef<HTMLInputElement | null>(null);
    const institutionRef = useRef<HTMLSelectElement>(null);
    const typeRef = useRef<HTMLSelectElement>(null);
    const campusRef = useRef<HTMLSelectElement>(null);
    const descriptionRef = useRef<HTMLTextAreaElement>(null);
    const accommodationNameRef = useRef<HTMLInputElement>(null);
    const priceRef = useRef<HTMLInputElement>(null);
    const phoneRef = useRef<HTMLInputElement>(null);
    const accommodationTypeRef = useRef<HTMLSelectElement>(null);
    const serviceTypeRef = useRef<HTMLSelectElement>(null);
    const propertyTypeRef = useRef<HTMLSelectElement>(null);
    const roommateNameRef = useRef<HTMLInputElement>(null);
    const levelRef = useRef<HTMLSelectElement>(null);
    const genderRef = useRef<HTMLSelectElement>(null);


    //For my serchINstution form
  //------START-----//
  const value = useSchoolProvider();

  const changeType = (e: React.ChangeEvent<HTMLSelectElement>) => {
      const selectedType = e.target.value;
      const selectedInstitutions = ListOfInstitutions.find(int => int.type === selectedType)?.institution || [];
      
      value?.setType(selectedType);
      value?.setInstitutions(selectedInstitutions);
      value?.setInstitution(''); // Reset institution and campus on type change
      value?.setCampus('');
  };

  const changeInstitution = (e: React.ChangeEvent<HTMLSelectElement>) => {
      const selectedInstitution = e.target.value;
      const selectedCampus = value?.institutions.find(int => int.school === selectedInstitution)?.campus || [];
      
      value?.setInstitution(selectedInstitution);
      value?.setCampuses(selectedCampus);
      value?.setCampus(''); // Reset campus on institution change
  };

  const changeCampus = (e: React.ChangeEvent<HTMLSelectElement>) => {
      value?.setCampus(e.target.value);
  };

  // ----END------//


   
    // const [imageFiles, setImageFiles] = useState([]);

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
        const accommodationName = accommodationNameRef?.current?.value;
        const service = serviceTypeRef?.current?.value;
        const property = propertyTypeRef?.current?.value;
        const level = levelRef?.current?.value;
        const gender = genderRef?.current?.value;
        const price = priceRef?.current?.value?.toString();
        const phone = phoneRef?.current?.value;
        const roommateName = roommateNameRef?.current?.value;
    
        // Handle image uploads
        const imageFiles = imageRef?.current?.files;
    
        if (!imageFiles || imageFiles.length !== 3) {
            setErrorMessage("Please upload exactly 3 images.");
            setLoading(false);
            return;
        }
    
        try {
            const uploadedImages = await uploadImagesToCloudinary(imageFiles);
            console.log(uploadedImages)
    
            if (!uploadedImages.length) {
                setErrorMessage("Failed to upload images.");
                setLoading(false);
                return;
            }
    
            const listing = {
                category,
                description,
                institution,
                type,
                campus,
                accommodationName,
                accommodationType,
                service,
                property,
                roommateName,
                level,
                gender,
                price,
                phone,
                email,
                name,
                isFavorite: false,
                image: uploadedImages, // Use uploaded image URLs
            }
            // Proceed with adding the listing via API function
            const res = await addListing(listing);
            console.log(res)
            if (!res.ok) {
                setLoading(false);
            }
            toast.success("Listing added successfully!");
            route.push('/profile');
        } catch (error) {
            if(error instanceof Error){
                if(error.message === "Upload failed: File size too large. Got 12503874. Maximum is 10485760. Upgrade your plan to enjoy higher limits https://www.cloudinary.com/pricing/upgrades/file-limit"){
                    toast.error("Image size to large. Upload less than 8MB")
                }
            }
            console.error("Error during listing:", error);
            toast.error("Error during listing.");
        } finally {
            setLoading(false);
        }
    };
    
    

    return (
        <div className='px-3 py-8 sm:max-w-[500px] sm:m-auto'>
            <hr className="bg-orange border-none h-2 w-20 " />
            <h2 className="mb-10  text-3xl relative font-bold">Add Listing</h2>
            <form onSubmit={addList} className='flex flex-col gap-5'>
                <div>
                    <p>CATEGORY</p>
                    <select className='w-full' name='category' required onChange={handleCategoryChange} ref={categoryRef} >
                        <option value="">---</option>
                        <option value="accommodation">Accommodation</option>
                        <option value="service">Service</option>
                        <option value="property">Property</option>
                        <option value="roommate">Roommate</option>
                    </select>
                </div>

                <div className="input">
                    <p>IMAGE</p>
                    <p className='-mt-6 text-sm'>The first image will be the cover (max 3)</p>
                    <input 
                        name='images' 
                        type="file" 
                        accept='.jpg, .png, .jpeg'
                        ref={imageRef}
                        multiple
                        required
                    />
                    <div className="-mt-6 text-red-600 text-[16px]  ">{errorMessage}</div>
                </div>

                <div className="flex flex-col w-10/12">
                <h4>Select School</h4>
                    
                <SearchInstitute typeRef={typeRef} institutionRef={institutionRef} campusRef={campusRef} value={value} changeType={changeType} changeInstitution={changeInstitution} changeCampus={changeCampus}/>
                </div>

                <div className="input">
                    {selectedCategory === 'accommodation' && (
                        <Filter_1 accommodationTypeRef={accommodationTypeRef}>
                            <div className="input">
                                <label className="p-text">ACCOMMODATION NAME</label>
                                <div className="price">
                                    <input type="text" required ref={accommodationNameRef} name="accommodationName" placeholder='Accommodation Name' />
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
                                    <input type="number" required ref={phoneRef} name="phoneNo" />
                                </div>
                            </div>
                        </Filter_1>
                    )}
                    {selectedCategory === 'service' && (
                        <Filter_2 serviceTypeRef={serviceTypeRef}>
                            <div className="input">
                                <label className="p-text">PHONE</label>
                                <div className="price">
                                    <input type="number" required ref={phoneRef} name="phoneNo" />
                                </div>
                            </div>
                        </Filter_2>
                    )}
                    {selectedCategory === 'property' && (
                        <Filter_3 propertyTypeRef={propertyTypeRef}>
                            <div className="input">
                            <label className="p-text">PRICE</label>
                            <div className="price">
                            <input type="number" ref={priceRef} required name="price"  placeholder='Price'/>
                            </div>
                            <div className="input">
                            <label className="p-text">phone</label>
                            <div className="price">
                            <input type="number" ref={phoneRef} required name="phoneNo" />
                            </div>
                            </div>
                            </div>
                        </Filter_3>
                    )}
                    {selectedCategory === 'roommate' && (
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
                <h4 className='-mb-3'>Desciption</h4>
                <textarea ref={descriptionRef} className="border p-2 outline-none" name="description" rows={4} cols={50} required placeholder='Give important details'></textarea>

                <SecondaryBtn text='Add' loading={loading}/>
            </form>
            <ToastContainer />
            {loading ? <LoadingBackground/> : null }
            
        </div>
    );
}

export default AddListing;
