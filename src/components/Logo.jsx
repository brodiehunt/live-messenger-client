import styled from 'styled-components';
import { Link } from 'react-router-dom';

const LogoStyles = styled.div`
  padding-top: 3rem;
  margin: 0 auto;
  margin-bottom: 3rem;
  text-align: center;
  font-size: 2rem;
  line-height: 2rem;
  font-weight: 900;
  display: flex;
  justify-content: center;
  align-items: center;

  .circle-1,
  .circle-2 {
    width: 1rem;
    height: 1rem;
    border-radius: 50%;
  }

  .circle-1 {
    margin-top: auto;
    background-color: var(--primary);
  }
  .circle-2 {
    margin-bottom: auto;
    background-color: var(--secondary);
  }

  @media (min-width: 768px) {
    margin-bottom: 4rem;
  }
`;

const Logo = () => {

  return (
    <Link to="/">
      <LogoStyles className="logo-container">
        <div aria-hidden="true" className="circle-1"></div>
        <div aria-hidden="true" className="circle-2"></div>
        Chatter
      </LogoStyles>
    </Link>
  )
}

export default Logo;