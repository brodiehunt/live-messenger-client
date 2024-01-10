import { useContext, useState, useEffect } from "react";
import AppContext from "../hooks/StateContext";
import SocketContext from "../hooks/socket";
import {
  getRecievedRequests,
  getSentRequests,
  deleteRequest,
  acceptRequest,
} from "../services/friendServices";
import PageHeader from "../components/PageHeader";
import SearchFriendsInput from "../components/searchFriends/SearchFriendsInput";
import FriendRequests from "../components/searchFriends/FriendRequests";
import PeopleYouMayKnow from "../components/searchFriends/PeopleYouMayKnow";
import MutualFriendModal from "../components/searchFriends/MutualFriendModal";
import { useToast } from "../hooks/useToast";

export default function SearchFriend() {
  const { store, dispatch } = useContext(AppContext);
  const user = store.user;
  const socket = useContext(SocketContext);
  const [recievedRequests, setRecievedRequests] = useState([]);
  const [sentRequests, setSentRequests] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [mutualFriendModal, setMutualFriendModal] = useState(null);
  const { activateToast, ToastComponent } = useToast();

  useEffect(() => {
    if (socket) {
      const handleNewRequest = (friendship) => {
        if (friendship) {
          setRecievedRequests((prevRequests) => [friendship, ...prevRequests]);
        }
      };

      const handleAcceptedRequest = (friendship) => {
        if (friendship) {
          const sentRequestsCopy = [...sentRequests];
          const newRequests = sentRequestsCopy.filter((request) => {
            return request._id !== friendship._id;
          });

          setSentRequests(newRequests);
        }
      };

      socket.on("newRequest", handleNewRequest);
      socket.on("requestAccepted", handleAcceptedRequest);

      return () => {
        socket.off("newRequest", handleNewRequest);
        socket.off("requestAccepted", handleAcceptedRequest);
      };
    }
  }, [socket]);

  useEffect(() => {
    const getRequest = async () => {
      setIsLoading(true);
      try {
        const [recieved, sent] = await Promise.all([
          getRecievedRequests(),
          getSentRequests(),
        ]);

        setRecievedRequests(recieved);
        setSentRequests(sent);
      } catch (error) {
        console.log(error);
      }
      setIsLoading(false);
    };

    getRequest();
    dispatch({
      type: "setRequests",
      data: { count: 0 },
    });
  }, []);

  const addNewSentFriendship = (newRequest) => {
    setSentRequests([newRequest, ...sentRequests]);
  };

  const handleDelete = async (friendshipId, type) => {
    try {
      await deleteRequest(friendshipId);

      if (type === "recieved") {
        const newRequestState = recievedRequests.filter((friendship) => {
          return friendship._id !== friendshipId;
        });
        setRecievedRequests(newRequestState);
      } else {
        const newRequestState = sentRequests.filter((friendship) => {
          return friendship._id !== friendshipId;
        });
        setSentRequests(newRequestState);
      }
      activateToast("Request deleted", "", "success");
    } catch (error) {
      console.log("error", error);
      activateToast("Error", "Could not delete request. Try later.", "error");
    }
  };

  const handleAccept = async (friendshipId, friendName) => {
    try {
      await acceptRequest(friendshipId);

      const newRequestState = [...recievedRequests].filter((request) => {
        return request._id !== friendshipId;
      });

      setRecievedRequests(newRequestState);
      activateToast(
        "Friendship Accepted",
        `${friendName} is now your friend.`,
        "success"
      );
    } catch (error) {
      activateToast(
        "Error",
        "Could not accept friendship. Try later.",
        "error"
      );
    }
  };

  return (
    <>
      <ToastComponent />
      {mutualFriendModal && (
        <MutualFriendModal
          userId={mutualFriendModal}
          setMutualFriendModal={setMutualFriendModal}
        />
      )}
      <PageHeader user={user} pageTitle="Search Friends" />
      <SearchFriendsInput
        activateToast={activateToast}
        addNewSentFriendship={addNewSentFriendship}
      />
      <FriendRequests
        recievedRequests={recievedRequests}
        sentRequests={sentRequests}
        handleDelete={handleDelete}
        handleAccept={handleAccept}
        isLoading={isLoading}
      />
      <PeopleYouMayKnow
        addNewSentFriendship={addNewSentFriendship}
        activateToast={activateToast}
        setMutualFriendModal={setMutualFriendModal}
      />
    </>
  );
}
