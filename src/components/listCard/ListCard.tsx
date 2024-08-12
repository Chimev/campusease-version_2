'use client'

import React, { useState } from 'react'
import Moment from "react-moment";
import { MdDelete } from "react-icons/md";
import { MdEdit } from "react-icons/md";
import { TbCurrencyNaira } from "react-icons/tb";
import { FaPhoneAlt } from "react-icons/fa";

const ListCard = ({listing, id, onDelete, onEdit, profile}) => {
  return (
    <li className='list-card'> 
         <div className="wrapper">
         {/* <img src={listing.imgUrls[0]} alt="" /> */}
        
    
        {/* <Moment fromNow className='time'>
          {listing.timestamp?.toDate()}
        </Moment> */}

        <div className='info'>
          <p className='category'>{listing.category}</p>
          
          <div className="school">
          <p><span>Institution Type: </span>{listing.type}</p>
          <p><span>School: </span>{listing.institution}</p>
          <p><span>Campus: </span>{listing.campus}</p>
          </div>
          
          {listing.category === 'Accommodation' 
          ? <>
          <p className='name'><span>Name: </span>{listing.accommodationName}</p>
          <p className='price'><span>Price: </span><TbCurrencyNaira className='naira' />{listing.price.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",")}</p>
          <p><span>Type: </span>{listing.accommodationType}</p>
          </> : ''
          }
          {listing.category === 'Service' 
          ? <>
          <p><span>Service: </span>{listing.service}</p>
          </> : ''
          }
          {listing.category === 'Property' 
          ? <>
          <p><span>Property: </span>{listing.property}</p>
          <p className='price'><span>Price: </span><TbCurrencyNaira className='naira' />{listing.price.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",")}</p>
          </> : ''
          }
          {listing.category === 'Roommate' 
          ? <>
          <p className='name'><span>Name: </span>{listing.roommateName}</p>
          <p><span>Gender: </span>{listing.gender}</p>
          <p><span>Level: </span>{listing.level}</p>
          </> : ''
          }
          <p><span><FaPhoneAlt />  </span>{listing.phoneNo}</p>
          <p><span>Description: </span>{listing.description}</p>
          
        </div>
        {
          profile && 
          <div className="edit">
            {/* <MdEdit onClick={() => onEdit(listing.id)} /> */}
            <MdDelete className='delete' onClick={() => onDelete(listing.id)} />
          </div>  
        }
         </div>
        
      </li>
  )
}

export default ListCard;