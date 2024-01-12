import styled from "styled-components";

const ConversationListItemStyles = styled.div`
  width: 100%;
  &:first-child {
    border-top: 1px solid rgba(135, 135, 157, 0.3);
  }

  a {
    display: flex;
    align-items: center;
    gap: 1rem;
    padding: 1rem 0;
    border-bottom: 1px solid rgba(135, 135, 157, 0.3);
    width: 100%;
    cursor: pointer;
    position: relative;
  }

  .img-container {
    position: relative;

    img {
      width: 35px;
      height: 35px;
      border-radius: 50%;
    }

    .second-img {
      position: absolute;
      top: -10px;
      left: 10px;
    }

    .first-img {
      position: relative;
      width: 40px;
      height: 40px;
      bottom: -10px;
      z-index: 2;
      border: 3px solid white;
    }
  }

  .content {
    width: 65%;
  }
  .users {
    font-weight: 700;
    white-space: nowrap;
    overflow: hidden;
    text-overflow: ellipsis;
    max-width: 100%;
  }

  .last-message {
    font-size: 0.8rem;
    color: ${({ $isRead }) =>
      $isRead ? "var(--text-light)" : "var(--text-dark)"};
    font-weight: ${({ $isRead }) => ($isRead ? "400" : "700")};
    white-space: nowrap;
    overflow: hidden;
    text-overflow: ellipsis;
    max-width: 100%;
  }

  .unread-indicator {
    position: absolute;
    height: 10px;
    width: 10px;
    border-radius: 50%;
    background-color: var(--primary);
    right: 0;
    transform: translateY(-50%);
  }

  .date {
    font-size: 0.7rem;
    color: ${({ $isRead }) =>
      $isRead ? "var(--text-light)" : "var(--text-dark)"};
    font-weight: ${({ $isRead }) => ($isRead ? "400" : "700")};
    margin-top: auto;
    margin-left: auto;
  }
`;

export default ConversationListItemStyles;
