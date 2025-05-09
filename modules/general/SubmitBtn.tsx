import React from 'react';
import { ActivityIndicator, Pressable, StyleSheet, Text } from 'react-native';

import colors from '@/constants/colors';

type Props = {
  onPress: () => void;
  text: string;
  isLoading: boolean;
};

const SubmitBtn = ({ onPress, text, isLoading }: Props) => {
  const handlePress = () => {
    if (!isLoading) {
      onPress();
    }
  };

  return (
    <Pressable
      style={{
        backgroundColor: colors.brand,

        borderRadius: 15,
        marginTop: 20,
        height: 50,
        justifyContent: 'center',
      }}
      onPress={handlePress}
    >
      {isLoading ? (
        <ActivityIndicator size={24} color='white' testID='loading-indicator' />
      ) : (
        <Text
          style={{
            color: '#fff',
            fontSize: 16,
            fontWeight: 'bold',
            textAlign: 'center',
          }}
        >
          {text}
        </Text>
      )}
    </Pressable>
  );
};

export default SubmitBtn;

const styles = StyleSheet.create({});
