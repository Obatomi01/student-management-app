import colors from '@/constants/colors';
import React from 'react';
import { StyleSheet, Text, View } from 'react-native';

import { globalStyles } from '@/styles/global';

type Props = {
  numberOfStudents: number;
};

const NumberContainer = ({ numberOfStudents }: Props) => {
  return (
    <View
      style={{
        backgroundColor: colors.brandLight,
        paddingVertical: 10,
      }}
    >
      <View style={globalStyles.contentContainer}>
        <Text
          style={{
            fontSize: 14,
            fontFamily: 'ManropeBold',
            color: '#333333',
          }}
        >
          {numberOfStudents} {numberOfStudents > 1 ? 'students' : 'student'}
        </Text>
      </View>
    </View>
  );
};

export default NumberContainer;

const styles = StyleSheet.create({});
