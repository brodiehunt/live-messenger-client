
import { useState } from 'react';
import styled from 'styled-components'; 

const ToggleSwitchStyles = styled.div`
  position: relative;
  max-width: 700px;
  width: 100%;
  display: flex;
  justify-content: space-between;
  align-items: center;
  gap: 1rem;
  margin-bottom: 2rem;

  .switch-label {
    /* flex-grow: 1; */
    max-width: 600px;
  }

  h3 {
    margin-bottom: 0.5rem;
  }

  .toggle-switch-wrapper {
    position: relative;
    width: 60px;
    height: 32px;
  }

  .toggle-switch-checkbox {
    opacity: 0;
    width: 60px;
    height: 0;
  }

  .toggle-switch-label {
    position: absolute;
    cursor: pointer;
    top: 0;
    left: 0;
    right: 0;
    bottom: 0;
    width: 60px;
    height: 32px;
    background-color: #ccc;
    -webkit-transition: .4s;
    transition: .4s;
    border-radius: 34px;
  }

  .toggle-switch-label:before {
    position: absolute;
    content: "";
    height: 26px;
    width: 26px;
    left: 3px;
    bottom: 3px;
    background-color: white;
    -webkit-transition: .4s;
    transition: .4s;
    border-radius: 50%;
  }

  .toggle-switch-checkbox:checked + .toggle-switch-label {
    background-color: #4d96a9;
  }

  .toggle-switch-checkbox:focus + .toggle-switch-label {
    box-shadow: 0 0 1px var(--secondary);
    outline: 2px solid var(--secondary);
  }

  .toggle-switch-checkbox:checked + .toggle-switch-label:before {
    -webkit-transform: translateX(26px);
    -ms-transform: translateX(26px);
    transform: translateX(26px);
  }
`
const ToggleSwitch = ({ 
  id, 
  name, 
  children,
  checked, 
  handleChange 
}) => {
  

  return (
    <ToggleSwitchStyles className="toggle-switch">
      <div className="switch-label">
        {children}
      </div>
      <div className="toggle-switch-wrapper">
        <input
          type="checkbox"
          id={name}
          name={name}
          checked={checked}
          onChange={(event) => handleChange(event)}
          className="toggle-switch-checkbox"
        />
        <label 
        className="toggle-switch-label" 
        htmlFor={name}
        >
          
        </label>
      </div>
      
    </ToggleSwitchStyles>
  );
};

export default ToggleSwitch;

