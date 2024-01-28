import { Link, useNavigate } from "react-router-dom";
import RegisterForm from "../components/Auth/RegisterForm";
import Logo from "../components/Logo";
import AuthPageStyles from "../components/styles/Auth/AuthPageStyles";
import GoogleButton from "react-google-button";
import Footer from "../components/Footer";
import useScroll from "../hooks/useScroll";
import { useContext, useState } from "react";
import AppContext from "../hooks/StateContext";
import { signInUserLocal } from "../services/authServices";

export default function Register() {
  // Redirect auth page onClick
  const navigate = useNavigate();
  const { store, dispatch } = useContext(AppContext);
  const [isLoading, setIsLoading] = useState(false);
  useScroll();
  const google = () => {
    const baseUrl = import.meta.env.VITE_SERVER_URL_PROD;
    window.open(`${baseUrl}auth/google`, "_self");
  };

  const dummySignIn = async () => {
    try {
      setIsLoading(true);
      const response = await signInUserLocal({
        email: "brodie@test.com",
        password: "Brodie1",
      });
      const user = response.data.data;
      const jwt = response.data.jwt;
      sessionStorage.setItem("jwt", jwt);
      dispatch({
        type: "setUser",
        data: user,
      });
      dispatch({
        type: "setRequests",
        data: { count: user.newRequests },
      });
      return navigate(`/${user._id}/account`);
    } catch (error) {
      if (error.code === "ECONNABORTED") {
        alert(
          "Request has timed out. This is because heroku server spins down after 30 minutes of inactivity. Try again now, and you should be able to log in."
        );
      }
    }

    setIsLoading(false);
  };

  return (
    <AuthPageStyles>
      <Logo />
      <h1>Account Registration</h1>
      <div className="prompt">
        Already have an account? Sign in
        <Link to="/signin" className="inline-link">
          {" "}
          here.
        </Link>
      </div>
      <RegisterForm />
      <div className="google-btn-container">
        or
        <button
          disabled={isLoading}
          onClick={dummySignIn}
          type="button"
          className="button"
        >
          Enter with dummy Account
        </button>
        {isLoading && <div>Logging you in to fake account ...</div>}
      </div>
      <div className="google-btn-container">
        or
        <GoogleButton onClick={google} />
      </div>
      <Footer />
    </AuthPageStyles>
  );
}
