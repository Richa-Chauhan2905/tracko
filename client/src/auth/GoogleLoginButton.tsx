import { GoogleLogin } from "@react-oauth/google";
import { api } from "../api/api";
import { useNavigate } from "react-router-dom";

export default function GoogleLoginButton() {
  const navigate = useNavigate();
  async function handleLogin(credential: string) {
    const response = await api.post("/auth/google", {
      token: credential,
    });

    localStorage.setItem("token", response.data.token);
    navigate("/driver");
    console.log(response.data.user);
  }

  return (
    <GoogleLogin
      onSuccess={(response) => {
        if (response.credential) {
          handleLogin(response.credential);
        }
      }}
      onError={() => {
        console.log("Login failed");
      }}
    />
  );
}
