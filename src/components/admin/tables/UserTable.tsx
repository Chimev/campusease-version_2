import React from 'react';
import { CiEdit } from 'react-icons/ci';
import { MdDelete } from 'react-icons/md';

interface User {
  _id: string;
  name: string;
  email: string;
  school: string;
  role: string[];
  phone: string;
  agentApproval: boolean;
  createdAt: string;
}

interface UserTableProps {
  users: User[];
  currentPage?: number;
  limit?: number;
  setUserData?: any;
  setLoading?: any;
}

const UserTable = ({setUserData, users, currentPage = 1, limit = 10, setLoading }: UserTableProps) => {

  const handleDelete = async (id: string) => {
    setLoading(true)
    try {
      const res = await fetch(`/api/user/${id}`, {
        method: 'DELETE',
        headers: {
          "Content-Type": "application/json"
        }
      })
      if(res.ok){
        setLoading(false)
        const remainingUsers = users.filter(user => user._id !== id)
        setUserData((prev: any) => ({
          ...remainingUsers,
          currentPage: currentPage
        }))
      }
    } catch (error) {
      
    }
  }


  if (users?.length === 0) {
    return <div className="bg-white p-5 text-center">No users found</div>;
  }

  return (
    <div className="bg-white overflow-x-auto">
      <table className="min-w-full divide-y divide-gray-200">
        <thead>
          <tr className="bg-gray-100 text-left">
            <th className="p-2 border">#</th>
            <th className="p-2 border">Name</th>
            <th className="p-2 border">Email</th>
            <th className="p-2 border">Institution</th>
            <th className="p-2 border">Role</th>
            <th className="p-2 border">Phone</th>
            <th className="p-2 border">Date Joined</th>
            <th className="p-2 border">Status</th>
            <th className="p-2 border">Actions</th>
          </tr>
        </thead>
        <tbody>
          {users?.map((user, index) => (
            <tr key={user._id} className="text-sm border">
              <td className="p-2 border">{(index + 1) + (currentPage - 1) * limit}</td>
              <td className="p-2 border">{user.name}</td>
              <td className="p-2 border">{user.email}</td>
              <td className="p-2 border">{user.school}</td>
              <td className="p-2 border">{user.role.join(', ')}</td>
              <td className="p-2 border">{user.phone}</td>
              <td className="p-2 border">{new Date(user.createdAt).toLocaleDateString()}</td>
              <td
                className={`p-2 border ${
                  user.role.includes('agent') && !user.agentApproval ? 'text-red-600' : 'text-green-600'
                }`}
              >
                {user.role.includes('agent') && !user.agentApproval ? 'Pending' : 'Approved'}
              </td>
              <td className="p-2 flex items-center justify-center gap-4">
                <CiEdit />
                <MdDelete onClick={() => handleDelete(user._id)} />
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default UserTable;
