import styled from "styled-components";
import { FaRegCheckCircle } from "react-icons/fa";
import { RiErrorWarningLine } from "react-icons/ri";
const ToastStyles = styled.div`
  --color: ${(props) =>
    props.$type === "success" ? "var(--success-green)" : "var(--error-red)"};
  min-width: 100px;
  max-width: 350px;
  display: flex;
  align-items: center;
  gap: 1rem;
  background-color: white;
  padding: 1rem;
  border-radius: 0.5rem;
  border: 2px solid var(--color);
  position: fixed;
  bottom: 2rem;
  right: 1rem;

  .toast-icon {
    width: 25px;
    height: 25px;
    color: var(--color);
  }

  .title {
    font-weight: 700;
  }
`;

// NOTE: this component can be deleted

const Toast = ({ title, message, type }) => {
  console.log("toast");
  return (
    <ToastStyles $type={type}>
      <div className="icon-container">
        {type === "success" ? (
          <FaRegCheckCircle className="toast-icon" />
        ) : (
          <RiErrorWarningLine className="toast-icon" />
        )}
      </div>
      <div className="message-container">
        <p className="title">{title}</p>
        <p>{message}</p>
      </div>
    </ToastStyles>
  );
};

export default Toast;
