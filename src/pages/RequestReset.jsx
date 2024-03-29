import { Link } from "react-router-dom";
import Logo from "../components/Logo";
import ResetRequestForm from "../components/Auth/ResetRequestForm";
import AuthPageStyles from "../components/styles/Auth/AuthPageStyles";
import Footer from "../components/Footer";
import useScroll from "../hooks/useScroll";

export default function RequestReset() {
  useScroll();
  return (
    <AuthPageStyles>
      <Logo />
      <h1>Request password reset</h1>
      <div className="prompt">
        Don't need to reset? Go to Sign In
        <Link to="/signin" className="inline-link">
          {" "}
          here.
        </Link>
      </div>
      <ResetRequestForm />
      <Footer />
    </AuthPageStyles>
  );
}
