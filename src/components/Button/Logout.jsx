import { useDispatch } from "react-redux";
import appAuth from "../../app/AuthService";
import { logout } from "../../store/reducers/authSlice";
import { useNavigate } from "react-router-dom";
import { useState } from "react";
import { Loader, LogoutIcon } from "../index";
import { removePosts } from "../../store/reducers/postsSlice";
const Logout = () => {
      const dispatch = useDispatch();
      const navigate = useNavigate();
      const [loader, setLoader] = useState(false);
      const handleLogout = () => {
            setLoader(true);
            appAuth.Logout().then(() => {
                  dispatch(removePosts());
                  dispatch(logout());
                  setLoader(false);
                  navigate("/");
            });
      };
      return (
            <button disabled={loader} onClick={handleLogout} className="px-4 flex justify-center items-center cursor-pointer py-2 text-sm tracking-tight leading-none  text-red-500 rounded-full">
                  {loader ? (
                        <Loader />
                  ) : (
                        <>
                              <LogoutIcon />
                              <p>Logout</p>
                        </>
                  )}
            </button>
      );
};

export default Logout;
