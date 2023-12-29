import styled, {keyframes} from 'styled-components';
import { Link } from 'react-router-dom';
import { TiMessages } from "react-icons/ti";
import { BiMessageAdd } from "react-icons/bi";
import { FaRegUser } from "react-icons/fa";
import { FaUserPlus } from "react-icons/fa";

const buttonHover = keyframes`
  0%, 100% {
    transform: rotate(-5deg);
  }
  50% {
    transform: rotate(5deg);
  }
`;

const NavStyles = styled.nav`
  
  
  display: flex; 
  justify-content: space-around;
  align-items: center;
  

  a {
    padding: 1rem;

    svg {
      color: var(--primary);
      height: 20px;
      width: 20px;
    }
  }

  a:hover { 

    svg {
      color: var(--primary-hover);
      scale: 1.1;
      animation: ${buttonHover} 0.3s linear 2;
    }
  }
`;

export default function Nav({user}) {
  return (
    <NavStyles>
         <Link to={`/${user._id}`}
          
         >
          <TiMessages />
         </Link>
         <Link to={`/${user._id}/conversation/new`}
          
         >
         <BiMessageAdd />
         </Link>
         <Link to={`/${user._id}/friends`}
          
         >
         <FaRegUser />
         </Link>
         <Link to={`/${user._id}/search-friends`}
          
         >
         <FaUserPlus />
         </Link>
      </NavStyles>
  )
}