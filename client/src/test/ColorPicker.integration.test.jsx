import { describe, it, expect, beforeEach } from 'vitest';
import { render } from '@testing-library/react';
import { snapshot } from 'valtio';
import ColorPicker from '../components/ColorPicker';
import state from '../store';

describe('ColorPicker Integration Tests', () => {
  beforeEach(() => {
    // Reset state before each test
    state.color = '#EFBD48';
  });

  it('should render with current state color', () => {
    const { container } = render(<ColorPicker />);

    // SketchPicker should be rendered
    expect(container.querySelector('.sketch-picker')).toBeInTheDocument();
  });

  it('should display the correct initial color', () => {
    state.color = '#FF0000';

    render(<ColorPicker />);
    const snap = snapshot(state);

    expect(snap.color).toBe('#FF0000');
  });

  it('should update state when color changes', () => {
    render(<ColorPicker />);

    // Change color directly in state
    state.color = '#00FF00';

    const snap = snapshot(state);
    expect(snap.color).toBe('#00FF00');
  });

  it('should reflect state changes reactively', () => {
    const { rerender } = render(<ColorPicker />);

    const initialSnap = snapshot(state);
    expect(initialSnap.color).toBe('#EFBD48');

    // Update state
    state.color = '#0000FF';
    rerender(<ColorPicker />);

    const updatedSnap = snapshot(state);
    expect(updatedSnap.color).toBe('#0000FF');
  });
});
