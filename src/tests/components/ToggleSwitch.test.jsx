import { queryAllByRole, render, screen, within} from '@testing-library/react';
import ToggleSwitch from '../../components/ToggleSwitch';
import { expect } from 'vitest';
import { userEvent } from '@testing-library/user-event';
import { StateProvider } from '../../hooks/StateContext';
import { BrowserRouter } from 'react-router-dom';



describe('Toggle switch renders as expect', () => {
  let handleChange;
  beforeEach(() => {
    handleChange = vi.fn();
    render(
      <ToggleSwitch 
        name="isPrivate"
        label="Make your account private"
        checked={true}
        handleChange={handleChange}
      >
        <h3>Account Privacy</h3>
        <p 
          className="toggle-switch-description"
        >
          Prevent your account from being searched by other users, showing up in friend recommendations or being friend requested by users you are in groups with.
        </p>
      </ToggleSwitch>
    )
  })

  it('should render with a h3 element', () => {
    const title = screen.getByRole('heading', {name: 'Account Privacy'});

    expect(title).toBeInTheDocument();
  })

  it('input checkbox should be rendered to the screen and have a label', () => {
    const checkbox = screen.getByLabelText('Make your account private');

    expect(checkbox).toBeInTheDocument();
  })

  it('input checkbox should have correct checked value on render', () => {
    const checkbox = screen.getByLabelText('Make your account private');
    console.log(checkbox);
    expect(checkbox).toBeChecked();
  })

  it('should call the handleChange function when checkbox is clicked', async () => {
    const checkbox = screen.getByLabelText('Make your account private');

    await userEvent.click(checkbox);

    expect(handleChange).toBeCalledTimes(1);
  })
})