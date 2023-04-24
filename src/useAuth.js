import { useSelector } from "react-redux";

//a custom hook to get the isAuthenticated value from the redux state
const useAuth = () => {
  const isAuthenticated = useSelector((state) => state.auth.isAuthenticated);
  return isAuthenticated;
};

export default useAuth;
