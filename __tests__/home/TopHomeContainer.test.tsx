import TopHomeContainer from '@/modules/home/components/TopHomeContainer';
import { fireEvent, render, waitFor } from '@testing-library/react-native';

jest.mock('@expo/vector-icons/EvilIcons', () => {
  const React = require('react');
  const { View } = require('react-native');
  return function MockEvilIcons() {
    return <View testID='mocked-icon' />;
  };
});

describe('TopHomeContainer', () => {
  it('renders correctly', async () => {
    const { getByText } = render(
      <TopHomeContainer onShowSearchContainer={() => {}} />
    );

    await waitFor(() => {
      expect(getByText('Student Profiles')).toBeTruthy();
    });
  });

  it('should call onShowSearchContainer when search button is pressed', async () => {
    const mockOnShowSearchContainer = jest.fn();

    const { getByTestId } = render(
      <TopHomeContainer onShowSearchContainer={mockOnShowSearchContainer} />
    );

    await waitFor(() => {
      const searchButton = getByTestId('search-button');
      fireEvent.press(searchButton);
      expect(mockOnShowSearchContainer).toHaveBeenCalledTimes(1);
    });
  });

  it('renders the icon correctly', async () => {
    const { getByTestId } = render(
      <TopHomeContainer onShowSearchContainer={() => {}} />
    );

    await waitFor(() => {
      expect(getByTestId('mocked-icon')).toBeTruthy();
    });
  });
});
