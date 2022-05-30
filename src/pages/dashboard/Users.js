import Loading from 'pages/shared/Loading';
import React from 'react';
import { useQuery } from 'react-query';

const Users = () => {
    const { data: users, isLoading, error, refetch } = useQuery('', () => fetch('http://localhost:5000/users').then(res => res.json()))
    if (isLoading) {
        return <Loading />
    }
    if (error) console.log(error);
    const deleteUser = (email) => {
        fetch(`http://localhost:5000/user/delete/${email}`, { method: 'DELETE' })
        .then(res => res.json())
        .then(data => {
          if (data.deletedCount) {
            refetch();
          }
        })
    }
    console.log(users);
    return (
        <div>
            <h2 className='text-center'>All Users : {users?.length} </h2>
            <div className="overflow-x-auto h-[80vh] shadow-xl rounded-lg my-12 mx-2 md:mx-auto max-w-2xl">
                <table className="table w-full  ">
                    <thead className="sticky top-0">
                        <tr>
                            <th>SL</th>
                            <th>Email</th>
                            <th>Name</th>
                            <th>Role</th>
                            <th>Action</th>
                        </tr>
                    </thead>

                    <tbody>
                        {isLoading ? (
                            <tr>
                                <td colSpan="100%">
                                    <Loading />
                                </td>
                            </tr>
                        ) : (
                            users?.map((a, index) => (
                                <tr key={index}>
                                    <td className="text-xs">{index + 1}</td>
                                    <td className="text-xs">{a.email}</td>
                                    <td className="text-xs">{a.name}</td>
                                    <td className="text-xs">{a.role}</td>
                                    <td className="text-xs">
                                        <button className="btn btn-xs btn-info mr-2">Make Admin</button>
                                        <button className="btn btn-xs btn-warning" onClick={() => deleteUser(a.email)}>Delete</button>
                                    </td>
                                </tr>
                            ))
                        )}
                        {users?.length < 1 && <tr>
                            <td colSpan="100%">
                                <p className="p-4 m-4 text-center ">No records Found!</p>
                            </td>
                        </tr>}
                    </tbody>
                </table>
            </div>
        </div>
    );
};

export default Users;