import Loading from "pages/shared/Loading";
import React from "react";
import {
  useAuthState,
  useSendEmailVerification
} from "react-firebase-hooks/auth";
import { useForm } from "react-hook-form";
import { useQuery } from "react-query";
import { toast } from "react-toastify";
import auth from "../../firebase.init";

const UserProfile = () => {
  const [user] = useAuthState(auth);
  const [verifyEmail, sending, error] = useSendEmailVerification(auth);
  const emailVerify = async () => {
    verifyEmail();
    if (sending) await toast.info("Check Your Email");
    if (error) await toast.error(error.message);
  };
  // const [updating, setUpdating] = useState(true);
  const { register, handleSubmit } = useForm();
  // const [profile, setProfile] = useState({});

  //  get profile
  const {
    data: profile,
    isLoading,
    refetch,
  } = useQuery("profile", () =>
    fetch(`https://doctors-portal-ks.herokuapp.com/user/${user?.email}`).then((res) => res.json())
  );
  if (isLoading) return <Loading />;
  const { address, bio, education, facebook, linkedin, profileName } = profile;

  const onSubmit = (data) => {
    console.log(data);
    fetch(`https://doctors-portal-ks.herokuapp.com/update/${user?.email}`, {
      method: "PUT",
      headers: {
        authorization: `Bearer ${localStorage.getItem("access_token")}`,
        "content-type": "application/json",
      },
      body: JSON.stringify(data),
    })
      .then((res) => res.json())
      .then((data) => {
        console.log(data);
        if (data.acknowledged) refetch();
      });
  };

  // let newEmail;
  // if (!user.email || !user.emailVerified) {
  //   newEmail = true;
  // }

  return (
    <div className="container mt-20">
      <h2 className="text-2xl text-center font-bold mb-12 capitalize hidden lg:block">
        Hey {user?.displayName}, welcome to your profile
      </h2>
      <div className="card xl:card-side bg-base-100 px-4 md:px-8 lg:px-16 py-8 lg:py-12 mx-4 my-10 lg:mx-24 border-t-2 dark:border-0 flex items-center justify-around shadow-xl">
        <figure className="w-full max-w-sm flex flex-col gap-2">
          <img
            src={
              user.photoURL ||
              "https://firefoxusercontent.com/eabedf5bb91081910e84046ba966679b" ||
              "https://api.lorem.space/image/face?hash=33791"
            }
            alt="Album"
            className="rounded-lg  aspect-square"
          />
        </figure>
        <div className="md:card-body mt-4 md:mt-0 w-full max-w-md">
          {/* current profile info  */}
          <div className="overflow-x-auto">
            <table className="table table-compact w-full">
              {/* <!-- head --> */}
              <thead>
                <tr>
                  <th colSpan="100%">Profile Information</th>
                </tr>
              </thead>
              <tbody>
                <tr>
                  <td>Name</td>
                  <td>{profileName || user.displayName}</td>
                </tr>
                <tr>
                  <td>Email</td>
                  <td>
                    {user.email ? (
                      <div>
                        {user.email}{" "}
                        {!user.emailVerified && (
                          <button
                            onClick={emailVerify}
                            className="link link-primaryj dark:link-accent"
                          >
                            Verify Email
                          </button>
                        )}{" "}
                      </div>
                    ) : (
                      `${user.providerData[0].providerId} doesn't share email`
                    )}
                  </td>
                </tr>
                <tr>
                  <td>Phone</td>
                  <td>{user.phoneNumber || "Number Not Found"}</td>
                </tr>
                <tr>
                  <td>LinkedIn</td>
                  <td>{linkedin}</td>
                </tr>
                <tr>
                  <td>Facebook</td>
                  <td>{facebook}</td>
                </tr>
                <tr>
                  <td>Address</td>
                  <td>{address}</td>
                </tr>
                <tr>
                  <td>Education</td>
                  <td>{education}</td>
                </tr>
              </tbody>
            </table>
            <div className="px-2 text-left">
              Bio <hr /> {bio}
              <br />
            </div>
          </div>
          <a href="#update" className="link link-primary dark:text-accent p-2">
            Want to update profile?
          </a>
        </div>
      </div>
      <div
        id="update"
        className="card  bg-base-100 px-4 lg:px-16 py-16 lg:py-24 mx-4 my-10 lg:mx-24 border-t-2 dark:border-0 shadow-xl"
      >
        <div className="md:card-body mt-4 md:mt-0 w-full max-w-lg mx-auto">
          <form
            onSubmit={handleSubmit(onSubmit)}
            className="flex flex-col gap-3 items-center justify-center w-full max-w-md mx-auto"
          >
            <h2 className="card-title text-2xl font-bold mb-4">
              Update Your Profile
            </h2>
            <input
              {...register("profileName", { required: true })}
              type="text"
              placeholder="Profile Name"
              className="input input-bordered w-full"
            />
            {/* {newEmail && (
              <input
                {...register("email")}
                type="email"
                placeholder="Email Address"
                className="input input-bordered w-full"
              />
            )} */}

            <input
              {...register("address", { required: true })}
              type="text"
              placeholder="Address - City/Town"
              className="input input-bordered w-full"
            />
            <input
              {...register("education", { required: true })}
              type="text"
              placeholder="Your Education"
              className="input input-bordered w-full"
            />
            <input
              {...register("facebook", { required: true })}
              type="text"
              placeholder="Facebook Profile url"
              className="input input-bordered w-full"
            />
            <input
              {...register("linkedin", { required: true })}
              type="text"
              placeholder="Linkedin Profile url"
              className="input input-bordered w-full"
            />
            <input
              {...register("photoUrl", { required: true })}
              type="text"
              placeholder="New profile image url"
              className="input input-bordered w-full"
            />
            <textarea
              {...register("bio", { required: true })}
              className="textarea textarea-bordered w-full"
              placeholder="Bio"
            ></textarea>
            <button className="btn w-full dark:btn-accent">
              Update Profile
            </button>
          </form>
        </div>
      </div>
    </div>
  );
};

export default UserProfile;
