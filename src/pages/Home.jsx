import headerImgSml from '../assets/homepage/tablet/image-hero.png';
import headerImgLeft from '../assets/homepage/desktop/image-hero-left.png';
import headerImgRight from '../assets/homepage/desktop/image-hero-right.png';
import imgGrid1 from '../assets/homepage/desktop/image-man-texting.jpg';
import imgGrid2 from '../assets/homepage/desktop/image-men-in-meeting.jpg';
import imgGrid3 from '../assets/homepage/desktop/image-woman-in-videocall.jpg';
import imgGrid4 from '../assets/homepage/desktop/image-women-videochatting.jpg';
import Logo from '../components/Logo';
import styled from 'styled-components';
import HeroStyles from '../components/styles/Homepage/HeroStyles';
import ImgGridStyles from '../components/styles/Homepage/ImgGridStyles';
import FooterStyles from '../components/styles/Homepage/FooterStyles';
import { Link } from 'react-router-dom';



export default function Home() {
  return (
    <div>
      <header>
        <Logo />
      </header>
      <main>
        <HeroStyles aria-labelledby="hero-title">
          <img className="img-center" src={headerImgSml} alt="" aria-hidden="true"/>
          <img className="img-left" src={headerImgLeft} alt="" aria-hidden="true"/>
          <div className="header-content">
            <h1 id="hero-title">Live Messenger for Everyone</h1>
            <p>Chatter makes it easy to connect with your firends and colleagues with real-time instant messaging and group chats</p>
            <div className="links">
              <Link className="link-primary" to='/register'>Register</Link>
              <Link className="link-secondary" to='/signin'>Sign In</Link>
            </div>
          </div>
          <img className="img-right" src={headerImgRight} alt="" aria-hidden="true"/>
        </HeroStyles>
        <ImgGridStyles aria-labelledby="info-section-title">
          <div className="image-grid">
            <div className="img-container">
              <img 
                src={imgGrid1} 
                alt="Man texting on chatter"
              />
            </div>
            <div className="img-container">
              <img 
                src={imgGrid2} 
                alt="Man in a meeting on chatter"
              />
            </div>
            <div className="img-container">
              <img 
                src={imgGrid3}
                alt="Women in a videocall on chatter" 
              />
            </div>
            <div className="img-container">
              <img 
                src={imgGrid4} 
                alt="Multiple women videochatting on chatter"
              />
            </div>
          </div>
          <div className="statement" >A modern chat app</div>
          <h2 id="info-section-title">Seamless communication with friends, all in one place</h2>
          <p data-testid="info">
            Lorem ipsum dolor sit amet, consectetur adipisicing elit. Esse fugiat perspiciatis, 
            distinctio sapiente molestias odit aliquid asperiores illo est beatae, non in vero nulla 
            rem voluptas harum id maiores cum!
          </p>
        </ImgGridStyles>
        
      </main>
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
    </div>
  )
}