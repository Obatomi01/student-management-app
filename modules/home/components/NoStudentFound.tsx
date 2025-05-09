import React from 'react';
import { Dimensions, Image, StyleSheet, Text, View } from 'react-native';

type Props = {};

const { width } = Dimensions.get('window');

const NoStudentFound = (props: Props) => {
  return (
    <View
      style={{
        alignSelf: 'center',
        justifyContent: 'center',
        flex: 1,
      }}
    >
      <Image
        source={require('@/assets/images/worker.png')}
        style={{
          width: width * 0.25,
          height: width * 0.25,
          resizeMode: 'contain',
          alignSelf: 'center',
        }}
      />
      <Text
        style={{
          textAlign: 'center',
          marginTop: 12,
          fontFamily: 'ManropeSemiBold',
        }}
      >
        No Student Found.
      </Text>
    </View>
  );
};

export default NoStudentFound;

const styles = StyleSheet.create({});
