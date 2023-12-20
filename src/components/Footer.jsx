import FooterStyles from "./styles/Homepage/FooterStyles";
import { Link } from "react-router-dom";

import InstagramIcon from '../assets/instagram.svg';
import FacebookIcon from '../assets/facebook.svg';
import TwitterIcon from '../assets/twitter.svg';

export default function Footer() {

  return (
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
          <img className="icon" src={InstagramIcon}></img>
          <img className="icon" src={FacebookIcon}></img>
          <img className="icon" src={TwitterIcon}></img>
        </div>
      </div>
    </FooterStyles>
  )
}
