import { useState } from 'react';
import RequestItem from './FriendRequestItem';
import FriendRequestsStyles from '../styles/searchFriends/FriendRequestStyles';

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