import { Route, Routes, useSearchParams } from "react-router-dom";
import { Login, Signup, Home, Posts, WritePost, ViewPost, EditPost, Page404 } from "../pages/index";
import { Footer, PillNav } from "../components/index";
import { useEffect } from "react";
import appAuth from "../app/AuthService";
import { useDispatch } from "react-redux";
import { login, logout } from "../store/reducers/authSlice";
import toast, { Toaster } from "react-hot-toast";
import Protected from "./Protected";
import useAllPosts from "../hooks/useAllPosts";

const AppRoute = () => {
      const dispatch = useDispatch();
      const [searchParams] = useSearchParams();
      const userid = searchParams.get("userId");
      const secret = searchParams.get("secret");
      useEffect(() => {
            (async () => {
                  if (userid && secret) {
                        try {
                              const isVerified = await appAuth.verifyEmail(userid, secret);
                              if (isVerified) {
                                    toast.success("Email Successfully Verifed !");
                                    window.history.replaceState({}, document.title, "/");
                              }
                        } catch (error) {
                              toast.error("Something went wrong on our side !");
                              console.log(error.message);
                              return;
                        }
                  }
                  // If params does not exists
                  try {
                        const userData = await appAuth.getCurrentUser();
                        if (userData && userData.emailVerification) {
                              // Here the userData will come check if user email is verified
                              dispatch(login(userData));
                        } else {
                              dispatch(logout());
                        }
                  } catch (err) {
                        console.log(err.message);

                        dispatch(logout());
                  }
            })();
      }, [dispatch, secret, userid]);
      useAllPosts();

      const menuItems = [
            { label: "Home", ariaLabel: "Go to home page", href: "/" },
            { label: "Journals", ariaLabel: "Read the journals", href: "/journals" },
      ];

      return (
            <>
                  <Toaster />
                  <PillNav items={menuItems} className="fixed top-0 hidden sm:flex" />
                  <Routes>
                        <Route index path="/" element={<Home />} />
                        <Route
                              path="/login"
                              element={
                                    <Protected authentication={false}>
                                          <Login />
                                    </Protected>
                              }
                        />
                        <Route
                              path="/create-account"
                              element={
                                    <Protected authentication={false}>
                                          <Signup />
                                    </Protected>
                              }
                        />
                        <Route
                              path="/journals"
                              element={
                                    <Protected>
                                          <Posts />
                                    </Protected>
                              }
                        />
                        <Route
                              path="/journals/:id"
                              element={
                                    <Protected>
                                          <ViewPost />
                                    </Protected>
                              }
                        />
                        <Route
                              path="/u/edit-post/:id"
                              element={
                                    <Protected>
                                          <EditPost />
                                    </Protected>
                              }
                        />
                        <Route
                              path="/write-post"
                              element={
                                    <Protected>
                                          <WritePost />
                                    </Protected>
                              }
                        />
                        <Route path="*" element={<Page404 />} />
                  </Routes>
                  <Footer />
            </>
      );
};

export default AppRoute;
