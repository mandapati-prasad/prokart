import { useSelector } from "react-redux";
import { selectIsLoggedIn } from "../../redux/slice/authSlice";

export const ShowOnLogin = ({ children }) => {
  const islogedin = useSelector(selectIsLoggedIn);
  if (islogedin) {
    return children;
  }
  return null;
};

export const ShowOnLogout = ({ children }) => {
  const islogedin = useSelector(selectIsLoggedIn);
  if (!islogedin) {
    return children;
  }
  return null;
};
