import { describe, it, expect, vi } from 'vitest';
import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import CustomButton from '../components/CustomButton';

describe('CustomButton Component', () => {
  it('should render button with title', () => {
    render(<CustomButton title="Test Button" type="filled" handleClick={() => {}} />);

    expect(screen.getByText('Test Button')).toBeInTheDocument();
  });

  it('should call handleClick when clicked', async () => {
    const handleClick = vi.fn();
    const user = userEvent.setup();

    render(<CustomButton title="Click Me" type="filled" handleClick={handleClick} />);

    await user.click(screen.getByText('Click Me'));
    expect(handleClick).toHaveBeenCalledTimes(1);
  });

  it('should apply custom styles', () => {
    render(
      <CustomButton
        title="Styled Button"
        type="filled"
        customStyles="custom-class"
        handleClick={() => {}}
      />
    );

    const button = screen.getByText('Styled Button');
    expect(button).toHaveClass('custom-class');
  });

  it('should render filled button style', () => {
    render(<CustomButton title="Filled Button" type="filled" handleClick={() => {}} />);

    const button = screen.getByText('Filled Button');
    expect(button).toBeInTheDocument();
  });

  it('should render outline button style', () => {
    render(<CustomButton title="Outline Button" type="outline" handleClick={() => {}} />);

    const button = screen.getByText('Outline Button');
    expect(button).toBeInTheDocument();
  });
});
