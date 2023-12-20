import { Link } from 'react-router-dom';
import Logo from '../components/Logo';
import ResetRequestForm from '../components/ResetRequestForm';
import FooterStyles from '../components/styles/Homepage/FooterStyles';
import AuthPageStyles from '../components/styles/AuthPageStyles';

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