import styled from 'styled-components';
import { Link } from 'react-router-dom';
import defaultAvatar from '../assets/defaultAvatar.png';
import { IoSettingsOutline } from "react-icons/io5";

const ProfileStyles = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  gap: 1rem;
  padding: 1rem;
  border-bottom: 1px solid var(--text-light);

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
    }
  }
`;


export default function Profile({user}) {
  return (
    <ProfileStyles>
      <div className="user-avatar-container">
        <img src={user?.avatarUrl ? `${user.avatarUrl}` : defaultAvatar } alt={`${user.username} avatar`}/>
      </div>
      <div className="username">Hello, {user.username}</div>
      <Link to={`/${user._id}/account`}>      
        <IoSettingsOutline />
      </Link>
    </ProfileStyles>
  )
}