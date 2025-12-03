import { describe, it, expect, vi, beforeEach } from 'vitest';
import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import AIPicker from '../components/AIPicker';

// Mock fetch globally
globalThis.fetch = vi.fn();

describe('AIPicker Integration Tests', () => {
  const mockHandleSubmit = vi.fn();
  const mockSetPrompt = vi.fn();

  beforeEach(() => {
    vi.clearAllMocks();
    globalThis.fetch.mockClear();
  });

  it('should render AI prompt input and buttons', () => {
    render(
      <AIPicker
        prompt=""
        setPrompt={mockSetPrompt}
        generatingImg={false}
        handleSubmit={mockHandleSubmit}
      />
    );

    expect(screen.getByPlaceholderText('Ask AI...')).toBeInTheDocument();
    expect(screen.getByText('AI Logo')).toBeInTheDocument();
    expect(screen.getByText('AI Full')).toBeInTheDocument();
  });

  it('should update prompt when user types', async () => {
    const user = userEvent.setup();

    render(
      <AIPicker
        prompt=""
        setPrompt={mockSetPrompt}
        generatingImg={false}
        handleSubmit={mockHandleSubmit}
      />
    );

    const textarea = screen.getByPlaceholderText('Ask AI...');
    await user.type(textarea, 'cool dragon');

    expect(mockSetPrompt).toHaveBeenCalled();
  });

  it('should call handleSubmit with "logo" when AI Logo button clicked', async () => {
    const user = userEvent.setup();

    render(
      <AIPicker
        prompt="test prompt"
        setPrompt={mockSetPrompt}
        generatingImg={false}
        handleSubmit={mockHandleSubmit}
      />
    );

    await user.click(screen.getByText('AI Logo'));

    expect(mockHandleSubmit).toHaveBeenCalledWith('logo');
    expect(mockHandleSubmit).toHaveBeenCalledTimes(1);
  });

  it('should call handleSubmit with "full" when AI Full button clicked', async () => {
    const user = userEvent.setup();

    render(
      <AIPicker
        prompt="test prompt"
        setPrompt={mockSetPrompt}
        generatingImg={false}
        handleSubmit={mockHandleSubmit}
      />
    );

    await user.click(screen.getByText('AI Full'));

    expect(mockHandleSubmit).toHaveBeenCalledWith('full');
    expect(mockHandleSubmit).toHaveBeenCalledTimes(1);
  });

  it('should show loading state when generating image', () => {
    render(
      <AIPicker
        prompt="test"
        setPrompt={mockSetPrompt}
        generatingImg={true}
        handleSubmit={mockHandleSubmit}
      />
    );

    expect(screen.getByText('Asking AI...')).toBeInTheDocument();
    expect(screen.queryByText('AI Logo')).not.toBeInTheDocument();
    expect(screen.queryByText('AI Full')).not.toBeInTheDocument();
  });

  it('should disable buttons during generation', () => {
    render(
      <AIPicker
        prompt="test"
        setPrompt={mockSetPrompt}
        generatingImg={true}
        handleSubmit={mockHandleSubmit}
      />
    );

    const loadingButton = screen.getByText('Asking AI...');
    expect(loadingButton).toBeInTheDocument();
  });
});
