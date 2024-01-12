import styled from "styled-components";

const NewConversationInfoStyles = styled.div`
  padding: 0rem 2rem;

  .recipients-container {
    padding: 1rem 0.5rem;
    border-radius: 0.5rem;
    background-color: white;
    box-shadow: 0 4px 8px 0 rgba(0, 0, 0, 0.05);
    margin-bottom: 2rem;
    display: flex;
    align-items: center;
    flex-wrap: wrap;
    gap: 1rem;
  }

  span {
    font-weight: 700;
  }

  .recipient-item {
    display: flex;
    align-items: center;
    gap: 0.5rem;
    padding: 0.1rem 0.5rem;
    border-radius: 1rem;
    border: 1px solid var(--secondary);
    /* background-color: var(--primary-hover); */
    font-size: 0.8rem;
    font-weight: 600;
    color: var(--text-dark);
  }

  button.delete-recipient {
    background: none;
    border: none;
    padding: none;
    cursor: pointer;
    display: flex;
    align-items: center;

    svg {
      width: 15px;
      height: 15px;
    }
  }
`;

export default NewConversationInfoStyles;
