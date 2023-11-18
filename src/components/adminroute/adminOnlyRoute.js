import { selectuserEmail } from "../../redux/slice/authSlice";
import { useSelector } from "react-redux";
import Permision from "./Permision";

const AdminOnlyRoute = ({ children }) => {
  const useremail = useSelector(selectuserEmail);
  if (useremail === "test@gmail.com") {
    return children;
  }
  return (
    <Permision/>
  );
};

export const AdminOnlyLink = ({ children }) => {
  const useremail = useSelector(selectuserEmail);
  if (useremail === "test@gmail.com") {
    return children;
  }
  return null;
};
export default AdminOnlyRoute;
