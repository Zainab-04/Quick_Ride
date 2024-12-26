import axios from "axios";
import React, { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { useCaptain } from "../contexts/CaptainContext";
function CaptainProtectedWrapper({ children }) {
  const token = localStorage.getItem("token");
  const navigate = useNavigate();
  const { setCaptain } = useCaptain();

  useEffect(() => {
    if (!token) {
      navigate("/captain/login");
    }

    axios
      .get(`${import.meta.env.VITE_SERVER_URL}/captain/profile`, {
        headers: {
          token: token,
        },
      })
      .then((response) => {
        if (response.status === 200) {
          setCaptain(response.data.captain);
        }
      })
      .catch((err) => {
        localStorage.removeItem("token");
        navigate("/captain/login");
      });
  }, [token]);

  return <>{children}</>;
}

export default CaptainProtectedWrapper;
