import Logo from '../components/Logo';
import ResetPasswordForm from '../components/ResetPasswordForm';
import Footer from '../components/Footer';
import AuthPageStyles from '../components/styles/AuthPageStyles';

export default function ResetPassword() {
  return (
    <AuthPageStyles>
      <Logo />
      <h1>Reset your password</h1>
      <ResetPasswordForm />
      <Footer />
    </AuthPageStyles>
  )
}
