import { Link } from "react-router-dom";
import { IoIosArrowRoundBack } from "react-icons/io";
import { Input, Loader } from "../components/index";
import { useForm } from "react-hook-form";
import appAuth from "../app/AuthService";
import { useScrollTop } from "./index.js";
import { useState } from "react";

const Signup = () => {
      useScrollTop();
      document.title = "Minima | Create an account now";
      const {
            register,
            handleSubmit,
            formState: { errors, isSubmitting },
      } = useForm();
      const [showEmailSent, setEmailSent] = useState(false);
      const accountCreation = async (data) => {
            try {
                  const userData = await appAuth.createAccount(data);
                  if (userData) {
                        const currentUser = await appAuth.getCurrentUser();
                        if (currentUser && !currentUser.emailVerification) setEmailSent(true);
                  }
            } catch (error) {
                  console.log("Account Creation Failed: ", error.message);
            }
      };
      return (
            <section className=" min-h-[calc(100svh-5rem)] flex text-[var(--color-bl)]  font-primary-text justify-center items-center bg-[var(--color-wht)] ">
                  <div className="w-full sm:w-1/2  grid place-content-center h-full">
                        {showEmailSent ? (
                              <>
                                    <div className="max-w-md mx-auto p-4 border border-green-600/70 rounded-lg bg-gradient-to-b from-green-200 to-green-50 flex items-start space-x-3 shadow-lg">
                                          <div className="flex-shrink-0">
                                                <div className="w-10 h-10 flex items-center justify-center bg-white border border-green-300 rounded-full ring-1 ring-green-600">
                                                      <span className="text-green-600">
                                                            <svg fill="oklch(62.7% 0.194 149.214)" width="24px" height="24px" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                                                                  <defs></defs>
                                                                  <path id="checkmark" className="cls-1" d="M1224,312a12,12,0,1,1,3.32-23.526l-1.08,1.788A10,10,0,1,0,1234,300a9.818,9.818,0,0,0-.59-3.353l1.27-2.108A11.992,11.992,0,0,1,1224,312Zm0.92-8.631a0.925,0.925,0,0,1-.22.355,0.889,0.889,0,0,1-.72.259,0.913,0.913,0,0,1-.94-0.655l-3.82-3.818a0.9,0.9,0,0,1,1.27-1.271l3.25,3.251,7.39-10.974a1,1,0,0,1,1.38-.385,1.051,1.051,0,0,1,.36,1.417Z" transform="translate(-1212 -288)"></path>
                                                            </svg>
                                                      </span>
                                                </div>
                                          </div>
                                          <div>
                                                <span className="text-xl mb-1.5 font-semibold text-green-700 tracking-normal">Email for verfication sent to your email</span>
                                                <p className="text-green-600 text-xs">
                                                      Please check your email for further steps. <span className="font-extrabold text-red-500">You can close this tab !</span>
                                                </p>
                                          </div>
                                    </div>
                              </>
                        ) : (
                              <>
                                    <h1 className="text-4xl text-center font-secondary-text sm:text-5xl">Create an account</h1>
                                    <p className="whitespace-nowrap text-center">Enter your information to get started</p>
                                    <form onSubmit={handleSubmit(accountCreation)} className="grid  gap-3 place-content-center w-full h-full mt-5 grid-cols-2">
                                          {/* Username */}
                                          <Input {...register("username", { required: "Username is required", minLength: { value: 2, message: "Atleast 2 characters" } })} label={"Username"} type={"text"} placeholder={"Enter your display name"} star={true} disabled={isSubmitting} />
                                          {errors.username && <span className="text-red-500 text-xs sm:text-sm tracking-tighter leading-none">{errors.username.message}</span>}
                                          {/* Email */}
                                          <Input {...register("email", { required: "Email is required" })} label={"Email"} type={"email"} placeholder={"Enter your email"} star={true} disabled={isSubmitting} />
                                          {errors.email && <span className="text-red-500 text-xs sm:text-sm tracking-tighter leading-none">{errors.email.message}</span>}
                                          {/* Password */}
                                          <Input {...register("password", { required: "Password is required", minLength: { value: 8, message: "Must be 8 characters long" } })} label={"Password"} type={"password"} placeholder={"Enter your password"} star={true} disabled={isSubmitting} />
                                          {errors.password && <span className="text-red-500 text-xs sm:text-sm tracking-tighter leading-none">{errors.password.message}</span>}
                                          <button disabled={isSubmitting} type="submit" className={`px-3 col-span-2 flex justify-center items-center py-2 border-[1px] text-[var(--color-wht)] font-medium bg-[var(--color-bl)]  rounded-xl  ${isSubmitting ? "opacity-60  cursor-none" : "cursor-pointer opacity-100"}`}>
                                                {isSubmitting ? <Loader /> : "Create account"}
                                          </button>
                                    </form>
                                    <Link className="mt-10 flex gap-2 items-center justify-center underline" to="/">
                                          <IoIosArrowRoundBack size="2rem" /> <p className="text-lg">Back to home</p>
                                    </Link>
                              </>
                        )}
                  </div>
            </section>
      );
};

export default Signup;
