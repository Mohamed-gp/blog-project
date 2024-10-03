import { useState } from "react";
import { toast } from "react-hot-toast";
import Title from "../../components/title/Title";
import { Link } from "react-router-dom";
import { useDispatch } from "react-redux";
import { registerUser } from "../../redux/apiCalls/authApiCall";
import GoogleSignInButton from "../../components/googleSignInButton/GoogleSignInButton";

const Register = () => {
  const dispatch = useDispatch();
  const [dataToSubmit, setdataToSubmit] = useState({
    username: "",
    email: "",
    password: "",
    loading: false,
  });

  const formOnSubmit = (e) => {
    e.preventDefault();
    if (dataToSubmit.username.trim() === "") {
      return toast.error("username is required");
    }
    if (dataToSubmit.email.trim() === "") {
      return toast.error("email is required");
    }
    if (dataToSubmit.password.trim() === "") {
      return toast.error("password is required");
    }
    dispatch(
      registerUser({
        username: dataToSubmit.username,
        email: dataToSubmit.email,
        password: dataToSubmit.password,
      })
    );
  };

  return (
    <div
      className="px-6 contianer register-container-height"
      style={{
        height: "calc(100vh - (72px +  48px))",
        display: "flex",
        justifyContent: "center",
        flexDirection: "column",
      }}
    >
      <div className="text-center">
        <Title title="Register" />
      </div>
      <form
        onSubmit={formOnSubmit}
        action=""
        className="flex gap-2 flex-col lg:w-[450px] w-[300px] items-center mx-auto"
      >
        <label className="w-full font-bold" htmlFor="username">
          Username :{" "}
        </label>
        <input
          value={dataToSubmit.username}
          type="text"
          id="username"
          className="w-full h-10 pl-4 rounded-xl"
          placeholder="Your username"
          onChange={(e) => {
            setdataToSubmit((prev) => ({ ...prev, username: e.target.value }));
          }}
        />
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
            setdataToSubmit((prev) => ({ ...prev, email: e.target.value }));
          }}
        />
        <label className="w-full font-bold" htmlFor="password">
          Password :{" "}
        </label>

        <input
          id="password"
          value={dataToSubmit.password}
          type="password"
          className="w-full h-10 pl-4 rounded-xl"
          placeholder="Your password"
          onChange={(e) => {
            setdataToSubmit((prev) => ({ ...prev, password: e.target.value }));
          }}
        />

        <input
          type="submit"
          value="Create"
          className="w-full h-10 font-bold cursor-pointer text-white rounded-xl bg-blue-color"
        />
        <GoogleSignInButton />
      </form>
      <div className="my-6 text-center">
        Already have an account ?
        <Link to="/login" className="font-bold text-primary-color">
          {" "}
          Login
        </Link>
      </div>
    </div>
  );
};
export default Register;
