import { useContext } from "react";
import AppContext from "../../hooks/StateContext";
import ReadByContianerStyles from "../styles/Conversation/ReadByContainerStyles";

export default function ReadByContainer({ readBy, participants }) {
  const { store, dispatch } = useContext(AppContext);
  const user = store.user;

  const readUsers = readBy.filter((readUser) => {
    return readUser.userId !== user._id;
  });

  const readUsersWithAvatarUrl = readUsers.map((readUser) => {
    const userObj = participants.find((participant) => {
      return readUser.userId === participant._id;
    });
    return { ...readUser, avatarUrl: userObj.avatarUrl };
  });

  return (
    <ReadByContianerStyles>
      {readUsersWithAvatarUrl.map((readUser) => {
        return (
          <div key={readUser._id} className="item-container">
            <img src={readUser.avatarUrl} />
            <div className="information">
              <div>{readUser.username} read chat</div>
            </div>
          </div>
        );
      })}
    </ReadByContianerStyles>
  );
}
