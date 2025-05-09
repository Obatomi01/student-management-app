import SubmitBtn from '@/modules/general/SubmitBtn'; // Update with correct path
import { fireEvent, render, waitFor } from '@testing-library/react-native';
import React from 'react';

describe('SubmitBtn', () => {
  it('renders the button text correctly', async () => {
    const { getByText } = render(
      <SubmitBtn onPress={() => {}} text='Submit' isLoading={false} />
    );

    await waitFor(() => {
      expect(getByText('Submit')).toBeTruthy();
    });
  });

  it('calls onPress function when button is pressed', async () => {
    const mockOnPress = jest.fn();
    const { getByText } = render(
      <SubmitBtn onPress={mockOnPress} text='Submit' isLoading={false} />
    );

    await waitFor(() => {
      const button = getByText('Submit');
      fireEvent.press(button);
      expect(mockOnPress).toHaveBeenCalledTimes(1);
    });
  });

  it('shows activity indicator when isLoading is true', async () => {
    const { getByTestId } = render(
      <SubmitBtn onPress={() => {}} text='Submit' isLoading={true} />
    );

    await waitFor(() => {
      expect(getByTestId('loading-indicator')).toBeTruthy();
    });
  });

  it('does not show button text when isLoading is true', async () => {
    const { queryByText } = render(
      <SubmitBtn onPress={() => {}} text='Submit' isLoading={true} />
    );

    await waitFor(() => {
      expect(queryByText('Submit')).toBeNull();
    });
  });

  it('does not call onPress when isLoading is true', async () => {
    const mockOnPress = jest.fn();
    const { getByTestId } = render(
      <SubmitBtn onPress={mockOnPress} text='Submit' isLoading={true} />
    );

    await waitFor(async () => {
      const loadingIndicator = getByTestId('loading-indicator');
      if (loadingIndicator.parent) {
        fireEvent.press(loadingIndicator.parent);
      }
      expect(mockOnPress).not.toHaveBeenCalled();
    });
  });
});
