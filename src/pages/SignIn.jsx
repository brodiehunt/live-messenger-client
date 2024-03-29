import { Link } from "react-router-dom";
import Logo from "../components/Logo";
import SignInForm from "../components/Auth/SignInForm";
import Footer from "../components/Footer";
import AuthPageStyles from "../components/styles/Auth/AuthPageStyles";
import GoogleButton from "react-google-button";
import useScroll from "../hooks/useScroll";

export default function Signin() {
  useScroll();
  const google = () => {
    const baseUrl = import.meta.env.VITE_SERVER_URL_PROD;
    window.open(`${baseUrl}auth/google`, "_self");
  };

  return (
    <AuthPageStyles>
      <Logo />
      <h1>Sign into your account</h1>
      <div className="prompt">
        Dont have an account? Register
        <Link to="/register" className="inline-link">
          {" "}
          here.
        </Link>
      </div>
      <SignInForm />
      <div className="prompt bottom">
        Forget your password? Reset it
        <Link to="/request-reset" className="inline-link">
          {" "}
          here.
        </Link>
      </div>

      <div className="google-btn-container">
        or
        <GoogleButton onClick={google} />
      </div>
      <Footer />
    </AuthPageStyles>
  );
}
