const { useState, useEffect } = require("react");

const useToken = (user) => {
  const [token, setToken] = useState("");
  useEffect(() => {
    const email = user?.user?.email;
    const currentUser = { email };
    if (email) {
      fetch(`http://localhost:5000/user/${email}`, {
        method: "PUT",
        body: JSON.stringify(currentUser),
        headers: { "content-type": "application/json", 'authorization': `Bearer ${localStorage.getItem('accessToken')}` },
      })
        .then((res) => res.json())
        .then((data) => {
          // console.log(data);
          const accessToken = data.token;
          localStorage.setItem('accessToken', accessToken);
          setToken(accessToken);

        });
    }
  }, [user]);
  return [token, setToken];
};
export default useToken;
