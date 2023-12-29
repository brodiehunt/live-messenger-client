import api from '../config/api';


export const findUsers = async (searchVal) => {
  console.log(searchVal, 'searchVal')
  const response = await api.get('/user/searchUsers', {
    params: { searchVal: searchVal }
  });
  return response;
}

export const getRecievedRequests = async () => {
  const response = await api.get('/friendships/request/recieved');
  return response.data.data;
}

export const getSentRequests = async () => {
  const response = await api.get('/friendships/request/sent');
  return response.data.data;
}

export const sendRequest = async (recieverId) => {
  console.log('request', recieverId)
  const response = await api.post('/friendships/request', {id: recieverId});
  return response.data.data;
}

export const deleteRequest = async (friendshipId) => {
  const response = await api.delete(`/friendships/request/${friendshipId}`);
  return response;
}

export const acceptRequest = async (friendshipId) => {
  const response = await api.put(`/friendships/request/${friendshipId}`);
  return response;
}

export const getLikelyFriends = async () => {
  const response = await api.get('/friendships/potentialFriends');
  return response.data.data;
}

export const getMutualFriends = async (userId) => {
  const response = await api.get('/friendships/mutualFriends', {
    params: { otherUserId: userId}
  })
  return response.data.data;
}