import styled from "styled-components";

const ConversationHeaderStyles = styled.div`
  padding: 1rem 2rem;
  background-color: white;
  display: flex;
  align-items: center;
  gap: 1rem;

  img {
    width: 35px;
    height: 35px;
    border-radius: 50%;
  }

  .group-name {
    font-weight: 700;
  }

  .options {
    margin-left: auto;
    display: flex;
    align-items: center;
    border: none;
    background: none;
    cursor: pointer;

    svg {
      width: 25px;
      height: 25px;
      color: var(--primary);
    }
  }
`;

export default ConversationHeaderStyles;
