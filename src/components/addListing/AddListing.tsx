'use client'

import React, {  useRef, useState } from 'react';
import { Filter_1, Filter_2, Filter_3, Filter_4 } from "../filter/Filte";
import SearchInstitute from "../Search/SearchInstitute";
import SecondaryBtn from "../buttons/SecondaryBtn";
import { useRouter } from 'next/navigation';
import { useSchoolProvider } from '@/lib/Context/SchholContext';
import { ListOfInstitutions } from "@/data/listOfInstitution";



const AddListing = ({email} : {email: string;}) => {
    const route = useRouter();
    const [errorMessage, setErrorMessage] = useState('');
    const [selectedCategory, setSelectedCategory] = useState('');
    const [loading, setLoading] = useState(false);
    // const [imageUrls, setImageUrls] = useState<string[]>([]);

    //useRef
    const categoryRef = useRef<HTMLSelectElement>(null);
    const imageRef = useRef<HTMLInputElement>(null); 
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

    const addList = async(e: any) => {
        e.preventDefault();

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
        const price = priceRef?.current?.value;
        const phone = phoneRef?.current?.value;
        const roommateName = roommateNameRef?.current?.value;
        const image = imageRef?.current?.files;

        const imageUrls : string[]= []

        if(image && image.length > 0) {
            if(image.length > 3){
                setErrorMessage("Maximum of 3 images.");
                return;
            }

            // const imageUrls: string[] = [];

            const files = Array.from(image); //convert FileList to Array clg img

            //mage upload
            try{
                for(const file of files) {
                    const formData = new FormData();
                    formData.append('file', file);
                    formData.append('upload_preset', process.env.NEXT_PUBLIC_UPLOAD_PRESET || "");

                    //for img process
                    const res = await fetch(`https://api.cloudinary.com/v1_1/${process.env.NEXT_PUBLIC_CLOUDINARY_CLOUD_NAME}/image/upload`, {
                        method : "POST",
                        body : formData,
                    }
                );
                    const data = await res.json();
                    imageUrls.push(data.secure_url)
                    console.log(imageUrls)
                }
            }catch(error){
                console.error('Error uploading images:', error);
                setErrorMessage('Error uploading images.');
                setLoading(false)
                return;
            }
        }else{
            console.log('NNo images selected');
        }


        //add listing api
        try {
            const res = await fetch("/api/listings", {
                method: "POST",
                headers: {
                    "Content-Type" : "application/json"
                },
                body: JSON.stringify({
                    category,
                    description, 
                    institution, 
                    image:imageUrls,
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
                })
            });

            if (res.status === 500) {
                throw new Error('Failed to add listing');
            }if (res.status === 200) {
                route.push('/');
            }
        } catch (error) {
            console.log("Error during listing:", error)
            setErrorMessage("Error during listing")
        }
    }

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
                    <p className='-mt-6 text-sm'>The first image will be the cover (max 5)</p>
                    <input 
                        name='images' 
                        type="file" 
                        accept='.jpg, .png, .jpeg'
                        ref={imageRef}
                        multiple
                        required
                    />
                    <div className="error">{errorMessage}</div>
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
                            <input type="number" ref={phoneRef} name="phoneNo" required />
                            </div>
                            </div>
                        </Filter_4>
                    )}
                </div>
                <h4 className='-mb-3'>Desciption</h4>
                <textarea ref={descriptionRef} className="border p-2 outline-none" name="description" rows={4} cols={50} required placeholder='Give important details'></textarea>

                <SecondaryBtn onClick={() => setLoading(true)} text='Add' loading={loading}/>
            </form>
            {/* <ToastContainer /> */}
        </div>
    );
}

export default AddListing;
