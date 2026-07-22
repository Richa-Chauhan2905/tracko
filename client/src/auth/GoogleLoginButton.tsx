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
  }

  return (
    <GoogleLogin
      onSuccess={(response) => {
        if (response.credential) {
          handleLogin(response.credential);
        }
      }}
      onError={() => {
        // Ignore failed Google login attempts silently.
      }}
    />
  );
}
