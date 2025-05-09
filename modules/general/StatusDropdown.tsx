import AntDesign from '@expo/vector-icons/AntDesign';
import React, { useEffect, useRef, useState } from 'react';
import { Animated, Pressable, StyleSheet, Text, View } from 'react-native';

type Props = {
  onChange: (value: EnrollmentStatus) => void;
  formHasBeenSubmitted?: boolean;
  initStatus?: EnrollmentStatus;
};

type DropdownOptions = {
  label: string;
  value: EnrollmentStatus;
};

export type EnrollmentStatus = 'enrolled' | 'graduated' | 'alumni';

const options: DropdownOptions[] = [
  { label: 'Enrolled', value: 'enrolled' },
  { label: 'Graduated', value: 'graduated' },
  { label: 'Alumni', value: 'alumni' },
];

const StatusDropdown = ({
  onChange,
  formHasBeenSubmitted,
  initStatus,
}: Props) => {
  const [selectedOption, setSelectedOption] = useState<EnrollmentStatus>(
    initStatus || 'enrolled'
  );
  const [showOptions, setShowOptions] = useState(false);
  const rotateAnim = useRef(new Animated.Value(0)).current;

  const toggleDropdown = () => {
    setShowOptions((prev) => !prev);

    Animated.timing(rotateAnim, {
      toValue: showOptions ? 0 : 1,
      duration: 200,
      useNativeDriver: true,
    }).start();
  };

  const rotate = rotateAnim.interpolate({
    inputRange: [0, 1],
    outputRange: ['0deg', '180deg'],
  });

  const capitalizeFirstLetter = (str: string) => {
    return str.charAt(0).toUpperCase() + str.slice(1);
  };

  useEffect(() => {
    if (formHasBeenSubmitted) {
      setSelectedOption('enrolled');
      onChange('enrolled');
    }
  }, []);

  return (
    <View
      style={{
        gap: 3,
        position: 'relative',
      }}
    >
      <Text style={styles.labelText}>Enrollment Status</Text>
      <Pressable
        onPress={toggleDropdown}
        style={[
          styles.statusContainer,
          {
            flexDirection: 'row',
            alignItems: 'center',
            justifyContent: 'space-between',
          },
        ]}
        testID='status-dropdown-button'
      >
        <Text style={styles.text}>{capitalizeFirstLetter(selectedOption)}</Text>

        <Animated.View style={{ transform: [{ rotate }] }}>
          <AntDesign name='caretdown' size={18} color='black' />
        </Animated.View>
      </Pressable>

      {showOptions && (
        <View
          style={[
            styles.statusContainer,
            {
              position: 'absolute',
              backgroundColor: 'white',
              top: 70,
              zIndex: 1,
              width: '100%',
            },
          ]}
          testID='dropdown-options-container'
        >
          {options.map((option) => (
            <Pressable
              key={option.value}
              onPress={() => {
                setSelectedOption(option.value);
                onChange(option.value);
                toggleDropdown();
              }}
              style={{ marginBottom: 6 }}
              testID={`option-${option.value}`}
            >
              <Text
                style={[
                  styles.text,
                  {
                    color:
                      selectedOption === option.value ? '#b029b3' : 'black',
                  },
                ]}
              >
                {option.label}
              </Text>
            </Pressable>
          ))}
        </View>
      )}
    </View>
  );
};

export default StatusDropdown;

const styles = StyleSheet.create({
  labelText: {
    fontSize: 14,
    fontFamily: 'ManropeBold',
  },
  statusContainer: {
    borderWidth: 1,
    borderColor: '#ccc',
    padding: 10,
    borderRadius: 12,
  },
  text: {
    fontSize: 14,
    fontFamily: 'ManropeMedium',
  },
});
