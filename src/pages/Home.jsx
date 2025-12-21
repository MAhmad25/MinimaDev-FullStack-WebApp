import { Link } from "react-router-dom";
import { FaArrowTrendUp } from "react-icons/fa6";
import { GoPeople } from "react-icons/go";
import { PiBookOpen } from "react-icons/pi";
import { Post } from "../components/index.js";
import { useScrollTop } from "./index.js";
import { BsArrowRightShort } from "react-icons/bs";
import { useSelector } from "react-redux";
const Home = () => {
      document.title = "Minima | Home";
      useScrollTop();
      const allPosts = useSelector((state) => state.posts.posts);
      return (
            <section className="w-full  px-5 font-primary-text  text-[var(--color-bl)]   flex flex-col pt-34  gap-14  items-center">
                  <h1 className="font-cool text-center sm:w-1/2   font-black text-5xl sm:text-7xl tracking-tight ">Thoughts, stories and ideas</h1>
                  <p className="font-ppneue  text-center sm:w-1/2 text-xl sm:text-2xl ">Write anything that comes to your mind! No limits</p>
                  {/* Button */}
                  <div className="flex gap-4">
                        <Link className="sm:px-4 p-3 text-sm sm:text-lg sm:py-2 rounded-xl bg-[var(--color-bl)] text-[var(--color-wht)]" to="/write-post">
                              Start writing today
                        </Link>
                        <Link className="sm:px-4 p-3 text-sm sm:text-lg sm:py-2 rounded-xl border-[1px] bg-transparent" to="/journals">
                              Explore stories
                        </Link>
                  </div>
                  {/* Special Things */}
                  <div className="flex w-full  gap-2 justify-center  flex-wrap sm:gap-5  py-10">
                        {[
                              { color: "bg-green-600", text: "Free to Join" },
                              { color: "bg-blue-600", text: "No Ads" },
                              { color: "bg-purple-600", text: "Open Source" },
                        ].map((obj, index) => (
                              <div key={index} className="flex gap-2 justify-center items-center">
                                    <div className={`rounded-full w-2 h-2 ${obj.color}`}></div>
                                    <p className="text-xl font-light">{obj.text}</p>
                              </div>
                        ))}
                  </div>
                  {/* State Info */}
                  <div className="w-full flex justify-center-safe flex-wrap gap-16 items-center border-y-[1px]  border-[var(--color-bl)]/40 px-10  py-10">
                        {[
                              { icon: FaArrowTrendUp, bold: "50K+", para: "Monthly Readers" },
                              { icon: GoPeople, bold: "1,200+", para: "Active Writers" },
                              { icon: PiBookOpen, bold: "15K+", para: "Published Stories" },
                        ].map((obj, index) => (
                              <div key={index} className="flex flex-col gap-3 items-center">
                                    <span className="border-[1px] rounded-full p-5">
                                          <obj.icon size="1.3rem" />
                                    </span>
                                    <h2 className="text-2xl ">{obj.bold}</h2>
                                    <p>{obj.para}</p>
                              </div>
                        ))}
                  </div>
                  <div className="w-full py-20 space-y-16 min-h-screen">
                        <div className="w-full flex flex-col items-center justify-center  gap-5">
                              <h1 className=" text-5xl font-cool text-center font-black sm:text-7xl">Featured Stories</h1>
                              <p className="text-center text-sm sm:text-lg sm:w-[40%] leading-none">Discover the most compelling articles and insights from our community of writers</p>
                        </div>
                        {/* Cards */}
                        <section className="w-full grid gap-5 grid-cols-1  py-10 sm:grid-cols-2 lg:grid-cols-3">{allPosts?.length > 0 ? allPosts?.map((eachPost) => <Post key={eachPost.$id} postData={eachPost} />).slice(0, 3) : <div className=" text-center text-2xl px-10 col-span-full place-self-center ">No Post Available! Be the first One to write a Post</div>}</section>
                        <div className="w-full flex flex-col justify-center items-center h-fit">
                              <Link className="sm:px-4 justify-center items-center flex gap-2 p-3 text-lg sm:py-2 rounded-xl border-[1px] bg-transparent" to="/journals">
                                    <p>View all stories</p>
                                    <BsArrowRightShort />
                              </Link>
                        </div>
                  </div>
                  {/* ) : (
                        <div className=" text-center text-2xl px-10 col-span-full place-self-center ">⭐Want to read well-written posts? Log in to continue</div>
                  )} */}
            </section>
      );
};

export default Home;
