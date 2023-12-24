import { queryAllByRole, render, screen, fireEvent} from '@testing-library/react';
import SignInForm from '../../components/SignInForm';
import { expect, vi } from 'vitest';
import { userEvent } from '@testing-library/user-event';
import { StateProvider } from '../../hooks/StateContext';
import { BrowserRouter } from 'react-router-dom';
vi.mock('../../services/authServices', () => ({
  signInUserLocal: vi.fn(),
}));

// Rendering tests

describe('Sign in form renders correctly', () => {
  beforeEach(() => {
    render(
      <BrowserRouter>
        <StateProvider>
          <SignInForm />
        </StateProvider>
      </BrowserRouter>
    )
  })

  it('renders the sign in form', () => {
    const form = screen.getByRole('form');
    
    expect(form).toBeInTheDocument();
    expect(form).toHaveAttribute('aria-busy', 'false');
  })

  it('renders the email input field', () => {
    const emailInput = screen.getByLabelText('*Email');

    expect(emailInput).toBeInTheDocument();
    expect(emailInput).toHaveAttribute('value', '');
    expect(emailInput).toHaveAttribute('name', 'email');
    expect(emailInput).toHaveAttribute('placeholder', 'Enter your email');
  });

  it('renders the password input field', () => {
    const passwordInput = screen.getByLabelText('*Password');

    expect(passwordInput).toBeInTheDocument();
    expect(passwordInput).toHaveAttribute('value', '');
    expect(passwordInput).toHaveAttribute('name', 'password');
    expect(passwordInput).toHaveAttribute('placeholder', 'Enter your password');

  })

  it('renders the sign in form button', () => {
    const button = screen.getByRole('button', {name: 'Sign in'});

    expect(button).toBeInTheDocument();
    expect(button).toHaveAttribute('type', 'submit');
  })
});

// Test user input 

describe('User input in the sign in form', () => {
  beforeEach(() => {
    render(
      <BrowserRouter>
        <StateProvider>
          <SignInForm />
        </StateProvider>
      </BrowserRouter>
    )
  });

  it('should update the email input when a user types in the field', async () => {
    const emailInput = screen.getByLabelText('*Email');

    expect(emailInput).toHaveValue('');

    await userEvent.type(emailInput, 'hello');

    expect(emailInput).toHaveValue('hello');
  })

  it('show email error if the email is invalid', async () => {
    const emailInput = screen.getByLabelText('*Email');

    await userEvent.type(emailInput, 'hello');
    fireEvent.blur(emailInput);

    const errorMessage = screen.getByRole('alert');
    expect(errorMessage).toBeInTheDocument();
  })

  it('should update the password input when a user types in the field', async () => {
    const passwordInput = screen.getByLabelText('*Password');
    
    expect(passwordInput).toHaveValue('');

    await userEvent.type(passwordInput, 'hello');

    expect(passwordInput).toHaveValue('hello');
  })

  it('should show password error if the typed password is invalid', async () => {
    const passwordInput = screen.getByLabelText('*Password');

    await userEvent.type(passwordInput, 'not valid');
    fireEvent.blur(passwordInput);

    const errorMessage = screen.getByRole('alert');
    expect(errorMessage).toBeInTheDocument();
  });
})

// describe('Sign in form submit', () => {
//   let mockDispatch;
//   beforeEach(() => {
//     let mockDispatch = vi.fn();
//     authSerices.signInUserLocal.mockReset();
//     render(
//       <BrowserRouter>
//         <StateProvider>
//           <SignInForm />
//         </StateProvider>
//       </BrowserRouter>
//     )
//   })
// })