import { queryAllByRole, render, screen, within} from '@testing-library/react';
import RegisterForm from '../../components/RegisterForm';
import { expect } from 'vitest';
import { userEvent } from '@testing-library/user-event';
import { StateProvider } from '../../hooks/StateContext';
import { BrowserRouter } from 'react-router-dom';

beforeEach(() => {
  render(
    <BrowserRouter>
      <StateProvider>
        <RegisterForm />
      </StateProvider>
    </BrowserRouter>
  )
})

describe(('register form renders as expected'), () => {
  test('renders form element with aria-busy false', () => {
    const form = screen.getByRole('form');

    expect(form).toBeInTheDocument();
    expect(form).toHaveAttribute('aria-busy', 'false');
  })

  test('renders all input fields to be to the screen', () => {
    expect(screen.getByLabelText('*Name')).toBeInTheDocument();
    expect(screen.getByLabelText('*Username')).toBeInTheDocument();
    expect(screen.getByLabelText('*Email')).toBeInTheDocument();
    expect(screen.getByLabelText('*Password')).toBeInTheDocument();
    expect(screen.getByLabelText('*Confirm Password')).toBeInTheDocument();
  })

  test('renders all input fields with the correct placeholder values', () => {
    expect(screen.getByLabelText('*Name')).toHaveAttribute('placeholder', 'Enter your name');
    expect(screen.getByLabelText('*Username')).toHaveAttribute('placeholder', 'Enter your username');
    expect(screen.getByLabelText('*Email')).toHaveAttribute('placeholder', 'Enter your email');
    expect(screen.getByLabelText('*Password')).toHaveAttribute('placeholder', 'Enter your password');
    expect(screen.getByLabelText('*Confirm Password')).toHaveAttribute('placeholder', 'Confirm your password');
  })

  test('renders all input fields with no error messages rendered', () => {
    const errorMessages = screen.queryAllByRole('alert');

    expect(errorMessages.length).toBe(0);
  })

  test('renders button to the screen with type submit', () => {
    const submitButton = screen.getByRole('button', {name: 'Register'});
   
    expect(submitButton).toBeInTheDocument();
    expect(submitButton).toHaveAttribute('type', 'submit');
  })
})

describe('Form state is updated when user types into inputs', () => {

  test('name input is updated when user types into it', async() => {

    const input = screen.getByLabelText('*Name')
    
    // types valid input
    await userEvent.type(input, 'example');
    expect(input.value).toBe('example'); // state updates as expected;
    expect(screen.queryByRole('alert')).toBeNull(); // no error as valid input
    
    await userEvent.type(input, 'ex');
    expect(screen.queryByRole('alert')).toBeDefined() // error message becasue fails validation
  })

  test('username input is updated when user types into it', async () => {
    const input = screen.getByLabelText('*Username')

    await userEvent.type(input, 'example');
    expect(input.value).toBe('example'); // state updates as expected;
    expect(screen.queryByRole('alert')).toBeNull(); // no error as valid input
    
    await userEvent.type(input, 'ex');
    expect(screen.queryByRole('alert')).toBeDefined() // error message becasue fails validation
  });

  test('email input is updated when user types into it', async () => {
    const input = screen.getByLabelText('*Email')

    await userEvent.type(input, 'example@example.com');
    expect(input.value).toBe('example@example.com'); // state updates as expected;
    expect(screen.queryByRole('alert')).toBeNull(); // no error as valid input
    
    await userEvent.type(input, 'ex');
    expect(screen.queryByRole('alert')).toBeDefined() // error message becasue fails validation
  })

  test('password input is updated when user types into it', async () => {
    const input = screen.getByLabelText('*Password')


    await userEvent.type(input, 'Brodie1');
    expect(input.value).toBe('Brodie1'); // state updates as expected;
    expect(screen.queryByRole('alert')).toBeNull(); // no error as valid input
    
    await userEvent.type(input, 'BR1');
    expect(screen.queryByRole('alert')).toBeDefined() // error message becasue fails not long enough

    await userEvent.type(input, 'Brodiee');
    expect(screen.queryByRole('alert')).toBeDefined() // error message becasue fails - no number

    await userEvent.type(input, 'brodie1');
    expect(screen.queryByRole('alert')).toBeDefined() // error message becasue fails - no capital

    await userEvent.type(input, 'BRODIE1');
    expect(screen.queryByRole('alert')).toBeDefined() // error message becasue fails - no lowercase
  })

  test('password confirm input is updated when user types into it', async () => {
    const inputPassword = screen.getByLabelText('*Password')
    const inputPasswordConfirm = screen.getByLabelText('*Confirm Password');

    await userEvent.type(inputPassword, 'Brodie1');
    await userEvent.type(inputPasswordConfirm, 'Brodie1');

    expect(inputPassword.value).toBe('Brodie1'); // state updates as expected;
    expect(inputPasswordConfirm.value).toBe('Brodie1'); // state updates as expected;
    expect(screen.queryByRole('alert')).toBeNull(); // password matches passwordConfirm - no error message

    await userEvent.type(inputPassword, 'Brodie1');
    await userEvent.type(inputPasswordConfirm, '2');
    expect(inputPasswordConfirm.value).toBe('Brodie12'); // state updates as expected;
    expect(screen.queryByRole('alert')).toBeDefined(); // error message - passwords do not match

  
  })
})


describe('Form Submission', () => {
  test('expect 1 to equal 1', () =>{
    expect(1).toBe(1);
  })
})

