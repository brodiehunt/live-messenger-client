import Profile from "../components/Profile";
import Nav from "../components/Nav";
import SearchBar from "../components/SearchBar";
import ConversationsList from "../components/Conversations/ConversationsList";
import styled from "styled-components";

const ConversationsStyles = styled.div`
    min-height: 100svh;
    background-color: white;

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
        <ConversationsList />
    </ConversationsStyles> 
  )
}