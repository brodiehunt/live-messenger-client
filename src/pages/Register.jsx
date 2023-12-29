import { Link } from 'react-router-dom';
import RegisterForm from "../components/Auth/RegisterForm"
import Logo from '../components/Logo';
import AuthPageStyles from '../components/styles/Auth/AuthPageStyles';
import GoogleButton from 'react-google-button';
import Footer from '../components/Footer';

export default function Register() {
  const google = () => {
    const baseUrl = import.meta.env.VITE_SERVER_URL;
    window.open(`${baseUrl}/auth/google`, "_self");
  }

  return (
  <AuthPageStyles>
    <Logo />
    <h1>Account Registration</h1>
    <div className="prompt">
      Already have an account? Sign in  
      <Link to="/signin" className="inline-link"> here.</Link>
    </div>
    <RegisterForm />
    <div className="google-btn-container">
      or
      <GoogleButton onClick={google}/>
    </div>
    <Footer />
  </AuthPageStyles>
  )
}