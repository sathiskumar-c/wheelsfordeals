import { useGetUserQuery, useLoginMutation } from "../redux/store/services/api";
import { useDispatch } from "react-redux";
import { logout } from "../redux/store/slices/authSlice";

export const useUserService = () => {
  const dispatch = useDispatch();
  const getUser = useGetUserQuery;
  const [login, loginState] = useLoginMutation();

  const handleLogout = () => dispatch(logout());
  const handleLogin = (credentials) => login(credentials);

  return {
    getUser,
    handleLogin,
    handleLogout,
    loginState,
  };
};
