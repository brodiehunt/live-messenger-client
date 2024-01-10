import styled, { keyframes } from "styled-components";
import { Link } from "react-router-dom";
import { TiMessages } from "react-icons/ti";
import { BiMessageAdd } from "react-icons/bi";
import { FaRegUser } from "react-icons/fa";
import { FaUserPlus } from "react-icons/fa";
import { useContext } from "react";
import AppContext from "../hooks/StateContext";

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
    position: relative;

    svg {
      color: var(--primary);
      height: 20px;
      width: 20px;
    }

    .notification {
      width: 20px;
      height: 20px;
      padding: 0.2rem;
      font-size: 0.6rem;
      font-weight: 700;
      color: white;
      background-color: var(--secondary);
      border-radius: 50%;
      position: absolute;
      top: 0;
      right: 0;
      text-align: center;
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

export default function Nav({ user }) {
  const { store } = useContext(AppContext);

  return (
    <NavStyles>
      <Link to={`/${user._id}`}>
        <TiMessages />
      </Link>
      <Link to={`/${user._id}/conversation/new`}>
        <BiMessageAdd />
      </Link>
      <Link to={`/${user._id}/friends`}>
        <FaRegUser />
      </Link>
      <Link to={`/${user._id}/search-friends`}>
        <FaUserPlus />
        {store.newRequests.count > 0 && (
          <div className="notification">{store.newRequests.count}</div>
        )}
      </Link>
    </NavStyles>
  );
}
