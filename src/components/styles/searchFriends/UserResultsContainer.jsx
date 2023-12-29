import styled from "styled-components";

const UserResultsContainer = styled.div`
  /* padding: 1rem 0; */
  margin: 0 1rem;
  max-height: 400px;
  overflow-y: scroll;
  scrollbar-width: none;
  background-color: white;
  border-radius: 0.5rem;
  &::-webkit-scrollbar {
      display: none;
  }

`;

export default UserResultsContainer;