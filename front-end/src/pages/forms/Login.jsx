import { useState } from "react";
import { toast } from "react-hot-toast";
import Title from "../../components/title/Title";
import { Link } from "react-router-dom";
import { useDispatch } from "react-redux";
import { loginUser } from "../../redux/apiCalls/authApiCall";
import GoogleSignInButton from "../../components/googleSignInButton/GoogleSignInButton";
const Login = () => {
  const dispatch = useDispatch();
  const [dataToSubmit, setDataToSubmit] = useState({
    username: "",
    email: "",
    password: "",
    loading: false,
  });

  const formOnSubmit = async (e) => {
    try {
      e.preventDefault();
      setDataToSubmit((prev) => ({ ...prev, loading: true }));

      if (dataToSubmit.email.trim() === "") {
        return toast.error("email is required");
      }
      if (dataToSubmit.password.trim() === "") {
        return toast.error("password is required");
      }
      await dispatch(
        loginUser({
          email: dataToSubmit.email,
          password: dataToSubmit.password,
        })
      );
    } finally {
      setDataToSubmit((prev) => ({ ...prev, loading: false }));
    }
  };
  return (
    <div
      className="px-6 contianer login-container-height"
      style={{
        height: "calc(100vh - (72px +  48px))",
        display: "flex",
        justifyContent: "center",
        flexDirection: "column",
      }}
    >
      <div className="text-center">
        <Title title="Login" />
      </div>
      <form
        onSubmit={formOnSubmit}
        action=""
        className="flex gap-2 flex-col lg:w-[450px] w-[300px] items-center mx-auto"
      >
        <label className="w-full font-bold" htmlFor="email">
          Email :{" "}
        </label>
        <input
          value={dataToSubmit.email}
          id="email"
          type="text"
          className="w-full h-10 pl-4 rounded-xl"
          placeholder="Your email"
          onChange={(e) => {
            setDataToSubmit((prev) => ({ ...prev, email: e.target.value }));
          }}
        />
        <label className="w-full font-bold" htmlFor="password">
          Password :{" "}
        </label>
        <input
          value={dataToSubmit.password}
          id="password"
          type="password"
          className="w-full h-10 pl-4 rounded-xl"
          placeholder="Your password"
          onChange={(e) => {
            setDataToSubmit((prev) => ({ ...prev, password: e.target.value }));
          }}
        />
        <input
          type="submit"
          disabled={dataToSubmit.loading}
          value={dataToSubmit.loading ? "Loading..." : "Login"}
          className="w-full h-10 disabled:opacity-50 font-bold text-white rounded-xl cursor-pointer bg-blue-color"
        />
        <GoogleSignInButton />
      </form>
      <div className="my-6 text-center">
        Dont have an account ?
        <Link to="/register" className="font-bold text-primary-color">
          {" "}
          Register
        </Link>
      </div>
      {/* <div className="flex justify-center gap-3 my-6 text-center ">
        <Link
          to="/register"
          className="font-bold duration-500 text-primary-color hover:text-blue-color"
        >
          Create Account
        </Link>
        <p>_</p>
        <Link
          to="/forget-password"
          className="font-bold duration-500 text-primary-color hover:text-blue-color"
        >
          Forgot Password
        </Link>
      </div> */}
    </div>
  );
};
export default Login;
