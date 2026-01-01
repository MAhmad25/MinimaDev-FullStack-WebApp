import { Link, useNavigate } from "react-router-dom";
import { IoIosArrowRoundBack } from "react-icons/io";
import { Input, Loader } from "../components/index";
import { useForm } from "react-hook-form";
import { useDispatch } from "react-redux";
import appAuth from "../app/AuthService";
import { login } from "../store/reducers/authSlice";
import toast from "react-hot-toast";
import documentService from "../app/DocService";
import { setPosts } from "../store/reducers/postsSlice";
import { useScrollTop } from "./index.js";

const Login = () => {
      document.title = "Minima | Please come back";
      useScrollTop();
      const dispatch = useDispatch();
      const navigate = useNavigate();
      const {
            register,
            handleSubmit,
            formState: { errors, isSubmitting },
      } = useForm();
      const loginAccount = async (data) => {
            try {
                  const isLoggedIn = await appAuth.Login(data);
                  if (isLoggedIn) {
                        const userData = await appAuth.getCurrentUser();
                        if (!userData?.emailVerification) {
                              toast.error("Your email is not verified yet !");
                              await appAuth.Logout();
                              return;
                        }
                        const allPosts = await documentService.listPosts();
                        dispatch(setPosts(allPosts?.documents));
                        if (userData && allPosts) {
                              dispatch(login(userData));
                              navigate("/journals");
                        }
                  } else toast.error("Email or Password is incorrect !");
            } catch (error) {
                  toast.error("Somethings went wrong from our side ! ");
                  console.log("Unable to Login: ", error.message);
            }
      };
      return (
            <section className=" min-h-[calc(100svh-5rem)] flex text-[var(--color-bl)]  font-primary-text justify-center items-center bg-[var(--color-wht)] ">
                  <div className="w-full sm:w-1/2  grid place-content-center h-full">
                        <h1 className="text-4xl text-center font-secondary-text sm:text-5xl">Welcome Back</h1>
                        <p className="whitespace-nowrap text-center">Enter your credentials to access your account</p>
                        <form onSubmit={handleSubmit(loginAccount)} className="grid  gap-3 place-content-center w-full h-full mt-5 grid-cols-2">
                              {/* Email */}
                              <Input {...register("email", { required: true })} label={"Email"} type={"email"} placeholder={"Enter your email"} star={true} disabled={isSubmitting} />
                              {errors.email && <span className="text-red-500 text-xs sm:text-sm tracking-tighter leading-none">Email is required</span>}
                              {/* Password */}
                              <Input {...register("password", { required: "Password is required", minLength: { value: 8, message: "Must be 8 characters" } })} label={"Password"} type={"password"} placeholder={"Enter your password"} star={true} disabled={isSubmitting} />
                              {errors.password && <span className="text-red-500 text-xs sm:text-sm tracking-tighter leading-none">{errors.password.message}</span>}
                              <button disabled={isSubmitting} type="submit" className={`px-3 col-span-2 flex justify-center items-center py-2 border-[1px] text-[var(--color-wht)] font-medium bg-[var(--color-bl)] rounded-xl  ${isSubmitting ? "opacity-60  cursor-none" : "cursor-pointer opacity-100"}`}>
                                    {isSubmitting ? <Loader /> : "Login"}
                              </button>
                        </form>
                        <Link className="mt-10 flex gap-2 items-center justify-center underline" to="/create-account">
                              <p className="text-lg">Don't have an account ?</p>
                        </Link>
                  </div>
            </section>
      );
};

export default Login;
