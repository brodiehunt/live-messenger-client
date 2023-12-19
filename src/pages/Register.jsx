import { Link } from 'react-router-dom';
import RegisterForm from "../components/RegisterForm"
import Logo from '../components/Logo';
import FooterStyles from '../components/styles/Homepage/FooterStyles';
import AuthPageStyles from '../components/styles/AuthPageStyles';


export default function Register() {
  return (
  <AuthPageStyles>
    <Logo />
    <h1>Account Registration</h1>
    <div className="prompt">
      Already have an account? Sign in  
      <Link to="/signin" className="inline-link"> here.</Link>
    </div>
    <RegisterForm />
    <FooterStyles>
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