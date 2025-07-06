import axios from "axios";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { useUser } from "../contexts/UserContext";
import VerifyEmail from "../components/VerifyEmail"; 

function UserProtectedWrapper({ children }) {
  const token = localStorage.getItem("token");
  const navigate = useNavigate();
  const { user, setUser } = useUser();

  const [loading, setLoading] = useState(true);
  const [isVerified, setIsVerified] = useState(false);

  useEffect(() => {
    if (!token) {
      navigate("/login");
      return;
    }

    axios
      .get(`${import.meta.env.VITE_SERVER_URL}/user/profile`, {
        headers: {
          token: token,
        },
      })
      .then((response) => {
        if (response.status === 200) {
          const user = response.data.user;
          setUser(user);
          localStorage.setItem(
            "userData",
            JSON.stringify({ type: "user", data: user })
          );
          setIsVerified(user.emailVerified); // assuming this is the field in your backend
        }
      })
      .catch(() => {
        localStorage.removeItem("token");
        localStorage.removeItem("userData");
        navigate("/login");
      })
      .finally(() => {
        setLoading(false);
      });
  }, [token]);

  if (loading) return null; // or a loading spinner

  if (!isVerified) {
    return <VerifyEmail user={user} role={"user"} />; // or navigate to /verify-email
  }

  return <>{children}</>;
}


export default UserProtectedWrapper;
