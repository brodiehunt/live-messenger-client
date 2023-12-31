import { useRef, useState } from 'react';
import styled from 'styled-components';
import { FaRegCheckCircle } from "react-icons/fa";
import { RiErrorWarningLine } from "react-icons/ri";

const ToastStyles = styled.div`
  --color: ${props => props.$type === 'success' ? 'var(--success-green)' : 'var(--error-red)'};
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
    color: var(--color)
  }

  .title {
    font-weight: 700;
  }

`;

export const useToast = () => {
  const [toast, setToast] = useState({ 
    title: '', 
    message: '', 
    type: '',
    active: false
  });
  const timeoutId = useRef(null);

  const activateToast = (title, message, type) => {
    clearTimeout(timeoutId.current)
    setToast({title, message, type, active: true})
    timeoutId.current = setTimeout(() => setToast({ ...toast, active: false }), 5000);

  };

  const ToastComponent = () => (
    toast.active && (
      <ToastStyles $type={toast.type} $isActive={toast.active}>
        <div className="icon-container">
          {toast.type === 'success' ?
            (
              <FaRegCheckCircle className="toast-icon"/>
            ) :
            (
              <RiErrorWarningLine className="toast-icon"/>
            )
        }
        </div>
        <div className="message-container">
          <p className="title">{toast.title}</p>
          <p>{toast.message}</p>
        </div>
    </ToastStyles>
    )
  )

  return {activateToast, ToastComponent, toast}
}