import { useState } from 'react';
import styled from 'styled-components';
import RequestItem from './FriendRequestItem';

const FriendRequestsStyles = styled.div`
  padding: 1rem;

  h2 {
    margin-bottom: 1rem;
  }

  .toggle-view {
    display: flex;
  }

  .toggle-button {
    color: var(--text-dark);
    font-weight: 600;
    font-size: 1.2rem;
    width: 50%;
    padding: 0.5rem;
    background: none;
    border: none;
    cursor: pointer;
    margin-bottom: 1rem;
  }

  .toggle-button.active {
    border-bottom: 4px solid var(--primary);
  }

  .toggle-button:first-child {
    /* border-right: 1px solid black; */
  }

  .toggle-button:hover{
    background-color: white;
  }

  .requests-container {
    padding-top: 1.5rem;
    min-height: 100px;
    max-height: 300px;
    overflow-y: scroll;
    scrollbar-width: none;
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
  }

  .requests-container::-webkit-scrollbar {
      display: none;
    }
`;


const FriendRequests = ({
  recievedRequests,
  sentRequests,
  handleDelete,
  handleAccept
}) => {
  const [recievedActive, setRecievedActive] = useState(true);
  
  return (
    <FriendRequestsStyles>
      <h2>Friend Requests</h2>
      <div className="toggle-view">
        <button 
          className={`toggle-button ${recievedActive && 'active'}`}
          onClick={() => setRecievedActive(true)}
        >
          Recieved
        </button>
        <button 
          className={`toggle-button ${!recievedActive && 'active'}`}
          onClick={() => setRecievedActive(false)}
        >
          Sent
        </button>
      </div>
      <div className="requests-container">
        {recievedActive 
          ? (
            recievedRequests.length > 0 
              ? (
                recievedRequests.map((request) => {
                  return (
                  <RequestItem 
                    key={request.userDetails._id} 
                    friendshipId={request._id} 
                    type="recieved" 
                    user={request.userDetails} 
                    handleDelete={handleDelete}
                    handleAccept={handleAccept}
                  />
                  )
                })
              )
              : (
                <div className="no-requests">You have no Friend Requests</div>
              )
          )
          : (
            sentRequests.length > 0 
            ? (
              sentRequests.map((request) => {
                return (
                <RequestItem 
                  key={request.userDetails._id} 
                  friendshipId={request._id}
                  type="sent" 
                  user={request.userDetails} 
                  handleDelete={handleDelete}
                />
                )
              })
            )
            : (
              <div className="no-requests">You have no pending requests.</div>
            )
          )
        }
      </div>
      
    </FriendRequestsStyles>
  )
};

export default FriendRequests;