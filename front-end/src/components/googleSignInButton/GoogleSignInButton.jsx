import { GoogleAuthProvider, getAuth, signInWithPopup } from "firebase/auth";
import request from "../../utils/request";
import { app } from "../../utils/firebase";
import { useDispatch } from "react-redux";
import { authActions } from "../../redux/slices/authSlice";

import toast from "react-hot-toast";

import { useNavigate } from "react-router-dom";

const GoogleSignInButton = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const handleGoogleSignIn = async () => {
    try {
      const provider = new GoogleAuthProvider();
      const auth = getAuth(app);
      const result = await signInWithPopup(auth, provider);
      const { displayName, email, photoURL } = result.user;
      const { data } = await request.post("/api/auth/google", {
        username: displayName,
        email,
        profilePhoto: photoURL,
      });
      toast.success(data.message);
      dispatch(authActions.login(data.data));
      navigate("/");
    } catch (error) {
      console.log(error);
      toast.error(error.response.data.message);
    }
  };
  return (
    <button
      type="button"
      onClick={() => handleGoogleSignIn()}
      className="text-mainColor my-2 flex w-full justify-center gap-2 rounded-xl border-blue-color border-2 py-2"
    >
      <img
        src="/assets/images/Google.svg"
        alt="google"
        width={20}
        height={20}
      />
      <p className="text-primaryColor">Continue With Google</p>
    </button>
  );
};
export default GoogleSignInButton;
