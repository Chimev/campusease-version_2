'use client';

import React from 'react';
import { CiEdit } from 'react-icons/ci';
import { MdDelete, MdCheckCircle, MdCancel, MdPending } from 'react-icons/md';
import Image from 'next/image';

interface Notification {
  _id: string;
  category?: string;
  email?: string;
  createdAt: string;
  enabled?: any;
}

interface NotificationTableProps {
  notifications: Notification[];
  currentPage?: number;
  limit?: number;
  setNotificationData?: any;
  setLoading?: any;
}

const NotificationTable = ({
  notifications,
  setNotificationData,
  currentPage = 1,
  limit = 10,
  setLoading
}: NotificationTableProps) => {

//   const handleDelete = async (id: string) => {
//     setLoading(true);
//     try {
//       const res = await fetch(`/api/listings/${id}`, {
//         method: 'DELETE',
//         headers: {
//           'Content-Type': 'application/json'
//         }
//       });
//       if (res.ok) {
//         setLoading(false);
//         const remainingListings = listings.filter(listing => listing._id !== id);
//         setListingData((prev: any) => ({
//           ...prev,
//           listings: remainingListings,
//           totalListings: prev.totalListings - 1
//         }));
//       }
//     } catch (error) {
//       console.error('Error deleting listing:', error);
//       setLoading(false);
//     }
//   };

//   const handleApprove = async (id: string) => {
//     setLoading(true);
//     try {
//       const res = await fetch(`/api/listings/${id}/approve`, {
//         method: 'PATCH',
//         headers: {
//           'Content-Type': 'application/json'
//         },
//         body: JSON.stringify({ status: 'approved' })
//       });
//       if (res.ok) {
//         setLoading(false);
//         const updatedListings = listings.map(listing =>
//           listing._id === id ? { ...listing, status: 'approved' as const } : listing
//         );
//         setListingData((prev: any) => ({
//           ...prev,
//           listings: updatedListings
//         }));
//       }
//     } catch (error) {
//       console.error('Error approving listing:', error);
//       setLoading(false);
//     }
//   };

//   const handleReject = async (id: string) => {
//     setLoading(true);
//     try {
//       const res = await fetch(`/api/listings/${id}/reject`, {
//         method: 'PATCH',
//         headers: {
//           'Content-Type': 'application/json'
//         },
//         body: JSON.stringify({ status: 'rejected' })
//       });
//       if (res.ok) {
//         setLoading(false);
//         const updatedListings = listings.map(listing =>
//           listing._id === id ? { ...listing, status: 'rejected' as const } : listing
//         );
//         setListingData((prev: any) => ({
//           ...prev,
//           listings: updatedListings
//         }));
//       }
//     } catch (error) {
//       console.error('Error rejecting listing:', error);
//       setLoading(false);
//     }
//   };

  // const getStatusBadge = (status: string) => {
  //   switch (status) {
  //     case 'approved':
  //       return (
  //         <span className="inline-flex items-center gap-1 px-2 py-1 rounded-full text-xs font-medium bg-green-100 text-green-700">
  //           <MdCheckCircle className="w-3 h-3" />
  //           Approved
  //         </span>
  //       );
  //     case 'rejected':
  //       return (
  //         <span className="inline-flex items-center gap-1 px-2 py-1 rounded-full text-xs font-medium bg-red-100 text-red-700">
  //           <MdCancel className="w-3 h-3" />
  //           Rejected
  //         </span>
  //       );
  //     case 'pending':
  //       return (
  //         <span className="inline-flex items-center gap-1 px-2 py-1 rounded-full text-xs font-medium bg-amber-100 text-amber-700">
  //           <MdPending className="w-3 h-3" />
  //           Pending
  //         </span>
  //       );
  //     default:
  //       return null;
  //   }
  // };

  if (notifications?.length === 0) {
    return <div className="bg-white p-5 text-center">No listings found</div>;
  }

  return (
    <div className="bg-white overflow-x-auto">
      <table className="min-w-full divide-y divide-gray-200">
        <thead>
          <tr className="bg-gray-100 text-left">
            <th className="p-2 border">#</th>
            <th className="p-2 border">Email</th>
            <th className="p-2 border">Category</th>
            <th className="p-2 border">Enabled</th>
            <th className="p-2 border">Actions</th>
          </tr>
        </thead>
        <tbody>
          {notifications?.map((listing, index) => (
            <tr key={listing._id} className="text-sm border hover:bg-gray-50">
              <td className="p-2 border">{(index + 1) + (currentPage - 1) * limit}</td>
              <td className="p-2 border max-w-xs">
                <div className="font-medium text-gray-900 truncate">{listing.email}</div>
              </td>
              <td className="p-2 border">
                <span className="px-2 py-1 bg-blue-100 text-blue-700 rounded text-xs capitalize">
                  {listing.category}
                </span>
              </td>
              <td className="p-2 border">
                <span className="px-2 py-1 bg-blue-100 text-blue-700 rounded text-xs capitalize">
                  {listing.enabled ? 'Yes' : 'No'}
                </span>
              </td>
              <td className="p-2 border">
                <div className="flex items-center justify-center gap-3">
                  
                  <button
                    className="text-blue-600 hover:text-blue-800 transition-colors"
                    title="Edit"
                  >
                    <CiEdit className="w-5 h-5" />
                  </button>
                  <button
                    // onClick={() => handleDelete(listing._id)}
                    className="text-red-600 hover:text-red-800 transition-colors"
                    title="Delete"
                  >
                    <MdDelete className="w-5 h-5" />
                  </button>
                </div>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default NotificationTable;