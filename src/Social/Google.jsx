import { useNavigate } from "react-router-dom";
import useAuth from "../hook/useAuth";

const Google = () => {
  const { google } = useAuth();
  const navigate = useNavigate()

  const handleGoogleLogin = () => {
    google()
    .then(() => {
      navigate("/")
      return alert("your login successfull");
    })
  };
  return (
    <div>
      <button
        onClick={handleGoogleLogin}
        className="px-5 py-2 w-full mt-3 border-2 bg-[#FA4612] text-white text-xl rounded-xl"
      >
        Continue with Google
      </button>
    </div>
  );
};

export default Google;
