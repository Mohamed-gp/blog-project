// Import the authActions from the authSlice file
import { toast } from "react-hot-toast";
import { authActions } from "../slices/authSlice";
import request from "../../utils/request";

// Define a function loginUser that takes a user object as a parameter
// This function returns an async function that takes dispatch and getState as parameters
export function loginUser(user) {
  return async (dispatch, getState) => {
    // get state takes the state from the store
    try {
      // Send a POST request to the "http://localhost:3000/api/auth/login" endpoint
      // with the user object as the request body
      // with fetch but we use axios because it's light weight and use fetch under the hood
      // const response = await fetch("http://localhost:3000/api/auth/login", {
      //     method: "POST",
      //     body: JSON.stringify(user), // Transform the user object to JSON format
      //     headers: {
      //         "Content-Type": "application/json" // Set the content type header to indicate that the request body is in JSON format
      //     }
      // });

      const { data } = await request.post("/api/auth/login", user);
      // const {data} = await axios.post("http://localhost:3000/api/auth/login",user)

      // Parse the response body as JSON
      // with fetch
      // const data = await response.json();
      // Dispatch the login action with the data received from the server
      dispatch(authActions.login(data.data));
      localStorage.setItem("userInfo", JSON.stringify(data.data));
    } catch (error) {
      // Log any errors that occur during the API call
      toast.error(error.response.data.message);
      console.log(error.response.data.message);
    }
  };
}

export function logoutUser() {
  return (dispatch, getstate) => {
    dispatch(authActions.logout());
    localStorage.removeItem("userInfo");
  };
}

export function registerUser(user) {
  return async (dispatch) => {
    // get state takes the state from the store
    try {
      const { data } = await request.post("/api/auth/signup", user);
      dispatch(authActions.login(data.data));
      localStorage.setItem(
        "userRegisteredMessage",
        JSON.stringify(data.message)
      );
    } catch (error) {
      // Log any errors that occur during the API call
      toast.error(error.response.data.message);
      console.log(error.response.data.message);
    }
  };
}
