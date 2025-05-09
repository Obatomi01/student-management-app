import StatusDropdown from '@/modules/general/StatusDropdown';
import { fireEvent, render, waitFor } from '@testing-library/react-native';
import React from 'react';

jest.mock('@expo/vector-icons/AntDesign', () => {
  const React = require('react');
  const { View, Text } = require('react-native');
  return function MockAntDesign(props: any) {
    return (
      <View testID={`icon-${props.name}`}>
        <Text>{props.name}</Text>
      </View>
    );
  };
});

describe('StatusDropdown', () => {
  it('renders with default "enrolled" status when no initStatus is provided', async () => {
    const mockOnChange = jest.fn();
    const { getByText } = render(<StatusDropdown onChange={mockOnChange} />);

    await waitFor(() => {
      expect(getByText('Enrolled')).toBeTruthy();
    });
  });

  it('renders with provided initStatus', async () => {
    const mockOnChange = jest.fn();
    const { getByText } = render(
      <StatusDropdown onChange={mockOnChange} initStatus='graduated' />
    );

    await waitFor(() => {
      expect(getByText('Graduated')).toBeTruthy();
    });
  });

  it('toggles dropdown options when pressed', async () => {
    const mockOnChange = jest.fn();
    const { getByText, queryByText } = render(
      <StatusDropdown onChange={mockOnChange} />
    );

    expect(queryByText('Alumni')).toBeNull();

    const dropdownButton = getByText('Enrolled');
    fireEvent.press(dropdownButton);

    await waitFor(() => {
      expect(getByText('Alumni')).toBeTruthy();
      expect(getByText('Graduated')).toBeTruthy();
    });

    fireEvent.press(dropdownButton);

    await waitFor(() => {
      expect(queryByText('Alumni')).toBeNull();
    });
  });

  it('selects an option and calls onChange', async () => {
    const mockOnChange = jest.fn();
    const { getByText } = render(<StatusDropdown onChange={mockOnChange} />);

    fireEvent.press(getByText('Enrolled'));

    await waitFor(() => {
      fireEvent.press(getByText('Alumni'));
    });

    expect(mockOnChange).toHaveBeenCalledWith('alumni');

    expect(getByText('Alumni')).toBeTruthy();
  });

  it('displays the dropdown label', async () => {
    const { getByText } = render(<StatusDropdown onChange={() => {}} />);

    await waitFor(() => {
      expect(getByText('Enrollment Status')).toBeTruthy();
    });
  });
});
