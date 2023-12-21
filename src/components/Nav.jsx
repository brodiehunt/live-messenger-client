import styled from 'styled-components';
import { NavLink, Link } from 'react-router-dom';
import { TiMessages } from "react-icons/ti";
import { BiMessageAdd } from "react-icons/bi";
import { FaRegUser } from "react-icons/fa";
import { FaUserPlus } from "react-icons/fa";

const NavStyles = styled.nav`
  
  
  display: flex; 
  justify-content: space-around;
  align-items: center;
  border-bottom: 1px solid var(--text-light);

  a {
    padding: 1rem;
  }

  a.active {
    background-color: var(--primary);
  }

  a:hover {
    background-color: var(--primary);
  }
`;

export default function Nav({user}) {
  return (
    <NavStyles>
         <NavLink to={`/${user._id}`}
          className={({ isActive, isPending }) =>
          isActive
            ? "active"
            : isPending
            ? "pending"
            : ""
          }
         >
          <TiMessages />
         </NavLink>
         <NavLink to={`/${user._id}/conversation/new`}
          className={({ isActive, isPending }) =>
          isActive
            ? "active"
            : isPending
            ? "pending"
            : ""
          }
         >
         <BiMessageAdd />
         </NavLink>
         <NavLink to={`/${user._id}/friends`}
          className={({ isActive, isPending }) =>
          isActive
            ? "active"
            : isPending
            ? "pending"
            : ""
          }
         >
         <FaRegUser />
         </NavLink>
         <NavLink to={`/${user._id}/search-friends`}
          className={({ isActive, isPending }) =>
          isActive
            ? "active"
            : isPending
            ? "pending"
            : ""
          }
         >
         <FaUserPlus />
         </NavLink>
      </NavStyles>
  )
}