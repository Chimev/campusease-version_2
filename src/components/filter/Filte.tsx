interface IFilter {
  children?: React.ReactNode;
  accommodationTypeRef?: React.RefObject<HTMLSelectElement>;
  serviceTypeRef?  : React.RefObject<HTMLSelectElement>;
  propertyTypeRef? : React.RefObject<HTMLSelectElement>;
  levelRef? : React.RefObject<HTMLSelectElement>;
  genderRef? : React.RefObject<HTMLSelectElement>;
}



export const Filter_1 = ({children, accommodationTypeRef}: IFilter) => {
return (
  <>
  {children ??
     <div className="input">
      <label className="p-text">PRICE</label>
      <div className="flex gap-2">
          <input type="number" name="min"  placeholder='Min'   />
          <input type="number" name="max" placeholder='Max'  />
      </div>
     </div>
  }
    <div>
        <label className="p-text">ACCOMMODATION TYPE</label>
        <select name="accommodationType" ref={accommodationTypeRef} className="p-3 w-3/4 mb-5 bg-[#d6c2c29d]">
          <option>---</option>
          <option value="4 Bedroom">4 Bedroom </option>
          <option value="3 Bedroom">3 Bedroom </option>
          <option value="2 Bedroom">2 Bedroom </option>
          <option value="1 Bedroom">1 Bedroom </option>
          <option value="Self Contain">Self Contain</option>
          <option value="1 Room">1 Room</option>
        </select>
    </div>

  </>
)
}

export const Filter_2 = ({children, serviceTypeRef}: IFilter) => {
  // const onChange = (e) => {
  //     setFilter_1(prev => ({
  //             ...prev,
  //             [e.target.name] : e.target.value
  //         }))
  // }
  return (
    <>
    {children}
      <div className="flex flex-col">
          <label className="p-text">SERVICE TYPE</label>
          <select name="service" ref={serviceTypeRef} className="p-3 w-fill bg-[#d6c2c29d]" >
              <option>---</option>
              <option value="Barber">Barber</option>
              <option value="Painter">Painter</option>
              <option value="Hairdresser">Hairdresser</option>
              <option value="Electrician">Electrician</option>
          </select>
      </div>
    </>
  )
}

export const Filter_3 = ({children, propertyTypeRef}: IFilter) => {
  // const onChange = (e) => {
  //     setFilter_1(prev => ({
  //             ...prev,
  //             [e.target.name] : e.target.value
  //         }))
  // }
return (
  <>
  {children}
  <div className="flex flex-col">
      <label className="p-text">PROPERTY TYPE</label>
      <select name="property" ref={propertyTypeRef} className="p-3 w-fill bg-[#d6c2c29d]" >
          <option>---</option>
          <option value="chair">Chair</option>
          <option value="table">Table</option>
          <option value="fan">Fan</option>
      </select>
  </div>
  </>
)
}

export const Filter_4 = ({children, levelRef, genderRef}: IFilter) => {
  // const onChange = (e) => {
  //     setFilter_1(prev => ({
  //             ...prev,
  //             [e.target.name] : e.target.value
  //         }))
  // }

return (
  <>
  {children}
  <div className="flex flex-col">
      <label className="p-text">LEVEL</label>
      <select ref={levelRef} name="level" >
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
      <select ref={genderRef} name="gender">
          <option>---</option>
          <option value="male">Male</option>
          <option value="female">Female</option>
      </select>
  </div>
  </>
)
}
