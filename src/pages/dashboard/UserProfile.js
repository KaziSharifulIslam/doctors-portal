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
    fetch(`http://localhost:5000/user/${user?.email}`).then((res) => res.json())
  );
  if (isLoading) return <Loading />;
  // const { address, bio, education, facebook, linkedin, profileName } = profile;

  const onSubmit = (data) => {
    console.log(data);
    fetch(`http://localhost:5000/update/${user?.email}`, {
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
    <div className="container mx-auto mt-20">
      <h2 className="text-2xl text-center font-bold mb-12 capitalize hidden lg:block">
        Hey {user?.displayName}, welcome to your profile
      </h2>
      <div className="card xl:card-side bg-base-100 px-4 md:px-8 lg:px-16 py-8 lg:py-12 mx-4 my-10 lg:mx-24 border-t-2 dark:border-0 flex items-center justify-around shadow-xl">
        <figure className="w-full max-w-sm flex flex-col gap-2">
          <img
            src={
              user?.photoURL ||
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
                  <td>{user?.displayName}</td>
                </tr>
                <tr>
                  <td>Email</td>
                  <td>
                    {user?.email ? (
                      <div>
                        {user?.email}{" "}
                        {!user?.emailVerified && (
                          <button
                            onClick={emailVerify}
                            className="link link-primaryj dark:link-accent"
                          >
                            Verify Email
                          </button>
                        )}{" "}
                      </div>
                    ) : (
                      `${user?.providerData[0].providerId} doesn't share email`
                    )}
                  </td>
                </tr>
                <tr>
                  <td>Phone</td>
                  {/* <td>{user?.phoneNumber || "Number Not Found"}</td> */}
                </tr>
                <tr>
                  <td>LinkedIn</td>
                  {/* <td>{linkedin}</td> */}
                </tr>
                <tr>
                  <td>Facebook</td>
                  {/* <td>{facebook}</td> */}
                </tr>
                <tr>
                  <td>Address</td>
                  {/* <td>{address}</td> */}
                </tr>
                <tr>
                  <td>Education</td>
                  {/* <td>{education}</td> */}
                </tr>
              </tbody>
            </table>
            <div className="px-2 text-left">
              {/* Bio <hr /> {bio} */}
              <br />
            </div>
          </div>
          <a href="#update" className="link link-accent dark:text-accent p-2">
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
      {/* sidebar  */}

      <div className="flex gap-x-4">
      <aside className=" w-2/6 sticky right-0 top-6 left-0" aria-label="Sidebar">
        <div className="overflow-y-auto py-4 px-3 bg-gray-50 rounded dark:bg-gray-800">
          <ul className="space-y-2">
            <li>
              <a href="#!" className="flex items-center p-2 text-base font-normal text-gray-900 rounded-lg dark:text-white hover:bg-gray-100 dark:hover:bg-gray-700">
                <svg className="w-6 h-6 text-gray-500 transition duration-75 dark:text-gray-400 group-hover:text-gray-900 dark:group-hover:text-white" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg"><path d="M2 10a8 8 0 018-8v8h8a8 8 0 11-16 0z"></path><path d="M12 2.252A8.014 8.014 0 0117.748 8H12V2.252z"></path></svg>
                <span className="ml-3">Dashboard</span>
              </a>
            </li>
            <li>
              <a href="#!" className="flex items-center p-2 text-base font-normal text-gray-900 rounded-lg dark:text-white hover:bg-gray-100 dark:hover:bg-gray-700">
                <svg className="flex-shrink-0 w-6 h-6 text-gray-500 transition duration-75 dark:text-gray-400 group-hover:text-gray-900 dark:group-hover:text-white" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg"><path d="M5 3a2 2 0 00-2 2v2a2 2 0 002 2h2a2 2 0 002-2V5a2 2 0 00-2-2H5zM5 11a2 2 0 00-2 2v2a2 2 0 002 2h2a2 2 0 002-2v-2a2 2 0 00-2-2H5zM11 5a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2h-2a2 2 0 01-2-2V5zM11 13a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2h-2a2 2 0 01-2-2v-2z"></path></svg>
                <span className="flex-1 ml-3 whitespace-nowrap">Kanban</span>
                <span className="inline-flex justify-center items-center px-2 ml-3 text-sm font-medium text-gray-800 bg-gray-200 rounded-full dark:bg-gray-700 dark:text-gray-300">Pro</span>
              </a>
            </li>
            <li>
              <a href="#!" className="flex items-center p-2 text-base font-normal text-gray-900 rounded-lg dark:text-white hover:bg-gray-100 dark:hover:bg-gray-700">
                <svg className="flex-shrink-0 w-6 h-6 text-gray-500 transition duration-75 dark:text-gray-400 group-hover:text-gray-900 dark:group-hover:text-white" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg"><path d="M8.707 7.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l2-2a1 1 0 00-1.414-1.414L11 7.586V3a1 1 0 10-2 0v4.586l-.293-.293z"></path><path d="M3 5a2 2 0 012-2h1a1 1 0 010 2H5v7h2l1 2h4l1-2h2V5h-1a1 1 0 110-2h1a2 2 0 012 2v10a2 2 0 01-2 2H5a2 2 0 01-2-2V5z"></path></svg>
                <span className="flex-1 ml-3 whitespace-nowrap">Inbox</span>
                <span className="inline-flex justify-center items-center p-3 ml-3 w-3 h-3 text-sm font-medium text-blue-600 bg-blue-200 rounded-full dark:bg-blue-900 dark:text-blue-200">3</span>
              </a>
            </li>
            <li>
              <a href="#!" className="flex items-center p-2 text-base font-normal text-gray-900 rounded-lg dark:text-white hover:bg-gray-100 dark:hover:bg-gray-700">
                <svg className="flex-shrink-0 w-6 h-6 text-gray-500 transition duration-75 dark:text-gray-400 group-hover:text-gray-900 dark:group-hover:text-white" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg"><path fillRule="evenodd" d="M10 9a3 3 0 100-6 3 3 0 000 6zm-7 9a7 7 0 1114 0H3z" clipRule="evenodd"></path></svg>
                <span className="flex-1 ml-3 whitespace-nowrap">Users</span>
              </a>
            </li>
            <li>
              <a href="#!" className="flex items-center p-2 text-base font-normal text-gray-900 rounded-lg dark:text-white hover:bg-gray-100 dark:hover:bg-gray-700">
                <svg className="flex-shrink-0 w-6 h-6 text-gray-500 transition duration-75 dark:text-gray-400 group-hover:text-gray-900 dark:group-hover:text-white" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg"><path fillRule="evenodd" d="M10 2a4 4 0 00-4 4v1H5a1 1 0 00-.994.89l-1 9A1 1 0 004 18h12a1 1 0 00.994-1.11l-1-9A1 1 0 0015 7h-1V6a4 4 0 00-4-4zm2 5V6a2 2 0 10-4 0v1h4zm-6 3a1 1 0 112 0 1 1 0 01-2 0zm7-1a1 1 0 100 2 1 1 0 000-2z" clipRule="evenodd"></path></svg>
                <span className="flex-1 ml-3 whitespace-nowrap">Products</span>
              </a>
            </li>
            <li>
              <a href="#!" className="flex items-center p-2 text-base font-normal text-gray-900 rounded-lg dark:text-white hover:bg-gray-100 dark:hover:bg-gray-700">
                <svg className="flex-shrink-0 w-6 h-6 text-gray-500 transition duration-75 dark:text-gray-400 group-hover:text-gray-900 dark:group-hover:text-white" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg"><path fillRule="evenodd" d="M3 3a1 1 0 00-1 1v12a1 1 0 102 0V4a1 1 0 00-1-1zm10.293 9.293a1 1 0 001.414 1.414l3-3a1 1 0 000-1.414l-3-3a1 1 0 10-1.414 1.414L14.586 9H7a1 1 0 100 2h7.586l-1.293 1.293z" clipRule="evenodd"></path></svg>
                <span className="flex-1 ml-3 whitespace-nowrap">Sign In</span>
              </a>
            </li>
            <li>
              <a href="#!" className="flex items-center p-2 text-base font-normal text-gray-900 rounded-lg dark:text-white hover:bg-gray-100 dark:hover:bg-gray-700">
                <svg className="flex-shrink-0 w-6 h-6 text-gray-500 transition duration-75 dark:text-gray-400 group-hover:text-gray-900 dark:group-hover:text-white" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg"><path fillRule="evenodd" d="M5 4a3 3 0 00-3 3v6a3 3 0 003 3h10a3 3 0 003-3V7a3 3 0 00-3-3H5zm-1 9v-1h5v2H5a1 1 0 01-1-1zm7 1h4a1 1 0 001-1v-1h-5v2zm0-4h5V8h-5v2zM9 8H4v2h5V8z" clipRule="evenodd"></path></svg>
                <span className="flex-1 ml-3 whitespace-nowrap">Sign Up</span>
              </a>
            </li>
          </ul>
        </div>
      </aside>                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                         
      <div className="w-4/6" />
      Lorem ipsum dolor sit amet consectetur, adipisicing elit. Distinctio hic facilis magnam iure fuga eaque, quia expedita consectetur, aperiam corporis deserunt alias labore ducimus eveniet! Facilis deleniti dolore esse necessitatibus voluptatum? Perspiciatis voluptates quia odit quaerat necessitatibus impedit aut commodi, fugiat ipsam quasi voluptatibus saepe delectus totam! Veniam incidunt mollitia quisquam dolorem! Sed impedit ea exercitationem minus, incidunt vitae sequi repellat animi deleniti odio temporibus tenetur dicta? Quo doloremque veniam inventore harum similique sed ut, quia odio nostrum. Quis, incidunt provident. Culpa fugit molestiae ipsa beatae! Repudiandae, consequatur itaque. Quibusdam quae eius cumque sit cupiditate corrupti hic mollitia ipsam vitae natus voluptas praesentium dolores enim laudantium eveniet accusamus earum ullam nostrum nisi, fuga perferendis, maiores exercitationem. Cumque provident esse impedit sequi aliquid eveniet quaerat nihil rerum error perspiciatis tempore quae eius illum, et officiis similique vel autem aut labore nobis delectus sunt iste. Nisi laudantium repellendus adipisci, ipsam, ut maiores architecto error eius nihil atque repudiandae facere nesciunt voluptate? Porro accusamus ad laudantium esse eveniet ratione voluptatum sed, molestiae, expedita ut inventore consequatur! Aspernatur repellat sed consequatur quisquam unde, suscipit ducimus mollitia incidunt consequuntur amet. Dolore, asperiores laborum! Ullam accusamus hic repellat molestias perferendis incidunt sunt facere, a dicta rerum saepe suscipit quibusdam quas sit sapiente reprehenderit perspiciatis dolores ducimus quasi id rem praesentium delectus. Mollitia, ratione eligendi. Quisquam numquam corrupti reprehenderit sint nobis maiores sequi asperiores, ducimus ullam aperiam nesciunt molestias vitae expedita neque quaerat quibusdam eius ipsum consequatur consequuntur eaque ipsa magnam? Recusandae, veniam nihil odio asperiores non dolorum dicta blanditiis voluptates. Corrupti ratione necessitatibus, saepe temporibus, id accusantium nisi sed aperiam, tempora voluptatem dolor adipisci expedita minus dignissimos non earum sit mollitia tenetur. Dolores quod, nisi nulla sunt, eligendi ipsum minima repudiandae placeat perspiciatis incidunt impedit nihil fugiat totam cum cupiditate unde. Neque rem quisquam perferendis doloribus error. Corporis asperiores aspernatur nostrum corrupti veritatis! Modi doloribus porro ipsam iure vel. Fugiat, iste quibusdam. Laboriosam minima, non quibusdam porro placeat rem. Fugit facilis possimus porro perspiciatis necessitatibus quia incidunt ipsam. Ex delectus eum quibusdam, a expedita aliquam quis qui dolorem, ut maxime id recusandae iusto fuga, iste quas deleniti maiores. Suscipit iure cumque eligendi voluptatibus. Earum tempora nesciunt non harum veniam natus voluptates fugit explicabo minus velit deleniti, possimus, illo odio at repellendus eum laborum quisquam nisi necessitatibus! Labore eligendi voluptate deleniti placeat, libero aspernatur molestiae excepturi accusamus adipisci quis optio fugit voluptates delectus nam asperiores non eius sapiente illo, praesentium laborum doloremque tempora enim iure. Id modi nemo explicabo sint, qui sed vel possimus natus, odit deleniti exercitationem. Neque quia cumque labore amet magnam culpa saepe vero natus. Deleniti delectus atque dolorem. Esse tempore amet cupiditate nulla? Illo nulla molestias nam aperiam autem expedita qui pariatur eius nobis ipsam quos nisi impedit optio iste consequuntur, molestiae neque consequatur inventore veniam recusandae quasi doloremque! Laudantium, animi consequuntur, est mollitia nam excepturi maiores deserunt ullam earum vero commodi laboriosam itaque. Incidunt rerum minus hic ipsam voluptates quae officiis. Doloremque repellat veniam aperiam ab suscipit cumque, officiis fuga consectetur enim odio commodi recusandae, eligendi a doloribus quia? Tenetur possimus impedit modi reiciendis et omnis harum nobis doloremque maiores magnam, minima placeat veniam, laborum eius fuga commodi laudantium beatae dolor? Harum accusamus aut maxime illum voluptatibus ea, inventore dolor placeat unde fuga culpa dignissimos autem corporis laudantium iure itaque amet minima! Est voluptate tenetur architecto porro sint. Est recusandae dolores labore. Pariatur reiciendis assumenda, sed vero optio alias doloribus excepturi beatae quas dignissimos voluptatum repellendus. Enim eligendi illum temporibus similique laborum sint voluptates aliquid, et inventore autem atque eos ut architecto deserunt, earum mollitia dolorum. Labore, quod non assumenda facere exercitationem in vitae eius dicta voluptas iure quis debitis fugit suscipit excepturi sunt impedit! Eveniet eaque, eius aliquam aspernatur commodi repudiandae nisi iusto vitae. Totam iusto sunt sed maxime voluptatibus. Velit vitae quaerat minus architecto repellat consequuntur consectetur voluptas similique, praesentium tempora? Laboriosam ullam reiciendis amet minima omnis quod ipsum, velit soluta molestias assumenda maiores nesciunt excepturi voluptates illum quos pariatur possimus maxime. Maiores, porro, in repudiandae pariatur reiciendis quidem sed ullam et, voluptas odit odio! Voluptate a vitae omnis officiis in dolores molestiae veniam recusandae, aut quibusdam minus vel laborum necessitatibus tempore dignissimos, quis repellendus optio obcaecati ex quisquam ipsa rerum ipsum voluptatibus. Ipsa ex ullam aperiam unde, placeat laboriosam ad omnis ipsum sint debitis possimus eos accusamus, voluptatem numquam molestias perferendis cupiditate! Voluptate, eum adipisci quis aperiam aspernatur nisi veniam architecto suscipit porro error numquam facilis facere aliquam explicabo blanditiis doloribus dicta nostrum nihil ratione laborum id ipsam culpa fugit illo? Asperiores impedit ducimus nemo iste voluptatum ipsa quam, quis eaque cum id sed ut, distinctio itaque voluptate delectus nostrum consequuntur excepturi repellendus laboriosam placeat, laudantium provident deserunt reiciendis! Doloribus perferendis dolor dicta quis voluptas hic, deserunt quibusdam, eum animi excepturi nobis libero asperiores. Aliquam est ad, nihil aperiam tempore sequi officia doloremque, assumenda deleniti, repellendus molestiae temporibus at perferendis corrupti? Dicta a unde natus est, quibusdam culpa velit ullam et provident quaerat aperiam necessitatibus tempore! Iste consequuntur numquam corporis molestiae! Quisquam nesciunt consequatur et vero laboriosam commodi reprehenderit, reiciendis ex quae ullam eaque natus eveniet necessitatibus quibusdam, alias ea beatae nostrum placeat voluptate provident laborum veritatis illo. Quod voluptatum quae libero maiores perferendis et reprehenderit, amet dicta culpa aspernatur quis temporibus nobis dignissimos at voluptas animi fugiat beatae quasi pariatur omnis debitis voluptatem impedit similique harum! Voluptatem accusantium dolor ex eius possimus omnis quaerat voluptates unde laudantium beatae, eum ratione officia voluptas nisi veniam maxime recusandae blanditiis, quisquam cum. Vitae soluta itaque consequuntur atque vel est quasi corrupti tempora quibusdam dolore animi distinctio voluptate reprehenderit mollitia, ullam aspernatur, impedit porro commodi ipsa tempore amet fugiat accusamus dicta! Vel, explicabo magni at perspiciatis dolores assumenda consectetur in, quasi fugit eum reprehenderit odit! Quisquam aperiam odit, nihil omnis reprehenderit quidem blanditiis tenetur adipisci recusandae. Quaerat recusandae accusamus voluptatibus, libero illo quibusdam repellat! Temporibus fugiat ipsa explicabo cupiditate fuga, quae repellendus saepe aspernatur! Vitae beatae quibusdam aliquid quam aperiam deserunt reiciendis odio dolorum unde accusamus! Maxime reiciendis nihil totam facilis similique optio voluptas quae quo consequuntur voluptate? Illum eum quas obcaecati nulla porro aliquid, temporibus pariatur optio, incidunt perferendis nihil exercitationem laboriosam totam. Doloribus quaerat et, blanditiis consequuntur consequatur consectetur quod quae accusantium! Cupiditate itaque sit provident nisi mollitia at ratione expedita ipsam fuga ipsum vel tempora eligendi ipsa, quisquam porro nam officia. Blanditiis qui magnam officia, optio atque, dolor tenetur vel sed harum amet vitae, nulla veritatis voluptatem vero facere. Ad sapiente officia itaque, nostrum velit quod? Eaque possimus suscipit distinctio perspiciatis corporis exercitationem eveniet totam expedita veritatis incidunt enim similique, numquam perferendis, asperiores, nisi optio tempore placeat vitae soluta minima natus odio debitis! Repellat corrupti sed deserunt assumenda consectetur obcaecati sequi eum necessitatibus, ad sint debitis adipisci repudiandae iusto veritatis neque hic unde in ratione praesentium! Atque cumque pariatur exercitationem? Molestias labore illo a corrupti. Laborum esse ex a deleniti quaerat cupiditate debitis doloremque iure nesciunt ipsa, voluptatibus error ab dolore ratione, modi non tenetur magni neque cumque dignissimos, exercitationem rerum beatae aperiam? Dicta quaerat pariatur possimus consequatur reiciendis laudantium ex modi officia quae. Quod tempora vel pariatur quaerat aliquam deleniti. Dignissimos placeat molestiae aliquid nemo voluptatum soluta repellendus libero ratione, quasi in enim dolores, voluptate eum harum accusantium blanditiis explicabo veritatis magnam sunt deserunt accusamus tempore fuga! Sit explicabo, maiores inventore non dolor, molestiae placeat hic quos ipsum, et iste reprehenderit consectetur accusamus quidem voluptatem pariatur quae dignissimos quam ullam tempora modi aliquam facere quis quaerat! Earum nostrum magni ipsum eaque numquam quibusdam quaerat nam, debitis commodi voluptate aliquam voluptatibus quia a dolor laboriosam odio distinctio laudantium quam mollitia sunt necessitatibus qui! Dolore tempora nisi aperiam vel error accusantium distinctio laborum veritatis, sint iste debitis quo nulla officiis cum impedit libero corrupti quia animi saepe vitae harum magni itaque. Accusantium sapiente libero ipsa nisi eos unde dolor accusamus facere perspiciatis, iusto ad voluptatibus consequatur eveniet facilis magni. Voluptatibus minima minus, ad cumque incidunt modi quas ut, suscipit, rerum ab doloremque perspiciatis distinctio facere porro dolorem consequatur mollitia? Perspiciatis a recusandae placeat, facere exercitationem esse labore harum pariatur voluptatibus reprehenderit quis quidem quas ex, at hic aliquam! Molestias atque dolorem ad obcaecati architecto numquam? Illum laudantium, cumque iure maiores earum illo at dolorem modi voluptate, ducimus enim doloribus ipsa beatae porro aliquam deleniti sint doloremque obcaecati reiciendis vitae unde? Repudiandae qui at unde expedita ex porro maiores excepturi autem ad sequi dolorum, delectus quae quia deleniti molestiae asperiores ullam vitae sed accusamus doloribus soluta deserunt repellat cumque. Culpa corrupti aliquid vero ea animi iste eos iure delectus cupiditate repudiandae. Nemo est veritatis distinctio dolorum commodi, maxime labore soluta, repellat animi reiciendis architecto sapiente porro molestias in saepe non dolores ut numquam ab. Accusantium, tempora. Consequatur saepe quasi id unde! Labore reprehenderit porro aperiam suscipit quasi veritatis fugiat sunt delectus, autem debitis hic nesciunt quam, numquam aspernatur minus quaerat ipsa deserunt, dolorum officia eligendi cumque quos. Molestias ab est quibusdam nobis debitis corporis. Rerum reprehenderit, unde eos nulla corrupti tenetur culpa impedit ut ad facere molestiae, velit ipsa fuga repellat vitae! Nihil, dignissimos illum temporibus eveniet placeat laudantium magni! Sapiente eius est officia quae ipsam! Inventore quidem non, quos at molestiae, porro consectetur esse, magnam mollitia officiis alias maiores quis deserunt exercitationem earum. Veritatis nihil consequatur ea. Perferendis doloremque id reprehenderit accusantium est ipsam quaerat quo non repellendus corporis? Culpa accusamus sequi laborum, dolores, perferendis qui dolore velit consectetur nulla, quasi error dignissimos cumque harum inventore vitae rerum possimus repellat assumenda nemo libero nam reiciendis. Architecto, soluta. Quia vero quasi perspiciatis ipsa tempora quos voluptate quidem ad sunt id accusantium nesciunt, enim rerum a. Modi doloremque adipisci nesciunt magni deserunt quibusdam dolore dolor sint omnis voluptate, pariatur molestiae voluptates dolores eos cupiditate qui id tenetur veritatis ipsa totam voluptatum ullam harum ratione. Dicta est ipsam magni quam, nemo consequuntur sit tenetur fuga, nostrum neque numquam culpa cumque dignissimos quaerat harum accusamus nihil natus? Fuga tempora quaerat similique temporibus reprehenderit quo qui accusantium sint ex nesciunt ut, quam nulla ipsa explicabo incidunt, praesentium nihil unde eveniet quae amet tempore perspiciatis consectetur quos modi. Nulla quod, necessitatibus debitis, ullam laboriosam molestias placeat dicta alias eligendi totam consequatur similique harum ducimus delectus. Excepturi, esse? Aspernatur, officia accusamus quibusdam perferendis expedita pariatur ad reiciendis perspiciatis illo molestiae. Ab quidem, eligendi nisi hic repellendus, temporibus perspiciatis praesentium quasi dicta, sit eos placeat ea quae quod numquam. At magnam quas doloremque, distinctio beatae, consequatur excepturi laboriosam dolorem et nemo animi? Est sapiente odio explicabo exercitationem architecto unde, quaerat at blanditiis aperiam perferendis in a quasi quo labore reiciendis consequatur fugit quibusdam? Blanditiis rem deleniti tempore cumque modi reprehenderit quo. Facilis, repellat esse perferendis voluptas nihil similique delectus aliquam numquam expedita animi exercitationem fugiat culpa et illum officia labore veniam praesentium. Harum, inventore blanditiis ducimus culpa similique, voluptates ut consectetur animi dolorum labore earum, modi rerum eum sit molestias. Obcaecati quaerat deserunt dicta nam quia, dolores animi ipsum velit quibusdam porro? Minus eos similique saepe? Obcaecati neque, illo amet porro id maxime nesciunt facere enim corporis veniam et, expedita laudantium magnam labore, dolorem fugit consectetur hic ratione officia dolore! Aut dolores aliquam, itaque beatae aliquid debitis nulla dignissimos laudantium sit expedita necessitatibus velit, vitae dolorem quaerat reprehenderit doloremque nesciunt molestiae corporis voluptas optio facere soluta tempora neque non. Dolor debitis totam cupiditate voluptates laborum a quasi autem quod. Odit mollitia blanditiis dolor voluptatum iste minus aut ipsam accusamus vel et libero fugit amet nesciunt maiores veniam omnis eveniet possimus nisi, saepe illum quo pariatur facilis itaque harum! Beatae eveniet consectetur, nemo reiciendis voluptatum iure provident enim minus suscipit. Laborum et consectetur obcaecati temporibus rerum voluptas debitis unde tempore id omnis perferendis, quisquam, velit, deserunt ab provident amet sequi reprehenderit neque consequuntur? Dolorum esse sequi voluptatum a, temporibus sit soluta magnam natus dolore est ipsum eius dolorem recusandae, consequatur veritatis voluptatem repellendus cumque nesciunt. Sit voluptatem voluptatibus alias. Porro laborum nobis quia error nisi architecto eum unde explicabo odit ducimus repellat omnis autem repellendus hic minus adipisci impedit sed perspiciatis, commodi obcaecati accusamus illum ratione ipsam. Maxime, soluta!
      </div>

    </div>
  );
};

export default UserProfile;
