import auth from 'firebase.init';
import Loading from 'pages/shared/Loading';
import React from 'react';
import { useAuthState } from 'react-firebase-hooks/auth';
import { useQuery } from 'react-query';
import { toast } from 'react-toastify';

const Users = () => {
    const [loggedUser] = useAuthState(auth);
    const { data: users, isLoading, error, refetch } = useQuery('', () => fetch('http://localhost:5000/users', { method: 'get', headers: { 'authorization': `Bearer ${localStorage.getItem('accessToken')}` } }).then(res => res.json()))
    if (isLoading) {
        return <Loading />
    }
    // console.log(admin)
    if (error) console.log(error);

    const deleteUser = (email) => {
        const proceed = window.confirm('Are You Sure?')
        if(proceed){

            fetch(`http://localhost:5000/user/delete/${email}`, { method: 'DELETE' , headers: {'authorization': `Bearer ${localStorage.getItem('accessToken')}`} })
            .then(res => {
                if(res.status === 403){
                    toast.error("You can't delete user!")
                }
                return res.json()
            })
            .then(data => {
                if (data.deletedCount) {
                    refetch();
                }
            })
        }
    }

    const makeAdmin = email => {
        const proceed = window.confirm('Are You Sure?')
        if(proceed){

            fetch(`http://localhost:5000/user/admin/${email}`, { method: 'put' , headers: {'authorization': `Bearer ${localStorage.getItem('accessToken')}`}})
            .then(res => {
                console.log(res)
                if(res.status === 403){
                    toast.error('You are not Allowed to make admin');
                }
                return res.json()
            })
            .then(data => {
                if (data.modifiedCount) {
                    refetch();
                    toast.success(`The user is now an Admin!`)
                }
            })
        }

    }
    const removeAdmin = email => {
        const proceed = window.confirm('Are You Sure?')
        if(proceed){

            fetch(`http://localhost:5000/user/remove/${email}`, { method: 'put' , headers: {'authorization': `Bearer ${localStorage.getItem('accessToken')}`, 'content-type': 'application/json'}})
            .then(res => {
                console.log(res)
                if(res.status === 403){
                    toast.error('You are not Allowed to remove admin');
                }
                return res.json()
            })
            .then(data => {
                if (data.modifiedCount) {
                    refetch();
                    toast.success(`Removed from Admin!`)
                }
            })
        }

    }
    return (
        <div>
            <h2 className='text-center'>All Users : {users?.length} </h2>
            <div className="overflow-x-auto h-[80vh] shadow-xl rounded-lg my-12 mx-2 md:mx-auto max-w-2xl">
                <table className="table w-full  ">
                    <thead className="sticky top-0">
                        <tr>
                            <th>SL</th>
                            <th>Email</th>
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
                                    <td className="text-xs">{a.email} {a.email === loggedUser.email && <div className="indicator-item badge badge-accent" style={{transform: 'translate(-14%, -42%)'}}>me</div>} </td>
                                    <td className="text-xs">{a.role}</td>
                                    <td className="text-xs">
                                        {a.role !== 'admin' && <button className="btn btn-xs btn-info mr-2" onClick={() => makeAdmin(a.email)}>Make Admin</button>}
                                        {a.role === 'admin' && <button className="btn btn-xs btn-warning mr-2" onClick={() => removeAdmin(a.email)}>Remove Admin</button>}
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