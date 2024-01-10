import ToggleSwitchStyles from "../styles/Account/ToggleSwitchStyles";

const ToggleSwitch = ({ name, children, label, checked, handleChange }) => {
  return (
    <ToggleSwitchStyles className="toggle-switch">
      <div className="switch-label">{children}</div>
      <div className="toggle-switch-wrapper">
        <input
          type="checkbox"
          id={name}
          name={name}
          checked={checked}
          aria-label={label}
          onChange={(event) => handleChange(event)}
          className="toggle-switch-checkbox"
        />
        <label className="toggle-switch-label" htmlFor={name}></label>
      </div>
    </ToggleSwitchStyles>
  );
};

export default ToggleSwitch;
