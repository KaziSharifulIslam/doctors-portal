
import { useEffect, useState } from "react";

const useAdmin = (user) => {
    const [adminLoading, setAdminLoading] = useState(true);
    const [admin, setAdmin] = useState(false);
    useEffect(() => {
        const email = user?.email;
        if (email) {
            fetch(`${process.env.REACT_APP_APP_SERVER_URI}/admin/${email}`, {
                method: 'get',
                headers: { 'content-type': 'application/json', 'authorization': `Bearer ${localStorage.getItem('accessToken')}` }
            })
                .then(res => res.json())
                .then(data => {
                    // console.log(data);
                    setAdmin(data.admin);
                    setAdminLoading(false);
                })
        }
    }, [user])
    // console.log(admin)
    return [admin, adminLoading]
}
export default useAdmin;