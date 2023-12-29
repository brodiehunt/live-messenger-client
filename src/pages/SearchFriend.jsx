import { useContext,useState, useEffect } from "react";
import AppContext from "../hooks/StateContext";
import { 
  getRecievedRequests, 
  getSentRequests,
  deleteRequest,
  acceptRequest
} from '../services/friendServices';
import PageHeader from "../components/PageHeader";
import SearchFriendsInput from "../components/searchFriends/SearchFriendsInput";
import FriendRequests from "../components/searchFriends/FriendRequests";
import PeopleYouMayKnow from "../components/searchFriends/PeopleYouMayKnow";
import Toast from '../components/NotificationToast';
import MutualFriendModal from "../components/searchFriends/MutualFriendModal";

export default function SearchFriend() {
  const {store, dispatch} = useContext(AppContext);
  const user = store.user;
  const [recievedRequests, setRecievedRequests] = useState([]);
  const [sentRequests, setSentRequests] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [mutualFriendModal, setMutualFriendModal] = useState(null);
  const [toast, setToast] = useState({
    active: false, 
    title: '',
    message: '',
    type: ''
  });

  useEffect(() => {
    const getRequest = async () => {
      try {
        const [recieved, sent] = await Promise.all([
          getRecievedRequests(),
          getSentRequests()
        ]);

        
        setRecievedRequests(recieved);
        setSentRequests(sent)
        
      } catch(error) {
        console.log(error);
      }
    }

    getRequest();
  }, []);

  const activateToast = (title, message, type) => {
    console.log(title, message, type)
    setToast({
      title: title,
      message: message,
      type: type,
      active: true
    })
    setTimeout(() => setToast({active: false}), 5000)
  }

  const addNewSentFriendship = (newRequest) => {
    setSentRequests([...sentRequests, newRequest])
  }

  const handleDelete = async (friendshipId, type) => {
    try {
      
      await deleteRequest(friendshipId);
      
      if (type === 'recieved') {
        const newRequestState = recievedRequests.filter((friendship) => {
          return friendship._id !== friendshipId
        });
        setRecievedRequests(newRequestState)
      } else {
        const newRequestState = sentRequests.filter((friendship) => {
          return friendship._id !== friendshipId
        });
        setSentRequests(newRequestState);
      }
      activateToast('Request deleted', '', 'success');
    } catch(error) {
      console.log('error', error);
    }
  }

  const handleAccept = async (friendshipId, friendName) => {
    try {

      await acceptRequest(friendshipId);

      const newRequestState = [...recievedRequests].filter((request) => {
        return request._id !== friendshipId
      })

      setRecievedRequests(newRequestState);
      activateToast('Friendship Accepted', `${friendName} is now your friend.`, 'success')
    } catch(error) {
      activateToast('Error', 'Could not accept friendship. Try later.', 'error');
    }
  }
  // Will contain search component
  // will container friend requests component.
  // Will contain people you may know component. 
  return (
    <>
      {toast.active &&
        <Toast 
          title={toast.title}
          type={toast.type} 
          message={toast.message}
        />
      }
      {mutualFriendModal && 
        <MutualFriendModal 
          userId={mutualFriendModal}
          setMutualFriendModal={setMutualFriendModal}
        />
      }
      <PageHeader 
        user={user} 
        pageTitle="Search Friends"
      />
      <SearchFriendsInput 
        activateToast={activateToast}
        addNewSentFriendship={addNewSentFriendship}
      />
      <FriendRequests
        recievedRequests={recievedRequests}
        sentRequests={sentRequests}
        handleDelete={handleDelete}
        handleAccept={handleAccept}
      />
      <PeopleYouMayKnow 
        addNewSentFriendship={addNewSentFriendship}
        activateToast={activateToast}
        setMutualFriendModal={setMutualFriendModal}
      />
    </>
  )
}