import { Link } from 'react-router-dom';
import Logo from '../components/Logo';
import SignInForm from '../components/SignInForm';
import FooterStyles from '../components/styles/Homepage/FooterStyles';
import AuthPageStyles from '../components/styles/AuthPageStyles';
import GoogleButton from 'react-google-button';

export default function Signin() {
  const google = () => {
    const baseUrl = import.meta.env.VITE_SERVER_URL;
    window.open(`${baseUrl}/auth/google`, "_self");
  }

  return (
    <AuthPageStyles>
      <Logo />
      <h1>Sign into your account</h1>
      <div className="prompt">
        Dont have an account? Register 
        <Link to="/register" className="inline-link"> here.</Link>
      </div>
      <SignInForm />
      <div className="prompt bottom">
        Forget your password? Reset it 
        <Link to="/request-reset" className="inline-link"> here.</Link>
      </div>

      <div className="google-btn-container">
        or
        <GoogleButton onClick={google}/>
      </div>
      <FooterStyles >
        <div className="sheild"></div>
          <div className="background-img"></div>
          <div className="z-index">
            <h2>Experience more together</h2>
            <p className="footer-text">
              Lorem ipsum dolor sit, amet consectetur adipisicing elit. Inventore officia, adipisci 
              atque beatae molestias quidem reprehenderit delectus deleniti, nam quis, vel a hic? 
              Praesentium, eveniet eos. Vitae esse ducimus sapiente!
            </p>
            <Link to="/register" className="link-secondary">Join Now</Link>
            <div className="social-links">

            </div>
          </div>
      </FooterStyles>
    </AuthPageStyles>
  )
}

