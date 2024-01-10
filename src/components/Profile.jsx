import styled, { keyframes } from "styled-components";
import { Link } from "react-router-dom";
import { IoSettingsOutline } from "react-icons/io5";

const buttonHover = keyframes`
  0%, 100% {
    transform: rotate(-5deg);
  }
  50% {
    transform: rotate(5deg);
  }
`;

const ProfileStyles = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  gap: 1rem;
  padding: 1rem;

  .username {
    margin-right: auto;
    font-weight: 600;
    font-size: 1.2rem;
  }

  .user-avatar-container {
    width: 40px;
    height: 40px;

    img {
      width: 100%;
      border-radius: 50%;
      border: 2px solid var(--secondary);
    }
  }

  a:hover {
    scale: 1.1;
    animation: ${buttonHover} 0.3s linear 2;
    cursor: pointer;

    svg {
      color: var(--primary-hover);
    }
  }

  svg {
    width: 25px;
    height: 25px;
    color: var(--primary);
    border-radius: 50%;
  }
`;

export default function Profile({ user }) {
  return (
    <ProfileStyles>
      <div className="user-avatar-container">
        <img src={user.avatarUrl} alt={`${user.username} avatar`} />
      </div>
      <div className="username">Hello, {user.username}</div>
      <Link to={`/${user._id}/account`}>
        <IoSettingsOutline />
      </Link>
    </ProfileStyles>
  );
}
