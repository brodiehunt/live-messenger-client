import { render, screen, fireEvent} from '@testing-library/react';
import InputField from '../../components/InputField';
import { expect } from 'vitest';
import { userEvent } from '@testing-library/user-event';


describe('Input fields render with the correct props', () => {
  let mockOnChange;
  let mockOnBlur;

  beforeEach(() => {
    mockOnChange = vi.fn();
    mockOnBlur = vi.fn();
    render(
      <InputField
        name="username"
        type="text"
        id="username"
        value=""
        onChange={mockOnChange}
        onBlur={mockOnBlur}
        placeholder="Enter your username"
        
      >
        Username
      </InputField>
    )
  })

  test('renders input to screen with correct values', () => {
    const input = screen.getByLabelText('*Username');

    expect(input).toHaveAttribute('name', 'username');
    expect(input).toHaveAttribute('type', 'text');
    expect(input).toHaveAttribute('id', 'username');
    expect(input).toHaveAttribute('placeholder', 'Enter your username');
    expect(input.value).toBe('');

  })

  test('calls onchange function when input changes', async () => {
    const input = screen.getByLabelText('*Username');
    
    await userEvent.type(input, 'hello');

    expect(mockOnChange).toBeCalled();
    expect(mockOnChange).toBeCalledTimes(5);

  })

  test('calls onchange function when input changes', async () => {
    const input = screen.getByLabelText('*Username');

    fireEvent.blur(input);

    expect(mockOnBlur).toBeCalled();
    expect(mockOnBlur).toBeCalledTimes(1);

  })
})