import Logo from "../components/Logo";
import ResetPasswordForm from "../components/Auth/ResetPasswordForm";
import Footer from "../components/Footer";
import AuthPageStyles from "../components/styles/Auth/AuthPageStyles";
import useScroll from "../hooks/useScroll";

export default function ResetPassword() {
  useScroll();
  return (
    <AuthPageStyles>
      <Logo />
      <h1>Reset your password</h1>
      <ResetPasswordForm />
      <Footer />
    </AuthPageStyles>
  );
}
