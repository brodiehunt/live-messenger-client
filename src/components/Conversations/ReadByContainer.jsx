import { useContext } from "react";
import styled from "styled-components";
import AppContext from "../../hooks/StateContext";


const ReadByContianerStyles = styled.div`
  padding: 0.5rem 1rem;
  text-align: right;
  background-color: var(--background-light);
  display: flex;
  justify-content: end;
  align-items: center;
  font-weight: 500;
  font-size: 0.8rem;
  overflow: visible;
  z-index: 2;
  position: relative;

  .item-container {
    position: relative;
    overflow: visible;
  }

  img {
    width: 20px;
    height: 20px;
    border-radius: 50%;
    cursor: pointer;
    
  }

  span {
    margin-right: 1rem;
  }

  .information {
    position: absolute;
    padding: 0.2rem 0.5rem;
    background-color: var(--text-dark);
    border-radius: 0.5rem;
    color: white;
    top: -20px;
    right: 0;
    white-space: nowrap;
    display: none;
  }

  img:hover + .information {
    display: block;
    
  }
  
`;

export default function ReadByContainer({readBy, participants}){
  const {store, dispatch} = useContext(AppContext);
  const user = store.user;
  
  
  const readUsers = readBy.filter((readUser) => {
    return readUser.userId !== user._id;
  })


  const readUsersWithAvatarUrl = readUsers.map((readUser) => {
    const userObj = participants.find((participant) => {
      return readUser.userId === participant._id;
    });
    return {...readUser, avatarUrl: userObj.avatarUrl}
  });

  return (  
    <ReadByContianerStyles>
      {/* <span>readBy</span> */}
      {readUsersWithAvatarUrl.map((readUser) => {
        return (
          <div key={readUser._id} className="item-container">
            <img src={readUser.avatarUrl} />
            <div className="information">
              <div>
              {readUser.username} read chat
              </div>
              
              </div>
          </div>
        )
      })}
    </ReadByContianerStyles>
  )
}