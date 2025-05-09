import React from 'react';
import { Pressable, StyleSheet, Text, View } from 'react-native';

import { OptionButtonProps } from './OptionsContainer';

type Props = {};

const OptionButton = ({ icon, onPress, title }: OptionButtonProps) => {
  return (
    <Pressable onPress={onPress}>
      <View
        style={{
          backgroundColor: '#e0dee0',
          alignSelf: 'flex-start',
          paddingVertical: 5,
          paddingHorizontal: 10,
          borderRadius: 20,

          flexDirection: 'row',
          alignItems: 'center',
          gap: 4,
        }}
      >
        {icon}
        <Text
          style={{
            color: '#222',
            // fontWeight: 'bold',
            fontFamily: 'ManropeExtraBold',
          }}
        >
          {title}
        </Text>
      </View>
    </Pressable>
  );
};

export default OptionButton;

const styles = StyleSheet.create({});
