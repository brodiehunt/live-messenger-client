import { Link } from 'react-router-dom';
import Logo from '../components/Logo';
import ResetRequestForm from '../components/ResetRequestForm';
import AuthPageStyles from '../components/styles/AuthPageStyles';
import Footer from '../components/Footer';

export default function RequestReset() {
  return (
    <AuthPageStyles>
      <Logo />
      <h1>Request password reset</h1>
      <div className="prompt">
        Don't need to reset? Go to Sign In 
        <Link to="/signin" className="inline-link"> here.</Link>
      </div>
      <ResetRequestForm />
      <Footer />
    </AuthPageStyles>
  )
}