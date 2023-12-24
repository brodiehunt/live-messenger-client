import api from '../config/api';


export const findUsers = async (searchVal) => {
  console.log(searchVal, 'searchVal')
  const response = await api.get('/user/searchUsers', {
    params: { searchVal: searchVal }
  });
  return response;
}