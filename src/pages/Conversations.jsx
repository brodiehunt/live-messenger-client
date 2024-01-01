import Profile from "../components/Profile";
import Nav from "../components/Nav";
import SearchBar from "../components/SearchBar";
import ConversationsList from "../components/Conversations/ConversationsList";
import styled from "styled-components";

const ConversationsStyles = styled.div`
    height: 100vh;
    background-color: white;
    display: flex;
    flex-direction: column;

    @media (min-width: 768px) {
      width: 375px;
      min-width: 375px;
    }
`;
export default function Conversations({user}) {

  return (
    <ConversationsStyles>
        <Profile user={user}/>
        <Nav user={user}/>
        <SearchBar 
          handleChange={() => console.log('search convo')}
          name="searchConversations"
          placeholder="Search conversations"
          value=''
          label="Search your conversations"
        />
        <ConversationsList user={user}/>
    </ConversationsStyles> 
  )
}