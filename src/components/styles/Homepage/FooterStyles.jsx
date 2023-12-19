import styled from 'styled-components';
import footerImgMob from '../../../assets/homepage/mobile/image-footer.jpg';
import footerImgTab from '../../../assets/homepage/tablet/image-footer.jpg';
import footerImgDesktop from '../../../assets/homepage/desktop/image-footer.jpg';

const FooterStyles = styled.footer`
  padding: 4.5rem 1.5rem;
  text-align: center;
  position: relative;
  color: var(--background-light);
  z-index: 3;

  .sheild {
    position: absolute;
    width: 100%;
    height: 100%;
    top: 0;
    left: 0;
    z-index: 0;
    background-image: url(${footerImgMob});
    background-repeat: no-repeat;
    background-position: center center;
    background-size: cover;
  }

  .background-img {
    position: absolute;
    width: 100%;
    height: 100%;
    top: 0;
    left: 0;
    z-index: 1;
    background-color: rgba(77, 150, 169, 0.8);
  }

  .z-index {
    position: relative;
    z-index: 4;
  }

  h2 {
    font-size: 2rem;
    font-weight: 900;
    line-height: 2.25rem;
    margin-bottom: 1.5rem;
    z-index: 4;
  }

  .footer-text {
    font-size: 1.125rem;
    font-weight: 500;
    line-height: 1.625rem;
    margin-bottom: 2rem;
  }

  .link-secondary {
      padding: 1rem 1.8rem;
      color: var(--background-light);
      border-radius: 1.8125rem;
      font-weight: 900;
      line-height: 1.625rem;
      transition: 0.2s ease-in all;
      background-color: var(--secondary);
  }

  .link-secondary:hover,
  .link-secondary:focus {
    background-color: var(--secondary-hover);
    outline: none;
  } 

  .link-secondary:focus {
    outline: 2px solid var(--secondary)
  }

  @media (min-width: 768px) {

    .sheild {
      background-image: url(${footerImgTab})
    }

    h2 {
      font-size: 2.5rem;
      max-width: 28rem;
      line-height: 2.75rem;
      margin: 0 auto;
      margin-bottom: 2rem;
    }

    .footer-text {
      margin: 0 auto;
      margin-bottom: 2.5rem;
      max-width: 35rem;
      
    }
  };

  @media (min-width: 1024px) {

  };
`;
export default FooterStyles;